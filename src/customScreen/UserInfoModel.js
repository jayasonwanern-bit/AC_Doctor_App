import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
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

  // Dynamic vertical offset based on platform and screen
  const keyboardVerticalOffset = Platform.OS === 'ios' ? hp('0%') : hp('0%'); // Adjusted for header + status bar

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <TouchableOpacity onPress={onClose} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.inFlexrow}>
              <Text style={styles.headerText}>Enter Your Details</Text>
              <TouchableOpacity
                onPress={() => {
                  onClose();
                  navigation.navigate('AddAddress',{from:'UserInfoModel'});
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
              multiline={true}
              textAlignVertical="top"
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
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center', // Changed to center for stability
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#f5fcfcff',
    paddingHorizontal:hp('2.5%'),
    paddingVertical:hp('2%'),
    borderTopLeftRadius: wp('6.5%'),
    borderTopRightRadius: wp('6.5%'),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignSelf:"center",
    width: wp('100%'),
    paddingBottom: 0, 
    marginBottom: 0,
  },
  inFlexrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginVertical: hp(3),
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