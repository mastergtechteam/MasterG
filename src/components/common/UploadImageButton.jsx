// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   Alert,
//   StyleSheet,
//   ActivityIndicator,
//   Platform,
//   PermissionsAndroid,
//   TouchableOpacity,
// } from 'react-native';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// const UploadImageButton = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   // const { retailerId } = route.params;
//   const retailerId = 1;

//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // ---------------- CAMERA PERMISSION ----------------
//   // const requestCameraPermission = async () => {
//   //   if (Platform.OS !== 'android') return true;

//   //   const alreadyGranted = await PermissionsAndroid.check(
//   //     PermissionsAndroid.PERMISSIONS.CAMERA,
//   //   );

//   //   if (alreadyGranted) return true;

//   //   const status = await PermissionsAndroid.request(
//   //     PermissionsAndroid.PERMISSIONS.CAMERA,
//   //   );

//   //   return status === PermissionsAndroid.RESULTS.GRANTED;
//   // };
//   const requestCameraPermission = async () => {
//     // ANDROID (unchanged)
//     if (Platform.OS === 'android') {
//       const alreadyGranted = await PermissionsAndroid.check(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//       );

//       if (alreadyGranted) return true;

//       const status = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//       );

//       return status === PermissionsAndroid.RESULTS.GRANTED;
//     }

//     // ✅ IOS (FIX)
//     const result = await request(PERMISSIONS.IOS.CAMERA);

//     if (result === RESULTS.GRANTED) return true;

//     if (result === RESULTS.BLOCKED) {
//       Alert.alert(
//         'Camera Permission Required',
//         'Please allow camera access from Settings.',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Open Settings', onPress: () => Linking.openSettings() },
//         ],
//       );
//     }

//     return false;
//   };

//   // ---------------- IMAGE PICKER ----------------
//   const openPicker = () => {
//     Alert.alert('Select Image', 'Choose an option', [
//       { text: 'Camera', onPress: openCamera },
//       { text: 'Gallery', onPress: openGallery },
//       { text: 'Cancel', style: 'cancel' },
//     ]);
//   };

//   const openCamera = async () => {
//     const granted = await requestCameraPermission();
//     if (!granted) {
//       Alert.alert('Permission denied');
//       return;
//     }

//     const result = await launchCamera({
//       mediaType: 'photo',
//       quality: 0.8,
//       saveToPhotos: true,
//     });

//     handleResponse(result);
//   };

//   const openGallery = async () => {
//     const result = await launchImageLibrary({
//       mediaType: 'photo',
//       quality: 0.8,
//     });

//     handleResponse(result);
//   };

//   const handleResponse = response => {
//     if (response.didCancel) return;

//     if (response.errorCode) {
//       Alert.alert('Error', response.errorMessage);
//       return;
//     }

//     const asset = response.assets[0];

//     setImage({
//       uri: asset.uri,
//       name: asset.fileName || `photo_${Date.now()}.jpg`,
//       type: asset.type,
//     });
//   };

//   // ---------------- UPLOAD IMAGE ----------------
//   const uploadImage = async () => {
//     if (!image) {
//       Alert.alert('No Image', 'Please select an image first');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('images[]', image);

//     setLoading(true);

//     try {
//       const token = await AsyncStorage.getItem('AUTH_TOKEN');

//       const response = await fetch(
//         `https://demo.thelittlehands.in/api/retailers/${retailerId}/images`,
//         {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: formData,
//         },
//       );

//       const text = await response.text();
//       console.log('Upload response:', text);

//       Alert.alert('Success', 'Image uploaded successfully', [
//         { text: 'OK', onPress: () => navigation.goBack() },
//       ]);
//     } catch (error) {
//       console.log(error);
//       Alert.alert('Upload Failed', 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0B0B' }}>
//       <View style={styles.container}>
//         <Text style={styles.title}>Upload Retailer Image</Text>

//         {/* SELECT IMAGE BUTTON */}
//         <TouchableOpacity activeOpacity={0.85} onPress={openPicker}>
//           <LinearGradient
//             colors={['#8303F0', '#0780FD']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={styles.button}
//           >
//             <View style={styles.iconCircle}>
//               <FontAwesome6 name="image" size={18} color="#6C63FF" />
//             </View>
//             <Text style={styles.buttonText}>
//               {image ? 'Change Image' : 'Select Image'}
//             </Text>
//           </LinearGradient>
//         </TouchableOpacity>

//         {/* IMAGE PREVIEW */}
//         {image && <Image source={{ uri: image.uri }} style={styles.image} />}

//         {/* UPLOAD BUTTON */}
//         {loading ? (
//           <ActivityIndicator
//             size="large"
//             color="#1E7CFF"
//             style={{ marginTop: 24 }}
//           />
//         ) : (
//           <TouchableOpacity activeOpacity={0.85} onPress={uploadImage}>
//             <LinearGradient
//               colors={['#10B981', '#059669']}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 0 }}
//               style={styles.button}
//             >
//               <View style={styles.iconCircle}>
//                 <FontAwesome6 name="cloud-arrow-up" size={18} color="#10B981" />
//               </View>
//               <Text style={styles.buttonText}>Upload Image</Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default UploadImageButton;

// // ---------------- STYLES ----------------
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     justifyContent: 'center',
//     backgroundColor: '#0B0B0B',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     textAlign: 'center',
//     marginBottom: 28,
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     borderRadius: 16,
//     marginTop: 20,
//   },
//   iconCircle: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: '#FFFFFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 14,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   image: {
//     width: '100%',
//     height: 260,
//     marginTop: 24,
//     borderRadius: 16,
//     backgroundColor: '#1F2933',
//   },
// });
// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   Platform,
//   PermissionsAndroid,
//   Linking,
// } from 'react-native';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// const UploadImageButton = ({ images = [], onChange }) => {
//   /* =====================
//      PERMISSIONS
//   ====================== */
//   const requestCameraPermission = async () => {
//     if (Platform.OS !== 'android') return true;

//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       {
//         title: 'Camera Permission',
//         message: 'Allow camera access to take photos',
//         buttonPositive: 'Allow',
//       },
//     );

//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   };

//   const requestGalleryPermission = async () => {
//     if (Platform.OS !== 'android') return true;

//     const permission =
//       Platform.Version >= 33
//         ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
//         : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

//     const granted = await PermissionsAndroid.request(permission, {
//       title: 'Gallery Permission',
//       message: 'Allow access to select images',
//       buttonPositive: 'Allow',
//     });

//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   };

//   const openSettingsAlert = msg => {
//     Alert.alert('Permission Required', msg, [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Open Settings', onPress: () => Linking.openSettings() },
//     ]);
//   };

//   /* =====================
//      IMAGE HANDLER
//   ====================== */
//   const handleResponse = res => {
//     if (res.didCancel) return;
//     if (res.errorCode) {
//       Alert.alert('Error', res.errorMessage || 'Image selection failed');
//       return;
//     }
//     if (!res.assets?.length) return;

//     onChange([...images, ...res.assets]);
//   };

//   /* =====================
//      PICKERS
//   ====================== */
//   const openCamera = async () => {
//     const hasPermission = await requestCameraPermission();
//     if (!hasPermission) {
//       openSettingsAlert('Camera permission is required');
//       return;
//     }

//     launchCamera(
//       { mediaType: 'photo', quality: 0.8, saveToPhotos: true },
//       handleResponse,
//     );
//   };

//   const openGallery = async () => {
//     const hasPermission = await requestGalleryPermission();
//     if (!hasPermission) {
//       openSettingsAlert('Gallery permission is required');
//       return;
//     }

//     launchImageLibrary(
//       { mediaType: 'photo', selectionLimit: 0 },
//       handleResponse,
//     );
//   };

//   /* =====================
//      UI
//   ====================== */
//   const openPicker = () => {
//     Alert.alert('Upload Image', 'Choose option', [
//       { text: 'Camera', onPress: openCamera },
//       { text: 'Gallery', onPress: openGallery },
//       { text: 'Cancel', style: 'cancel' },
//     ]);
//   };

//   return (
//     <View style={styles.wrapper}>
//       <TouchableOpacity style={styles.uploadBtn} onPress={openPicker}>
//         <FontAwesome6 name="plus" size={18} color="#1E7CFF" />
//         <Text style={styles.uploadText}>Upload Image</Text>
//       </TouchableOpacity>

//       <View style={styles.previewRow}>
//         {images.map((img, i) => (
//           <Image key={i} source={{ uri: img.uri }} style={styles.preview} />
//         ))}
//       </View>
//     </View>
//   );
// };

// export default UploadImageButton;

// const styles = StyleSheet.create({
//   wrapper: { marginTop: 20 },
//   uploadBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     alignSelf: 'center',
//   },
//   uploadText: {
//     color: '#1E7CFF',
//     marginLeft: 8,
//     fontSize: 16,
//   },
//   previewRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 12,
//   },
//   preview: {
//     width: 60,
//     height: 60,
//     borderRadius: 6,
//     marginRight: 8,
//     marginBottom: 8,
//   },
// });
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const MAX_IMAGES = 5;

const UploadImageBtn = ({ images = [], onChange }) => {
  /* =====================
     PERMISSIONS
  ====================== */
  const requestPermission = async permission => {
    if (Platform.OS !== 'android') return true;
    const granted = await PermissionsAndroid.request(permission);
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const openSettingsAlert = msg => {
    Alert.alert('Permission Required', msg, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: Linking.openSettings },
    ]);
  };

  /* =====================
     IMAGE HANDLER
  ====================== */
  const handleResponse = res => {
    if (res.didCancel || !res.assets?.length) return;

    if (images.length + res.assets.length > MAX_IMAGES) {
      Alert.alert('Limit reached', `Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    const merged = [...images, ...res.assets].filter(
      (v, i, a) => a.findIndex(t => t.uri === v.uri) === i,
    );

    onChange(merged);
  };

  /* =====================
     PICKERS
  ====================== */
  const openCamera = async () => {
    const ok = await requestPermission(PermissionsAndroid.PERMISSIONS.CAMERA);
    if (!ok) return openSettingsAlert('Camera permission required');

    launchCamera({ mediaType: 'photo', quality: 0.8 }, handleResponse);
  };

  const openGallery = async () => {
    const permission =
      Platform.Version >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const ok = await requestPermission(permission);
    if (!ok) return openSettingsAlert('Gallery permission required');

    launchImageLibrary(
      { mediaType: 'photo', selectionLimit: 0 },
      handleResponse,
    );
  };

  const removeImage = index => {
    const updated = [...images];
    updated.splice(index, 1);
    onChange(updated);
  };

  const openPicker = () => {
    Alert.alert('Upload Image', 'Choose option', [
      { text: 'Camera', onPress: openCamera },
      { text: 'Gallery', onPress: openGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.uploadBtn} onPress={openPicker}>
        <FontAwesome6 name="plus" size={18} color="#1E7CFF" />
        <Text style={styles.uploadText}>Upload Image</Text>
      </TouchableOpacity>

      <View style={styles.previewRow}>
        {images.map((img, i) => (
          <View key={i} style={styles.imageWrapper}>
            <Image source={{ uri: img.uri }} style={styles.preview} />
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => removeImage(i)}
            >
              <FontAwesome6 name="xmark" size={12} color="#FFF" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default UploadImageBtn;

const styles = StyleSheet.create({
  wrapper: { marginTop: 20 },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#1E7CFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  uploadText: {
    color: '#1E7CFF',
    marginLeft: 8,
    fontSize: 16,
  },
  previewRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 8,
    marginBottom: 8,
  },
  preview: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  removeBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    padding: 4,
  },
});
