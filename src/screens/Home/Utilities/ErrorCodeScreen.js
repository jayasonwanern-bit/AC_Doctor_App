import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../../../utils/colors';
import images from '../../../assets/images';
import FastImage from 'react-native-fast-image';
import Header from '../../../components/Header';
import HomeScreenStyles from '../HomeScreenStyles';
import CustomButton from '../../../components/CustomButton';
import CustomPicker from '../../../components/CustomPicker';

const ErrorCodeScreen = ({ navigation }) => {
  const [isPlace, setIsPlace] = useState('Select AC type');
  const [errorValue, setErrorValue] = useState('');
  const [brandValue, setBrandValue] = useState('Select Brand');

  const PlaceOptions = [
    { label: 'Split AC', value: 'Split AC' },
    { label: 'Window AC', value: 'Window AC' },
    { label: 'Ducted AC', value: 'Ducted AC' },
    { label: 'VRV/VRF', value: 'VRV/VRF' },
    { label: 'Concealed AC', value: 'Concealed AC' },
    { label: 'Tower AC', value: 'Tower AC' },
  ];

  //   on Calulate button press
  const handleSubmit = () => {
    if (isPlace === null || isPlace === undefined) {
      Alert.alert('Missing Selection', 'Please select a place.');
      return;
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={HomeScreenStyles.workcontainer}>
      <Header title="Error Code" onBack={() => navigation.goBack()} />

      <ScrollView
        style={HomeScreenStyles.workscrollstyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={HomeScreenStyles.worksliderview}>
          <Image source={images.ErrorImg} style={HomeScreenStyles.workimage} />
        </View>

        {/* Problem of ac */}
        <View
          style={[styles.card, { padding: hp('2%'), paddingBottom: hp('2%') }]}
        >
          <CustomPicker
            label="Select Brand"
            value={brandValue}
            onChange={value => setBrandValue(value)}
            items={[
              { label: 'Blue Star', value: 'Blue Star' },
              { label: 'LG', value: 'LG' },
              { label: 'Samsung', value: 'Samsung' },
              { label: 'Daikin', value: 'Daikin' },
            ]}
            width={wp('85%')} // any width
            height={hp('5%')} // any height
            borderRadius={hp('4%')} // custom radius
          />

          <CustomPicker
            label="Select AC Type"
            value={isPlace}
            onChange={value => setIsPlace(value)}
            items={PlaceOptions}
            width={wp('85%')} // any width
            height={hp('5%')} // any height
            borderRadius={hp('4%')} // custom radius
          />

          <View style={[styles.flexView, { marginRight: wp('1%') }]}>
            <TextInput
              placeholder="Error Code"
              placeholderTextColor="#aaa"
              value={errorValue}
              onChangeText={setErrorValue}
              textAlignVertical="top"
              style={styles.normalInput}
            />
          </View>

          <CustomButton
            buttonName="Submit Error Codes"
            margingTOP={hp('1%')}
            btnTextColor={COLORS.white}
            btnColor={COLORS.themeColor}
            onPress={() => handleSubmit()}
          />
        </View>

        <View style={HomeScreenStyles.worksliderview}>
          <Image source={images.bannerTwo} style={HomeScreenStyles.workimage} />
        </View>

        {/* Details card */}
        <View
          style={[
            styles.card,
            { marginBottom: hp('7%'), paddingHorizontal: wp('3%') },
          ]}
        >
          <Text
            style={[
              HomeScreenStyles.workheadText,
              { paddingHorizontal: wp('3%'), marginTop: hp('2%') },
            ]}
          >
            Details
          </Text>
          <View style={styles.boderLine} />
          <View style={[styles.flexView]}>
            <FastImage source={images.roundRightarrow} style={styles.icon} />
            <Text style={styles.title}>
              Error Code is a specific alphanumeric code displayed on an
              appliance or device to indicate a malfunction or issue that needs
              attention.
            </Text>
          </View>
          <View style={[styles.flexView]}>
            <FastImage source={images.roundRightarrow} style={styles.icon} />
            <Text style={styles.title}>
              Error Codes help users and technicians diagnose problems quickly
              and accurately, facilitating efficient troubleshooting and
              repairs.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: wp('3%'),
    marginBottom: hp('1%'),
    elevation: 2,
    borderColor: COLORS.lightSky,
    borderWidth: wp(0.2),
  },
  boderLine: {
    borderColor: COLORS.lightSky,
    borderWidth: wp(0.1),
    marginVertical: hp('0.5%'),
  },
  icon: {
    width: wp('7%'),
    height: wp('7%'),
    marginRight: wp('3%'),
    resizeMode: 'contain',
    tintColor: COLORS.themeColor,
  },
  title: {
    flex: 1,
    fontSize: wp('3%'),
    color: COLORS.black,
    fontFamily: Fonts.regular,
  },
  flexView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: hp('1%'),
  },

  normalInput: {
    borderWidth: hp(0.1),
    borderColor: '#ddd',
    borderRadius: wp(6),
    padding: 12,
    backgroundColor: COLORS.lightWhite,
    fontSize: 14,
    color: COLORS.lightGray,
    width: hp('38%'),
    alignItems: 'flex-start',
  },
});

export default ErrorCodeScreen;
