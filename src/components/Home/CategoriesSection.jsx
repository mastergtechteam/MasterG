import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import AppView from '../common/AppView';
import SectionHeader from './SectionHeader';
import CategorieCard from './CategorieCard';
import { useNavigation } from '@react-navigation/native';
import Loader from '../common/Loader';
import { BASE_URL } from '../../api/apiClient';

const API_URL =
  `${BASE_URL}/categories`; // 👈 replace this

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const TAG = '[API:Categories]';
    console.log(TAG, `▶ GET ${API_URL}`);
    const start = Date.now();
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      console.log(TAG, `⏱ ${Date.now() - start}ms | status: ${response.status}`);
      const json = await response.json();

      if (json?.success && Array.isArray(json.data)) {
        const formattedData = json.data
          .filter(item => item.status === 'ACTIVE' && !item.isDeleted)
          .map(item => ({
            id: item.categoryId,
            title: item.name,
            image: { uri: item.image },
          }));
        console.log(TAG, `✅ ${formattedData.length} categories loaded`);
        setCategories(formattedData);
      }
    } catch (error) {
      console.error(TAG, `❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <AppView>
      <SectionHeader
        title="Categories"
        leftIcon="flame"
        onPressViewAll={() => {
          navigation.navigate('Categories');
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
