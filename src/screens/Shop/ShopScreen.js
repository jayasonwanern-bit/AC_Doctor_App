import React, { useState } from 'react'
import { View, Text, ScrollView,TouchableOpacity, FlatList, Image, Alert, StatusBar, useColorScheme } from 'react-native'
import Commonstyles, { productData, testimonialData } from '../Home/HomeScreenStyles';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import images from '../../assets/images';
import CustomSlider from '../../components/CustomSlider';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../utils/colors';

const ShopScreen = ({navigation}) => {
      const scheme = useColorScheme();
      
  const handleAddressPress = () => {
    navigation.navigate('SelectLocation', { onUpdate: loadAddress });
  };  
//  banner slide
  const bannerImages = [images.shopFrame, images.acPoster, images.shopFrame];
  const bookServices = [
    { label: 'Window AC', icon: images.ac_window, action: () =>navigation.navigate('ProductListScreen',{screenName:'Window Ac'}) },
    { label: 'Split AC', icon: images.ac_split, action: () =>navigation.navigate('ProductListScreen',{screenName:'Split Ac'}) },
    { label: 'Cassette AC', icon: images.ac_cassette, action: () =>navigation.navigate('ProductListScreen',{screenName:'Cassette Ac'}) },
    { label: 'Tower AC', icon: images.ac_tower, action: () =>navigation.navigate('ProductListScreen',{screenName:'Tower Ac'})},
    { label: 'Ducted AC', icon: images.ac_ducted, action: () =>navigation.navigate('ProductListScreen',{screenName:'Ducted Ac'}) },
    { label: 'VRV/VRF', icon: images.ac_vrv, action: () =>navigation.navigate('ProductListScreen',{screenName:'VRV/VRF'}) },
  ];


  const accessoriesItem = [
    { label: 'AC Stabilizer', icon: images.ac_stablizier, action: () =>navigation.navigate('ProductListScreen',{screenName:'AC Stabilizer'})},
    { label: 'Outdoor Stand', icon: images.ac_outdoor, action: () =>navigation.navigate('ProductListScreen',{screenName:'Outdoor Stand'})},
    { label: 'Indoor Unit', icon: images.AC_indoor, action: () =>navigation.navigate('ProductListScreen',{screenName:'Indoor Unit'})},
    { label: 'New Remote', icon: images.remote, action: () =>navigation.navigate('ProductListScreen',{screenName:'New Remote'})},
  ];
  
  const utilities = [
    { label: 'Tonage Calculator', icon: images.calculateIcon, action:handleCalulator },
    { label: 'Product Comparison', icon: images.productIcon, action: handleProComparison },
    { label: 'Free Consultancy', icon: images.consultancyIcon, action: handleFreeConsult },
  ];
  const handleCalulator = () => navigation.navigate('TonnageCalculatorScreen');
  const handleFreeConsult = () => navigation.navigate('FreeConsultant');
  const handleProComparison = () => Alert.alert('Other clicked!');

   const Authpartner = [
    images.lgIcon,
    images.MITelectricIcon,
    images.daikinIcon,
    images.lgIcon,
    images.MITelectricIcon,
    images.daikinIcon,
    images.lgIcon,
    images.MITelectricIcon,
    images.daikinIcon,
  ];
   const chunkArray = (array, size) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size),
    );
  };
  const pages = chunkArray(Authpartner, 6);
  

// render
    return (
       <SafeAreaView style={Commonstyles.safeArea}>
        <StatusBar
                 barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
                  backgroundColor="transparent"
                  translucent={true} 
                />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={Commonstyles.container}
        contentContainerStyle={Commonstyles.content}
      >
        {/* Header with Location Icon and Add Location Text */}
        <View style={Commonstyles.header}>
          <Text style={Commonstyles.locationtitle}>Location</Text>
          <View style={Commonstyles.addressRow}>
            <TouchableOpacity style={Commonstyles.locationContainer} onPress={handleAddressPress}>
              <FastImage
                source={images.homeLocation}
                style={Commonstyles.locationIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={Commonstyles.locationText}>149, Vijay Nagar, Indore</Text>
            </TouchableOpacity>
            <View style={[Commonstyles.reqgrid]}>
             <TouchableOpacity>
              <FastImage
                source={images.heart}
                style={[Commonstyles.locationIcon,{marginHorizontal:wp(2)}]}
                resizeMode={FastImage.resizeMode.contain}
              />
             </TouchableOpacity>
              
              <TouchableOpacity>
              <FastImage
                source={images.shopIcon}
                style={Commonstyles.locationIcon}
                resizeMode={FastImage.resizeMode.contain}
              />  
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* header end */}

 {/* Rest of the content (unchanged) */}
        <CustomSlider images={bannerImages} />
        <View style={Commonstyles.reqcontainer}>
          <Text style={Commonstyles.reqtitle}>AC Category</Text>
          <View style={Commonstyles.reqgrid}>
            {bookServices.map((item, index) => (
              <TouchableOpacity key={index} style={Commonstyles.bookcard} 
              onPress={item.action}
              >
                <FastImage source={item.icon} style={Commonstyles.reqicon} />
                <Text style={Commonstyles.reqlabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

{/* Accessories */}
         <View style={Commonstyles.reqcontainer}>
          <Text style={Commonstyles.reqtitle}>Accessories</Text>
          <View style={Commonstyles.reqgrid}>
            {accessoriesItem.map((item, index) => (
              <TouchableOpacity key={index} style={Commonstyles.reqoption} 
              onPress={item.action}
              >
                <FastImage source={item.icon} style={Commonstyles.reqicon} />
                <Text style={Commonstyles.reqlabel}>{item.label}</Text>
              </TouchableOpacity>        
            ))}
          </View>
        </View>

 <FastImage source={images.Shop_Bottom} style={Commonstyles.bannerStyle} />
        

{/* We sell all brands */}
         <View style={Commonstyles.reqcontainer}>
          <Text style={Commonstyles.reqtitle}>We sell all brands</Text>
          <FlatList
            data={pages}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => `page-${index}`}
            renderItem={({ item }) => (
              <View style={Commonstyles.authgrid}>
                {item.map((icon, idx) => (
                  <View key={idx} style={Commonstyles.authoption}>
                    <FastImage source={icon} style={Commonstyles.authicon} />
                  </View>
                ))}
              </View>
            )}
          />
        </View>

{/* Utilities */}
         <LinearGradient colors={['#ecd5d0ff', '#ede3dbff', '#b9d4e7ff']} style={Commonstyles.uticontainer}>
          <Text style={Commonstyles.utititle}>Utilities</Text>
          <View style={Commonstyles.utigrid}>
            {utilities.map((item, index) => (
              <TouchableOpacity key={index} style={Commonstyles.utioption} onPress={item.action}>
                <FastImage source={item.icon} style={Commonstyles.utiicon} />
                <Text style={Commonstyles.utilabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </LinearGradient>

{/* Who Trust On Us */}
 <View style={Commonstyles.uticontainer}>
          <Text style={Commonstyles.utititle}>Who Trust On Us</Text>
          <FlatList
            data={testimonialData}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: hp('1%') }}
            renderItem={({ item }) => (
              <View style={Commonstyles.testacard}>
                <View style={Commonstyles.testaquoteContainer}>
                  <View style={Commonstyles.testaratingContainer}>
                    <Text style={Commonstyles.testaquote}>“</Text>
                  </View>
                  <Text style={Commonstyles.testarating}>⭐ {item.rating}</Text>
                </View>
                <Text style={Commonstyles.testimonialText} numberOfLines={4}>{item.text}</Text>
                <Text style={Commonstyles.testalocation}>{item.location}</Text>
                <Text style={Commonstyles.testauthor}>{item.author}</Text>
              </View>
            )}
          />
        </View>

{/* Service Guarantee */}
            <View style={[Commonstyles.sercard,{backgroundColor:COLORS.white, paddingTop:hp(1.5), borderRadius:hp(1), marginBottom:hp(15)}]}>
          <Text style={Commonstyles.utititle}>Service Guarantee</Text>
          <View style={[Commonstyles.sergrid, { marginBottom: hp(Platform.OS === 'android' ? '7%' : '2%') }]}>
            <TouchableOpacity style={Commonstyles.serstatCard} activeOpacity={0.8}>
              <Image source={images.remoteIcon} style={Commonstyles.sericon} />
              <View>
                <Text style={Commonstyles.serstatTitle}>Rework Assurance</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={Commonstyles.serstatCard} activeOpacity={0.8}>
              <Image source={images.satisfactIcon} style={Commonstyles.sericon} />
              <View>
                <Text style={Commonstyles.serstatTitle}>100% Satisfaction</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={Commonstyles.serstatCard} activeOpacity={0.8}>
              <Image source={images.certifiedIcon} style={Commonstyles.sericon} />
              <View>
                <Text style={Commonstyles.serstatTitle}>Certified Engineers</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={Commonstyles.serstatCard} activeOpacity={0.8}>
              <Image source={images.copyRightIcon} style={Commonstyles.sericon} />
              <View>
                <Text style={Commonstyles.serstatTitle}>Copyright 2023</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
        </SafeAreaView>
    )
}

export default ShopScreen   



