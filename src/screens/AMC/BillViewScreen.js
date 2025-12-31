import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Header from '../../components/Header';
import { COLORS, Fonts } from '../../utils/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import images from '../../assets/images';
import CustomButton from '../../components/CustomButton';

const BillViewScreen = ({ navigation, route }) => {
  const { ticketId } = route.params;

  return (
    <View style={styles.container}>
      <Header title="View Bill" onBack={() => navigation.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ padding: wp('4%') }}
        nestedScrollEnabled={true}
      >
        {/* USER CARD */}
        <View style={[styles.card, { padding: wp('4%') }]}>
          <View style={styles.rowBetween}>
            <View style={{ width: '50%' }}>
              <Text style={styles.label}>Customer Name</Text>
              <Text style={styles.value}>Irshad Khan</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.changeBtn,
                {
                  backgroundColor:
                    ticketId.status === 'In Progress'
                      ? COLORS.pendingBg
                      : ticketId.status === 'On Hold'
                      ? COLORS.onHoldBg
                      : COLORS.completedBg,
                },
              ]}
            >
              <Text
                style={[
                  styles.changeText,
                  {
                    color:
                      ticketId.status === 'In Progress'
                        ? COLORS.pendingText
                        : ticketId.status === 'On Hold'
                        ? COLORS.onHoldText
                        : COLORS.completedText,
                  },
                ]}
              >
                {ticketId.status}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.rowBetween}>
            <View style={{ width: '50%' }}>
              <Text style={styles.label}>Ticket ID</Text>
              <Text style={styles.value}>{ticketId.ticket}</Text>
            </View>

            <View style={{ alignItems: 'flex-start' }}>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.value}>24 October 2025</Text>
            </View>
          </View>
        </View>

        {/* Payment Summary */}
        <View style={[styles.card, { paddingHorizontal: wp('4%') }]}>
          <Text style={styles.headText}>Payment Summary</Text>

          <View style={styles.flewView}>
            <Text style={styles.workText}>Item Total</Text>
            <Text style={styles.workText}>₹ 3680</Text>
          </View>

          <View style={styles.flewView}>
            <Text style={styles.workText}>Item Discount</Text>
            <Text style={styles.workText}>-₹ 150</Text>
          </View>

          <View style={styles.flewView}>
            <Text style={styles.workText}>Taxes and Fee</Text>
            <Text style={styles.workText}>₹ 69</Text>
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
            <Text style={styles.workText}>Total</Text>
            <Text style={styles.workText}>₹ 3540</Text>
          </View>

          <View style={styles.yayView}>
            <Image source={images.tag} style={styles.tagicon} />
            <Text
              style={[
                styles.viewCartText,
                {
                  color: COLORS.themeColor,
                  fontFamily: Fonts.regular,
                },
              ]}
            >
              Yay! you have saved ₹ 150 on final bill
            </Text>
          </View>
        </View>

        <CustomButton
          buttonName={'Download PDF'}
          btnTextColor={COLORS.white}
          // margingTOP={hp(5)}
          onPress={() => navigation.navigate('PaymentScreen')}
        />
      </ScrollView>
    </View>
  );
};

export default BillViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: hp('2.5%'),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  label: {
    fontSize: hp('1.6%'),
    color: '#888',
  },

  value: {
    fontSize: hp('1.6%'),
    fontFamily: Fonts.semiBold,
    marginTop: hp('0.7%'),
    color: '#000',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: hp('2%'),
  },

  areaTitle: {
    fontSize: hp('1.6%'),
    fontFamily: Fonts.semiBold,
    color: '#000',
  },

  address: {
    marginTop: hp('0.6%'),
    fontSize: hp('1.6%'),
    color: COLORS.gray,
    lineHeight: hp('2.2%'),
  },

  changeBtn: {
    alignSelf: 'flex-start',
    paddingVertical: hp('0.7%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 18,
  },

  changeText: {
    color: COLORS.themeColor,
    fontSize: hp('1.6%'),
    fontFamily: Fonts.semiBold,
  },

  //   payment summary styles
  headText: {
    fontSize: hp('1.5%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.black,
    marginTop: hp('1.5%'),
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
    color: COLORS.black,
    fontFamily: Fonts.medium,
  },

  workButton: {
    borderWidth: 1,
    borderRadius: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    width: wp('7.5%'),
    height: hp('3.5%'),
    alignSelf: 'center',
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: wp(92.2),
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomLeftRadius: wp(2),
    borderBottomRightRadius: wp(2),
    backgroundColor: COLORS.lightSky,
  },
  tagicon: {
    width: wp('6%'),
    height: wp('4%'),
    resizeMode: 'contain',
    margin: wp('3%'),
  },
});
