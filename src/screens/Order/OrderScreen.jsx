// import React, { useEffect, useState } from 'react';
// import {
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   ActivityIndicator,
//   RefreshControl,
// } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import AppSafeArea from '../../components/common/AppSafeArea';
// import AppView from '../../components/common/AppView';
// import AppText from '../../components/common/AppText';
// import Header from '../../components/common/Header';
// import { colors } from '../../theme/colors';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BASE_URL } from '../../api/apiClient';

// // const RETAILER_ID = 'RET00001';

// const OrdersScreen = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [expandedOrders, setExpandedOrders] = useState({});
//   const [orderDetails, setOrderDetails] = useState({});
//   const [retailerId, setRetailerId] = useState(null);

//   useEffect(() => {
//     loadRetailerAndOrders();
//   }, []);

//   const loadRetailerAndOrders = async () => {
//     try {
//       setLoading(true);

//       const storedId = await AsyncStorage.getItem('user_uuid');

//       console.log('📦 Retailer ID from storage:', storedId);

//       if (!storedId) {
//         setOrders([]);
//         setLoading(false);
//         return;
//       }

//       setRetailerId(storedId);
//       await fetchOrders(storedId);
//     } catch (error) {
//       console.log('Init Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchOrders = async (id = retailerId) => {
//     if (!id) return;
//     const TAG = '[API:Orders]';
//     const url = `${BASE_URL}/api/v1/order?retailerId=${id}`;
//     console.log(TAG, `▶ GET ${url}`);
//     const start = Date.now();
//     try {
//       const res = await fetch(url);
//       console.log(TAG, `⏱ ${Date.now() - start}ms | status: ${res.status}`);
//       const json = await res.json();

//       if (json.success) {
//         console.log(TAG, `✅ ${json.data?.length ?? 0} orders fetched`);
//         setOrders(json.data);
//       } else {
//         console.warn(TAG, `⚠️ No orders returned`);
//         setOrders([]);
//       }
//     } catch (err) {
//       console.error(TAG, `❌ Fetch Orders Error: ${err.message}`);
//       setOrders([]);
//     }
//   };

//   const fetchOrderDetails = async orderId => {
//     if (orderDetails[orderId]) {
//       toggleOrderExpand(orderId);
//       return;
//     }
//     const TAG = '[API:OrderDetails]';
//     const url = `${BASE_URL}/api/v1/order/${orderId}`;
//     console.log(TAG, `▶ GET ${url}`);
//     const start = Date.now();
//     try {
//       const res = await fetch(url);
//       console.log(TAG, `⏱ ${Date.now() - start}ms | status: ${res.status}`);
//       const json = await res.json();
//       if (json.success) {
//         console.log(TAG, `✅ Details loaded for order: ${orderId}`);
//         setOrderDetails(prev => ({ ...prev, [orderId]: json.data }));
//         toggleOrderExpand(orderId);
//       } else {
//         console.warn(TAG, `⚠️ Details not found for order: ${orderId}`);
//       }
//     } catch (err) {
//       console.error(TAG, `❌ Details Error: ${err.message}`);
//     }
//   };

//   const toggleOrderExpand = orderId => {
//     setExpandedOrders(prev => ({
//       ...prev,
//       [orderId]: !prev[orderId],
//     }));
//   };

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchOrders().then(() => setRefreshing(false));
//   };

//   const renderOrderHeader = item => (
//     <TouchableOpacity
//       style={styles.orderHeaderContainer}
//       onPress={() => fetchOrderDetails(item.orderId)}
//       activeOpacity={0.7}
//     >
//       <AppView style={styles.headerLeft}>
//         <AppView>
//           <AppText style={styles.orderId}>{item.orderId}</AppText>
//           <AppText style={styles.date}>
//             {new Date(item.createdAt).toDateString()}
//           </AppText>
//         </AppView>
//       </AppView>

//       <AppView style={styles.headerRight}>
//         <AppView style={styles.statusAmount}>
//           <AppText style={styles.amount}>₹{item.billing.grandTotal}</AppText>
//           <AppView style={styles.statusBadge}>
//             <AppText style={styles.status}>{item.orderStatus}</AppText>
//           </AppView>
//         </AppView>

//         <MaterialIcons
//           name={expandedOrders[item.orderId] ? 'expand-less' : 'expand-more'}
//           size={24}
//           color={colors.primary}
//         />
//       </AppView>
//     </TouchableOpacity>
//   );

//   const renderOrderDetails = item => {
//     const details = orderDetails[item.orderId];

//     return (
//       <AppView style={styles.detailsContainer}>
//         {/* Order Summary Section */}
//         <AppView style={styles.summarySection}>
//           <AppText style={styles.sectionTitle}>Order Summary</AppText>

//           <AppView style={styles.summaryRow}>
//             <AppText style={styles.summaryLabel}>Items</AppText>
//             <AppText style={styles.summaryValue}>
//               {item.items.length} item{item.items.length !== 1 ? 's' : ''}
//             </AppText>
//           </AppView>

//           <AppView style={styles.summaryRow}>
//             <AppText style={styles.summaryLabel}>Order Date</AppText>
//             <AppText style={styles.summaryValue}>
//               {new Date(item.createdAt).toDateString()}
//             </AppText>
//           </AppView>

//           {details && (
//             <>
//               <AppView style={styles.summaryRow}>
//                 <AppText style={styles.summaryLabel}>Payment Method</AppText>
//                 <AppText style={styles.summaryValue}>
//                   {details.payment?.mode || 'N/A'}
//                 </AppText>
//               </AppView>

//               <AppView style={styles.summaryRow}>
//                 <AppText style={styles.summaryLabel}>Expected Delivery</AppText>
//                 <AppText style={styles.summaryValue}>
//                   {new Date(
//                     details.delivery?.expectedDeliveryTime,
//                   ).toDateString()}
//                 </AppText>
//               </AppView>
//             </>
//           )}
//         </AppView>

//         {/* Items Section */}
//         {details && (
//           <AppView style={styles.itemsSection}>
//             <AppText style={styles.sectionTitle}>Items Ordered</AppText>

//             {details.items.map((product, index) => (
//               <AppView key={index} style={styles.itemCard}>
//                 <AppView style={styles.itemHeader}>
//                   <AppText style={styles.itemName}>
//                     {product.productName}
//                   </AppText>
//                   <AppText style={styles.itemPrice}>₹{product.price}</AppText>
//                 </AppView>

//                 <AppView style={styles.itemFooter}>
//                   <AppText style={styles.itemQuantity}>
//                     Qty: {product.quantity} {product.unit}
//                   </AppText>
//                 </AppView>
//               </AppView>
//             ))}
//           </AppView>
//         )}

//         {/* Billing Section */}
//         {details && (
//           <AppView style={styles.billingSection}>
//             <AppText style={styles.sectionTitle}>Billing Details</AppText>

//             <AppView style={styles.billingRow}>
//               <AppText style={styles.billingLabel}>Items Total</AppText>
//               <AppText style={styles.billingValue}>
//                 ₹{details.billing.itemTotal}
//               </AppText>
//             </AppView>

//             <AppView style={styles.billingRow}>
//               <AppText style={styles.billingLabel}>Delivery Charge</AppText>
//               <AppText style={styles.billingValue}>
//                 ₹{details.billing.deliveryCharge}
//               </AppText>
//             </AppView>

//             <AppView style={styles.billingRow}>
//               <AppText style={styles.billingLabel}>Tax</AppText>
//               <AppText style={styles.billingValue}>
//                 ₹{details.billing.tax}
//               </AppText>
//             </AppView>

//             <AppView style={styles.divider} />

//             <AppView style={styles.totalRow}>
//               <AppText style={styles.totalLabel}>Grand Total</AppText>
//               <AppText style={styles.totalValue}>
//                 ₹{details.billing.grandTotal}
//               </AppText>
//             </AppView>
//           </AppView>
//         )}
//       </AppView>
//     );
//   };

//   const renderOrderCard = ({ item }) => (
//     <AppView style={styles.orderCard}>
//       {renderOrderHeader(item)}

//       {expandedOrders[item.orderId] && (
//         <>
//           {!orderDetails[item.orderId] ? (
//             <AppView style={styles.loadingContainer}>
//               <ActivityIndicator size="small" color={colors.primary} />
//               <AppText style={styles.loadingText}>Loading details...</AppText>
//             </AppView>
//           ) : (
//             renderOrderDetails(item)
//           )}
//         </>
//       )}
//     </AppView>
//   );

//   return (
//     <AppSafeArea style={styles.container}>
//       <Header />

//       {loading ? (
//         <AppView style={styles.loadingCenter}>
//           <ActivityIndicator size="large" color={colors.primary} />
//         </AppView>
//       ) : orders.length === 0 ? (
//         <AppView style={styles.emptyContainer}>
//           <MaterialIcons
//             name="shopping-bag"
//             size={64}
//             color={colors.textMuted}
//           />
//           <AppText style={styles.emptyText}>No orders yet</AppText>
//           <AppText style={styles.emptySubText}>
//             Your orders will appear here
//           </AppText>
//         </AppView>
//       ) : (
//         <FlatList
//           data={orders}
//           keyExtractor={item => item.orderId}
//           renderItem={renderOrderCard}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               tintColor={colors.primary}
//             />
//           }
//           contentContainerStyle={styles.listContent}
//           showsVerticalScrollIndicator={false}
//         />
//       )}
//     </AppSafeArea>
//   );
// };

// export default OrdersScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//     paddingBottom: 80,
//   },

//   listContent: {
//     padding: 16,
//     paddingBottom: 24,
//   },

//   loadingCenter: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 32,
//   },

//   emptyText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: colors.textPrimary,
//     marginTop: 16,
//   },

//   emptySubText: {
//     fontSize: 14,
//     color: colors.textSecondary,
//     marginTop: 8,
//     textAlign: 'center',
//   },

//   // Order Card
//   orderCard: {
//     backgroundColor: colors.background,
//     borderRadius: 16,
//     marginBottom: 12,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: colors.border,
//   },

//   orderHeaderContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//   },

//   headerLeft: {
//     flex: 1,
//   },

//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },

//   orderId: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: colors.textPrimary,
//   },

//   date: {
//     fontSize: 12,
//     color: colors.textSecondary,
//     marginTop: 4,
//   },

//   statusAmount: {
//     alignItems: 'flex-end',
//     gap: 8,
//   },

//   amount: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: colors.primary,
//   },

//   statusBadge: {
//     backgroundColor: colors.primary + '20',
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },

//   status: {
//     fontSize: 11,
//     fontWeight: '600',
//     color: colors.primary,
//   },

//   // Details Container
//   detailsContainer: {
//     paddingHorizontal: 16,
//     paddingBottom: 16,
//     borderTopWidth: 1,
//     borderTopColor: colors.border,
//   },

//   summarySection: {
//     marginTop: 12,
//   },

//   itemsSection: {
//     marginTop: 16,
//   },

//   billingSection: {
//     marginTop: 16,
//   },

//   sectionTitle: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: colors.primary,
//     marginBottom: 10,
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },

//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 8,
//   },

//   summaryLabel: {
//     fontSize: 13,
//     color: colors.textSecondary,
//   },

//   summaryValue: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: colors.textPrimary,
//   },

//   // Item Card
//   itemCard: {
//     backgroundColor: colors.background,
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 8,
//     borderLeftWidth: 3,
//     borderLeftColor: colors.primary,
//   },

//   itemHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 6,
//   },

//   itemName: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: colors.textPrimary,
//     flex: 1,
//   },

//   itemPrice: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: colors.primary,
//   },

//   itemFooter: {
//     marginTop: 4,
//   },

//   itemQuantity: {
//     fontSize: 12,
//     color: colors.textSecondary,
//   },

//   // Billing
//   billingRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 8,
//   },

//   billingLabel: {
//     fontSize: 13,
//     color: colors.textSecondary,
//   },

//   billingValue: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: colors.textPrimary,
//   },

//   divider: {
//     height: 1,
//     backgroundColor: colors.border,
//     marginVertical: 10,
//   },

//   totalRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 8,
//   },

//   totalLabel: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: colors.textPrimary,
//   },

//   totalValue: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: colors.primary,
//   },

//   loadingContainer: {
//     paddingVertical: 20,
//     alignItems: 'center',
//     flexDirection: 'row',
//     gap: 12,
//     justifyContent: 'center',
//     borderTopWidth: 1,
//     borderTopColor: colors.border,
//   },

//   loadingText: {
//     fontSize: 12,
//     color: colors.textSecondary,
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppSafeArea from '../../components/common/AppSafeArea';
import AppView from '../../components/common/AppView';
import AppText from '../../components/common/AppText';
import Header from '../../components/common/Header';
import { colors } from '../../theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../api/apiClient';

// const RETAILER_ID = 'RET00001';

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [orderDetails, setOrderDetails] = useState({});
  const [retailerId, setRetailerId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRetailerAndOrders();
  }, []);

  const loadRetailerAndOrders = async () => {
    try {
      setLoading(true);

      const storedId = await AsyncStorage.getItem('user_uuid');

      console.log('📦 Retailer ID from storage:', storedId);

      if (!storedId) {
        setOrders([]);
        setLoading(false);
        return;
      }

      setRetailerId(storedId);
      await fetchOrders(storedId);
    } catch (error) {
      console.log('Init Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async (id = retailerId) => {
    if (!id) return;

    const TAG = '[API:Orders]';
    const url = `${BASE_URL}/api/v1/order?retailerId=${id}`;
    console.log(TAG, `▶ GET ${url}`);

    const start = Date.now();

    try {
      setError(null);

      const res = await fetch(url);

      console.log(TAG, `⏱ ${Date.now() - start}ms | status: ${res.status}`);

      if (!res.ok) {
        throw new Error(`Server error (${res.status})`);
      }

      const json = await res.json();

      if (json.success) {
        setOrders(json.data || []);
      } else {
        throw new Error('Failed to fetch orders');
      }
    } catch (err) {
      console.log(TAG, `❌ Fetch Orders Error: ${err.message}`);
      setError(
        'We’re unable to load your orders right now. Please try again in a moment.',
      );
      setOrders([]);
    }
  };

  const fetchOrderDetails = async orderId => {
    if (orderDetails[orderId]) {
      toggleOrderExpand(orderId);
      return;
    }
    const TAG = '[API:OrderDetails]';
    const url = `${BASE_URL}/api/v1/order/${orderId}`;
    console.log(TAG, `▶ GET ${url}`);
    const start = Date.now();
    try {
      const res = await fetch(url);
      console.log(TAG, `⏱ ${Date.now() - start}ms | status: ${res.status}`);
      const json = await res.json();
      if (json.success) {
        console.log(TAG, `✅ Details loaded for order: ${orderId}`);
        setOrderDetails(prev => ({ ...prev, [orderId]: json.data }));
        toggleOrderExpand(orderId);
      } else {
        console.warn(TAG, `⚠️ Details not found for order: ${orderId}`);
      }
    } catch (err) {
      console.error(TAG, `❌ Details Error: ${err.message}`);
    }
  };

  const toggleOrderExpand = orderId => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders().then(() => setRefreshing(false));
  };

  const renderOrderHeader = item => (
    <TouchableOpacity
      style={styles.orderHeaderContainer}
      onPress={() => fetchOrderDetails(item.orderId)}
      activeOpacity={0.7}
    >
      <AppView style={styles.headerLeft}>
        <AppView>
          <AppText style={styles.orderId}>{item.orderId}</AppText>
          <AppText style={styles.date}>
            {new Date(item.createdAt).toDateString()}
          </AppText>
        </AppView>
      </AppView>

      <AppView style={styles.headerRight}>
        <AppView style={styles.statusAmount}>
          <AppText style={styles.amount}>₹{item.billing.grandTotal}</AppText>
          <AppView style={styles.statusBadge}>
            <AppText style={styles.status}>{item.orderStatus}</AppText>
          </AppView>
        </AppView>

        <MaterialIcons
          name={expandedOrders[item.orderId] ? 'expand-less' : 'expand-more'}
          size={24}
          color={colors.primary}
        />
      </AppView>
    </TouchableOpacity>
  );

  const renderOrderDetails = item => {
    const details = orderDetails[item.orderId];

    return (
      <AppView style={styles.detailsContainer}>
        {/* Order Summary Section */}
        <AppView style={styles.summarySection}>
          <AppText style={styles.sectionTitle}>Order Summary</AppText>

          <AppView style={styles.summaryRow}>
            <AppText style={styles.summaryLabel}>Items</AppText>
            <AppText style={styles.summaryValue}>
              {item.items.length} item{item.items.length !== 1 ? 's' : ''}
            </AppText>
          </AppView>

          <AppView style={styles.summaryRow}>
            <AppText style={styles.summaryLabel}>Order Date</AppText>
            <AppText style={styles.summaryValue}>
              {new Date(item.createdAt).toDateString()}
            </AppText>
          </AppView>

          {details && (
            <>
              <AppView style={styles.summaryRow}>
                <AppText style={styles.summaryLabel}>Payment Method</AppText>
                <AppText style={styles.summaryValue}>
                  {details.payment?.mode || 'N/A'}
                </AppText>
              </AppView>

              <AppView style={styles.summaryRow}>
                <AppText style={styles.summaryLabel}>Expected Delivery</AppText>
                <AppText style={styles.summaryValue}>
                  {new Date(
                    details.delivery?.expectedDeliveryTime,
                  ).toDateString()}
                </AppText>
              </AppView>
            </>
          )}
        </AppView>

        {/* Items Section */}
        {details && (
          <AppView style={styles.itemsSection}>
            <AppText style={styles.sectionTitle}>Items Ordered</AppText>

            {details.items.map((product, index) => (
              <AppView key={index} style={styles.itemCard}>
                <AppView style={styles.itemHeader}>
                  <AppText style={styles.itemName}>
                    {product.productName}
                  </AppText>
                  <AppText style={styles.itemPrice}>₹{product.price}</AppText>
                </AppView>

                <AppView style={styles.itemFooter}>
                  <AppText style={styles.itemQuantity}>
                    Qty: {product.quantity} {product.unit}
                  </AppText>
                </AppView>
              </AppView>
            ))}
          </AppView>
        )}

        {/* Billing Section */}
        {details && (
          <AppView style={styles.billingSection}>
            <AppText style={styles.sectionTitle}>Billing Details</AppText>

            <AppView style={styles.billingRow}>
              <AppText style={styles.billingLabel}>Items Total</AppText>
              <AppText style={styles.billingValue}>
                ₹{details.billing.itemTotal}
              </AppText>
            </AppView>

            <AppView style={styles.billingRow}>
              <AppText style={styles.billingLabel}>Delivery Charge</AppText>
              <AppText style={styles.billingValue}>
                ₹{details.billing.deliveryCharge}
              </AppText>
            </AppView>

            <AppView style={styles.billingRow}>
              <AppText style={styles.billingLabel}>Tax</AppText>
              <AppText style={styles.billingValue}>
                ₹{details.billing.tax}
              </AppText>
            </AppView>

            <AppView style={styles.divider} />

            <AppView style={styles.totalRow}>
              <AppText style={styles.totalLabel}>Grand Total</AppText>
              <AppText style={styles.totalValue}>
                ₹{details.billing.grandTotal}
              </AppText>
            </AppView>
          </AppView>
        )}
      </AppView>
    );
  };

  const renderOrderCard = ({ item }) => (
    <AppView style={styles.orderCard}>
      {renderOrderHeader(item)}

      {expandedOrders[item.orderId] && (
        <>
          {!orderDetails[item.orderId] ? (
            <AppView style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.primary} />
              <AppText style={styles.loadingText}>Loading details...</AppText>
            </AppView>
          ) : (
            renderOrderDetails(item)
          )}
        </>
      )}
    </AppView>
  );

  return (
    <AppSafeArea style={styles.container}>
      <Header />

      {loading ? (
        <AppView style={styles.loadingCenter}>
          <ActivityIndicator size="large" color={colors.primary} />
        </AppView>
      ) : error ? (
        <AppView style={styles.emptyContainer}>
          <MaterialIcons name="cloud-off" size={64} color={colors.textMuted} />

          <AppText style={styles.emptyText}>Unable to load orders</AppText>

          <AppText style={styles.emptySubText}>{error}</AppText>

          <TouchableOpacity
            onPress={() => fetchOrders()}
            style={{
              marginTop: 20,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
              backgroundColor: colors.primary,
            }}
          >
            <AppText style={{ color: '#fff', fontWeight: '600' }}>
              Retry
            </AppText>
          </TouchableOpacity>
        </AppView>
      ) : orders.length === 0 ? (
        <AppView style={styles.emptyContainer}>
          <MaterialIcons
            name="shopping-bag"
            size={64}
            color={colors.textMuted}
          />
          <AppText style={styles.emptyText}>No orders yet</AppText>
          <AppText style={styles.emptySubText}>
            Your orders will appear here
          </AppText>
        </AppView>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.orderId}
          renderItem={renderOrderCard}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </AppSafeArea>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 80,
  },

  listContent: {
    padding: 16,
    paddingBottom: 24,
  },

  loadingCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 16,
  },

  emptySubText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },

  // Order Card
  orderCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },

  orderHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  headerLeft: {
    flex: 1,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  date: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },

  statusAmount: {
    alignItems: 'flex-end',
    gap: 8,
  },

  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },

  statusBadge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  status: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
  },

  // Details Container
  detailsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  summarySection: {
    marginTop: 12,
  },

  itemsSection: {
    marginTop: 16,
  },

  billingSection: {
    marginTop: 16,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },

  summaryLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  // Item Card
  itemCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },

  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },

  itemName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
  },

  itemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },

  itemFooter: {
    marginTop: 4,
  },

  itemQuantity: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  // Billing
  billingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },

  billingLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  billingValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 10,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },

  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  totalValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },

  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  loadingText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
