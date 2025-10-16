import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { COLORS, Fonts } from '../utils/colors';
import images from '../assets/images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const ACTypeSelector = ({ onChange, acTypes: customAcTypes = [] }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});

  // Default AC types (static array)
  const defaultAcTypes = [
    { name: 'Split AC', count: 2, showButtons: false, acIcon: images.splitAC },
    {
      name: 'Window AC',
      count: 0,
      showButtons: false,
      acIcon: images.windowAc,
    },
    {
      name: 'Cassette AC',
      count: 1,
      showButtons: false,
      acIcon: images.casseteAc,
    },
    { name: 'VRV/VRF AC', count: 0, showButtons: false, acIcon: images.VRVac },
    {
      name: 'Ducted AC',
      count: 0,
      showButtons: false,
      acIcon: images.ductedAc,
    },
    { name: 'Tower AC', count: 0, showButtons: false, acIcon: images.towerAc },
  ];

  // Use customAcTypes if provided, otherwise use default
  const finalAcTypes =
    customAcTypes.length > 0 ? customAcTypes : defaultAcTypes;

  // Add or update count
  const handleAddItem = itemName => {
    const updatedItems = {
      ...selectedItems,
      [itemName]: (selectedItems[itemName] || 0) + 1,
    };
    setSelectedItems(updatedItems);
    onChange(updatedItems);
  };

  // Decrease count or remove item
  const handleMinusItem = itemName => {
    setSelectedItems(prev => {
      const newCount = prev[itemName] - 1;
      if (newCount <= 0) {
        const { [itemName]: _, ...rest } = prev;
        onChange(rest);
        return rest;
      }
      const updated = { ...prev, [itemName]: newCount };
      onChange(updated);
      return updated;
    });
  };

  // Remove item or decrease count
  const handleRemoveItem = itemName => {
    setSelectedItems(prev => {
      const newCount = prev[itemName] - 1;
      if (newCount <= 0) {
        const { [itemName]: _, ...rest } = prev;
        onChange(rest);
        return rest;
      }
      const updated = { ...prev, [itemName]: newCount };
      onChange(updated);
      return updated;
    });
  };

  // Render selected items as chips
  const renderChips = () => {
    return Object.entries(selectedItems).map(([itemName, count]) => (
      <View key={itemName} style={styles.chipContainer}>
        <Text style={styles.chipText}>{`${itemName} - ${count}`}</Text>
        <TouchableOpacity onPress={() => handleRemoveItem(itemName)}>
          <Text style={styles.removeText}>×</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  // Ensure hooks are called before any conditional returns
  if (!onChange) {
    console.warn('onChange prop is missing in ACTypeSelector');
    return null; // Safe early return after hooks
  }

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Type of AC</Text>
      <TouchableOpacity
        style={styles.pickerWrapper}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.placeholder}>Select AC type</Text>
        <FastImage
          source={images.arrowdown}
          style={styles.customIcon}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>

      {Object.keys(selectedItems).length > 0 ? (
        <View style={styles.chipsWrapper}>{renderChips()}</View>
      ) : (
        <View style={{ marginTop: -25 }} />
      )}

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalBackground} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <FlatList
              data={finalAcTypes}
              keyExtractor={item => item.name}
              renderItem={({ item }) => {
                const count = selectedItems[item.name] || 0;
                return (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => handleAddItem(item)}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <FastImage
                        source={item.acIcon}
                        style={styles.customIAccon}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                      <Text style={styles.itemText}>{item.name}</Text>
                    </View>
                    {count === 0 ? (
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => handleAddItem(item.name)}
                      >
                        <Text style={styles.addButtonText}> + Add</Text>
                      </TouchableOpacity>
                    ) : (
                      <>
                        <TouchableOpacity
                          style={styles.minusButton}
                          onPress={() => handleMinusItem(item.name)}
                        >
                          <Text style={styles.minusButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.countText}>{count}</Text>
                        <TouchableOpacity
                          style={styles.addButton}
                          onPress={() => handleAddItem(item.name)}
                        >
                          <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
    marginHorizontal: 10,
  },
  label: {
    fontSize: 13,
    color: COLORS.black,
    marginVertical: 10,
    fontFamily: Fonts.medium,
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    height: 45,
    marginBottom: 8,
    width:wp(88),
    alignSelf:'center'
  },
  placeholder: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  customIcon: {
    width: wp(5),
    height: hp(5),
    // tintColor: '#c37e7eff',
  },
  customIAccon: {
    width: wp(8),
    height: hp(5),
    marginRight: 15,
    // tintColor: '#c37e7eff',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  countText: {
    fontSize: 16,
    color: '#666',
  },
  chipsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:'center',
    flexWrap:'wrap'
  },
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8eef5ff',
    borderRadius: 10,
    paddingHorizontal: 5,
    height: 30,
    // width:'35%',
    marginRight: 5,
    marginVertical: 5,
  },
  chipText: {
    fontSize: 13,
    color: '#333',
  },
  removeText: {
    fontSize: 16,
    color: '#989595ff',
    marginLeft: 5,
  },
  doneButton: {
    backgroundColor: '#2683e6ff',
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addButton: {
    padding: 6,
    borderWidth: 1,
    borderColor: COLORS.textHeading,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  addButtonText: {
    fontSize: 13,
    color: '#333',
  },
  minusButton: {
    padding: 6,
    borderWidth: 1,
    borderColor: COLORS.textHeading,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  minusButtonText: {
    fontSize: 13,
    color: '#333',
  },
  countText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default ACTypeSelector;
