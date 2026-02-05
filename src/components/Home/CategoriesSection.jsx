import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import AppView from '../common/AppView';
import SectionHeader from './SectionHeader';
import CategorieCard from './CategorieCard';

const API_URL =
  'https://gvtceeegs3.execute-api.ap-south-1.amazonaws.com/categories'; // 👈 replace this

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();

      if (json?.success && Array.isArray(json.data)) {
        const formattedData = json.data
          .filter(item => item.status === 'ACTIVE' && !item.isDeleted)
          .map(item => ({
            id: item.categoryId,
            title: item.name,
            image: { uri: item.image },
          }));

        setCategories(formattedData);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
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
        data={categories.slice(0, 6)}
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
