// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import React, { useState } from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Header from '../../components/common/Header';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const { width } = Dimensions.get('window');
// const ITEM_WIDTH = (width - 48) / 2;

// const ProductsScreen = ({ navigation }) => {
//   const [selectedFilters, setSelectedFilters] = useState(['Maggi']);
//   const [cartItems, setCartItems] = useState({});

//   const filters = ['Maggi', 'Salt', 'Sugar', 'Oil'];

//   const products = [
//     {
//       id: '1',
//       name: 'Maggi 2-Minute Masala Noodles',
//       weight: '70g',
//       originalPrice: 15,
//       discountedPrice: 14,
//       image:
//         'https://i.pinimg.com/736x/5c/6d/9f/5c6d9fe78de73a7698948e011d6745f1.jpg',
//     },
//     {
//       id: '2',
//       name: 'Maggi 2-Minute Masala Noodles',
//       weight: '70g',
//       originalPrice: 15,
//       discountedPrice: 14,
//       image:
//         'https://i.pinimg.com/736x/5c/6d/9f/5c6d9fe78de73a7698948e011d6745f1.jpg',
//     },
//   ];

//   const toggleFilter = filter => {
//     setSelectedFilters(prev =>
//       prev.includes(filter)
//         ? prev.filter(f => f !== filter)
//         : [...prev, filter],
//     );
//   };

//   const toggleCartItem = id => {
//     setCartItems(prev => ({
//       ...prev,
//       [id]: prev[id] ? null : 1,
//     }));
//   };

//   const incrementQuantity = id => {
//     setCartItems(prev => ({
//       ...prev,
//       [id]: prev[id] + 1,
//     }));
//   };

//   const decrementQuantity = id => {
//     if (cartItems[id] > 1) {
//       setCartItems(prev => ({
//         ...prev,
//         [id]: prev[id] - 1,
//       }));
//     } else {
//       toggleCartItem(id);
//     }
//   };

//   const renderProductCard = ({ item }) => (
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
//         {cartItems[item.id] ? (
//           <View style={styles.quantityContainer}>
//             <TouchableOpacity
//               onPress={() => decrementQuantity(item.id)}
//               style={styles.quantityBtn}
//             >
//               <Text style={styles.quantityText}>−</Text>
//             </TouchableOpacity>

//             <Text style={styles.quantity}>{cartItems[item.id]}</Text>

//             <TouchableOpacity
//               onPress={() => incrementQuantity(item.id)}
//               style={styles.quantityBtn}
//             >
//               <Ionicons name="add" size={16} color="#000" />
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={() => toggleCartItem(item.id)}
//           >
//             <Ionicons name="add" size={18} color="#000" />
//             <Text style={styles.addButtonText}>Add Now</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header />

//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Filters */}
//         <View style={styles.section}>
//           <View style={styles.detectedHeader}>
//             <Text style={styles.sectionTitle}>Detected Products</Text>
//             <Ionicons name="mic" size={20} color="#22C55E" />
//           </View>

//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             {filters.map(filter => (
//               <TouchableOpacity
//                 key={filter}
//                 style={[
//                   styles.filterButton,
//                   selectedFilters.includes(filter) && styles.filterActive,
//                 ]}
//                 onPress={() => toggleFilter(filter)}
//               >
//                 <Text
//                   style={[
//                     styles.filterButtonText,
//                     selectedFilters.includes(filter) && { color: '#000' },
//                   ]}
//                 >
//                   {filter}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>

//         <FlatList
//           data={products}
//           renderItem={renderProductCard}
//           keyExtractor={item => item.id}
//           numColumns={2}
//           columnWrapperStyle={styles.gridContainer}
//           scrollEnabled={false}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default ProductsScreen;
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
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../components/common/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../../components/Product/ProductCard';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;

const ProductsScreen = () => {
  const [selectedFilters, setSelectedFilters] = useState(['Maggi']);

  const filters = ['Maggi', 'Salt', 'Sugar', 'Oil'];

  const products = [
    {
      id: '1',
      name: 'Maggi 2-Minute Masala Noodles',
      weight: '70g',
      originalPrice: 15,
      discountedPrice: 14,
      image:
        'https://i.pinimg.com/736x/5c/6d/9f/5c6d9fe78de73a7698948e011d6745f1.jpg',
    },
    {
      id: '2',
      name: 'Maggi 2-Minute Masala Noodles',
      weight: '70g',
      originalPrice: 15,
      discountedPrice: 14,
      image:
        'https://i.pinimg.com/736x/5c/6d/9f/5c6d9fe78de73a7698948e011d6745f1.jpg',
    },
  ];

  const toggleFilter = filter => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.detectedHeader}>
            <Text style={styles.sectionTitle}>Detected Products</Text>
            <Ionicons name="mic" size={20} color="#22C55E" />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map(filter => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilters.includes(filter) && styles.filterActive,
                ]}
                onPress={() => toggleFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedFilters.includes(filter) && { color: '#000' },
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <FlatList
          data={products}
          renderItem={({ item }) => <ProductCard item={item} />}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.gridContainer}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductsScreen;
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
