import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import { COLORS } from '../../utils/colors';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); 
    }, 2000);
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
