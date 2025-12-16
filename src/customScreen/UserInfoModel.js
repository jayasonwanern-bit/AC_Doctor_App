import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { COLORS, Fonts } from '../utils/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const UserInfoModel = ({ visible, onClose, onProceed }) => {
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState({
    name: '',
    number: '',
    address: '',
  });

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleProceedPress = () => {
    if (!userInfo.name || !userInfo.number || !userInfo.address) {
      alert('Please fill in all fields');
      return;
    }
    onProceed(userInfo);
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* DARK BACKGROUND */}
      <View style={styles.backdrop}>
        {/* PRESS OUTSIDE TO CLOSE */}
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={onClose}
        />

        {/* BOTTOM SHEET */}
        <View style={styles.modalContent}>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraHeight={60}
            extraScrollHeight={60}
            keyboardOpeningTime={0}
            contentContainerStyle={{ paddingBottom: 20 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.inFlexrow}>
              <Text style={styles.headerText}>Enter Your Details</Text>

              <TouchableOpacity
                onPress={() => {
                  onClose();
                  navigation.navigate('AddAddress', { from: 'UserInfoModel' });
                }}
              >
                <Text style={styles.addAddressText}>Add New Address</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.TitleheadText}>Name</Text>
            <TextInput
              placeholder="Enter your Name"
              style={styles.inputContainer}
              value={userInfo.name}
              onChangeText={t => handleInputChange('name', t)}
              onSubmitEditing={() => Keyboard.dismiss()}
            />

            <Text style={styles.TitleheadText}>Number</Text>
            <TextInput
              placeholder="Enter your Number"
              keyboardType="phone-pad"
              maxLength={10}
              style={styles.inputContainer}
              value={userInfo.number}
              onChangeText={t => handleInputChange('number', t)}
              onSubmitEditing={() => Keyboard.dismiss()}
            />

            <Text style={styles.TitleheadText}>Address</Text>
            <TextInput
              placeholder="Enter your Address / state / pincode"
              multiline
              style={[styles.inputContainer, { height: hp('10%') }]}
              textAlignVertical="top"
              value={userInfo.address}
              onChangeText={t => handleInputChange('address', t)}
              onSubmitEditing={() => Keyboard.dismiss()}
            />

            <TouchableOpacity
              style={styles.proceedButton}
              onPress={handleProceedPress}
            >
              <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: '#f5fcfcff',
    paddingHorizontal: hp('2%'),
    paddingVertical: hp('2%'),
    borderTopLeftRadius: wp('7%'),
    borderTopRightRadius: wp('7%'),
    maxHeight: hp('80%'), // IMPORTANT — prevents modal from jumping!
  },

  inFlexrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    fontSize: hp('1.8%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.textHeading,
  },

  addAddressText: {
    fontSize: hp('1.5%'),
    fontFamily: Fonts.regular,
    color: COLORS.themeColor,
  },

  TitleheadText: {
    fontSize: hp('1.6%'),
    fontFamily: Fonts.semiBold,
    marginTop: hp(2),
    marginBottom: hp(0.8),
  },

  inputContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: wp('2.5%'),
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    padding: hp(1.4),
    alignSelf: 'center',
    fontSize: hp('1.7%'),
  },

  proceedButton: {
    backgroundColor: COLORS.themeColor,
    padding: hp(1.5),
    borderRadius: wp(6),
    alignItems: 'center',
    marginTop: hp(3),
  },

  proceedButtonText: {
    color: COLORS.white,
    fontSize: hp('2%'),
    fontFamily: Fonts.bold,
  },
});

export default UserInfoModel;
