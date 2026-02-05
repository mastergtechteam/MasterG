import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const TypeDropdown = ({ value, options, visible, onToggle, onSelect }) => {
  const selected = options.find(o => o.value === value)?.label;

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Retailer Type</Text>

      <TouchableOpacity style={styles.dropdown} onPress={onToggle}>
        <Text style={styles.text}>{selected}</Text>
        <FontAwesome6 name="chevron-down" size={14} color="#9CA3AF" />
      </TouchableOpacity>

      {visible && (
        <View style={styles.menu}>
          {options.map(item => (
            <TouchableOpacity
              key={item.value}
              style={styles.item}
              onPress={() => onSelect(item.value)}
            >
              <Text style={styles.text}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default TypeDropdown;

const styles = StyleSheet.create({
  inputGroup: { marginBottom: 18 },
  label: { color: '#E5E7EB', marginBottom: 6 },
  dropdown: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    paddingHorizontal: 14,
    backgroundColor: '#121212',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menu: {
    backgroundColor: '#121212',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginTop: 6,
  },
  item: { padding: 12 },
  text: { color: '#FFFFFF' },
});
