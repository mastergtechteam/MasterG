// import React, { useRef, useState, useEffect } from 'react';
// import {
//   TextInput,
//   Alert,
//   View,
//   StyleSheet,
//   Image,
//   Animated,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableOpacity,
//   Text,
//   Pressable,
//   ActivityIndicator,
//   ScrollView,
//   Dimensions,
// } from 'react-native';

// import AppSafeArea from '../../components/common/AppSafeArea';
// import AppText from '../../components/common/AppText';
// import AppButton from '../../components/common/AppButton';
// import AppView from '../../components/common/AppView';

// import LinearGradient from 'react-native-linear-gradient';
// import { colors } from '../../theme/colors';
// import { spacing } from '../../theme/spacing';
// import { getAuth, signInWithPhoneNumber } from '@react-native-firebase/auth';

// import { setConfirmation } from '../../utils/authStore';
// import GetLocationButton from '../../components/common/GetLocationButton';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const { height } = Dimensions.get('window');

// export default function GetUserLocationScreen({ navigation }) {
//   const [pincode, setPincode] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [fetchedLocation, setFetchedLocation] = useState(null);
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   const logo = require('../../assets/images/light-logo.png');

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1200,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const isValidPincode = code => /^\d{6}$/.test(code);

//   const handleLocationFetched = async location => {
//     setFetchedLocation(location);

//     const addressData = {
//       line1: '',
//       line2: '',
//       area: location.area,
//       city: location.city,
//       state: location.state,
//       pincode: location.pincode,
//       latitude: parseFloat(location.lat),
//       longitude: parseFloat(location.lng),
//     };

//     try {
//       await AsyncStorage.setItem('address', JSON.stringify(addressData));

//       console.log('✅ Address saved to storage:', addressData);

//       // Get location again from storage
//       const storedAddress = await AsyncStorage.getItem('address');

//       if (storedAddress) {
//         console.log(
//           '📦 Address fetched from storage:',
//           JSON.parse(storedAddress),
//         );
//       }
//     } catch (error) {
//       console.log('❌ Error saving location:', error);
//     }

//     Alert.alert(
//       'Location Fetched',
//       `Area: ${location.area}\nCity: ${location.city}\nState: ${location.state}\nPincode: ${location.pincode}`,
//     );
//   };

//   const handleContinueWithPincode = () => {
//     if (!isValidPincode(pincode)) {
//       Alert.alert('Invalid Pincode', 'Please enter a valid 6-digit pincode');
//       return;
//     }
//     // Navigate to next screen with pincode data
//     navigation.reset({
//       index: 0,
//       routes: [{ name: 'App' }],
//     });
//   };

//   const handleContinueWithLocation = () => {
//     if (!fetchedLocation) {
//       Alert.alert('No Location', 'Please fetch location first');
//       return;
//     }
//     // Navigate to next screen with location data
//     navigation.reset({
//       index: 0,
//       routes: [{ name: 'App' }],
//     });
//   };

//   return (
//     <AppSafeArea style={styles.container}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
//       >
//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           {/* Header Section */}
//           <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
//             <Image source={logo} style={styles.logo} resizeMode="contain" />
//             <LinearGradient
//               colors={['#000000', '#FFFFFF', '#FFFFFF', '#000000']}
//               locations={[0, 0.25, 0.5, 1]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 0 }}
//               style={styles.divider}
//             />
//             <AppText style={styles.subtitle}>
//               B2B Voice Ordering Platform
//             </AppText>
//           </Animated.View>

//           {/* Location Section */}
//           <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
//             {/* Manual Entry */}
//             <View style={styles.sectionHeader}>
//               <FontAwesome6 name="map-pin" size={20} color="#1E7CFF" />
//               <Text style={styles.sectionTitle}>Please Enter Your Pincode</Text>
//             </View>

//             <Text style={styles.sectionDescription}>
//               This will help us to show available products in your area
//             </Text>

//             <TextInput
//               style={styles.input}
//               placeholder="Type Pincode"
//               placeholderTextColor="#999"
//               keyboardType="numeric"
//               maxLength={6}
//               value={pincode}
//               onChangeText={setPincode}
//             />

//             <Text style={styles.hint}>Example: 110001 (Delhi pincode)</Text>

//             {/* Auto Detect Location */}
//             <View style={styles.autoDetectContainer}>
//               <Text style={styles.autoDetectLabel}>
//                 Or auto-detect your location
//               </Text>
//               <GetLocationButton onLocationFetched={handleLocationFetched} />
//             </View>

//             {/* Location Card - shown after fetching */}
//             {fetchedLocation && (
//               <View style={styles.locationCard}>
//                 <View style={styles.locationCardHeader}>
//                   <FontAwesome6 name="check-circle" size={24} color="#4CAF50" />
//                   <Text style={styles.locationCardTitle}>Location Fetched</Text>
//                 </View>

//                 <View style={styles.locationDetails}>
//                   <View style={styles.locationDetail}>
//                     <Text style={styles.locationLabel}>Area:</Text>
//                     <Text style={styles.locationValue}>
//                       {fetchedLocation.area || 'N/A'}
//                     </Text>
//                   </View>

//                   <View style={styles.locationDetail}>
//                     <Text style={styles.locationLabel}>City:</Text>
//                     <Text style={styles.locationValue}>
//                       {fetchedLocation.city}
//                     </Text>
//                   </View>

//                   <View style={styles.locationDetail}>
//                     <Text style={styles.locationLabel}>State:</Text>
//                     <Text style={styles.locationValue}>
//                       {fetchedLocation.state}
//                     </Text>
//                   </View>

//                   <View style={styles.locationDetail}>
//                     <Text style={styles.locationLabel}>Pincode:</Text>
//                     <Text style={styles.locationPincode}>
//                       {fetchedLocation.pincode}
//                     </Text>
//                   </View>

//                   <View style={styles.locationDetail}>
//                     <Text style={styles.locationLabel}>Coordinates:</Text>
//                     <Text style={styles.locationCoords}>
//                       {fetchedLocation.lat.slice(0, 8)},{' '}
//                       {fetchedLocation.lng.slice(0, 8)}
//                     </Text>
//                   </View>
//                 </View>

//                 <TouchableOpacity
//                   style={styles.changeLocationButton}
//                   onPress={() => setFetchedLocation(null)}
//                 >
//                   <FontAwesome5 name="redo" size={16} color="#1E7CFF" />
//                   <Text style={styles.changeLocationText}>
//                     Re-fetch Location
//                   </Text>
//                 </TouchableOpacity>

//                 <AppButton
//                   title="Continue with Location"
//                   onPress={handleContinueWithLocation}
//                   style={styles.continueButton}
//                 />
//               </View>
//             )}

//             {/* Continue Button for Pincode */}
//             {!fetchedLocation && (
//               <AppButton
//                 title="Continue with Pincode"
//                 onPress={handleContinueWithPincode}
//                 disabled={loading || !isValidPincode(pincode)}
//                 style={styles.continueButton}
//               />
//             )}
//           </Animated.View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </AppSafeArea>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background || '#000',
//   },

//   scrollContent: {
//     flexGrow: 1,
//     paddingHorizontal: spacing.md,
//     paddingVertical: spacing.lg,
//   },

//   header: {
//     alignItems: 'center',
//     marginBottom: spacing.xl,
//   },

//   logo: {
//     width: 280,
//     height: 80,
//     marginBottom: spacing.md,
//   },

//   divider: {
//     width: 160,
//     height: 1.5,
//     marginBottom: spacing.md,
//     opacity: 0.9,
//     transform: [{ scaleX: 0.85 }],
//   },

//   subtitle: {
//     fontSize: 14,
//     letterSpacing: 1,
//     color: '#999',
//   },

//   section: {
//     backgroundColor: '#111',
//     borderRadius: 12,
//     padding: spacing.lg,
//     marginBottom: spacing.lg,
//     borderWidth: 1,
//     borderColor: '#222',
//   },

//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: spacing.md,
//     marginBottom: spacing.md,
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: colors.white,
//   },

//   sectionDescription: {
//     fontSize: 13,
//     color: '#999',
//     marginBottom: spacing.lg,
//     lineHeight: 18,
//   },

//   input: {
//     backgroundColor: '#0a0a0a',
//     borderWidth: 1.5,
//     borderColor: '#333',
//     borderRadius: 10,
//     paddingHorizontal: spacing.md,
//     paddingVertical: spacing.md,
//     fontSize: 16,
//     color: colors.white,
//     marginBottom: spacing.md,
//     height: 58,
//   },

//   hint: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: spacing.lg,
//     fontStyle: 'italic',
//   },

//   continueButton: {
//     marginTop: spacing.md,
//   },

//   autoDetectContainer: {
//     alignItems: 'center',
//     marginVertical: spacing.lg,
//     paddingVertical: spacing.md,
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: '#222',
//   },

//   autoDetectLabel: {
//     fontSize: 13,
//     color: '#999',
//     marginBottom: spacing.md,
//   },

//   locationCard: {
//     backgroundColor: '#0a0a0a',
//     borderRadius: 12,
//     padding: spacing.lg,
//     borderWidth: 1,
//     borderColor: '#1a7d2244',
//     marginBottom: spacing.lg,
//   },

//   locationCardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: spacing.md,
//     marginBottom: spacing.lg,
//     paddingBottom: spacing.md,
//     borderBottomWidth: 1,
//     borderBottomColor: '#222',
//   },

//   locationCardTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#4CAF50',
//   },

//   locationDetails: {
//     gap: spacing.md,
//     marginBottom: spacing.lg,
//   },

//   locationDetail: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: spacing.sm,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#222',
//   },

//   locationLabel: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#999',
//   },

//   locationValue: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: colors.white,
//     flex: 1,
//     textAlign: 'right',
//     marginLeft: spacing.md,
//   },

//   locationPincode: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#1E7CFF',
//     flex: 1,
//     textAlign: 'right',
//     marginLeft: spacing.md,
//   },

//   locationCoords: {
//     fontSize: 12,
//     color: '#666',
//     flex: 1,
//     textAlign: 'right',
//     marginLeft: spacing.md,
//   },

//   changeLocationButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: spacing.sm,
//     paddingVertical: spacing.md,
//     marginBottom: spacing.md,
//     borderRadius: 10,
//     borderWidth: 1.5,
//     borderColor: '#1E7CFF',
//     backgroundColor: '#0a1f3344',
//   },

//   changeLocationText: {
//     color: '#1E7CFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
// });
import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  TextInput,
  Alert,
  View,
  StyleSheet,
  Image,
  Animated,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';

import AppSafeArea from '../../components/common/AppSafeArea';
import AppText from '../../components/common/AppText';
import AppButton from '../../components/common/AppButton';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import GetLocationButton from '../../components/common/GetLocationButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

export default function GetUserLocationScreen({ navigation }) {
  const [pincode, setPincode] = useState('');
  const [fetchedLocation, setFetchedLocation] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const logo = require('../../assets/images/light-logo.png');

  /* ---------------- FADE ONLY HEADER (NOT WHOLE SECTION) ---------------- */

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const isValidPincode = useCallback(code => /^\d{6}$/.test(code), []);

  /* ---------------- STABLE LOCATION HANDLER ---------------- */

  const handleLocationFetched = useCallback(async location => {
    try {
      setFetchedLocation(location);

      const addressData = {
        line1: '',
        line2: '',
        area: location.area,
        city: location.city,
        state: location.state,
        pincode: location.pincode,
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lng),
      };

      await AsyncStorage.setItem('address', JSON.stringify(addressData));

      Alert.alert(
        'Location Fetched',
        `Area: ${location.area}\nCity: ${location.city}\nState: ${location.state}\nPincode: ${location.pincode}`,
      );
    } catch (error) {
      console.log('Location Save Error:', error);
    }
  }, []);

  /* ---------------- CONTINUE HANDLERS ---------------- */

  const handleContinueWithPincode = useCallback(() => {
    if (!isValidPincode(pincode)) {
      Alert.alert('Invalid Pincode', 'Please enter a valid 6-digit pincode');
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'App' }],
    });
  }, [pincode, navigation, isValidPincode]);

  const handleContinueWithLocation = useCallback(() => {
    if (!fetchedLocation) {
      Alert.alert('No Location', 'Please fetch location first');
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'App' }],
    });
  }, [fetchedLocation, navigation]);

  return (
    <AppSafeArea style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ---------------- HEADER ---------------- */}

          <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <LinearGradient
              colors={['#000000', '#FFFFFF', '#FFFFFF', '#000000']}
              locations={[0, 0.25, 0.5, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.divider}
            />
            <AppText style={styles.subtitle}>
              B2B Voice Ordering Platform
            </AppText>
          </Animated.View>

          {/* ---------------- LOCATION SECTION ---------------- */}

          <View style={styles.section}>
            {/* Manual Pincode Entry */}

            <View style={styles.sectionHeader}>
              <FontAwesome6 name="map-pin" size={20} color="#1E7CFF" />
              <Text style={styles.sectionTitle}>Please Enter Your Pincode</Text>
            </View>

            <Text style={styles.sectionDescription}>
              This will help us show available products in your area
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Type Pincode"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={6}
              value={pincode}
              onChangeText={setPincode}
            />

            <Text style={styles.hint}>Example: 110001</Text>

            {/* ---------------- AUTO DETECT ---------------- */}

            <View style={styles.autoDetectContainer}>
              <Text style={styles.autoDetectLabel}>
                Or auto-detect your location
              </Text>

              <GetLocationButton onLocationFetched={handleLocationFetched} />
            </View>

            {/* ---------------- STABLE LAYOUT CONTAINER ---------------- */}

            <View style={{ minHeight: 260 }}>
              {fetchedLocation ? (
                <View style={styles.locationCard}>
                  <View style={styles.locationCardHeader}>
                    <FontAwesome6
                      name="check-circle"
                      size={22}
                      color="#4CAF50"
                    />
                    <Text style={styles.locationCardTitle}>
                      Location Fetched
                    </Text>
                  </View>

                  <View style={styles.locationDetails}>
                    <LocationRow label="Area" value={fetchedLocation.area} />
                    <LocationRow label="City" value={fetchedLocation.city} />
                    <LocationRow label="State" value={fetchedLocation.state} />
                    <LocationRow
                      label="Pincode"
                      value={fetchedLocation.pincode}
                      highlight
                    />
                    <LocationRow
                      label="Coordinates"
                      value={`${fetchedLocation.lat.slice(
                        0,
                        8,
                      )}, ${fetchedLocation.lng.slice(0, 8)}`}
                      small
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.changeLocationButton}
                    onPress={() => setFetchedLocation(null)}
                  >
                    <FontAwesome5 name="redo" size={14} color="#1E7CFF" />
                    <Text style={styles.changeLocationText}>
                      Re-fetch Location
                    </Text>
                  </TouchableOpacity>

                  <AppButton
                    title="Continue with Location"
                    onPress={handleContinueWithLocation}
                    style={styles.continueButton}
                  />
                </View>
              ) : (
                <AppButton
                  title="Continue with Pincode"
                  onPress={handleContinueWithPincode}
                  disabled={!isValidPincode(pincode)}
                  style={styles.continueButton}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppSafeArea>
  );
}

/* ---------------- REUSABLE ROW COMPONENT ---------------- */

const LocationRow = ({ label, value, highlight, small }) => (
  <View style={styles.locationDetail}>
    <Text style={styles.locationLabel}>{label}:</Text>
    <Text
      style={[
        highlight
          ? styles.locationPincode
          : small
          ? styles.locationCoords
          : styles.locationValue,
      ]}
    >
      {value || 'N/A'}
    </Text>
  </View>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background || '#000' },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },

  header: { alignItems: 'center', marginBottom: spacing.xl },

  logo: { width: 280, height: 80, marginBottom: spacing.md },

  divider: {
    width: 160,
    height: 1.5,
    marginBottom: spacing.md,
    opacity: 0.9,
    transform: [{ scaleX: 0.85 }],
  },

  subtitle: { fontSize: 14, letterSpacing: 1, color: '#999' },

  section: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#222',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },

  sectionDescription: {
    fontSize: 13,
    color: '#999',
    marginBottom: spacing.lg,
  },

  input: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1.5,
    borderColor: '#333',
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.white,
    marginBottom: spacing.md,
    height: 58,
  },

  hint: { fontSize: 12, color: '#666', marginBottom: spacing.lg },

  autoDetectContainer: {
    alignItems: 'center',
    marginVertical: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#222',
  },

  autoDetectLabel: { fontSize: 13, color: '#999', marginBottom: spacing.md },

  continueButton: { marginTop: spacing.md },

  locationCard: {
    backgroundColor: '#0a0a0a',
    borderRadius: 12,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#1a7d2244',
  },

  locationCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },

  locationCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4CAF50',
  },

  locationDetails: { gap: spacing.md, marginBottom: spacing.lg },

  locationDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  locationLabel: { fontSize: 13, fontWeight: '600', color: '#999' },

  locationValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },

  locationPincode: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E7CFF',
  },

  locationCoords: { fontSize: 12, color: '#666' },

  changeLocationButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#1E7CFF',
  },

  changeLocationText: {
    color: '#1E7CFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
