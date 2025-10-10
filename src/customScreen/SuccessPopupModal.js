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
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const SuccessPopupModal = ({
  visible,
  onClose,
  message1,
  HeadText,
  message2,
  buttonCount = 1, // Default to 1 button
  firstButtonText='Done',
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
              source={images.correctIcon}
              style={styles.checkmarkIcon}
              resizeMode="contain"
            />
          </View>

          {/* Success Message */}
          <Text style={styles.title}>{HeadText}</Text>
          <Text style={styles.message}>{message1}</Text>
          <Text style={styles.message}>{message2}</Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {buttonCount >= 1 && (
              <TouchableOpacity style={styles.doneButton} onPress={onClose}>
                <Text style={[styles.doneButtonText,{ color: '#676464ff',}]}>{firstButtonText}</Text>
              </TouchableOpacity>
            )}
            {buttonCount >= 2 && (
              <TouchableOpacity
                style={[styles.doneButton, styles.secondButton]}
                onPress={onSecondButtonPress}
              >
                <Text style={styles.doneButtonText}>{secondButtonText}</Text>
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
    width: wp('30%'),
    height: hp(7),
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
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  doneButton: {
    width: wp('33%'), // Adjusted for two buttons
    paddingVertical: 8.5,
    alignItems: 'center',
    borderColor:COLORS.textHeading,
    borderWidth:0.5,
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

export default SuccessPopupModal;