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
import DropDownPicker from 'react-native-dropdown-picker';
import { Value } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';
import FastImage from 'react-native-fast-image';

const OldACRequest = ({ navigation }) => {
  const [reqStatus, setReqStatus] = useState(''); //Schedule, ReScheduled, complete, Accepted, Decline
  const [detailStatus, setDetailStatus] = useState('Request'); // 'Request', 'Quote', 'Payment'
  const [PaymentStatus, setPaymentStatus] = useState('paydetail');
  const [modalSlotVisible, setModalSlotVisible] = useState(false);
  const [AcceptVisible, setAcceptVisible] = useState(false);
  const [confirmAcceptVisible, setConfirmAcceptVisible] = useState(false);
  const [selectdate, setSelectDate] = useState('Select date');
  const [selectTime, setSelectTime] = useState('First Half');
  const [selectReason, setSelectReason] = useState('');
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [confirmPopupVisible, setConfirmPopupVisible] = useState(false); // Offer confirm successPopup
  const [DeclineVisible, setDeclineVisible] = useState(false); // Offer confirm successPopup
  const [selectPay, setSelectedPay] = useState('bank');
  const [upiId, setupiId] = useState('');
  const [open, setOpen] = useState(false); // For dropdown open/close
  const [expandedAC, setExpandedAC] = useState(null);

  const acData = {
    LG: {
      brand: { title: 'Brand', value: 'LG' },
      model: { title: 'Model', value: 'LG US-Q19RTY' },
      acType: { title: 'AC Type', value: 'Split' },
      tonnage: { title: 'Tonnage', value: '2 Ton' },
      age: { title: 'Age of AC', value: '2-4 Years' },
      condition: { title: 'Condition', value: 'Excellent' },
      technology: { title: 'AC Technology', value: 'Inverter' },
      inspectionDate: {
        title: 'Preferred Inspection Date',
        value: '15/03/2025',
      },
      inspectionTime: {
        title: 'Preferred Inspection Time',
        value: 'Second Half',
      },
      image: { title: 'Image', value: images.ShareImg },
      image: { title: 'Image', value: images.ShareImg1 },
      image: { title: 'Image', value: images.demoAc },
    },
    Samsung: {
      brand: { title: 'Brand', value: 'Samsung' },
      model: { title: 'Model', value: 'Samsung AR18TY3Q' },
      acType: { title: 'AC Type', value: 'Split' },
      tonnage: { title: 'Tonnage', value: '2 Ton' },
      age: { title: 'Age of AC', value: '2-4 Years' },
      condition: { title: 'Condition', value: 'Excellent' },
      technology: { title: 'AC Technology', value: 'Inverter' },
      inspectionDate: {
        title: 'Preferred Inspection Date',
        value: '15/03/2025',
      },
      inspectionTime: {
        title: 'Preferred Inspection Time',
        value: 'Second Half',
      },
      image: { title: 'Image', value: images.ShareImg },
      image: { title: 'Image', value: images.ShareImg1 },
      image: { title: 'Image', value: images.demoAc },
    },
  };
  const toggleExpand = acName => {
    setExpandedAC(expandedAC === acName ? null : acName);
  };

  const handleSlotSelection = slot => {
    if (slot) {
      const { date, monthNumber, year, time, Timeslot, reason } = slot;
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
      (status === 'Request' && (isRequest || isQuote || isPayment)) || // Request tab active in all 3 states
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
        title="AC Request Details"
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

        {/* Inspection Details  Schedule Section */}
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
        {detailStatus === 'Request' && (
          <>
            <View style={styles.section}>
              <View style={styles.statusBar}>
                <View style={styles.statusBarRow}>
                  <View style={styles.statusInfo}>
                    <Image source={images.copperIcon} style={styles.icon} />
                    <Text style={styles.statusText}>Old AC</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          reqStatus === 'Schedule'
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
                            reqStatus === 'Schedule'
                              ? '#D26900'
                              : reqStatus === 'ReScheduled'
                              ? COLORS.themeColor
                              : reqStatus === 'complete'
                              ? '#128807'
                              : '#ee9937ff',
                        },
                      ]}
                    >
                      {reqStatus === 'Schedule'
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
                  <Text style={styles.label}>
                    {reqStatus === 'Schedule'
                      ? 'Inspection Date & Time'
                      : 'Submitted On'}
                  </Text>
                  <Text style={styles.value}>
                    {reqStatus === 'Schedule'
                      ? '5/03/2025-First half'
                      : '5/03/2025'}
                  </Text>
                </View>
                <View style={[styles.detailRow, { paddingRight: hp(0) }]}>
                  <Text style={styles.label}>Requested Service Details</Text>
                  <Text style={styles.value}>LG, Dakin</Text>
                </View>
              </View>
              {reqStatus !== 'Schedule' && (
                <View style={styles.copperRow}>
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Number of AC</Text>
                    <Text style={styles.value}>2</Text>
                  </View>
                  <View style={[styles.detailRow, { paddingRight: hp(7.5) }]}>
                    <Text style={styles.label}>Agent Assigned</Text>
                    <Text style={styles.value}>
                      {reqStatus === 'complete' ? 'Mohan Verma' : '-'}
                    </Text>
                  </View>
                </View>
              )}
              {reqStatus === 'complete' && (
                <View style={styles.copperRow}>
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Final Offer</Text>
                    <Text style={styles.value}>₹ 650000/-</Text>
                  </View>
                  <View style={[styles.detailRow, { paddingRight: hp(1) }]}>
                    <Text style={styles.label}>Status</Text>
                    <Text style={styles.value}>Pending</Text>
                  </View>
                </View>
              )}
              {/* Additional Note */}
              {reqStatus === 'complete' && (
                <>
                  <Text style={styles.noteText}>
                    Note : Lorem ipsum dolor sit amet consectetur. Neque orci
                    lorem sed in. Lectus aliquet mattis condimentum eu tempus ac
                    lorem.
                  </Text>
                </>
              )}

              {/* Assigned Agent */}
              {reqStatus === 'Schedule' && (
                <>
                  <Text style={styles.sectionTitle}>Assigned Agent</Text>
                  <View style={styles.agentContainer}>
                    <View style={styles.agentInfo}>
                      <Image
                        source={images.userphoto}
                        style={styles.agentImage}
                      />
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
                        <Image
                          source={images.chatIcon}
                          style={styles.chatIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </View>
          </>
        )}

        {detailStatus === 'Payment' && (
          <>
            <Text style={[styles.label, { color: COLORS.black }]}>
              {' '}
              Request ID #1234
            </Text>
            <View style={[styles.section]}>
              <View style={styles.copperRow}>
                <Text style={styles.label}>Dakin</Text>
                <Text style={[styles.value, { fontFamily: Fonts.semiBold }]}>
                  ₹ 25000/-
                </Text>
              </View>
              <Text style={[styles.label, { paddingTop: hp(1) }]}>
                Dakin 9Q12YTYG
              </Text>

              <View style={styles.copperRow}>
                <Text style={styles.label}>Split 1.5Ton</Text>
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

        {/*  Payment mode selection */}
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

        {/* Status Section */}
        {(detailStatus === 'Quote' ||
          (detailStatus !== 'Payment' &&
            ['Accepted', 'Decline'].includes(reqStatus))) && (
          <View style={[styles.section]}>
            {(reqStatus === 'Accepted' ||
              detailStatus !== 'Payment' ||
              reqStatus === 'Decline') && (
              <View style={styles.copperRow}>
                <Text style={styles.label}>Status</Text>
                {reqStatus === 'Accepted' && (
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
                )}
                {reqStatus === 'Decline' && (
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
                )}
              </View>
            )}

            <View style={styles.copperRow}>
              <Text style={styles.label}>Offer Amount</Text>
              <Text
                style={[
                  styles.value,
                  { color: COLORS.themeColor, fontFamily: Fonts.semiBold },
                ]}
              >
                ₹ 25000/-
              </Text>
            </View>
            <View style={styles.copperRow}>
              <Text style={styles.label}>Condition</Text>
              <Text style={styles.value}>Good</Text>
            </View>
            <View style={styles.copperRow}>
              <Text style={styles.label}>Type of AC</Text>
              <Text style={styles.value}>Split AC-2{'\n'}Window AC-1</Text>
            </View>
            <View style={styles.copperRow}>
              <Text style={styles.label}>Age</Text>
              <Text style={styles.value}>3 Years</Text>
            </View>
            <View style={styles.copperRow}>
              <Text style={styles.label}>Inspection Remarks</Text>
              <Text style={styles.value}>Minor scratches, function</Text>
            </View>
            {reqStatus === 'Decline' && (
              <View style={styles.copperRow}>
                <Text style={styles.label}>Reason for Decline</Text>
                <Text style={[styles.value, { color: COLORS.red }]}>
                  Expected a higher offer
                </Text>
              </View>
            )}
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
                View AC Details
              </Text>
            </View>

            {/* btn. */}
            {detailStatus === 'Quote' &&
              reqStatus !== 'Accepted' &&
              reqStatus !== 'Decline' && (
                <View style={styles.copperRow}>
                  <TouchableOpacity
                    style={[
                      styles.doneButton,
                      { backgroundColor: COLORS.white },
                    ]}
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
                    onPress={() => setAcceptVisible(true)}
                  >
                    <Text style={styles.doneButtonText}>Accept</Text>
                  </TouchableOpacity>
                </View>
              )}
          </View>
        )}

        {detailStatus !== 'Payment' && (
          <View style={{ marginBottom: wp(15) }}>
            {detailStatus !== 'Quote' && (
              <TouchableOpacity
                style={[
                  styles.copperRow,
                  { width: wp('90'), alignSelf: 'center' },
                ]}
              >
                <Text style={[styles.label, { color: COLORS.black }]}>
                  Your AC details
                </Text>
                {detailStatus === 'Request' && (
                  <TouchableOpacity style={[styles.copperRow]}>
                    <Image
                      source={images.editIcon}
                      style={styles.showiconStyle}
                    />
                    <Text style={[styles.label, { color: COLORS.themeColor }]}>
                      Edit
                    </Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            )}

            {/* AC Names List */}
            {Object.keys(acData).map(acName => (
              <>
                <TouchableOpacity
                  onPress={() => toggleExpand(acName)}
                  style={styles.acHeader}
                >
                  <Text style={[styles.acTitle, { marginLeft: wp(1) }]}>
                    {acName}
                  </Text>
                  <Text style={styles.arrow}>
                    {expandedAC === acName ? '▲' : '▼'}
                  </Text>
                </TouchableOpacity>

                {expandedAC === acName ? (
                  <View key={acName} style={styles.acItem}>
                    {Object.entries(acData[acName]).map(([key, detail]) => (
                      <>
                        <View key={key} style={styles.copperRow}>
                          <Text style={styles.label}>
                            {detail.title
                              ? detail.title.charAt(0).toUpperCase() +
                                detail.title.slice(1)
                              : key}
                          </Text>
                          <Text
                            style={[
                              styles.value,
                              { fontFamily: Fonts.semiBold },
                            ]}
                          >
                            {detail.value}
                          </Text>
                        </View>
                        {/* Photos/Drawings Section */}
                        {key === 'image' && (
                          <Text
                            style={[
                              styles.sectionTitle,
                              { marginVertical: hp(1.5) },
                            ]}
                          >
                            Photos
                          </Text>
                        )}
                        <View style={styles.photoGrid}>
                          {key === 'image' && (
                            <>
                              <Image
                                source={detail.value}
                                style={styles.photo}
                              />
                              <Image
                                source={detail.value}
                                style={styles.photo}
                              />
                              <ImageBackground
                                source={detail.value}
                                style={styles.photo}
                              >
                                <View style={styles.playButton}>
                                  <Image
                                    source={images.Play}
                                    style={styles.playIconImage}
                                  />
                                </View>
                              </ImageBackground>
                            </>
                          )}
                        </View>
                      </>
                    ))}
                  </View>
                ) : (
                  <View></View>
                )}
              </>
            ))}
          </View>
        )}

        {/* Select Date & Time */}
        {detailStatus === 'Payment' && (
          <>
            <Text style={[styles.label, { color: COLORS.black }]}>
              Schedule Pickup
            </Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preferred Inspection Date & Time</Text>
              <TouchableOpacity
                style={styles.pickerWrapper}
                onPress={() => setModalSlotVisible(true)}
              >
                <Text
                  style={[{ flex: 1, marginLeft: wp(4) }, styles.uploadText]}
                >
                  {selectdate}
                </Text>
                <FastImage
                  source={images.Calendar}
                  style={styles.customIcon}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </TouchableOpacity>
            </View>
          </>
        )}

        {detailStatus === 'Payment' && (
          <View style={[styles.section, { marginBottom: hp(3) }]}>
            <View style={styles.copperRow}>
              <Text style={styles.label}>Pickup Date</Text>
              <Text style={styles.value}>20/03/2025</Text>
            </View>
            <View style={styles.copperRow}>
              <Text style={styles.label}>Pickup Time</Text>
              <Text style={styles.value}>First Half</Text>
            </View>
          </View>
        )}

        {/* banner image */}
        {detailStatus !== 'Request' && (
          <>
            {detailStatus === 'Quote' && (
              <View
                style={[
                  HomeScreenStyles.worksliderview,
                  { marginTop: detailStatus === 'Quote' ? -50 : 0 },
                ]}
              >
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
      {detailStatus === 'Request' && reqStatus !== 'complete' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.doneButton, { backgroundColor: COLORS.white }]}
            onPress={() => setSuccessPopupVisible(true)}
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

      {detailStatus === 'Payment' && (
        <View style={[HomeScreenStyles.servicesSection, { minHeight: hp(8) }]}>
          <CustomButton
            buttonName="Submit"
            margingTOP={hp('0%')}
            btnTextColor={COLORS.white}
            btnColor={COLORS.themeColor}
            onPress={() => navigation.navigate('PaymentScreen')}
          />
        </View>
      )}
      {reqStatus === 'Accepted' &&
        (detailStatus === 'Quote' || detailStatus === 'Payment') && (
          <View style={HomeScreenStyles.servicesSection}>
            <CustomButton
              buttonName="Proceed to payment Details"
              margingTOP={hp('0%')}
              btnTextColor={COLORS.white}
              btnColor={COLORS.themeColor}
              onPress={() => {
                setDetailStatus('Payment'),
                  detailStatus === 'Payment' &&
                    navigation.navigate('PaymentScreen');
              }}
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
        visible={successPopupVisible}
        onClose={() => {
          setSuccessPopupVisible(false);
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
          setSuccessPopupVisible(false), setConfirmPopupVisible(true);
        }}
      />
      {/* confirm cancel request Popup */}
      <SuccessPopupModal
        visible={confirmPopupVisible}
        onClose={() => {
          setConfirmPopupVisible(false);
          setReqStatus('Schedule');
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
          setConfirmPopupVisible(false), navigation.goBack();
        }}
      />

      {/* accept detail popup */}
      <SuccessPopupModal
        visible={AcceptVisible}
        onClose={() => {
          setAcceptVisible(false);
        }}
        setIcon={images.processDone}
        HeadTextColor="green"
        HeadText="Yeah!"
        message1="Are you sure you want to proceed"
        message2="with this offer?"
        buttonCount={2}
        secondButtonText="confirm"
        firstButtonText="No"
        onSecondButtonPress={() => {
          setAcceptVisible(false),
            setConfirmAcceptVisible(true),
            setReqStatus('Schedule');
        }}
      />

      {/* offer Accepted */}
      <SuccessPopupModal
        visible={confirmAcceptVisible}
        onClose={() => {
          setConfirmAcceptVisible(false);
          setReqStatus('Accepted');
        }}
        HeadText="Offer Accepted!"
        message1="Your request has been submitted."
        message2="Our team will connect with for further process."
        buttonCount={1}
        firstButtonText="Done"
      />

      {/* 'Decline popup*/}
      <DeclineModal
        visible={DeclineVisible}
        onClose={() => setDeclineVisible(false)}
        HeadTextColor={COLORS.red}
        setIcon={images.processReject}
        HeadText="Decline"
        message1="Are you sure you want to decline the offer"
        message2="for your AC?"
        buttonCount={2}
        firstButtonText="Confirm Decline"
        onFirstButtonPress={reason => {
          setDeclineVisible(false);
          setReqStatus('Decline');
        }}
        secondButtonText="No"
        onSecondButtonPress={() => {
          setDeclineVisible(false);
        }}
        onReasonSelect={reason => {
          setSelectReason(reason);
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
  showiconStyle: {
    width: wp(6),
    height: hp(3),
    marginHorizontal: wp(1),
    resizeMode: 'contain',
  },
  acHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderLeftWidth: wp(1.5),
    borderLeftColor: COLORS.red,
    backgroundColor: COLORS.white,
    width: wp('90%'),
    alignSelf: 'center',
    marginTop: wp(3),
  },
  acItem: {
    borderRadius: wp(2),
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    width: wp('90%'),
    padding: wp(3),
    marginTop: wp(2),
  },
  inputGroup: {
    marginTop: hp('1%'),
    marginHorizontal: wp('2%'),
    backgroundColor: COLORS.white,
  },
  labelInput: {
    flex: 1,
    fontSize: hp('1.5%'),
    color: '#585656ff',
    marginLeft: hp('1%'),
    fontFamily: Fonts.medium,
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
    borderRadius: wp('9%'),
    borderWidth: hp(0.1),
    borderColor: '#ddd',
    overflow: 'hidden',
    height: hp('5%'),
    width: wp(88),
    alignSelf: 'center',
  },
  pickerTech: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
    borderRadius: wp('9%'),
    borderWidth: hp(0.1),
    borderColor: '#ddd',
    overflow: 'hidden',
    height: hp('5%'),
    alignSelf: 'center',
  },
});

export default OldACRequest;
