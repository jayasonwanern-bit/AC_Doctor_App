import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import { COLORS } from '../../utils/colors';
import { store } from '../../redux/store';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
  const userData = store?.getState()?.auth?.user?.data;
  const timer = setTimeout(() => {
    if (userData) {
       navigation.navigate('Tab', { screen: 'Home' });   
    } else {
     navigation.replace('Login');  
    }
  }, 1500);
   return () => clearTimeout(timer);
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
    width: 260,
    height: 260,
  },
});

export default SplashScreen;
