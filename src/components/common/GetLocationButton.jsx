import React, { useState } from 'react';
import {
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  View,
  Text,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Geolocation from '@react-native-community/geolocation';

const TAG = '[Location]';

const GetLocationButton = ({ onLocationFetched }) => {
  const [loading, setLoading] = useState(false);

  /* =====================
     PERMISSION
  ====================== */
  const requestPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const LOCATION = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
    const { GRANTED, NEVER_ASK_AGAIN } = PermissionsAndroid.RESULTS;

    const alreadyGranted = await PermissionsAndroid.check(LOCATION);
    console.log(TAG, `🔑 Permission status: ${alreadyGranted ? 'GRANTED' : 'NOT GRANTED'}`);
    if (alreadyGranted) return true;

    console.log(TAG, '🔑 Requesting permission...');
    const result = await PermissionsAndroid.request(LOCATION, {
      title: 'Location Permission',
      message: 'MasterG needs your location to auto-fill your address.',
      buttonPositive: 'Allow',
      buttonNegative: 'Deny',
    });
    console.log(TAG, `🔑 Result: ${result}`);

    if (result === GRANTED) return true;

    if (result === NEVER_ASK_AGAIN) {
      Alert.alert(
        'Location Permission Required',
        'Location is permanently blocked. Enable it in:\n\nSettings → Apps → MasterG → Permissions → Location',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ],
      );
      return false;
    }

    Alert.alert(
      'Permission Denied',
      'Location access is needed to auto-fill your address. Tap the button again and allow.',
      [{ text: 'OK', style: 'cancel' }],
    );
    return false;
  };

  /* =====================
     GPS OFF ALERT
  ====================== */
  const showEnableLocationAlert = () => {
    Alert.alert(
      'Location is Off',
      'Please enable location in Settings → Location → Turn ON',
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
          addr.road ||
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

  /* =====================
     FETCH LOCATION
  ====================== */
  const fetchLocation = async () => {
    const totalStart = Date.now();
    console.log(TAG, '▶ fetchLocation started');

    const permStart = Date.now();
    const hasPermission = await requestPermission();
    console.log(TAG, `✅ Permission done — ${Date.now() - permStart}ms | granted: ${hasPermission}`);
    if (!hasPermission) return;

    setLoading(true);

    const locStart = Date.now();
    console.log(TAG, '📡 Requesting location — network');

    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        console.log(TAG, `📍 Location received — ${Date.now() - locStart}ms`);

        const geocodeStart = Date.now();
        console.log(TAG, '🌐 Reverse geocoding...');
        const location = await reverseGeocode(latitude, longitude);
        console.log(TAG, `🏠 Geocode done — ${Date.now() - geocodeStart}ms`);
        console.log(TAG, `🏁 Total — ${Date.now() - totalStart}ms`);

        setLoading(false);

        if (location) {
          if (Platform.OS === 'android') {
            ToastAndroid.show('Location fetched successfully', ToastAndroid.SHORT);
          }
          onLocationFetched(location);
        } else {
          Alert.alert('Error', 'Could not fetch address. Please try again.');
        }
      },
      error => {
        console.warn(TAG, `❌ Error — code: ${error.code}, ${error.message}`);
        console.log(TAG, `🏁 Total at failure — ${Date.now() - totalStart}ms`);
        setLoading(false);
        if (error.code === 2) showEnableLocationAlert();
        else Alert.alert('Error', `Unable to fetch location. Please try again.`);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 60000,
      },
    );
  };

  /* =====================
     UI
  ====================== */
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={fetchLocation}
      disabled={loading}
      activeOpacity={0.7}
    >
      {/* Always in tree — no layout jump */}
      <View style={[styles.content, loading && styles.hidden]}>
        <FontAwesome6 name="location-crosshairs" size={18} color="#1E7CFF" />
        <Text style={styles.label}>Auto Fetch Location</Text>
      </View>
      {/* Spinner overlaid — same space, no reflow */}
      {loading && (
        <View style={styles.spinnerOverlay}>
          <ActivityIndicator size="small" color="#1E7CFF" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default GetLocationButton;

const styles = StyleSheet.create({
  btn: {
    marginVertical: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1E7CFF',
    alignSelf: 'center',
    minWidth: 180,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hidden: {
    opacity: 0,
  },
  spinnerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#1E7CFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
