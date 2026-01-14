import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import { COLORS } from '../../utils/colors';
import { store } from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      // return token;
      const timer = setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: token ? 'Tab' : 'Login' }],
        });
      }, 2000);
      return () => clearTimeout(timer);
    } catch (error) {
      console.log('Error getting token', error);
      return null;
    }
  };

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
