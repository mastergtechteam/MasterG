import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppSafeArea from '../../components/common/AppSafeArea';
import AppText from '../../components/common/AppText';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import CategoriesSection from '../../components/Home/CategoriesSection';
import ProductCard from '../../components/Product/ProductCard';
import { useSelector } from 'react-redux';
import { selectCartItemsArray } from '../../features/cart/cartSelectors';
import { BASE_URL } from '../../api/apiClient';
import { useHomeData } from '../../hooks/useHomeData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartBottomTab from '../../components/common/cartBottomTab';

const RECENT_SEARCHES_KEY = '@app_recent_searches';
const MAX_RECENT_SEARCHES = 10;
const SEARCH_EXPIRATION_DAYS = 7;

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loadingRecents, setLoadingRecents] = useState(true);

  const cartItems = useSelector(selectCartItemsArray);
  const { banners, deals, categories, error, refetch } = useHomeData();
  const cartItemCount = cartItems.length;

  // Load recent searches on mount
  useEffect(() => {
    loadRecentSearches();
  }, []);

  // Load and clean expired searches
  const loadRecentSearches = async () => {
    try {
      setLoadingRecents(true);
      const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      let searches = stored ? JSON.parse(stored) : [];

      // Filter out expired searches (older than 7 days)
      const now = Date.now();
      const cutoffTime = now - SEARCH_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
      searches = searches.filter(item => item.timestamp > cutoffTime);

      // Keep only the most recent searches
      searches = searches.slice(0, MAX_RECENT_SEARCHES);

      setRecentSearches(searches);

      // Save cleaned list back to storage
      if (searches.length !== (stored ? JSON.parse(stored).length : 0)) {
        await AsyncStorage.setItem(
          RECENT_SEARCHES_KEY,
          JSON.stringify(searches),
        );
      }
    } catch (error) {
      console.error('[RecentSearches]', 'Error loading:', error);
    } finally {
      setLoadingRecents(false);
    }
  };

  // Add search to recent list
  const addToRecentSearches = async query => {
    try {
      const newSearch = {
        id: Date.now().toString(),
        text: query,
        timestamp: Date.now(),
      };

      let updated = [newSearch, ...recentSearches];

      // Remove duplicates (keep only the latest)
      updated = updated.filter(
        (item, index, arr) =>
          arr.findIndex(
            x => x.text.toLowerCase() === item.text.toLowerCase(),
          ) === index,
      );

      // Limit to max searches
      updated = updated.slice(0, MAX_RECENT_SEARCHES);

      setRecentSearches(updated);
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('[RecentSearches]', 'Error saving:', error);
    }
  };

  // Delete specific recent search
  const deleteRecentSearch = async itemId => {
    try {
      const updated = recentSearches.filter(item => item.id !== itemId);
      setRecentSearches(updated);
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('[RecentSearches]', 'Error deleting:', error);
    }
  };

  // Clear all recent searches
  const clearAllRecentSearches = async () => {
    try {
      setRecentSearches([]);
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify([]));
    } catch (error) {
      console.error('[RecentSearches]', 'Error clearing:', error);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleSearchSubmit = async query => {
    if (!query.trim()) return;
    const TAG = '[API:Search]';
    const url = `${BASE_URL}/search?q=${query}`;
    console.log(TAG, `▶ GET ${url}`);
    const start = Date.now();
    try {
      setLoading(true);
      setSearchError(null);
      setHasSearched(true);

      const response = await fetch(url);
      console.log(
        TAG,
        `⏱ ${Date.now() - start}ms | status: ${response.status}`,
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log(TAG, `✅ ${data?.data?.length ?? 0} results for "${query}"`);

      setSearchResults(data?.data || []);

      // Add to recent searches after successful search
      await addToRecentSearches(query);
    } catch (error) {
      console.error(TAG, `❌ Error: ${error.message}`);
      setSearchError(error.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRecentSearchPress = searchTerm => {
    setSearchQuery(searchTerm);
    handleSearchSubmit(searchTerm);
  };

  const renderRecentSearch = ({ item }) => (
    <TouchableOpacity
      style={styles.recentSearchItem}
      activeOpacity={0.7}
      onPress={() => handleRecentSearchPress(item.text)}
    >
      <View style={styles.recentSearchContent}>
        <Ionicons
          name="time-outline"
          size={18}
          color={colors.primary}
          style={{ marginRight: spacing.md }}
        />
        <AppText style={styles.recentSearchText} numberOfLines={1}>
          {item.text}
        </AppText>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => deleteRecentSearch(item.id)}
        style={styles.deleteButton}
      >
        <Ionicons name="close-circle" size={20} color={colors.textMuted} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderRecentSearchSeparator = () => (
    <View style={styles.recentSearchDivider} />
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard} activeOpacity={0.7}>
      <View style={styles.categoryIconWrapper}>
        <Ionicons name={item.icon} size={28} color={colors.primary} />
      </View>
      <AppText style={styles.categoryText}>{item.name}</AppText>
    </TouchableOpacity>
  );

  return (
    <AppSafeArea>
      <View style={styles.container}>
        {/* Search Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            style={styles.headerButton}
          >
            <Ionicons
              name="chevron-back"
              size={26}
              color={colors.textPrimary}
            />
          </TouchableOpacity>

          <View style={styles.searchInputWrapper}>
            <Ionicons name="search" size={18} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Search products..."
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={() => handleSearchSubmit(searchQuery)}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={handleClearSearch} activeOpacity={0.7}>
                <Ionicons
                  name="close-circle"
                  size={18}
                  color={colors.primary}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Main Content */}
        {!hasSearched ? (
          <FlatList
            data={[]}
            keyExtractor={() => 'key'}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={
              <>
                {/* Recent Section */}
                {!loadingRecents && recentSearches.length > 0 && (
                  <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <AppText style={styles.sectionTitle}>
                        Recent Searches
                      </AppText>
                      <TouchableOpacity onPress={clearAllRecentSearches}>
                        <AppText style={styles.clearLink}>Clear all</AppText>
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      data={recentSearches}
                      renderItem={renderRecentSearch}
                      keyExtractor={item => item.id}
                      scrollEnabled={false}
                      ItemSeparatorComponent={renderRecentSearchSeparator}
                      style={styles.recentList}
                    />
                  </View>
                )}

                {/* Categories Section */}
                <CategoriesSection
                  data={categories}
                  loading={loading}
                  error={error}
                  onRetry={refetch}
                />
              </>
            }
          />
        ) : loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <AppText style={styles.loadingText}>Searching...</AppText>
          </View>
        ) : searchError ? (
          <View style={styles.errorContainer}>
            <Ionicons
              name="alert-circle-outline"
              size={56}
              color={colors.textMuted}
              style={{ marginBottom: spacing.lg }}
            />
            <AppText style={styles.errorTitle}>Search Failed</AppText>
            <AppText style={styles.errorSubtitle}>{searchError}</AppText>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => handleSearchSubmit(searchQuery)}
            >
              <AppText style={styles.retryButtonText}>Try Again</AppText>
            </TouchableOpacity>
          </View>
        ) : searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            renderItem={({ item }) => <ProductCard item={item} />}
            keyExtractor={item => item.productId}
            numColumns={2}
            columnWrapperStyle={styles.gridContainer}
            scrollEnabled={true}
            contentContainerStyle={{ paddingBottom: 140 }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons
              name="search"
              size={56}
              color={colors.textMuted}
              style={{ marginBottom: spacing.lg }}
            />
            <AppText style={styles.emptyTitle}>No results found</AppText>
            <AppText style={styles.emptySubtitle}>
              Try searching for something else
            </AppText>
          </View>
        )}
      </View>

      <CartBottomTab />
    </AppSafeArea>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },

  errorTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },

  errorSubtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },

  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 10,
    marginTop: spacing.md,
  },

  retryButtonText: {
    color: '#fff',
    fontSize: typography.fontSize.md,
    fontWeight: '600',
  },
  gridContainer: {
    marginVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
    height: 44,
  },

  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: typography.fontSize.md,
    padding: 0,
  },

  // Content
  listContent: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },

  emptyTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },

  emptySubtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  // Sections
  section: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  clearLink: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: '500',
  },

  // Recent Searches
  recentList: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md + 2,
  },

  recentSearchContent: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  recentSearchText: {
    // flex: 1,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    fontWeight: '500',
  },

  deleteButton: {
    padding: spacing.sm,
    marginLeft: spacing.sm,
  },

  recentSearchDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },

  // Categories
  categoriesRow: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    gap: spacing.md,
  },

  categoryCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  categoryIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },

  categoryText: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  cartTab: {
    position: 'absolute',
    bottom: 120,
    left: 16, // 👈 side margin
    right: 16,
    backgroundColor: '#22C55E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cartCount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  cartLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  viewCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  viewCartText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});
