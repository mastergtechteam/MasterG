import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DealCard from './DealCard';
import SectionHeader from './SectionHeader';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import Loader from '../common/Loader';
import { BASE_URL } from '../../api/apiClient';
const DealsList = () => {
  const navigation = useNavigation();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    const TAG = '[API:DealsList]';
    const url = `${BASE_URL}/deals`;
    console.log(TAG, `▶ GET ${url}`);
    const start = Date.now();
    try {
      setLoading(true);
      const response = await fetch(url);
      console.log(TAG, `⏱ ${Date.now() - start}ms | status: ${response.status}`);
      const json = await response.json();
      console.log(TAG, `✅ ${json?.length ?? 0} deals fetched`);
      setDeals(json);
    } catch (error) {
      console.error(TAG, `❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const functionViewAll = () => {
    navigation.navigate('Deals');
  };

  return (
    <View>
      <SectionHeader
        title="Smart Deals for Retailers"
        leftIcon="flame"
        onPressViewAll={functionViewAll}
      />

      <View style={{ paddingLeft: 16, marginBottom: 20 }}>
        <FlatList
          data={deals}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.dealId}
          renderItem={({ item }) => <DealCard item={item} />}
        />
      </View>
    </View>
  );
};

export default DealsList;
const styles = StyleSheet.create({
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
