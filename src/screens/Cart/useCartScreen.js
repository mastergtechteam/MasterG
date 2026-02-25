// import { useState, useEffect } from 'react';
// import { Alert } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';

// import {
//   incrementQuantity,
//   decrementQuantity,
//   removeItem,
//   clearCart,
// } from '../../features/cart/cartSlice';

// import {
//   selectCartItemsArray,
//   selectCartTotal,
// } from '../../features/cart/cartSelectors';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BASE_URL } from '../../api/apiClient';

// export const useCartScreen = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   const cartItems = useSelector(selectCartItemsArray);
//   const total = useSelector(selectCartTotal);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
//   const [placingOrder, setPlacingOrder] = useState(false);
//   const [orderConfirmationVisible, setOrderConfirmationVisible] =
//     useState(false);

//   const [expandedSections, setExpandedSections] = useState({
//     billing: false,
//     summary: false,
//     delivery: false,
//   });

//   const toggleSection = section => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   const DELIVERY_TIME = '3-5 business days';
//   const SHIPPING_CHARGE = 50;
//   const TAX_RATE = 0.05;

//   const taxAmount = Math.round(total * TAX_RATE);
//   const finalTotal = total + SHIPPING_CHARGE + taxAmount;

//   const [billingAddress, setBillingAddress] = useState(null);

//   useEffect(() => {
//     const loadAddress = async () => {
//       const storedAddress = await AsyncStorage.getItem('address');
//       if (storedAddress) setBillingAddress(JSON.parse(storedAddress));
//     };
//     loadAddress();
//   }, []);

//   const handlePaymentMethod = async method => {
//     setPlacingOrder(true);
//     const retailerId = await AsyncStorage.getItem('user_uuid');
//     const orderPayload = {
//       retailerId,

//       items: cartItems.map(({ product, quantity }) => ({
//         productId: product.id,
//         productName: product.name,
//         quantity: quantity,
//         unit: product.unit || 'UNIT', // fallback if unit not present
//         price: product.discountedPrice,
//         // image:"https://example.com"
//       })),

//       billing: {
//         deliveryCharge: SHIPPING_CHARGE,
//         discount: 0, // you can change later
//         tax: taxAmount,
//       },

//       payment: {
//         mode: method, // COD / UPI / Card
//       },

//       delivery: {
//         type: 'HOME_DELIVERY',
//         expectedDeliveryTime: new Date(
//           Date.now() + 3 * 24 * 60 * 60 * 1000,
//         ).toISOString(), // +3 days
//         address: billingAddress,
//       },
//     };

//     const TAG = '[API:Order]';
//     console.log(TAG, '▶ Placing order...');
//     console.log(TAG, '📦 Payload:', JSON.stringify(orderPayload, null, 2));

//     const start = Date.now();
//     try {
//       const response = await fetch(`${BASE_URL}/api/v1/order`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(orderPayload),
//       });
//       console.log(TAG, `⏱ Response received — ${Date.now() - start}ms`);
//       console.log(TAG, `📡 Status: ${response.status}`);

//       const text = await response.text();
//       let data;
//       try {
//         data = text ? JSON.parse(text) : {};
//       } catch (e) {
//         data = {};
//       }
//       console.log(TAG, '📩 Response body:', JSON.stringify(data, null, 2));

//       if (response.status >= 200 && response.status < 300) {
//         setModalVisible(false);
//         setOrderConfirmationVisible(false);
//         setOrderPlaced(true);
//         setPlacingOrder(false);

//         setTimeout(() => {
//           setOrderPlaced(false);

//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'App' }],
//           });

//           dispatch(clearCart()); // 👈 MOVE HERE (after navigation)
//         }, 3000);
//       } else {
//         setPlacingOrder(false);
//         console.warn(TAG, `❌ Order failed — status: ${response.status}`);
//         const getErrorMessage = (status, message) => {
//           if (status >= 500) {
//             return 'We are experiencing high demand right now. Please try again in a few moments.';
//           }

//           if (status === 400) {
//             return (
//               message ||
//               'Some order details are invalid. Please review and try again.'
//             );
//           }

//           if (status === 401) {
//             return 'Your session has expired. Please login again.';
//           }

//           if (status === 404) {
//             return 'Something went wrong while placing your order. Please try again.';
//           }

//           return (
//             message ||
//             'Unable to place your order at the moment. Please try again.'
//           );
//         };

//         Alert.alert(
//           'Unable to Place Order',
//           getErrorMessage(response.status, data?.message),
//         );
//       }
//     } catch (error) {
//       setPlacingOrder(false);
//       console.error(
//         TAG,
//         `❌ Network error — ${Date.now() - start}ms`,
//         error.message,
//       );
//       Alert.alert('Network Error', 'Please check your internet connection.');
//     }
//   };

//   return {
//     cartItems,
//     total,
//     finalTotal,
//     taxAmount,
//     SHIPPING_CHARGE,
//     DELIVERY_TIME,
//     billingAddress,
//     expandedSections,
//     toggleSection,
//     modalVisible,
//     setModalVisible,
//     selectedPaymentMethod,
//     setSelectedPaymentMethod,
//     orderConfirmationVisible,
//     setOrderConfirmationVisible,
//     orderPlaced,
//     setOrderPlaced,
//     navigation,
//     dispatch,
//     handlePaymentMethod,
//     placingOrder,
//   };
// };

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

export const useCartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const cartItems = useSelector(selectCartItemsArray);
  const total = useSelector(selectCartTotal);

  const retailerProfile = useSelector(state => state.retailer.profile);
  const billingAddress = retailerProfile?.address;

  const [modalVisible, setModalVisible] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [placingOrder, setPlacingOrder] = useState(false);
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

      billing: {
        deliveryCharge: SHIPPING_CHARGE,
        discount: 0,
        tax: taxAmount,
      },

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
    console.log(TAG, '▶ Placing order...');
    console.log(TAG, '📦 Payload:', JSON.stringify(orderPayload, null, 2));

    const start = Date.now();

    try {
      const response = await fetch(`${BASE_URL}/api/v1/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

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

          if (status === 401) {
            return 'Your session has expired. Please login again.';
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
    placingOrder,
  };
};
