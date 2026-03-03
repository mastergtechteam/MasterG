import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
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
import GetLocationButton from '../../components/common/GetLocationButton';
import UploadImageBtn from '../../components/common/UploadImageButton';
import { useDispatch } from 'react-redux';
import { loadRetailerProfile } from '../../features/profile/retailerSlice';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';
import GoBackHeader from '../../components/common/GoBackHeader';
import { getAuthData } from '../../utils/secureStore';

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

// ✅ Accept +91 or 10 digit
const normalizeIndianMobile = mobile => {
  const cleaned = mobile.replace(/\s+/g, '');

  if (cleaned.startsWith('+91')) {
    return cleaned.replace('+91', '');
  }

  return cleaned;
};

const isValidIndianMobile = mobile => {
  const normalized = normalizeIndianMobile(mobile);
  return /^[6-9]\d{9}$/.test(normalized);
};

const validateForm = (formData, shopImage) => {
  const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const {
    name,
    mobile,
    alternate_mobile,
    email,
    shop_name,
    address,
    city,
    state,
    pincode,
    lat,
    lng,
  } = formData;

  if (!name.trim()) return 'Please enter retailer name';

  if (!mobile.trim()) return 'Please enter mobile number';
  if (!isValidIndianMobile(mobile))
    return 'Please enter valid Indian mobile number';

  if (!shop_name.trim()) return 'Please enter shop name';
  if (!address.trim()) return 'Please enter address';
  if (!city.trim()) return 'Please enter city';
  if (!state.trim()) return 'Please enter state';

  // ✅ NEW LOCATION LOGIC
  const hasCoordinates = lat && lng;
  const hasManualAddress =
    address.trim() && city.trim() && state.trim() && pincode.trim();

  if (!hasCoordinates && !hasManualAddress) {
    return 'Please auto fetch location or fill address manually';
  }

  if (!shopImage) return 'Please upload shop image';

  if (alternate_mobile && !isValidIndianMobile(alternate_mobile))
    return 'Please enter valid alternate mobile number';

  if (email && !isValidEmail(email)) return 'Please enter valid email address';

  return null;
};

/* =====================
   SCREEN
===================== */

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [shopImage, setShopImage] = useState(null);
  const [retailerImage, setRetailerImage] = useState(null);
  const [panImage, setPanImage] = useState(null);
  const [aadharImage, setAadharImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    alternate_mobile: '',
    email: '',
    shop_name: '',
    address: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    lat: '',
    lng: '',
  });

  useEffect(() => {
    fetchRetailerDetails();
  }, []);

  /* =====================
     IMAGE UPLOAD
  ====================== */

  const uploadImage = async image => {
    try {
      // 🔥 Resize first (VERY IMPORTANT)
      const resized = await ImageResizer.createResizedImage(
        image.uri,
        800, // max width
        800, // max height
        'JPEG',
        70, // quality %
      );

      const filePath =
        Platform.OS === 'ios'
          ? resized.uri.replace('file://', '')
          : resized.uri;

      const base64 = await RNFS.readFile(filePath, 'base64');

      const payload = {
        fileContent: base64,
        fileName: `photo_${Date.now()}.jpg`,
        fileType: 'image/jpeg',
        userId: 'admin',
      };

      const response = await fetch(`${BASE_URL}/utils/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || 'Upload failed');
      }

      return json.data.publicUrl; // ✅ correct
    } catch (err) {
      console.log('UPLOAD ERROR:', err);
      throw err;
    }
  };

  /* =====================
     SUBMIT
  ====================== */

  const handleSubmit = async () => {
    const error = validateForm(formData, shopImage);

    if (error) {
      showToast(error);
      return;
    }

    try {
      setLoading(true);

      const authData = await getAuthData();

      if (!authData?.retailerId || !authData?.token) {
        showToast('Please login again');
        return;
      }

      const { retailerId, token } = authData;

      setUploadingImage(true);

      let shopImageUrl = shopImage?.uri || null;
      let retailerImageUrl = retailerImage?.uri || null;
      let panUrl = panImage?.uri || null;
      let aadharUrl = aadharImage?.uri || null;

      try {
        const uploads = await Promise.all([
          shopImage?.uri && !shopImage.uri.startsWith('http')
            ? uploadImage(shopImage)
            : null,

          retailerImage?.uri && !retailerImage.uri.startsWith('http')
            ? uploadImage(retailerImage)
            : null,

          panImage?.uri && !panImage.uri.startsWith('http')
            ? uploadImage(panImage)
            : null,

          aadharImage?.uri && !aadharImage.uri.startsWith('http')
            ? uploadImage(aadharImage)
            : null,
        ]);

        if (uploads[0]) shopImageUrl = uploads[0];
        if (uploads[1]) retailerImageUrl = uploads[1];
        if (uploads[2]) panUrl = uploads[2];
        if (uploads[3]) aadharUrl = uploads[3];
      } finally {
        setUploadingImage(false);
      }

      const payload = {
        storeName: formData.shop_name,
        ownerName: formData.name,
        contact: {
          mobile: normalizeIndianMobile(formData.mobile),
          alternateMobile: formData.alternate_mobile
            ? normalizeIndianMobile(formData.alternate_mobile)
            : null,
          email: formData.email || null,
        },
        address: {
          line1: formData.address,
          area: formData.area,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          latitude: formData.lat ? Number(formData.lat) : null,
          longitude: formData.lng ? Number(formData.lng) : null,
        },
        shop_image: shopImageUrl,
        retailer_image: retailerImageUrl || null,
        pancard: panUrl || null,
        aadhar_card: aadharUrl || null,
        status: 'ACTIVE',
      };

      const response = await fetch(`${BASE_URL}/retailers/${retailerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // 🔥 IMPORTANT
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json();

      if (response.ok) {
        showToast('Profile updated successfully ✅');

        await dispatch(loadRetailerProfile()).unwrap();

        navigation.reset({
          index: 0,
          routes: [{ name: 'App' }],
        });
      } else {
        showToast(json?.message || 'Failed to update profile');
      }
    } catch (err) {
      showToast(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  /* =====================
     FETCH PROFILE
  ====================== */

  const fetchRetailerDetails = async () => {
    try {
      const authData = await getAuthData();
      if (!authData?.retailerId || !authData?.token) return;

      const { retailerId, token } = authData;

      if (!retailerId) return;

      const response = await fetch(`${BASE_URL}/retailers/${retailerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();

      if (json?.success && json?.data) {
        const data = json.data;

        setFormData({
          name: data.ownerName || '',
          mobile: data.contact?.mobile || '',
          alternate_mobile: data.contact?.alternateMobile || '',
          email: data.contact?.email || '',
          shop_name: data.storeName || '',
          address: data.address?.line1 || '',
          area: data.address?.area || '',
          city: data.address?.city || '',
          state: data.address?.state || '',
          pincode: data.address?.pincode || '',
          lat: data.address?.latitude?.toString() || '',
          lng: data.address?.longitude?.toString() || '',
        });

        if (data.shop_image) {
          setShopImage({ uri: data.shop_image });
        }

        if (data.retailer_image) {
          setRetailerImage({ uri: data.retailer_image });
        }

        if (data.pancard) {
          setPanImage({ uri: data.pancard });
        }

        if (data.aadhar_card) {
          setAadharImage({ uri: data.aadhar_card });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setInitialLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#FFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0B0B" />
      <GoBackHeader title="Edit Profile" showSearch={false} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>Complete Your Profile</Text>

          <RetailerInput
            label="Retailer Name"
            value={formData.name}
            onChangeText={v => setFormData({ ...formData, name: v })}
          />

          <RetailerInput
            label="Mobile"
            keyboardType="phone-pad"
            value={formData.mobile}
            onChangeText={v => setFormData({ ...formData, mobile: v })}
          />

          <RetailerInput
            label="Alternate Mobile (Optional)"
            keyboardType="phone-pad"
            value={formData.alternate_mobile}
            onChangeText={v =>
              setFormData({ ...formData, alternate_mobile: v })
            }
          />

          <RetailerInput
            label="Email (Optional)"
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
            label="Pincode"
            keyboardType="number-pad"
            value={formData.pincode}
            onChangeText={v => setFormData({ ...formData, pincode: v })}
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

          <GetLocationButton
            onLocationFetched={loc =>
              setFormData({
                ...formData,
                lat: loc.lat || '',
                lng: loc.lng || '',
                address: loc.address || '',
                area: loc.area || '',
                pincode: loc.pincode || '',
                city: loc.city || '',
                state: loc.state || '',
              })
            }
          />

          <UploadImageBtn
            label="Shop Image"
            image={shopImage}
            onChange={setShopImage}
            required
          />

          <UploadImageBtn
            label="Retailer Image"
            image={retailerImage}
            onChange={setRetailerImage}
          />

          <UploadImageBtn
            label="PAN Card"
            image={panImage}
            onChange={setPanImage}
          />

          <UploadImageBtn
            label="Aadhar Card"
            image={aadharImage}
            onChange={setAadharImage}
          />
          {uploadingImage && (
            <ActivityIndicator
              size="small"
              color="#FFF"
              style={{ marginTop: 10 }}
            />
          )}

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
                <Text style={styles.submitText}>Update Profile</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0B' },
  scroll: { padding: 24 },
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
