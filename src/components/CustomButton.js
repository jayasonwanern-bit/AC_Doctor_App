import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../utils/colors';

const CustomButton = ({ buttonName,margingTOP,btnTextColor, btnColor = COLORS.themeColor, onPress, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: btnColor, opacity: disabled ? 0.6 : 1 ,marginTop:margingTOP, borderColor: btnColor === COLORS.white ? COLORS.black : 'transparent', borderWidth: btnColor === COLORS.white ? 1 : 0}]}
      onPress={onPress} activeOpacity={2}
      disabled={disabled}
    >
      <Text style={[styles.buttonText,{color:btnTextColor}]}>{buttonName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
    paddingVertical: hp('1.6%'),
    borderRadius: 25, 
    width: wp('90%'),
    alignItems: 'center',
    alignSelf:'center',
    marginTop: hp('5%'),
  },
  buttonText: {
    color: '#fff',
     fontSize: hp('1.8%'),
    fontWeight: '600',
  },
});

export default CustomButton;