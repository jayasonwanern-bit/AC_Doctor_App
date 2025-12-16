import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../../utils/colors';
import OTPTextInput from 'react-native-otp-textinput';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import CustomButton from '../../components/CustomButton';
import { resendOTP, VerifyOTP } from '../../api/authApi';
import useCountdown from '../../utils/hooks/useCountdown';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../redux/slices/authSlice';
import Toast from 'react-native-simple-toast';

const VerificationScreen = ({ navigation, route }) => {
  const {
    phoneNumber,
    callingCode,
    otp: serverOtp,
    userId,
    isAutoTesting,
  } = route.params;
  const [serverOtpState, setServerOtpState] = useState(serverOtp);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const intervalRef = useRef(null);
  const { time, startCountdown, resetCountdown, status, formatTime } =
    useCountdown();
  const dispatch = useDispatch();

  useEffect(() => {
    startCountdown(30);
  }, [startCountdown]);

  const handleVerify = async () => {
    if (otp.length !== 4) {
      setError('Please enter a 4-digit OTP');
      return;
    }

    const postdata = {
      otp: Number(otp),
      userId: userId,
    };

    try {
      const res = await VerifyOTP(postdata);
      // console.log("Response:", res);
      if (res?.data?.status === true) {
        dispatch(setUser({ user: res?.data?.data }));
        dispatch(setToken({ accessToken: res?.data?.data?.refreshToken }));

        Toast.show(res?.data?.message || 'Verified Successfully');

        navigation.replace('ServiceScreen');
      }
      // failed case (but server returned status 200)
      else {
        Toast.show(res?.data?.message || 'Invalid OTP');
      }
    } catch (error) {
      console.log('Catch Error:', error);

      // SERVER SENT ERROR MESSAGE (like status 410)
      if (error?.response?.data?.message) {
        Toast.show(error?.response?.data?.message);
      }
      // If message missing show default
      else {
        Toast.show('Something went wrong');
      }
    }
  };

  // resend otp
  const handleResendOTP = async () => {
    try {
      let data = {
        phoneNumber: phoneNumber,
        countryCode: callingCode,
      };
      const result = await resendOTP(data);
      if (result?.status) {
        Toast.show('OTP Resend');
        setServerOtpState(result?.otp);
        // Timer
        resetCountdown();
        startCountdown(30);

        // Save in Redux
        dispatch(setUser({ user: result?.data }));
        dispatch(setToken({ accessToken: result?.data?.refreshToken }));
      }
    } catch (error) {
      console.log('handleResendOTP:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <FastImage
          source={images.backArrow}
          style={styles.backImg}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Verification code</Text>
      <Text style={styles.title}>{serverOtpState}</Text>
      <FastImage
        source={images.otpIcon}
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.otptitle}>Enter OTP to Verify</Text>
      <Text style={styles.subtitle}>
        We've sent a 4-digit code to {callingCode}{' '}
        {phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1XXXX$3')}
      </Text>
      <OTPTextInput
        inputCount={4}
        keyboardType="numeric"
        autoFocus={true}
        handleTextChange={text => {
          setOtp(text);
          if (text.length === 4) {
            Keyboard.dismiss(); // ✅ closes keyboard
          }
        }}
        defaultValue={otp}
        containerStyle={styles.otpContainer}
        textInputStyle={styles.otpInput}
        tintColor={COLORS.themeColor} // Active box color
        offTintColor={COLORS.borderColor} // Inactive box color
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity
        onPress={() => {
          status !== 'running' && handleResendOTP();
        }}
      >
        <Text style={[styles.resendTitle, { color: COLORS.black }]}>
          {status === 'running' ? formatTime(time) : 'Resend OTP'}
        </Text>
      </TouchableOpacity>

      <CustomButton
        buttonName="Submit"
        margingTOP={hp('3%')}
        btnTextColor={COLORS.white}
        btnColor={otp.length === 4 ? COLORS.themeColor : COLORS.disabledGrey}
        onPress={handleVerify}
        disabled={otp.length !== 4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
    backgroundColor: COLORS.white,
  },
  backButton: {
    marginBottom: hp('2%'),
  },
  title: {
    fontSize: hp('2.5%'),
    fontFamily: Fonts.bold,
    textAlign: 'center',
    color: COLORS.black,
  },
  image: {
    width: wp('35%'),
    height: hp('20%'),
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: hp('4%'),
  },
  backImg: {
    width: wp('5%'),
    height: hp('5%'),
    resizeMode: 'contain',
    marginTop: hp('1.5%'),
  },
  subtitle: {
    fontSize: hp('1.5%'),
    fontFamily: Fonts.semiBold,
    textAlign: 'left',
    color: COLORS.textHeading,
    marginBottom: hp('1%'),
  },
  otptitle: {
    fontSize: hp('1.4%'),
    fontFamily: Fonts.medium,
    textAlign: 'left',
    marginBottom: hp('1%'),
    color: COLORS.black,
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  resendTitle: {
    fontSize: hp('1.5%'),
    fontFamily: Fonts.semiBold,
    textAlign: 'center',
    color: COLORS.themeColor,
  },
  otpContainer: {
    alignSelf: 'center',
    marginBottom: hp('1%'),
    marginTop: hp('0.5%'),
  },
  otpInput: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: 20,
    width: wp('13%'),
    height: Platform.OS === 'android' ? hp('6%') : hp('5%'),
    fontSize: hp('2.5%'),
    textAlign: 'center',
  },
  errorText: {
    color: COLORS.errorRed,
    fontSize: hp('1.8%'),
    marginVertical: hp('1%'),
    textAlign: 'center',
  },
});

export default VerificationScreen;
