import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/common/Header';
import AppView from '../../components/common/AppView';
import CategorieCard from '../../components/Home/CategorieCard';
import { FlatList } from 'react-native';
import { colors } from '../../theme/colors';
import GoBackHeader from '../../components/common/GoBackHeader';
import { BASE_URL } from '../../api/apiClient';

const API_URL =
  `${BASE_URL}/categories`; // 👈 replace this

const CategoriesScreen = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const TAG = '[API:Categories]';
    console.log(TAG, `▶ GET ${API_URL}`);
    const start = Date.now();
    try {
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
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppView style={styles.headerContainer}>
        <GoBackHeader title="Categories" />
      </AppView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <FlatList
          data={categories}
          numColumns={2}
          keyExtractor={item => item.id}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}
          renderItem={({ item }) => <CategorieCard item={item} />}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // paddingBottom: 80,
  },
  headerContainer: {
    // paddingHorizontal: 16,
    // paddingVertical: 8,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
