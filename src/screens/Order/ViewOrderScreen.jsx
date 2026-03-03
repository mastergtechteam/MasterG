import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../api/apiClient';
import GoBackHeader from '../../components/common/GoBackHeader';
import AppView from '../../components/common/AppView';
import { useDispatch } from 'react-redux';
import { clearCart, addToCart } from '../../features/cart/cartSlice';
import { processReorder } from '../../screens/services/reOrder/reorderService';
import { getAuthData } from '../../utils/secureStore';

const SAMPLE_IMAGE = 'https://via.placeholder.com/100x100.png?text=Product';

const ViewOrderScreen = ({ route, navigation }) => {
  const { orderId } = route.params;

  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  const [trackingData, setTrackingData] = useState([]);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchOrderDetails();
    fetchTrackingStatus();
  }, []);

  const formatStatus = status => {
    return status
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  const fetchTrackingStatus = async () => {
    try {
      setTrackingLoading(true);

      const authData = await getAuthData();
      if (!authData?.token) return;

      const url = `${BASE_URL}/api/v1/order/${orderId}/status`;
      console.log('Fetching tracking:', url);

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      });

      if (res.data.success) {
        setTrackingData(res.data.tracking);
      }
    } catch (error) {
      console.log('Tracking Error:', error?.response || error);
    } finally {
      setTrackingLoading(false);
    }
  };

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);

      const authData = await getAuthData();
      if (!authData?.token) return;

      const url = `${BASE_URL}/api/v1/order/${orderId}`;
      console.log('Fetching:', url);

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      });

      if (res.data.success) {
        setOrderDetails(res.data.data);
      }
    } catch (error) {
      console.log('Order Details Error:', error?.response || error);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = () => {
    Alert.alert('Cancel Order', 'Are you sure you want to cancel this order?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes, Cancel',
        style: 'destructive',
        onPress: async () => {
          try {
            setLoading(true);

            const authData = await getAuthData();
            if (!authData?.token) return;

            const url = `${BASE_URL}/api/v1/order/${orderId}`;
            console.log('Cancelling:', url);

            const response = await axios.delete(url, {
              headers: {
                Authorization: `Bearer ${authData.token}`,
              },
            });

            console.log('Cancel Response:', response.data);

            if (response.data.success) {
              Alert.alert('Success', 'Order cancelled successfully');

              await fetchOrderDetails(); // refresh current order

              // OPTIONAL (Recommended):
              // Go back to orders screen after cancel
              navigation.goBack();
            } else {
              Alert.alert('Error', 'Unable to cancel order');
            }
          } catch (error) {
            console.log('Cancel Error:', error?.response || error);
            Alert.alert(
              'Error',
              error?.response?.data?.message ||
                'Something went wrong while cancelling',
            );
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  const reorder = async () => {
    try {
      setLoading(true);

      const result = await processReorder(orderDetails.items);

      setLoading(false);

      if (!result.success) {
        Alert.alert('Error', result.message);
        return;
      }

      const { cartItems, unavailableItems } = result;

      if (cartItems.length === 0) {
        Alert.alert('Unavailable', 'All items are currently out of stock');
        return;
      }

      // 1️⃣ Clear cart
      dispatch(clearCart());

      // 2️⃣ Add safe items
      cartItems.forEach(item => {
        dispatch(addToCart(item?.product));
      });

      // 3️⃣ Show unavailable items
      if (unavailableItems.length > 0) {
        Alert.alert(
          'Some Items Unavailable',
          `${unavailableItems.length} item(s) were not added because they are out of stock.`,
        );
      }

      // 4️⃣ Navigate to cart
      navigation.navigate('Cart');
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  if (!orderDetails) return null;

  const { billing, items, orderStatus, createdAt } = orderDetails;

  return (
    <AppView style={styles.screen}>
      <GoBackHeader title="Order Details" showSearch={false} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* ORDER HEADER CARD */}
        <View style={styles.headerCard}>
          <Text style={styles.orderLabel}>Order ID</Text>
          <Text style={styles.orderId}>{orderId}</Text>

          <View style={styles.statusRow}>
            <Text style={styles.date}>
              {new Date(createdAt).toDateString()}
            </Text>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{orderStatus}</Text>
            </View>
          </View>
        </View>

        {/* TRACK ORDER SECTION */}
        {/* TRACK ORDER SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Track Order</Text>

          {trackingLoading ? (
            <ActivityIndicator size="small" color="#22c55e" />
          ) : (
            <View style={styles.timelineWrapper}>
              {/* Single Vertical Line */}
              <View style={styles.mainLine} />

              {trackingData.map((step, index) => {
                const isCompleted = step.completed;
                const isCurrent = step.current;

                const active = isCompleted || isCurrent;

                return (
                  <View key={index} style={styles.timelineRow}>
                    {/* Circle */}
                    <View
                      style={[
                        styles.circle,
                        {
                          backgroundColor: active ? '#22c55e' : '#0b0f14',
                          borderColor: active
                            ? '#22c55e'
                            : 'rgba(255,255,255,0.2)',
                        },
                      ]}
                    />

                    {/* Status Text */}
                    <Text
                      style={[
                        styles.timelineText,
                        {
                          color: active ? '#22c55e' : '#6b7280',
                          fontWeight: isCurrent ? '700' : '500',
                        },
                      ]}
                    >
                      {formatStatus(step.status)}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        {/* ITEMS SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items Ordered</Text>

          {items.map((item, index) => (
            <View key={index} style={styles.productCard}>
              <Image
                source={
                  item?.image && item.image.trim() !== ''
                    ? { uri: item.image }
                    : require('../../assets/images/no-image.png') // local fallback
                }
                style={styles.productImage}
                resizeMode="cover"
                onError={e => console.log('Image failed to load:', item.image)}
              />

              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.productName}</Text>

                <Text style={styles.productQty}>
                  Qty: {item.quantity} {item.unit}
                </Text>
              </View>

              <Text style={styles.productPrice}>₹{item.price}</Text>
            </View>
          ))}
        </View>

        {/* BILLING SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Billing Details</Text>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Items Total</Text>
            <Text style={styles.billValue}>₹{billing.itemTotal}</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery</Text>
            <Text style={styles.billValue}>₹{billing.deliveryCharge}</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Tax</Text>
            <Text style={styles.billValue}>₹{billing.tax}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Grand Total</Text>
            <Text style={styles.totalAmount}>₹{billing.grandTotal}</Text>
          </View>
        </View>

        {/* ACTION BUTTONS */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.reorderBtn} onPress={reorder}>
            <Text style={styles.btnText}>Reorder</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={cancelOrder}>
            <Text style={styles.cancelText}>Cancel Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppView>
  );
};

export default ViewOrderScreen;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0b0f14',
    paddingTop: 10,
  },

  header: {
    height: 60,
    backgroundColor: '#0b0f14',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },

  backBtn: {
    width: 40,
    justifyContent: 'center',
  },

  backArrow: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '600',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  container: {
    flex: 1,
    padding: 16,
  },

  container: {
    flex: 1,
    backgroundColor: '#0b0f14',
    padding: 16,
  },
  loader: {
    flex: 1,
    backgroundColor: '#0b0f14',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  orderLabel: {
    color: '#6b7280',
    fontSize: 12,
  },
  orderId: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 6,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    color: '#9ca3af',
    fontSize: 12,
  },
  statusBadge: {
    backgroundColor: 'rgba(34,197,94,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 30,
  },
  statusText: {
    color: '#22c55e',
    fontSize: 12,
    fontWeight: '600',
  },

  section: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 15,
  },

  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: '#fff',
    fontWeight: '600',
  },
  productQty: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 4,
  },
  productPrice: {
    color: '#22c55e',
    fontWeight: '600',
  },

  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  billLabel: {
    color: '#9ca3af',
  },
  billValue: {
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    color: '#fff',
    fontWeight: '700',
  },
  totalAmount: {
    color: '#22c55e',
    fontWeight: '700',
    fontSize: 16,
  },

  buttonContainer: {
    marginBottom: 40,
  },
  reorderBtn: {
    backgroundColor: '#22c55e',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: '#ef4444',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  cancelText: {
    color: '#ef4444',
    fontWeight: '600',
  },
  timelineWrapper: {
    marginTop: 15,
    paddingLeft: 10,
  },

  mainLine: {
    position: 'absolute',
    left: 16,
    top: 10,
    bottom: 10,
    width: 2,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },

  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginRight: 20,
    zIndex: 1,
  },

  timelineText: {
    fontSize: 14,
  },
});
