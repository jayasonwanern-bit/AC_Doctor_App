import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import images from '../../assets/images';
import { COLORS, Fonts } from '../../utils/colors';

const AMCDashBoard = ({ navigation }) => {
  const acTypes = [
    { name: 'Split AC', icon: images.SplitAMC, onPress: () => {} },
    { name: 'Window AC', icon: images.windowAc, onPress: () => {} },
    { name: 'Cassette AC', icon: images.casseteAc, onPress: () => {} },
  ];

  const services = [
    {
      title: 'AMC Dashboard',
      icon: images.dashboardIcon,
      onPress: () => navigation.navigate('AMCDashboard'),
    },
    { title: 'Request a new Booking', onPress: () => {} },
    { title: 'Past Bookings', icon: images.postBooking, onPress: () => {} },
    { title: 'Bills', icon: images.BillsAMS, onPress: () => {} },
  ];

  const stats = [
    { label: 'Total Servicing Per Unit', value: 4 },
    { label: 'Total Servicing Completed', value: 2 },
    { label: 'Remaining Servicing', value: 4 },
  ];

  return (
    <View style={styles.mainContainer}>
      <Header title="AMC DashBoard" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Total AC Container */}
        <View style={styles.acBox}>
          <Text style={styles.heading}>Total AC Under AMC</Text>

          <View style={styles.acRow}>
            {acTypes.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.acItem}
                onPress={item.onPress}
              >
                <View style={styles.acIconCircle}>
                  <Image source={item.icon} style={styles.acIcon} />
                </View>
                <Text style={styles.acName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Services Section */}
        <Text style={styles.serviceHeading}>Services</Text>

        <View style={styles.serviceBox}>
          {services.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.serviceItem}
              onPress={item.onPress}
            >
              <View style={styles.serviceIconCircle}>
                <Image source={item.icon} style={styles.serviceIcon} />
                 {item.title === 'Request a new Booking' && <Text style={styles.bookText}>15</Text>}
              </View>
              <Text style={styles.serviceText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Section */}
        {stats.map((item, index) => (
          <View key={index} style={styles.statCard}>
            <View style={styles.statCircle}>
              <Text style={styles.statNumber}>{item.value}</Text>
            </View>
            <Text style={styles.statLabel}>{item.label}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Floating Chat Button */}
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => navigation.navigate('Chat')}
      >
        <Image source={images.chatIcon} style={styles.chatIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default AMCDashBoard;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  // ------------------ Total AC Box ----------------------
  acBox: {
    backgroundColor: COLORS.white,
    margin: wp('4%'),
    borderRadius: 16,
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('3%'),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },

  heading: {
    fontSize: hp('1.5%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.black,
  },

  acRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
  },

  acItem: {
    alignItems: 'center',
    width: wp('26%'),
  },

  acIconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  acIcon: {
    width: wp('13%'),
    height: wp('13%'),
    resizeMode: 'contain',
  },

  acName: {
    marginTop: hp('1%'),
    fontSize: hp('1.4%'),
    fontFamily: Fonts.medium,
    color: '#333',
  },

  // ------------------ Services ----------------------
  serviceHeading: {
    marginLeft: wp('5%'),
    fontSize: hp('1.8%'),
    fontWeight: '600',
    marginBottom: hp('1%'),
  },

  serviceBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    marginHorizontal: wp('4%'),
    padding: wp('2%'),
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  serviceItem: {
    width: '45%',
    backgroundColor: COLORS.white,
    paddingVertical: hp('2.5%'),
    alignItems: 'center',
    borderRadius: 12,
  },
  serviceIconCircle: {
    backgroundColor: '#fdecec',
    width: wp('13%'),
    height: wp('13%'),
    borderRadius: wp('7.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceIcon: {
    width: wp('12%'),
    height: wp('12%'),
    resizeMode: 'contain',
  },
 serviceText: {
    marginTop: hp('1%'),
    textAlign: 'center',
    fontSize: hp('1.4%'),
    fontFamily: Fonts.medium,
    color: COLORS.black,
  },
  bookText: {
    fontSize: hp('2%'),
    fontFamily: Fonts.bold,
    color: COLORS.red,
    marginBottom: hp('3%'),
    textAlignVertical: 'center',
  },

  // ------------------ Status Cards -------------------
  statCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: wp('4%'),
    marginTop: hp('2%'),
    borderRadius: 13,
    padding: wp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
  },

  statCircle: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('6%'),
    backgroundColor: '#e6f2ff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  statNumber: {
    fontSize: hp('2%'),
    fontWeight: '700',
    color: '#2d7fd1',
  },

  statLabel: {
    marginLeft: wp('4%'),
    fontSize: hp('1.5%'),
    fontFamily: Fonts.semiBold,
    color:COLORS.black,
  },

  // ------------------ Chat Button --------------------
  chatButton: {
    position: 'absolute',
    bottom: hp('10%'),
    right: wp('4%'),
    width: wp('16%'),
    height: wp('16%'),
    borderRadius: wp('8%'),
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  chatIcon: {
    width: wp('10%'),
    height: wp('10%'),
    resizeMode: 'contain',
  },
});
