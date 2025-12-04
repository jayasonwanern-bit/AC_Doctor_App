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

const TonnageCalculatorScreen = ({ navigation }) => {
  const [isPlace, setIsPlace] = useState('Select Problem');
  const [withValue, setWithValue] = useState('');
  const [heightValue, setHeightValue] = useState('');
  const [totalTon, setTotalTon] = useState('');
  const [showTon, setShowTon] = useState(false);

  const PlaceOptions = [
    { label: 'Residential', value: 'Residential' },
    { label: 'Commercial', value: 'Commercial' },
  ];


//   on Calulate button press
  const handleSubmit = () => {
    const width = parseFloat(withValue) || 0;
    const height = parseFloat(heightValue) || 0;

    if (isPlace === null || isPlace === undefined) {
      Alert.alert('Missing Selection', 'Please select a place.');
      return;
    }

    if (width <= 0 || height <= 0) {
      Alert.alert(
        'Invalid input',
        'Please enter positive numbers for width and height.',
      );
      return;
    }

    // 2. Area in square feet
    const areaSqFt = width * height;
    // 3. Convert to tonnage (1 ton ≈ 400 sq.ft – you can change the factor)
    const tonnage = areaSqFt / 400;
    setTotalTon(tonnage.toFixed(2));
    setShowTon(true);
  };

  return (
    <View style={HomeScreenStyles.workcontainer}>
      <Header title="Tonnage Calculator" onBack={() => navigation.goBack()} />

      <ScrollView
        style={HomeScreenStyles.workscrollstyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={HomeScreenStyles.worksliderview}>
          <Image source={images.calculatorImg} style={HomeScreenStyles.workimage} />
        </View>

        {/* Details card */}
        <View style={styles.card}>
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
              Tonnage calculator helps you determine the appropriate cooling
              capacity required for your space based on its size and other
              factors.
            </Text>
          </View>
        </View>

        {/* Problem of ac */}
        <View
          style={[styles.card, { padding: hp('2%'), paddingBottom: hp('2%') }]}
        >
           <CustomPicker
            value={isPlace}
            onChange={value => setIsPlace(value)}
            items={PlaceOptions}
            width={wp('85%')} // any width
            height={hp('5%')} // any height
            borderRadius={hp('4%')} // custom radius
          />

          <View
            style={[
              styles.flexView,
              {
                justifyContent: 'space-between',
                width: wp('90%'),
                alignSelf: 'center',
              },
            ]}
          >
            <TextInput
              placeholder="Width in feet"
              placeholderTextColor="#aaa"
              value={withValue}
              onChangeText={setWithValue}
              textAlignVertical="top"
              style={styles.normalInput}
            />
            <TextInput
              placeholder="Height in feet"
              placeholderTextColor="#aaa"
              value={heightValue}
              onChangeText={setHeightValue}
              textAlignVertical="top"
              style={styles.normalInput}
            />
          </View>

          {showTon && (
            <View style={{ marginTop: hp('2%') }}>
              <Text style={styles.reasonInput}>
                {' '}
                Total AC tonnage needed:{' '}
                <Text style={{ fontFamily: Fonts.bold }}>{totalTon}</Text> ton
              </Text>
            </View>
          )}

          <CustomButton
            buttonName="Calulate"
            margingTOP={hp('1%')}
            btnTextColor={COLORS.white}
            btnColor={COLORS.themeColor}
            onPress={() => handleSubmit()}
          />
        </View>

        <View style={HomeScreenStyles.worksliderview}>
          <Image source={images.bannerTwo} style={HomeScreenStyles.workimage} />
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
    marginVertical: hp('1%'),
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
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    fontSize: 14,
    color: '#333',
  },
  normalInput: {
    borderWidth: hp(0.1),
    borderColor: '#ddd',
    borderRadius: wp(3),
    padding: 12,
    backgroundColor: '#f9f9f9',
    fontSize: 14,
    color: '#333',
    width: hp(18),
    alignItems: 'flex-start',
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

export default TonnageCalculatorScreen;
