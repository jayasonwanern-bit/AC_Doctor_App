import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
  Keyboard,
} from 'react-native';
import Header from '../../components/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../../utils/colors';
import images from '../../assets/images';
import BookingSlotModal from '../../customScreen/BookingSlotModal';
import HomeScreenStyles from '../Home/HomeScreenStyles';
import SuccessPopupModal from '../../customScreen/SuccessPopupModal';
import DeclineModal from '../../customScreen/DeclineModal';
import CustomButton from '../../components/CustomButton';

const AMCRequestFrom = ({ navigation }) => {
  const [reqStatus, setReqStatus] = useState('Under Review'); // 'Scheduled', 'ReScheduled', 'Under Review'
  const [detailStatus, setDetailStatus] = useState('Request');
  const [PaymentStatus, setPaymentStatus] = useState('paydetail');
  const [modalSlotVisible, setModalSlotVisible] = useState(false);
  const [selectDate, setSelectDate] = useState('10/03/2025');
  const [selectTime, setSelectTime] = useState('First Half');
  const [successPopupVisible, setSuccessPopupVisible] = useState(false); // Accept successPopup
  const [confirmPopupVisible, setConfirmPopupVisible] = useState(false); // Offer confirm successPopup
  const [DeclineVisible, setDeclineVisible] = useState(false); // Offer confirm successPopup
  const [rescheduleReqVisible, setRescheduleReqVisible] = useState(false);
  const [cancelReqVisible, setCancelReqVisible] = useState(false);
  const [cancelConfirmVisible, setCancelConfirmVisible] = useState(false);
  const [selectPay, setSelectedPay] = useState('bank');
  const [upiId, setupiId] = useState('');

  const handleSlotSelection = slot => {
    if (slot) {
      const { date, monthNumber, year, time, Timeslot } = slot;
      const formattedDate = `${String(date).padStart(2, '0')}/${String(
        monthNumber,
      ).padStart(2, '0')}/${year}`;
      const formattedTime =
        time === 'morning' || time === 'firstHalf' ? 'First Half' : Timeslot;
      setSelectDate(formattedDate);
      setSelectTime(formattedTime);
      setReqStatus('ReScheduled');
    }
  };

  const getTabStyle = status => {
    // Step 1: Check current status
    const isRequest = detailStatus === 'Request';
    const isQuote = detailStatus === 'Quote';
    // const isPayment = detailStatus === 'Payment';

    // Step 2: Decide kaun-kaun tab active hoga (red background + white text)
    const isTabActive =
      (status === 'Request' && (isRequest || isQuote)) ||
      (status === 'Quote' && isQuote);
    // ||  (status === 'Payment' && isPayment); /

    // Step 3: Return style based on active or not
    return {
      color: isTabActive ? COLORS.white : COLORS.textHeading,
      backgroundColor: isTabActive ? COLORS.red : 'transparent',
      borderColor: isTabActive ? COLORS.red : COLORS.textHeading,
      borderWidth: isTabActive ? 0 : hp(0.1),
      borderRadius: hp(4),
      marginHorizontal: wp(1),
    };
  };

  return (
    <View style={styles.container}>
      <Header
        title="View Request"
        onBack={() => navigation.goBack()}
        // onHelp={true}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* cooper Piping */}

        <View style={styles.section}>
          <View style={styles.statusBar}>
            <View style={styles.statusBarRow}>
              <View style={styles.statusInfo}>
                <Image source={images.AMCicon} style={styles.icon} />
                <Text style={styles.statusText}>AMC</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      reqStatus === 'Scheduled'
                        ? '#FFE7CF'
                        : reqStatus === 'ReScheduled'
                        ? COLORS.lightSky
                        : reqStatus === 'complete'
                        ? '#ECFFE9'
                        : '#fff4c5ff',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusBadgeText,
                    {
                      color:
                        reqStatus === 'Scheduled'
                          ? '#D26900'
                          : reqStatus === 'ReScheduled'
                          ? COLORS.themeColor
                          : reqStatus === 'complete'
                          ? '#128807'
                          : '#ee9937ff',
                    },
                  ]}
                >
                  {reqStatus === 'Scheduled'
                    ? 'Scheduled'
                    : reqStatus === 'ReScheduled'
                    ? 'Re Scheduled'
                    : reqStatus === 'complete'
                    ? 'Completed'
                    : 'Under Review'}
                </Text>
              </View>
            </View>
            <View style={styles.statusInfo}>
              <Text style={styles.label}>Request ID</Text>
              <Text style={[styles.value, { marginLeft: hp(1) }]}>#12345</Text>
            </View>
          </View>

          <View style={styles.copperRow}>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>Sachin</Text>
            </View>
            <View style={[styles.detailRow, { paddingRight: hp(3) }]}>
              <Text style={styles.label}>Place Type</Text>
              <Text style={styles.value}>Residental</Text>
            </View>
          </View>
          <View style={styles.copperRow}>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.value}> 149, Vijay Nagar, Indore</Text>
            </View>
          </View>

          {/* Assigned Agent */}
          {['Scheduled', 'ReScheduled'].includes(reqStatus) && (
            <>
              <Text style={styles.sectionTitle}>Assigned Agent</Text>
              <View style={styles.agentContainer}>
                <View style={styles.agentInfo}>
                  <Image source={images.userphoto} style={styles.agentImage} />
                  <View style={styles.agentText}>
                    <View
                      style={[
                        styles.agentHeader,
                        { marginLeft: wp(-1), marginBottom: hp(1) },
                      ]}
                    >
                      <Image
                        source={images.profile}
                        style={[styles.icon, { resizeMode: 'contain' }]}
                      />
                      <Text style={styles.agentName}>Mohan Verma</Text>
                    </View>
                    <Text style={styles.agentTitle}>AC Doctor agent</Text>
                  </View>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.viewProfileButton}>
                    <Text style={styles.viewProfileText}>View Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.chatButton}>
                    <Image source={images.chatIcon} style={styles.chatIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* Cancel and Reschedule Buttons */}
      {detailStatus === 'Request' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() =>
              setReqStatus(prev =>
                prev === 'Scheduled' ? 'complete' : 'Scheduled',
              )
            }
            style={[styles.doneButton, { backgroundColor: COLORS.white }]}
          >
            <Text
              style={[styles.doneButtonText, { color: COLORS.textHeading }]}
            >
              Next
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.doneButton, styles.secondButton]}
            onPress={() => setRescheduleReqVisible(true)}
          >
            <Text style={styles.doneButtonText}>Reschedule</Text>
          </TouchableOpacity>
        </View>
      )}

      {PaymentStatus === 'Confirm' && (
        <View style={HomeScreenStyles.servicesSection}>
          <CustomButton
            buttonName="Proceed To Payment Details"
            margingTOP={hp('0%')}
            btnTextColor={COLORS.white}
            btnColor={COLORS.themeColor}
            onPress={() => setPaymentStatus('paydetail')}
          />
        </View>
      )}

      {reqStatus === 'ReScheduled' && (
        <View style={HomeScreenStyles.servicesSection}>
          <CustomButton
            buttonName="Next"
            margingTOP={hp('0%')}
            btnTextColor={COLORS.white}
            btnColor={COLORS.themeColor}
            onPress={() => setReqStatus('complete')}
          />
        </View>
      )}

      {reqStatus === 'complete' && detailStatus === 'Request' && (
        <View style={HomeScreenStyles.servicesSection}>
          <CustomButton
            buttonName="Next"
            margingTOP={hp('0%')}
            btnTextColor={COLORS.white}
            btnColor={COLORS.themeColor}
            onPress={() => setDetailStatus('Quote')}
          />
        </View>
      )}

      {/* Reschedulerequest Popup */}
      <SuccessPopupModal
        visible={rescheduleReqVisible}
        onClose={() => {
          setRescheduleReqVisible(false), setCancelReqVisible(true);
        }}
        setIcon={images.questionMark}
        HeadTextColor="black"
        HeadText="Are you sure?"
        message1=""
        message2="Do you really want to cancel this request?"
        buttonCount={2}
        firstButtonText="Cancel Reschedule"
        secondButtonText="Reschedule"
        onSecondButtonPress={() => {
          setRescheduleReqVisible(false), setModalSlotVisible(true);
        }}
      />

      {/* cancel request Popup */}
      <SuccessPopupModal
        visible={cancelReqVisible}
        onClose={() => {
          setCancelReqVisible(false);
        }}
        setIcon={images.questionMark}
        HeadTextColor="black"
        HeadText="Are you sure?"
        message1=""
        message2="Do you really want to cancel this request?"
        buttonCount={2}
        firstButtonText="Not Now"
        secondButtonText="Yes i'm"
        onSecondButtonPress={() => {
          setCancelReqVisible(false), setCancelConfirmVisible(true);
        }}
      />
      {/* confirm cancel request Popup */}
      <SuccessPopupModal
        visible={cancelConfirmVisible}
        onClose={() => {
          setCancelConfirmVisible(false);
          setReqStatus('Scheduled');
        }}
        setIcon={images.cancelRed}
        HeadTextColor="black"
        HeadText="Cancelled!"
        message1=""
        message2="You request has been successfully cancelled."
        buttonCount={2}
        secondButtonText="Done"
        firstButtonText="View Request"
        onSecondButtonPress={() => {
          setCancelConfirmVisible(false);
        }}
      />

      {/* Success Popup */}
      <SuccessPopupModal
        visible={successPopupVisible}
        onClose={() => {
          setSuccessPopupVisible(false);
        }}
        setIcon={images.processDone}
        HeadTextColor="green"
        HeadText="Yeah!"
        message1="Are you sure you want to proceed"
        message2="with this offer?"
        buttonCount={2}
        secondButtonText="Confirm"
        firstButtonText="No"
        onSecondButtonPress={() => {
          setSuccessPopupVisible(false), setConfirmPopupVisible(true);
        }}
      />

      {/* Booking Slot Modal */}
      <BookingSlotModal
        visible={modalSlotVisible}
        onClose={() => setModalSlotVisible(false)}
        setSelectedSlot={handleSlotSelection}
        onBookProcess={() => setModalSlotVisible(false)}
        isReschedule={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: hp(1),
  },
  section: {
    backgroundColor: COLORS.white,
    marginVertical: hp(1),
    borderRadius: wp(3),
    paddingHorizontal: hp(2),
    elevation: 2,
  },
  statusBar: {
    backgroundColor: '#e9f4fb',
    padding: hp(0.5),
    borderTopLeftRadius: wp(3),
    borderTopRightRadius: wp(3),
    width: wp(95.5),
    alignSelf: 'center',
  },
  statusBarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: wp(1),
  },
  icon: {
    width: wp(6),
    height: hp(1.5),
    resizeMode: 'cover',
  },
  statusText: {
    fontSize: hp(1.5),
    fontFamily: Fonts.medium,
    color: COLORS.textHeading,
    marginLeft: wp(1),
  },
  statusBadge: {
    backgroundColor: '#fff4c5ff',
    borderRadius: wp(1),
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2),
    marginRight: wp(2),
    marginTop: hp(1),
  },
  statusBadgeText: {
    fontSize: hp(1.3),
    fontFamily: Fonts.medium,
    color: '#ee9937ff',
  },
  detailRow: {
    paddingVertical: hp(0.3),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  copperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(0.9),
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: wp(0.1),
  },
  label: {
    fontSize: hp(1.5),
    fontFamily: Fonts.medium,
    color: '#666',
    marginBottom: wp(1),
  },
  value: {
    fontSize: hp(1.4),
    fontFamily: Fonts.medium,
    color: COLORS.black,
  },
  sectionTitle: {
    fontSize: hp(1.6),
    fontFamily: Fonts.medium,
    color: COLORS.black,
    paddingVertical: hp(0.5),
  },
  photoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  photo: {
    width: wp(26),
    height: hp(12),
    borderRadius: wp(2.5),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: wp(6),
    padding: hp(1),
  },
  playIconImage: {
    width: wp(5),
    height: hp(2),
    tintColor: COLORS.white,
  },
  noteText: {
    fontSize: hp(1.5),
    fontFamily: Fonts.regular,
    color: COLORS.TextColor,
    textAlign: 'left',
    marginVertical: hp(1),
  },
  agentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    padding: hp(1.5),
    borderRadius: wp(1),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: hp(1),
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agentImage: {
    width: wp(13),
    height: wp(15),
    borderRadius: wp(2),
    marginRight: wp(3),
  },
  agentText: {
    flexShrink: 1,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  agentName: {
    fontSize: hp(1.5),
    fontFamily: Fonts.medium,
    color: COLORS.black,
    marginLeft: wp(1),
  },
  agentTitle: {
    fontSize: hp(1.3),
    color: '#666',
  },
  actionButtons: {
    alignItems: 'center',
  },
  viewProfileButton: {
    paddingVertical: hp(0.8),
    paddingHorizontal: wp(3),
  },
  viewProfileText: {
    fontSize: hp(1.4),
    color: COLORS.themeColor,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    borderRadius: wp(2),
    borderWidth: wp(0.1),
    borderColor: COLORS.themeColor,
  },
  chatIcon: {
    width: wp(9),
    height: hp(2.5),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: hp(2),
    backgroundColor: COLORS.white,
    paddingBottom: wp(6),
  },
  doneButton: {
    width: wp(42),
    paddingVertical: hp(1.5),
    alignItems: 'center',
    borderWidth: wp(0.1),
    borderColor: COLORS.textHeading,
    borderRadius: wp(6),
  },
  secondButton: {
    backgroundColor: COLORS.themeColor,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: hp(1.6),
    fontWeight: '500',
  },
  IconImage: {
    width: wp(4),
    height: hp(1.5),
  },
});

export default AMCRequestFrom;
