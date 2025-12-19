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
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
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
import { setToken } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast'

const phoneSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
});

const LoginScreen = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState('IN'); // Default India
  const [callingCode, setCallingCode] = useState('+91'); // Default calling code
    const [loading, setLoading] = useState(false);

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
      setLoading(true)
      const res = await loginUser(postdata);
      console.log('Login screen Response:-->', res);
      // ==== Save Token ====    
      dispatch(setToken({ accessToken: res?.data?.assessToken }));
      navigation.navigate('Verification', {
        phoneNumber: data.phoneNumber,
        callingCode: callingCode,
        otp: res.data.otp,
        userId: res.data.userId,
        isAutoTesting: false, //// only for development notification
      });
       Toast.show("Login Success", Toast.LONG);
       Keyboard.dismiss()
    } catch (error) {
       Toast.show("500",error, Toast.LONG);

      setLoading(false)
      console.log('Login Error:', error);
    }
    finally {
    setLoading(false);   
  }
  };



  return (
  <SafeAreaView style={styles.container}>
  <StatusBar barStyle="dark-content" />
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      extraScrollHeight={hp('8%')}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
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
            disabled={!isValid || loading}
          >
            <View style={{flexDirection:'row'}}>

            <Text style={styles.buttonText}>Get Verification Code</Text>
            {
              loading?(
                <ActivityIndicator color={COLORS.white} size={'small'} />
              ):null
            }
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
</SafeAreaView>
  );
};

const styles = StyleSheet.create({
 contentContainer: {
  flexGrow: 1,
  // paddingBottom: hp('5%'), // prevents button cut-off
},
  container: {
    flex: 1,
    padding: wp('5%'),
    backgroundColor: COLORS.white,
  },
  mainView: {
  flexGrow: 1,
  paddingTop: hp('4%'),
},
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
    marginTop: hp('2%'),
  },
  buttonText: {
    color: COLORS.white,
    fontSize: hp('1.7%'),
    fontFamily: Fonts.semiBold,
    marginRight:10
  },

});

export default LoginScreen;
