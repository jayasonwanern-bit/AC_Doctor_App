import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  StyleSheet,
} from 'react-native';
import Header from '../../components/Header';
import Homestyles from '../Home/HomeScreenStyles';
import images from '../../assets/images';
import FastImage from 'react-native-fast-image';
import { TextInput } from 'react-native-gesture-handler';
import CustomButton from '../../components/CustomButton';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/colors';
import { useForm, Controller } from 'react-hook-form';
import CustomPhoneInput from '../../components/CustomInput';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RNPickerSelect from 'react-native-picker-select';

const ProfileDetail = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState('IN'); // Default India
  const [callingCode, setCallingCode] = useState('+91');
  const [userName, setuserName] = useState('Rahul Kumar');
  const [email, setEmail] = useState('rahulkumar@gmail.com');
  const [gender, setGender] = useState('Male');

  const phoneSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .required('Mobile number is required')
      .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
  });

  // validation for mobile
  const {
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(phoneSchema),
    mode: 'onChange', // Real-time validation
  });

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  // render
  return (
    <View style={Homestyles.workcontainer}>
      <Header title="Profile Detail" onBack={() => navigation.goBack()} />

      <ScrollView
        style={Homestyles.workscrollstyle}
        showsVerticalScrollIndicator={false}
      >
        {' '}
        <ImageBackground
          source={images.userphoto}
          style={Homestyles.profileDetailBg}
        >
          <FastImage
            source={images.profileCamera}
            style={Homestyles.cameraStyle}
          />
        </ImageBackground>
        <View style={Homestyles.profileDetailInfoContainer}>
          <Text style={Homestyles.profileDetailName}>Name</Text>
          <TextInput
            style={Homestyles.profileDetailInput}
            placeholder="Rahul Kumar"
            value={userName}
            onChangeText={txt => setuserName(txt)}
          />
        </View>
        <View style={Homestyles.profileDetailInfoContainer}>
          <Text style={Homestyles.profileDetailName}>Name</Text>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, value } }) => (
              <CustomPhoneInput
                countryCode={countryCode}
                callingCode={callingCode}
                setCountryCode={setCountryCode}
                setCallingCode={setCallingCode}
                phoneNumber={value}
                setPhoneNumber={onChange}
                error={errors.phoneNumber?.message}
              />
            )}
          />
        </View>
        <View style={Homestyles.profileDetailInfoContainer}>
          <Text style={Homestyles.profileDetailName}>Email Address</Text>
          <TextInput
            style={Homestyles.profileDetailInput}
            placeholder="RahulKumar@gmail.com"
            value={email}
            onChangeText={txt => setEmail(txt)}
          />
        </View>
        <View style={Homestyles.profileDetailInfoContainer}>
          <Text style={Homestyles.profileDetailName}>Gender</Text>
          <RNPickerSelect
            placeholder={{ label: 'Select Gender', value: null, color: '#999' }}
            items={genderOptions}
            onValueChange={value => setGender(value)}
            value={gender}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => (
              <Image
                source={images.arrowdown} // ya icon
                style={styles.dropdownIcon}
              />
            )}
          />
        </View>
      </ScrollView>

      <View style={[Homestyles.servicesSection, { minHeight: hp(8) }]}>
        <CustomButton
          buttonName="Update"
          margingTOP={hp('0%')}
          btnTextColor={COLORS.white}
          btnColor={COLORS.themeColor}
          onPress={() => navigation.navigate('PaymentScreen')}
        />
      </View>
    </View>
  );
};

export default ProfileDetail;
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  dropdownIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.themeColor,
    marginRight: 10,
    marginTop: 7,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    ...Homestyles.profileDetailInput,
    paddingRight: 40, // arrow ke liye space
    color: COLORS.black,
  },
  inputAndroid: {
    ...Homestyles.profileDetailInput,
    paddingRight: 40,
    color: COLORS.black,
  },
  placeholder: {
    color: '#999',
  },
  iconContainer: {
    top: 15,
    right: 10,
  },
};
