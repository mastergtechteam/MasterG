import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AppSafeArea from '../../components/common/AppSafeArea';
import AppView from '../../components/common/AppView';
import AppText from '../../components/common/AppText';
import Header from '../../components/common/Header';

const orders = [
  {
    id: 'ORD-101',
    date: '28 Jan 2026',
    amount: '₹2,540',
    items: 6,
    status: 'Paid',
  },
  {
    id: 'ORD-102',
    date: '25 Jan 2026',
    amount: '₹1,890',
    items: 4,
    status: 'Paid',
  },
];

const PaymentScreen = ({ navigation }) => {
  return (
    <AppSafeArea style={styles.container}>
      <Header title="Previous Orders" />

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('OrderDetails', { order: item })}
          >
            <AppView style={styles.card}>
              {/* Top Row */}
              <AppView style={styles.topRow}>
                <AppText style={styles.amount}>{item.amount}</AppText>

                <AppView style={styles.statusPill}>
                  <AppText style={styles.statusText}>{item.status}</AppText>
                </AppView>
              </AppView>

              {/* Middle */}
              <AppText style={styles.subText}>
                {item.items} items · {item.date}
              </AppText>

              {/* Bottom */}
              <AppText style={styles.orderId}>Order ID: {item.id}</AppText>
            </AppView>
          </TouchableOpacity>
        )}
      />
    </AppSafeArea>
  );
};

export default PaymentScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0b',
    paddingHorizontal: 16,
  },

  card: {
    backgroundColor: '#121212',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1f1f1f',
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#121212',
  },

  amount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },

  statusPill: {
    backgroundColor: 'rgba(34,197,94,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    color: '#22c55e',
    fontSize: 12,
    fontWeight: '600',
  },

  subText: {
    marginTop: 10,
    fontSize: 13,
    color: '#9ca3af',
  },

  orderId: {
    marginTop: 6,
    fontSize: 12,
    color: '#6b7280',
  },
});
