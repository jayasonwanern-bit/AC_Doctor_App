import React from 'react';
import { View, Image, StyleSheet, Modal } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CustomLoader = ({ size = 40, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={require('../assets/Loader.gif')}
        style={{
          width: wp(size / 4),
          height: wp(size / 4),
        }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomLoader;
