import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AppSafeArea from '../components/common/AppSafeArea';
import AppView from '../components/common/AppView';
import AppText from '../components/common/AppText';
import AppButton from '../components/common/AppButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/common/Header';

const orders = [
  {
    id: 'ORD-001',
    date: '18 Dec 2025',
    items: 12,
    amount: '₹9,897',
    status: 'Delivered',
    image: require('../assets/images/store.jpg'),
  },
  {
    id: 'ORD-002',
    date: '15 Dec 2025',
    items: 8,
    amount: '₹2,897',
    status: 'Delivered',
    image: require('../assets/images/store.jpg'),
  },
  {
    id: 'ORD-003',
    date: '15 Dec 2025',
    items: 8,
    amount: '₹2,897',
    status: 'Delivered',
    image: require('../assets/images/store.jpg'),
  },
  {
    id: 'ORD-004',
    date: '15 Dec 2025',
    items: 8,
    amount: '₹2,897',
    status: 'Delivered',
    image: require('../assets/images/store.jpg'),
  },
];

const OrderCard = ({ item }) => {
  return (
    <AppView style={styles.card}>
      {/* Image */}
      <Image source={item.image} style={styles.image} />

      {/* Content */}
      <AppView style={styles.content}>
        <AppText style={styles.orderId}>{item.id}</AppText>
        <AppText style={styles.meta}>{item.date}</AppText>
        <AppText style={styles.meta}>{item.items} items</AppText>
        <AppText style={styles.amount}>{item.amount}</AppText>

        <AppButton
          title="Reorder"
          icon="refresh"
          iconPosition="left"
          style={styles.reorderBtn}
          textStyle={styles.reorderText}
          onPress={() => {}}
        />
      </AppView>

      {/* Right column */}
      <AppView style={styles.right}>
        <AppText style={styles.status}>{item.status}</AppText>

        <TouchableOpacity style={styles.arrowBtn}>
          <Ionicons name="chevron-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </AppView>
    </AppView>
  );
};

const OrdersScreen = () => {
  return (
    <AppSafeArea style={styles.container}>
      <Header />
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <OrderCard item={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </AppSafeArea>
  );
};

export default OrdersScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#0b0b0b',
  },

  card: {
    flexDirection: 'row',
    // backgroundColor: '#141414',
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,

    // ❗ important
    alignItems: 'flex-start',
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  orderId: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },

  meta: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },

  amount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginVertical: 6,
  },

  reorderBtn: {
    backgroundColor: '#0f8a1f',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 4,
  },

  reorderText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },

  right: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingLeft: 8,

    // ❗ REMOVE height:'100%'
  },

  status: {
    fontSize: 12,
    color: '#22c55e',
    fontWeight: '500',
  },

  arrowBtn: {
    marginTop: 24,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1f1f1f',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
