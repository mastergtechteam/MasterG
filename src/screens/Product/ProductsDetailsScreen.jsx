import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { mapProductToCartItem } from '../../utils/mapProductToCartItem';

import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from '../../features/cart/cartSlice';
import { selectCartItemById } from '../../features/cart/cartSelectors';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import GoBackHeader from '../../components/common/GoBackHeader';
import AppSafeArea from '../../components/common/AppSafeArea';

const { width: screenWidth } = Dimensions.get('window');
const IMAGE_WIDTH = screenWidth;
const IMAGE_HEIGHT = 350;

const ProductsDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { productId } = route.params || {};
  console.log(productId);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const flatListRef = useRef(null);

  // Get cart item quantity for this product
  const cartItem = useSelector(selectCartItemById(productId));
  const inCartQuantity = cartItem?.quantity ?? 0;

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://2a0t2oahs8.execute-api.ap-south-1.amazonaws.com/products/${productId}`,
        );
        const json = await response.json();
        console.log(json.data);

        if (json.success) {
          setProduct(json.data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(addToCart(mapProductToCartItem(product)));

    setQuantity(1);
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(product.productId));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(product.productId));
  };

  const handleImageScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / IMAGE_WIDTH);
    setCurrentImageIndex(index);
  };

  const calculateDiscount = () => {
    const selling = Number(product.pricing?.sellingPrice ?? 0);
    const mrp = Number(product.pricing?.mrp ?? selling);
    if (selling >= mrp) return 0;
    return Math.round(((mrp - selling) / mrp) * 100);
  };

  // Safe value extractors with fallbacks
  const getStockInfo = () => {
    try {
      if (typeof product.stock === 'object' && product.stock) {
        const available = product.stock.availableQuantity ?? 0;
        const isOutOfStock = product.stock.outOfStock ?? false;
        if (isOutOfStock)
          return { quantity: 0, isOutOfStock: true, label: 'Out of Stock' };
        return {
          quantity: available,
          isOutOfStock: false,
          label: `${available} In Stock`,
        };
      }
      if (typeof product.stock === 'number') {
        return {
          quantity: product.stock,
          isOutOfStock: product.stock === 0,
          label:
            product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock',
        };
      }
      return { quantity: 0, isOutOfStock: true, label: 'Not Available' };
    } catch {
      return {
        quantity: 0,
        isOutOfStock: true,
        label: 'Stock Info Unavailable',
      };
    }
  };

  const getExpiryDate = () => {
    try {
      if (!product.expiry.expiryDate) return 'Not Available';
      const date = new Date(product.expiry.expiryDate);
      return date.toLocaleDateString('en-IN', {
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return 'Not Available';
    }
  };

  const getManufacturer = () => {
    return product.manufacturingDetails?.manufacturer || 'Not Specified';
  };

  const getOrigin = () => {
    return product.manufacturingDetails?.countryOfOrigin || 'Not Specified';
  };

  const getQuantity = () => {
    try {
      if (!product.quantity) return 'Not Specified';

      // API returns object { value, unit }
      if (typeof product.quantity === 'object') {
        const { value, unit } = product.quantity;
        return `${value}${unit ?? ''}`;
      }

      // fallback if backend sends number
      return `${product.quantity}g`;
    } catch {
      return 'Not Specified';
    }
  };

  const getDescription = () => {
    return product.description || 'No description available';
  };

  const getImages = () => {
    return product.images &&
      Array.isArray(product.images) &&
      product.images.length > 0
      ? product.images
      : ['https://via.placeholder.com/350x350?text=No+Image'];
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loaderText}>Loading product details...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.loader}>
        <MaterialCommunityIcons
          name="alert-circle"
          size={48}
          color={colors.error}
        />
        <Text style={styles.loaderText}>Product not found</Text>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const sellingPrice = Number(product.pricing?.sellingPrice ?? 0);
  const mrp = Number(product.pricing?.mrp ?? sellingPrice);
  const discount = calculateDiscount();
  const images = product.images || [];

  return (
    <AppSafeArea style={styles.container}>
      <GoBackHeader
        title={product.name || 'Product Details'}
        showSearch={false}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Carousel */}
        <View style={styles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={getImages()}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.mainImage} />
            )}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            scrollEventThrottle={16}
            onScroll={handleImageScroll}
            showsHorizontalScrollIndicator={false}
          />

          {/* Discount Badge */}
          {discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{discount}%</Text>
              <Text style={styles.discountLabel}>OFF</Text>
            </View>
          )}

          {/* Pagination Dots */}
          {images.length > 1 && (
            <View style={styles.paginationContainer}>
              {images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    currentImageIndex === index && styles.activeDot,
                  ]}
                />
              ))}
            </View>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <View style={styles.imageCounter}>
              <Text style={styles.imageCounterText}>
                {currentImageIndex + 1}/{images.length}
              </Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.contentContainer}>
          {/* Brand & Category */}
          <View style={styles.brandContainer}>
            <Text style={styles.brand}>{product.brand}</Text>
            <Text style={styles.category}>{product.category?.name}</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>{product.name}</Text>

          {/* Price Section */}
          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.sellingPrice}>₹{sellingPrice}</Text>
              {mrp > sellingPrice && <Text style={styles.mrp}>₹{mrp}</Text>}
            </View>
            <View style={styles.savingsContainer}>
              <MaterialCommunityIcons
                name="tag-heart"
                size={18}
                color={colors.primary}
              />
              <Text style={styles.savingsText}>
                Save ₹{(mrp - sellingPrice).toFixed(0)}
              </Text>
            </View>
          </View>

          {/* Stock & Availability */}
          <View style={styles.stockContainer}>
            <View
              style={[
                styles.stockBadge,
                getStockInfo().isOutOfStock && styles.stockBadgeOutOfStock,
              ]}
            >
              <MaterialCommunityIcons
                name={
                  getStockInfo().isOutOfStock ? 'alert-circle' : 'check-circle'
                }
                size={16}
                color={
                  getStockInfo().isOutOfStock ? colors.error : colors.success
                }
              />
              <Text
                style={[
                  styles.stockText,
                  getStockInfo().isOutOfStock && styles.stockTextOutOfStock,
                ]}
              >
                {getStockInfo().label}
              </Text>
            </View>
            {!getStockInfo().isOutOfStock && (
              <Text style={styles.deliveryText}>⚡ Delivery in 2-3 days</Text>
            )}
            {getStockInfo().isOutOfStock && (
              <Text style={styles.outOfStockText}>Coming back soon</Text>
            )}
          </View>

          {/* Product Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="factory"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.detailLabel}>Manufacturer</Text>
              <Text style={styles.detailValue}>{getManufacturer()}</Text>
            </View>

            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="calendar-check"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.detailLabel}>Expiry</Text>
              <Text style={styles.detailValue}>{getExpiryDate()}</Text>
            </View>

            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="weight"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.detailLabel}>Weight</Text>
              <Text style={styles.detailValue}>{getQuantity()}</Text>
            </View>

            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="earth"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.detailLabel}>Origin</Text>
              <Text style={styles.detailValue}>{getOrigin()}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{getDescription()}</Text>
          </View>

          {/* Product Type Badge */}
          <View style={styles.typeContainer}>
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>📦 {product.productType}</Text>
            </View>
          </View>

          {/* Cart Info if product is in cart */}
          {inCartQuantity > 0 && (
            <View style={styles.cartInfoContainer}>
              <MaterialCommunityIcons
                name="cart-check"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.cartInfoText}>
                You have {inCartQuantity} in cart
              </Text>
            </View>
          )}

          <View style={{ height: spacing.xl }} />
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        {inCartQuantity > 0 ? (
          <>
            <TouchableOpacity
              style={styles.quantityBtn}
              onPress={handleDecrement}
            >
              <Text style={styles.quantityBtnText}>−</Text>
            </TouchableOpacity>

            <View style={styles.quantityInfo}>
              <Text style={styles.quantityLabel}>Quantity</Text>
              <Text style={styles.quantityValue}>{inCartQuantity}</Text>
            </View>

            <TouchableOpacity
              style={styles.quantityBtn}
              onPress={handleIncrement}
            >
              <Text style={styles.quantityBtnText}>+</Text>
            </TouchableOpacity>

            <View style={styles.actionSpacer} />

            <TouchableOpacity style={styles.addButton}>
              <MaterialCommunityIcons
                name="cart-check"
                size={18}
                color={colors.black}
              />
              <Text style={styles.buttonText}>
                ₹{(sellingPrice * inCartQuantity).toFixed(0)}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="cart-plus"
              size={20}
              color={colors.black}
            />
            <Text style={styles.buttonText}>Add to Cart</Text>
            <Text style={styles.priceText}>₹{sellingPrice}</Text>
          </TouchableOpacity>
        )}
      </View>
    </AppSafeArea>
  );
};

export default ProductsDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loader: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  loaderText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.md,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  backBtn: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  backBtnText: {
    color: colors.black,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
    marginVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.surfaceElevated,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
    marginHorizontal: spacing.sm,
    textAlign: 'center',
  },

  /* Carousel Styles */
  carouselContainer: {
    position: 'relative',
    backgroundColor: colors.surface,
    height: IMAGE_HEIGHT,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  mainImage: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: 'cover',
    backgroundColor: colors.surfaceElevated,
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.error,
    borderRadius: 12,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  discountText: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.white,
  },
  discountLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.white,
    fontWeight: '600',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: spacing.lg,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
    zIndex: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textMuted,
    opacity: 0.5,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 24,
    opacity: 1,
  },
  imageCounter: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    zIndex: 10,
  },
  imageCounterText: {
    color: colors.white,
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
  },

  /* Content Container */
  contentContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    backgroundColor: colors.background,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  brand: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontWeight: '600',
    marginRight: spacing.md,
  },
  category: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: '500',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    lineHeight: 28,
  },

  /* Price Container */
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  sellingPrice: {
    fontSize: typography.fontSize.xl + 2,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  mrp: {
    fontSize: typography.fontSize.md,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  savingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
  },
  savingsText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: '700',
  },

  /* Stock Container */
  stockContainer: {
    marginBottom: spacing.lg,
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: `${colors.success}15`,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: `${colors.success}40`,
  },
  stockText: {
    fontSize: typography.fontSize.md,
    color: colors.success,
    fontWeight: '600',
  },
  deliveryText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  stockBadgeOutOfStock: {
    borderWidth: 1,
    borderColor: colors.error,
    backgroundColor: `${colors.error}15`,
  },
  stockTextOutOfStock: {
    color: colors.error,
  },
  outOfStockText: {
    fontSize: typography.fontSize.sm,
    color: colors.error,
    marginTop: spacing.sm,
  },

  /* Details Grid */
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailItem: {
    width: '48%',
    marginBottom: spacing.lg,
    alignItems: 'flex-start',
    paddingHorizontal: spacing.sm,
  },
  detailLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  detailValue: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    fontWeight: '600',
  },

  /* Sections */
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  descriptionText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },

  /* Type Container */
  typeContainer: {
    marginBottom: spacing.lg,
  },
  typeBadge: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  typeText: {
    fontSize: typography.fontSize.md,
    color: colors.primary,
    fontWeight: '600',
  },

  /* Cart Info Container */
  cartInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
  },
  cartInfoText: {
    fontSize: typography.fontSize.md,
    color: colors.primary,
    fontWeight: '600',
  },

  /* Bottom Bar */
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderTopWidth: 2,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 12,
  },
  quantityBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${colors.primary}20`,
  },
  quantityBtnText: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.white,
  },
  quantityInfo: {
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  quantityLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  quantityValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.primary,
  },
  actionSpacer: {
    flex: 1,
  },
  addButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
  },
  buttonText: {
    fontSize: typography.fontSize.md,
    fontWeight: '700',
    color: colors.black,
  },
  priceText: {
    fontSize: typography.fontSize.md,
    fontWeight: '700',
    color: colors.black,
  },
});
