// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';

// // Sample product data
// const sampleProduct = {
//   id: 1,
//   brand: 'Taj Mahal',
//   name: 'Premium Tea Powder 500g',
//   size: '500g',
//   mrp: 160.0,
//   sellingPrice: 500,
//   savings: 70,
//   margin: 22,
//   mainImage:
//     'data:image/jpeg;base64,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',
//   thumbnails: [
//     'https://via.placeholder.com/100',
//     'https://via.placeholder.com/100',
//     'https://via.placeholder.com/100',
//   ],
//   availability: 48,
//   description:
//     'Premium quality tea powder made from finest tea leaves. Perfect blend for a refreshing cup of tea. Strong flavor.',
//   features: [
//     '100% Pure Tea',
//     'Rich Aroma',
//     'Long Lasting Freshness',
//     'Perfect Blend',
//   ],
//   similarProducts: [
//     {
//       id: 2,
//       name: 'Premium Tea Powder 500g',
//       image: 'https://via.placeholder.com/150',
//       mrp: 320.0,
//       sellingPrice: 250,
//     },
//     {
//       id: 3,
//       name: 'Premium Tea Powder 500g',
//       image: 'https://via.placeholder.com/150',
//       mrp: 240.0,
//       sellingPrice: 189,
//     },
//   ],
// };

// // interface Product {
// //   id: number;
// //   brand: string;
// //   name: string;
// //   size: string;
// //   mrp: number;
// //   sellingPrice: number;
// //   savings: number;
// //   margin: number;
// //   mainImage: string;
// //   thumbnails: string[];
// //   availability: number;
// //   description: string;
// //   features: string[];
// //   similarProducts: Array<{
// //     id: number,
// //     name: string,
// //     image: string,
// //     mrp: number,
// //     sellingPrice: number,
// //   }>;
// // }

// const ProductsDetailsScreen = () => {
//   const [quantity, setQuantity] = useState(1);
//   const [mainImage, setMainImage] = useState(product.mainImage);

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation?.goBack()}>
//           <Text style={styles.backButton}>←</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Product Details</Text>
//         <View style={{ width: 30 }} />
//       </View>

//       {/* Main Product Image */}
//       <Image source={{ uri: mainImage }} style={styles.mainImage} />

//       {/* Thumbnails */}
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={styles.thumbnailsContainer}
//       >
//         {product.thumbnails.map((thumb, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => setMainImage(thumb)}
//             style={[
//               styles.thumbnail,
//               mainImage === thumb && styles.activeThumbnail,
//             ]}
//           >
//             <Image source={{ uri: thumb }} style={styles.thumbnailImage} />
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Product Info */}
//       <View style={styles.contentContainer}>
//         {/* Brand and Title */}
//         <Text style={styles.brand}>{product.brand}</Text>
//         <Text style={styles.title}>{product.name}</Text>
//         <Text style={styles.size}>{product.size}</Text>

//         {/* Price Section */}
//         <View style={styles.priceSection}>
//           <View>
//             <Text style={styles.label}>MRP:</Text>
//             <Text style={styles.mrp}>₹{product.mrp.toFixed(2)}</Text>
//           </View>
//           <View style={styles.savingsBadge}>
//             <Text style={styles.savingsText}>Save ₹{product.savings}</Text>
//           </View>
//         </View>

//         {/* Margin Info */}
//         <View style={styles.marginContainer}>
//           <Text style={styles.marginText}>
//             🎯 Your Margin: {product.margin}%
//           </Text>
//         </View>

//         {/* Availability */}
//         <View style={styles.availabilitySection}>
//           <Text style={styles.availabilityLabel}>Availability</Text>
//           <View style={styles.availabilityBadge}>
//             <Text style={styles.availabilityText}>
//               {product.availability} in Stock
//             </Text>
//           </View>
//         </View>

//         {/* Description */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Description</Text>
//           <Text style={styles.descriptionText}>{product.description}</Text>
//         </View>

//         {/* Features */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Features</Text>
//           {product.features.map((feature, index) => (
//             <View key={index} style={styles.featureItem}>
//               <Text style={styles.checkmark}>✓</Text>
//               <Text style={styles.featureText}>{feature}</Text>
//             </View>
//           ))}
//         </View>

//         {/* Similar Products */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Similar Products</Text>
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             style={styles.similarProductsContainer}
//           >
//             {product.similarProducts.map(item => (
//               <View key={item.id} style={styles.similarProductCard}>
//                 <View style={styles.badgeCircle}>
//                   <Text style={styles.badgeNumber}>3</Text>
//                 </View>
//                 <Image
//                   source={{ uri: item.image }}
//                   style={styles.similarProductImage}
//                 />
//                 <Text style={styles.similarProductName}>{item.name}</Text>
//                 <View style={styles.priceContainer}>
//                   <Text style={styles.strikePrice}>
//                     ₹{item.mrp.toFixed(0)}.00
//                   </Text>
//                   <Text style={styles.currentPrice}>₹{item.sellingPrice}</Text>
//                 </View>
//                 <TouchableOpacity style={styles.addNowButton}>
//                   <Text style={styles.addNowButtonText}>🛒 Add Now</Text>
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </ScrollView>
//         </View>

//         {/* Bottom Spacing */}
//         <View style={{ height: 20 }} />
//       </View>

//       {/* Bottom Action Bar */}
//       <View style={styles.bottomBar}>
//         <View style={styles.quantitySelector}>
//           <TouchableOpacity
//             style={styles.quantityButton}
//             onPress={() => quantity > 1 && setQuantity(quantity - 1)}
//           >
//             <Text style={styles.quantityButtonText}>−</Text>
//           </TouchableOpacity>
//           <Text style={styles.quantityText}>{quantity}</Text>
//           <TouchableOpacity
//             style={styles.quantityButton}
//             onPress={() => setQuantity(quantity + 1)}
//           >
//             <Text style={styles.quantityButtonText}>+</Text>
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity style={styles.addToCartButton}>
//           <Text style={styles.addToCartButtonText}>
//             🛒 Add to Cart ₹{(product.sellingPrice * quantity).toFixed(0)}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1a1a1a',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 10,
//     paddingHorizontal: 15,
//     paddingBottom: 15,
//     backgroundColor: '#1a1a1a',
//   },
//   backButton: {
//     fontSize: 24,
//     color: '#fff',
//     fontWeight: '600',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#fff',
//   },
//   mainImage: {
//     width: '100%',
//     height: 350,
//     resizeMode: 'cover',
//     backgroundColor: '#2a2a2a',
//   },
//   thumbnailsContainer: {
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     backgroundColor: '#1a1a1a',
//   },
//   thumbnail: {
//     width: 80,
//     height: 80,
//     marginRight: 10,
//     borderRadius: 8,
//     overflow: 'hidden',
//     borderWidth: 2,
//     borderColor: '#3a3a3a',
//   },
//   activeThumbnail: {
//     borderColor: '#00aa00',
//   },
//   thumbnailImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   contentContainer: {
//     paddingHorizontal: 15,
//     paddingTop: 15,
//     backgroundColor: '#1a1a1a',
//   },
//   brand: {
//     fontSize: 12,
//     color: '#888',
//     marginBottom: 5,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#fff',
//     marginBottom: 8,
//   },
//   size: {
//     fontSize: 14,
//     color: '#aaa',
//     marginBottom: 15,
//   },
//   priceSection: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 12,
//     color: '#888',
//     marginBottom: 4,
//   },
//   mrp: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#fff',
//   },
//   savingsBadge: {
//     backgroundColor: '#00aa00',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },
//   savingsText: {
//     fontSize: 12,
//     color: '#fff',
//     fontWeight: '600',
//   },
//   marginContainer: {
//     backgroundColor: '#2a4a2a',
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     borderRadius: 6,
//     marginBottom: 15,
//   },
//   marginText: {
//     fontSize: 14,
//     color: '#00dd00',
//     fontWeight: '600',
//   },
//   availabilitySection: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingBottom: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#3a3a3a',
//   },
//   availabilityLabel: {
//     fontSize: 14,
//     color: '#aaa',
//     fontWeight: '600',
//   },
//   availabilityBadge: {
//     backgroundColor: '#00aa00',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },
//   availabilityText: {
//     fontSize: 12,
//     color: '#fff',
//     fontWeight: '600',
//   },
//   section: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#fff',
//     marginBottom: 12,
//   },
//   descriptionText: {
//     fontSize: 14,
//     color: '#aaa',
//     lineHeight: 20,
//   },
//   featureItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   checkmark: {
//     fontSize: 18,
//     color: '#00aa00',
//     marginRight: 10,
//     fontWeight: '600',
//   },
//   featureText: {
//     fontSize: 14,
//     color: '#aaa',
//   },
//   similarProductsContainer: {
//     marginHorizontal: -15,
//     paddingHorizontal: 15,
//   },
//   similarProductCard: {
//     width: 150,
//     marginRight: 15,
//     backgroundColor: '#2a2a2a',
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   badgeCircle: {
//     position: 'absolute',
//     top: 10,
//     left: 10,
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#00aa00',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 10,
//   },
//   badgeNumber: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: '#fff',
//   },
//   similarProductImage: {
//     width: '100%',
//     height: 120,
//     resizeMode: 'cover',
//     backgroundColor: '#3a3a3a',
//   },
//   similarProductName: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#fff',
//     paddingHorizontal: 10,
//     paddingTop: 10,
//     lineHeight: 16,
//   },
//   priceContainer: {
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//   },
//   strikePrice: {
//     fontSize: 11,
//     color: '#666',
//     textDecorationLine: 'line-through',
//     marginBottom: 4,
//   },
//   currentPrice: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#00aa00',
//   },
//   addNowButton: {
//     backgroundColor: '#00aa00',
//     marginHorizontal: 10,
//     marginBottom: 10,
//     paddingVertical: 8,
//     borderRadius: 6,
//     alignItems: 'center',
//   },
//   addNowButtonText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#fff',
//   },
//   bottomBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     backgroundColor: '#2a2a2a',
//     borderTopWidth: 1,
//     borderTopColor: '#3a3a3a',
//   },
//   quantitySelector: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#3a3a3a',
//     borderRadius: 25,
//     paddingHorizontal: 5,
//     paddingVertical: 5,
//   },
//   quantityButton: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#1a1a1a',
//   },
//   quantityButtonText: {
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: '600',
//   },
//   quantityText: {
//     fontSize: 14,
//     color: '#fff',
//     marginHorizontal: 15,
//     fontWeight: '600',
//   },
//   addToCartButton: {
//     flex: 1,
//     backgroundColor: '#00aa00',
//     paddingVertical: 12,
//     marginLeft: 10,
//     borderRadius: 6,
//     alignItems: 'center',
//   },
//   addToCartButtonText: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: '#fff',
//   },
// });

// export default ProductsDetailsScreen;
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 👉 use the sample product
const product = sampleProduct;

const ProductsDetailsScreen = () => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.mainImage);

  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Details</Text>
          <View style={{ width: 30 }} />
        </View>

        {/* Main Image */}
        <Image source={{ uri: mainImage }} style={styles.mainImage} />

        {/* Thumbnails */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailsContainer}
        >
          {product.thumbnails.map((thumb, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setMainImage(thumb)}
              style={[
                styles.thumbnail,
                mainImage === thumb && styles.activeThumbnail,
              ]}
            >
              <Image source={{ uri: thumb }} style={styles.thumbnailImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.size}>{product.size}</Text>

          <View style={styles.priceSection}>
            <View>
              <Text style={styles.label}>MRP</Text>
              <Text style={styles.mrp}>₹{product.mrp.toFixed(2)}</Text>
            </View>
            <View style={styles.savingsBadge}>
              <Text style={styles.savingsText}>Save ₹{product.savings}</Text>
            </View>
          </View>

          <View style={styles.marginContainer}>
            <Text style={styles.marginText}>
              🎯 Your Margin: {product.margin}%
            </Text>
          </View>

          <View style={styles.availabilitySection}>
            <Text style={styles.availabilityLabel}>Availability</Text>
            <View style={styles.availabilityBadge}>
              <Text style={styles.availabilityText}>
                {product.availability} in Stock
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <View style={{ height: 80 }} />
        </View>
      </ScrollView>

      {/* Fixed Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => quantity > 1 && setQuantity(quantity - 1)}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>
            🛒 Add to Cart ₹{(product.sellingPrice * quantity).toFixed(0)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductsDetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: '#1a1a1a',
  },
  backButton: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  mainImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
    backgroundColor: '#2a2a2a',
  },
  thumbnailsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#1a1a1a',
  },
  thumbnail: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#3a3a3a',
  },
  activeThumbnail: {
    borderColor: '#00aa00',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#1a1a1a',
  },
  brand: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  size: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 15,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  mrp: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  savingsBadge: {
    backgroundColor: '#00aa00',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  savingsText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  marginContainer: {
    backgroundColor: '#2a4a2a',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
  marginText: {
    fontSize: 14,
    color: '#00dd00',
    fontWeight: '600',
  },
  availabilitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  availabilityLabel: {
    fontSize: 14,
    color: '#aaa',
    fontWeight: '600',
  },
  availabilityBadge: {
    backgroundColor: '#00aa00',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  availabilityText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkmark: {
    fontSize: 18,
    color: '#00aa00',
    marginRight: 10,
    fontWeight: '600',
  },
  featureText: {
    fontSize: 14,
    color: '#aaa',
  },
  similarProductsContainer: {
    marginHorizontal: -15,
    paddingHorizontal: 15,
  },
  similarProductCard: {
    width: 150,
    marginRight: 15,
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    overflow: 'hidden',
  },
  badgeCircle: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#00aa00',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  badgeNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  similarProductImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    backgroundColor: '#3a3a3a',
  },
  similarProductName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    paddingHorizontal: 10,
    paddingTop: 10,
    lineHeight: 16,
  },
  priceContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  strikePrice: {
    fontSize: 11,
    color: '#666',
    textDecorationLine: 'line-through',
    marginBottom: 4,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00aa00',
  },
  addNowButton: {
    backgroundColor: '#00aa00',
    marginHorizontal: 10,
    marginBottom: 10,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  addNowButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#2a2a2a',
    borderTopWidth: 1,
    borderTopColor: '#3a3a3a',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 25,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  quantityText: {
    fontSize: 14,
    color: '#fff',
    marginHorizontal: 15,
    fontWeight: '600',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#00aa00',
    paddingVertical: 12,
    marginLeft: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  addToCartButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
});
