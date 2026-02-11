import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppSafeArea from '../../components/common/AppSafeArea';
import AppText from '../../components/common/AppText';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import CategoriesSection from '../../components/Home/CategoriesSection';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const recentSearches = [
    { id: '1', text: 'Organic Vegetables' },
    { id: '2', text: 'Fresh Dairy' },
    { id: '3', text: 'Whole Wheat Bread' },
    { id: '4', text: 'Natural Honey' },
  ];

  const trendingSearches = [
    { id: '1', text: 'Organic Milk', count: '24.2K' },
    { id: '2', text: 'Basmati Rice', count: '18.5K' },
    { id: '3', text: 'Free-range Eggs', count: '15.3K' },
    { id: '4', text: 'Almond Butter', count: '12.8K' },
    { id: '5', text: 'Greek Yogurt', count: '11.2K' },
    { id: '6', text: 'Coconut Oil', count: '9.7K' },
  ];

  const categories = [
    { id: '1', name: 'Vegetables', icon: 'leaf' },
    { id: '2', name: 'Dairy', icon: 'water' },
    { id: '3', name: 'Grains', icon: 'nutrition' },
    { id: '4', name: 'Herbs', icon: 'medkit' },
  ];

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleSearchSubmit = query => {
    if (query.trim()) {
      console.log('Search for:', query);
    }
  };

  const handleRecentSearchPress = searchTerm => {
    setSearchQuery(searchTerm);
  };

  const handleTrendingSearchPress = searchTerm => {
    setSearchQuery(searchTerm);
  };

  const renderRecentSearch = ({ item }) => (
    <TouchableOpacity
      style={styles.recentSearchItem}
      activeOpacity={0.6}
      onPress={() => handleRecentSearchPress(item.text)}
    >
      <Ionicons
        name="time"
        size={16}
        color={colors.primary}
        style={{ marginRight: spacing.md }}
      />
      <AppText style={styles.recentSearchText}>{item.text}</AppText>
      <TouchableOpacity activeOpacity={0.7}>
        <Ionicons name="close" size={16} color={colors.textMuted} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderTrendingSearch = ({ item }) => (
    <TouchableOpacity
      style={styles.trendingCard}
      activeOpacity={0.7}
      onPress={() => handleTrendingSearchPress(item.text)}
    >
      <View style={styles.trendingContent}>
        <View style={styles.trendingTextWrapper}>
          <AppText style={styles.trendingTitle}>{item.text}</AppText>
          <AppText style={styles.trendingCount}>{item.count} searches</AppText>
        </View>
        <Ionicons name="arrow-forward" size={18} color={colors.primary} />
      </View>
    </TouchableOpacity>
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
        {searchQuery.length === 0 ? (
          <FlatList
            data={[]}
            keyExtractor={() => 'key'}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={
              <>
                {/* Recent Section */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <AppText style={styles.sectionTitle}>Recent</AppText>
                    <TouchableOpacity activeOpacity={0.7}>
                      <AppText style={styles.clearLink}>Clear</AppText>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.recentList}>
                    {recentSearches.map((item, index) => (
                      <View key={item.id}>
                        {renderRecentSearch({ item })}
                        {index < recentSearches.length - 1 && (
                          <View style={styles.divider} />
                        )}
                      </View>
                    ))}
                  </View>
                </View>

                {/* Trending Section */}
                <View style={styles.section}>
                  <View style={styles.sectionHeaderTrending}>
                    <Ionicons name="flame" size={20} color={colors.primary} />
                    <AppText style={styles.sectionTitle}>Trending Now</AppText>
                  </View>
                  <FlatList
                    scrollEnabled={false}
                    data={trendingSearches}
                    keyExtractor={item => item.id}
                    renderItem={renderTrendingSearch}
                    ItemSeparatorComponent={() => (
                      <View style={{ height: 8 }} />
                    )}
                  />
                </View>

                {/* Categories Section */}
                <CategoriesSection />
              </>
            }
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
    </AppSafeArea>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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

  sectionHeaderTrending: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
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
  },

  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },

  recentSearchText: {
    flex: 1,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    fontWeight: '500',
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },

  // Trending
  trendingCard: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },

  trendingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },

  trendingTextWrapper: {
    flex: 1,
  },

  trendingTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },

  trendingCount: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
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
});
