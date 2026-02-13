import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../components/common/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../../components/Product/ProductCard';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItemsArray } from '../../features/cart/cartSelectors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchData } from '../../features/common/commonThunks';
import GoBackHeader from '../../components/common/GoBackHeader';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import CartBottomTab from '../../components/common/cartBottomTab';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;

const ProductsScreen = () => {
  const [selectedFilters, setSelectedFilters] = useState(['Maggi']);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItemsArray);
  const cartItemCount = cartItems.length;
  // const filters = ['Maggi', 'Salt', 'Sugar', 'Oil'];

  const { item } = route.params;
  const categoryId = item.id;
  // console.log(item);

  useEffect(() => {
    if (!data) {
      dispatch(
        fetchData({
          endpoint: '/products',
          params: { categoryId },
        }),
      );
    }
  }, [categoryId, data]);

  const key = `/products_${JSON.stringify({ categoryId })}`;

  const data = useSelector(state => state.common.data[key]);
  const loading = useSelector(state => state.common.loading);
  const error = useSelector(state => state.common.error);

  // console.log(data?.data);

  const products = data?.data || [];

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to Load Products"
        message="Unable to fetch products. Check your connection and try again."
        // icon={require('../../assets/images/error.png')}
        // errorCode="500"
        // onRetry={() => refetchData()}
        retryLabel="Retry"
      />
    );
  }
  if (!loading && products.length === 0) {
    return (
      <EmptyState
        title="No Products Found"
        message="Try searching with different keywords"
        // icon={require('../../assets/images/empty-search.png')}
        showIcon={true}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header /> */}
      <GoBackHeader title={item?.title || 'Popular Items'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductCard item={item} />}
          keyExtractor={item => item.productId}
          numColumns={2}
          columnWrapperStyle={styles.gridContainer}
          scrollEnabled={false}
        />
      </ScrollView>

      {/* Bottom Cart Tab */}
      {cartItemCount > 0 && (
        // <View style={styles.cartTab}>
        //   <View style={styles.cartInfo}>
        //     <Text style={styles.cartCount}>
        //       {cartItemCount} item{cartItemCount !== 1 ? 's' : ''}
        //     </Text>
        //     <Text style={styles.cartLabel}>in cart</Text>
        //   </View>
        //   <TouchableOpacity
        //     style={styles.viewCartButton}
        //     onPress={() => navigation.navigate('Cart')}
        //   >
        //     <Text style={styles.viewCartText}>View Cart</Text>
        //     <Ionicons name="chevron-forward" size={18} color="#000" />
        //   </TouchableOpacity>
        // </View>
        <CartBottomTab />
      )}
    </SafeAreaView>
  );
};

export default ProductsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  scrollView: {
    marginVertical: 20,
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
  cartTab: {
    position: 'absolute',
    bottom: 120,
    left: 16, // 👈 side margin
    right: 16,
    backgroundColor: '#22C55E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cartCount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  cartLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  viewCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  viewCartText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
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
