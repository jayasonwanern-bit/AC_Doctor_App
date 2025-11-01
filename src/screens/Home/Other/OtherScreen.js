import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
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
import RNPickerSelect from 'react-native-picker-select';

const OtherScreen = ({ navigation }) => {
  const [isProblem, setIsProblem] = useState('Select Problem');
  const [ProblemReason, setProblemReason] = useState('');

  const ProblemOptions = [
    { label: 'Water Leakage', value: 'Water Leakage' },
    { label: 'Noice Problem', value: 'Noice Problem' },
    { label: 'Gas topup', value: 'Gas topup' },
    { label: 'PCB fault', value: 'PCB fault' },
    { label: 'Remote fault', value: 'Remote fault' },
    { label: 'Fan/Blower fault', value: 'Fan/Blower fault' },
    { label: 'Fan Motor', value: 'Fan Motor' },
    { label: 'Outdoor fan fault', value: 'Outdoor fan fault' },
    { label: 'Outdoor fan Blade fault', value: 'Outdoor fan Blade fault' },
    { label: 'Outdoor fan motor fault', value: 'Outdoor fan motor fault' },
    { label: 'Others', value: 'Others' },
  ];

  const handleSubmit = () => {
    if(isProblem === null || ProblemReason.trim() === '') {
      alert('Please select a problem and describe the issue.');
      return;
    }
  else {    
    alert('Problem submitted successfully!');
    navigation.navigate('OtherCartView',{problem: isProblem, reason: ProblemReason});
  }
    // Reset form
    setIsProblem('Select Problem');
    setProblemReason('');
  };

  return (
    <View style={HomeScreenStyles.workcontainer}>
      <Header title="Other" onBack={() => navigation.goBack()} />

      <ScrollView
        style={HomeScreenStyles.workscrollstyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={HomeScreenStyles.worksliderview}>
          <Image source={images.bannerOne} style={HomeScreenStyles.workimage} />
        </View>

        {/* other card */}
        <View style={styles.card}>
          <Text
            style={[
              HomeScreenStyles.workheadText,
              { paddingHorizontal: wp('3%'), marginTop: hp('2%') },
            ]}
          >
            Other Services
          </Text>
          <View style={styles.boderLine} />
          <View style={[styles.flexView, { marginTop: hp('1%') }]}>
            <FastImage source={images.roundRightarrow} style={styles.icon} />
            <Text style={styles.title}>
              Through cleaning and maintenance to keep your AC running smoothly.
            </Text>
          </View>
          <View style={styles.flexView}>
            <FastImage source={images.roundRightarrow} style={styles.icon} />
            <Text style={styles.title}>
              Expert AC troubleshooting and repair services for all brands and
              models.
            </Text>
          </View>
          <View style={styles.flexView}>
            <FastImage source={images.roundRightarrow} style={styles.icon} />
            <Text style={styles.title}>
              Energy-efficient AC solutions to help you save on cooling costs.
            </Text>
          </View>
        </View>

        {/* Problem of ac */}
        <View
          style={[styles.card, { padding: hp('2%'), paddingBottom: hp('2%') }]}
        >
          <RNPickerSelect
            placeholder={{
              label: 'Select Problem',
              value: null,
              color: '#999',
            }}
            items={ProblemOptions}
            onValueChange={value => setIsProblem(value)}
            value={isProblem}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => (
              <Image
                source={images.arrowdown} // ya icon
                style={styles.dropdownIcon}
              />
            )}
          />
          <TextInput
            placeholder="Describe your problem"
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={3}
            value={ProblemReason}
            onChangeText={setProblemReason}
            textAlignVertical="top"
            style={styles.reasonInput}
          />
           <CustomButton
          buttonName="Submit"
          margingTOP={hp('0%')}
          btnTextColor={COLORS.white}
          btnColor={COLORS.themeColor}
          onPress={() =>handleSubmit()}
        />
        </View>

         <View style={HomeScreenStyles.worksliderview}>
          <Image source={images.bannerTwo} style={HomeScreenStyles.workimage} />
        </View>

         {/* Terms and Conditions */}
        <View style={[styles.card, { marginBottom: hp('10%'),marginTop: hp('1.5%') }]}>
          <Text
            style={[
              HomeScreenStyles.workheadText,
              { paddingHorizontal: wp('3%'), marginTop: hp('2%') },
            ]}
          >
            Terms and Conditions
          </Text>
          <View style={styles.boderLine} />
          <View style={[styles.flexView, { marginTop: hp('1%') }]}>
            <FastImage source={images.roundRightarrow} style={styles.icon} />
            <Text style={styles.title}>
              Service warranty is vaild for 30 days from the date of service.
            </Text>
          </View>
         
          <View style={styles.flexView}>
            <FastImage source={images.roundRightarrow} style={styles.icon} />
            <Text style={styles.title}>
             Additional parts or materials required for repairs will be charged separately.
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
    alignItems: 'center',
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
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    marginBottom: hp('1%'),
  },
  dropdownIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.themeColor,
    marginRight: 10,
    marginTop: 7,
  },
  reasonInput: {
    borderWidth: hp(0.1),
    borderColor: '#ddd',
    borderRadius: wp(3),
    padding: 12,
    marginTop: 8,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    fontSize: 14,
    color: '#333',
    height: hp(13),
  },
});

const pickerSelectStyles = {
  inputIOS: {
    ...HomeScreenStyles.profileDetailInput,
    paddingRight: 40, // arrow ke liye space
    color: COLORS.black,
  },
  inputAndroid: {
    ...HomeScreenStyles.profileDetailInput,
    paddingRight: 40,
    color: COLORS.black,
  },
  placeholder: {
    color: '#999',
  },
  iconContainer: {
    top: 15,
    right: 10,
  },
};

export default OtherScreen;
