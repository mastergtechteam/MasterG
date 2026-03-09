import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';

export default function LegalWebviewModal({ visible, url, onClose }) {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      useNativeDriver={true}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Icon name="close" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <WebView source={{ uri: url }} style={styles.webview} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    height: '85%',
    backgroundColor: colors.background || '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
  },
  webview: {
    flex: 1,
    marginTop: 40, // to avoid close button overlap
  },
});
