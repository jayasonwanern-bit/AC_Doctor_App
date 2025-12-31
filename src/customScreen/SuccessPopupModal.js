import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import images from '../assets/images';
import { COLORS, Fonts } from '../utils/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { isTablet } from '../components/TabletResponsiveSize';

const SuccessPopupModal = ({
  visible,
  onClose,
  message1,
  HeadText,
  message2,
  setIcon = images.correctIcon,
  HeadTextColor,
  buttonCount = 1, // Default to 1 button
  firstButtonText = 'Done',
  secondButtonText = 'View Request', // Default text for second button
  onSecondButtonPress = onClose, // Default action for second button
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* Checkmark Icon */}
          <View style={styles.iconContainer}>
            <Image
              source={setIcon}
              style={styles.checkmarkIcon}
              resizeMode="contain"
            />
          </View>

          {/* Success Message */}
          <Text style={[styles.title, { color: HeadTextColor }]}>
            {HeadText}
          </Text>
          <Text style={styles.message}>{message1}</Text>
          <Text style={styles.message}>{message2}</Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {buttonCount >= 1 && (
              <TouchableOpacity
                style={[
                  styles.doneButton,
                  {
                    width: buttonCount === 1 ? wp('70%') : wp('33%'), // Full width for 1 button, half for 2
                    alignSelf: buttonCount === 1 ? 'center' : 'flex-start',
                    backgroundColor:
                      buttonCount >= 1 ? COLORS.themeColor : '#ffffff',
                    marginRight: buttonCount === 2 ? 10 : 0, // Add spacing between buttons when 2 are present
                  },
                ]}
                onPress={onClose}
              >
                <Text
                  style={[
                    styles.doneButtonText,
                    { color: buttonCount >= 1 ? COLORS.white : '#676464ff' },
                  ]}
                >
                  {firstButtonText}
                </Text>
              </TouchableOpacity>
            )}
            {buttonCount >= 2 && (
              <TouchableOpacity
                style={[
                  styles.doneButton,
                  styles.secondButton,
                  {
                    backgroundColor: '#ffffff',
                    width: wp('40%'),
                  },
                ]}
                onPress={onSecondButtonPress}
              >
                <Text style={[styles.doneButtonText, { color: '#676464ff' }]}>
                  {secondButtonText}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconContainer: {
    marginBottom: 15,
  },
  checkmarkIcon: {
    width: wp('40%'),
    height: hp(9),
  },
  title: {
    fontSize: hp(3),
    fontFamily: Fonts.extraBold,
    color: COLORS.black,
    marginBottom: 10,
  },
  message: {
    fontSize: hp(1.4),
    fontFamily: Fonts.medium,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the buttons when 2 are present
    width: '100%',
    marginTop: 20,
  },
  doneButton: {
    paddingVertical: isTablet ? wp(1.5) : 8.5,
    alignItems: 'center',
    borderRadius: hp(10),
  },
  secondButton: {
    backgroundColor: COLORS.themeColor,
    borderColor: COLORS.textHeading,
    borderWidth: wp(0.2),
    borderRadius: hp(10),
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default SuccessPopupModal;
