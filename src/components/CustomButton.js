import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../utils/colors';
import CustomLoader from './CustomLoader';
import { isTablet } from './TabletResponsiveSize';

const CustomButton = ({
  buttonName,
  margingTOP,
  btnTextColor,
  btnColor = COLORS.themeColor,
  onPress,
  disabled = false,
  Loader,
  marginBottom
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: btnColor,
          opacity: disabled ? 0.6 : 1,
          marginTop: margingTOP,
          marginBottom: marginBottom,
          borderColor: btnColor === COLORS.white ? COLORS.black : 'transparent',
          borderWidth: btnColor === COLORS.white ? 1 : 0,
        },
      ]}
      onPress={onPress}
      activeOpacity={2}
      disabled={disabled}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[styles.buttonText, { color: btnTextColor }]}>
          {buttonName}
        </Text>
        {Loader ? <CustomLoader size='small' style={{ marginLeft: 5 }} /> : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: isTablet ? hp('1.6%') : hp('1.3%'),
    borderRadius: 25,
    width: wp('90%'),
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('5%'),
  },
  buttonText: {
    color: '#fff',
    fontSize: hp('2%'),
    fontWeight: '600',
  },
});

export default CustomButton;
