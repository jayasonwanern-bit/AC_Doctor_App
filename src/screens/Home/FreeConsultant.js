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
  Pressable,
} from 'react-native';
import Header from '../../components/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../../utils/colors';
import images from '../../assets/images';
import FastImage from 'react-native-fast-image';
import screenStyles, { faqData } from './HomeScreenStyles';
import CustomButton from '../../components/CustomButton';
import BookingSlotModal from '../../customScreen/BookingSlotModal';
import SuccessPopupModal from '../../customScreen/SuccessPopupModal';
import ImagePickerModal from '../../components/ImagePickerModal';
import CustomPicker from '../../components/CustomPicker'

const FreeConsultant = ({ navigation }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [modalSlotVisible, setModalSlotVisible] = useState(false); //booktime
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectdate, setSelectDate] = useState('Select date');
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const [formData, setFormData] = useState({
    propertyType: '',
    brand: '',
    numberOfAC: '',
    alternateNumber: '',
    service: 'Select',
    dateTime: 'Select',
    additionalNotes: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };
  // Function to handle slot selection
  const handleSlotSelection = slot => {
    if (slot) {
      const { date, day, year, time } = slot;
      const formattedDate = `${date} ${day} ${year}, ${time}`;
      setSelectDate(formattedDate);
      handleInputChange('dateTime', formattedDate); // Update formData.dateTime
    }
  };

  // FAQ's Toggle
  const toggleExpand = index => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Handle form submission
  const handleRequestConsultation = () => {
    setSuccessPopupVisible(true);
  };

  return (
    <View style={screenStyles.workcontainer}>
      <Header title="Free Consultation" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? hp('6%') : 0}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: hp(8) }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ marginBottom: hp('10%'), paddingHorizontal: hp(1) }}>
            <View style={screenStyles.worksliderview}>
              <Image source={images.bannerOne} style={screenStyles.workimage} />
            </View>

            <Text style={[screenStyles.workheadText, { marginBottom: hp(1) }]}>
              Get Free AC Consultation
            </Text>

            {/* Property Type */}
              <CustomPicker
                label="Property Type"
                value={formData.propertyType}
                onChange={value => handleInputChange('propertyType', value)}
                items={[
                  { label: 'Residential', value: 'Residential' },
                  { label: 'Commercial', value: 'Commercial' },
                  { label: 'Industrial', value: 'Industrial' },
                ]}
                width={wp('90%')} // any width
                height={hp('5%')} // any height
                borderRadius={hp('4%')} // custom radius
              />
         

            {/* Brand */}
             <CustomPicker
                label="Brand"
                value={formData.brand}
                onChange={value => handleInputChange('brand', value)}
                items={[
                    { label: 'Blue Star', value: 'Blue Star' },
                    { label: 'LG', value: 'LG' },
                    { label: 'Samsung', value: 'Samsung' },
                    { label: 'Daikin', value: 'Daikin' },
                  ]}
                width={wp('90%')} // any width
                height={hp('5%')} // any height
                borderRadius={hp('4%')} // custom radius
              />
    

            {/* Number of AC */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Number of AC</Text>
              <TextInput
                style={styles.textInput}
                value={formData.numberOfAC}
                onChangeText={value => handleInputChange('numberOfAC', value)}
                keyboardType="numeric"
                placeholder="Enter number"
                placeholderTextColor={COLORS.textColor}
              />
            </View>

            {/* Alternate Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Alternate Number</Text>
              <View style={styles.textInputWithIcon}>
                <TextInput
                  style={styles.textInputInner}
                  value={formData.alternateNumber}
                  onChangeText={value =>
                    handleInputChange('alternateNumber', value)
                  }
                  keyboardType="phone-pad"
                  placeholder="Enter number"
                  placeholderTextColor={COLORS.textColor}
                />
              </View>
            </View>

            {/* Select Service */}
             <CustomPicker
                label="Select Service"
                value={formData.service}
                onChange={value => handleInputChange('service', value)}
                items={[
                    { label: 'Installation', value: 'Installation' },
                    { label: 'Repair', value: 'Repair' },
                    { label: 'Maintenance', value: 'Maintenance' },
                  ]}
                width={wp('90%')} // any width
                height={hp('5%')} // any height
                borderRadius={hp('4%')} // custom radius
              />



            {/* Upload Photos */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Upload Photos</Text>
              <TouchableOpacity
                onPress={() => setShowModal(true)}
                style={styles.uploadContainer}
              >
                {selectedImageUri ? (
                  <FastImage
                    source={selectedImageUri ? { uri: selectedImageUri } : null}
                    style={styles.imagePreview}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                ) : (
                  <>
                    <FastImage
                      source={images.Camera}
                      style={styles.customIcon}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={styles.uploadText}>Add Photos/Video</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Select Date & Time */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Select Date & Time</Text>
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

            {/* Additional Notes */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Additional Notes (Optional)</Text>
              <TextInput
                style={[styles.textInput, styles.notesInput]}
                value={formData.additionalNotes}
                onChangeText={value =>
                  handleInputChange('additionalNotes', value)
                }
                placeholder="Type here..."
                multiline
              />
            </View>

            <CustomButton
              buttonName="Request Consultation"
              margingTOP={hp('0%')}
              btnTextColor={COLORS.white}
              btnColor={COLORS.themeColor}
              onPress={handleRequestConsultation}
            />

            <View style={[screenStyles.worksliderview, { marginTop: hp(1.5) }]}>
              <Image source={images.bannerTwo} style={screenStyles.workimage} />
            </View>

            <Text style={[screenStyles.workheadText, { marginTop: hp('1%') }]}>
              FAQs
            </Text>

            {/* FAQ Items */}
            {faqData.map((item, index) => (
              <View key={index} style={screenStyles.faqItem}>
                <TouchableOpacity
                  onPress={() => toggleExpand(index)}
                  style={screenStyles.faquestionContainer}
                >
                  <Text style={screenStyles.faquestionText}>
                    {item.question}
                  </Text>
                  <Text style={screenStyles.faqarrow}>
                    {expandedIndex === index ? '︿' : '﹀'}
                  </Text>
                </TouchableOpacity>
                {expandedIndex === index && (
                  <Text style={screenStyles.faqanswerText}>{item.answer}</Text>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <BookingSlotModal
        visible={modalSlotVisible}
        onClose={() => setModalSlotVisible(false)}
        setSelectedSlot={handleSlotSelection}
        onBookProcess={() => {
          setModalSlotVisible(false);
        }}
      />

      {/* Success Popup */}
      <SuccessPopupModal
        visible={successPopupVisible}
        onClose={() => setSuccessPopupVisible(false)}
        HeadText={'Successful...!'}
        firstButtonText="Done"
        message1={'Your Query has been successfully submitted.'}
        message2={'Our team will respond shortly.'}
      />

      <ImagePickerModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onImageSelect={uri => {
          console.log('Image Path:', uri);
          setSelectedImageUri('file://' + uri);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: hp('2%'),
    marginHorizontal: wp('2%'),
  },
  label: {
    fontSize: hp('1.5%'),
    color: COLORS.black,
    marginBottom: hp('1%'),
    fontFamily: Fonts.medium,
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: wp('9%'),
    borderWidth: hp(0.1),
    borderColor: COLORS.lightGray,
    overflow: 'hidden',
    borderRadius: hp('8%'),
  },
  customIcon: {
    width: wp('5%'),
    height: hp('4%'),
    tintColor: '#c37e7eff',
    marginHorizontal: hp(2),
  },
  textInput: {
    height: hp('5%'),
    backgroundColor: COLORS.white,
    borderRadius: wp('9%'),
    borderWidth: hp(0.1),
    borderColor: COLORS.lightGray,
    paddingHorizontal: wp('4%'),
    fontSize: hp('1.4%'),
    color: '#333',
  },
  textInputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: wp('9%'),
    borderWidth: hp(0.1),
    borderColor: COLORS.lightGray,
    height: hp('5%'),
  },
  textInputInner: {
    flex: 1,
    fontSize: hp('1.6%'),
    color: '#333',
    paddingHorizontal: wp('4%'),
  },
  uploadContainer: {
    height: hp('15%'),
    backgroundColor: '#eaf0f7ff',
    borderRadius: wp('3%'),
    borderWidth: hp(0.2),
    borderColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  imagePreview: {
    height: hp('15%'),
    width: wp('90%'),
    resizeMode: 'cover',
    borderRadius: wp('3%'),
    zIndex: 9999,
  },
  uploadText: {
    fontSize: hp('1.5%'),
    color: '#666',
  },
  notesInput: {
    height: hp('15%'),
    textAlignVertical: 'top',
    paddingTop: hp('1.5%'),
    borderRadius: wp('3%'),
  },
});



export default FreeConsultant;
