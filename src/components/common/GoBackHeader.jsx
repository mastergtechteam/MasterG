import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const GoBackHeader = ({ title = 'Back' }) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  return (
    <View style={styles.container}>
      {/* Left - Back Button */}
      <TouchableOpacity
        onPress={handleBackPress}
        style={styles.iconButton}
        activeOpacity={0.7}
      >
        <Ionicons name="chevron-back" size={28} color={colors.textPrimary} />
      </TouchableOpacity>

      {/* Center - Title */}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {/* Right - Search Button */}
      <TouchableOpacity
        onPress={handleSearchPress}
        style={styles.iconButton}
        activeOpacity={0.7}
      >
        <Ionicons name="search" size={24} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
};

export default GoBackHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  title: {
    flex: 1,
    marginHorizontal: spacing.sm,
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
});
