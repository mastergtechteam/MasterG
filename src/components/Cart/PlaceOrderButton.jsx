import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../../screens/Cart/styles';

const PlaceOrderButton = ({ finalTotal, onPress }) => {
  return (
    <TouchableOpacity style={styles.placeOrderBtn} onPress={onPress}>
      <Text style={styles.placeOrderText}>Proceed to pay</Text>
      <Text style={styles.placeOrderPrice}>₹{finalTotal}</Text>
    </TouchableOpacity>
  );
};

export default PlaceOrderButton;
