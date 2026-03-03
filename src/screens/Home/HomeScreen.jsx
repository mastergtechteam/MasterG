import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import AppSafeArea from '../../components/common/AppSafeArea';
import BannerCarousel from '../../components/Home/BannerCrousel';
import Header from '../../components/common/Header';
import ActionCard from '../../components/Home/ActionCard';
import DealsList from '../../components/Home/DealsList';
import CategoriesSection from '../../components/Home/CategoriesSection';
import CartBottomTab from '../../components/common/cartBottomTab';
import { useNavigation } from '@react-navigation/native';
import { useHomeData } from '../../hooks/useHomeData';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../components/common/SearchBar';
import ProductCard from '../../components/Product/ProductCard';
import { BASE_URL } from '../../api/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuthData } from '../../utils/secureStore';
import { loadRetailerProfile } from '../../features/profile/retailerSlice';

const HomeScreen = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  // useEffect(() => {
  //   getAllStorageData();
  //   dispatch(loadRetailerProfile());
  // }, []);
  const { banners, deals, categories, loading, error, refetch } = useHomeData();

  const handleSearch = async query => {
    try {
      setSearchLoading(true);

      const url = `${BASE_URL}/search?q=${query}`;
      const response = await fetch(url);
      const json = await response.json();

      if (json.success) {
        setSearchResults(json.data || []);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.log('Search error:', error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // const getAllStorageData = async () => {
  //   try {
  //     // 1️⃣ Get AsyncStorage data
  //     const keys = await AsyncStorage.getAllKeys();
  //     const stores = await AsyncStorage.multiGet(keys);

  //     const asyncData = {};
  //     stores.forEach(([key, value]) => {
  //       try {
  //         asyncData[key] = JSON.parse(value);
  //       } catch {
  //         asyncData[key] = value;
  //       }
  //     });

  //     // 2️⃣ Get Secure data (token + retailerId)
  //     const secureData = await getAuthData();

  //     const result = {
  //       ...asyncData,
  //       secure: secureData, // { token, retailerId }
  //     };

  //     console.log('All App Storage Data:', result);

  //     return result;
  //   } catch (error) {
  //     console.log('Error fetching storage data:', error);
  //   }
  // };
  const profile = useSelector(state => state.retailer.profile);
  console.log('Redux Profile:', profile);

  return (
    <AppSafeArea>
      <View style={{ flex: 1, marginBottom: 20 }}>
        <FlatList
          data={[]}
          keyExtractor={() => 'key'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 70 }}
          ListHeaderComponent={
            <>
              <Header />

              {/* 🔍 SEARCH BAR */}
              <SearchBar onSearch={handleSearch} loading={searchLoading} />

              {/* 🔎 SEARCH RESULTS */}
              {searchResults.length > 0 && (
                <View style={{ paddingHorizontal: 16 }}>
                  <FlatList
                    data={searchResults}
                    keyExtractor={item => item.productId}
                    numColumns={2}
                    columnWrapperStyle={{
                      justifyContent: 'space-between',
                      marginBottom: 16,
                    }}
                    renderItem={({ item }) => (
                      <ProductCard
                        item={{
                          productId: item.productId,
                          name: item.name,
                          image: item.images?.[0],
                          description: item.description,
                          pricing: item.pricing,
                          quantity: item.quantity,
                        }}
                      />
                    )}
                    scrollEnabled={false}
                  />
                </View>
              )}

              {/* 🏠 NORMAL HOMEPAGE CONTENT */}
              <BannerCarousel
                data={banners}
                loading={loading}
                error={error}
                onRetry={refetch}
              />

              <CategoriesSection
                data={categories}
                loading={loading}
                error={error}
                onRetry={refetch}
              />

              <DealsList
                data={deals}
                loading={loading}
                error={error}
                onRetry={refetch}
              />

              <View
                style={{
                  flexDirection: 'row',
                  gap: 12,
                  paddingHorizontal: 16,
                  marginBottom: 16,
                }}
              >
                <ActionCard
                  icon="mic"
                  title="Speak & Order"
                  subtitle="Order in seconds using voice"
                  onPress={() => navigation.navigate('Mic')}
                />

                <ActionCard
                  icon="cart"
                  title="Quick Buy"
                  subtitle="Buy frequently ordered items"
                  iconBgColor="#143620"
                  onPress={() => navigation.navigate('Orders')}
                />
              </View>
            </>
          }
        />
      </View>
      <CartBottomTab />
    </AppSafeArea>
  );
};

export default HomeScreen;
