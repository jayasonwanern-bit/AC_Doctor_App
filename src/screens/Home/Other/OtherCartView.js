import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../components/Header';
import HomeScreenStyles from '../HomeScreenStyles';
import images from '../../../assets/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../../../utils/colors';
import CustomButton from '../../../components/CustomButton';
import CustomModal from '../../../components/CustomModal';
import BookingSlotModal from '../../../customScreen/BookingSlotModal';

const OtherCartView = ({ navigation, route }) => {
  const { problem, reason } = route.params;
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalSlotVisible, setModalSlotVisible] = React.useState(false);
    const [selectedAddress, setSelectedAddress] = React.useState(null);
    const [selectedSlot, setSelectedSlot] = React.useState(null);

  const frequentlyAddedItems = [
    {
      id: '1',
      name: 'Sterilization',
      image: images.strerilization,
    },
    {
      id: '2',
      name: 'Repair',
      image: images.repairIcon,
    },
    {
      id: '3',
      name: 'Installation',
      image: images.installationIcon,
    },
    {
      id: '4',
      name: 'Commerical AC',
      image: images.commercialIcon,
    },
    {
      id: '5',
      name: 'Gas Charge',
      image: images.gaschargeIcon,
    },
    {
      id: '6',
      name: 'copper Pipe',
      image: images.copperIcon,
    },
    {
      id: '7',
      name: 'old AC Sell',
      image: images.sellAcIcon,
    },
  ];

  const handleScreenNavigation = itemName => {
    switch (itemName) {
      case 'Sterilization':
        navigation.navigate('Sterilization');
        break;
      case 'Repair':
        navigation.navigate('RepairScreen');
        break;
      case 'Installation':
        navigation.navigate('InstallationScreen');
        break;
      case 'Commerical AC':
        navigation.navigate('CommericalAc');
        break;
      case 'Gas Charge':
        navigation.navigate('GasChargeScreen');
        break;
      case 'copper Pipe':
        navigation.navigate('CopperPipeScreen');
        break;
      case 'old AC Sell':
        navigation.navigate('SellOldAcScreen');
        break;
      default:
        break;
    }
  };

  // render
  return (
    <View style={HomeScreenStyles.workcontainer}>
      <Header title="Cart View" onBack={() => navigation.goBack()} />

      <ScrollView
        style={HomeScreenStyles.workscrollstyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={HomeScreenStyles.worksliderview}>
          <Image source={images.bannerOne} style={HomeScreenStyles.workimage} />
        </View>
        <Text style={styles.title}>SKU Ordered</Text>

        {/* other and edit */}
        <View style={styles.card}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: hp('1%'),
            }}
          >
            <Text style={styles.title}>Other</Text>
            <Text style={[styles.title, { color: COLORS.themeColor }]}>
              Edit
            </Text>
          </View>
          <View style={styles.boderLine} />
          <Text style={styles.headtitle}>
            Problem :<Text style={styles.Normaltitle}> {problem}</Text>
          </Text>
          <Text style={styles.headtitle}>
            Comments :<Text style={styles.Normaltitle}> {reason}</Text>
          </Text>
        </View>

        {/* Frequently Added Together */}
        <Text style={styles.title}>Frequently Added Together</Text>
        <View style={styles.card}>
          <FlatList
            data={frequentlyAddedItems}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ alignItems: 'center', marginRight: wp('4%') }}
                onPress={() => {
                  handleScreenNavigation(item.name);
                }}
              >
                <Image source={item.image} style={styles.Iconservices} />
                <Text style={styles.titleService}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomBtn}>
        <CustomButton
          buttonName="Submit"
          margingTOP={hp('0%')}
          btnTextColor={COLORS.white}
          btnColor={COLORS.themeColor}
          onPress={() =>setModalVisible(true)}
        />
      </View>

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onProceed={() => {
          setModalVisible(false);
          setTimeout(() => {
            setModalSlotVisible(true);
          }, 300);
        }}
        setSelectedAddress={setSelectedAddress}
      />

      <BookingSlotModal
        visible={modalSlotVisible}
        onClose={() => setModalSlotVisible(false)}
        setSelectedSlot={setSelectedSlot}
        onBookProcess={() => {
          setModalSlotVisible(false);
          setTimeout(() => {
            navigation.goBack();
          }, 300);
        }}
      />
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
    marginTop: hp('1%'),
    padding: wp('3%'),
  },
  title: {
    fontSize: wp('3.5%'),
    color: COLORS.black,
    fontFamily: Fonts.semiBold,
  },
  headtitle: {
    fontSize: wp('3.4%'),
    color: COLORS.black,
    fontFamily: Fonts.medium,
    marginVertical: hp('1%'),
  },
  Normaltitle: {
    fontSize: wp('3.2%'),
    color: COLORS.textHeading,
    fontFamily: Fonts.regular,
    marginVertical: hp('1%'),
  },
  boderLine: {
    borderColor: COLORS.lightSky,
    borderWidth: wp(0.1),
    marginVertical: hp('0.5%'),
  },
  titleService: {
    fontSize: wp('3.5%'),
    color: COLORS.black,
    fontFamily: Fonts.medium,
    textAlign: 'center',
  },
  Iconservices: { width: wp('12%'), height: hp('10%'), resizeMode: 'contain' },
    bottomBtn: { 
        position: 'absolute',
        bottom: hp('2%'),
        left: wp('5%'),
        right: wp('5%'),
    },
});

export default OtherCartView;
