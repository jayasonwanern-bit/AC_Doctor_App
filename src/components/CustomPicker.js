import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import FastImage from 'react-native-fast-image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomPicker = ({
  label,
  items,
  value,
  onChange,
  width = wp('90%'),
  height = hp('5%'),
  borderRadius = hp('3%'),
  placeholder = { label: 'Select option', value: null },
  icon = null,
  backgroundColor = '#fff',
  borderColor = '#d9d9d9',
}) => {
  return (
    <View style={[styles.inputGroup, { width, zIndex: 100 }]}>
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
          onValueChange={onChange}
          items={items}
          value={value}
          placeholder={placeholder}
          useNativeAndroidPickerStyle={false}
          style={{
            inputIOS: {
              width: width * 0.88,
              height,
              fontSize: hp('1.6%'),
              color: '#333',
            },
            inputAndroid: {
              width: width * 0.88,
              height,
              fontSize: hp('1.6%'),
              color: '#333',
            },
            iconContainer: {
              top: height * 0.25,
            },
          }}
          Icon={() =>
            icon || (
              <FastImage
                source={require('../assets/icons/arrowdown.png')}
                style={{
                  width: wp('4%'),
                  height: hp('2.5%'),
                  tintColor: '#c37e7e',
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
    justifyContent:'space-around',
    alignItems: 'center',
    borderWidth: hp(0.1),
    overflow: 'visible', // 👈 FIX
    zIndex: 100, 
  },
  inputGroup: {
    marginVertical: hp('0.8%'),
    zIndex: 100, // 👈 important when multiple pickers
  },
  label: {
    fontSize: hp('1.5%'),
    marginBottom: hp('1.5%'),
    color: '#444',
    fontWeight: '600',
  },
});

export default CustomPicker;
