import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView,TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import images from '../../assets/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../../utils/colors';
import FastImage from 'react-native-fast-image';

const ViewCartScreen = ({ navigation }) => {
  const [acTypes, setAcTypes] = useState([
    { name: 'Split AC', count: 2, showButtons: false,},

    {
      name: 'Cassette AC',
      count: 1,
      showButtons: false,
    },
  ]);

  // Handle Increment
  const handleIncrement = (index) => {
    const updatedAcTypes = [...acTypes];
    updatedAcTypes[index].count += 1;
    setAcTypes(updatedAcTypes);
  };

  // Handle Decrement
  const handleDecrement = (index) => {
    const updatedAcTypes = [...acTypes];
    if (updatedAcTypes[index].count > 0) {
      updatedAcTypes[index].count -= 1;
    }
    setAcTypes(updatedAcTypes);
  };

  // render
  return (
    <View style={styles.container}>
      <Header title="Your Cart" onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scrollstyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.ordercontainer}>
          <Image source={images.tag} style={styles.carticon} />
          <Text style={styles.viewCartText}>Saving ₹150 on this order</Text>
        </View>

        <Text style={styles.headText}>Repair Service</Text>

        <View style={{ marginVertical: wp('2%') }}>
          {acTypes.map((ac, index) => (
            <View key={index} style={styles.workItem}>
              <View>
                <Text style={styles.workText}>{ac.name}</Text>
              </View>

              <View style={styles.workButtonContainer}>
                <TouchableOpacity
                  style={styles.workButton}
                  onPress={() => handleDecrement(index)}
                >
                  <Text style={styles.workButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.workCount}>{ac.count}</Text>
                <TouchableOpacity
                  style={styles.workButton}
                  onPress={() => handleIncrement(index)}
                >
                  <Text style={styles.workButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Installation */}
        <Text style={styles.headText}>Installation</Text>
    <View style={{ marginVertical: wp('2%') }}>
          {acTypes.map((ac, index) => (
            <View key={index} style={styles.workItem}>
              <View>
                <Text style={styles.workText}>{ac.name}</Text>
              </View>

              <View style={styles.workButtonContainer}>
                <TouchableOpacity
                  style={styles.workButton}
                  onPress={() => handleDecrement(index)}
                >
                  <Text style={styles.workButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.workCount}>{ac.count}</Text>
                <TouchableOpacity
                  style={styles.workButton}
                  onPress={() => handleIncrement(index)}
                >
                  <Text style={styles.workButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Text style={styles.addText}>Add More</Text>
        </TouchableOpacity>


      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollstyle: { flex: 1, paddingHorizontal: wp('3%') },
  ordercontainer: {
    flexDirection: 'row',
    width: wp('95%'),
    borderColor: COLORS.red,
    borderRadius: wp('2%'),
    borderWidth: wp('0.2%'),
    backgroundColor: COLORS.white,
    marginVertical: hp('1.5%'),
    alignSelf: 'center',
    alignItems: 'center',
  },
  viewCartText: {
    fontSize: wp('3%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.peacock,
  },
  carticon: {
    width: wp('5%'),
    height: hp('5%'),
    resizeMode: 'contain',
    marginHorizontal: hp('1%'),
  },
  headText: {
    fontSize: wp('3%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.black,
  },

 workItem: {
     flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: hp('1.2%'), 
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor:COLORS.white,
    borderRadius:wp('1%')
  },
  workText: {
    fontSize: hp('1.5%'), 
    color: COLORS.textHeading,
    fontFamily: Fonts.medium, // Use your defined medium font
  },
  workButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: hp('2.5%'), 
  },
  workButton: {
    borderWidth: 1,
    borderRadius: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    width: wp('7.3%'),
    height: hp('3.5%'),
    alignSelf:'center' ,
    borderColor: '#ddd',
  },
  workButtonText: {
   fontSize: wp('5%'),
    color: COLORS.black,
    textAlign: 'center',
    fontFamily: Fonts.medium,
    marginBottom:hp('0.5%'),// Use your defined medium font
  },
  workCount: {
    fontSize: hp('1.6%'), 
    color: COLORS.themeColor,
    fontFamily: Fonts.medium, 
    marginHorizontal: wp('2%'), 
  },
  addText: {
    marginTop:hp('1%'),
    fontSize: hp('1.4%'), 
    color: COLORS.themeColor,
    fontFamily: Fonts.medium, 
    textAlign:"center",
    textDecorationLine:'underline'
  },
});

export default ViewCartScreen;
