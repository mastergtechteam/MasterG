import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SectionError = ({ message, onRetry }) => {
  return (
    <View
      style={{
        padding: 16,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: '#6B7280',
          fontSize: 14,
          marginBottom: 10,
        }}
      >
        {message}
      </Text>

      <TouchableOpacity
        onPress={onRetry}
        style={{
          paddingHorizontal: 14,
          paddingVertical: 6,
          borderRadius: 6,
          backgroundColor: '#2D73F5',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 13 }}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SectionError;
