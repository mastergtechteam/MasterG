// import React, { useState } from 'react';
// import {
//   TouchableOpacity,
//   PermissionsAndroid,
//   Platform,
//   Alert,
//   Linking,
//   StyleSheet,
//   ActivityIndicator,
//   ToastAndroid,
//   View,
//   Text,
// } from 'react-native';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import Geolocation from '@react-native-community/geolocation';

// const GetLocationButton = ({ onLocationFetched }) => {
//   const [loading, setLoading] = useState(false);

//   /* =====================
//      PERMISSION
//   ====================== */
//   const requestPermission = async () => {
//     if (Platform.OS !== 'android') return true;

//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'Location Permission',
//         message: 'Allow location access to fetch address',
//         buttonPositive: 'Allow',
//       },
//     );

//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   };

//   /* =====================
//      GPS OFF ALERT
//   ====================== */
//   const showEnableLocationAlert = () => {
//     Alert.alert(
//       'Location is Off',
//       'Please enable location:\n\nSettings → Location → Turn ON\n\nEnable High Accuracy mode if available.',
//       [
//         { text: 'OK', style: 'cancel' },
//         { text: 'Open Settings', onPress: () => Linking.openSettings() },
//       ],
//     );
//   };

//   /* =====================
//      REVERSE GEOCODING
//   ====================== */
//   const reverseGeocode = async (lat, lng) => {
//     try {
//       const res = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
//         {
//           headers: {
//             'User-Agent': 'RetailerApp/1.0 (support@company.com)',
//             Accept: 'application/json',
//           },
//         },
//       );

//       const data = await res.json();
//       const addr = data.address || {};
//       console.log(data);

//       return {
//         lat: lat.toString(),
//         lng: lng.toString(),
//         area:
//           addr.neighbourhood ||
//           addr.suburb ||
//           addr.residential ||
//           addr.village ||
//           addr.hamlet ||
//           addr.quarter ||
//           addr.city_district ||
//           addr.town ||
//           addr.road || // fallback
//           addr.city ||
//           '',
//         city: addr.city || addr.town || addr.county || '',
//         state: addr.state || addr.city || '',
//         pincode: addr.postcode || '',
//       };
//     } catch {
//       return null;
//     }
//   };

//   /* =====================
//      FETCH LOCATION
//   ====================== */
//   const fetchLocation = async () => {
//     const hasPermission = await requestPermission();
//     if (!hasPermission) return;

//     setLoading(true);

//     const tryGetLocation = (highAccuracy = true) => {
//       Geolocation.getCurrentPosition(
//         async position => {
//           const { latitude, longitude } = position.coords;
//           setLoading(false);

//           if (Platform.OS === 'android') {
//             ToastAndroid.show(
//               'Location fetched successfully',
//               ToastAndroid.SHORT,
//             );
//           }

//           const location = await reverseGeocode(latitude, longitude);
//           if (location) onLocationFetched(location);
//           if (location) console.log(location);
//           else
//             Alert.alert(
//               'Error',
//               'Could not fetch address from coordinates. Please try again.',
//             );
//         },
//         error => {
//           setLoading(false);

//           // Timeout or GPS off → retry with network-based location
//           if (error.code === 3 && highAccuracy) {
//             // Retry with enableHighAccuracy: false
//             tryGetLocation(false);
//             return;
//           }

//           if (error.code === 2) showEnableLocationAlert();
//           else
//             Alert.alert(
//               'Error',
//               `Unable to fetch location.\nCode: ${error.code}\nMessage: ${error.message}`,
//             );
//         },
//         {
//           enableHighAccuracy: highAccuracy,
//           timeout: highAccuracy ? 30000 : 15000, // 30s GPS, 15s network
//           maximumAge: 10000, // allow 10s old location
//         },
//       );
//     };

//     tryGetLocation(true); // start with high accuracy
//   };

//   /* =====================
//      UI
//   ====================== */
//   return (
//     <TouchableOpacity
//       style={styles.btn}
//       onPress={fetchLocation}
//       disabled={loading}
//       activeOpacity={0.7}
//     >
//       {loading ? (
//         <ActivityIndicator size="small" color="#1E7CFF" />
//       ) : (
//         <View style={styles.content}>
//           <FontAwesome6 name="location-crosshairs" size={18} color="#1E7CFF" />
//           <Text style={styles.uploadText}>Auto Fetch Location</Text>
//         </View>
//       )}
//     </TouchableOpacity>
//   );
// };

// export default GetLocationButton;

// const styles = StyleSheet.create({
//   btn: {
//     marginVertical: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#1E7CFF',
//     alignSelf: 'center',
//   },

//   content: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   uploadText: {
//     color: '#1E7CFF',
//     marginLeft: 8,
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });

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

const GetLocationButton = ({ onLocationFetched, title }) => {
  const [loading, setLoading] = useState(false);
  const GOOGLE_API_KEY = 'AIzaSyA5pFD_JmbJnZPml2qyjy_YunVy6fD2nUc';
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
  //   const reverseGeocode = async (lat, lng) => {
  //     try {
  //       const res = await fetch(
  //         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`,
  //       );

  //       const data = await res.json();

  //       console.log('STATUS:', data.status);

  //       if (data.status === 'OK') {
  //         const result = data.results[0];

  //         let city = '';
  //         let state = '';
  //         let country = '';
  //         let postalCode = '';

  //         result.address_components.forEach(component => {
  //           if (component.types.includes('locality')) {
  //             city = component.long_name;
  //           }
  //           if (component.types.includes('administrative_area_level_1')) {
  //             state = component.long_name;
  //           }
  //           if (component.types.includes('country')) {
  //             country = component.long_name;
  //           }
  //           if (component.types.includes('postal_code')) {
  //             postalCode = component.long_name;
  //           }
  //         });

  //         const fullDetails = `
  // Full Address: ${result.formatted_address}

  // City: ${city}
  // State: ${state}
  // Country: ${country}
  // Postal Code: ${postalCode}

  // Latitude: ${lat}
  // Longitude: ${lng}
  //       `;

  //         Alert.alert('Location Details', fullDetails);

  //         return {
  //           lat: lat.toString(),
  //           lng: lng.toString(),
  //           area:
  //             result.address_components.find(c =>
  //               c.types.includes('sublocality_level_1'),
  //             )?.long_name ||
  //             result.address_components.find(c => c.types.includes('route'))
  //               ?.long_name ||
  //             '',
  //           city: city,
  //           state: state,
  //           pincode: postalCode,
  //         };
  //       } else {
  //         Alert.alert('Geocode Error', data.status);
  //         return null;
  //       }
  //     } catch (error) {
  //       console.log('ERROR:', error);
  //       Alert.alert('Error', 'Something went wrong while fetching location');
  //       return null;
  //     }
  //   };

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`,
      );

      const data = await res.json();

      if (data.status !== 'OK' || !data.results.length) {
        Alert.alert('Geocode Error', data.status);
        return null;
      }

      const result = data.results[0];

      const getComponent = type =>
        result.address_components.find(c => c.types.includes(type))
          ?.long_name || '';

      // ---- Extract Properly ----
      const streetNumber = getComponent('street_number');
      const route = getComponent('route');

      const addressLine =
        [streetNumber, route].filter(Boolean).join(', ') ||
        result.formatted_address;

      const area =
        getComponent('sublocality_level_1') ||
        getComponent('sublocality') ||
        getComponent('neighborhood') ||
        getComponent('route') ||
        '';

      const city =
        getComponent('locality') ||
        getComponent('postal_town') ||
        getComponent('administrative_area_level_2') ||
        '';

      const state = getComponent('administrative_area_level_1') || '';

      const pincode = getComponent('postal_code') || '';

      return {
        lat: lat.toString(),
        lng: lng.toString(),
        address: addressLine,
        area,
        city,
        state,
        pincode,
      };
    } catch (error) {
      console.log('ERROR:', error);
      Alert.alert('Error', 'Something went wrong while fetching location');
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

    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;

        const location = await reverseGeocode(latitude, longitude);
        setLoading(false);

        if (location) {
          if (Platform.OS === 'android') {
            ToastAndroid.show(
              'Location fetched successfully',
              ToastAndroid.SHORT,
            );
          }
          onLocationFetched(location);
          console.log(location);
        } else {
          Alert.alert(
            'Error',
            'Could not fetch address from coordinates. Please try again.',
          );
        }
      },
      error => {
        setLoading(false);

        if (error.code === 2) showEnableLocationAlert();
        else
          Alert.alert(
            'Error',
            `Unable to fetch location.\nCode: ${error.code}\nMessage: ${error.message}`,
          );
      },
      {
        enableHighAccuracy: true, // network location (cell towers + WiFi) — resolves in 15-70ms
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
      {loading ? (
        <ActivityIndicator size="small" color="#1E7CFF" />
      ) : (
        <View style={styles.content}>
          <FontAwesome6 name="location-crosshairs" size={18} color="#1E7CFF" />
          <Text style={styles.uploadText}>
            {title || 'Auto Fetch Location'}
          </Text>
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
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  uploadText: {
    color: '#1E7CFF',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});
