import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  FlatList,
  ImageBackground,
} from 'react-native';
import Header from '../../components/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../../utils/colors';
import images from '../../assets/images';
import screenStyles, { works } from './HomeScreenStyles';
import CustomButton from '../../components/CustomButton';

const RequestDetail = ({ navigation }) => {
  // render
  return (
    <View style={screenStyles.workcontainer}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? hp('0.5%') : hp('1%')} // Adjust this based on your header height
      >
        <Header
          title="Request Details"
          onBack={() => navigation.goBack()}
          onHelp={true}
        />
        <ScrollView
          style={screenStyles.workscrollstyle}
          showsVerticalScrollIndicator={false}
        >
          {/* Tabs */}
          <View style={styles.tabContainer}>
            <View style={styles.tab}>
              <Text
                style={[
                  styles.tabNumber,
                  { backgroundColor: COLORS.red, color: COLORS.white },
                ]}
              >
                1
              </Text>
              <Text style={styles.tabText}>Request</Text>
            </View>

            <Text style={[styles.tabText, { color: '#cececeff' }]}>────</Text>

            <View style={styles.tab}>
              <Text
                style={[
                  styles.tabNumber,
                  { borderColor: COLORS.textHeading, borderWidth: hp(0.1) },
                ]}
              >
                2
              </Text>
              <Text style={styles.tabText}>Quote</Text>
            </View>

            <Text style={[styles.tabText, { color: '#cececeff' }]}>────</Text>
            <View style={styles.tab}>
              <Text
                style={[
                  styles.tabNumber,
                  { borderColor: COLORS.textHeading, borderWidth: hp(0.1) },
                ]}
              >
                3
              </Text>
              <Text style={styles.tabText}>Payment details</Text>
            </View>
          </View>

          {/* Inspection Details Section */}
          <Text style={styles.sectionTitle}>Inspection details</Text>
          <View style={styles.section}>
            <View style={styles.statusBar}>
              <View>
                <View style={styles.statusBar}>
                  <Image source={images.copperIcon} style={styles.Iconstyle} />
                  <Text style={styles.statusText}>Copper Piping</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={[styles.labelRow, { marginBottom: wp(0) }]}>
                    Request ID
                  </Text>
                  <Text style={[styles.value, { marginLeft: wp(1) }]}>
                    #12345
                  </Text>
                </View>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>Under Review</Text>
              </View>
            </View>
            <View style={[styles.detailRowSpace]}>
              <View>
                <Text style={styles.labelRow}>Submitted On</Text>
                <Text style={styles.value}>05/03/2025</Text>
              </View>
              <View>
                <Text style={styles.labelRow}>Type of AC</Text>
                <Text style={styles.value}>Split AC-2{'\n'}Window AC-1</Text>
              </View>
            </View>
            <View style={[styles.detailRowSpace]}>
              <View>
                <Text style={styles.labelRow}>Pipe Run Length</Text>
                <Text style={styles.value}>3-5m</Text>
              </View>
              <View>
                <Text style={styles.labelRow}>Agent Assigned</Text>
                <Text style={styles.value}>-</Text>
              </View>
            </View>
          </View>

          {/* Copper Piping Details Section */}
          <Text style={styles.sectionTitle}>Copper Piping details</Text>
          <View style={[styles.section,{marginBottom:hp(15)}]}>
            <View style={styles.detailRowSpace}>
              <Text style={styles.label}>Property type</Text>
              <Text style={styles.value}>Flat</Text>
            </View>
            <View style={styles.detailRowSpace}>
              <Text style={styles.label}>Type of AC</Text>
              <Text style={styles.value}>Split AC-2{'\n'}Window AC-1</Text>
            </View>
            <View style={styles.detailRowSpace}>
              <Text style={styles.label}>Outdoor Condenser Location</Text>
              <Text style={styles.value}>Wall mounted low</Text>
            </View>
            <View style={styles.detailRowSpace}>
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
              <View style={{ marginBottom: hp(1) }}>
                <ImageBackground source={images.demoAc} style={styles.photo}>
                  <View style={styles.playButton}>
                    <Image source={images.Play} style={styles.playIconImage} />
                  </View>
                </ImageBackground>
              </View>
            </View>

            {/* Preferred Inspection Date and Time */}

            <View style={styles.detailRowSpace}>
              <Text style={styles.label}>Preferred Inspection Date</Text>
              <Text style={styles.value}>10/03/2025</Text>
            </View>
            <View style={styles.detailRowSpace}>
              <Text style={styles.label}>Preferred Inspection Time</Text>
              <Text style={styles.value}>First Half</Text>
            </View>
            {/* Additional Note */}
            <View style={[styles.section, { paddingHorizontal: wp(2) }]}>
              <Text style={[styles.sectionTitle, { marginLeft: wp(0) }]}>
                Additional Note
              </Text>
              <Text style={styles.noteText}>
                Lorem ipsum dolor sit amet consectetur. Neque orci lorem sed in.
                Lectus aliquet mattis condimentum eu tempus ac lorem.
              </Text>
            </View>
          </View>
        </ScrollView>


        <View
          style={[
            screenStyles.BtnView,
            { flexDirection: 'row', justifyContent: 'space-evenly' },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.secondButton,
              styles.doneButton,
              { backgroundColor: COLORS.white },
            ]}
            //  onPress={onSecondButtonPress}
          >
            <Text
              style={[styles.doneButtonText, { color: COLORS.textHeading }]}
            >
             Cancel Request 
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.doneButton, styles.secondButton]}
            //  onPress={onSecondButtonPress}
          >
            <Text style={styles.doneButtonText}>Reschedule</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    marginVertical: hp(2),
    borderRadius: wp(4),
  },
  tab: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  tabNumber: {
    fontSize: hp(1.8),
    fontWeight: Fonts.medium,
    color: '#333',
    width: wp(5), // Fixed width for the number
    textAlign: 'center',
    marginRight: 5,
    borderRadius: hp(4),
  },
  tabText: {
    fontSize: hp(1.6),
    fontWeight: Fonts.medium,
    color: '#333',
    flexShrink: 1,
  },
  section: {
    backgroundColor: COLORS.white,
    marginVertical: hp(1),
    borderRadius: 10,
    elevation: 2,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.lightSky,
    paddingHorizontal: hp(0.5),
    paddingVertical: hp(0.5),
    borderTopLeftRadius: wp(3),
    borderTopRightRadius: wp(3),
  },
  statusText: {
    fontSize: hp(1.5),
    fontFamily: Fonts.medium,
    color: COLORS.textHeading,
  },
  Iconstyle: {
    width: wp('6%'),
    height: hp('1.5%'),
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  statusBadge: {
    backgroundColor: '#fff4c5ff',
    borderRadius: 5,
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2),
    marginRight: wp(2),
    marginTop: wp(-6),
  },
  statusBadgeText: {
    fontSize: hp(1.3),
    fontFamily: Fonts.medium,
    color: '#ee9937ff',
  },
  detailRow: {
    flexDirection: 'row',
    padding: hp(1),
  },
  detailRowSpace: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: hp(1),
    borderBottomWidth: wp(0.1),
    borderColor: COLORS.lightGray,
  },
  label: {
    fontSize: hp(1.6),
    fontFamily: Fonts.medium,
    color: '#666',
  },
  labelRow: {
    fontSize: hp(1.5),
    fontFamily: Fonts.medium,
    color: '#666',
    marginBottom: hp(0.6),
  },
  value: {
    fontSize: hp(1.4),
    fontFamily: Fonts.medium,
    color: COLORS.black,
  },
  sectionTitle: {
    fontSize: hp(1.7),
    fontFamily: Fonts.semiBold,
    color: COLORS.black,
    paddingVertical: hp(0.5),
    marginLeft: wp(2),
  },
  photoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
  },
  photo: {
    width: wp(28),
    height: hp(12),
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: hp(1),
  },
  playIconImage: {
    width: wp(5),
    height: hp(2),
    tintColor: COLORS.white,
  },
  noteText: {
    marginVertical: wp(2),
    fontSize: hp(1.5),
    fontFamily: Fonts.regular,
    color: COLORS.TextColor,
    textAlign: 'left',
  },
  doneButton: {
    width: wp('33%'), // Adjusted for two buttons
    paddingVertical: 8.5,
    alignItems: 'center',
    borderColor: COLORS.textHeading,
    borderWidth: 0.5,
    borderRadius: 25,
  },
  secondButton: {
    backgroundColor: COLORS.themeColor,
    borderRadius: 25,
    marginLeft: 10,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default RequestDetail;
