import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../../components/Header';
import images from '../../assets/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../../utils/colors';
import FastImage from 'react-native-fast-image';
import CustomButton from '../../components/CustomButton';
import CustomModal from '../../components/CustomModal';
import { useNavigation } from '@react-navigation/native';
import BookingSlotModal from '../../customScreen/BookingSlotModal';
import ConfirmationModal from '../../customScreen/ConfirmationModal';

const ViewCartScreen = () => {
  const navigation = useNavigation();
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [modalSlotVisible, setModalSlotVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [acTypes, setAcTypes] = useState([
    { name: 'Split AC', count: 2, showButtons: false },

    {
      name: 'Cassette AC',
      count: 1,
      showButtons: false,
    },
  ]);

  const bookServices = [
    {
      label: 'Sterilization',
      icon: images.strerilization,
      action: handleSterilization,
    },
    { label: 'Repair', icon: images.repairIcon, action: handleRepair },
    {
      label: 'Installation',
      icon: images.installationIcon,
      action: handleInstallation,
    },
    {
      label: 'Commercial AC',
      icon: images.commercialIcon,
      action: handleCommercialAC,
    },
    {
      label: 'Gas Charging',
      icon: images.gaschargeIcon,
      action: handleGasCharging,
    },
    { label: 'Other', icon: images.otherIcon, action: handleOther },
  ];
  // BookingActions (replace alert with your action)
  const handleSterilization = () => navigation.navigate('Sterilization');
  const handleRepair = () => alert('Repair clicked!');
  const handleInstallation = () => alert('Installation clicked!');
  const handleCommercialAC = () => alert('Commercial AC clicked!');
  const handleGasCharging = () => alert('Gas Charging clicked!');
  const handleOther = () => alert('Other clicked!');

  // Handle Increment
  const handleIncrement = index => {
    const updatedAcTypes = [...acTypes];
    updatedAcTypes[index].count += 1;
    setAcTypes(updatedAcTypes);
  };

  // Handle Decrement
  const handleDecrement = index => {
    const updatedAcTypes = [...acTypes];
    if (updatedAcTypes[index].count > 0) {
      updatedAcTypes[index].count -= 1;
    }
    setAcTypes(updatedAcTypes);
  };

  return (
    <View style={styles.container}>
      <Header title="Your Cart" onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scrollstyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.ordercontainer]}>
          <Image source={images.tag} style={styles.carticon} />
          <Text style={styles.viewCartText}>Saving ₹150 on this order</Text>
        </View>

        <Text style={styles.headText}>Repair Service</Text>

        <View style={{ marginVertical: wp('2%') }}>
          {acTypes.map((ac, index) => (
            <View key={index} style={styles.workItem}>
              <View>
                <Text style={styles.workText}>{ac.name}</Text>
              </View>

              <View style={styles.workButtonContainer}>
                <TouchableOpacity
                  style={styles.workButton}
                  onPress={() => handleDecrement(index)}
                >
                  <Text style={styles.workButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.workCount}>{ac.count}</Text>
                <TouchableOpacity
                  style={styles.workButton}
                  onPress={() => handleIncrement(index)}
                >
                  <Text style={styles.workButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Installation */}
        <Text style={styles.headText}>Installation</Text>
        <View style={{ marginVertical: wp('2%') }}>
          {acTypes.map((ac, index) => (
            <View key={index} style={styles.workItem}>
              <View>
                <Text style={styles.workText}>{ac.name}</Text>
              </View>

              <View style={styles.workButtonContainer}>
                <TouchableOpacity
                  style={styles.workButton}
                  onPress={() => handleDecrement(index)}
                >
                  <Text style={styles.workButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.workCount}>{ac.count}</Text>
                <TouchableOpacity
                  style={styles.workButton}
                  onPress={() => handleIncrement(index)}
                >
                  <Text style={styles.workButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.addText}>Add More</Text>
        </TouchableOpacity>

        {/* Frequently Added Together */}
        <Text style={styles.headText}>Frequently Added Together</Text>
        <FlatList
          data={bookServices}
          keyExtractor={(_, index) => `work-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.utioption, { width: wp('23%') }]}
              onPress={item.action}
            >
              <FastImage source={item.icon} style={styles.utiicon} />
              <Text style={styles.headText}>{item.label}</Text>
              <View style={styles.addBtn}>
                <Text style={[styles.workText, { fontSize: hp('1.2%') }]}>
                  Add
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />

        <View
          style={[
            styles.ordercontainer,
            { justifyContent: 'space-between', borderColor: COLORS.themeColor },
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={images.Offer} style={styles.carticon} />
            <Text
              style={[
                styles.viewCartText,
                { color: COLORS.black, fontFamily: Fonts.regular },
              ]}
            >
              Coupons
            </Text>
          </View>
          <Text
            style={[
              styles.viewCartText,
              { color: COLORS.themeColor, marginRight: wp('4%') },
            ]}
          >
            {'2 Offers >'}
          </Text>
        </View>

        {/* Payment Summary */}
        <View
          style={[
            styles.utioption,
            {
              width: wp('93%'),
              alignItems: 'flex-start',
              paddingHorizontal: wp('3%'),
              paddingTop: wp('3%'),
            },
          ]}
        >
          <Text style={styles.headText}>Payment Summary</Text>

          <View style={styles.flewView}>
            <Text style={[styles.workText, { fontSize: hp('1.2%') }]}>
              Item Total
            </Text>
            <Text
              style={[
                styles.workText,
                { fontSize: hp('1.2%'), color: COLORS.black },
              ]}
            >
              ₹ 3680
            </Text>
          </View>
          <View style={styles.flewView}>
            <Text style={[styles.workText, { fontSize: hp('1.2%') }]}>
              Item Discount
            </Text>
            <Text
              style={[
                styles.workText,
                { fontSize: hp('1.2%'), color: COLORS.black },
              ]}
            >
              -₹ 150
            </Text>
          </View>
          <View style={styles.flewView}>
            <Text style={[styles.workText, { fontSize: hp('1.2%') }]}>
              Taxes and Fee
            </Text>
            <Text
              style={[
                styles.workText,
                { fontSize: hp('1.2%'), color: COLORS.black },
              ]}
            >
              ₹ 69
            </Text>
          </View>

          <View
            style={[
              styles.workItem,
              styles.flewView,
              {
                borderBottomWidth: 1,
                borderBottomColor: '#E0E0E0',
                borderTopWidth: 1,
                borderTopColor: '#E0E0E0',
              },
            ]}
          >
            <Text
              style={[
                styles.workText,
                { fontSize: hp('1.2%'), color: COLORS.black },
              ]}
            >
              Total
            </Text>
            <Text
              style={[
                styles.workText,
                { fontSize: hp('1.2%'), color: COLORS.black },
              ]}
            >
              ₹ 3540
            </Text>
          </View>

          <View style={styles.yayView}>
            <Image source={images.tag} style={styles.carticon} />
            <Text
              style={[
                styles.viewCartText,
                { color: COLORS.themeColor, fontFamily: Fonts.regular },
              ]}
            >
              Yay! you have saved ₹ 150 on final bill
            </Text>
          </View>
        </View>

        {/* CANCELLATION */}
        <View
          style={[
            styles.utioption,
            {
              width: wp('93%'),
              alignItems: 'flex-start',
              padding: wp('3%'),
              marginBottom: hp('15%'),
            },
          ]}
        >
          <Text style={styles.headText}>Cancellation policy</Text>
          <View style={{ flexDirection: 'row', marginVertical: hp('1%') }}>
            <Text style={[styles.workText, { fontSize: hp('1.2%') }]}>
              🕰️ Orders cannot be cancelled within 2 hours of the scheduled
              service time.
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            {/* <Image source={images.tag} style={styles.carticon} /> */}
            <Text style={[styles.workText, { fontSize: hp('1.2%') }]}>
              ₹ Orders cannot be cancelled within 2 hours of the scheduled
              service time.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.servicesSection}>
        <CustomButton
          buttonName="Add Address & Slot"
          margingTOP={hp('6%')}
          btnTextColor={COLORS.white}
          btnColor={COLORS.themeColor}
          onPress={() => setModalVisible(true)}
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
            setConfirmModalVisible(true);
          }, 300);
        }}
      />

      <ConfirmationModal
        visible={confirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
        selectedAddress={selectedAddress}
        selectedSlot={selectedSlot}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollstyle: { flex: 1, paddingHorizontal: wp('3%') },
  ordercontainer: {
    flexDirection: 'row',
    width: wp('95%'),
    borderColor: COLORS.red,
    borderRadius: wp('2%'),
    borderWidth: wp('0.2%'),
    backgroundColor: COLORS.white,
    marginVertical: hp('1.5%'),
    alignSelf: 'center',
    alignItems: 'center',
  },
  viewCartText: {
    fontSize: wp('3%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.peacock,
  },
  carticon: {
    width: wp('5%'),
    height: hp('5%'),
    resizeMode: 'contain',
    marginHorizontal: hp('1%'),
  },
  headText: {
    fontSize: wp('3%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.black,
  },

  workItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: hp('1.2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: COLORS.white,
    borderRadius: wp('1%'),
  },
  workText: {
    fontSize: hp('1.5%'),
    color: COLORS.textHeading,
    fontFamily: Fonts.medium, // Use your defined medium font
  },
  workButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: hp('2.5%'),
  },
  workButton: {
    borderWidth: 1,
    borderRadius: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    width: wp('7.3%'),
    height: hp('3.5%'),
    alignSelf: 'center',
    borderColor: '#ddd',
  },
  workButtonText: {
    fontSize: wp('5%'),
    color: COLORS.black,
    textAlign: 'center',
    fontFamily: Fonts.medium,
    marginBottom: hp('0.5%'), // Use your defined medium font
  },
  workCount: {
    fontSize: hp('1.6%'),
    color: COLORS.themeColor,
    fontFamily: Fonts.medium,
    marginHorizontal: wp('2%'),
  },
  addText: {
    marginVertical: hp('1%'),
    fontSize: hp('1.4%'),
    color: COLORS.themeColor,
    fontFamily: Fonts.medium,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  utioption: {
    marginVertical: wp('3%'),
    borderRadius: wp('3%'),
    backgroundColor: COLORS.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
    marginRight: hp('1%'),
  },
  utiicon: {
    width: wp('10%'),
    height: wp('10%'),
    resizeMode: 'contain',
    marginVertical: wp('2%'),
  },
  addBtn: {
    width: wp('18%'),
    alignItems: 'center',
    padding: hp('0.7%'),
    borderWidth: wp('0.4%'),
    borderColor: '#E0E0E0',
    borderRadius: wp('4%'),
    marginVertical: wp('2%'),
  },
  flewView: {
    flexDirection: 'row',
    width: wp('83%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp('1%'),
  },
  yayView: {
    flexDirection: 'row',
    width: wp('93%'),
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomLeftRadius: wp('3%'),
    borderBottomRightRadius: wp('3%'),
    backgroundColor: COLORS.lightSky,
  },
  servicesSection: {
    alignItems: 'center',
    paddingVertical: hp('2%'),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
});

export default ViewCartScreen;
