import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/common/Header';
import AppView from '../../components/common/AppView';
import CategorieCard from '../../components/Home/CategorieCard';
import { FlatList } from 'react-native';
import { colors } from '../../theme/colors';

const API_URL =
  'https://2a0t2oahs8.execute-api.ap-south-1.amazonaws.com/categories'; // 👈 replace this

const CategoriesScreen = () => {
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
    <SafeAreaView style={styles.container}>
      <AppView style={styles.headerContainer}>
        <Header />
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
