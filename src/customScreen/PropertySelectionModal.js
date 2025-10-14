import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import FastImage from 'react-native-fast-image';
import images from '../assets/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../utils/colors';

const PropertySelectionModal = ({ visible, onClose, onSelect }) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleDone = () => {
    if (selectedType) {
      onSelect(selectedType);
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        onPress={onClose}
        accessibilityActions={0}
      >
        <View style={styles.modalContent}>
          <Text style={styles.title}>Select Property type</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                selectedType === 'Residential' && styles.selectedButton,
              ]}
              onPress={() => setSelectedType('Residential')}
            >
              <FastImage
                style={styles.icon}
                source={images.commerBuild}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: selectedType === 'Residential' && COLORS.themeColor,
                  },
                ]}
              >
                Residential
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                selectedType === 'Commercial' && styles.selectedButton,
              ]}
              onPress={() => setSelectedType('Commercial')}
            >
              <FastImage
                style={styles.icon}
                source={images.residentBuild}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text
                style={[
                  styles.buttonText,
                  { color: selectedType === 'Commercial' && COLORS.themeColor },
                ]}
              >
                Commercial
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={handleDone}
            disabled={!selectedType}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: wp(5),
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignSelf: 'center',
    width: wp('100%'),
    paddingBottom: hp(Platform.OS === 'android' ? 4 : 0),
  },
  title: {
    fontSize: hp(2),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: hp(2),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: hp(2),
    paddingHorizontal: hp(1),
    margin: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  selectedButton: {
    borderColor: COLORS.themeColor,
    borderWidth: 1,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: hp(1.6),
    color: '#333',
    fontFamily: Fonts.medium,
  },
  doneButton: {
    backgroundColor: COLORS.themeColor,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 30,
  },
  doneButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PropertySelectionModal;
