// import React from 'react';
// import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import AppSafeArea from '../../components/common/AppSafeArea';
// import AppView from '../../components/common/AppView';
// import AppText from '../../components/common/AppText';
// import AppButton from '../../components/common/AppButton';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Header from '../../components/common/Header';

// const orders = [
//   {
//     id: 'ORD-001',
//     date: '18 Dec 2025',
//     items: 12,
//     amount: '₹9,897',
//     status: 'Delivered',
//     image: require('../../assets/images/store.jpg'),
//   },
//   {
//     id: 'ORD-002',
//     date: '15 Dec 2025',
//     items: 8,
//     amount: '₹2,897',
//     status: 'Delivered',
//     image: require('../../assets/images/store.jpg'),
//   },
//   {
//     id: 'ORD-003',
//     date: '15 Dec 2025',
//     items: 8,
//     amount: '₹2,897',
//     status: 'Delivered',
//     image: require('../../assets/images/store.jpg'),
//   },
//   {
//     id: 'ORD-004',
//     date: '15 Dec 2025',
//     items: 8,
//     amount: '₹2,897',
//     status: 'Delivered',
//     image: require('../../assets/images/store.jpg'),
//   },
// ];

// const OrderCard = ({ item }) => {
//   return (
//     <AppView style={styles.card}>
//       {/* Image */}
//       <Image source={item.image} style={styles.image} />

//       {/* Content */}
//       <AppView style={styles.content}>
//         <AppText style={styles.orderId}>{item.id}</AppText>
//         <AppText style={styles.meta}>{item.date}</AppText>
//         <AppText style={styles.meta}>{item.items} items</AppText>
//         <AppText style={styles.amount}>{item.amount}</AppText>

//         <AppButton
//           title="Reorder"
//           icon="refresh"
//           iconPosition="left"
//           style={styles.reorderBtn}
//           textStyle={styles.reorderText}
//           onPress={() => {}}
//         />
//       </AppView>

//       {/* Right column */}
//       <AppView style={styles.right}>
//         <AppText style={styles.status}>{item.status}</AppText>

//         <TouchableOpacity style={styles.arrowBtn}>
//           <Ionicons name="chevron-forward" size={18} color="#fff" />
//         </TouchableOpacity>
//       </AppView>
//     </AppView>
//   );
// };

// const OrdersScreen = () => {
//   return (
//     <AppSafeArea style={styles.container}>
//       <Header />
//       <FlatList
//         data={orders}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => <OrderCard item={item} />}
//         contentContainerStyle={{ paddingBottom: 20 }}
//         showsVerticalScrollIndicator={false}
//       />
//     </AppSafeArea>
//   );
// };

// export default OrdersScreen;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#0b0b0b',
//   },

//   card: {
//     flexDirection: 'row',
//     // backgroundColor: '#141414',
//     borderRadius: 16,
//     padding: 12,
//     marginBottom: 14,

//     // ❗ important
//     alignItems: 'flex-start',
//   },

//   image: {
//     width: 60,
//     height: 60,
//     borderRadius: 12,
//     marginRight: 12,
//   },

//   content: {
//     flex: 1,
//   },

//   orderId: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#fff',
//   },

//   meta: {
//     fontSize: 12,
//     color: '#9ca3af',
//     marginTop: 2,
//   },

//   amount: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#fff',
//     marginVertical: 6,
//   },

//   reorderBtn: {
//     backgroundColor: '#0f8a1f',
//     paddingVertical: 4,
//     paddingHorizontal: 12,
//     borderRadius: 10,
//     alignSelf: 'flex-start',
//     marginTop: 4,
//   },

//   reorderText: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#fff',
//   },

//   right: {
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     paddingLeft: 8,

//     // ❗ REMOVE height:'100%'
//   },

//   status: {
//     fontSize: 12,
//     color: '#22c55e',
//     fontWeight: '500',
//   },

//   arrowBtn: {
//     marginTop: 24,
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     backgroundColor: '#1f1f1f',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import AppSafeArea from '../../components/common/AppSafeArea';
import AppView from '../../components/common/AppView';
import AppText from '../../components/common/AppText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../components/common/Header';

const RETAILER_ID = 'RET00001';

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://2a0t2oahs8.execute-api.ap-south-1.amazonaws.com/api/v1/order?retailerId=${RETAILER_ID}`,
      );
      const json = await res.json();
      if (json.success) {
        setOrders(json.data.reverse());
      }
    } catch (err) {
      console.log('Fetch Orders Error:', err);
    }
    setLoading(false);
  };

  const fetchOrderDetails = async orderId => {
    setDetailsLoading(true);
    try {
      const res = await fetch(
        `https://2a0t2oahs8.execute-api.ap-south-1.amazonaws.com/api/v1/order/${orderId}`,
      );
      const json = await res.json();
      if (json.success) {
        setSelectedOrder(json.data);
      }
    } catch (err) {
      console.log('Details Error:', err);
    }
    setDetailsLoading(false);
  };

  const renderOrderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => fetchOrderDetails(item.orderId)}
      activeOpacity={0.8}
    >
      <AppView style={styles.cardLeft}>
        <AppText style={styles.orderId}>{item.orderId}</AppText>
        <AppText style={styles.date}>
          {new Date(item.createdAt).toDateString()}
        </AppText>
        <AppText style={styles.items}>{item.items.length} items</AppText>
      </AppView>

      <AppView style={styles.cardRight}>
        <AppText style={styles.amount}>₹{item.billing.grandTotal}</AppText>
        <AppText style={styles.status}>{item.orderStatus}</AppText>
      </AppView>
    </TouchableOpacity>
  );

  return (
    <AppSafeArea style={styles.container}>
      <Header />

      {loading ? (
        <ActivityIndicator size="large" color="#16a34a" />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.orderId}
          renderItem={renderOrderCard}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchOrders} />
          }
          contentContainerStyle={{ padding: 16 }}
        />
      )}

      {/* ORDER DETAILS MODAL */}
      <Modal visible={!!selectedOrder} animationType="slide">
        <AppSafeArea style={styles.modalContainer}>
          <Header />

          {detailsLoading ? (
            <ActivityIndicator size="large" color="#16a34a" />
          ) : (
            selectedOrder && (
              <FlatList
                ListHeaderComponent={
                  <View style={{ padding: 16 }}>
                    <AppText style={styles.modalTitle}>
                      Order {selectedOrder.orderId}
                    </AppText>

                    <AppText style={styles.modalMeta}>
                      Status: {selectedOrder.orderStatus}
                    </AppText>
                    <AppText style={styles.modalMeta}>
                      Payment: {selectedOrder.payment.mode}
                    </AppText>
                    <AppText style={styles.modalMeta}>
                      Delivery:{' '}
                      {new Date(
                        selectedOrder.delivery.expectedDeliveryTime,
                      ).toDateString()}
                    </AppText>

                    <AppText style={styles.sectionTitle}>Items</AppText>
                  </View>
                }
                data={selectedOrder.items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.itemRow}>
                    <AppText style={styles.itemName}>
                      {item.productName}
                    </AppText>
                    <AppText style={styles.itemQty}>
                      {item.quantity} {item.unit}
                    </AppText>
                    <AppText style={styles.itemPrice}>₹{item.price}</AppText>
                  </View>
                )}
                ListFooterComponent={
                  <View style={{ padding: 16 }}>
                    <AppText style={styles.sectionTitle}>Billing</AppText>

                    <AppText>
                      Items Total: ₹{selectedOrder.billing.itemTotal}
                    </AppText>
                    <AppText>
                      Delivery: ₹{selectedOrder.billing.deliveryCharge}
                    </AppText>
                    <AppText>Tax: ₹{selectedOrder.billing.tax}</AppText>
                    <AppText style={styles.grandTotal}>
                      Grand Total: ₹{selectedOrder.billing.grandTotal}
                    </AppText>

                    <TouchableOpacity
                      style={styles.closeBtn}
                      onPress={() => setSelectedOrder(null)}
                    >
                      <AppText style={{ color: '#fff' }}>Close</AppText>
                    </TouchableOpacity>
                  </View>
                }
              />
            )
          )}
        </AppSafeArea>
      </Modal>
    </AppSafeArea>
  );
};

export default OrdersScreen;
const styles = StyleSheet.create({
  container: { flex: 1 },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    elevation: 3,
  },

  cardLeft: { flex: 1 },

  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  orderId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },

  date: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },

  items: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },

  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22c55e',
  },

  status: {
    fontSize: 12,
    color: '#16a34a',
    marginTop: 8,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: '#0b0b0b',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },

  modalMeta: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 4,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22c55e',
    marginTop: 16,
    marginBottom: 10,
  },

  itemRow: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 10,
  },

  itemName: {
    color: '#fff',
    fontWeight: '600',
  },

  itemQty: {
    color: '#9ca3af',
    marginTop: 4,
  },

  itemPrice: {
    color: '#22c55e',
    marginTop: 4,
    fontWeight: '600',
  },

  grandTotal: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '700',
    color: '#22c55e',
  },

  closeBtn: {
    backgroundColor: '#16a34a',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
});
// correct this screen make the ui more attractive: and also when pressed on order show the details of order we can show it like profile on expand show details
// make sure ui matches the all over app pages
// and dont chnage any other screens do chnages only in this order screen
