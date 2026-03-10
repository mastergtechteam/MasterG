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

const UploadImageBtn = ({
  label = 'Upload Image',
  image = null,
  onChange,
  required = false,
  disabled,
}) => {
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
    onChange(res.assets[0]); // single image
  };

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

    launchImageLibrary({ mediaType: 'photo' }, handleResponse);
  };

  const removeImage = () => {
    onChange(null);
  };

  const openPicker = () => {
    Alert.alert(label, 'Choose option', [
      { text: 'Camera', onPress: openCamera },
      { text: 'Gallery', onPress: openGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>
        {label} {required && <Text style={{ color: '#FF3B30' }}>*</Text>}
      </Text>

      {!image ? (
        <TouchableOpacity style={styles.uploadBtn} onPress={openPicker}>
          <FontAwesome6 name="plus" size={18} color="#1E7CFF" />
          <Text style={styles.uploadText}>Add {label}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.imageWrapper}>
          <Image source={{ uri: image.uri }} style={styles.preview} />
          {!disabled && (
            <TouchableOpacity style={styles.removeBtn} onPress={removeImage}>
              <FontAwesome6 name="xmark" size={12} color="#FFF" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default UploadImageBtn;

const styles = StyleSheet.create({
  wrapper: { marginTop: 20 },

  label: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 8,
  },

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

  imageWrapper: {
    position: 'relative',
    alignSelf: 'center',
  },

  preview: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },

  removeBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    padding: 6,
  },
});
