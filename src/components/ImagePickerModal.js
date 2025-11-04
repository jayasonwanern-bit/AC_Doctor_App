import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const { width } = Dimensions.get('window');

const ImagePickerModal = ({ visible, onClose, onImageSelect }) => {
  const [loading, setLoading] = useState(null);

  if (!visible) return null;

  // ---- Open Camera ----
  const openCamera = async () => {
    setLoading('camera');
    try {
      const image = await ImagePicker.openCamera({
        mediaType: 'photo',
        cropping: true, // Enable cropping for photos
        compressImageQuality: 0.8, // Compress quality
        maxFiles: 1, // Single selection (change to higher for multiple)
        includeBase64: false,
        width: 500,
        height: 500,
      });

      const uri = image.path || image.uri;
      onImageSelect(uri);
      onClose();
    } finally {
      // catch (err) {
      //   if (err.code !== 'E_PICKER_CANCELLED') {
      //     Alert.alert('Error', 'Camera kaam nahi kar raha.');
      //   }
      // }
      onClose();
      setLoading(null);
    }
  };

  // ---- Open Gallery ----
  const openGallery = async () => {
    setLoading('gallery');
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: true, 
        compressImageQuality: 0.8, 
        maxFiles: 1, 
        includeBase64: false,
        width: 500,
        height: 500,
      });
      const uri = image.path || image.uri;
      onImageSelect(uri);
      onClose();
    } finally {
      // catch (err) {
      //   if (err.code !== 'E_PICKER_CANCELLED') {
      //     Alert.alert('Error', 'Gallery se photo nahi aaya.');
      //   }
      // }
      onClose();
      setLoading(null);
    }
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Choose Photo</Text>

          <TouchableOpacity
            style={[styles.btn, loading === 'camera' && styles.disabled]}
            onPress={openCamera}
            disabled={!!loading}
          >
            <Text style={styles.btnText}>Camera</Text>
            {loading === 'camera' && (
              <ActivityIndicator size="small" color="#007AFF" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, loading === 'gallery' && styles.disabled]}
            onPress={openGallery}
            disabled={!!loading}
          >
            <Text style={styles.btnText}>Gallery</Text>
            {loading === 'gallery' && (
              <ActivityIndicator size="small" color="#34C759" />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancel} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    width,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  btnText: { fontSize: 17, fontWeight: '500', color: '#000' },
  disabled: { opacity: 0.6 },
  cancel: { marginTop: 12, alignItems: 'center', paddingVertical: 16 },
  cancelText: { fontSize: 17, color: '#FF3B30', fontWeight: '600' },
});

export default ImagePickerModal;
