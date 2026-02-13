import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectCartItemsArray } from '../../features/cart/cartSelectors';

const CartBottomTab = () => {
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItemsArray);
  const cartItemCount = cartItems.length;

  if (cartItemCount === 0) return null;

  return (
    <View style={styles.cartTab}>
      <View style={styles.cartInfo}>
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
  );
};

export default CartBottomTab;

const styles = StyleSheet.create({
  cartTab: {
    position: 'absolute',
    bottom: 100,
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
});
