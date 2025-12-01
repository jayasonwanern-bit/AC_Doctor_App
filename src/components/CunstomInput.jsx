import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../utils/colors';

const CunstomInput = ({
  label,
  value,
  onChangeText = () => {},
  placeholder = '',
  keyboardType = 'default',
  secureTextEntry = false,
  borderColor = COLORS.lightGray,
  borderRadius = hp(1.6),
  MarginTop = 0,
  MarginBottom = 0,
  backgroundColor = '#fff',
  textColor = COLORS.textColor || '#333',
  placeholderTextColor = COLORS.inputColour || '#999',
  style = {},
  containerStyle = {},
  multiline = false,
  numberOfLines = 1,
  maxLength = null,
  leftIcon = null,
  rightIcon = null,
  showToggle = true,
  onSubmitEditing = () => {},
  returnKeyType = 'done',
  secureTextToggleLabel = { show: 'Show', hide: 'Hide' },
}) => {
  const [secure, setSecure] = useState(secureTextEntry);

  return (
    <View
      style={[
        styles.wrapper,
        containerStyle,
        {
          marginBottom: MarginBottom,
          marginTop: MarginTop,
        },
      ]}
    >
      {label && (
        <Text style={multiline ?[styles.label,{marginLeft:7}] :styles.label}>
          {label}
        </Text>
      )}

      <View
        style={[
          multiline ? styles.textAreaWrapper : styles.inputRow,
          {
            borderColor,
            backgroundColor,
            borderRadius,
          },
        ]}
      >
        {leftIcon ? (
          <Image source={leftIcon} style={styles.icon} resizeMode="contain" />
        ) : null}

        <TextInput
          style={[
            styles.input,
            { color: COLORS.textColor || textColor },
            multiline ? styles.multilineInput : {},
            style,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry ? secure : false}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
        />

        {secureTextEntry && showToggle ? (
          <TouchableOpacity
            style={styles.toggleBtn}
            onPress={() => setSecure(prev => !prev)}
            activeOpacity={0.7}
          >
            <Text style={styles.toggleText}>
              {secure ? secureTextToggleLabel.show : secureTextToggleLabel.hide}
            </Text>
          </TouchableOpacity>
        ) : null}

        {rightIcon ? (
          <Image source={rightIcon} style={styles.icon} resizeMode="contain" />
        ) : null}
      </View>
    </View>
  );
};

export default CunstomInput;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignSelf:"center"     // LET parent decide
  },

  label: {
    fontSize: hp(1.5),
    color: COLORS.black,
    marginBottom: hp(0.8),
    fontFamily: Fonts.semiBold,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: hp(0.1),
    height: hp(5.2),
    paddingHorizontal: wp(3),
    // width: '95%',         // FULL responsive
  },

  textAreaWrapper: {
    borderWidth: hp(0.1),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    width: '95%',
    backgroundColor:'red',
    alignSelf:'center'
  },
  multilineInput: {
    textAlignVertical: 'top',
    minHeight: hp(10),
  },
  input: {
    flex: 1,
    fontSize: hp(1.7),
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
  },

  icon: {
    width: wp(5),
    height: hp(3),
    marginRight: wp(2),
  },

  toggleBtn: {
    paddingHorizontal: wp(1),
  },

  toggleText: {
    fontSize: hp(1.4),
    color: COLORS.themeColor,
  },
});
