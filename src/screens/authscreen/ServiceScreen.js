import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../../utils/colors';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import useLocation from '../../utils/useLocation';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { useNavigation } from '@react-navigation/native';



const ServiceScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    Geolocation.requestAuthorization();
  }, []);

  const handleUseCurrentLocation = () => {
    // navigation.navigate('MapScreens'); // mapscreen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Tab', params: { screen: 'Home' } }],
    });
  };


  //use for get current location logic
  // const { location, retry, isLoading } = useLocation();
  // console.log('location', location);
  // const handleUseCurrentLocation = async () => {
  //   if (!location) {
  //     retry();
  //     return;
  //   }
  //   try {
  //     const response = await Geocoder.from(
  //       location.latitude,
  //       location.longitude,
  //     );
  //     console.log('Geocoder response:', response);

  //     if (response.results.length > 0) {
  //       const result = response.results[0];
  //       const components = result.address_components;

  //       const getComp = types =>
  //         components.find(c => types.every(t => c.types.includes(t)))
  //           ?.long_name || '';

  //       console.log('Parsed address components:', components);

  //       const street = getComp(['route']);
  //       const city =
  //         getComp(['locality']) || getComp(['administrative_area_level_2']);
  //       const state = getComp(['administrative_area_level_1']);
  //       const postalCode = getComp(['postal_code']);
  //       console.log('result.formatted_address', result.formatted_address);
  //     }
  //   } catch (err) {
  //     console.error('Geocoding error:', err);
  //   }
  // };

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

      <Text style={styles.title}>Find Services Near You</Text>

      <FastImage
        source={images.service}
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.subtitle}>
        Quickly detect your location for better service!
      </Text>

      <TouchableOpacity
        style={styles.locationButton}
        onPress={() => handleUseCurrentLocation()}
      >
        <FastImage
          source={images.locationIcon}
          style={styles.backImg}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.locationText}>Use Current Location</Text>
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
  backImg: {
    width: wp('5%'),
    height: hp('5%'),
    resizeMode: 'contain',
    marginVertical: hp('3%'),
  },
  title: {
    fontSize: hp('2.5%'),
    fontFamily: Fonts.bold,
    textAlign: 'center',
    color: COLORS.black,
    marginBottom: hp('2%'),
  },
  image: {
    width: wp('60%'),
    height: hp('30%'),
    alignSelf: 'center',
    marginVertical: hp('2%'),
    marginBottom: hp('8%'),
  },
  subtitle: {
    fontSize: hp('1.5%'),
    fontFamily: Fonts.medium,
    textAlign: 'center',
    color: COLORS.black,
  },
  locationButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: hp('5.4%'),
    backgroundColor: COLORS.themeColor,
    borderRadius: 25,
    width: wp('90%'),
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: hp('4%'),
  },
  locationText: {
    color: COLORS.white,
    fontSize: hp('1.8%'),
    fontFamily: Fonts.medium,
    marginLeft: wp('2%'),
  },
  errorText: {
    color: COLORS.errorRed,
    fontSize: hp('1.8%'),
    marginTop: hp('1%'),
    textAlign: 'center',
  },
});

export default ServiceScreen;
