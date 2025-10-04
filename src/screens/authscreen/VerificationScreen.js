import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../../utils/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OTPTextInput from 'react-native-otp-textinput';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import CustomButton from '../../components/CustomButton';
// import { verifyOTP } from '../utils/api';

const VerificationScreen = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  const { callingCode } = route.params;
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [canResend, setCanResend] = useState(false); // Resend enable/disable
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleVerify = async () => {
    if (otp.length !== 4) {
      setError('Please enter a 4-digit OTP');
      return;
    }
    try {
    //   const result = await verifyOTP(phoneNumber, otp);
    //   if (result.success) {
        navigation.navigate('ServiceScreen');
    //   } else {
    //     setError('Invalid OTP');
    //   }
    } catch (error) {
      setError('Verification failed');
    }
  };

  const handleResendOTP = async () => {
    if (canResend) {
      try {
        // TODO: API call to resend OTP (e.g., await sendOTP(phoneNumber))
        setTimer(120); 
        setCanResend(false); 
        intervalRef.current = setInterval(() => {
          setTimer(prev => {
            if (prev <= 1) {
              clearInterval(intervalRef.current);
              setCanResend(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        setError(''); // Clear error on resend
      } catch (error) {
        setError('Failed to resend OTP');
      }
    }
  };

  // Format timer as MM:SS
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
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
        handleTextChange={text => setOtp(text)}
        containerStyle={styles.otpContainer}
        textInputStyle={styles.otpInput}
        tintColor={COLORS.themeColor} // Active box color
        offTintColor={COLORS.borderColor} // Inactive box color
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Text style={[styles.resendTitle,{color: COLORS.black}]}>{formatTime(timer)}</Text>

      <CustomButton
        buttonName="Submit"
        margingTOP={hp('6%')}
        btnTextColor={COLORS.white}
        btnColor={otp.length === 4 ? COLORS.themeColor : COLORS.disabledGrey}
        onPress={handleVerify}
        disabled={otp.length !== 4}
      />
      <TouchableOpacity
        style={styles.resendContainer}
        onPress={handleResendOTP}
        disabled={!canResend}
      >
        <Text style={[styles.resendTitle]}>
         Resend OTP
        </Text>
      </TouchableOpacity>
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
    marginVertical: hp('3%'),
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
    width: wp('14%'),
    height: hp('5%'),
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
