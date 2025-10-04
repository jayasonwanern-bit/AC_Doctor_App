import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import images from '../assets/images';
import { COLORS, Fonts } from '../utils/colors';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const ContentSection = ({ activeSection, setActiveSection, keyBenefits, serviceInclusions, termsConditions }) => {
  const renderContent = () => {
    if (activeSection === 'Key Benefits') {
      return (
        <View style={styles.detailCont}>
          {keyBenefits.map((item, index) => (
            <View key={index} style={[styles.detailCont]}>
                <View style={{flexDirection:'row', alignItems:"center"}}>
              <FastImage source={images.pointDes} style={{ width: 20, height: 20 ,marginRight:widthPercentageToDP('4%')}} />
              <Text style={styles.texthead}>{item.title}</Text>
                </View>
              <>
              <Text style={styles.textdes}>{item.desc}</Text>
              </>
            </View>
          ))}
        </View>
      );
    } else if (activeSection === 'Description') {
      return (
         <View style={styles.detailCont}>
          {serviceInclusions.map((item, index) => (
            <View key={index}>
              {item.title && <Text>{item.title}</Text>}
              <Text>{item.text}</Text>
            </View>
          ))}
        </View>
      );
    } else if (activeSection === 'Terms & Conditions') {
      return (
         <View style={styles.detailCont}>
          {termsConditions.map((item, index) => (
            <Text key={index}>{item.text}</Text>
          ))}
        </View>
      );
    }
    return null;
  };

  return (
    <View>
        <View style={styles.tabContainer}>
      <TouchableOpacity style={[styles.button,{borderBottomColor: activeSection === 'Key Benefits' ? COLORS.themeColor : 'transparent',}]} onPress={() => setActiveSection('Key Benefits')}>
        <Text>Key Benefits</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={[styles.button,{borderBottomColor: activeSection === 'Description' ? COLORS.themeColor : 'transparent',}]} onPress={() => setActiveSection('Description')}>
        <Text>Description</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={[styles.button,{borderBottomColor: activeSection === 'Terms & Conditions' ? COLORS.themeColor : 'transparent',}]} onPress={() => setActiveSection('Terms & Conditions')}>
        <Text>Terms & Conditions</Text>
      </TouchableOpacity>
      </View>
      <ScrollView>{renderContent()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderBottomWidth:2,
    marginRight:10
  },
  tabContainer:{
    flexDirection:'row', 
    marginBottom:10, 
    justifyContent:'space-around',
    backgroundColor:COLORS.white,
    padding: heightPercentageToDP('1%'),
    borderRadius:widthPercentageToDP('3%')
},
detailCont:{
    marginBottom:10, 
    backgroundColor:COLORS.white,
    padding: heightPercentageToDP('1%'),
    borderRadius:widthPercentageToDP('3%'),
},
textdes:{
    fontSize:heightPercentageToDP('1.3%'),
    fontFamily:Fonts.medium,
    textAlign:'left',
    color:COLORS.textColor,
    marginLeft:widthPercentageToDP('9%'),
    marginBottom:heightPercentageToDP('2%')
},
texthead:{
    fontSize:heightPercentageToDP('1.5%'),
    fontFamily:Fonts.semiBold,
    textAlign:'left',
    color:COLORS.black
}
});

export default ContentSection;