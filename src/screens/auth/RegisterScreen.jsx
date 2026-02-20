import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StatusBar,
  Platform,
  ToastAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { BASE_URL } from '../../api/apiClient';

import Header from '../../components/common/Header';
import RetailerInput from '../../components/common/RetailerInput';
import TypeDropdown from '../../components/common/TypeDropdown';
import GetLocationButton from '../../components/common/GetLocationButton';
import UploadImageBtn from '../../components/common/UploadImageButton';

const API_URL =
  `${BASE_URL}/retailers`;

/* =====================
   HELPERS
===================== */

const showToast = message => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert('', message);
  }
};

const isValidIndianMobile = mobile => /^[6-9]\d{9}$/.test(mobile);

const validateForm = (formData, images) => {
  const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const {
    name,
    mobile,
    alternate_mobile,
    email,
    shop_name,
    type,
    address,
    city,
    state,
    lat,
    lng,
  } = formData;
  if (!name.trim()) return 'Please enter retailer name';
  if (!mobile.trim()) return 'Please enter mobile number';
  if (!isValidIndianMobile(mobile))
    return 'Please enter valid Indian mobile number';
  if (!shop_name.trim()) return 'Please enter shop name';
  if (!type) return 'Please select retailer type';
  if (!address.trim()) return 'Please enter address';
  if (!city.trim()) return 'Please enter city';
  if (!state.trim()) return 'Please enter state';
  if (!lat || !lng) return 'Please auto fetch location';
  // if (!images.length) return 'Please upload at least one image';
  if (
    formData.alternate_mobile &&
    !isValidIndianMobile(formData.alternate_mobile)
  )
    return 'Please enter valid alternate mobile number';

  if (formData.email && !isValidEmail(formData.email))
    return 'Please enter valid email address';

  return null;
};

/* =====================
   SCREEN
===================== */

const AddRetailerScreen = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    alternate_mobile: '',
    email: '',
    shop_name: '',
    type: '',
    address: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    near_by_location: '',
    lat: '',
    lng: '',
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const retailerTypes = [
    { label: 'Kirana', value: 'kirana' },
    { label: 'Grocery', value: 'grocery' },
    { label: 'Supermarket', value: 'supermarket' },
    { label: 'General Store', value: 'general_store' },
  ];

  const handleSubmit = async () => {
    const error = validateForm(formData, images);
    if (error) {
      showToast(error);
      return;
    }

    const TAG = '[API:Register]';
    try {
      setLoading(true);

      const payload = {
        storeName: formData.shop_name,
        ownerName: formData.name,
        contact: {
          mobile: formData.mobile,
          alternateMobile: formData.alternate_mobile,
          email: formData.email,
        },
        address: {
          line1: formData.address,
          line2: formData.near_by_location,
          area: formData.area,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          latitude: Number(formData.lat),
          longitude: Number(formData.lng),
        },
        status: 'ACTIVE',
      };

      console.log(TAG, '▶ Submitting retailer:', JSON.stringify(payload, null, 2));
      const start = Date.now();

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log(TAG, `⏱ Response — ${Date.now() - start}ms | status: ${response.status}`);

      const text = await response.text();
      let json;

      try {
        json = JSON.parse(text);
      } catch {
        throw new Error('Invalid server response');
      }

      console.log(TAG, '📩 Response body:', JSON.stringify(json, null, 2));

      if (response.ok) {
        console.log(TAG, '✅ Retailer created successfully');
        showToast('Account created successfully ✅');

        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: 'App' }],
        // });
      } else {
        console.warn(TAG, `❌ Failed — status: ${response.status}`);
        showToast(json?.message || 'Failed to create account');
      }
    } catch (err) {
      console.error(TAG, '❌ Error:', err.message);

      if (err.message === 'Network request failed') {
        showToast('Network error. Please check internet');
      } else {
        showToast(err.message || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  /* =====================
     UI
  ====================== */

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0B0B" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          onScrollBeginDrag={() => setShowTypeDropdown(false)}
        >
          {/* <Header /> */}

          <Text style={styles.title}>Add Retailer</Text>

          <RetailerInput
            label="Retailer Name"
            value={formData.name}
            onChangeText={v => setFormData({ ...formData, name: v })}
          />

          <RetailerInput
            label="Mobile"
            keyboardType="phone-pad"
            maxLength={10}
            value={formData.mobile}
            onChangeText={v =>
              setFormData({ ...formData, mobile: v.replace(/[^0-9]/g, '') })
            }
          />

          <RetailerInput
            label="Alternate Mobile"
            keyboardType="phone-pad"
            maxLength={10}
            value={formData.alternate_mobile}
            onChangeText={v =>
              setFormData({
                ...formData,
                alternate_mobile: v.replace(/[^0-9]/g, ''),
              })
            }
          />

          <RetailerInput
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={v => setFormData({ ...formData, email: v })}
          />

          <RetailerInput
            label="Shop Name"
            value={formData.shop_name}
            onChangeText={v => setFormData({ ...formData, shop_name: v })}
          />

          <RetailerInput
            label="Address"
            value={formData.address}
            onChangeText={v => setFormData({ ...formData, address: v })}
          />

          <RetailerInput
            label="Nearby Location / Landmark"
            value={formData.near_by_location}
            onChangeText={v =>
              setFormData({ ...formData, near_by_location: v })
            }
          />

          <RetailerInput
            label="Pincode"
            keyboardType="number-pad"
            maxLength={6}
            value={formData.pincode}
            onChangeText={v =>
              setFormData({ ...formData, pincode: v.replace(/[^0-9]/g, '') })
            }
          />
          <RetailerInput
            label="Area"
            value={formData.area}
            onChangeText={v => setFormData({ ...formData, area: v })}
          />
          <RetailerInput
            label="City"
            value={formData.city}
            onChangeText={v => setFormData({ ...formData, city: v })}
          />

          <RetailerInput
            label="State"
            value={formData.state}
            onChangeText={v => setFormData({ ...formData, state: v })}
          />

          {/* <RetailerInput
          label="Latitude"
          editable={false}
          value={formData.lat}
          rightComponent={
            <GetLocationButton
              onLocationFetched={loc =>
                setFormData({
                  ...formData,
                  lat: loc.lat || '',
                  lng: loc.lng || '',
                  address: loc.area || '',
                  city: loc.city || '',
                  state: loc.state || '',
                })
              }
            />
          }
        /> */}

          <GetLocationButton
            onLocationFetched={loc =>
              setFormData({
                ...formData,
                lat: loc.lat || '',
                lng: loc.lng || '',
                // address: loc.area || '',
                area: loc.area || '',
                pincode: loc.pincode || '',
                city: loc.city || '',
                state: loc.state || '',
              })
            }
          />

          {/* <RetailerInput
          label="Longitude"
          editable={false}
          value={formData.lng}
        /> */}

          <TypeDropdown
            value={formData.type}
            options={retailerTypes}
            visible={showTypeDropdown}
            onToggle={() => setShowTypeDropdown(!showTypeDropdown)}
            onSelect={v => {
              setFormData({ ...formData, type: v });
              setShowTypeDropdown(false);
            }}
          />

          <UploadImageBtn images={images} onChange={setImages} />

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#8303F0', '#0780FD']}
              style={styles.submitButton}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.submitText}>Submit</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddRetailerScreen;

/* =====================
   STYLES
===================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },
  scroll: {
    padding: 24,
  },
  title: {
    color: '#FFF',
    fontSize: 26,
    textAlign: 'center',
    marginVertical: 30,
  },
  submitButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
