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
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Geolocation from '@react-native-community/geolocation';

const GetLocationButton = ({ onLocationFetched }) => {
  const [loading, setLoading] = useState(false);

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

      return {
        lat: lat.toString(),
        lng: lng.toString(),
        area: addr.suburb || addr.neighbourhood || addr.village || '',
        city: addr.city || addr.town || addr.county || '',
        state: addr.state || '',
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
          if (location) onLocationFetched(location);
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
     UI
  ====================== */
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={fetchLocation}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#1E7CFF" />
      ) : (
        <FontAwesome6 name="location-crosshairs" size={18} color="#1E7CFF" />
      )}
    </TouchableOpacity>
  );
};

export default GetLocationButton;

const styles = StyleSheet.create({
  btn: {
    marginLeft: 10,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
