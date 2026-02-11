import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

import GoBackHeader from '../../components/common/GoBackHeader';
import ProductCard from '../../components/Product/ProductCard';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { selectCartItemsArray } from '../../features/cart/cartSelectors';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;

const DealProductsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // 👉 expect params like: { item: { title, productIds } }
  const { title, itemIds } = route.params || {};
  const productIds = itemIds;
  console.log(productIds);

  const cartItems = useSelector(selectCartItemsArray);
  const cartItemCount = cartItems.length;

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (productIds.length > 0) {
      fetchProducts();
    }
  }, [productIds]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch(
        'https://2a0t2oahs8.execute-api.ap-south-1.amazonaws.com/products/batch',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productIds }),
        },
      );

      const result = await response.json();
      console.log('Products API response:', result.data);

      if (result?.success) {
        setProducts(result.data || []);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  /* ================= STATES ================= */

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loaderText}>Loading products...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Something went wrong</Text>
      </SafeAreaView>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>No products found</Text>
      </SafeAreaView>
    );
  }

  /* ================= UI ================= */

  return (
    <SafeAreaView style={styles.container}>
      <GoBackHeader title={title || 'Deal Products'} />

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={item => item.productId}
        numColumns={2}
        columnWrapperStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 16,
          paddingBottom: cartItemCount > 0 ? 90 : 16,
        }}
      />

      {/* Bottom Cart Tab */}
      {cartItemCount > 0 && (
        <View style={styles.cartTab}>
          <View>
            <Text style={styles.cartCount}>
              {cartItemCount} item{cartItemCount !== 1 ? 's' : ''}
            </Text>
            <Text style={styles.cartLabel}>in cart</Text>
          </View>

          <TouchableOpacity
            style={styles.viewCartButton}
            onPress={() => navigation.navigate('Cart')}
          >
            <Text style={styles.viewCartText}>View Cart</Text>
            <Ionicons name="chevron-forward" size={18} color="#000" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default DealProductsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  scrollView: {
    marginVertical: 20,
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

  section: {
    padding: 16,
  },
  detectedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#22C55E',
    marginRight: 8,
  },
  filterActive: {
    backgroundColor: '#22C55E',
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  gridContainer: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  cartTab: {
    position: 'absolute',
    bottom: 120,
    left: 16, // 👈 side margin
    right: 16,
    backgroundColor: '#22C55E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cartCount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  cartLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  viewCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  viewCartText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  productCard: {
    width: ITEM_WIDTH,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    marginBottom: 12,
  },
  imageBadgeContainer: {
    height: 140,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#22C55E',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  weight: {
    color: '#aaa',
    fontSize: 12,
  },
  onlyLabel: {
    color: '#777',
    fontSize: 11,
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  discountedPrice: {
    color: '#22C55E',
    fontSize: 16,
    fontWeight: '700',
  },
  originalPrice: {
    color: '#777',
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  actionButton: {
    padding: 10,
  },
  addButton: {
    backgroundColor: '#22C55E',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  addButtonText: {
    fontWeight: '600',
    color: '#000',
  },
  quantityContainer: {
    flexDirection: 'row',
    backgroundColor: '#22C55E',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
  },
  quantity: {
    fontSize: 14,
    fontWeight: '600',
  },
});
