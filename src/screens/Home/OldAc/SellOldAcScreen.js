import React, { useState, useEffect, useCallback } from 'react';
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
  Keyboard,
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
import BookingSlotModal from '../../../customScreen/BookingSlotModal';
import SuccessPopupModal from '../../../customScreen/SuccessPopupModal';
import MultipleUploadPhotos from '../../../components/MultipleUploadPhotos';
import ACTonnageModal from '../../../customScreen/ACTonnageModal';
import TonnageModal from '../../../customScreen/TonnageModal';
import AgeofAcModal from '../../../customScreen/AgeofAcModal';
import ConditionModal from '../../../customScreen/ConditionModal';
import ContentSection from '../../../customScreen/ContentSection';
import CustomModal from '../../../components/CustomModal';
import HomeScreenStyles, {
  keyBenefitsData,
  serviceInclusionsData,
  termsConditionsData,
} from '../HomeScreenStyles';
import { MMKVLoader } from 'react-native-mmkv-storage';
import PickerLabelUi from '../../../components/PickerLabelUi';
import CunstomInput from '../../../components/CunstomInput';
import WorkInfo from '../../../customScreen/WorkInfo';
import { isTablet } from '../../../components/TabletResponsiveSize';
import { forceTouchGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/ForceTouchGestureHandler';
import { dispatch, store } from '../../../redux/store';
import { setBrand } from '../../../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const SellOldAcScreen = ({ navigation }) => {
  const [activeSection, setActiveSection] = useState('Key Benefits');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [modalSlotVisible, setModalSlotVisible] = useState(false); //booktime
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectdate, setSelectDate] = useState('Select date');
  const [successPopupVisible, setSuccessPopupVisible] = useState(false); //successPopup
  const [AcTonageModalVisible, setAcTonageModalVisible] = useState(false);
  const [selectedAcTonage, setSelectedAcTonage] = useState('');
  const [TonageModalVisible, setTonageModalVisible] = useState(false);
  const [selectedTonage, setSelectedTonage] = useState('');
  const [ConditionModalVisible, setConditionModalVisible] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState('');
  const [AgeofAcModalVisible, setAgeofAcModalVisible] = useState(false);
  const [selectAgeofAc, setSelectedAgeofAc] = useState('');
  // const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedBrands, setSelectedBrands] = useState('');

  const storage = new MMKVLoader().initialize();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectNumberAC, setSelectNumberAC] = useState('');
  const [addAcStatus, setAddAcStatus] = useState(true);
  const brandNanme = store?.getState()?.auth?.brandName;
  console.log(brandNanme, 'jatin');

  const [formData, setFormData] = useState({
    brand: selectedBrands,
    acTypes: selectedAcTonage,
    tonnName: selectedTonage,
    tonnageName: selectAgeofAc,
    modalName: '',
    dateTime: selectdate,
    condition: selectedCondition,
    technology: '',
    Numberofold: '',
    uploadedPhotos: [],
    address: selectedAddress,
  });
  // console.log(formData, 'sell old ac screeen');
  const handleInputChange = (field, value) => {
    // console.log(field, value, 'lololololo');
    setFormData(prev => ({
      ...prev,
      Numberofold: selectNumberAC,
      [field]: value,
    }));
  };
  // brand name fetching

  console.log('shri', selectedBrands);

  useFocusEffect(
    useCallback(() => {
      const getBrand = async () => {
        const brand = await AsyncStorage.getItem('selectedBrand');
        if (brand) {
          setSelectedBrands(brand);
        }
      };

      getBrand();
    }, []),
  );
  useFocusEffect(
    useCallback(() => {
      return () => {
        AsyncStorage.removeItem('selectedBrand');
      };
    }, []),
  );

  useEffect(() => {
    handleInputChange('dateTime', selectdate);
  }, [selectdate]);

  // Function to handle slot selection
  const handleSlotSelection = slot => {
    if (slot) {
      const { date, monthNumber, year, time, Timeslot } = slot;
      const formattedDate = `${String(date).padStart(2, '0')}/${String(
        monthNumber,
      ).padStart(2, '0')}/${year}`;
      const formattedTime =
        time === 'morning' || time === 'firstHalf' ? 'First Half' : Timeslot;
      const formattedDateTime = `${formattedDate}, ${formattedTime}`; //e.g., "10/03/2025, First Half"
      setSelectDate(formattedDateTime);
      handleInputChange('dateTime', formattedDateTime);
    }
  };

  const handleSelectACtype = type => {
    handleInputChange('acTypes', type);
    setSelectedAcTonage(type);
  };
  const handleSelectTonage = type => {
    handleInputChange('tonnName', type);
    setSelectedTonage(type);
  };
  const handleSelectAge = type => {
    handleInputChange('tonnageName', type);
    setSelectedAgeofAc(type);
  };
  const handleCondition = type => {
    setSelectedCondition(type);
  };

  // Handle form submission
  const handleRequestConsultation = () => {
    setModalVisible(true);
    // setModalSlotVisible(true);
    setAddAcStatus(true);
  };
  // FAQ'S Toggle
  const toggleExpandFaq = index => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  const handelGoBack = async () => {
    try {
      await AsyncStorage.setItem('selectedBrand', '');
    } catch (error) {
      console.error('Error saving brand:', error);
    }
    navigation.goBack();
  };
  return (
    <View style={screenStyles.workcontainer}>
      <Header title="Old AC" onBack={() => handelGoBack()} onHelp={true} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: hp(10),
            paddingHorizontal: hp(1.5),
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginBottom: hp('10%') }}>
            <View style={screenStyles.worksliderview}>
              <Image
                source={images.BannerFive}
                style={screenStyles.workimage}
              />
            </View>

            <Text style={[screenStyles.workheadText]}>
              Fill your AC details
            </Text>

            <View style={styles.FromStyle}>
              {/* Brand */}
              <PickerLabelUi
                label="Brand"
                value={selectedBrands || 'Select Brand'}
                placeholder="Select Brand"
                droparraw={true}
                onPress={() =>
                  navigation.navigate('BrandScreen', {
                    from: 'SellOldAcScreen',
                  })
                }
                style={{ width: '98%' }}
                BorderRadius={hp(4)}
              />

              {/* Modal */}
              <CunstomInput
                value={formData.modalName}
                onChangeText={val => handleInputChange('modalName', val)}
                label="Model (Optional)"
                placeholder="LGUS-Q19YNZE"
                borderRadius={hp('2.5%')}
                MarginTop={hp('1%')}
                containerStyle={{ width: isTablet ? wp('92%') : wp(88) }}
                onSubmitEditing={() => Keyboard.dismiss()}
              />

              {/* Type of AC */}
              <PickerLabelUi
                label="AC Type"
                value={selectedAcTonage || 'Select AC'}
                placeholder="Select Brand"
                droparraw={true}
                marginTop={hp(1)}
                style={{ width: '98%' }}
                onPress={() => {
                  setAcTonageModalVisible(true), handleSelectACtype;
                }}
                BorderRadius={hp(4)}
              />

              {/* Tonnage */}
              <PickerLabelUi
                label="Tonnage"
                value={selectedTonage}
                placeholder="Select Tonnage"
                droparraw={true}
                marginTop={hp(1)}
                style={{ width: '98%' }}
                onPress={() => {
                  setTonageModalVisible(true), handleSelectACtype;
                }}
                BorderRadius={hp(4)}
              />

              {/* Age of Ac*/}
              <View style={[styles.twoColumnRow]}>
                <PickerLabelUi
                  label="Age of AC"
                  value={selectAgeofAc}
                  placeholder="1-3 Years"
                  style={{ flex: 1, marginRight: wp(6) }}
                  onPress={() => setAgeofAcModalVisible(true)}
                  BorderRadius={hp(4)}
                />
                <PickerLabelUi
                  label="Condition"
                  value={selectedCondition}
                  placeholder="Good"
                  style={{ flex: 1 }}
                  onPress={() => setConditionModalVisible(true)}
                  BorderRadius={hp(4)}
                />
              </View>

              {/* Ac Technologes */}
              <CunstomInput
                label="AC Technology"
                placeholder="Invertor"
                value={formData.technology}
                onChangeText={val => handleInputChange('technology', val)}
                borderRadius={hp('2.5%')}
                MarginTop={hp('1%')}
                containerStyle={{ width: isTablet ? wp(92) : wp('88%') }}
                onSubmitEditing={() => Keyboard.dismiss()}
              />

              {/* Upload Photos */}
              <MultipleUploadPhotos
                onChange={value => handleInputChange('uploadedPhotos', value)}
                OptionalText="(Front,Back and Serial Number)"
              />

              {/* Select Date & Time */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Preferred Inspection Date & Time
                </Text>
                <TouchableOpacity
                  style={styles.pickerWrapper}
                  onPress={() => {
                    setModalSlotVisible(true);
                  }}
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

              {/* <View style={{ marginTop: hp(2) }}> */}
              <TouchableOpacity
                style={styles.RowView}
                onPress={() => {
                  setModalVisible(true);
                  setAddAcStatus(false);
                }}
              >
                <Text style={[styles.labelInput, {}]}>Bulk Add ↑</Text>
                <Text
                  style={[
                    styles.labelInput,
                    {
                      color: COLORS.themeColor,
                      // marginLeft: wp(27),
                      textDecorationLine: 'underline',
                    },
                  ]}
                >
                  Add Another AC +
                </Text>
              </TouchableOpacity>
              <Text
                style={[
                  styles.labelInput,
                  {
                    fontSize: hp(1.3),
                    marginVertical: wp(2),
                    width: wp(88),
                    alignSelf: 'center',
                  },
                ]}
              >
                Note: You can add up to 5 ACs manually. If you have more than 5
                ACs, please use Bulk Add option for a faster process.
              </Text>

              {/* Sell Ac */}
            </View>

            <WorkInfo Homwork={false} needHelp={false} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* Confirm Button */}
      <View style={styles.BtnView}>
        <CustomButton
          buttonName="Confirm your Address"
          margingTOP={hp(0)}
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
          setTimeout(() => {
            setModalVisible(true);
          }, 300);
        }}
      />

      {/* Success Popup */}

      <SuccessPopupModal
        visible={successPopupVisible}
        onClose={() => {
          setSuccessPopupVisible(false), navigation.navigate('OldACRequest');
        }}
        HeadText="Wooohoo!"
        message1="Your bulk AC request has been submitted successfully!"
        message2="Our team will inspect and contact you soon."
        buttonCount={2}
        secondButtonText="Done"
        firstButtonText="View Request"
        onSecondButtonPress={() => setSuccessPopupVisible(false)}
      />

      <ACTonnageModal
        visible={AcTonageModalVisible}
        onClose={() => setAcTonageModalVisible(false)}
        onSelect={handleSelectACtype}
      />

      <TonnageModal
        visible={TonageModalVisible}
        onClose={() => setTonageModalVisible(false)}
        onSelect={handleSelectTonage}
      />

      <AgeofAcModal
        visible={AgeofAcModalVisible}
        onClose={() => setAgeofAcModalVisible(false)}
        onSelect={handleSelectAge}
      />

      <ConditionModal
        visible={ConditionModalVisible}
        onClose={() => setConditionModalVisible(false)}
        onSelect={handleCondition}
      />

      {/* add address */}
      <CustomModal
        numberofAC={selectNumberAC}
        addAcStatus={addAcStatus}
        handleInputChange={handleInputChange}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onProceed={() => {
          setModalVisible(false);
          setTimeout(() => {
            setSuccessPopupVisible(true);
          }, 300);
        }}
        setSelectedAddress={setSelectedAddress}
        setNumberofAC={setSelectNumberAC}
        setvalue={setSelectNumberAC}
      />
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
    fontFamily: Fonts.semiBold,
  },
  labelInput: {
    // flex: 1,
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
  customIcon: {
    width: wp('5%'),
    height: hp('4%'),
    marginHorizontal: hp(2),
  },
  FromStyle: {
    backgroundColor: 'white',
    borderRadius: wp('4%'),
    paddingVertical: wp('4%'),
    paddingHorizontal: wp('1%'),
    marginBottom: hp('2%'),
    alignSelf: 'center',
    width: '100%',
    // alignSelf: 'center',
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
    height: hp('4.8%'),
  },
  textInputInner: {
    flex: 1,
    fontSize: hp(1.5),
    color: '#5c5b5bff',
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
  BtnView: {
    width: '100%',
    paddingHorizontal: wp(4),
    paddingVertical: hp(3),
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  twoColumnRow: {
    flexDirection: 'row',
    width: '97%',
    alignSelf: 'center',
    marginTop: hp(1),
  },
  RowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '96%',
    // backgroundColor: 'red',
    marginTop: hp(2),
    paddingHorizontal: wp(1),
    alignSelf: 'center',
  },
});
export default SellOldAcScreen;
