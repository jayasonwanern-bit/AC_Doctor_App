// screens/ManageAddressScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../../utils/colors';
import images from '../../assets/images';
import Header from '../../components/Header';

const ManageAddressScreen = ({ navigation }) => {
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      name: 'Sachin Gupta',
      type: 'Home',
      address: '149, Scheme8, Vijay Nagar, Indore, Madhya Pradesh 452010',
      phone: '+91 9999999999',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Sachin Gupta',
      type: 'Work',
      address: '149, Scheme8, Vijay Nagar, Indore, Madhya Pradesh 452010',
      phone: '+91 9999999999',
      isDefault: false,
    },
  ]);

  const [selectedId, setSelectedId] = useState('1');

  const handleSelect = id => {
    setSelectedId(id);
    Alert.alert('Address Selected', 'This address is now selected!');
  };

  const handleEdit = item => {
    // navigation.navigate('AddAddress', { address: item, isEdit: true });
    navigation.navigate('AddAddress', { from: 'ManageAddressScreen' });
  };

  const handleDelete = id => {
    Alert.alert('Delete Address', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setAddresses(addresses.filter(a => a.id !== id));
          if (selectedId === id) setSelectedId(null);
        },
      },
    ]);
  };

  const renderAddressItem = ({ item }) => {
    const isSelected = selectedId === item.id;

    return (
      <TouchableOpacity
        style={styles.addressCard}
        onPress={() => handleSelect(item.id)}
        activeOpacity={0.7}
      >
        {/* Radio Button */}
        <View style={styles.radioContainer}>
          <View style={[styles.radio, isSelected && styles.radioSelected]}>
            {isSelected && <View style={styles.radioDot} />}
          </View>
        </View>

        {/* Address Details */}
        <View style={styles.details}>
          <View style={styles.headerRow}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.type}>{item.type}</Text>
            {item.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>Default</Text>
              </View>
            )}
          </View>

          <Text style={styles.address}>{item.address}</Text>
          <Text style={styles.phone}>{item.phone}</Text>

          {/* Edit & Delete Icons */}
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => handleEdit(item)}
              style={styles.iconBtn}
            >
              <Image source={images.editIcon} style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(item.id)}
              style={styles.iconBtn}
            >
              <Image
                source={images.delete}
                style={[styles.actionIcon, { tintColor: COLORS.red }]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Manage Address" onBack={() => navigation.goBack()} />

      <View style={{ paddingHorizontal: wp(4) }}>
        <Text style={styles.title}>Saved Address</Text>

        <FlatList
          data={addresses}
          keyExtractor={item => item.id}
          renderItem={renderAddressItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />

        {/* Add New Address Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddAddress')}
        >
          <Image source={images.Plusicon} style={styles.plusIcon} />
          <Text style={styles.addText}>Add New Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ====================== STYLES ======================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: hp(1.8),
    fontFamily: Fonts.semiBold,
    color: COLORS.textHeading,
    marginVertical: hp(2),
  },
  list: {
    paddingBottom: hp(5),
  },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: wp(4),
    borderRadius: wp(3),
    marginVertical: hp(1),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },

  // Radio
  radioContainer: {
    justifyContent: 'center',
    marginRight: wp(3),
  },
  radio: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: COLORS.themeColor,
  },
  radioDot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    backgroundColor: COLORS.themeColor,
  },

  // Details
  details: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  name: {
    fontSize: hp(1.5),
    fontWeight: '600',
    color: COLORS.black,
    marginRight: wp(2),
  },
  type: {
    fontSize: hp(1.3),
    color: '#666',
    backgroundColor: COLORS.lightSky,
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.2),
    borderRadius: wp(1),
    marginRight: wp(2),
  },
  defaultBadge: {
    backgroundColor: COLORS.themeColor,
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    right: -wp(5.5),
    top: -hp(0),
  },
  defaultText: {
    color: '#fff',
    fontSize: hp(1.2),
    fontWeight: 'bold',
  },
  address: {
    fontSize: hp(1.5),
    color: '#555',
    marginBottom: hp(0.5),
    lineHeight: hp(2.5),
  },
  phone: {
    fontSize: hp(1.5),
    color: COLORS.black,
    fontFamily: Fonts.medium,
    marginBottom: hp(1),
  },

  // Actions
  actions: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    bottom: hp(1),
  },
  iconBtn: {
    marginLeft: wp(3),
  },
  actionIcon: {
    width: wp(5),
    height: wp(5),
  },

  // Add Button
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: hp(1.5),
    borderRadius: wp(10),
    borderWidth: wp(0.1),
    borderColor: COLORS.black,
    elevation: 3,
  },
  plusIcon: {
    width: wp(5),
    height: wp(5),
    marginRight: wp(2),
  },
  addText: {
    fontSize: hp(1.7),
    color: COLORS.black,
    fontWeight: '600',
  },
});

export default ManageAddressScreen;
