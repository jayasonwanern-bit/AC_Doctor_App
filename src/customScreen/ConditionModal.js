import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../utils/colors';

const ConditionModal = ({
  visible,
  onClose,
  onSelect,
  data = [],
  title = 'Select Option',
}) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleDone = () => {
    if (selectedType) {
      onSelect(selectedType);
      onClose();
    }
  };

  const renderAcTypeItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.button,
        selectedType === item.name && styles.selectedButton,
      ]}
      onPress={() => setSelectedType(item.name)}
    >
      <Text
        style={[
          styles.buttonText,
          { color: selectedType === item.name ? COLORS.themeColor : '#333' },
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity
        style={styles.modalContainer}
        onPress={onClose}
        activeOpacity={1}
      >
        <View style={styles.modalContent}>
          <Text style={styles.headText}>{title}</Text>

          <FlatList
            data={data}
            renderItem={renderAcTypeItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
          />

          <TouchableOpacity
            style={styles.doneButton}
            onPress={handleDone}
            disabled={!selectedType}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: wp(5),
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignSelf: 'center',
    width: wp('100%'),
    paddingBottom: hp(Platform.OS === 'android' ? 4 : 5),
  },
  headText: {
    textAlign: 'center',
    fontSize: hp(1.6),
    fontFamily: Fonts.semiBold,
    color: COLORS.black,
    marginBottom: hp(1),
  },
  button: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: hp(0.8),
    margin: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    width: wp(25),
  },
  selectedButton: {
    borderColor: COLORS.themeColor,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: hp(1.5),
    color: '#333',
    fontFamily: Fonts.medium,
  },
  doneButton: {
    backgroundColor: COLORS.themeColor,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 15,
  },
  doneButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ConditionModal;
