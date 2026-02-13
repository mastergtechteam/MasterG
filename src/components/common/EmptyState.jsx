import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { colors } from '../../theme/colors';

const EmptyState = ({
  title = 'No Data Available',
  message = "There's nothing to display right now",
  icon = null,
  iconSize = 80,
  showIcon = true,
}) => {
  return (
    <View style={styles.container}>
      {showIcon && icon && (
        <View style={styles.iconContainer}>
          <Image
            source={icon}
            style={{ width: iconSize, height: iconSize }}
            resizeMode="contain"
          />
        </View>
      )}

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: colors.background,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
    color: colors.white,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    color: colors.white,
  },
});
