import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import AppView from '../common/AppView';
import SectionHeader from './SectionHeader';
import CategorieCard from './CategorieCard';
const CategoriesSection = () => {
  const smartDeals = [
    {
      id: '1',
      title: 'Grocery Essentials',
      image: require('../../assets/images/store.jpg'),
    },
    {
      id: '2',
      title: 'Snacks & Biscuits',
      image: require('../../assets/images/store.jpg'),
    },
    {
      id: '3',
      title: 'Beverages',
      image: require('../../assets/images/store.jpg'),
    },
    {
      id: '4',
      title: 'Dairy',
      image: require('../../assets/images/store.jpg'),
    },
    {
      id: '5',
      title: 'Household',
      image: require('../../assets/images/store.jpg'),
    },
    {
      id: '6',
      title: 'Personal Care',
      image: require('../../assets/images/store.jpg'),
    },
  ];
  return (
    <AppView>
      <SectionHeader
        title="Categories"
        leftIcon="flame"
        onPressViewAll={() => {
          console.log('View All Pressed');
        }}
      />

      <FlatList
        data={smartDeals}
        numColumns={2}
        keyExtractor={item => item.id}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        }}
        renderItem={({ item }) => <CategorieCard item={item} />}
        contentContainerStyle={styles.list}
      />
    </AppView>
  );
};

export default CategoriesSection;
const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
  },

  card: {
    width: '48%',
    height: 150,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 14,
  },

  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  imageRadius: {
    borderRadius: 18,
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
  },

  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    padding: 12,
  },
});
