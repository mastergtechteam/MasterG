import React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import AppView from '../common/AppView';
import SectionHeader from './SectionHeader';
import CategorieCard from './CategorieCard';
import { useNavigation } from '@react-navigation/native';

const CategoriesSection = ({ data = [], loading, error, onRetry }) => {
  const navigation = useNavigation();

  return (
    <AppView>
      <SectionHeader
        title="Categories"
        leftIcon="flame"
        onPressViewAll={() => navigation.navigate('Categories')}
      />

      {loading ? (
        <FlatList
          data={[1, 2, 3, 4]}
          numColumns={2}
          keyExtractor={item => item.toString()}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}
          renderItem={() => (
            <View
              style={{
                width: '48%',
                height: 150,
                borderRadius: 18,
                backgroundColor: '#E5E7EB',
                marginBottom: 14,
              }}
            />
          )}
        />
      ) : error ? (
        <View style={styles.errorContainer}>
          <View style={styles.errorCard}>
            <Text style={styles.errorTitle}>Unable to load Categories</Text>

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
          data={data.slice(0, 6)}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}
          renderItem={({ item }) => <CategorieCard item={item} />}
        />
      )}
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
