import React from 'react'
import { View, Text ,Image, TouchableOpacity, StyleSheet} from 'react-native'
import images from '../../assets/images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import CustomButton from '../../components/CustomButton';
import { COLORS } from '../../utils/colors';

const ConfirmService = ({navigation}) => {
// render
    return (
        <View style={{flex:1}}>
            <Header title="Service Confirmed" onBack={() => {}} />
           <Image source={images.confirmedService} 
           style={styles.imageStyle}
           resizeMode="contain"
           />

 {/* BUTTON */}
        <TouchableOpacity style={styles.bookBtn}>
           <CustomButton
              buttonName="Back to AMC"
              fontSize={hp('2.2%')}
              width={wp('80%')}
              height={hp('6%')}
              btnTextColor={COLORS.white}
              onPress={() => navigation.navigate('Tab', { screen:'AMC'})}
           />
        </TouchableOpacity>
          
        </View>
    )
}

const styles = StyleSheet.create({
    bookBtn: {
     alignItems: 'center',
         paddingHorizontal: hp('2.5%'),
         paddingBottom: hp('5%'),
         paddingVertical: hp('1%'),
         position: 'absolute',
         bottom: 0,
         left: 0,
         right: 0,
         zIndex: 1000,
         alignItems: 'center',
    },
    imageStyle:{
        width:wp('85%'), height:hp('70%'),
        alignSelf:'center',justifyContent:'center'}
  });

export default ConfirmService
