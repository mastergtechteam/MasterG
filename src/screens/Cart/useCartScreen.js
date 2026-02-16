import { useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
} from '../../features/cart/cartSlice';

import {
  selectCartItemsArray,
  selectCartTotal,
} from '../../features/cart/cartSelectors';

export const useCartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const cartItems = useSelector(selectCartItemsArray);
  const total = useSelector(selectCartTotal);

  const [modalVisible, setModalVisible] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [orderConfirmationVisible, setOrderConfirmationVisible] =
    useState(false);

  const [expandedSections, setExpandedSections] = useState({
    billing: false,
    summary: false,
    delivery: false,
  });

  const toggleSection = section => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const DELIVERY_TIME = '3-5 business days';
  const SHIPPING_CHARGE = 50;
  const TAX_RATE = 0.05;

  const taxAmount = Math.round(total * TAX_RATE);
  const finalTotal = total + SHIPPING_CHARGE + taxAmount;

  const billingAddress = {
    name: 'John Doe',
    phone: '+91 98765 43210',
    email: 'john.doe@example.com',
    address: '123 Green Street, Eco Park',
    city: 'Mumbai, Maharashtra',
    zipCode: '400 001',
  };

  const handlePaymentMethod = async method => {
    const orderPayload = {
      retailerId: 'RET00001', // ✅ hardcoded

      items: cartItems.map(({ product, quantity }) => ({
        productId: product.id,
        productName: product.name,
        quantity: quantity,
        unit: product.unit || 'UNIT', // fallback if unit not present
        price: product.discountedPrice,
        // image:"https://example.com"
      })),

      billing: {
        deliveryCharge: SHIPPING_CHARGE,
        discount: 0, // you can change later
        tax: taxAmount,
      },

      payment: {
        mode: method, // COD / UPI / Card
      },

      delivery: {
        type: 'HOME_DELIVERY',
        expectedDeliveryTime: new Date(
          Date.now() + 3 * 24 * 60 * 60 * 1000,
        ).toISOString(), // +3 days
      },
    };

    // ✅ Console original object
    console.log('ORDER PAYLOAD:', orderPayload);

    try {
      const response = await fetch(
        'https://2a0t2oahs8.execute-api.ap-south-1.amazonaws.com/api/v1/order',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderPayload),
        },
      );

      const text = await response.text(); // safer than response.json()

      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        data = {};
      }

      console.log('STATUS:', response.status);
      console.log('API RESPONSE:', data);

      if (response.status >= 200 && response.status < 300) {
        dispatch(clearCart()); // empty cart
        setModalVisible(false);
        setOrderConfirmationVisible(false);
        setOrderPlaced(true);

        setTimeout(() => {
          setOrderPlaced(false);
          navigation.reset({
            index: 0,
            routes: [{ name: 'App' }],
          });
        }, 3000);
      } else {
        Alert.alert(
          'Order Failed',
          data?.message || `Server error (${response.status})`,
        );
      }
    } catch (error) {
      console.log('ORDER ERROR:', error);
      Alert.alert('Network Error', 'Please check your internet connection.');
    }
  };

  return {
    cartItems,
    total,
    finalTotal,
    taxAmount,
    SHIPPING_CHARGE,
    DELIVERY_TIME,
    billingAddress,
    expandedSections,
    toggleSection,
    modalVisible,
    setModalVisible,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    orderConfirmationVisible,
    setOrderConfirmationVisible,
    orderPlaced,
    setOrderPlaced,
    navigation,
    dispatch,
    handlePaymentMethod,
  };
};
