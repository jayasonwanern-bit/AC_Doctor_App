// src/components/Header.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, useColorScheme, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import images from '../assets/images'; // Adjust path if needed
import COLORS, { Fonts } from '../utils/colors'; // Adjust path if needed
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = ({ 
  title = 'My App', 
  onBack, 
  onHelp, 
//   extraIcons = [] 
}) => {
  const insets = useSafeAreaInsets(); 
  const scheme = useColorScheme();

  // Dynamic styles based on scheme
  const dynamicStyles = {
    safeArea: {
      backgroundColor: scheme === 'dark' ? '#1a1a1a' : '#ffffff',
    },
    backText: {
      color: scheme === 'dark' ? COLORS.white : '#000000',
    },
    title: {
      color: scheme === 'dark' ? COLORS.white : '#000000',
    },
    helpIcon: {
      tintColor: scheme === 'dark' ? COLORS.white : '#000000',
    },
    extraIcon: {
      tintColor: scheme === 'dark' ? COLORS.white : '#000000',
    },
  };

  return (

    <View style={[styles.safeArea, { paddingTop: Platform.OS === 'android' ? insets.top : insets.top,backgroundColor: dynamicStyles.safeArea.backgroundColor}]}>
        <StatusBar
         barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent={true} 
        />
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
             <FastImage
              source={images.backArrow}
              style={[styles.backIcon, dynamicStyles.extraIcon]}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        )}
        <Text style={[styles.title, dynamicStyles.title]}>{title}</Text>
        {onHelp && (
          <TouchableOpacity style={styles.helpButton} onPress={onHelp}>
            <FastImage
              source={images.questionIcon}
              style={[styles.helpIcon, dynamicStyles.helpIcon]}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        )}
        {/* Extra Icons */}
        {/* {extraIcons.map((iconObj, index) => (
          <TouchableOpacity
            key={index}
            style={styles.extraIconButton}
            onPress={iconObj.onPress}
          >
            <FastImage
              source={images[iconObj.icon]}
              style={[styles.extraIcon, dynamicStyles.extraIcon]}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        ))} */}
      </View>
     </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    // Base styles, dynamic color will be overridden
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('1%'),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', 
  },
  backButton: {
    paddingRight: wp('3%'),
  },
  backIcon: {
     width: wp('5%'),
     height: wp('5%'),
     resizeMode:'contain'
  },
  title: {
    fontSize: wp('4%'),
    fontFamily: Fonts.semiBold,
    flex: 1,
    textAlign: 'left',
    marginLeft:wp('2')
  },
  helpButton: {
    paddingLeft: wp('3%'),
  },
  helpIcon: {
    width: wp('6%'),
    height: wp('6%'),
  },
  extraIconButton: {
    paddingLeft: wp('3%'),
  },
  extraIcon: {
    width: wp('6%'),
    height: wp('6%'),
  },
});

export default Header;