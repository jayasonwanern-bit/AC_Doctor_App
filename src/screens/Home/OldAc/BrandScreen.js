import React,{useState, useEffect} from 'react';
import images from '../../../assets/images';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
import Header from '../../../components/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../../../utils/colors';



const BrandScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
 const storage = new MMKVLoader().initialize();

  const Brands = [
    { id: '1', name: 'Blue Star', logo: images.hitachiIcon },
    { id: '2', name: 'Haier', logo: images.daikinIcon },
    { id: '3', name: 'Blue Star', logo: images.bluestar },
    { id: '4', name: 'LG', logo: images.lgLogo },
    { id: '5', name: 'Samsung', logo: images.samsungicon },
    { id: '6', name: 'Daikin', logo: images.daikinIcon },
  ];

  const filteredBrands = Brands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectBrand = async selectedBrand => {
    try {
      console.error('selectedBrand brand:', selectedBrand);
      await storage.setItem('selectedBrand', selectedBrand);
      navigation.navigate('SellOldAcScreen', { selectedBrand });
    } catch (error) {
      console.error('Error saving brand:', error);
    }
  };

  const BrandItem = ({ name, logo, onSelect }) => (
    <TouchableOpacity style={styles.brandItem} onPress={() => onSelect(name)}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.brandName}>{name}</Text>
    </TouchableOpacity>
  );

return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? hp('0.5%') : hp('1%')} // Adjust this based on your header height
      >
        <Header
          title="Brand"
          onBack={() => navigation.goBack()}
        />
         <View style={[styles.header,styles.searchInput]}>
        <Image source={images.searchIcon} style={styles.serachStyle} />
        <TextInput
          // style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
        <View style={styles.borderContainer}> 
          <Text style={styles.headerText}>Select Brand</Text>
      <FlatList
        data={filteredBrands}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => <BrandItem name={item.name} logo={item.logo} onSelect={handleSelectBrand} />}
        contentContainerStyle={styles.listContent}
      />
        </View>
        
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection:'row',
    margin:hp(1),
    alignItems:'center'
  },
  serachStyle:{
    width: wp(10),
    height: hp(3),
    resizeMode:'contain'
  },
  borderContainer:{
    margin:hp(1.5),
    backgroundColor: '#fefcfcff',
    borderRadius:hp(2),
    padding:hp(2),
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    color:COLORS.black,
    marginBottom: hp(1.5),
  },
  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: hp(7),
    padding: 8,
    fontSize: 16,
  },
  brandItem: {
    borderRadius: hp(1),
    alignItems: 'center',
    padding: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: hp(0.8),
    marginBottom: hp(1),
    alignSelf:'center',
  },
  logo: {
    width: wp(23),
    height: hp(5),
    resizeMode:'contain',
    marginBottom: hp(0.8),
  },
  brandName: {
    fontSize: 12,
    fontWeight: '400',
    color:COLORS.TextColor
  },
  listContent: {
    // padding: 16,
  },
});


export default BrandScreen;
