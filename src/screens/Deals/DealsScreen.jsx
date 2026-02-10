import React, { useState } from 'react';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/common/Header';
import AppView from '../../components/common/AppView';
import DealCard from '../../components/Deals/DealCard';
import { colors } from '../../theme/colors';

const STATIC_DEALS = [
  {
    id: '1',
    title: 'Fresh Vegetables',
    discount: 40,
    image:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop',
    originalPrice: 200,
    dealPrice: 120,
    badge: 'Super Deal',
  },
  {
    id: '2',
    title: 'Organic Fruits',
    discount: 35,
    image:
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=500&fit=crop',
    originalPrice: 300,
    dealPrice: 195,
    badge: 'Hot Deal',
  },
  {
    id: '3',
    title: 'Dairy Products',
    discount: 25,
    image:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop',
    originalPrice: 150,
    dealPrice: 112.5,
    badge: 'Limited Time',
  },
  {
    id: '4',
    title: 'Snacks & Cereals',
    discount: 50,
    image:
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=500&fit=crop',
    originalPrice: 250,
    dealPrice: 125,
    badge: 'Flash Sale',
  },
  {
    id: '5',
    title: 'Beverages',
    discount: 30,
    image:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop',
    originalPrice: 180,
    dealPrice: 126,
    badge: 'Special Offer',
  },
  {
    id: '6',
    title: 'Spices & Seasoning',
    discount: 45,
    image:
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=500&fit=crop',
    originalPrice: 220,
    dealPrice: 121,
    badge: 'Best Price',
  },
  {
    id: '7',
    title: 'Baked Goods',
    discount: 20,
    image:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop',
    originalPrice: 100,
    dealPrice: 80,
    badge: 'Weekly Deal',
  },
  {
    id: '8',
    title: 'Frozen Foods',
    discount: 38,
    image:
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=500&fit=crop',
    originalPrice: 280,
    dealPrice: 173.6,
    badge: 'Trending',
  },
];

const DealsScreen = () => {
  const [deals] = useState(STATIC_DEALS);

  return (
    <SafeAreaView style={styles.container}>
      <AppView style={styles.headerContainer}>
        <Header />
      </AppView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <FlatList
          data={deals}
          numColumns={2}
          keyExtractor={item => item.id}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}
          renderItem={({ item }) => <DealCard item={item} />}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DealsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    backgroundColor: colors.background,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
