import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from '../../features/cart/cartSlice';
import styles from '../../screens/Cart/styles';

const CartItem = ({ item, dispatch }) => {
  const { product, quantity } = item;

  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: product.image }} style={styles.productImage} />

      <View style={styles.itemDetails}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.description}>{product.weight}</Text>
        <Text style={styles.price}>₹{product.discountedPrice}</Text>
      </View>

      <View style={styles.quantityControl}>
        <TouchableOpacity
          onPress={() => dispatch(decrementQuantity(product.id))}
        >
          <Text style={styles.quantityText}>−</Text>
        </TouchableOpacity>

        <Text style={styles.quantityValue}>{quantity}</Text>

        <TouchableOpacity
          onPress={() => dispatch(incrementQuantity(product.id))}
        >
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => dispatch(removeItem(product.id))}
        style={styles.deleteBtn}
      >
        <MaterialDesignIcons name="delete-outline" style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;
