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
} from 'react-native';
import Header from '../../components/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../../utils/colors';
import images from '../../assets/images';
import screenStyles, { works } from './HomeScreenStyles';

const RequestDetail = ({navigation}) => {
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
    <ScrollView  style={screenStyles.workscrollstyle}
              showsVerticalScrollIndicator={false}>
                
      {/* Tabs */}
      <View style={styles.tabContainer}>
      <View style={styles.tab}>
        <Text style={[styles.tabNumber,{backgroundColor:COLORS.red,}]}>1</Text>
        <Text style={styles.tabText}>Request</Text>
      </View>

     <Text style={styles.tabText}>────</Text>

      <View style={styles.tab}>
        <Text style={[styles.tabNumber,{borderColor:COLORS.textHeading, borderWidth:hp(0.1)}]}>2</Text>
        <Text style={styles.tabText}>Quote</Text>
      </View>

        <Text style={styles.tabText}>────</Text>
      <View style={styles.tab}>
        <Text style={[styles.tabNumber,{borderColor:COLORS.textHeading, borderWidth:hp(0.1)}]}>3</Text>
        <Text style={styles.tabText}>Payment details</Text>
      </View>
    </View>

      {/* Inspection Details Section */}
      <View style={styles.section}>
        <View style={styles.statusBar}>
          <Text style={styles.statusText}>Copper Piping</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>Under Review</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Request ID</Text>
          <Text style={styles.value}>#12345</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Submitted On</Text>
          <Text style={styles.value}>05/03/2025</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Type of AC</Text>
          <Text style={styles.value}>Split AC-2{'\n'}Window AC-1</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Pipe Run Length</Text>
          <Text style={styles.value}>3-5m</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Agent Assigned</Text>
          <Text style={styles.value}>-</Text>
        </View>
      </View>

      {/* Copper Piping Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Copper Piping details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Property type</Text>
          <Text style={styles.value}>Flat</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Type of AC</Text>
          <Text style={styles.value}>Split AC-2{'\n'}Window AC-1</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Outdoor Condenser Location</Text>
          <Text style={styles.value}>Wall mounted low</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Pipe Run Length</Text>
          <Text style={styles.value}>3-5m</Text>
        </View>
      </View>

      {/* Photos/Drawings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Photos/Drawings</Text>
        <View style={styles.photoGrid}>
          <Image source={images.photo1} style={styles.photo} />
          <Image source={images.photo2} style={styles.photo} />
          <TouchableOpacity style={styles.photo}>
            <Image source={images.photo3} style={styles.photo} />
            <View style={styles.playButton}>
              <Image source={images.playIcon} style={styles.playIconImage} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Preferred Inspection Date and Time */}
      <View style={styles.section}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Preferred Inspection Date</Text>
          <Text style={styles.value}>10/03/2025</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Preferred Inspection Time</Text>
          <Text style={styles.value}>First Half</Text>
        </View>
      </View>

      {/* Additional Note */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Note</Text>
        <Text style={styles.noteText}>
          Lorem ipsum dolor sit amet consectetur. Neque orci lorem sed in. Lectus
          aliquet mattis condimentum eu tempus ac lorem.
        </Text>
      </View>
    </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  tabNumber: {
    fontSize: hp(1.8),
    fontWeight:Fonts.medium,
    color: '#333',
    width: wp(5), // Fixed width for the number
    textAlign: 'center',
    marginRight: 5, 
    borderRadius:hp(4)
  },
  tabText: {
    fontSize: hp(1.6),
    fontWeight:Fonts.medium,
    color: '#333',
    flexShrink: 1, 
  },
  section: {
    backgroundColor: COLORS.white,
    padding: hp(2),
    marginVertical: hp(1),
    borderRadius: 10,
    elevation: 2,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  statusText: {
    fontSize: hp(2),
    fontFamily: Fonts.bold,
    color: COLORS.black,
  },
  statusBadge: {
    backgroundColor: '#FFCC00',
    borderRadius: 10,
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2),
  },
  statusBadgeText: {
    fontSize: hp(1.5),
    fontFamily: Fonts.medium,
    color: COLORS.white,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
  },
  label: {
    fontSize: hp(1.8),
    fontFamily: Fonts.medium,
    color: '#666',
  },
  value: {
    fontSize: hp(1.8),
    fontFamily: Fonts.medium,
    color: COLORS.black,
  },
  sectionTitle: {
    fontSize: hp(2.2),
    fontFamily: Fonts.bold,
    color: COLORS.black,
    marginBottom: hp(2),
  },
  photoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photo: {
    width: wp(30),
    height: hp(15),
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
    height: hp(5),
    tintColor: COLORS.white,
  },
  noteText: {
    fontSize: hp(1.6),
    fontFamily: Fonts.regular,
    color: '#666',
    textAlign: 'left',
  },
});

export default RequestDetail;