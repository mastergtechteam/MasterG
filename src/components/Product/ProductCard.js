import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from '../../features/cart/cartSlice';
import { selectCartItemById } from '../../features/cart/cartSelectors';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { mapProductToCartItem } from '../../utils/mapProductToCartItem';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartItem = useSelector(selectCartItemById(item.productId));
  const inCartQuantity = cartItem?.quantity ?? 0;

  // Extract pricing information
  const sellingPrice = item.pricing?.sellingPrice || 0;
  const mrp = item.pricing?.mrp || sellingPrice;

  // Extract quantity information
  const quantityDisplay = `${item.quantity?.value}${item.quantity?.unit || ''}`;

  function handleDetails() {
    navigation.navigate('Product-Details', {
      productId: item.productId,
      productName: item.name,
    });
  }

  // console.log(item);

  return (
    <TouchableOpacity style={styles.productCard} onPress={handleDetails}>
      <View style={styles.imageBadgeContainer}>
        <Image
          source={{ uri: item.image || item.images[0] }}
          style={styles.productImage}
        />
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.weight}>{quantityDisplay}</Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          {item.description}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.discountedPrice}>₹{sellingPrice}</Text>
          <Text style={styles.originalPrice}>₹{mrp}</Text>
        </View>
      </View>

      <View style={styles.actionButton}>
        {inCartQuantity > 0 ? (
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => dispatch(decrementQuantity(item.productId))}
            >
              <Text style={styles.quantityText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.quantity}>{inCartQuantity}</Text>

            <TouchableOpacity
              onPress={() => dispatch(incrementQuantity(item.productId))}
            >
              <Ionicons name="add" size={16} color="#000" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => dispatch(addToCart(mapProductToCartItem(item)))}
          >
            <Ionicons name="add" size={18} color="#000" />
            <Text style={styles.addButtonText}>Add Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
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
  description: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
    padding: 1,
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
