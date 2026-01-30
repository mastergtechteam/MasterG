import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const AppText = ({ children, color = 'text', style }) => {
  const { theme } = useTheme();
  return (
    <View>
      <Text style={[{ color: theme.colors.text }, style]}>{children}</Text>
    </View>
  );
};

export default AppText;

const styles = StyleSheet.create({});
