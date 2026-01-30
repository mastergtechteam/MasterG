import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppText from '../common/AppText';

const ActionCard = ({
  icon = 'mic',
  title,
  subtitle,
  onPress,
  iconBgColor = '#143620',
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.card}
    >
      {/* Icon */}
      <View style={[styles.iconWrapper, { backgroundColor: iconBgColor }]}>
        <Ionicons name={icon} size={20} color="#4ade80" />
      </View>

      {/* Text */}
      <AppText style={styles.title}>{title}</AppText>
      <AppText style={styles.subtitle}>{subtitle}</AppText>
    </TouchableOpacity>
  );
};

export default ActionCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333',
  },

  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 12,
    color: '#999',
  },
});
