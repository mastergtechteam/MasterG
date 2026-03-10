import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AppSafeArea from '../../components/common/AppSafeArea';
import BannerCarousel from '../../components/Home/BannerCrousel';
import Header from '../../components/common/Header';
import ActionCard from '../../components/Home/ActionCard';
import DealsList from '../../components/Home/DealsList';
import CategoriesSection from '../../components/Home/CategoriesSection';
import CartBottomTab from '../../components/common/cartBottomTab';
import { useNavigation } from '@react-navigation/native';
import { useHomeData } from '../../hooks/useHomeData';
import { useSelector } from 'react-redux';
import SearchBar from '../../components/common/SearchBar';
import ProductCard from '../../components/Product/ProductCard';
import { BASE_URL } from '../../api/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuthData } from '../../utils/secureStore';
import { loadRetailerProfile } from '../../features/profile/retailerSlice';
import { getAppType } from '../../config/appConfig';
import AppText from '../../components/common/AppText';

const HomeScreen = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const navigation = useNavigation();
  const { banners, deals, categories, loading, error, refetch } = useHomeData();
  const isSearching = hasSearched;
  const handleSearch = async query => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    try {
      setSearchLoading(true);
      setHasSearched(true);

      const url = `${BASE_URL}/search?q=${query}`;
      const appType = getAppType();
      const response = await fetch(url, {
        headers: {
          'X-App-Type': appType,
        },
      });

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
  const profile = useSelector(state => state.retailer.profile);

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

              {searchLoading && (
                <View style={styles.searchMessageContainer}>
                  <ActivityIndicator size="small" color="#fff" />
                  <AppText style={styles.searchText}>Searching...</AppText>
                </View>
              )}

              {!searchLoading && hasSearched && searchResults.length === 0 && (
                <View style={styles.searchMessageContainer}>
                  <AppText>Product not available</AppText>
                </View>
              )}

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
              {!isSearching && (
                <>
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

                  <View style={styles.actionContainer}>
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
              )}
            </>
          }
        />
      </View>
      <CartBottomTab />
    </AppSafeArea>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchMessageContainer: {
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 80,
  },
  searchText: {
    marginLeft: 10,
  },
});
