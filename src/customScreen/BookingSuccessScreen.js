import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import images from '../assets/images'; // Your check icon
import Header from '../components/Header';
import { COLORS, Fonts } from '../utils/colors';

const BookingSuccessScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Tab', params: { screen: 'Shop' } }],
      });
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      {/* Success Icon */}
      <View style={styles.iconContainer}>
        <FastImage
          source={images.SuccessIcon} // Replace with your blue check icon
          style={styles.checkIcon}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>Booking Successful</Text>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.orderId}>Order ID : 2001</Text>
        <Text style={styles.message}>
          Dear customer, Thankyou so much for your order. very soon our
          professional will contact you
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  checkIcon: {
    width: 100,
    height: 100,
    tintColor: COLORS.white, // White checkmark
  },
  title: {
    fontSize: hp(2),
    fontFamily: Fonts.semiBold,
    color: COLORS.black,
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: COLORS.white,
    width: '100%',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  orderId: {
    fontSize: hp(1.6),
    fontFamily: Fonts.semiBold,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default BookingSuccessScreen;
