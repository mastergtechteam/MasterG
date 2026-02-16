import React from 'react';
import { View } from 'react-native';
import CartItem from './CartItem';
import styles from '../../screens/Cart/styles';

const CartList = ({ cartItems, dispatch }) => {
  return (
    <View style={styles.itemsContainer}>
      {cartItems.map(item => (
        <CartItem key={item.product.id} item={item} dispatch={dispatch} />
      ))}
    </View>
  );
};

export default CartList;
