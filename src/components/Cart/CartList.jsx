import React from 'react';
import { View } from 'react-native';
import CartItem from './CartItem';
import styles from '../../screens/Cart/styles';

const CartList = ({ cartItems, dispatch, index }) => {
  return (
    <View style={styles.itemsContainer}>
      {cartItems.map(item => (
        <CartItem
          key={`${item?.product?.id}-${index}`}
          item={item}
          dispatch={dispatch}
        />
      ))}
    </View>
  );
};

export default CartList;
