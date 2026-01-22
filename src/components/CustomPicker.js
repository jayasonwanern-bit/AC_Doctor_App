import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CustomPicker = ({
  label,
  items,
  value,
  mainViewwidth,
  onChange,
  width = wp('90%'),
  height = hp('5%'),
  borderRadius = hp('3%'),
  placeholder = { label: 'Select an option', value: null },
  icon = null,
  backgroundColor = '#fff',
  borderColor = '#d9d9d9',
}) => {
  return (
    <View style={[styles.inputGroup, { mainViewwidth, zIndex: 100 }]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.wrapper,
          {
            width,
            height,
            borderRadius,
            backgroundColor,
            borderColor,
          },
        ]}
      >
        <RNPickerSelect
          // useNativeAndroidPickerStyle={false}
          onValueChange={onChange}
          items={items}
          value={value}
          placeholder={placeholder}
          useNativeAndroidPickerStyle={false}
          pickerProps={{
            itemStyle: {
              color: 'black',
              fontSize: hp('1.6%'),
            },
          }}
          style={{
            inputIOS: {
              width: width * 0.93,
              height,
              fontSize: hp('1.6%'),
              color: value ? '#333' : '#5d5d5d', // 👈 selected vs placeholder
            },
            inputAndroid: {
              width: width * 0.88,
              height,
              fontSize: hp('1.6%'),
              color: value ? '#333' : '#5d5d5d',
            },
            iconContainer: {
              top: height * 0.25,
              color: '#333',
            },
          }}
          Icon={() =>
            icon || (
              <FastImage
                source={require('../assets/icons/arrowdown.png')}
                style={{
                  width: wp('4%'),
                  height: hp('2.5%'),
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            )
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: hp(0.1),
    overflow: 'visible', // 👈 FIX
    zIndex: 100,
  },
  inputGroup: {
    marginVertical: hp('0.8%'),
    zIndex: 100, // 👈 important when multiple pickers
    alignSelf: 'center',
  },
  label: {
    fontSize: hp('1.6%'),
    marginBottom: hp('1%'),
    color: '#201f1fff',
    fontWeight: '400',
  },
});

export default CustomPicker;
