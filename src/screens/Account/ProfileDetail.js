import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
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
import Toast from 'react-native-simple-toast';
import { store } from '../../redux/store';
import {
  getPresignedUrl,
  getUserProfile,
  updateUserProfile,
  uploadImageToS3,
} from '../../api/profileApi';
import { isTablet } from '../../components/TabletResponsiveSize';

const ProfileDetail = ({ navigation }) => {
  const userId = store?.getState()?.auth?.user;
  const [countryCode, setCountryCode] = useState('IN');
  const [callingCode, setCallingCode] = useState('+91');
  const [phoneNumber, setphoneNumber] = useState('');
  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Male');
  const [showModal, setShowModal] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  // get profile data
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getUserProfile(userId?._id);
      if (res?.status) {
        const data = res.data;
        setCallingCode(data?.countryCode);
        setuserName(data?.name);
        setphoneNumber(data?.phoneNumber);
        setEmail(data?.email);
        setGender(data?.gender);
        setSelectedImageUri(data?.profilePhoto);
      }
    } catch (error) {
      console.log('Error fetching profile:', error);
    } finally {
      setLoading(false); // <-- STOP LOADER
    }
  };

  // update profile api
  const handleUpdateProfile = async () => {
    setLoading(true);

    try {
      let cleanImageUrl = '';
      if (selectedImageUri) {
        // 1️⃣ Get presigned URL
        const presRes = await getPresignedUrl();
        const presignedUrl = presRes?.data;
        console.log('Presigned URL:', presignedUrl);

        if (!presignedUrl) {
          Toast.show('Presigned URL not received');
        } else {
          console.log('ßß');
        }

        // // 2️⃣ Upload image to S3
        if (selectedImageUri) {
          await uploadImageToS3(presignedUrl, selectedImageUri);
        }

        // // 3️⃣ Clean S3 URL (remove ?)
        cleanImageUrl = presignedUrl.split('?')[0];
      }
      // 4️⃣ Update profile API body
      const body = {
        userId: String(userId?._id),
        userName: String(userName),
        gender: gender,
        email: String(email),
        profilePhotoUrl: cleanImageUrl || '',
      };

      // 5️⃣ Call update profile API
      const res = await updateUserProfile(body);
      console.log('Update Profile Body:', res);

      if (res?.status) {
        Toast.show('Profile updated successfully');
      }
    } catch (error) {
      console.log('Profile Update Error:', error);
      Toast.show('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={Homestyles.workcontainer}>
      <Header title="Profile Detail" onBack={() => navigation.goBack()} />

      {loading ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading...</Text>
      ) : (
        <>
          <ScrollView
            style={Homestyles.workscrollstyle}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              activeOpacity={6}
              onPress={() => setShowModal(true)}
            >
              <ImageBackground
                source={
                  selectedImageUri
                    ? { uri: selectedImageUri }
                    : images.userProfile
                }
                imageStyle={Homestyles.profilestyle}
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
              placeholder="User Name"
              keyboardType="default"
              placeholderTextColor={COLORS.textColor}
              value={userName}
              onChangeText={txt => setuserName(txt)}
              borderRadius={hp('14%')}
              MarginBottom={hp('0.5%')}
              MarginTop={isTablet ? hp(10) : hp(5)}
              onSubmitEditing={() => Keyboard.dismiss()}
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
                    phoneNumber={phoneNumber}
                    setPhoneNumber={val => {
                      onChange(val);
                      setphoneNumber(val);
                    }}
                    error={errors.phoneNumber?.message}
                  />
                )}
              />
            </View>
            {/* Email Address */}
            <CunstomInput
              label="Email Address"
              placeholder="Enter Email"
              keyboardType="email-address"
              value={email}
              onChangeText={txt => setEmail(txt)}
              borderRadius={hp('14%')}
              MarginBottom={hp('1%')}
              MarginTop={isTablet ? hp(7) : hp(2)}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
            {/* Gender */}
            <CustomPicker
              label="Gender"
              value={gender}
              onChange={value => setGender(value)}
              items={[
                { label: 'MALE', value: 'MALE' },
                { label: 'FEMALE', value: 'FEMALE' },
                { label: 'OTHER', value: 'OTHER' },
              ]}
              width={wp(90)}
              height={hp('5%')}
              borderRadius={hp('4%')}
            />
          </ScrollView>
        </>
      )}

      <View style={[Homestyles.servicesSection, { minHeight: hp(8) }]}>
        <CustomButton
          buttonName="Update"
          margingTOP={hp('0%')}
          btnTextColor={COLORS.white}
          btnColor={COLORS.themeColor}
          onPress={handleUpdateProfile}
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
