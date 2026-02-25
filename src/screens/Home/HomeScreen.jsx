import React from 'react';
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
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { banners, deals, categories, loading, error, refetch } = useHomeData();

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
        <CartBottomTab />
      </View>
    </AppSafeArea>
  );
};

export default HomeScreen;
