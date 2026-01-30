import React from 'react';
import { FlatList, View } from 'react-native';
import DealCard from './DealCard';
import SectionHeader from './SectionHeader';

const DealsList = () => {
  const DEALS = [
    {
      id: '1',
      title: 'Under ₹100',
      subtitle: 'Fast-selling items',
      image: require('../../assets/images/store.jpg'),
    },
    {
      id: '2',
      title: 'Bulk Packs',
      subtitle: 'Under ₹2500',
      image: require('../../assets/images/store.jpg'),
    },
    {
      id: '3',
      title: 'Best Sellers',
      subtitle: 'High demand',
      image: require('../../assets/images/store.jpg'),
    },
  ];

  return (
    <View>
      <SectionHeader
        title="Smart Deals for Retailers"
        leftIcon="flame"
        onPressViewAll={() => console.log('View All Deals')}
      />

      <View style={{ paddingLeft: 16, marginBottom: 20 }}>
        <FlatList
          data={DEALS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DealCard item={item} onPress={() => console.log(item.title)} />
          )}
        />
      </View>
    </View>
  );
};

export default DealsList;
