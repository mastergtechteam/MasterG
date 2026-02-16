import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { spacing } from '../../theme/spacing';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

const EmptyCart = ({ navigation }) => {
  return (
    <View style={styles.emptyCartContainer}>
      <View style={styles.emptyCartIconBox}>
        <MaterialDesignIcons name="cart-off" size={80} color={colors.primary} />
      </View>

      <Text style={styles.emptyCartTitle}>Your Cart is Empty</Text>

      <Text style={styles.emptyCartSubtitle}>
        Looks like you haven't added any items yet
      </Text>

      <TouchableOpacity
        style={styles.browseBtn}
        onPress={() => navigation.navigate('Categories')}
      >
        <MaterialDesignIcons
          name="shopping-outline"
          size={20}
          color={colors.white}
          style={styles.browseBtnIcon}
        />
        <Text style={styles.browseBtnText}>Browse Categories</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
  },
  emptyCartIconBox: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 100,
  },
  emptyCartTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyCartSubtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  browseBtn: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  browseBtnIcon: {
    marginRight: spacing.sm,
  },
  browseBtnText: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.white,
  },
});
