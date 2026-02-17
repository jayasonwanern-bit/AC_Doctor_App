import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import { COLORS } from '../../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const hasLocation = await AsyncStorage.getItem('hasSelectedLocation');

        setTimeout(() => {
          if (!token) {
            navigation.replace('Login');
          } else if (!hasLocation) {
            navigation.replace('ServiceScreen');
          } else {
            navigation.replace('Tab');
          }
        }, 2000);

      } catch (error) {
        console.log('Error getting token', error);
        navigation.replace('Login');
      }
    };

    getData();
  }, []);


  return (
    <View style={styles.container}>
      <FastImage
        source={images.logo}
        style={styles.logo}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  logo: {
    width: 500,
    height: 500,
  },
});

export default SplashScreen;
