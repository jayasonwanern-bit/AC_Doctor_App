import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Platform, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import { COLORS, Fonts } from '../utils/colors';
import images from '../assets/images';

const MultipleUploadPhotos = ({ onChange }) => {

  const [uploadedItems, setUploadedItems] = useState([]);

  // Handle image/video selection with crop picker
  const handlePickImageOrVideo = () => {
    const options = {
      mediaType: 'any', // 'photo' or 'video' or 'any'
      cropping: true, // Enable cropping for photos
      compressImageQuality: 0.8, // Compress quality
      maxFiles: 1, // Single selection (change to higher for multiple)
      includeBase64: false,
      width: 500,
      height: 500,
    };

    Alert.alert(
      'Select Option',
      'Choose an action',
      [
        {
          text: 'Gallery',
          onPress: () => {
            ImagePicker.openPicker(options).then(response => {
              const uri = response.path || response.uri; // iOS/Android compatibility
              const type = response.mime.includes('video') ? 'video' : 'photo';
              const newItem = { id: Date.now(), uri, type };
              const updatedItems = [...uploadedItems, newItem];
              setUploadedItems(updatedItems);
              onChange(updatedItems);
            }).catch(error => {
              console.log('Gallery Error: ', error);
              Alert.alert('Error', 'Something went wrong while picking from gallery.');
            });
          },
        },
        {
          text: 'Camera',
          onPress: () => {
            ImagePicker.openCamera(options).then(response => {
              const uri = response.path || response.uri;
              const type = response.mime.includes('video') ? 'video' : 'photo';
              const newItem = { id: Date.now(), uri, type };
              const updatedItems = [...uploadedItems, newItem];
              setUploadedItems(updatedItems);
              onChange(updatedItems);
            }).catch(error => {
              console.log('Camera Error: ', error);
              Alert.alert('Error', 'Something went wrong while using the camera.');
            });
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  // Handle removing an upload
  const handleRemoveUpload = (id) => {
    const updatedItems = uploadedItems.filter(item => item.id !== id);
    setUploadedItems(updatedItems);
    onChange(updatedItems);
  };

  // Render each upload item
  const renderItem = ({ item }) => (
    <View style={styles.uploadCard}>
      <FastImage
        source={{ uri: item.uri }}
        style={styles.cardImage}
        resizeMode={FastImage.resizeMode.cover}
      />
      {item.type === 'video' && (
        <View style={styles.playButton}>
          <FastImage
            source={images.Play}
            style={styles.playIcon}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveUpload(item.id)}
      >
        <Text style={styles.removeText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Upload Photos/Drawings</Text>
      <FlatList
        data={uploadedItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={styles.row}
        ListFooterComponent={
          uploadedItems.length < 6 ? (
            <TouchableOpacity style={styles.uploadContainer} onPress={handlePickImageOrVideo}>
              <FastImage
                source={images.Camera}
                style={styles.customIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={styles.uploadText}>Add Photo/Video</Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
    marginHorizontal: 10,
  },
  label: {
    fontSize: 13,
    color: COLORS.black,
    marginTop: 10,
    fontFamily: Fonts.medium,
  },
  uploadContainer: {
    height: 100,
    backgroundColor: '#eaf0f7ff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    width: 100,
    marginTop: 14,
  },
  customIcon: {
    width: 30,
    height: 30,
    tintColor: '#666',
  },
  uploadText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign:'center'
  },
  uploadCard: {
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    width: 100,
    position: 'relative',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 5,
  },
  playIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#dc3545',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default MultipleUploadPhotos;

