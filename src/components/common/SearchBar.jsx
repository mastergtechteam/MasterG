import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const focusAnim = useRef(new Animated.Value(0)).current;
  const debounceRef = useRef(null);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleChange = text => {
    setQuery(text);

    // 🔥 Debounced auto search
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (text.trim()) {
        onSearch(text.trim());
      }
    }, 400);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#2a2a2a', '#22C55E'],
  });

  return (
    <Animated.View style={[styles.container, { borderColor }]}>
      <Icon name="search" size={20} color="#9CA3AF" />

      <TextInput
        value={query}
        onChangeText={handleChange}
        placeholder="Search groceries, brands..."
        placeholderTextColor="#6B7280"
        style={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      {query.length > 0 && (
        <TouchableOpacity onPress={handleClear}>
          <Icon name="close-circle" size={18} color="#9CA3AF" />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    borderWidth: 1.5,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: '#FFFFFF',
    fontSize: 15,
  },
});
