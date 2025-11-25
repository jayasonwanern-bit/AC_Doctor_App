import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import Homestyles from '../Home/HomeScreenStyles';
import images from '../../assets/images';
import FastImage from 'react-native-fast-image';
import CustomButton from '../../components/CustomButton';
import { COLORS } from '../../utils/colors';
import { useForm, Controller } from 'react-hook-form';
import CustomPhoneInput from '../../components/CustomPhoneInput';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomPicker from '../../components/CustomPicker';
import ImagePickerModal from '../../components/ImagePickerModal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CunstomInput from '../../components/CunstomInput';

const ProfileDetail = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState('IN'); 
  const [callingCode, setCallingCode] = useState('+91');
  const [userName, setuserName] = useState('Rahul Kumar');
  const [email, setEmail] = useState('rahulkumar@gmail.com');
  const [gender, setGender] = useState('Male');
  const [showModal, setShowModal] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

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

  // render
  return (
    <View style={Homestyles.workcontainer}>
      <Header title="Profile Detail" onBack={() => navigation.goBack()} />

      <ScrollView
        style={Homestyles.workscrollstyle}
        showsVerticalScrollIndicator={false}
      >
        {' '}
        <TouchableOpacity activeOpacity={6} onPress={() => setShowModal(true)}>
          <ImageBackground
            source={
              selectedImageUri ? { uri: selectedImageUri } : images.userphoto
            }
            style={Homestyles.profileDetailBg}
          >
            <FastImage
              source={images.profileCamera}
              style={Homestyles.cameraStyle}
            />
          </ImageBackground>
        </TouchableOpacity>

       {/* User Name */}
         <CunstomInput
          label="User Name"
          placeholder="Rahul Kumar"
          keyboardType='default'
          value={userName}
          onChangeText={txt => setuserName(txt)}
          borderRadius={hp('14%')}
          MarginBottom={hp('0.5%')}
        />

        {/* Mobile Number */}
        <View style={Homestyles.profileDetailInfoContainer}>
          <Text style={Homestyles.profileDetailName}>Mobile Number</Text>
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

        {/* Email Address */}
        <CunstomInput
          label="Email Address"
          placeholder="RahulKumar@gmail.com"
          keyboardType="email-address"
          value={email}
          onChangeText={txt => setEmail(txt)}
          borderRadius={hp('14%')}
          MarginBottom={hp('1%')}
        />

        {/* Gender */}
        <CustomPicker
          label="Gender"
          value={gender}
          onChange={value => setGender(value)}
          items={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
          ]}
          width={wp('90%')} 
          height={hp('5%')} 
          borderRadius={hp('4%')} 
        />
      </ScrollView>

      <View style={[Homestyles.servicesSection, { minHeight: hp(8) }]}>
        <CustomButton
          buttonName="Update"
          margingTOP={hp('0%')}
          btnTextColor={COLORS.white}
          btnColor={COLORS.themeColor}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ImagePickerModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onImageSelect={uri => {
          console.log('Image Path:', uri);
          setSelectedImageUri('file://' + uri);
        }}
      />
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

