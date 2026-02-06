// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import React, { useState } from 'react';
// import { colors } from '../../theme/colors';
// import { typography } from '../../theme/typography';
// import { spacing } from '../../theme/spacing';
// import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Header from '../../components/common/Header';
// import { useNavigation } from '@react-navigation/native';

// const CartScreen = () => {
//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       name: 'Maggi Masala Noodles',
//       description: '70g × 4 Pack',
//       price: 190,
//       quantity: 4,
//       image:
//         'https://i.pinimg.com/736x/5c/6d/9f/5c6d9fe78de73a7698948e011d6745f1.jpg',
//     },
//     {
//       id: 2,
//       name: 'Maggi Atta Noodles',
//       description: '70g × 4 Pack',
//       price: 190,
//       quantity: 4,
//       image:
//         'https://i.pinimg.com/736x/5c/6d/9f/5c6d9fe78de73a7698948e011d6745f1.jpg',
//     },
//     {
//       id: 3,
//       name: 'Maggi Masala Noodles',
//       description: '70g × 4 Pack',
//       price: 190,
//       quantity: 4,
//       image:
//         'https://i.pinimg.com/736x/5c/6d/9f/5c6d9fe78de73a7698948e011d6745f1.jpg',
//     },
//   ]);
//   const navigation = useNavigation();
//   const updateQuantity = (id, delta) => {
//     setCartItems(
//       cartItems.map(item =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, item.quantity + delta) }
//           : item,
//       ),
//     );
//   };

//   const getTotalPrice = () => {
//     return cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0,
//     );
//   };

//   const handlePlaceOrder = () => {
//     console.log('Order placed');
//     console.log('Order details:', {
//       items: cartItems,
//       total: getTotalPrice(),
//     });
//     Alert.alert('Order Placed', 'Your order has been placed successfully!');
//     navigation.navigate('Categories');
//   };
//   return (
//     <SafeAreaView style={styles.container}>
//       <Header />
//       <ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Cart Items */}
//         <View style={styles.itemsContainer}>
//           {cartItems.map(item => (
//             <View key={item.id} style={styles.cartItem}>
//               {/* Product Image */}
//               <Image source={{ uri: item.image }} style={styles.productImage} />

//               {/* Product Details */}
//               <View style={styles.itemDetails}>
//                 <Text style={styles.productName}>{item.name}</Text>
//                 <Text style={styles.description}>{item.description}</Text>
//                 <Text style={styles.price}>₹{item.price}</Text>
//               </View>

//               {/* Delete Button */}

//               {/* Quantity Controls */}
//               <View style={styles.quantityControl}>
//                 <TouchableOpacity
//                   onPress={() => updateQuantity(item.id, -1)}
//                   style={styles.quantityBtn}
//                 >
//                   <Text style={styles.quantityText}>−</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.quantityValue}>{item.quantity}</Text>
//                 <TouchableOpacity
//                   onPress={() => updateQuantity(item.id, 1)}
//                   style={styles.quantityBtn}
//                 >
//                   <Text style={styles.quantityText}>+</Text>
//                 </TouchableOpacity>
//               </View>

//               <TouchableOpacity style={styles.deleteBtn}>
//                 {/* <Text style={styles.deleteIcon}>🗑</Text> */}
//                 <MaterialDesignIcons
//                   name="delete-outline"
//                   style={styles.deleteIcon}
//                 />
//               </TouchableOpacity>
//             </View>
//           ))}
//         </View>

//         {/* Order Summary */}
//         <View style={styles.summaryContainer}>
//           <Text style={styles.summaryTitle}>Order Summary</Text>

//           {cartItems.map(item => (
//             <View key={`summary-${item.id}`} style={styles.summaryItem}>
//               <View>
//                 <Text style={styles.itemName}>{item.name}</Text>
//                 <Text style={styles.itemDesc}>{item.description}</Text>
//               </View>
//               <Text style={styles.itemPrice}>₹{item.price}</Text>
//             </View>
//           ))}

//           <View style={styles.separator} />

//           {/* Total */}
//           <View style={styles.totalContainer}>
//             <Text style={styles.totalLabel}>Total</Text>
//             <Text style={styles.totalPrice}>₹{getTotalPrice()}</Text>
//           </View>
//         </View>
//         <TouchableOpacity
//           style={styles.placeOrderBtn}
//           onPress={handlePlaceOrder}
//         >
//           <Text style={styles.placeOrderText}>Proceed to pay</Text>
//           <Text style={styles.placeOrderPrice}>₹{getTotalPrice()}</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Place Order Button */}
//     </SafeAreaView>
//   );
// };

// export default CartScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   scrollView: {
//     flex: 1,
//     paddingHorizontal: spacing.md,
//     paddingVertical: spacing.md,
//     marginBottom: 50,
//   },
//   itemsContainer: {
//     marginBottom: spacing.lg,
//   },
//   cartItem: {
//     flexDirection: 'row',
//     backgroundColor: colors.surface,
//     borderRadius: 12,
//     padding: spacing.md,
//     marginBottom: spacing.md,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: colors.border,
//   },
//   productImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     marginRight: spacing.md,
//   },
//   itemDetails: {
//     flex: 1,
//   },
//   productName: {
//     fontSize: typography.fontSize.md,
//     fontWeight: '600',
//     color: colors.textPrimary,
//     marginBottom: spacing.xs,
//   },
//   description: {
//     fontSize: typography.fontSize.sm,
//     color: colors.textSecondary,
//     marginBottom: spacing.xs,
//   },
//   price: {
//     fontSize: typography.fontSize.md,
//     fontWeight: '600',
//     color: colors.textPrimary,
//   },
//   deleteBtn: {
//     marginLeft: spacing.sm,
//     marginRight: spacing.sm,
//   },
//   deleteIcon: {
//     fontSize: 20,
//     color: colors.white,
//   },
//   quantityControl: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: colors.surfaceElevated,
//     borderRadius: 6,
//     paddingHorizontal: spacing.sm,
//     paddingVertical: spacing.xs,
//   },
//   quantityBtn: {
//     paddingHorizontal: spacing.sm,
//     paddingVertical: spacing.xs,
//   },
//   quantityText: {
//     fontSize: typography.fontSize.lg,
//     color: colors.primary,
//     fontWeight: 'bold',
//   },
//   quantityValue: {
//     fontSize: typography.fontSize.md,
//     color: colors.textPrimary,
//     marginHorizontal: spacing.sm,
//     minWidth: 20,
//     textAlign: 'center',
//   },
//   summaryContainer: {
//     backgroundColor: colors.surface,
//     borderRadius: 12,
//     padding: spacing.md,
//     borderWidth: 1,
//     borderColor: colors.border,
//     marginBottom: spacing.lg,
//   },
//   summaryTitle: {
//     fontSize: typography.fontSize.md,
//     fontWeight: '600',
//     color: colors.textPrimary,
//     marginBottom: spacing.md,
//   },
//   summaryItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: spacing.md,
//     paddingBottom: spacing.md,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//   },
//   itemName: {
//     fontSize: typography.fontSize.sm,
//     color: colors.textPrimary,
//     fontWeight: '500',
//     marginBottom: spacing.xs,
//   },
//   itemDesc: {
//     fontSize: typography.fontSize.xs,
//     color: colors.textSecondary,
//   },
//   itemPrice: {
//     fontSize: typography.fontSize.md,
//     fontWeight: '600',
//     color: colors.textPrimary,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: colors.border,
//     marginVertical: spacing.sm,
//   },
//   totalContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: spacing.md,
//   },
//   totalLabel: {
//     fontSize: typography.fontSize.md,
//     fontWeight: '600',
//     color: colors.textPrimary,
//   },
//   totalPrice: {
//     fontSize: typography.fontSize.md,
//     fontWeight: '600',
//     color: colors.primary,
//   },
//   placeOrderBtn: {
//     backgroundColor: colors.primary,
//     borderRadius: 12,
//     paddingVertical: spacing.lg,
//     marginHorizontal: spacing.md,
//     marginBottom: spacing.lg,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: spacing.lg,
//     marginBottom: 80,
//   },
//   placeOrderText: {
//     fontSize: typography.fontSize.md,
//     fontWeight: '600',
//     color: colors.black,
//   },
//   placeOrderPrice: {
//     fontSize: typography.fontSize.md,
//     fontWeight: '600',
//     color: colors.black,
//   },
// });

// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Header from '../../components/common/Header';
// import {
//   incrementQuantity,
//   decrementQuantity,
//   removeItem,
// } from '../../features/cart/cartSlice';
// import {
//   selectCartItems,
//   selectCartTotal,
// } from '../../features/cart/cartSelectors';
// import { colors } from '../../theme/colors';
// import { spacing } from '../../theme/spacing';
// import { typography } from '../../theme/typography';

// const CartScreen = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector(selectCartItems);
//   const total = useSelector(selectCartTotal);

//   // If you need array form:
//   const cartItemsArray = Object.values(cartItems);

//   const handlePlaceOrder = () => {
//     Alert.alert('Order Placed', 'Your order has been placed successfully!');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header />
//       <ScrollView style={styles.scrollView}>
//         <View style={styles.itemsContainer}>
//           {cartItems.map(({ product, quantity }) => (
//             <View key={product.id} style={styles.cartItem}>
//               <Image
//                 source={{ uri: product.image }}
//                 style={styles.productImage}
//               />

//               <View style={styles.itemDetails}>
//                 <Text style={styles.productName}>{product.name}</Text>
//                 <Text style={styles.description}>{product.weight}</Text>
//                 <Text style={styles.price}>₹{product.discountedPrice}</Text>
//               </View>

//               <View style={styles.quantityControl}>
//                 <TouchableOpacity
//                   onPress={() => dispatch(decrementQuantity(product.id))}
//                 >
//                   <Text style={styles.quantityText}>−</Text>
//                 </TouchableOpacity>

//                 <Text style={styles.quantityValue}>{quantity}</Text>

//                 <TouchableOpacity
//                   onPress={() => dispatch(incrementQuantity(product.id))}
//                 >
//                   <Text style={styles.quantityText}>+</Text>
//                 </TouchableOpacity>
//               </View>

//               <TouchableOpacity
//                 onPress={() => dispatch(removeItem(product.id))}
//                 style={styles.deleteBtn}
//               >
//                 <MaterialDesignIcons
//                   name="delete-outline"
//                   style={styles.deleteIcon}
//                 />
//               </TouchableOpacity>
//             </View>
//           ))}
//         </View>

//         <TouchableOpacity
//           style={styles.placeOrderBtn}
//           onPress={handlePlaceOrder}
//         >
//           <Text style={styles.placeOrderText}>Proceed to pay</Text>
//           <Text style={styles.placeOrderPrice}>₹{total}</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default CartScreen;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   scrollView: {
//     flex: 1,
//     paddingHorizontal: spacing.md,
//     paddingVertical: spacing.md,
//     marginBottom: 50,
//   },
//   itemsContainer: {
//     marginBottom: spacing.lg,
//   },
//   cartItem: {
//     flexDirection: 'row',
//     backgroundColor: colors.surface,
//     borderRadius: 12,
//     padding: spacing.md,
//     marginBottom: spacing.md,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: colors.border,
//   },
//   productImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     marginRight: spacing.md,
//   },
//   itemDetails: {
//     flex: 1,
//   },
//   productName: {
//     fontSize: typography.fontSize.md,
//     fontWeight: '600',
//     color: colors.textPrimary,
//     marginBottom: spacing.xs,
//   },
//   description: {
//     fontSize: typography.fontSize.sm,
//     color: colors.textSecondary,
//     marginBottom: spacing.xs,
//   },
//   price: {
//     fontSize: typography.fontSize.md,
//     fontWeight: '600',
//     color: colors.textPrimary,
//   },
//   deleteBtn: {
//     marginLeft: spacing.sm,
//     marginRight: spacing.sm,
//   },
//   deleteIcon: {
//     fontSize: 20,
//     color: colors.white,
//   },
//   quantityControl: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: colors.surfaceElevated,
//     borderRadius: 6,
//     paddingHorizontal: spacing.sm,
//     paddingVertical: spacing.xs,
//   },
//   quantityBtn: {
//     paddingHorizontal: spacing.sm,
//     paddingVertical: spacing.xs,
//   },
//   quantityText: {
//     fontSize: typography.fontSize.lg,
//     color: colors.primary,
//     fontWeight: 'bold',
//   },
//   quantityValue: {
//     fontSize: typography.fontSize.md,
//     color: colors.textPrimary,
//     marginHorizontal: spacing.sm,
//     minWidth: 20,
//     textAlign: 'center',
//   },
//   summaryContainer: {
//     backgroundColor: colors.surface,
//     borderRadius: 12,
//     padding: spacing.md,
//     borderWidth: 1,
//     borderColor: colors.border,
//     marginBottom: spacing.lg,
//   },
//   summaryTitle: {
//     fontSize: typography.fontSize.md,
//     fontWeight: '600',
//     color: colors.textPrimary,
//     marginBottom: spacing.md,
//   },
//   summaryItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: spacing.md,
//     paddingBottom: spacing.md,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//   },
//   itemName: {
//     fontSize: typography.fontSize.sm,
//     color: colors.textPrimary,
//     fontWeight: '500',
//     marginBottom: spacing.xs,
//   },
//   itemDesc: {
//     fontSize: typography.fontSize.xs,
//     color: colors.textSecondary,
//   },
//   itemPrice: {
//     fontSize: typography.fontSize.md,
//     fontWeight: '600',
//     color: colors.textPrimary,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: colors.border,
//     marginVertical: spacing.sm,
//   },
//   totalContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: spacing.md,
//   },
//   totalLabel: {
//     fontSize: typography.fontSize.md,
//     fontWeight: '600',
//     color: colors.textPrimary,
//   },
//   totalPrice: {
//     fontSize: typography.fontSize.md,
//     fontWeight: '600',
//     color: colors.primary,
//   },
//   placeOrderBtn: {
//     backgroundColor: colors.primary,
//     borderRadius: 12,
//     paddingVertical: spacing.lg,
//     marginHorizontal: spacing.md,
//     marginBottom: spacing.lg,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: spacing.lg,
//     marginBottom: 80,
//   },
//   placeOrderText: {
//     fontSize: typography.fontSize.md,
//     fontWeight: '600',
//     color: colors.black,
//   },
//   placeOrderPrice: {
//     fontSize: typography.fontSize.md,
//     fontWeight: '600',
//     color: colors.black,
//   },
// });
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../components/common/Header';
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from '../../features/cart/cartSlice';

import {
  selectCartItemsArray,
  selectCartTotal,
} from '../../features/cart/cartSelectors';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const CartScreen = () => {
  const dispatch = useDispatch();

  // ✅ ARRAY selector (safe for map)
  const cartItems = useSelector(selectCartItemsArray);
  const total = useSelector(selectCartTotal);

  const handlePlaceOrder = () => {
    Alert.alert('Order Placed', 'Your order has been placed successfully!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView style={styles.scrollView}>
        <View style={styles.itemsContainer}>
          {cartItems.map(({ product, quantity }) => (
            <View key={product.id} style={styles.cartItem}>
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />

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
                <MaterialDesignIcons
                  name="delete-outline"
                  style={styles.deleteIcon}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.placeOrderBtn}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderText}>Proceed to pay</Text>
          <Text style={styles.placeOrderPrice}>₹{total}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: 50,
  },
  itemsContainer: {
    marginBottom: spacing.lg,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: spacing.md,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  price: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  deleteBtn: {
    marginLeft: spacing.sm,
    marginRight: spacing.sm,
  },
  deleteIcon: {
    fontSize: 20,
    color: colors.white,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderRadius: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  quantityBtn: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  quantityText: {
    fontSize: typography.fontSize.lg,
    color: colors.primary,
    fontWeight: 'bold',
  },
  quantityValue: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    marginHorizontal: spacing.sm,
    minWidth: 20,
    textAlign: 'center',
  },
  summaryContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  summaryTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemName: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  itemDesc: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  itemPrice: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  totalLabel: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  totalPrice: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.primary,
  },
  placeOrderBtn: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.lg,
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: 80,
  },
  placeOrderText: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.black,
  },
  placeOrderPrice: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.black,
  },
});
