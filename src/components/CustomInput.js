// src/components/CustomInput.js
import React from 'react';
import { View, TextInput, StyleSheet, Text, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CountryPicker from 'react-native-country-picker-modal';
import { COLORS } from '../utils/colors';

const CustomPhoneInput = ({ countryCode, setCountryCode,setCallingCode, callingCode,phoneNumber, setPhoneNumber, error }) => {

    return (
    <View style={styles.container}>
        <View style={styles.inboxBorder}>
      <CountryPicker
        withFlag
        withCallingCode
        withFilter
        translation="eng"
        countryCode={countryCode}
        onSelect={(country) => {
          setCountryCode(country.cca2); // e.g., 'IN'
          setCallingCode(`+${country.callingCode[0]}`); // e.g., '+91'
        }}
        containerButtonStyle={styles.countryPicker}
      />
      <Text style={styles.callingCode}>
        {callingCode} {/* Displays +91, +1, etc. */}
      </Text>
     </View>
      
      <TextInput
        style={styles.input}
        placeholder="Enter your mobile number"
        placeholderTextColor={COLORS.textColor}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        maxLength={10}  
        submitBehavior='submit'
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inboxBorder:{
    flexDirection: 'row',
    marginVertical: hp('2%'),
    borderWidth: 1,
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: wp('2%'),
    height: hp('4.5%'),
  },
  countryPicker: {
    // marginRight: wp('1%'),
  },
  callingCode: {
    fontSize: hp('1.8%'),
    // marginRight: wp('1%'),
  },
  input: {
   flex: 1,
    height: hp('4.5%'), 
    marginLeft: wp('2.5%'),
    marginVertical: hp('2%'),
    borderWidth: 1,
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: wp('3%'),
  },
  errorText: {
    color: COLORS.errorRed,
    fontSize: hp('1.5%'),
    textAlign:'center',
    position: 'absolute',
    bottom: -hp('5%'),
  },
});

export default CustomPhoneInput;