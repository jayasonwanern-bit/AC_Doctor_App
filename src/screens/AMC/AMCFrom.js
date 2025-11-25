import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Header from '../../components/Header';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import images from '../../assets/images';
import screenStyles from '../Home/HomeScreenStyles';
import { COLORS, Fonts } from '../../utils/colors';
import ACTypeSelector from '../../customScreen/ACTypeSelector';
import CustomButton from '../../components/CustomButton';
import PlaceTypeSelector from '../../components/PlaceTypeSelector';

const AMCFrom = ({ navigation }) => {
  const [editStatus, setEditStatus] = useState(false);

  const [formData, setFormData] = useState({
    name: '2345466567',
    phoneNumber: '9876543210',
    address: '',
    addAc: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <Header title="AMC" onBack={() => navigation.goBack()} onHelp={false} />

      {/* Only TextInputs move with keyboard */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: hp(12) }}
        >
          <View style={styles.containView}>
            <View style={screenStyles.worksliderview}>
              <Image source={images.bannerAmc} style={screenStyles.workimage} />
            </View>

            <Text style={[screenStyles.workheadText]}>Customer Details</Text>

            {/* Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={[styles.textInputInner, styles.styleofText]}
                value={formData.name}
                onChangeText={v => handleInputChange('name', v)}
                placeholder="Enter Your Name"
                placeholderTextColor={COLORS.inputColour}
              />
            </View>

            {/* Phone */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone No.</Text>

              {!editStatus && (
                <Pressable
                  style={[styles.styleofText, styles.rowView]}
                  onPress={() => setEditStatus(true)}
                >
                  <Text style={[styles.phonefont, { flex: 1 }]}>
                    {formData.phoneNumber}
                  </Text>
                  <Image source={images.edit} style={styles.editImg} />
                </Pressable>
              )}

              {editStatus && (
                <View style={styles.styleofText}>
                  <TextInput
                    style={styles.textInputInner}
                    value={formData.phoneNumber}
                    onChangeText={v => handleInputChange('phoneNumber', v)}
                    placeholder="Enter Your Number"
                    placeholderTextColor={COLORS.inputColour}
                    keyboardType="number-pad"
                  />
                </View>
              )}
            </View>

          {/* Place Type */}
          <View style={{marginHorizontal:hp(1)}}>
            <PlaceTypeSelector
              headingText="Place Type*"
              onChange={value => handleInputChange('placeType', value)}
            />
          </View>

            {/* Address */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Address*</Text>
              <TextInput
                style={[
                  styles.textInputInner,
                  styles.styleofText,
                  styles.notesInput,
                ]}
                value={formData.address}
                onChangeText={v => handleInputChange('address', v)}
                placeholder="Type here..."
                placeholderTextColor={COLORS.inputColour}
                multiline
              />
            </View>

            {/* AC Type */}
            <Text style={[screenStyles.workheadText, { margin: hp(1) }]}>
              Related to AC
            </Text>
            <ACTypeSelector
              onChange={v => handleInputChange('addAc', v)}
              headingText={'Add AC'}
              ShapeRADIUS={hp(1)}
            />
          </View>
        </ScrollView>

        {/* FIXED BOTTOM BUTTON */}
        <View style={styles.footerButton}>
          <CustomButton
            buttonName="Submit"
            btnTextColor={COLORS.white}
            btnColor={COLORS.themeColor}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  containView: {
    paddingHorizontal: hp(1.5),
    marginBottom: hp(2),
  },
  inputGroup: {
    marginTop: hp('1.5%'),
    marginHorizontal: wp('2%'),
  },
  label: {
    fontSize: hp('1.5%'),
    color: COLORS.black,
    marginBottom: hp('1%'),
    fontFamily: Fonts.medium,
  },
  textInputInner: {
    fontSize: hp('1.6%'),
    color: COLORS.inputColour,
    paddingHorizontal: wp('4%'),
    backgroundColor: COLORS.white,
    height: hp(4.5),
    borderRadius: hp(1),
  },
  styleofText: {
    borderColor: COLORS.lightGray,
    borderWidth: hp(0.1),
    height: hp(4.7),
    borderRadius: hp(1),
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },
  notesInput: {
    height: hp('10%'),
    textAlignVertical: 'top',
    paddingTop: hp('1.5%'),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editImg: {
    width: wp(5),
    height: hp(2),
    resizeMode: 'contain',
  },
  phonefont: {
    fontSize: hp('1.6%'),
    color: COLORS.inputColour,
    paddingHorizontal: wp('4%'),
  },

  /** FIXED BOTTOM BUTTON */
  footerButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === 'ios' ? hp(3) : hp(2),
    paddingHorizontal: wp(5),
    backgroundColor: COLORS.white,
    paddingTop: hp(1.5),
  },
});

export default AMCFrom;
