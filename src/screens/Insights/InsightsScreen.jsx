import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppSafeArea from '../../components/common/AppSafeArea';
import AppView from '../../components/common/AppView';
import AppText from '../../components/common/AppText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../components/common/Header';
import { BASE_URL } from '../../api/apiClient';
import { useNavigation } from '@react-navigation/native';

export default function InsightsScreen() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const priceChanges = [
    { id: '1', name: 'Sugar', days: 'Expected in 5 days', change: '+8%' },
    { id: '2', name: 'Cooking Oil', days: 'Expected in 7 days', change: '+8%' },
    { id: '3', name: 'Rice', days: 'Expected in 10 days', change: '-3%' },
  ];
  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      setError(null);

      const retailerId = await AsyncStorage.getItem('user_uuid');

      if (!retailerId) {
        throw new Error('Retailer ID not found');
      }

      const url = `${BASE_URL}/retailer/${retailerId}/insights`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Server Error (${response.status})`);
      }

      const json = await response.json();

      if (!json?.success || !json?.data) {
        throw new Error('Invalid response from server');
      }

      const data = json.data;

      setStats([
        {
          id: '1',
          title: 'Monthly Purchase',
          value: `₹${Number(data?.monthlyPurchase?.amount ?? 0).toLocaleString(
            'en-IN',
          )}`,
          change: data?.monthlyPurchase?.changePercent ?? 0,
          icon: 'mic',
          type: 'percent',
        },
        {
          id: '2',
          title: 'Savings from Bulk',
          value: `₹${Number(data?.savingsFromBulk?.amount ?? 0).toLocaleString(
            'en-IN',
          )}`,
          change: data?.savingsFromBulk?.changePercent ?? 0,
          icon: 'trending-up',
          type: 'percent',
        },
        {
          id: '3',
          title: 'Total Orders',
          value: `${data?.totalOrders?.count ?? 0}`,
          change: data?.totalOrders?.change ?? 0,
          icon: 'cube',
          type: 'number',
        },
      ]);
    } catch (err) {
      console.log('Insights API Error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOrders = () => {
    navigation.navigate('Orders');
  };

  return (
    <AppSafeArea style={styles.container}>
      <FlatList
        data={[]}
        keyExtractor={() => 'key'}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Header />

            {loading && (
              <AppView style={styles.centerState}>
                <ActivityIndicator size="large" color="#22c55e" />
                <AppText style={styles.stateText}>Fetching insights...</AppText>
              </AppView>
            )}

            {error && !loading && (
              <AppView style={styles.centerState}>
                <Ionicons
                  name="cloud-offline-outline"
                  size={48}
                  color="#f59e0b"
                />

                <AppText style={styles.errorTitle}>
                  We’re experiencing high demand
                </AppText>

                <AppText style={styles.errorSub}>
                  Sorry for the inconvenience. Our servers are a little busy
                  right now. Please try again in a moment.
                </AppText>

                <TouchableOpacity
                  style={styles.retryBtn}
                  onPress={fetchInsights}
                  activeOpacity={0.8}
                >
                  <Ionicons name="refresh-outline" size={16} color="#000" />
                  <AppText style={styles.retryText}> Try Again</AppText>
                </TouchableOpacity>
              </AppView>
            )}

            {!loading && !error && (
              <AppView style={styles.grid}>
                {stats.map((item, index) => {
                  const isTotalOrders = item.title === 'Total Orders';

                  const CardWrapper = isTotalOrders
                    ? TouchableOpacity
                    : AppView;

                  return (
                    <CardWrapper
                      key={item.id}
                      style={[styles.statCard, index === 2 && styles.fullCard]}
                      onPress={isTotalOrders ? handleOrders : undefined}
                      activeOpacity={isTotalOrders ? 0.8 : undefined}
                    >
                      <AppView style={styles.iconCircle}>
                        <Ionicons name={item.icon} size={18} color="#22c55e" />
                      </AppView>

                      <AppText style={styles.statTitle}>{item.title}</AppText>

                      <AppText style={styles.statValue}>{item.value}</AppText>
                    </CardWrapper>
                  );
                })}
              </AppView>
            )}

            {/* <AppText style={styles.sectionTitle}>
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
            })} */}
          </>
        }
      />
    </AppSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  stateText: {
    marginTop: 10,
    color: '#9ca3af',
  },

  centerState: {
    marginTop: 80,
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 16,
    textAlign: 'center',
  },

  errorSub: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 20,
  },

  retryBtn: {
    marginTop: 20,
    backgroundColor: '#22c55e',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  retryText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 12,
    justifyContent: 'space-evenly',
  },

  statCard: {
    width: '45%',
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
  },
  // sectionTitle: {
  //   marginTop: 28,
  //   marginBottom: 12,
  //   fontSize: 16,
  //   fontWeight: '600',
  //   color: '#ffffff',
  // },

  // priceCard: {
  //   backgroundColor: '#141414',
  //   borderRadius: 14,
  //   padding: 14,
  //   marginBottom: 10,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },

  // priceTitle: {
  //   fontSize: 14,
  //   color: '#ffffff',
  //   fontWeight: '500',
  //   backgroundColor: '#141414',
  // },

  // priceSub: {
  //   fontSize: 12,
  //   color: '#9ca3af',
  //   marginTop: 4,
  // },

  // priceChange: {
  //   fontSize: 14,
  //   fontWeight: '600',
  // },
  // priceInfo: {
  //   backgroundColor: '#141414',
  // },
});
