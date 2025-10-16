import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import images from '../assets/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../utils/colors';

const ACTonnageModal = ({ visible, onClose, onSelect }) => {
  const [selectedType, setSelectedType] = useState(null);

   const defaultAcTypes = [
    { name: 'Split AC', showButtons: false, acIcon: images.splitG },
    {
      name: 'Window AC',
      showButtons: false,
      acIcon: images.windowG,
    },
    {
      name: 'Cassette AC',
      showButtons: false,
      acIcon: images.cassetteG,
    },
    { name: 'VRV/VRF AC', showButtons: false, acIcon: images.VrvG },
    {
      name: 'Ducted AC',
      showButtons: false,
      acIcon: images.ductedG,
    },
    { name: 'Tower AC', showButtons: false, acIcon: images.towerG },
  ];

  const handleDone = () => {
    if (selectedType) {
      onSelect(selectedType);
      onClose();
    }
  };

  const renderAcTypeItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.button,
        selectedType === item.name && styles.selectedButton,
      ]}
      onPress={() => setSelectedType(item.name)}
    >
        <FastImage
                style={[styles.icon ,{tintColor:selectedType === item.name && COLORS.themeColor}]}
                source={item.acIcon}
                resizeMode={FastImage.resizeMode.contain}
                onError={() => console.log('ResidentBuild image failed')}
              />
      <Text
        style={[
         styles.buttonText,
          { color: selectedType === item.name && '#4a90e2' },
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

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
        activeOpacity={1}
      >
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true}
        >
          <Text style={[styles.buttonText,{textAlign:'center',fontSize: hp(1.6),fontFamily:Fonts.semiBold}]}>Select AC Type</Text>

        <View style={styles.acTypeContainer}>
            <FlatList
              data={defaultAcTypes}
              renderItem={renderAcTypeItem}
              keyExtractor={(item) => item.name}
              numColumns={3}
              columnWrapperStyle={styles.row}
              contentContainerStyle={styles.acList}
            />
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
    paddingBottom: hp(Platform.OS === 'android' ? 4 : 5),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop:9
  },
  button: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: hp(2),
    paddingHorizontal: hp(0),
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
    width: wp(10),
    height: hp(4),
    marginBottom: 10,
  },
  buttonText: {
    fontSize: hp(1.4),
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

export default ACTonnageModal;
