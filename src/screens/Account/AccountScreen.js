import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  StatusBar as RNStatusBar,
  StyleSheet, // Import StatusBar
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Homestyles from '../Home/HomeScreenStyles';
import { SafeAreaView } from 'react-native-safe-area-context'; // Use SafeAreaView instead of SafeAreaProvider
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import { COLORS } from '../../utils/colors';

const AccountScreenComponent = ({ navigation }) => {
  const menuData = [
    {
      id: '1',
      title: 'Notification',
      icon: images.notificationRed,
      screen: 'NotificationScreeen',
    },
    { id: '2', title: 'My Bookings', icon: images.bookingIcon, screen: 'MyBookingScreen' },
    {
      id: '3',
      title: 'My Requests',
      icon: images.bookingIcon,
      screen: 'MyRequestsScreen',
    },
    {
      id: '4',
      title: 'Manage Address',
      icon: images.addressIcon,
      screen: 'ManageAddressScreen',
    },
    {
      id: '5',
      title: 'Annual Maintenance Contract',
      icon: images.contractIcon,
      screen: 'AMC',
    },
    { id: '6', title: 'Pay Now', icon: images.payIcon, screen: 'PayNow' },
    { id: '7', title: 'Rate Us', icon: images.rateUSIcon, screen: 'RateUs' },
    { id: '8', title: 'Help', icon: images.helpIcon, screen: 'Help' },
    { id: '9', title: 'Logout', icon: images.logoutIcon, screen: 'Logout' },
  ];

  const handleAddressPress = () => {
    navigation.navigate('SelectLocation', { onUpdate: loadAddress });
  };

  const handleMenuPress = screen => {
    if (screen === 'Logout') {
      // Handle logout logic
      Alert.alert('Logout', 'Are you sure?', [
        { text: 'Cancel' },
        { text: 'Yes', onPress: () => navigation.replace('Login') },
      ]);
    } else {
      navigation.navigate(screen);
    }
  };

  return (
    <SafeAreaView style={Homestyles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={Homestyles.container}
        contentContainerStyle={Homestyles.content}
      >
        {/* Header with Location Icon and Add Location Text */}
        <View style={Homestyles.header}>
          <Text style={Homestyles.locationtitle}>Location</Text>
          <View style={Homestyles.addressRow}>
            <TouchableOpacity
              style={Homestyles.locationContainer}
              onPress={handleAddressPress}
            >
              <FastImage
                source={images.homeLocation}
                style={Homestyles.locationIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={Homestyles.locationText}>
                149, Vijay Nagar, Indore
              </Text>
            </TouchableOpacity>
            <View style={Homestyles.wheatherContainer}>
              <FastImage
                source={images.wheatherIcon}
                style={Homestyles.locationIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={Homestyles.locationText}>25°C</Text>
            </View>
          </View>
        </View>

        {/* profile */}
        <TouchableOpacity style={Homestyles.accountMaincontainer} onPress={() => navigation.navigate('ProfileDetail')}>
          <View style={Homestyles.accountcontainer}>
            <FastImage
              source={images.userProfile}
              style={Homestyles.accountbg}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={Homestyles.accountcontainer}>
            <Text style={Homestyles.accounttitle}>Hi Rahul</Text>
            <View style={Homestyles.accountline}>
              <Image
                source={images.Call}
                style={Homestyles.callIcon}
                resizeMode="contain"
              />
              <Text style={Homestyles.accountNumber}>+91 9887564646</Text>
            </View>
            <Text
              style={[Homestyles.accountNumber, { color: COLORS.themeColor }]}
            >
              {'Complete your profile >'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* service booked */}
        <View
          style={[
            Homestyles.accountMaincontainer,
            { justifyContent: 'space-evenly' },
          ]}
        >
          <View style={{ alignItems: 'center' }}>
            <Text
              style={Homestyles.accountBlueText}
            >
              0
            </Text>
            <Text style={Homestyles.accountNumber}>Services Booked</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              borderLeftWidth: wp('0.2%'),
              borderLeftColor: COLORS.themeColor,
            }}
          >
            <Text
              style={Homestyles.accountBlueText}
            >
              {' '}
              ₹ 0
            </Text>
            <Text style={[Homestyles.accountNumber, { marginLeft: wp(6) }]}>
              Earned through refer
            </Text>
          </View>
        </View>
        {/* Menu List */}
        <View style={styles.container}>
          <FlatList
            data={menuData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={Homestyles.acccontainer}
                onPress={() => handleMenuPress(item.screen)}>
                <View>
                  <Image source={item.icon} style={Homestyles.accicon} />
                </View>
                <Text style={Homestyles.acctitle}>{item.title}</Text>
                <Image
                  source={images.rightArrow} 
                  style={Homestyles.accarrow}
                />
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreenComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: wp(3),
    paddingBottom: hp(15),
  },
});
