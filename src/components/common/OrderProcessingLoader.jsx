import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const OrderProcessingLoader = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={styles.title}>Processing your order...</Text>
        <Text style={styles.subtitle}>
          Please wait while we confirm your payment
        </Text>
      </View>
    </View>
  );
};

export default OrderProcessingLoader;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000aa',
  },
  card: {
    width: '85%',
    backgroundColor: '#141414',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: '#9ca3af',
    textAlign: 'center',
  },
});
