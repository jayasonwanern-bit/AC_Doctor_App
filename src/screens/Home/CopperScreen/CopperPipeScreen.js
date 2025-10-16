import React, { useState,useEffect } from 'react';
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
import Header from '../../../components/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../../../utils/colors';
import images from '../../../assets/images';
import FastImage from 'react-native-fast-image';
import screenStyles, { faqData } from '../HomeScreenStyles';
import CustomButton from '../../../components/CustomButton';
import RNPickerSelect from 'react-native-picker-select';
import BookingSlotModal from '../../../customScreen/BookingSlotModal';
import SuccessPopupModal from '../../../customScreen/SuccessPopupModal';
import ACTypeSelector from '../../../customScreen/ACTypeSelector';
import MultipleUploadPhotos from '../../../components/MultipleUploadPhotos';
import HomeScreenStyles, { works } from '../HomeScreenStyles';
import PropertySelectionModal from '../../../customScreen/PropertySelectionModal'
import OutdoorSelectionModal from '../../../customScreen/OutdoorSelectionModal';

const CopperPipeScreen = ({ navigation }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [modalSlotVisible, setModalSlotVisible] = useState(false); //booktime
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectdate, setSelectDate] = useState('Select date');
  const [successPopupVisible, setSuccessPopupVisible] = useState(false); // successPopup
  const [propertyModalVisible, setPropertyModalVisible] = useState(false); // prpertyPopup
  const [selectedProperty, setSelectedProperty] = useState('');
  const [outLocationModalVisible, setOutLocationModalVisible] = useState(false); // prpertyPopup
  const [selectOutDoor, setSelectedOutDoor] = useState('');

  const [formData, setFormData] = useState({
    propertyType: selectedProperty,
    acTypes: '',
    orderLocation: selectOutDoor,
    pipeNumber: '',
    dateTime: selectdate,
    additionalNotes: '',
    uploadedPhotos: [],
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };
  // Sync states with formData
  useEffect(() => {
    handleInputChange('propertyType', selectedProperty);
  }, [selectedProperty]);

  useEffect(() => {
    handleInputChange('orderLocation', selectOutDoor);
  }, [selectOutDoor]);

  useEffect(() => {
    handleInputChange('dateTime', selectdate);
  }, [selectdate]);

  // Function to handle slot selection
 const handleSlotSelection = (slot) => {
  if (slot) {
    const { date,  monthNumber,year, time, Timeslot } = slot; 
    const formattedDate = `${String( date).padStart(2, '0')}/${String( monthNumber).padStart(2, '0')}/${year}`; 
    const formattedTime = time === 'morning' || time === 'firstHalf' ? 'First Half' : Timeslot; 
    const formattedDateTime = `${formattedDate}, ${formattedTime}`; // e.g., "10/03/2025, First Half"
    setSelectDate(formattedDateTime);
    handleInputChange('dateTime', formattedDateTime); 
  }
};

  const handleSelectProperty = type => {
    setSelectedProperty(type);
  };
  const handleSelectOutdoor = type => {
    setSelectedOutDoor(type);
  };
  // Handle form submission
  const handleRequestConsultation = () => {
    setSuccessPopupVisible(true);
  };

  return (
    <View style={screenStyles.workcontainer}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? hp('0.5%') : hp('1%')} // Adjust this based on your header height
      >
        <Header
          title="Copper Piping"
          onBack={() => navigation.goBack()}
          onHelp={true}
        />

        <ScrollView
          style={screenStyles.workscrollstyle}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginBottom: hp('10%') }}>
            <View style={screenStyles.worksliderview}>
              <Image
                source={images.BannerFive}
                style={screenStyles.workimage}
              />
            </View>

            <Text style={[screenStyles.workheadText, { marginBottom: hp(1) }]}>
              Fill Copper Piping details
            </Text>

            <View style={styles.FromStyle}>
              {/* Property Type */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Property Type</Text>
                <TouchableOpacity
                  style={styles.pickerWrapper}
                  onPress={() => setPropertyModalVisible(true)}
                >
                  <Text style={styles.labelInput}>{selectedProperty || 'Select Property'}</Text>
                  <FastImage
                    source={images.arrowdown}
                    style={styles.customIcon}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </TouchableOpacity>
              </View>

              {/* Type of AC */}
              <ACTypeSelector
                onChange={value => handleInputChange('acTypes', value)}
                // acTypes={customAcTypes} // Pass custom list
              />
              {/* Outdoor Condenser Location*/}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Outdoor Condenser Location</Text>
                <TouchableOpacity
                  style={styles.pickerWrapper}
                  onPress={() => setOutLocationModalVisible(true)}
                >
                  <Text style={styles.labelInput}>{selectOutDoor || 'Select the Outdoor'}</Text>
                  <FastImage
                    source={images.arrowdown}
                    style={styles.customIcon}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </TouchableOpacity>
              </View>

              {/* Pipe Run Length */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Pipe Run Length{' '}
                  <Text style={styles.labelInput}>(Optional)</Text>
                </Text>
                <View style={styles.textInputWithIcon}>
                  <TextInput
                    style={styles.textInputInner}
                    value={formData.pipeNumber}
                    onChangeText={value =>
                      handleInputChange('pipeNumber', value)
                    }
                    keyboardType="name-phone-pad"
                    placeholder="Enter number of length"
                  />
                </View>
              </View>

              {/* Upload Photos */}
              <MultipleUploadPhotos
                onChange={value => handleInputChange('uploadedPhotos', value)}
              />

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
            </View>

            {/* How it works? */}
            <View
              style={[HomeScreenStyles.workitem, { marginBottom: hp('10%') }]}
            >
              <Text style={HomeScreenStyles.utititle}>How it works?</Text>
              <View style={HomeScreenStyles.workContain}>
                <FlatList
                  data={works}
                  keyExtractor={(_, index) => `work-${index}`}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={HomeScreenStyles.workoption}
                      onPress={item.action}
                    >
                      <FastImage
                        source={item.icon}
                        style={HomeScreenStyles.workicon}
                      />
                      <Text
                        style={[
                          HomeScreenStyles.utilabel,
                          { color: COLORS.white },
                        ]}
                      >
                        {item.text}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.BtnView}>
          <CustomButton
            buttonName="Submit"
            margingTOP={hp('0%')}
            btnTextColor={COLORS.white}
            btnColor={COLORS.themeColor}
            onPress={handleRequestConsultation}
          />
        </View>
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
          onClose={() => {setSuccessPopupVisible(false),navigation.navigate('RequestDetail')}}
          HeadText="Wooohoo!"
          message1="Your request has been submitted."
          message2="Our team will connect with for further process."
          buttonCount={2}
          secondButtonText="Done"
          firstButtonText="View Request"
          onSecondButtonPress={() => setSuccessPopupVisible(false)}
        />

        <PropertySelectionModal
        visible={propertyModalVisible}
        onClose={() => setPropertyModalVisible(false)}
        onSelect={handleSelectProperty}
      />

        <OutdoorSelectionModal
          visible={outLocationModalVisible}
          onClose={() => setOutLocationModalVisible(false)}
          onSelect={handleSelectOutdoor}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginTop: hp('1%'),
    marginHorizontal: wp('2%'),
  },
  label: {
    fontSize: hp('1.5%'),
    color: COLORS.black,
    marginBottom: hp('1.5%'),
    fontFamily: Fonts.medium,
  },
  labelInput: {
    flex: 1,
    fontSize: hp('1.5%'),
    color: '#969494ff',
    marginLeft: hp('1%'),
    fontFamily: Fonts.medium,
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: wp('9%'),
    borderWidth: hp(0.1),
    borderColor: '#ddd',
    overflow: 'hidden',
    height: hp('5%'),
  },
  customIcon: {
    width: wp('5%'),
    height: hp('4%'),
    tintColor: '#c37e7eff',
    marginHorizontal: hp(2),
  },
  FromStyle: {
    backgroundColor: '#ffffffff',
    borderRadius: wp('4%'),
    paddingVertical: wp('4%'),
    paddingHorizontal: wp('1%'),
    marginBottom: hp('2%'),
  },
  textInput: {
    height: hp('5%'),
    backgroundColor: '#fff',
    borderRadius: wp('9%'),
    borderWidth: hp(0.1),
    borderColor: '#ddd',
    paddingHorizontal: wp('4%'),
    fontSize: hp('1.4%'),
    color: '#333',
  },
  textInputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: wp('9%'),
    borderWidth: hp(0.1),
    borderColor: '#ddd',
    height: hp('5%'),
  },
  textInputInner: {
    flex: 1,
    fontSize: hp('1.6%'),
    color: '#7c7b7bff',
    paddingHorizontal: wp('4%'),
  },
  uploadContainer: {
    height: hp('10%'),
    backgroundColor: '#eaf0f7ff',
    borderRadius: wp('3%'),
    borderWidth: hp(0.2),
    borderColor: '#ddd',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
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
  BtnView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: hp('2.5%'),
    paddingVertical: hp('2%'),
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: wp('90%'),
    height: hp('4.5%'),
    fontSize: hp('1.6%'),
    color: '#333',
    fontFamily: Fonts.medium,
    paddingVertical: Platform.OS === 'ios' ? hp('1%') : 0,
    paddingHorizontal: wp('4%'),
  },
  inputAndroid: {
    width: wp('90%'),
    height: hp('4.5%'),
    fontSize: hp('1.8%'),
    color: '#333',
    fontFamily: Fonts.bold,
    paddingHorizontal: wp('4%'),
  },
  iconContainer: {
    top: hp('0.5%'),
    right: wp('2%'),
  },
});

export default CopperPipeScreen;
