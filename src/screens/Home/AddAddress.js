import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  CheckBox,
  Image,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import { COLORS, Fonts } from '../../utils/colors';
import images from '../../assets/images';
import CustomButton from '../../components/CustomButton';
import BookingSlotModal from '../../customScreen/BookingSlotModal';
import ConfirmationModal from '../../customScreen/ConfirmationModal';
import { store } from '../../redux/store';
import { addOrEditAddress } from '../../api/addressApi';
import Toast from 'react-native-simple-toast';
import StateCityPicker from '../../components/StateCityPicker';
import CustomLoader from '../../components/CustomLoader';


const AddAddress = ({ navigation, route }) => {
  const addressData = route?.params?.addressData;
  const { fromScreen, openModal } = route.params || {};
  const [searchBar, setSearchBar] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [stateName, setStateName] = useState('');
  const [addressType, setAddressType] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [modalSlotVisible, setModalSlotVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userId = store?.getState()?.auth?.user;

  // validation
  const validateFields = () => {
    if (!address.trim()) return 'Address is required';
    if (!city.trim()) return 'City is required';
    if (!stateName.trim()) return 'State is required';
    if (!pincode.trim()) return 'Pincode is required';
    if (!/^\d{5,6}$/.test(pincode.trim()))
      return 'Pincode must be 5 or 6 digits';
    return null;
  };

  useEffect(() => {
    if (addressData) {
      // setHouse(addressData.house);
      setAddress(addressData.street);
      setCity(addressData.city);
      setStateName(addressData.state);
      setPincode(addressData.zipcode);
      // setSaveAs(addressData.saveAs);
      // setLandmark(addressData.landmark);
    }
  }, [addressData]);

  // onSubmit button
  const handleSubmit = async () => {
    if (isSubmitting) return;

    try {
      const validationError = validateFields();
      if (validationError) {
        Alert.alert('Validation Error', validationError);
        return;
      }
      setIsSubmitting(true);
      setLoading(true);

      const newAddress = {
        name: '',
        phone: '',
        address: `${address}, ${city}, ${stateName} ${pincode}`,
        type: addressType,
        isDefault,
      };

      setSelectedAddress(newAddress);

      const body = {
        addressId: addressData?._id || '',
        userId: userId,
        houseNumber: '1234567',
        street: address,
        state: stateName,
        city: city,
        zipCode: pincode,
        saveAs: 'saveAs',
        landmark: addressType,
      };
      console.log('address body---', body)
      const res = await addOrEditAddress(body);
      if (res?.status) {
        Toast.show(res?.message);

        const cameFrom = route?.params?.from;
        const { fromScreen } = route.params || {};

        if (cameFrom === 'ServiceScreen') {
          navigation.navigate('Tab', { screen: 'Home' });
        } else if (cameFrom === 'CustomModal') {
          navigation.goBack();
        } else if (cameFrom === 'UserInfoModel') {
          setModalSlotVisible(true);
        }
        if (fromScreen === 'ViewCart') {
          navigation.navigate('ViewCart', {
            proceed: true,
            selectedAddress: selectedAddress,
          });
        } else if (fromScreen === 'OtherCart') {
          navigation.navigate('OtherCartView', {
            proceed: true,
            selectedAddress: selectedAddress,
          })
        } else {
          navigation.goBack();
        }
      }
    } catch (error) {
      console.log('Update Error:', error);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };


  return (
    <View style={styles.container}>
      <Header title="Add Address" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <Text style={styles.headerText}>
          Type your location to get tailored service options!
        </Text> */}

        {/* <View style={styles.searchInput}>
          <Image
            source={images.searchIcon}
            style={[
              styles.checkBoxIcon,
              { height: hp(3), marginLeft: wp(Platform.OS === 'ios' ? 0 : 3) },
            ]}
          />
          <TextInput
            style={styles.searchInputText}
            placeholder="Enter your city, area, or landmark"
            value={searchBar}
            keyboardType="default"
            placeholderTextColor={COLORS.textColor}
            onChangeText={setSearchBar}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </View> */}

        <Text style={styles.label}>Street Address</Text>
        <TextInput
          placeholder="Address"
          value={address}
          keyboardType="email-address"
          placeholderTextColor={COLORS.textColor}
          onChangeText={setAddress}
          style={styles.input}
          onSubmitEditing={() => Keyboard.dismiss()}
        />


        <StateCityPicker
          selectedState={stateName}
          selectedCity={city}
          onStateSelect={setStateName}
          onCitySelect={setCity}
        />

        <Text style={styles.label}>Pincode</Text>
        <TextInput
          placeholder="Pincode"
          placeholderTextColor={COLORS.textColor}
          value={pincode}
          maxLength={6}
          onChangeText={setPincode}
          keyboardType="number-pad"
          style={styles.input}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <Text style={styles.label}>Save address as</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              addressType === 'Home' && styles.selectedTypeButton,
            ]}
            onPress={() => setAddressType('Home')}
            activeOpacity={1}
          >
            <Text
              style={[
                styles.typeButtonText,
                addressType === 'Home' && styles.selectedTypeButtonText,
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              addressType === 'Office' && styles.selectedTypeButton,
            ]}
            onPress={() => setAddressType('Office')}
          >
            <Text
              style={[
                styles.typeButtonText,
                addressType === 'Office' && styles.selectedTypeButtonText,
              ]}
            >
              Office
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.typeButton,
              addressType === 'Other' && styles.selectedTypeButton,
            ]}
            onPress={() => setAddressType('Other')}
          >
            <Text
              style={[
                styles.typeButtonText,
                addressType === 'Other' && styles.selectedTypeButtonText,
              ]}
            >
              Other
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setIsDefault(!isDefault)}
          activeOpacity={1}
        >
          <Image
            source={isDefault ? images.check : images.uncheck}
            style={styles.checkBoxIcon}
          />
          <Text style={styles.checkboxLabel}>Make this default address</Text>
        </TouchableOpacity>

        {loading ? (
          <CustomLoader size="small" />
        ) : (<CustomButton
          buttonName="Continue"
          margingTOP={hp('6%')}
          btnTextColor={COLORS.white}
          btnColor={COLORS.themeColor}
          onPress={() => handleSubmit()}
        />)}
      </ScrollView >

      <BookingSlotModal
        visible={modalSlotVisible}
        onClose={() => setModalSlotVisible(false)}
        setSelectedSlot={setSelectedSlot}
        onBookProcess={() => {
          setModalSlotVisible(false);
          setTimeout(() => {
            navigation.navigate('ViewCart', {
              proceed: true,
              selectedAddress: selectedAddress,
            });
          }, 300);
        }}
      />

      <ConfirmationModal
        visible={confirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
        selectedAddress={selectedAddress}
        selectedSlot={selectedSlot}
      />
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: wp(4),
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  headerText: {
    fontSize: hp(1.7),
    textAlign: 'center',
    marginBottom: hp(2),
    color: COLORS.black,
    fontFamily: Fonts.semiBold,
  },

  searchInput: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp(10),
    padding: wp(Platform.OS === 'ios' ? 2 : 1),
    marginBottom: hp(0.5),
    alignItems: 'center',
  },
  searchInputText: {
    fontSize: hp(1.5),
    fontFamily: Fonts.medium,
    color: COLORS.black,
    marginLeft: wp(2),
  },
  orText: {
    textAlign: 'center',
    marginVertical: hp(1),
    color: '#666',
    fontFamily: Fonts.medium,
    fontSize: hp(1.5),
  },
  label: {
    fontSize: hp(1.8),
    marginBottom: hp(1),
    marginTop: hp(1.3),
    color: COLORS.black,
    fontFamily: Fonts.semiBold,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp(10),
    padding: wp(2.5),
    marginBottom: hp(0.5),
    fontSize: hp(1.5),
    fontFamily: Fonts.medium,
    color: COLORS.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  typeButton: {
    flex: 1,
    borderRadius: wp(6),
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(1),
    padding: wp(2),
  },
  selectedTypeButton: {
    borderWidth: 1,
    borderColor: COLORS.themeColor,
    backgroundColor: COLORS.themeColor,
  },
  typeButtonText: {
    fontSize: hp(1.6),
    fontFamily: Fonts.medium,
    color: COLORS.textHeading,
  },
  selectedTypeButtonText: {
    fontSize: hp(1.6),
    fontFamily: Fonts.medium,
    color: COLORS.white,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  checkboxLabel: {
    marginLeft: wp(2),
    fontSize: hp(1.6),
    fontFamily: Fonts.medium,
    color: COLORS.black,
  },
  checkBoxIcon: {
    width: wp(5),
    height: hp(5),
    resizeMode: 'contain',
  },
});

export default AddAddress;
