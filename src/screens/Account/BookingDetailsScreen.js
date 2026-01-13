import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { getBookingDetail } from '../../api/settingApi';
import Header from '../../components/Header';
import { COLORS, Fonts } from '../../utils/colors';
import CustomLoader from '../../components/CustomLoader';
import { useNavigation } from '@react-navigation/native';

const BookingDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const bookingData = route?.params?.bookingId;
  console.log('bookingId---', bookingData)
  const [loading, setLoading] = useState(false);




  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <CustomLoader size={40} />
      </View>
    );
  }

  // render
  return (
    <View style={styles.container}>
      <Header title="Booking Details" onBack={() => navigation.goBack()} />
      {loading ? (
        <CustomLoader size={40} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollcontain}>
          <Text style={styles.heading}>Booking Details</Text>

          <View style={styles.section}>
            <Text style={styles.label}>Booking ID:</Text>
            <Text style={styles.value}>{bookingData?.bookingId}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{bookingData?.status}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Service Date:</Text>
            <Text style={styles.value}>
              {bookingData?.date?.split('T')[0]},{bookingData?.slot}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Amount:</Text>
            <Text style={styles.value}>₹{bookingData?.amount}</Text>
          </View>

          <Text style={styles.subHeading}>Service Details</Text>
          <View style={styles.section}>
            <Text style={styles.label}>Service Type:</Text>
            <Text style={styles.value}>{bookingData?.serviceType?.join(', ')}</Text>
          </View>





          <Text style={styles.subHeading}>Payment Details</Text>

          <View style={styles.section}>
            <Text style={styles.label}>Payment status</Text>
            <Text style={styles.value}>{bookingData?.payment_status}</Text>
          </View>

        </ScrollView>
      )}
    </View>
  );
};

export default BookingDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollcontain: {
    paddingHorizontal: hp(1.5),
    paddingBottom: hp(20),
  },
  heading: {
    fontSize: hp('2%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.themeColor,
    marginVertical: hp('1.5%'),
  },

  subHeading: {
    fontSize: hp('2%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.themeColor,
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
  },

  section: {
    marginBottom: hp('1.5%'),
  },

  label: {
    fontSize: hp('1.8%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.black,
    marginBottom: hp('0.5%'),
  },

  value: {
    fontSize: hp('1.8%'),
  },

  card: {
    padding: wp('3%'),
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: COLORS.white,
    borderRadius: wp('2.5%'),
    marginBottom: hp('1.5%'),
  },
});
