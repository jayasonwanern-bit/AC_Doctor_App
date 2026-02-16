import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ImageBackground,
  TextInput,
  Keyboard,
  BackHandler,
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
import FastImage from 'react-native-fast-image';
import { isTablet } from '../../../components/TabletResponsiveSize';
import acDetailData from '../../../customScreen/customArray';
import { useFocusEffect } from '@react-navigation/native';
import styles from './OldRequestStyles';
import { store } from '../../../redux/store';
import { postOldAcRequest } from '../../../api/homeApi';
import Toast from 'react-native-simple-toast';

const OldACRequest = ({ navigation }) => {
  const [reqStatus, setReqStatus] = useState(null); //Schedule, ReScheduled, complete, Accepted, Decline
  const [detailStatus, setDetailStatus] = useState(null); // 'Request', 'Quote', 'Payment'
  const [PaymentStatus, setPaymentStatus] = useState('paydetail');
  const [modalSlotVisible, setModalSlotVisible] = useState(false);
  const [AcceptVisible, setAcceptVisible] = useState(false);
  const [confirmAcceptVisible, setConfirmAcceptVisible] = useState(false);
  const [selectdate, setSelectDate] = useState('Select date');
  const [selectTime, setSelectTime] = useState('First Half');
  const [selectReason, setSelectReason] = useState('');
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [successResheduleVisible, setSResheduleVisible] = useState(false);
  const [confirmPopupVisible, setConfirmPopupVisible] = useState(false);
  const [DeclineVisible, setDeclineVisible] = useState(false);
  const [selectPay, setSelectedPay] = useState('bank');
  const [upiId, setupiId] = useState('');
  const [expandedAC, setExpandedAC] = useState(null);
  const [loading, setLoading] = useState(false);
  const userData = store?.getState()?.auth?.user;
  const addressId = store?.getState()?.auth?.address;

  // api to fetch request details and status
  useFocusEffect(
    useCallback(() => {
      fetchRequestDetails();
    }, [])
  );


  const fetchRequestDetails = async () => {
    try {
      // api call here to fetch request details and status
      const statusFromApi = '';

      handleStatusFlow(statusFromApi);

    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusFlow = (status) => {
    console.log('STATUS:', status);

    setReqStatus(status);

    if (
      status === '' ||
      status === 'underReview' ||
      status === 'Schedule' ||
      status === 'ReScheduled'
    ) {
      setDetailStatus('Request');

    } else if (
      status === 'complete' ||
      status === 'Accepted' ||
      status === 'Decline'
    ) {
      setDetailStatus('Quote');

    } else if (status === 'Payment') {
      setDetailStatus('Payment');
    }
  };


  const toggleExpand = acName => {
    setExpandedAC(expandedAC === acName ? null : acName);
  };

  // selected slot detail
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

  // on Tab press
  const getTabStyle = status => {
    // Step 1: Check current status
    const isRequest = detailStatus === 'Request';
    const isQuote = detailStatus === 'Quote';
    const isPayment = detailStatus === 'Payment';

    // Step 2: Decide kaun-kaun tab active hoga (red background + white text)
    const isTabActive =
      (status === 'Request' && (isRequest || isQuote || isPayment)) ||
      (status === 'Quote' && (isQuote || isPayment)) ||
      (status === 'Payment' && isPayment);
    return {
      color: isTabActive ? COLORS.white : COLORS.textHeading,
      backgroundColor: isTabActive ? COLORS.red : 'transparent',
      borderColor: isTabActive ? COLORS.red : COLORS.textHeading,
      borderWidth: isTabActive ? 0 : hp(0.1),
      borderRadius: hp(4),
      marginHorizontal: wp(1),
    };
  };

  // on back press
  const handleBackPress = () => {
    if (detailStatus === 'Payment') {
      setDetailStatus('Quote');
      return true; // stop default back
    }

    if (detailStatus === 'Quote') {
      setDetailStatus('Request');
      return true; // stop default back
    }

    return false; // allow normal back (exit screen)
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        const handled = handleBackPress();
        if (!handled) {
          navigation.goBack();
        }
        return true;
      };
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );
      return () => subscription.remove(); // ✅ correct way
    }, [detailStatus])
  );

  // post request details to api
  const onBuyBtn = async () => {
    try {
      setLoading(true);
      const payload = {
        user_id: userData?._id,
        name: userData?.name,
        addressId: addressId?._id,
        slot: selectTime === 'First Half' ? 'FIRST_HALF' : 'SECOND_HALF',
        date: selectedDateAPIFormat, // 2026-02-11 format
        type: "QUOTE_REQUEST",
        subType: "OLD_AC",
        oldAcDetails: [
          {
            brand: brand,
            model: model,
            acType: acType,
            tonnage: tonnage,
            age: age,
            condition: condition,
            technology: technology,
            photos: selectedImages || []
          }
        ]
      };

      const res = await postOldAcRequest(payload);
      if (res?.success) {
        setShowSuccess(true);
      }

    } catch (error) {
      Toast.show(error?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <Header
        title="AC Request Details"
        onBack={() => {
          const handled = handleBackPress();
          if (!handled) {
            navigation.goBack();
          }
        }}
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
                  padding: Platform.OS === 'ios' ? hp(1.5) : hp(0),
                  paddingHorizontal: Platform.OS === 'ios' ? hp(1.7) : hp(2.5),
                  marginVertical: wp(1.5),
                }}
              >
                <TextInput
                  placeholder="Type here..."
                  placeholderTextColor={COLORS.textColor}
                  keyboardType="default"
                  value={upiId}
                  onChange={txt => setupiId(txt)}
                  style={styles.label}
                  onSubmitEditing={() => Keyboard.dismiss()}
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
                    {selectReason}
                  </Text>
                </View>
              )}
              {/* <View style={[styles.copperRow, { justifyContent: 'center' }]}>
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
              </View> */}

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
              <View
                style={[
                  styles.copperRow,
                  { width: isTablet ? wp(90) : wp(90), alignSelf: 'center' },
                ]}
              >
                <Text style={[styles.label, { color: COLORS.black }]}>
                  Your AC details
                </Text>
                {/* {detailStatus === 'Request' && (
                  <TouchableOpacity
                    style={[styles.copperRow, { borderBottomColor: '#F5F7FA' }]}
                  >
                    <Image
                      source={images.editIcon}
                      style={styles.showiconStyle}
                    />
                    <Text
                      style={[
                        styles.label,
                        {
                          color: COLORS.themeColor,
                        },
                      ]}
                    >
                      Edit
                    </Text>
                  </TouchableOpacity>
              )} */}
              </View>
            )}

            {/* AC Names List */}
            {Object.keys(acDetailData).map(acName => (
              <>
                <TouchableOpacity
                  key={'AC Names list'}
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
                    {Object.entries(acDetailData[acName]).map(([key, detail]) => (
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
                  style={[{ marginHorizontal: wp(4), fontFamily: Fonts.regular, color: selectdate === 'Select date' ? COLORS.textColor : COLORS.black }]}
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
              style={[HomeScreenStyles.brandcont, { marginBottom: hp(15) }]}
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

          {/* 🔹 CASE 1: Show Cancel + Reschedule */}
          {(reqStatus === '' ||
            reqStatus === 'underReview' ||
            reqStatus === 'Schedule') && (
              <>
                <TouchableOpacity
                  style={[styles.doneButton, { backgroundColor: COLORS.white }]}
                  onPress={() => {
                    // Cancel Reschedule → reset to original status
                    setReqStatus('Schedule');
                  }}
                >
                  <Text
                    style={[styles.doneButtonText, { color: COLORS.textHeading }]}
                  >
                    Cancel Reschedule
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.doneButton, styles.secondButton]}
                  onPress={() => {
                    setSResheduleVisible(true);
                    setReqStatus('ReScheduled'); // mark as rescheduled
                  }}
                >
                  <Text style={styles.doneButtonText}>Reschedule</Text>
                </TouchableOpacity>
              </>
            )}

          {/* 🔹 CASE 2 & 3: After Reschedule OR Complete */}
          {(reqStatus === 'ReScheduled' ||
            reqStatus === 'complete') && (
              <TouchableOpacity
                style={[styles.doneButton, styles.secondButton]}
                onPress={() => {
                  if (reqStatus === 'ReScheduled') {
                    // First Next → mark complete
                    setReqStatus('complete');
                  } else if (reqStatus === 'complete') {
                    // Second Next → go to Quote tab
                    setDetailStatus('Quote');
                  }
                }}
              >
                <Text style={styles.doneButtonText}>Next</Text>
              </TouchableOpacity>
            )}

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

      {/* are oyu reschedule */}
      <SuccessPopupModal
        visible={successResheduleVisible}
        onClose={() => {
          setSResheduleVisible(false), setModalSlotVisible(true);
        }}
        setIcon={images.questionMark}
        HeadTextColor="black"
        HeadText="Are you sure?"
        message1=""
        message2="Do you really want to cancel this request?"
        buttonCount={2}
        firstButtonText="Reschedule"
        secondButtonText="Cancel Reschedule"
        onSecondButtonPress={() => {
          setSResheduleVisible(false), setSuccessPopupVisible(true);
        }}
      />
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
        HeadTextColor="black"
        HeadText="Cancelled!"
        message2="You request has been successfully cancelled."
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



export default OldACRequest;
