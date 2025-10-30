import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';

const ConfirmationModal = ({ visible, onClose, selectedAddress, selectedSlot }) => {
    const navigation = useNavigation()
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <TouchableOpacity onPress={onClose} style={styles.crossBtn}>
          <Text style={styles.crossText}>X</Text>
            </TouchableOpacity>
          <Text style={styles.title}>Confirm Booking</Text>
          <Text style={styles.sectionLabel}>Selected Address</Text>
          {selectedAddress && (
            <View style={styles.addressBox}>
              <Text style={styles.addressText}>{selectedAddress.name}</Text>
              <Text style={styles.addressText}>{selectedAddress.address}</Text>
              <Text style={styles.addressText}>{selectedAddress.phone}</Text>
            </View>
          )}
          <Text style={styles.sectionLabel}>Selected Slot</Text>
          
          {selectedSlot && (
            <View style={styles.slotBox}>
              <Text style={styles.slotText}>
                Date: {selectedSlot.date}{'/'}{selectedSlot.monthNumber}{'/'}{selectedSlot.year}
              </Text>
              <Text style={styles.slotText}>Time: {selectedSlot.Timeslot}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.confirmButton} onPress={()=>onClose()}>
            <Text style={styles.confirmButtonText}>Process to pay</Text>
          </TouchableOpacity>

          <Text style={styles.policyLabel}>By proceeding, you agree to our T&C, Privacy & Cancellation Policy</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: wp('5%'),
    borderRadius: wp('4%'),
    width: wp('90%'),
    maxHeight: hp('60%'),
  },
  crossText: {
    fontSize: hp('2%'),
    color:COLORS.maroon,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  crossBtn:{
borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('7%'),
    padding: wp('1%'),
    width:wp('9%'),
    height:hp(4),
    alignSelf:'flex-end',
    position:'absolute',
    top:-16,
    right:-3,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp('3%'),
  },
  sectionLabel: {
    fontSize: hp('1.8%'),
    color: '#1d1c1cff',
     fontWeight:'600',
    marginBottom: hp('1%'),
  },
  addressBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('3%'),
    padding: wp('3%'),
    marginBottom: hp('2%'),
  },
  addressText: {
    fontSize: hp('1.5%'),
    color: '#333',
    marginBottom: hp('1%'),
  },
  slotBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('3%'),
    padding: wp('3%'),
    // marginBottom: hp('2%'),
  },
  slotText: {
    fontSize: hp('1.5%'),
    color: '#726e6eff',
    fontWeight:'500',
    marginBottom: hp('1%'),
  },
  confirmButton: {
    backgroundColor: '#328ee4ff', // Green color for confirm
    padding: hp('1.4%'),
    borderRadius: wp('5%'),
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: hp('1.7%'),
    fontWeight: 'bold',
  },
});

export default ConfirmationModal;