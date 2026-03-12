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

import { BASE_URL } from '../../api/apiClient';
import { getAuthData } from '../../utils/secureStore';
import { getAppType } from '../../config/appConfig';

export const useCartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const cartItems = useSelector(selectCartItemsArray);
  const total = useSelector(selectCartTotal);

  const retailerProfile = useSelector(state => state.retailer.profile);
  const billingAddress = retailerProfile?.address;
  const ShopName = retailerProfile?.storeName || retailerProfile?.ownerName;

  const [modalVisible, setModalVisible] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderConfirmationVisible, setOrderConfirmationVisible] =
    useState(false);

  const [expandedSections, setExpandedSections] = useState({
    billing: true,
    summary: false,
    delivery: true,
  });

  const toggleSection = section => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const DELIVERY_TIME = '3-5 business days';

  const finalTotal = total;

  // ✅ Profile validation (safe + minimal)
  const isProfileComplete = () => {
    if (!retailerProfile) return false;

    const { storeName, contact, address } = retailerProfile;

    if (!storeName) return false;
    if (!contact?.mobile) return false;
    if (!address?.line1 || !address?.city || !address?.pincode) return false;

    return true;
  };

  const handlePaymentMethod = async method => {
    // 🚨 Block order if profile incomplete
    if (!isProfileComplete()) {
      Alert.alert(
        'Profile Incomplete',
        'Please complete your profile and add delivery address to place order.',
        [
          {
            text: 'Go to Profile',
            onPress: () => navigation.navigate('Profile'),
          },
          { text: 'Cancel', style: 'cancel' },
        ],
      );
      return;
    }

    setPlacingOrder(true);

    const retailerId = retailerProfile?.id || retailerProfile?.retailerId;
    const FALLBACK_IMAGE =
      'https://via.placeholder.com/150x150.png?text=No+Image';

    const orderPayload = {
      retailerId,

      items: cartItems.map(({ product, quantity }) => ({
        productId: product?.id,
        productName: product?.name,
        quantity,
        unit: product?.unit || 'UNIT',
        price: product?.discountedPrice || 0,
        image:
          typeof product?.image === 'string' && product.image.trim().length > 0
            ? product.image
            : FALLBACK_IMAGE,
      })),

      // billing: {
      //   deliveryCharge: SHIPPING_CHARGE,
      //   discount: 0,
      //   tax: taxAmount,
      // },

      payment: {
        mode: method,
      },

      delivery: {
        type: 'HOME_DELIVERY',
        expectedDeliveryTime: new Date(
          Date.now() + 3 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        address: billingAddress,
      },
    };

    const TAG = '[API:Order]';

    const start = Date.now();

    try {
      // 🔐 Get token from secure storage
      const authData = await getAuthData();

      if (!authData?.token) {
        setPlacingOrder(false);
        Alert.alert('Session Expired', 'Please login again.');
        navigation.replace('Auth');
        return;
      }

      const response = await fetch(`${BASE_URL}/api/v1/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authData.token}`,
          'X-App-Type': getAppType(),
        },
        body: JSON.stringify(orderPayload),
      });

      const text = await response.text();
      let data;

      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        data = {};
      }

      if (response.status >= 200 && response.status < 300) {
        setModalVisible(false);
        setOrderConfirmationVisible(false);
        setOrderPlaced(true);
        setPlacingOrder(false);

        setTimeout(() => {
          setOrderPlaced(false);

          navigation.reset({
            index: 0,
            routes: [{ name: 'App' }],
          });

          dispatch(clearCart());
        }, 3000);
      } else {
        setPlacingOrder(false);

        // 🔥 Handle 401 separately
        if (response.status === 401) {
          await clearAuthData();
          dispatch(clearCart());
          navigation.replace('Auth');
          return;
        }

        const getErrorMessage = (status, message) => {
          if (status >= 500) {
            return 'We are experiencing high demand right now. Please try again in a few moments.';
          }

          if (status === 400) {
            return (
              message ||
              'Some order details are invalid. Please review and try again.'
            );
          }

          if (status === 404) {
            return 'Something went wrong while placing your order. Please try again.';
          }

          return (
            message ||
            'Unable to place your order at the moment. Please try again.'
          );
        };

        Alert.alert(
          'Unable to Place Order',
          getErrorMessage(response.status, data?.message),
        );
      }
    } catch (error) {
      setPlacingOrder(false);

      console.error(
        TAG,
        `❌ Network error — ${Date.now() - start}ms`,
        error.message,
      );

      Alert.alert('Network Error', 'Please check your internet connection.');
    }
  };

  return {
    cartItems,
    total,
    finalTotal,
    DELIVERY_TIME,
    billingAddress,
    ShopName,
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
    placingOrder,
  };
};
