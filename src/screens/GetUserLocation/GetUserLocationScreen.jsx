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
import { BASE_URL } from '../../api/apiClient';

const { height } = Dimensions.get('window');

export default function GetUserLocationScreen({ navigation }) {
  const [pincode, setPincode] = useState('');
  const [fetchedLocation, setFetchedLocation] = useState(null);
  const [checkingService, setCheckingService] = useState(false);
  const [serviceData, setServiceData] = useState(null);

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
    setPincode('');

    try {
      setFetchedLocation(location);

      const addressData = {
        line1: location.address || '',
        area: location.area,
        city: location.city,
        state: location.state,
        pincode: location.pincode,
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lng),
      };

      await AsyncStorage.setItem('address', JSON.stringify(addressData));
      await checkServiceAvailability(location.pincode);
    } catch (error) {
      console.log('Location Save Error:', error);
    }
  }, []);

  /* ---------------- CONTINUE HANDLERS ---------------- */

  const handleContinueWithPincode = useCallback(async () => {
    setFetchedLocation(null);
    setServiceData(null);

    if (!isValidPincode(pincode))
      return Alert.alert(
        'Invalid Pincode',
        'Please enter a valid 6-digit pincode',
      );

    const result = await checkServiceAvailability(pincode);
    if (result.service_available) {
      navigation.reset({ index: 0, routes: [{ name: 'App' }] });
      // navigation.replace('GetConsent');
    } else {
      Alert.alert('Service Not Available', result.message);
    }
  }, [pincode, isValidPincode, navigation]);

  const handleContinueWithLocation = useCallback(async () => {
    if (!fetchedLocation) {
      Alert.alert('No Location', 'Please fetch location first');
      return;
    }

    const result = await checkServiceAvailability(fetchedLocation.pincode);

    if (result.service_available) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'App' }],
      });
      // navigation.replace('GetConsent');
    } else {
      Alert.alert('Service Not Available', result.message);
    }
  }, [fetchedLocation, navigation, checkServiceAvailability]);

  const checkServiceAvailability = useCallback(async pincode => {
    setCheckingService(true);
    try {
      const ApiUrl = `${BASE_URL}/service/check-pincode`;
      const response = await fetch(ApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pincode }),
      });
      const data = await response.json();
      const result = data.success
        ? data
        : {
            service_available: false,
            message: 'Unable to check service availability',
          };
      setServiceData(result);
      return result; // return the result for immediate use
    } catch (error) {
      console.log('Service Check Error:', error);
      const fallback = {
        service_available: false,
        message: 'Something went wrong. Please try again.',
      };
      setServiceData(fallback);
      return fallback;
    } finally {
      setCheckingService(false);
    }
  }, []);

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

          {/* -------- SERVICE AVAILABILITY STATUS -------- */}

          <View style={{ marginBottom: spacing.lg }}>
            {checkingService ? (
              <View style={styles.serviceCheckingCard}>
                <FontAwesome6 name="spinner" size={18} color="#1E7CFF" />
                <Text style={styles.serviceCheckingText}>
                  Checking service availability...
                </Text>
              </View>
            ) : serviceData ? (
              <View
                style={[
                  styles.serviceStatusCard,
                  serviceData.service_available
                    ? styles.serviceAvailable
                    : styles.serviceUnavailable,
                ]}
              >
                <FontAwesome6
                  name={
                    serviceData.service_available
                      ? 'check-circle'
                      : 'times-circle'
                  }
                  size={20}
                  color={serviceData.service_available ? '#4CAF50' : '#FF4D4F'}
                />

                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.serviceStatusTitle,
                      {
                        color: serviceData.service_available
                          ? '#4CAF50'
                          : '#FF4D4F',
                      },
                    ]}
                  >
                    {serviceData.service_available
                      ? 'We Deliver To Your Area'
                      : 'Service Not Available'}
                  </Text>

                  <Text style={styles.serviceStatusMessage}>
                    {serviceData.message}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>

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

            {/* -------- CHECK SERVICE BUTTON -------- */}
            {isValidPincode(pincode) && (
              <TouchableOpacity
                style={styles.checkServiceButton}
                onPress={() => {
                  setFetchedLocation(null);
                  checkServiceAvailability(pincode);
                }}
                disabled={checkingService}
              >
                <Text style={styles.checkServiceButtonText}>
                  {checkingService ? 'Checking...' : 'Check Availability'}
                </Text>
              </TouchableOpacity>
            )}

            {/* ---------------- AUTO DETECT ---------------- */}

            <View style={styles.autoDetectContainer}>
              <Text style={styles.autoDetectLabel}>
                Or auto-detect your location
              </Text>

              <GetLocationButton onLocationFetched={handleLocationFetched} />
            </View>

            {/* ---------------- STABLE LAYOUT CONTAINER ---------------- */}

            <View>
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
                    <LocationRow
                      label="Address"
                      value={fetchedLocation.address}
                    />
                    <LocationRow label="Area" value={fetchedLocation.area} />
                    <LocationRow label="City" value={fetchedLocation.city} />
                    <LocationRow label="State" value={fetchedLocation.state} />
                    <LocationRow
                      label="Pincode"
                      value={fetchedLocation.pincode}
                      highlight
                    />
                  </View>

                  <GetLocationButton
                    onLocationFetched={handleLocationFetched}
                    title="Re-fetch Location"
                  />

                  <AppButton
                    title="Continue with Location"
                    onPress={handleContinueWithLocation}
                    disabled={!serviceData?.service_available}
                    style={styles.continueButton}
                  />
                </View>
              ) : (
                <AppButton
                  title="Continue with Pincode"
                  onPress={handleContinueWithPincode}
                  disabled={!serviceData?.service_available}
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

const LocationRow = ({ label, value, highlight }) => (
  <View style={styles.locationDetail}>
    <Text style={styles.locationLabel}>{label}</Text>
    <Text
      style={[styles.locationValue, highlight && styles.locationPincode]}
      numberOfLines={2}
      ellipsizeMode="tail"
    >
      {value || 'N/A'}
    </Text>
  </View>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background || '#000' },

  scrollContent: {
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
    marginBottom: spacing.sm,
  },

  locationLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  locationValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },

  locationPincode: {
    fontSize: 15,
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
  serviceCheckingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1E7CFF33',
    backgroundColor: '#1E7CFF11',
  },

  serviceCheckingText: {
    color: '#1E7CFF',
    fontSize: 14,
    fontWeight: '600',
  },

  serviceStatusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1.5,
  },

  serviceAvailable: {
    borderColor: '#4CAF5033',
    backgroundColor: '#4CAF5015',
  },

  serviceUnavailable: {
    borderColor: '#FF4D4F33',
    backgroundColor: '#FF4D4F15',
  },

  serviceStatusTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },

  serviceStatusMessage: {
    fontSize: 13,
    color: '#aaa',
  },
  checkServiceButton: {
    marginTop: spacing.sm,
    backgroundColor: '#1E7CFF',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkServiceButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
