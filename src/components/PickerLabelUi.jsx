// components/SinglePicker.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import { COLORS, Fonts } from '../utils/colors';
import images from '../assets/images';

/**
 * Reusable Single Picker Component
 *
 * @param {string} label - Label text (e.g., "Brand", "Tonnage")
 * @param {string} value - Selected value to display
 * @param {string} placeholder - Text when nothing selected
 * @param {function} onPress - Function to open modal/picker
 * @param {object} style - Extra style for container
 * @param {boolean} required - Show red * if true
 * @param {boolean} droparraw - Show red * if true
 * @param {object} icon - Custom icon (default: arrowdown)
 * @param {number} width - Custom width (default: wp(88))
 */

const PickerLabelUi = ({
  label = '',
  value = '',
  placeholder = 'Select',
  onPress,
  style,
  required = false,
  droparraw=false,
  icon = images.arrowdown,
  width = wp(88),
  marginBottom = 0,
  marginTop = 0,
}) => {
  return (
    <View style={[styles.container, style, { marginTop, marginBottom }]}>
      {label ? (
        <Text style={styles.label}>
          {label}
          {required && <Text style={{ color: 'red' }}>*</Text>}
        </Text>
      ) : null}

      <TouchableOpacity
        style={[styles.pickerWrapper, { width }]}
        onPress={onPress}
      >
        <Text
          style={[styles.pickerText, { color: value ? '#585656ff' : '#999' }]}
          numberOfLines={1}
        >
          {value || placeholder}
        </Text>

        {droparraw && <FastImage
          source={icon}
          style={styles.arrowIcon}
          resizeMode={FastImage.resizeMode.contain}
        />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp(1),
    marginHorizontal: wp(2),
  },
  label: {
    fontSize: hp('1.5%'),
    color: COLORS.black,
    marginBottom: hp('1.5%'),
    fontFamily: Fonts.semiBold,
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffffff',
    borderRadius: wp('9%'),
    borderWidth: hp(0.1),
    borderColor: '#ddd',
    height: hp('5%'),
    paddingHorizontal: wp(4),
    alignSelf: 'center',
  },
  pickerText: {
    fontSize: hp('1.5%'),
    fontFamily: Fonts.medium,
    flex: 1,
  },
  arrowIcon: {
    width: wp('5%'),
    height: hp('4%'),
    tintColor: '#c37e7eff',
  },
});

export default PickerLabelUi;
