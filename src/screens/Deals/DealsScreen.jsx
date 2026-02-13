import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/common/Header';
import AppView from '../../components/common/AppView';
import DealCard from '../../components/Home/DealCard';
import { colors } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import GoBackHeader from '../../components/common/GoBackHeader';
const DealsScreen = () => {
  const navigation = useNavigation();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://2a0t2oahs8.execute-api.ap-south-1.amazonaws.com/deals',
      );
      const json = await response.json();
      setDeals(json);
      // console.log(json, 'abc');
    } catch {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
      // console.log('api request done');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loaderText}>Loading product details...</Text>
      </View>
    );
  }

  const functionViewAll = () => {
    navigation.navigate('Deals');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppView style={styles.headerContainer}>
        <GoBackHeader title="Today's Deals" />
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
  loader: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  loaderText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.md,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
});
