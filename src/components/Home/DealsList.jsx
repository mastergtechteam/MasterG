import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import DealCard from './DealCard';
import SectionHeader from './SectionHeader';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const DealsList = ({ data = [], loading, error, onRetry }) => {
  const navigation = useNavigation();

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
        {loading ? (
          <FlatList
            data={[1, 2, 3]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.toString()}
            renderItem={() => (
              <View
                style={{
                  width: 200,
                  height: 160,
                  borderRadius: 16,
                  backgroundColor: '#E5E7EB',
                  marginRight: 12,
                }}
              />
            )}
          />
        ) : error ? (
          <View style={styles.errorContainer}>
            <View style={styles.errorCard}>
              <Text style={styles.errorTitle}>Unable to load Recent Deals</Text>

              <Text style={styles.errorSubtitle}>
                Please check your connection and try again.
              </Text>

              <TouchableOpacity
                onPress={onRetry}
                activeOpacity={0.8}
                style={styles.retryButton}
              >
                <Text style={styles.retryText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : data.length === 0 ? null : (
          <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.dealId.toString()}
            renderItem={({ item }) => <DealCard item={item} />}
          />
        )}
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
  errorContainer: {
    height: 165, // same as banner height (keeps layout stable)
    marginHorizontal: 16,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorCard: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },

  errorTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },

  errorSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 14,
    textAlign: 'center',
  },

  retryButton: {
    backgroundColor: '#2D73F5',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 6,
  },

  retryText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});
