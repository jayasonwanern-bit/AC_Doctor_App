import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  TextInput,
  Alert,
} from 'react-native';
import Header from '../../../components/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../../../utils/colors';
import images from '../../../assets/images';
import BookingSlotModal from '../../../customScreen/BookingSlotModal';
import HomeScreenStyles from '../HomeScreenStyles';
import SuccessPopupModal from '../../../customScreen/SuccessPopupModal';
import DeclineModal from '../../../customScreen/DeclineModal';
import CustomButton from '../../../components/CustomButton';

const RequestDetail = ({ navigation }) => {
  const [reqStatus, setReqStatus] = useState('Under Review'); // 'Scheduled', 'ReScheduled', 'Under Review'
  const [detailStatus, setDetailStatus] = useState('Request');
  const [PaymentStatus, setPaymentStatus] = useState('paydetail');
  const [modalSlotVisible, setModalSlotVisible] = useState(false);
  const [selectDate, setSelectDate] = useState('10/03/2025');
  const [selectTime, setSelectTime] = useState('First Half');
  const [successPopupVisible, setSuccessPopupVisible] = useState(false); // Accept successPopup
  const [confirmPopupVisible, setConfirmPopupVisible] = useState(false); // Offer confirm successPopup
  const [DeclineVisible, setDeclineVisible] = useState(false); // Offer confirm successPopup
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
    const isPayment = detailStatus === 'Payment';

    // Step 2: Decide kaun-kaun tab active hoga (red background + white text)
    const isTabActive =
      (status === 'Request' && (isRequest || isQuote || isPayment)) ||
      (status === 'Quote' && (isQuote || isPayment)) || // Quote tab active in Quote & Payment
      (status === 'Payment' && isPayment); // Payment tab active only in Payment

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
        title="Request Details"
        onBack={() => navigation.goBack()}
        // onHelp={true}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <View style={styles.tab}>
            <Text style={[styles.tabNumber, getTabStyle('Request')]}>1</Text>
            <Text style={styles.tabText}>Request</Text>
          </View>
          <Text style={[styles.tabText, { color: '#cececeff' }]}>────</Text>
          <View style={styles.tab}>
            <Text style={[styles.tabNumber, getTabStyle('Quote')]}>2</Text>
            <Text style={styles.tabText}>Quote</Text>
          </View>
          <Text style={[styles.tabText, { color: '#cececeff' }]}>────</Text>
          <View style={styles.tab}>
            <Text style={[styles.tabNumber, getTabStyle('Payment')]}>3</Text>
            <Text style={styles.tabText}>Payment details</Text>
          </View>
        </View>

        {/* Inspection Details Section */}
        {detailStatus === 'Quote' && (
          <Text style={[styles.label]}>
            Request ID{' '}
            <Text style={[styles.label, { color: COLORS.black }]}>#12334</Text>
          </Text>
        )}
        {detailStatus === 'Request' && (
          <TouchableOpacity onPress={() => setReqStatus('Schedule')}>
            <Text style={[styles.label, { color: COLORS.black }]}>
              Inspection Details
            </Text>
          </TouchableOpacity>
        )}

        {/* cooper Piping */}
        {detailStatus === 'Request' && (
          <View style={styles.section}>
            <View style={styles.statusBar}>
              <View style={styles.statusBarRow}>
                <View style={styles.statusInfo}>
                  <Image source={images.copperIcon} style={styles.icon} />
                  <Text style={styles.statusText}>Copper Piping</Text>
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
                <Text style={[styles.value, { marginLeft: hp(1) }]}>
                  #12345
                </Text>
              </View>
            </View>

            <View style={styles.copperRow}>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Submitted On</Text>
                <Text style={styles.value}>05/03/2025</Text>
              </View>
              <View style={[styles.detailRow, { paddingRight: hp(3) }]}>
                <Text style={styles.label}>Type of AC</Text>
                <Text style={styles.value}>Split AC-2{'\n'}Window AC-1</Text>
              </View>
            </View>
            <View style={styles.copperRow}>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Pipe Run Length</Text>
                <Text style={styles.value}>3-5m</Text>
              </View>
              <View style={[styles.detailRow, { paddingRight: hp(1) }]}>
                <Text style={styles.label}>Agent Assigned</Text>
                <Text style={styles.value}>-</Text>
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
        )}

        {/* === SECTION 1: Quote Tab - Decline/Accept Buttons === */}
        {(detailStatus === 'Quote' ||
          (detailStatus !== 'Payment' &&
            ['Accepted', 'Decline'].includes(reqStatus))) && (
          <View style={styles.section}>
            {/* Status Row */}
            {reqStatus === 'Accepted' && (
              <View style={styles.copperRow}>
                <Text style={styles.label}>Status</Text>
                <Text
                  style={[
                    styles.value,
                    {
                      color: COLORS.darkgreen,
                      fontFamily: Fonts.semiBold,
                      backgroundColor: COLORS.lightgreen,
                    },
                  ]}
                >
                  {' '}
                  ✅ Accepted
                </Text>
              </View>
            )}
            {reqStatus === 'Decline' && (
              <View style={styles.copperRow}>
                <Text style={styles.label}>Status</Text>
                <Text
                  style={[
                    styles.value,
                    {
                      color: COLORS.red,
                      fontFamily: Fonts.semiBold,
                      backgroundColor: COLORS.Lightred,
                    },
                  ]}
                >
                  {' '}
                  ❌ Declined
                </Text>
              </View>
            )}

            <View style={styles.copperRow}>
              <Text style={styles.label}>Offer Amount</Text>
              <Text style={[styles.value,{color:COLORS.themeColor}]}>₹ 25000/-</Text>
            </View>
            <View style={styles.copperRow}>
              <Text style={styles.label}>Property Type</Text>
              <Text style={styles.value}>Flat</Text>
            </View>
            <View style={styles.copperRow}>
              <Text style={styles.label}>Type of AC</Text>
              <Text style={styles.value}>Split AC-2{'\n'}Window AC-1</Text>
            </View>
            <View style={styles.copperRow}>
              <Text style={styles.label}>Inspection Remarks</Text>
              <Text style={styles.value}>LoremIpsum dolor sit amret</Text>
            </View>
            <View style={[styles.copperRow, { justifyContent: 'center' }]}>
              <Text
                style={[
                  styles.label,
                  {
                    textDecorationLine: 'underline',
                    color: COLORS.themeColor,
                    textAlign: 'center',
                  },
                ]}
              >
                Hide Copper Piping Details
              </Text>
            </View>

            {/* Buttons */}
            {detailStatus === 'Quote' &&
              reqStatus !== 'Accepted' &&
              reqStatus !== 'Decline' && (
              <View style={styles.copperRow}>
                <TouchableOpacity
                  style={[styles.doneButton, { backgroundColor: COLORS.white }]}
                  onPress={() => setDeclineVisible(true)}
                >
                  <Text
                    style={[
                      styles.doneButtonText,
                      { color: COLORS.textHeading },
                    ]}
                  >
                    Decline
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.doneButton, styles.secondButton]}
                  onPress={() => setSuccessPopupVisible(true)}
                >
                  <Text style={styles.doneButtonText}>Accept</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {detailStatus === 'Payment' && (
          <>
            <Text style={[styles.label, { color: COLORS.black }]}>
              {' '}
              Request ID #1234
            </Text>
            <View style={[styles.section]}>
              <View style={styles.copperRow}>
                <Text style={styles.label}>Flat</Text>
                <Text style={[styles.value, { fontFamily: Fonts.semiBold }]}>
                  ₹ 25000/-
                </Text>
              </View>
              <Text style={[styles.label, { paddingTop: hp(1) }]}>
                Split AC-2{'\n'}Window AC-1
              </Text>

              <View style={styles.copperRow}>
                <Text style={styles.label}>Pipe Run Length 10m</Text>
                <Text
                  style={[
                    styles.label,
                    {
                      textDecorationLine: 'underline',
                      color: COLORS.themeColor,
                      textAlign: 'center',
                    },
                  ]}
                >
                  Download Offer Agreement
                </Text>
              </View>
            </View>
          </>
        )}

        {detailStatus === 'Payment' && (
          <>
            <Text style={[styles.label, { color: COLORS.black }]}>
              {' '}
              Payment mode selection
            </Text>
            <View style={[styles.section]}>
              <TouchableOpacity
                style={styles.statusInfo}
                onPress={() => setSelectedPay('bank')}
                activeOpacity={0.5}
              >
                <Image
                  source={
                    selectPay === 'bank' ? images.onbutton : images.offbutton
                  }
                  style={styles.IconImage}
                />
                <Text style={styles.label}>{'  '}Bank Transfer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.statusInfo}
                onPress={() => setSelectedPay('upi')}
                activeOpacity={0.5}
              >
                <Image
                  source={
                    selectPay === 'upi' ? images.onbutton : images.offbutton
                  }
                  style={styles.IconImage}
                />
                <Text style={styles.label}>{'  '}UPI</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.statusInfo}
                onPress={() => setSelectedPay('Pickup')}
                activeOpacity={0.5}
              >
                <Image
                  source={
                    selectPay === 'Pickup' ? images.onbutton : images.offbutton
                  }
                  style={styles.IconImage}
                />
                <Text style={styles.label}>{'  '}Cash on Pickup</Text>
              </TouchableOpacity>

              <Text
                style={[
                  styles.label,
                  { marginVertical: wp(1.5), color: COLORS.black },
                ]}
              >
                Enter your UPI ID
              </Text>
              <View
                style={{
                  borderRadius: hp(5),
                  borderWidth: wp(0.3),
                  borderColor: COLORS.lightGray,
                  padding: hp(1.7),
                  marginVertical: wp(1.5),
                }}
              >
                <TextInput
                  placeholder="Type here..."
                  placeholderTextColor={COLORS.textColor}
                  keyboardType="default"
                  value={upiId}
                  onChange={txt => setupiId(txt)}
                />
              </View>
            </View>
          </>
        )}

        {/* Copper Piping Details Section */}
        {detailStatus !== 'Payment' && (
          <>
            {detailStatus !== 'Quote' && (
              <Text style={styles.sectionTitle}>Copper Piping details</Text>
            )}
            <View
              style={[
                styles.section,
                { marginBottom: detailStatus === 'Request' ? hp(10) : hp(0) },
              ]}
            >
              <View style={styles.copperRow}>
                <Text style={styles.label}>Property type</Text>
                <Text style={styles.value}>Flat</Text>
              </View>
              <View style={styles.copperRow}>
                <Text style={styles.label}>Type of AC</Text>
                <Text style={styles.value}>Split AC-2{'\n'}Window AC-1</Text>
              </View>
              <View style={styles.copperRow}>
                <Text style={styles.label}>Outdoor Condenser Location</Text>
                <Text style={styles.value}>Wall mounted low</Text>
              </View>
              <View style={styles.copperRow}>
                <Text style={styles.label}>Pipe Run Length</Text>
                <Text style={styles.value}>3-5m</Text>
              </View>

              {/* Photos/Drawings Section */}
              <Text style={[styles.sectionTitle, { marginVertical: hp(1.5) }]}>
                Photos/Drawings
              </Text>
              <View style={styles.photoGrid}>
                <Image source={images.ShareImg} style={styles.photo} />
                <Image source={images.ShareImg1} style={styles.photo} />
                <ImageBackground source={images.demoAc} style={styles.photo}>
                  <View style={styles.playButton}>
                    <Image source={images.Play} style={styles.playIconImage} />
                  </View>
                </ImageBackground>
              </View>

              {/* Preferred Inspection Date and Time */}
              <TouchableOpacity
                style={styles.copperRow}
                onPress={() => setModalSlotVisible(true)}
              >
                <Text style={styles.label}>Preferred Inspection Date</Text>
                <Text style={styles.value}>{selectDate}</Text>
              </TouchableOpacity>
              <View style={styles.copperRow}>
                <Text style={styles.label}>Preferred Inspection Time</Text>
                <Text style={styles.value}>{selectTime}</Text>
              </View>

              {/* Additional Note */}
              <Text style={[styles.sectionTitle, { marginTop: hp(1) }]}>
                Additional Note
              </Text>
              <Text style={styles.noteText}>
                Lorem ipsum dolor sit amet consectetur. Neque orci lorem sed in.
                Lectus aliquet mattis condimentum eu tempus ac lorem.
              </Text>
            </View>
          </>
        )}

        {/* banner image */}
        {detailStatus !== 'Request' && (
          <>
            {detailStatus === 'Quote' && (
              <View style={HomeScreenStyles.worksliderview}>
                <Image
                  source={images.bannerTwo}
                  style={HomeScreenStyles.workimage}
                />
              </View>
            )}

            <View
              style={[HomeScreenStyles.brandcont, { marginBottom: hp(10) }]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={images.helpdesk}
                  style={HomeScreenStyles.smallimage}
                />
                <Text style={HomeScreenStyles.needHelp}>Need Help?</Text>
              </View>
              <Image
                source={images.chatIcon}
                style={HomeScreenStyles.chaticon}
              />
            </View>
          </>
        )}
      </ScrollView>

      {/* Cancel and Reschedule Buttons */}
      {detailStatus === 'Request' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setCancelReqVisible(true)}
            style={[styles.doneButton, { backgroundColor: COLORS.white }]}
          >
            <Text
              style={[styles.doneButtonText, { color: COLORS.textHeading }]}
            >
              Cancel Request
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.doneButton, styles.secondButton]}
            onPress={() => setModalSlotVisible(true)}
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

      {detailStatus === 'Payment' && (
        <View style={HomeScreenStyles.servicesSection}>
          <CustomButton
            buttonName="Submit"
            margingTOP={hp('0%')}
            btnTextColor={COLORS.white}
            btnColor={COLORS.themeColor}
            onPress={() => navigation.goBack()}
          />
        </View>
      )}

      {reqStatus === 'Accepted' &&
        (detailStatus === 'Quote') && (
          <View style={HomeScreenStyles.servicesSection}>
            <CustomButton
              buttonName="Proceed to payment Details "
              margingTOP={hp('0%')}
              btnTextColor={COLORS.white}
              btnColor={COLORS.themeColor}
              onPress={() => setDetailStatus('Payment')}
            />
          </View>
        )}

      {detailStatus === 'Payment' && (
          <View style={HomeScreenStyles.servicesSection}>
            <CustomButton
              buttonName="Proceed to payment Details "
              margingTOP={hp('0%')}
              btnTextColor={COLORS.white}
              btnColor={COLORS.themeColor}
              onPress={() => setDetailStatus('Payment')}
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
          setCancelConfirmVisible(false), navigation.goBack();
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

      <SuccessPopupModal
        visible={confirmPopupVisible}
        onClose={() => {
          setReqStatus('Accepted');
          setConfirmPopupVisible(false);
        }}
        HeadText="Offer Accepted!"
        message1="Your request has been submitted."
        message2="Our team will connect with for further process."
        buttonCount={1}
        firstButtonText="Done"
      />

      <DeclineModal
        visible={DeclineVisible}
        onClose={() => {
          setDeclineVisible(false);
        }}
        onFirstButtonPress={() => {
          setDeclineVisible(false), setReqStatus('Decline');
        }}
        HeadTextColor={COLORS.red}
        setIcon={images.processReject}
        HeadText="Decline"
        message1="Are you sure you want to decline the offer"
        message2="for your AC?"
        buttonCount={2}
        firstButtonText="Confirm Decline"
        secondButtonText="No"
        secondButton={() => {
          setDeclineVisible(false),
            setDetailStatus('Payment'),
            setPaymentStatus('No');
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: hp(1),
    backgroundColor: COLORS.white,
    marginVertical: hp(2),
    borderRadius: wp(4),
  },
  tab: {
    alignItems: 'center',
    paddingHorizontal: wp(2),
  },
  tabNumber: {
    fontSize: hp(1.8),
    fontWeight: Fonts.medium,
    color: '#333',
    width: wp(5.3),
    textAlign: 'center',
    marginRight: wp(1),
    borderRadius: hp(6),
  },
  tabText: {
    fontSize: hp(1.6),
    fontWeight: Fonts.medium,
    color: '#333',
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

export default RequestDetail;
