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
const DealsList = () => {
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
