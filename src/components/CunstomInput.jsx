import React, {useState} from 'react';
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
import {COLORS, Fonts} from '../utils/colors';


const CunstomInput = ({
  label,
  value,
  onChangeText = () => {},
  placeholder = '',
  keyboardType = 'default',
  secureTextEntry = false,
  borderColor = COLORS.lightGray,
  borderRadius=hp(1),
  MarginTop={},
  MarginBottom={},
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
  secureTextToggleLabel = {show: 'Show', hide: 'Hide'},
}) => {
  const [secure, setSecure] = useState(secureTextEntry);

  return (
    <View style={[styles.wrapper, containerStyle,{marginBottom:MarginBottom, marginTop:MarginTop}]}>
       {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputRow,
          {borderColor: borderColor, backgroundColor: backgroundColor , borderRadius:borderRadius},
        ]}
      >
        {leftIcon ? (
          <Image source={leftIcon} style={styles.icon} resizeMode="contain" />
        ) : null}

        <TextInput
          style={[
            styles.input,
            {color: textColor},
            multiline ? {height: hp(10), textAlignVertical: 'top'} : {},
            style,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          secureTextEntry={secure}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
        />

        {/* If secure toggle enabled and field is secure */}
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
    marginTop: hp('1%'),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: hp(0.1),
    borderRadius: hp(1),
    height: hp(5),
    paddingHorizontal: wp(3),
    backgroundColor: '#fff',
  },
   label: {
    fontSize: hp('1.5%'),
    color: COLORS.black,
    marginBottom: hp('1.5%'),
    fontFamily: Fonts.semiBold,
  },
  input: {
    flex: 1,
    fontSize: hp('1.6%'),
    paddingVertical: Platform.OS === 'ios' ? 8 : 0,
  },
  icon: {
    width: wp(5),
    height: hp(3),
    marginRight: wp(3),
  },
  toggleBtn: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
  },
  toggleText: {
    fontSize: hp('1.4%'),
    color: COLORS.themeColor,
    fontFamily: Fonts.medium,
  },
});




// normal textinput
//<CunstomInput
//   label="Alternate Number"
//   placeholder="Enter number"
//   keyboardType="phone-pad"
//   value={formData.alternateNumber}
//   onChangeText={val => handleInputChange('alternateNumber', val)}
//   borderRadius={hp('3%')}
// />

{/*
  //Description Input
  <CunstomInput
  label="Additional Notes"
  placeholder="Type here..."
  multiline
  numberOfLines={5}
  value={formData.additionalNotes}
  onChangeText={val => handleInputChange('additionalNotes', val)}
  borderRadius={hp('2.5%')}
  backgroundColor="#fafafa"
/> */}

//input with Icon
{/* <CunstomInput
  label="Your Name"
  placeholder="Enter name"
  value={name}
  onChangeText={setName}
  iconLeft={require('../assets/icons/user.png')}
  borderRadius={hp('3%')}
/> */}



