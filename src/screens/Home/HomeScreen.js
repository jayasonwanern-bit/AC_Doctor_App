import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Platform,
  useColorScheme,
  Animated,
  StatusBar,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import { getSelectedAddress } from '../../utils/ServiceApi';
import { COLORS } from '../../utils/colors';
import CustomSlider from '../../components/CustomSlider';
import LinearGradient from 'react-native-linear-gradient';
import styles, { productData, testimonialData } from './HomeScreenStyles';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'; // Use SafeAreaView instead of SafeAreaProvider
import { getAuthpatner, getServiceList, getBanner } from '../../api/homeApi';
import { useFocusEffect } from '@react-navigation/native';
import GetLoaction from '../../components/GetLoaction';
import { useDispatch } from 'react-redux';
import { dispatch, store } from '../../redux/store';
import { setAddress, setCelcius } from '../../redux/slices/authSlice';
import OnTopScreen from '../../components/OnTopScreen';
import CustomLoader from '../../components/CustomLoader';
const HomeScreen = ({ navigation, route }) => {
  const {
    latitude,
    longitude,
    addressText,
    // loading,

    getLocation,
  } = GetLoaction();
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme();
  const [loading, setLoading] = useState(false);
  // Dynamic styles based on scheme
  const dynamicStyles = {
    safeArea: {
      backgroundColor: scheme === 'dark' ? '#1a1a1a' : '#F4F8FE',
    },
    backText: {
      color: scheme === 'dark' ? '#ffffff' : '#000000',
    },
    title: {
      color: scheme === 'dark' ? '#ffffff' : '#000000',
    },
    helpIcon: {
      tintColor: scheme === 'dark' ? '#ffffff' : '#000000',
    },
    extraIcon: {
      tintColor: scheme === 'dark' ? '#ffffff' : '#000000',
    },
  };

  const { locationData } = route.params || {};

  const handleSellOldAC = () => navigation.navigate('SellOldAcScreen');
  const handleAMC = () => navigation.navigate('AMCFrom');
  const handleCopperPipe = () => navigation.navigate('CopperPipeScreen');
  const handleCalulator = () => navigation.navigate('TonnageCalculatorScreen');
  const handleErrorcode = () => navigation.navigate('ErrorCodeScreen');
  const handleFreeConsult = () => navigation.navigate('FreeConsultant');
  const handleProComparison = () =>
    navigation.reset({
      index: 0,
      routes: [{ name: 'Tab', params: { screen: 'Shop' } }],
    });

  // Data arrays (unchanged)
  const requestQuote = [
    { label: 'Sell Old AC', icon: images.sellAcIcon, action: handleSellOldAC },
    { label: 'AMC', icon: images.AMCicon, action: handleAMC },
    {
      label: 'Free Consultancy',
      icon: images.consultancyIcon,
      action: handleFreeConsult,
    },
    { label: 'Copper Pipe', icon: images.copperIcon, action: handleCopperPipe },
  ];

  const utilities = [
    {
      label: 'Tonage Calculator',
      icon: images.calculateIcon,
      action: handleCalulator,
    },
    {
      label: 'Error Codes',
      icon: images.errorCodeIcon,
      action: handleErrorcode,
    },
    {
      label: 'Product Comparison',
      icon: images.productIcon,
      action: handleProComparison,
    },
  ];
  const [Authpartner, setAuthpartner] = useState([]);
  const [bookServices, setBookServices] = useState([]);
  const [bannerImages, setBannerImages] = useState([]);
  const chunkArray = (array = [], size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };
  const activeData = Authpartner.filter(item => item.isActive === 1);
  const pages = chunkArray(activeData, 6);
  const [Loader, setLoader] = useState(true);
  const [addresslocation, setAddressTextLocation] = useState('');

  useEffect(() => {
    // ✅ CASE 1: Address coming from previous screen
    if (locationData?.address?.fullAddress) {
      setLoader(false);
      setAddressTextLocation(locationData.address);
      dispatch(setAddress({ address: locationData.address }));
      getWeather(locationData.latitude, locationData.longitude);
      return;
    }

    // ✅ CASE 2: No address → fetch current location
    setLoader(true);
    getLocation(data => {
      getWeather(data.latitude, data.longitude);
      setAddressTextLocation(data?.address || '');
      dispatch(setAddress({ address: data?.address }));
      setLoader(false);
    });
  }, []);

  const [WeatherLoader, setWeatherLoader] = useState(true);
  const [WeatherData, setWeatherData] = useState();

  const getWeather = async (lat, lon) => {
    setWeatherLoader(true);

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${String(
          lat,
        )}&longitude=${String(lon)}&current_weather=true`,
      );
      const data = await response.json();
      // return data;
      setWeatherLoader(false);
      setWeatherData(data);
      dispatch(setCelcius({ celcius: data }));
      console.log(data.current_weather_units.temperature, 'weather');
    } catch (error) {
      setWeatherLoader(false);

      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getauthservice();
      getBookService();
      getBannerImg();
    }, []),
  );
  const getauthservice = async () => {
    try {
      setLoading(true);
      const res = await getAuthpatner();
      setAuthpartner(res?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getBookService = async () => {
    try {
      setLoading(true);
      const res = await getServiceList();
      setBookServices(res?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //  booking navigation
  const screens = {
    STERILIZATION: 'GasChargeScreen',
    REPAIR: 'GasChargeScreen',
    INSTALLATION: 'GasChargeScreen',
    COMPRESSOR: 'GasChargeScreen',
    COMMERCIAL_AC: 'CommericalAc',
    GAS_CHARGING: 'GasChargeScreen',
    OTHER: 'OtherScreen',
  };
  const handleServiceNavigation = service => {
    const screen = screens[service?.key];
    if (screen) {
      navigation.navigate(screen, {
        screenName: service.name,
        serviceId: service._id,
        source: 'HOME',
      });
    } else {
      console.log('Screen not found for:', service?.key);
    }
  };

  const getBannerImg = async () => {
    try {
      // setLoading(true);
      const res = await getBanner();
      setBannerImages(res?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(true);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: dynamicStyles.safeArea.backgroundColor },
      ]}
    >
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={'#F4F8FE'}
        translucent={true}
      />
      <OnTopScreen>
        {/* Header with Location Icon and Add Location Text */}
        <View style={styles.header}>
          <Text style={styles.locationtitle}>Location</Text>
          <View style={styles.addressRow}>
            {Loader ? (
              <>
                <CustomLoader size={20} />
              </>
            ) : (
              <View style={styles.locationContainer}>
                <Image
                  source={images.homeLocation}
                  style={styles.locationIcon}
                  resizeMode="contain"
                />
                <Text style={styles.locationText}>
                  {`${addresslocation.house}  ${addresslocation.road}, ${addresslocation.city}` ||
                    'Select Location'}
                </Text>
              </View>
            )}

            <View style={styles.wheatherContainer}>
              <Image
                source={images.wheatherIcon}
                style={styles.locationIcon}
                resizeMode="contain"
              />
              {WeatherLoader ? (
                <>
                  <CustomLoader size={20} />
                </>
              ) : (
                <Text
                  style={styles.locationText}
                >{`${WeatherData?.current_weather?.temperature} ${WeatherData?.current_weather_units?.temperature}`}</Text>
              )}
            </View>
          </View>
        </View>

        {/* Banner Image */}
        {loading ? <CustomLoader /> : <CustomSlider images={bannerImages} />}

        {/* Book a service */}
        <View style={styles.reqcontainer}>
          <Text style={styles.reqtitle}>Book a Services</Text>
          {loading ? (
            <CustomLoader size={40} />
          ) : (
            <View style={styles.reqgrid}>
              {bookServices.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.bookcard}
                  onPress={() => handleServiceNavigation(item)}
                >
                  <FastImage
                    source={{ uri: item.icon }}
                    style={styles.reqicon}
                  />
                  <Text style={styles.reqlabel}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Request a Quote */}
        <View style={styles.reqcontainer}>
          <Text style={styles.reqtitle}>Request a Quote</Text>
          <View style={styles.reqgrid}>
            {requestQuote.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.reqoption}
                onPress={item.action}
              >
                <FastImage source={item.icon} style={styles.reqicon} />
                <Text style={styles.reqlabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <LinearGradient
          colors={['#ecd5d0ff', '#ede3dbff', '#b9d4e7ff']}
          style={styles.uticontainer}
        >
          <Text style={[styles.utititle, { marginTop: hp(1) }]}>Utilities</Text>
          <View style={styles.utigrid}>
            {utilities.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.utioption}
                onPress={item.action}
              >
                <FastImage source={item.icon} style={styles.utiicon} />
                <Text style={styles.utilabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </LinearGradient>
        <View style={styles.reqcontainer}>
          <Text style={styles.reqtitle}>Authorized Service Partner</Text>
          {loading ? (
            <CustomLoader size={20} />
          ) : (
            <FlatList
              data={pages}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => `page-${index}`}
              renderItem={({ item: page }) => (
                <View style={styles.authgrid}>
                  {[0, 1, 2].map(row => (
                    <View
                      key={row}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginVertical: 3,
                      }}
                    >
                      {page.slice(row * 3, row * 3 + 3).map((item, idx) => (
                        <View key={idx} style={styles.authoption}>
                          <FastImage
                            source={{ uri: item.logo }} // <-- FIX
                            style={styles.authicon}
                            resizeMode={FastImage.resizeMode.contain}
                          />
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              )}
            />
          )}
        </View>

        <View style={[styles.uticontainer, { padding: wp('0%') }]}>
          <Text
            style={[
              styles.reqtitle,
              { marginLeft: hp('1.5%') },
              dynamicStyles.title,
            ]}
          >
            Feature Product
          </Text>
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
                    <FastImage
                      source={images.dislike}
                      style={styles.likeButton}
                    />
                  </View>
                  <Image
                    source={item.image}
                    style={styles.image}
                    // resizeMode="contain"
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.dealRow}>
                  <View style={styles.dealTag}>
                    <Text style={styles.dealText}>Limited time deal</Text>
                  </View>
                  <Text style={styles.rating}>⭐ {item.rating}</Text>
                </View>
                <Text style={styles.name} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.price}>{item.price}</Text>
                <View style={styles.bottomRow}>
                  <Text style={styles.mrp}>
                    MRP{' '}
                    <Text
                      style={[
                        styles.mrp,
                        { textDecorationLine: 'line-through' },
                      ]}
                    >
                      {item.mrp}
                    </Text>
                  </Text>
                  <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>

        {/* who trust Us */}
        <View style={styles.uticontainer}>
          <Text style={[styles.utititle, dynamicStyles.title]}>
            Who Trust Us
          </Text>
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
                <Text style={styles.testimonialText} numberOfLines={4}>
                  {item.text}
                </Text>
                <Text style={styles.testalocation}>{item.location}</Text>
                <Text style={styles.testauthor}>{item.author}</Text>
              </View>
            )}
          />
        </View>

        {/* Impact on Society */}
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
          <Text style={[styles.utititle, dynamicStyles.title]}>
            Service Guarantee
          </Text>
          <View
            style={[
              styles.sergrid,
              { marginBottom: hp(Platform.OS === 'android' ? '7%' : '2%') },
            ]}
          >
            <TouchableOpacity style={styles.serstatCard} activeOpacity={0.8}>
              <Image
                source={images.remoteIcon}
                style={[styles.sericon, dynamicStyles.extraIcon]}
              />
              <View>
                <Text style={[styles.serstatTitle, dynamicStyles.title]}>
                  Rework Assurance
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serstatCard} activeOpacity={0.8}>
              <Image
                source={images.satisfactIcon}
                style={[styles.sericon, dynamicStyles.extraIcon]}
              />
              <View>
                <Text style={[styles.serstatTitle, dynamicStyles.title]}>
                  100% Satisfaction
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serstatCard} activeOpacity={0.8}>
              <Image
                source={images.certifiedIcon}
                style={[styles.sericon, dynamicStyles.extraIcon]}
              />
              <View>
                <Text style={[styles.serstatTitle, dynamicStyles.title]}>
                  Certified Engineers
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serstatCard} activeOpacity={0.8}>
              <Image
                source={images.copyRightIcon}
                style={[styles.sericon, dynamicStyles.extraIcon]}
              />
              <View>
                <Text style={[styles.serstatTitle, dynamicStyles.title]}>
                  Copyright 2023
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* </ScrollView>
         */}
      </OnTopScreen>
    </SafeAreaView>
  );
};

export default HomeScreen;
