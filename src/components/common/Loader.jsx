import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const Loader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.loaderText}>Loading product details...</Text>
    </View>
  );
};

export default Loader;

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
