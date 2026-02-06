// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import React from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   addToCart,
//   incrementQuantity,
//   decrementQuantity,
// } from '../../features/cart/cartSlice';

// const { width } = Dimensions.get('window');
// const ITEM_WIDTH = (width - 48) / 2;

// const ProductCard = ({ item }) => {
//   const dispatch = useDispatch();
//   const cartItem = useSelector(state => state.cart.items[item.id]);
//   const quantity = cartItem?.quantity ?? 0;

//   return (
//     <View style={styles.productCard}>
//       <View style={styles.imageBadgeContainer}>
//         <Image source={{ uri: item.image }} style={styles.productImage} />
//         <View style={styles.badge}>
//           <Ionicons name="checkmark" size={14} color="#000" />
//         </View>
//       </View>

//       <View style={styles.productInfo}>
//         <Text style={styles.productName} numberOfLines={2}>
//           {item.name}
//         </Text>
//         <Text style={styles.weight}>{item.weight}</Text>
//         <Text style={styles.onlyLabel}>Only</Text>

//         <View style={styles.priceContainer}>
//           <Text style={styles.discountedPrice}>₹{item.discountedPrice}</Text>
//           <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
//         </View>
//       </View>

//       <View style={styles.actionButton}>
//         {quantity > 0 ? (
//           <View style={styles.quantityContainer}>
//             <TouchableOpacity
//               onPress={() => dispatch(decrementQuantity(item.id))}
//             >
//               <Text style={styles.quantityText}>−</Text>
//             </TouchableOpacity>

//             <Text style={styles.quantity}>{quantity}</Text>

//             <TouchableOpacity
//               onPress={() => dispatch(incrementQuantity(item.id))}
//             >
//               <Ionicons name="add" size={16} color="#000" />
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={() => dispatch(addToCart(item))}
//           >
//             <Ionicons name="add" size={18} color="#000" />
//             <Text style={styles.addButtonText}>Add Now</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

// export default ProductCard;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0f0f0f',
//   },
//   section: {
//     padding: 16,
//   },
//   detectedHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },
//   sectionTitle: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   filterButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#22C55E',
//     marginRight: 8,
//   },
//   filterActive: {
//     backgroundColor: '#22C55E',
//   },
//   filterButtonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   gridContainer: {
//     paddingHorizontal: 16,
//     justifyContent: 'space-between',
//   },
//   productCard: {
//     width: ITEM_WIDTH,
//     backgroundColor: '#1a1a1a',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#2a2a2a',
//     marginBottom: 12,
//   },
//   imageBadgeContainer: {
//     height: 140,
//   },
//   productImage: {
//     width: '100%',
//     height: '100%',
//   },
//   badge: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     backgroundColor: '#22C55E',
//     width: 26,
//     height: 26,
//     borderRadius: 13,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   productInfo: {
//     padding: 10,
//   },
//   productName: {
//     color: '#fff',
//     fontSize: 13,
//     fontWeight: '600',
//   },
//   weight: {
//     color: '#aaa',
//     fontSize: 12,
//   },
//   onlyLabel: {
//     color: '#777',
//     fontSize: 11,
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     gap: 6,
//     marginTop: 6,
//   },
//   discountedPrice: {
//     color: '#22C55E',
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   originalPrice: {
//     color: '#777',
//     fontSize: 12,
//     textDecorationLine: 'line-through',
//   },
//   actionButton: {
//     padding: 10,
//   },
//   addButton: {
//     backgroundColor: '#22C55E',
//     borderRadius: 8,
//     paddingVertical: 10,
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 6,
//   },
//   addButtonText: {
//     fontWeight: '600',
//     color: '#000',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#22C55E',
//     borderRadius: 8,
//     padding: 8,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   quantityText: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   quantity: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
// });
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from '../../features/cart/cartSlice';
import { selectCartItemById } from '../../features/cart/cartSelectors';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(item.id));
  const quantity = cartItem?.quantity ?? 0;

  return (
    <View style={styles.productCard}>
      <View style={styles.imageBadgeContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.weight}>{item.weight}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.discountedPrice}>₹{item.discountedPrice}</Text>
          <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
        </View>
      </View>

      <View style={styles.actionButton}>
        {quantity > 0 ? (
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => dispatch(decrementQuantity(item.id))}
            >
              <Text style={styles.quantityText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.quantity}>{quantity}</Text>

            <TouchableOpacity
              onPress={() => dispatch(incrementQuantity(item.id))}
            >
              <Ionicons name="add" size={16} color="#000" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => dispatch(addToCart(item))}
          >
            <Ionicons name="add" size={18} color="#000" />
            <Text style={styles.addButtonText}>Add Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ProductCard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  section: {
    padding: 16,
  },
  detectedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#22C55E',
    marginRight: 8,
  },
  filterActive: {
    backgroundColor: '#22C55E',
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  gridContainer: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  productCard: {
    width: ITEM_WIDTH,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    marginBottom: 12,
  },
  imageBadgeContainer: {
    height: 140,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#22C55E',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  weight: {
    color: '#aaa',
    fontSize: 12,
  },
  onlyLabel: {
    color: '#777',
    fontSize: 11,
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  discountedPrice: {
    color: '#22C55E',
    fontSize: 16,
    fontWeight: '700',
  },
  originalPrice: {
    color: '#777',
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  actionButton: {
    padding: 10,
  },
  addButton: {
    backgroundColor: '#22C55E',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  addButtonText: {
    fontWeight: '600',
    color: '#000',
  },
  quantityContainer: {
    flexDirection: 'row',
    backgroundColor: '#22C55E',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
  },
  quantity: {
    fontSize: 14,
    fontWeight: '600',
  },
});
