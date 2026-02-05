import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import AppSafeArea from '../components/common/AppSafeArea';
import AppView from '../components/common/AppView';
import AppText from '../components/common/AppText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/common/Header';

const stats = [
  {
    id: '1',
    title: 'Monthly Purchase',
    value: '₹1,24,500',
    change: '+12%',
    icon: 'mic',
  },
  {
    id: '2',
    title: 'Savings from Bulk',
    value: '₹8,450',
    change: '+23%',
    icon: 'trending-up',
  },
  {
    id: '3',
    title: 'Total Orders',
    value: '48',
    change: '+5',
    icon: 'cube',
  },
];

const priceChanges = [
  { id: '1', name: 'Sugar', days: 'Expected in 5 days', change: '+8%' },
  { id: '2', name: 'Cooking Oil', days: 'Expected in 7 days', change: '+8%' },
  { id: '3', name: 'Rice', days: 'Expected in 10 days', change: '-3%' },
];

export default function InsightsScreen() {
  return (
    <AppSafeArea style={styles.container}>
      <FlatList
        data={[]}
        keyExtractor={() => 'key'}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Header />
            {/* TOP STATS */}
            <AppView style={styles.grid}>
              {stats.map((item, index) => (
                <AppView
                  key={item.id}
                  style={[styles.statCard, index === 2 && styles.fullCard]}
                >
                  <AppView style={styles.iconCircle}>
                    <Ionicons name={item.icon} size={18} color="#22c55e" />
                  </AppView>

                  <AppText style={styles.statTitle}>{item.title}</AppText>
                  <AppText style={styles.statValue}>{item.value}</AppText>

                  <AppView style={styles.changeRow}>
                    <Ionicons name="arrow-up" size={14} color="#22c55e" />
                    <AppText style={styles.changeText}>{item.change}</AppText>
                  </AppView>
                </AppView>
              ))}
            </AppView>

            {/* UPCOMING PRICE CHANGES */}
            <AppText style={styles.sectionTitle}>
              Upcoming Price Changes
            </AppText>

            {priceChanges.map(item => {
              const isPositive = item.change.includes('+');

              return (
                <AppView key={item.id} style={styles.priceCard}>
                  <AppView style={styles.priceInfo}>
                    <AppText style={styles.priceTitle}>{item.name}</AppText>
                    <AppText style={styles.priceSub}>{item.days}</AppText>
                  </AppView>

                  <AppText
                    style={[
                      styles.priceChange,
                      { color: isPositive ? '#ef4444' : '#22c55e' },
                    ]}
                  >
                    {item.change}
                  </AppText>
                </AppView>
              );
            })}
          </>
        }
      />
    </AppSafeArea>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#0b0b0b',
    paddingHorizontal: 16,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 12,
  },

  statCard: {
    width: '48%',
    backgroundColor: '#141414',
    borderRadius: 16,
    padding: 16,
  },

  fullCard: {
    width: '100%',
  },

  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1f2933',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  statTitle: {
    fontSize: 13,
    color: '#9ca3af',
  },

  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginVertical: 6,
  },

  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#141414',
  },

  changeText: {
    fontSize: 12,
    color: '#22c55e',
  },

  sectionTitle: {
    marginTop: 28,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  priceCard: {
    backgroundColor: '#141414',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  priceTitle: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
    backgroundColor: '#141414',
  },

  priceSub: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },

  priceChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  priceInfo: {
    backgroundColor: '#141414',
  },
});
