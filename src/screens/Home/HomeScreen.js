import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Platform,
  useColorScheme,
  StatusBar as RNStatusBar, // Import StatusBar
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import { getSelectedAddress } from '../../utils/ServiceApi';
import { COLORS } from '../../utils/colors';
import CustomSlider from '../../components/CustomSlider';
import LinearGradient from 'react-native-linear-gradient';
import styles, { productData, testimonialData } from './HomeScreenStyles';
import { SafeAreaView,useSafeAreaInsets } from 'react-native-safe-area-context'; // Use SafeAreaView instead of SafeAreaProvider

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme();
  const dynamicStyles = {
    backText: {
      color: scheme === 'dark' ? COLORS.white : '#000000',
    },
    title: {
      color: scheme === 'dark' ? COLORS.white : '#000000',
    },
    helpIcon: {
      tintColor: scheme === 'dark' ? COLORS.white : '#000000',
    },
    extraIcon: {
      tintColor: scheme === 'dark' ? COLORS.white : '#000000',
    },
  };

  const [selectedAddress, setSelectedAddress] = useState(null);

  // Navigation handlers (unchanged)
  const handleSellOldAC = () => navigation.navigate('SellOldAcScreen');
  const handleAMC = () => navigation.navigate('AMCScreen');
  const handleCopperPipe = () => navigation.navigate('CopperPipeScreen');
  const handleSterilization = () => navigation.navigate('Sterilization');
  const handleRepair = () => navigation.navigate('RepairScreen');
  const handleInstallation = () => navigation.navigate('InstallationScreen');
  const handleCommercialAC = () => navigation.navigate('CommericalAc');
  const handleGasCharging = () => navigation.navigate('GasChargeScreen');
  const handleOther = () => alert('Other clicked!');
  const handleCalulator = () => alert('Other clicked!');
  const handleErrorcode = () => alert('Other clicked!');
  const handleFreeConsult = () => navigation.navigate('FreeConsultant');
  const handleProComparison = () => alert('Other clicked!');

  // Data arrays (unchanged)
  const requestQuote = [
    { label: 'Sell Old AC', icon: images.sellAcIcon, action: handleSellOldAC },
    { label: 'AMC', icon: images.AMCicon, action: handleAMC },
    { label: 'Copper Pipe', icon: images.copperIcon, action: handleCopperPipe },
  ];

  const bookServices = [
    { label: 'Sterilization', icon: images.strerilization, action: handleSterilization },
    { label: 'Repair', icon: images.repairIcon, action: handleRepair },
    { label: 'Installation', icon: images.installationIcon, action: handleInstallation },
    { label: 'Commercial AC', icon: images.commercialIcon, action: handleCommercialAC },
    { label: 'Gas Charging', icon: images.gaschargeIcon, action: handleGasCharging },
    { label: 'Other', icon: images.otherIcon, action: handleOther },
  ];

  const utilities = [
    { label: 'Tonage Calculator', icon: images.calculateIcon, action: handleCalulator },
    { label: 'Error Codes', icon: images.errorCodeIcon, action: handleErrorcode },
    { label: 'Free Consultancy', icon: images.consultancyIcon, action: handleFreeConsult },
    { label: 'Product Comparison', icon: images.productIcon, action: handleProComparison },
  ];

  const bannerImages = [images.acPoster, images.acPoster, images.acPoster];
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

  useEffect(() => {
    const loadAddress = async () => {
      const addr = await getSelectedAddress();
      if (addr) {
        setSelectedAddress(addr.address || addr);
      }
    };
    loadAddress();
  }, []);

  const handleAddressPress = () => {
    navigation.navigate('SelectLocation', { onUpdate: loadAddress });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {/* Header with Location Icon and Add Location Text */}
        <View style={styles.header}>
          <Text style={styles.locationtitle}>Location</Text>
          <View style={styles.addressRow}>
            <TouchableOpacity style={styles.locationContainer} onPress={handleAddressPress}>
              <FastImage
                source={images.homeLocation}
                style={styles.locationIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={styles.locationText}>149, Vijay Nagar, Indore</Text>
            </TouchableOpacity>
            <View style={styles.wheatherContainer}>
              <FastImage
                source={images.homeLocation}
                style={styles.locationIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={styles.locationText}>25°C</Text>
            </View>
          </View>
        </View>

        {/* Rest of the content (unchanged) */}
        <CustomSlider images={bannerImages} />
        <View style={styles.reqcontainer}>
          <Text style={styles.reqtitle}>Book a Services</Text>
          <View style={styles.reqgrid}>
            {bookServices.map((item, index) => (
              <TouchableOpacity key={index} style={styles.bookcard} onPress={item.action}>
                <FastImage source={item.icon} style={styles.reqicon} />
                <Text style={styles.reqlabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.reqcontainer}>
          <Text style={styles.reqtitle}>Request a Quote</Text>
          <View style={styles.reqgrid}>
            {requestQuote.map((item, index) => (
              <TouchableOpacity key={index} style={styles.reqoption} onPress={item.action}>
                <FastImage source={item.icon} style={styles.reqicon} />
                <Text style={styles.reqlabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <LinearGradient colors={['#ecd5d0ff', '#ede3dbff', '#b9d4e7ff']} style={styles.uticontainer}>
          <Text style={styles.utititle}>Utilities</Text>
          <View style={styles.utigrid}>
            {utilities.map((item, index) => (
              <TouchableOpacity key={index} style={styles.utioption} onPress={item.action}>
                <FastImage source={item.icon} style={styles.utiicon} />
                <Text style={styles.utilabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </LinearGradient>
        <View style={styles.reqcontainer}>
          <Text style={styles.reqtitle}>Authorized Service Partner</Text>
          <FlatList
            data={pages}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => `page-${index}`}
            renderItem={({ item }) => (
              <View style={styles.authgrid}>
                {item.map((icon, idx) => (
                  <View key={idx} style={styles.authoption}>
                    <FastImage source={icon} style={styles.authicon} />
                  </View>
                ))}
              </View>
            )}
          />
        </View>
        <Text style={[styles.reqtitle, { marginLeft: hp('1.5%') }]}>Feature Product</Text>
        <FlatList
          data={productData}
          horizontal
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <View style={styles.boderinercard}>
                <View style={styles.topRow}>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{item.discount}</Text>
                  </View>
                  <FastImage source={images.dislike} style={styles.likeButton} />
                </View>
                <Image source={item.image} style={styles.image} resizeMode="contain" />
              </View>
              <View style={styles.dealRow}>
                <View style={styles.dealTag}>
                  <Text style={styles.dealText}>Limited time deal</Text>
                </View>
                <Text style={styles.rating}>⭐ {item.rating}</Text>
              </View>
              <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <View style={styles.bottomRow}>
                <Text style={styles.mrp}>
                  MRP <Text style={[styles.mrp, { textDecorationLine: 'line-through' }]}>{item.mrp}</Text>
                </Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <View style={styles.uticontainer}>
          <Text style={styles.utititle}>Who Trust Us</Text>
          <FlatList
            data={testimonialData}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: hp('1%') }}
            renderItem={({ item }) => (
              <View style={styles.testacard}>
                <View style={styles.testaquoteContainer}>
                  <View style={styles.testaratingContainer}>
                    <Text style={styles.testaquote}>“</Text>
                  </View>
                  <Text style={styles.testarating}>⭐ {item.rating}</Text>
                </View>
                <Text style={styles.testimonialText} numberOfLines={4}>{item.text}</Text>
                <Text style={styles.testalocation}>{item.location}</Text>
                <Text style={styles.testauthor}>{item.author}</Text>
              </View>
            )}
          />
        </View>
        <View style={styles.impcard}>
          <View style={[styles.impgrid, { alignItems: 'center' }]}>
            <View style={styles.borderSmall} />
            <Text style={styles.imptitle}>Impact on Society</Text>
            <View style={styles.borderSmall} />
          </View>
          <View style={styles.impgrid}>
            <TouchableOpacity style={styles.impstatCard} activeOpacity={0.8}>
              <Image source={images.clientIcon} style={styles.impicon} />
              <View>
                <Text style={styles.impstatTitle}>Precious Clients</Text>
                <Text style={styles.impstatValue}>12,345+</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.impstatCard} activeOpacity={0.8}>
              <Image source={images.acService} style={styles.impicon} />
              <View>
                <Text style={styles.impstatTitle}>Ac Serviced</Text>
                <Text style={styles.impstatValue}>8,900+</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.impstatCard} activeOpacity={0.8}>
              <Image source={images.greenGasIcon} style={styles.impicon} />
              <View>
                <Text style={styles.impstatTitle}>Saved Green Gas</Text>
                <Text style={styles.impstatValue}>52 MT</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.impstatCard} activeOpacity={0.8}>
              <Image source={images.co2Icon} style={styles.impicon} />
              <View>
                <Text style={styles.impstatTitle}>Saved CO2</Text>
                <Text style={styles.impstatValue}>0.7m MT</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <FastImage source={images.homebanner} style={styles.bannerStyle} />
        <View style={styles.sercard}>
          <Text style={styles.utititle}>Service Guarantee</Text>
          <View style={[styles.sergrid, { marginBottom: hp(Platform.OS === 'android' ? '7%' : '2%') }]}>
            <TouchableOpacity style={styles.serstatCard} activeOpacity={0.8}>
              <Image source={images.remoteIcon} style={styles.sericon} />
              <View>
                <Text style={styles.serstatTitle}>Rework Assurance</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serstatCard} activeOpacity={0.8}>
              <Image source={images.satisfactIcon} style={styles.sericon} />
              <View>
                <Text style={styles.serstatTitle}>100% Satisfaction</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serstatCard} activeOpacity={0.8}>
              <Image source={images.certifiedIcon} style={styles.sericon} />
              <View>
                <Text style={styles.serstatTitle}>Certified Engineers</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serstatCard} activeOpacity={0.8}>
              <Image source={images.copyRightIcon} style={styles.sericon} />
              <View>
                <Text style={styles.serstatTitle}>Copyright 2023</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;