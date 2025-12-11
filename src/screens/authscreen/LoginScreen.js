// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomPhoneInput from '../../components/CustomPhoneInput';
import { COLORS, Fonts } from '../../utils/colors';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import images from '../../assets/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loginUser } from '../../api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useDispatch } from 'react-redux';/
import { setToken } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const phoneSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
});

const LoginScreen = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState('IN'); // Default India
  const [callingCode, setCallingCode] = useState('+91'); // Default calling code

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(phoneSchema),
    mode: 'onChange', // Real-time validation
  });
  const dispatch = useDispatch();


  const onSubmit = async data => {
    const postdata = {
      countryCode: callingCode,
      phoneNumber: data.phoneNumber,
    };
    try {
      const res = await loginUser(postdata);
      // console.log('Login screen Response:-->', res?.data?.assessToken );
      // ==== Save Token ====    
      dispatch(setToken({ accessToken: res?.data?.assessToken }));
      navigation.navigate('Verification', {
        phoneNumber: data.phoneNumber,
        callingCode: callingCode,
        otp: res.data.otp,
        userId: res.data.userId,
        isAutoTesting: false, //// only for development notification
      });
    } catch (error) {
      console.log('Login Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
        translucent={false}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainView}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.titleHead}>Let's Keep Your AC Healthy</Text>

          <Image
            source={images.login}
            style={styles.image}
            resizeMode={'contain'}
          />

          <Text style={styles.textNumber}>
            Enter your mobile number to continue
          </Text>

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

          <Text style={styles.secureText}>
            Securing your personal information is our priority.
          </Text>

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: isValid
                  ? COLORS.themeColor
                  : COLORS.disabledGrey,
              },
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            <Text style={styles.buttonText}>Get Verification Code</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: wp('5%'),
    backgroundColor: COLORS.white,
  },
  mainView: { flex: 1, marginTop: hp(10) },
  title: {
    fontSize: hp('3.6%'),
    fontFamily: Fonts.semiBold,
    textAlign: 'center',
    color: COLORS.black,
  },
  titleHead: {
    fontSize: hp('2.5%'),
    fontFamily: Fonts.semiBold,
    textAlign: 'center',
    color: COLORS.textHeading,
  },
  textNumber: {
    fontSize: hp('1.4%'),
    fontFamily: Fonts.semiBold,
    textAlign: 'left',
    color: COLORS.black,
  },
  image: {
    width: wp('35%'),
    height: hp('20%'),
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: hp('4%'),
  },
  secureText: {
    fontSize: hp('1.5%'),
    color: Fonts.regular,
    fontFamily: '300',
    marginVertical: hp('2%'),
  },
  button: {
    paddingVertical: hp('1.6%'),
    borderRadius: 25,
    width: wp('90%'),
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('5%'),
  },
  buttonText: {
    color: COLORS.white,
    fontSize: hp('1.6%'),
    fontFamily: Fonts.semiBold,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default LoginScreen;
