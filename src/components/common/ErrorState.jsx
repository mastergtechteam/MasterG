import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../../theme/colors';

const ErrorState = ({
  title = 'Something Went Wrong',
  message = 'An error occurred while loading data. Please try again.',
  icon = null,
  iconSize = 80,
  showIcon = true,
  onRetry = null,
  retryLabel = 'Try Again',
  errorCode = null,
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

      {errorCode && (
        <Text style={styles.errorCode}>Error Code: {errorCode}</Text>
      )}

      {onRetry && (
        <TouchableOpacity
          style={styles.retryButton}
          onPress={onRetry}
          activeOpacity={0.7}
        >
          <Text style={styles.retryButtonText}>{retryLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ErrorState;

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
    marginBottom: 24,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
    color: '#E85D5D',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    color: '#666666',
    marginBottom: 16,
  },
  errorCode: {
    fontSize: 12,
    textAlign: 'center',
    color: '#999999',
    marginBottom: 24,
    fontFamily: 'monospace',
  },
  retryButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
