import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  Text,
} from 'react-native';
import AppSafeArea from '../../components/common/AppSafeArea';
import AppText from '../../components/common/AppText';
import AppButton from '../../components/common/AppButton';
import BannerCrousel from '../../components/Home/BannerCrousel';
import Header from '../../components/common/Header';
import ActionCard from '../../components/Home/ActionCard';
import AlertStrip from '../../components/Home/AlertStrip';
import DealsList from '../../components/Home/DealsList';
import InsightCard from '../../components/Home/InsightCard';
import CategoriesSection from '../../components/Home/CategoriesSection';
import { useNavigation } from '@react-navigation/native';
import CartBottomTab from '../../components/common/cartBottomTab';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Geolocation from '@react-native-community/geolocation';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const shouldFetchLocation = true; // change to true when needed

  useEffect(() => {
    if (shouldFetchLocation) {
      fetchLocation();
    }
  }, []);

  const fetchLocation = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    setLoading(true);

    const tryGetLocation = (highAccuracy = true) => {
      Geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;
          setLoading(false);

          if (Platform.OS === 'android') {
            ToastAndroid.show(
              'Location fetched successfully',
              ToastAndroid.SHORT,
            );
          }

          const location = await reverseGeocode(latitude, longitude);
          // if (location) onLocationFetched(location);
          if (location) console.log(location);
          else
            Alert.alert(
              'Error',
              'Could not fetch address from coordinates. Please try again.',
            );
        },
        error => {
          setLoading(false);

          // Timeout or GPS off → retry with network-based location
          if (error.code === 3 && highAccuracy) {
            // Retry with enableHighAccuracy: false
            tryGetLocation(false);
            return;
          }

          if (error.code === 2) showEnableLocationAlert();
          else
            Alert.alert(
              'Error',
              `Unable to fetch location.\nCode: ${error.code}\nMessage: ${error.message}`,
            );
        },
        {
          enableHighAccuracy: highAccuracy,
          timeout: highAccuracy ? 30000 : 15000, // 30s GPS, 15s network
          maximumAge: 10000, // allow 10s old location
        },
      );
    };

    tryGetLocation(true); // start with high accuracy
  };

  /* =====================
       PERMISSION
    ====================== */
  const requestPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'Allow location access to fetch address',
        buttonPositive: 'Allow',
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  /* =====================
       GPS OFF ALERT
    ====================== */
  const showEnableLocationAlert = () => {
    Alert.alert(
      'Location is Off',
      'Please enable location:\n\nSettings → Location → Turn ON\n\nEnable High Accuracy mode if available.',
      [
        { text: 'OK', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ],
    );
  };

  /* =====================
       REVERSE GEOCODING
    ====================== */
  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        {
          headers: {
            'User-Agent': 'RetailerApp/1.0 (support@company.com)',
            Accept: 'application/json',
          },
        },
      );

      const data = await res.json();
      const addr = data.address || {};
      console.log(data);

      return {
        lat: lat.toString(),
        lng: lng.toString(),
        area:
          addr.neighbourhood ||
          addr.suburb ||
          addr.residential ||
          addr.village ||
          addr.hamlet ||
          addr.quarter ||
          addr.city_district ||
          addr.town ||
          addr.road || // fallback
          addr.city ||
          '',
        city: addr.city || addr.town || addr.county || '',
        state: addr.state || addr.city || '',
        pincode: addr.postcode || '',
      };
    } catch {
      return null;
    }
  };

  const handleSpeakOrder = () => {
    navigation.navigate('Mic');
  };
  const handleQuickBuy = () => {
    navigation.navigate('Mic');
  };

  return (
    <AppSafeArea>
      <View style={{ flex: 1 }}>
        <FlatList
          data={[]} // dummy data
          keyExtractor={() => 'key'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 70 }}
          ListHeaderComponent={
            <>
              <Header />
              <BannerCrousel />

              <View
                style={{
                  flexDirection: 'row',
                  gap: 12,
                  paddingHorizontal: 16,
                  marginBottom: 16,
                }}
              >
                <ActionCard
                  icon="mic"
                  title="Speak & Order"
                  subtitle="Order in seconds using voice"
                  onPress={handleSpeakOrder}
                />

                <ActionCard
                  icon="cart"
                  title="Quick Buy"
                  subtitle="Buy frequently ordered items"
                  iconBgColor="#143620"
                  onPress={handleSpeakOrder}
                />
              </View>

              <AlertStrip />
              <DealsList />
              <CategoriesSection />
              <InsightCard />
            </>
          }
        />
        <CartBottomTab />
      </View>
    </AppSafeArea>
  );
};

export default HomeScreen;
