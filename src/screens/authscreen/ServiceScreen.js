import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert ,PermissionsAndroid,Platform, ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../../utils/colors';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import useLocation from '../../utils/useLocation';
// import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { useNavigation } from '@react-navigation/native';
import { isTablet } from '../../components/TabletResponsiveSize';
import Geolocation from '@react-native-community/geolocation';
import GetLoaction from '../../components/GetLoaction'

const ServiceScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    Geolocation.requestAuthorization();
  }, []);

const {
    latitude,
    longitude,
    addressText,
    loading,
    error,
    getLocation,
  } = GetLoaction();





const handleUseCurrentLocation = ()=>{
 getLocation((locationData) => {
      navigation.reset({
  index: 0,
  routes: [
    {
      name: 'Tab',
      state: {
        index: 0,
        routes: [
          {
            name: 'Home', 
            params: {locationData
            },
          },
        ],
      },
    },
  ],
});
    });
    
}





const handleManuallyLocation = () => {
  navigation.navigate("AddAddress");
};
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.backButton]}
        // onPress={() => navigation.goBack()}
      >
        {/* <FastImage
          source={images.backArrow}
          style={[styles.backImg,{marginTop:hp('1.5%')}]}
          resizeMode={FastImage.resizeMode.contain}
        /> */}
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
       <View style={{flexDirection:'row',alignItems:'center'}}>
        
        <FastImage
          source={images.locationIcon}
          style={styles.backImg}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.locationText}>Use Current Location</Text>
         {
                      loading?(
                        <ActivityIndicator color={COLORS.white} size={'small'} />
                      ):null
                    }
       </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.locationManualButton}
        onPress={() => handleManuallyLocation()}
      >
        <Text style={[styles.locationText,{color:COLORS.black}]}>Enter Location Manually</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
    backgroundColor: COLORS.white,
    alignItems:"center",
    justifyContent:"center"
  },
  backButton: {
    marginBottom: hp('2%'),
  },
  backImg: {
    width: isTablet? wp(3.5):wp(6),
    height:isTablet? hp(3.5):hp(6),
    resizeMode: 'contain',
    marginHorizontal: hp('1%'),
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
  locationManualButton: {
    height: hp('5.4%'),
    borderColor: COLORS.black,
    borderWidth:hp('0.1%'),
    borderRadius: 25,
    width: wp('90%'),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent:'center',
    marginTop: hp('3%'),
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
    // marginLeft: wp('2%'),
    textAlign:'center',
    marginRight:10
  },
  errorText: {
    color: COLORS.errorRed,
    fontSize: hp('1.8%'),
    marginTop: hp('1%'),
    textAlign: 'center',
  },
});

export default ServiceScreen;