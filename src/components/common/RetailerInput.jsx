import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const RetailerInput = ({
  label,
  value,
  placeholder,
  keyboardType = 'default',
  editable = true,
  onChangeText,
  rightComponent,
}) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        <TextInput
          style={[styles.input, !editable && { opacity: 0.7 }]}
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          value={value}
          editable={editable}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
        />
        {rightComponent}
      </View>
    </View>
  );
};

export default RetailerInput;

const styles = StyleSheet.create({
  inputGroup: { marginBottom: 18 },
  label: { color: '#E5E7EB', marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center' },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    paddingHorizontal: 14,
    color: '#FFFFFF',
    backgroundColor: '#121212',
  },
});
