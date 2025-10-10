import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { COLORS, Fonts } from '../utils/colors';

const UserInfoModel = ({ visible, onClose, onProceed }) => {
  const navigation = useNavigation();

  // Single state object to store all user input
  const [userInfo, setUserInfo] = useState({
    name: '',
    number: '',
    address: '',
  });

  // Handle input changes
  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle proceed button press
  const handleProceedPress = () => {
    // Validate inputs (basic validation)
    if (!userInfo.name || !userInfo.number || !userInfo.address) {
      alert('Please fill in all fields');
      return;
    }
    
    // Pass userInfo to parent component and proceed
    onProceed(userInfo);
  };

  return (
   
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
       <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? hp('0.3%') : hp('1%')} // Adjust this based on your header height
    >
      <TouchableOpacity onPress={onClose} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.inFlexrow}>
            <Text style={styles.headerText}>Enter Your Details</Text>
            <TouchableOpacity
              onPress={() => {
                onClose();
                navigation.navigate('AddAddress');
              }}
            >
              <Text style={styles.addAddressText}>Add New Address</Text>
            </TouchableOpacity>
          </View>

          {/* Name Input */}
          <Text style={styles.TitleheadText}>Name</Text>
          <TextInput
            placeholder="Enter your Name"
            keyboardType="default"
            style={styles.inputContainer}
            value={userInfo.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />

          {/* Number Input */}
          <Text style={styles.TitleheadText}>Number</Text>
          <TextInput
            placeholder="Enter your Number"
            keyboardType="phone-pad"
            style={styles.inputContainer}
            value={userInfo.number}
            maxLength={10}
            onChangeText={(text) => handleInputChange('number', text)}
          />

          {/* Address Input */}
          <Text style={styles.TitleheadText}>Address</Text>
          <TextInput
            placeholder="Enter your Address/state/pincode"
            keyboardType="default"
            style={[styles.inputContainer, { height: hp('10%') }]}
            value={userInfo.address}
            onChangeText={(text) => handleInputChange('address', text)}
            multiline
          />

          {/* Proceed Button */}
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={handleProceedPress}
          >
            <Text style={styles.proceedButtonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
    backgroundColor: '#f3f7f7ff',
    padding: wp(5),
    borderTopLeftRadius: wp('6.5%'),
    borderTopRightRadius: wp('6.5%'),
    minHeight: hp(40),
  },
  inFlexrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: hp(2),
  },
  headerText: {
    fontSize: hp('1.7%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.textHeading,
  },
  addAddressText: {
    fontSize: hp('1.6%'),
    fontFamily: Fonts.regular,
    color: COLORS.themeColor,
  },
  TitleheadText: {
    fontSize: hp('1.6%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.textHeading,
    marginTop: hp(2),
    marginBottom: hp(1),
  },
  inputContainer: {
    width: wp('90%'),
    padding: hp(1.3),
    marginVertical: hp('0.5%'),
    borderRadius: wp('2%'),
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    fontSize: hp('1.8%'),
  },
  proceedButton: {
    backgroundColor: COLORS.themeColor,
    padding: hp(1.5),
    borderRadius: wp(6),
    alignItems: 'center',
    marginTop: hp(3),
    width: wp('90%'),
    alignSelf: 'center',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: hp('2%'),
    fontFamily: Fonts.bold,
  },
});

export default UserInfoModel;