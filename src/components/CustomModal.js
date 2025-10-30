import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../utils/colors';
import images from '../assets/images';
import { useNavigation } from '@react-navigation/native';

const CustomModal = ({ visible, onClose, onProceed, setSelectedAddress }) => {
  const navigation = useNavigation();
  const [savedAddresses, setSavedAddresses] = useState([
    {
      name: 'Sachin Gupta',
      address: '149, Scheme8, Vijay Nagar, Indore, Madhya Pradesh 452010',
      phone: '+91 9999999999',
      default: true,
      selected: false,
    },
    {
      name: 'Sachin Gupta',
      address: '149, Scheme8, Vijay Nagar, Indore, Madhya Pradesh 452010',
      phone: '+91 9999999999',
      default: false,
      selected: false,
    },
  ]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

  useEffect(() => {
    if (visible && savedAddresses.length > 0) {
      const updatedAddresses = savedAddresses.map((addr, index) => ({
        ...addr,
        default: index === 0,
      }));
      setSavedAddresses(updatedAddresses);
      setSelectedAddressIndex(0);
    }
  }, [visible, savedAddresses.length]);

  const handleAddressSelect = (index) => {
    const updatedAddresses = savedAddresses.map((addr, i) => ({
      ...addr,
      default: i === index,
      selected: i === index,
    }));
    setSavedAddresses(updatedAddresses);
    setSelectedAddressIndex(index === selectedAddressIndex ? null : index);
  };

  const handleProceedPress = () => {
    if (selectedAddressIndex !== null && setSelectedAddress && typeof setSelectedAddress === 'function') {
      const selectedAddr = savedAddresses[selectedAddressIndex];
      setSelectedAddress(selectedAddr); // Set selected address in parent
      onProceed(); // Proceed to next modal
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <TouchableOpacity  onPress={()=> onClose()} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.inFlexrow}>
            <Text style={styles.headerText}>Saved Addresses</Text>
            <TouchableOpacity
              onPress={() => {
                onClose();
                navigation.navigate('AddAddress', { from: 'CustomModal' });
              }}
            >
              <Text style={styles.addButtonText}>+ Add new</Text>
            </TouchableOpacity>
          </View>

          {savedAddresses.map((address, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.addressContainer,
                selectedAddressIndex === index && styles.selectedAddress,
              ]}
              onPress={() => handleAddressSelect(index)}
            >
              <View style={{ marginBottom: hp('8%') }}>
                <Image
                  source={
                    selectedAddressIndex === index
                      ? images.onbutton
                      : images.offbutton
                  }
                  style={styles.showiconStyle}
                />
              </View>

              <View style={{ width: wp('80%') }}>
                <View style={styles.inFlexrow}>
                  <Text style={styles.addressName}>
                    {address.name} {'   '}
                    <Text style={[styles.defaultTag, { color: COLORS.black ,fontWeight:'400',fontSize:10,paddingHorizontal:10}]}>
                      Home
                    </Text>{' '}
                  </Text>
                  {address.default && (
                    <Text
                      style={[styles.defaultTag, { marginRight: wp('1%') }]}
                    >
                      Default
                    </Text>
                  )}
                </View>

                <Text style={styles.addressDetails}>{address.address}</Text>
                <View style={styles.phoneIcons}>
                  <Text style={styles.addressPhone}>{address.phone}</Text>
                  <View style={styles.icons}>
                    <TouchableOpacity>
                      <Text
                        style={[
                          styles.icon,
                          selectedAddressIndex === index
                            ? styles.darkIcon
                            : styles.lightIcon,
                        ]}
                      >
                        <TouchableOpacity>
                        </TouchableOpacity>
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose}>
                      <Text
                        style={[
                          styles.icon,
                          selectedAddressIndex === index
                            ? styles.darkIcon
                            : styles.lightIcon,
                        ]}
                      >
                        <TouchableOpacity>
                          <Image
                            source={images.delete}
                            style={styles.showiconStyle}
                          />
                        </TouchableOpacity>
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={handleProceedPress} // Use separate function
          >
            <Text style={styles.proceedButtonText}>Proceed</Text>
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
    backgroundColor: '#939e9eff',
   backgroundColor: '#ebf6f6ff',
    paddingHorizontal: hp('2.5%'),
    paddingVertical: hp('2%'),
    borderTopLeftRadius: wp('6.5%'),
    borderTopRightRadius: wp('6.5%'),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignSelf: 'center',
    width: wp('100%'),
    paddingBottom: hp(Platform.OS === 'android'? 4 :4),// add this line for android
    marginBottom: hp(0), // add this line for android
  },
  headerText: {
    fontSize: hp('1.7%'),
    fontFamily: Fonts.semiBold,
    marginBottom: hp(0),
  },
  inFlexrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
    flexWrap: 'wrap',
  },
  addButtonText: {
    fontSize: hp('1.6%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.textHeading,
  },
  addressContainer: {
    width: wp('95%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: hp(1.2),
    marginVertical: hp('0.5%'),
    borderRadius: wp('3%'),
    backgroundColor: COLORS.white,
    alignSelf: 'center',
  },
  selectedAddress: {
    borderWidth: wp('0.2%'),
    borderColor: '#1DA1F2',
    borderRadius: wp('3%'),
    width: wp('95%'),
  },
  addressName: {
    fontSize: hp('1.6%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.black,
    marginTop:hp(-1)
  },
  addressDetails: {
    fontSize: hp('1.4%'),
    fontFamily: Fonts.regular,
    color: COLORS.textHeading,
  },
  phoneIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressPhone: {
    fontSize: hp('1.5%'),
    fontFamily: Fonts.medium,
    color: COLORS.textHeading,
  },
  defaultTag: {
    backgroundColor: COLORS.lightSky,
    color: '#00aaff',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: wp(0.5),
    fontSize: hp(1.5),
    marginTop:hp(-2)
  },
  showiconStyle: {
    width: wp('5%'),
    height: hp('3%'),
    resizeMode: 'contain',
  },
  icons: {
    flexDirection: 'row',
    gap: wp(2.5),
  },
  icon: {
    fontSize: hp(2.2),
  },
  darkIcon: {
    color: '#333',
  },
  lightIcon: {
    color: '#ccc',
  },
  proceedButton: {
    backgroundColor: COLORS.themeColor,
    padding: hp(1),
    borderRadius: wp(6),
    alignItems: 'center',
    marginTop: hp(2.5),
    width: wp('90%'),
    alignSelf: 'center',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: hp(2),
    fontWeight: 'bold',
  },
});

export default CustomModal;