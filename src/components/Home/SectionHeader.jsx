import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import AppText from '../common/AppText';
import AppView from '../common/AppView';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SectionHeader = ({
  title,
  leftIcon = 'flame',
  showViewAll = true,
  onPressViewAll,
}) => {
  return (
    <AppView style={styles.container}>
      {/* Left title + icon */}
      <AppView style={styles.leftRow}>
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={18}
            color="#f97316"
            style={{ marginRight: 6 }}
          />
        )}
        <AppText style={styles.title}>{title}</AppText>
      </AppView>

      {/* View All */}
      {showViewAll && (
        <TouchableOpacity onPress={onPressViewAll} activeOpacity={0.7}>
          <AppView style={styles.viewAllRow}>
            <AppText style={styles.viewAllText}>View All</AppText>
            <Ionicons name="chevron-forward" size={14} color="#4ade80" />
          </AppView>
        </TouchableOpacity>
      )}
    </AppView>
  );
};

export default SectionHeader;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    // color: '#fff',
  },

  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  viewAllText: {
    fontSize: 13,
    color: '#4ade80',
    fontWeight: '600',
    marginRight: 2,
  },
});
