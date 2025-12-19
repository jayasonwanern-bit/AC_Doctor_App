import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Platform,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../utils/colors';
import images from '../assets/images';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { store } from '../redux/store';
import { getAddress } from '../api/addressApi';
import { useDispatch } from 'react-redux';
import { setAddress } from '../redux/slices/authSlice';

const CustomModal = ({ visible, onClose, onProceed, setSelectedAddress }) => {
  const navigation = useNavigation();
  const userDetail = store?.getState()?.auth?.user;
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  const selectedAddressRedux = store?.getState()?.auth?.address;

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

  // api address data
  useFocusEffect(
    useCallback(() => {
      fetchAddress();
    }, []),
  );

  // get list address
  const fetchAddress = async () => {
    try {
      setLoading(true);
      const res = await getAddress(userDetail?._id);

      if (res?.status) {
        const data = res.data || [];
        setSavedAddresses(data);

        // ✅ CASE 1: Redux already has selected address
        if (selectedAddressRedux?._id) {
          const exist = data.find(a => a._id === selectedAddressRedux._id);

          if (exist) {
            setSelectedId(exist._id);
            return;
          }
        }

        // ✅ CASE 2: No previous selection → select last address
        if (data.length > 0) {
          const lastAddress = data[data.length - 1];
          setSelectedId(lastAddress._id);
          dispatch(setAddress({ address: lastAddress }));
        }
      }
    } catch (error) {
      console.log('Error fetching address:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleAddressSelect = address => {
    setSelectedId(address._id);
    dispatch(setAddress({ address }));
  };


  const handleProceedPress = () => {
    if (
      selectedAddressIndex !== null &&
      setSelectedAddress &&
      typeof setSelectedAddress === 'function'
    ) {
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
      <TouchableOpacity
        onPress={() => onClose()}
        style={styles.modalContainer}
        activeOpacity={2}
      >
        <View style={styles.modalContent}>
          <View style={styles.inFlexrow}>
            <Text style={styles.headerText}>Saved Addresses</Text>
            <TouchableOpacity
              activeOpacity={2}
              onPress={() => {
                onClose();
                navigation.navigate('AddAddress', { from: 'CustomModal' });
              }}
            >
              <Text style={styles.addButtonText}>+ Add new</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: hp(22) }}>
            <FlatList
              data={savedAddresses}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: address }) => {
                const isSelected = selectedId === address._id;

                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={[
                      styles.addressContainer,
                      isSelected && styles.selectedAddress,
                    ]}
                    onPress={() => handleAddressSelect(address)}
                  >
                    {/* Radio */}
                    <Image
                      source={isSelected ? images.onbutton : images.offbutton}
                      style={styles.showiconStyle}
                    />

                    {/* Address */}
                    <View style={{ width: wp('80%') }}>
                      <View style={styles.inFlexrow}>
                        <Text style={styles.addressName}>
                          {userDetail.name}
                          {'   '}
                          <Text style={styles.markstyle}>
                            {address.landmark}
                          </Text>
                        </Text>

                        {address._id === selectedId && (
                          <Text style={styles.defaultTag}>Default</Text>
                        )}
                      </View>

                      <Text style={styles.addressDetails}>
                        {address.street}, {address.city}, {address.state},{' '}
                        {address.zipcode}
                      </Text>

                      <Text style={styles.addressPhone}>
                        {userDetail.phoneNumber}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          <TouchableOpacity
            style={styles.proceedButton}
            activeOpacity={2}
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
    backgroundColor: '#ebf6f6ff',
    paddingHorizontal: hp('2%'),
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
    paddingBottom: hp(Platform.OS === 'android' ? 4 : 4), // add this line for android
    marginBottom: hp(0),
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
    marginBottom: hp(1),
    flexWrap: 'wrap',
  },
  addButtonText: {
    fontSize: hp('1.6%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.textHeading,
  },
  addressContainer: {
    // width: wp('95%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: hp(1.2),
    marginVertical: hp('0.5%'),
    borderRadius: wp('3%'),
    backgroundColor: COLORS.white,
    alignSelf: 'center',
  },
  markstyle: {
    color: COLORS.black,
    fontWeight: '400',
    fontSize: hp(1.4),
    textAlign: 'center',
    backgroundColor: COLORS.lightSky,
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: wp(2),
    marginBottom: hp('0.5%'),
  },
  selectedAddress: {
    borderRadius: wp('3%'),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    alignSelf: 'center',
    padding: hp(1.2),
  },
  addressName: {
    fontSize: hp('1.8%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.black,
    marginTop: hp(-1),
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
    borderRadius: wp(2),
    fontSize: hp(1.5),
    marginTop: hp(-2),
  },
  showiconStyle: {
    width: wp('5%'),
    height: hp('3%'),
    resizeMode: 'contain',
    marginRight: wp(2),
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
