import { useState, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../api/apiClient';

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

  const [billingAddress, setBillingAddress] = useState(null);

  useEffect(() => {
    const loadAddress = async () => {
      const storedAddress = await AsyncStorage.getItem('address');
      if (storedAddress) setBillingAddress(JSON.parse(storedAddress));
    };
    loadAddress();
  }, []);

  const handlePaymentMethod = async method => {
    const retailerId = await AsyncStorage.getItem('user_uuid');

    const orderPayload = {
      retailerId,

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
        address: billingAddress,
      },
    };

    const TAG = '[API:Order]';
    console.log(TAG, '▶ Placing order...');
    console.log(TAG, '📦 Payload:', JSON.stringify(orderPayload, null, 2));

    const start = Date.now();
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/order`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderPayload),
        },
      );
      console.log(TAG, `⏱ Response received — ${Date.now() - start}ms`);
      console.log(TAG, `📡 Status: ${response.status}`);

      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        data = {};
      }
      console.log(TAG, '📩 Response body:', JSON.stringify(data, null, 2));

      if (response.status >= 200 && response.status < 300) {
        console.log(TAG, '✅ Order placed successfully');
        dispatch(clearCart());
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
        console.warn(TAG, `❌ Order failed — status: ${response.status}`);
        Alert.alert(
          'Order Failed',
          data?.message || `Server error (${response.status})`,
        );
      }
    } catch (error) {
      console.error(TAG, `❌ Network error — ${Date.now() - start}ms`, error.message);
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
