import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { getBookingDetail } from '../../api/settingApi';
import Header from '../../components/Header';
import { COLORS, Fonts } from '../../utils/colors';

const BookingDetailsScreen = ({ navigation, route }) => {
  const { bookingId } = route.params;
  console.log('bookingId--->', bookingId);
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    getBrandList();
  }, []);

  const getBrandList = async () => {
    try {
      setLoading(true);
      console.log('bookingId--->', bookingId);
      const res = await getBookingDetail(bookingId);
      console.log('res get--->', res.data);
      setBookingData(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }



  // render
  return (
    <View style={styles.container}>
      <Header title="Booking Details" onBack={() => navigation.goBack()} />
      {loading ? <ActivityIndicator /> : <ScrollView contentContainerStyle={styles.scrollcontain}>
        <Text style={styles.heading}>Booking Details</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Booking ID:</Text>
          <Text style={styles.value}>{bookingData.bookingId}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{bookingData.status}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Service Date:</Text>
          <Text style={styles.value}>
            {new Date(bookingData.date).toDateString()}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.value}>₹{bookingData.amount}</Text>
        </View>

        <Text style={styles.subHeading}>Service Details</Text>
        {bookingData.serviceDetails?.map((item, index) => (
          <View key={index} style={styles.card}>
            {item.as_details?.map((detail, i) => (
              <View key={i}>
                <Text style={styles.label}>Service Type:</Text>
                <Text style={styles.value}>{detail.serviceType}</Text>

                <Text style={styles.label}>Quantity:</Text>
                <Text style={styles.value}>{detail.quantity}</Text>

                <Text style={styles.label}>Comment:</Text>
                <Text style={styles.value}>{detail.comment || 'N/A'}</Text>
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.subHeading}>Address Details</Text>
        {bookingData.addressDetails?.map((addr, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.value}>
              {addr.house}, {addr.street} {addr.city}, {addr.state} -{' '}
              {addr.zipcode}
            </Text>
            <Text style={styles.value}>Landmark: {addr.landmark}</Text>
          </View>
        ))}
      </ScrollView>}
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
