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
import { useNavigation } from '@react-navigation/native';
import { getAuthData } from '../../utils/secureStore';

// const RETAILER_ID = 'RET00001';

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [orderDetails, setOrderDetails] = useState({});
  const [retailerId, setRetailerId] = useState(null);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    loadRetailerAndOrders();
  }, []);

  const loadRetailerAndOrders = async () => {
    try {
      setLoading(true);

      const authData = await getAuthData();

      console.log('🔐 Secure Auth Data:', authData);

      if (!authData?.token || !authData?.retailerId) {
        setOrders([]);
        return;
      }

      setRetailerId(authData.retailerId);

      await fetchOrders(authData.retailerId, authData.token);
    } catch (error) {
      console.log('Init Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async (id = retailerId, token = null) => {
    if (!id) return;

    const TAG = '[API:Orders]';

    const authData = token ? { token } : await getAuthData();

    const url = `${BASE_URL}/api/v1/order?retailerId=${id}`;

    console.log(TAG, `▶ GET ${url}`);

    const start = Date.now();

    try {
      setError(null);

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${authData?.token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(TAG, `⏱ ${Date.now() - start}ms | status: ${res.status}`);

      if (!res.ok) {
        throw new Error(`Server error (${res.status})`);
      }

      const json = await res.json();

      if (json.success) {
        setOrders(json.data || []);
      } else {
        throw new Error(json.message || 'Failed to fetch orders');
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
    const TAG = '[API:OrderDetails]';

    const authData = await getAuthData();
    if (!authData?.token) return;

    const url = `${BASE_URL}/api/v1/order/${orderId}`;

    console.log(TAG, `▶ GET ${url}`);

    const start = Date.now();

    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      });

      console.log(TAG, `⏱ ${Date.now() - start}ms | status: ${res.status}`);

      const json = await res.json();

      if (json.success) {
        setOrderDetails(prev => ({ ...prev, [orderId]: json.data }));
        toggleOrderExpand(orderId);
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

  const getStatusColor = status => {
    switch (status?.toLowerCase()) {
      case 'placed':
        return { bg: 'rgba(59,130,246,0.15)', text: '#3b82f6' };
      case 'delivered':
        return { bg: 'rgba(34,197,94,0.15)', text: '#22c55e' };
      case 'cancelled':
        return { bg: 'rgba(239,68,68,0.15)', text: '#ef4444' };
      case 'processing':
        return { bg: 'rgba(234,179,8,0.15)', text: '#eab308' };
      default:
        return { bg: 'rgba(156,163,175,0.15)', text: '#9ca3af' };
    }
  };

  const renderOrderCard = ({ item }) => {
    const statusColor = getStatusColor(item.orderStatus);

    return (
      <TouchableOpacity
        style={styles.orderCard}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate('ViewOrder', {
            orderId: item.orderId,
          })
        }
      >
        {/* Top Row */}
        <AppView style={styles.topRow}>
          <AppView style={styles.orderInfo}>
            <AppText style={styles.orderId}>#{item.orderId.slice(-6)}</AppText>
            <AppText style={styles.date}>
              {new Date(item.createdAt).toDateString()}
            </AppText>
          </AppView>

          <AppText style={styles.amount}>₹{item.billing?.grandTotal}</AppText>
        </AppView>

        {/* Divider */}
        <AppView style={styles.divider} />

        {/* Bottom Row */}
        <AppView style={styles.bottomRow}>
          <AppView
            style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}
          >
            <AppText style={[styles.statusText, { color: statusColor.text }]}>
              {item.orderStatus}
            </AppText>
          </AppView>

          <AppView style={styles.viewSection}>
            <AppText style={styles.viewText}>View Details</AppText>
            <MaterialIcons name="arrow-forward-ios" size={14} color="#9ca3af" />
          </AppView>
        </AppView>
      </TouchableOpacity>
    );
  };

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
    paddingBottom: 60,
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
  // orderCard: {
  //   backgroundColor: colors.background,
  //   borderRadius: 16,
  //   marginBottom: 12,
  //   overflow: 'hidden',
  //   borderWidth: 1,
  //   borderColor: colors.border,
  // },

  // orderHeaderContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   paddingHorizontal: 16,
  //   paddingVertical: 14,
  // },

  // headerLeft: {
  //   flex: 1,
  // },

  // headerRight: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: 12,
  // },

  // orderId: {
  //   fontSize: 16,
  //   fontWeight: '700',
  //   color: colors.textPrimary,
  // },

  // date: {
  //   fontSize: 12,
  //   color: colors.textSecondary,
  //   marginTop: 4,
  // },

  // statusAmount: {
  //   alignItems: 'flex-end',
  //   gap: 8,
  // },

  // amount: {
  //   fontSize: 16,
  //   fontWeight: '700',
  //   color: colors.primary,
  // },

  // statusBadge: {
  //   backgroundColor: colors.primary + '20',
  //   paddingHorizontal: 10,
  //   paddingVertical: 4,
  //   borderRadius: 8,
  // },

  // status: {
  //   fontSize: 11,
  //   fontWeight: '600',
  //   color: colors.primary,
  // },

  orderCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111827',
  },

  orderInfo: {
    backgroundColor: '#111827',
  },

  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },

  date: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },

  amount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#22c55e',
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginVertical: 14,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111827',
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
  },

  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },

  viewSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
  },

  viewText: {
    fontSize: 13,
    color: '#9ca3af',
    marginRight: 6,
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
