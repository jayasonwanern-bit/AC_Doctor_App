import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import { COLORS, Fonts } from '../../utils/colors';
import CustomSlider from '../../components/CustomSlider';
import LinearGradient from 'react-native-linear-gradient';
import styles, { productData, testimonialData } from './HomeScreenStyles';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'; // Use SafeAreaView instead of SafeAreaProvider
import { getAuthpatner, getServiceList, getBanner, getFeaturedProducts } from '../../api/homeApi';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import GetLoaction from '../../components/GetLoaction';
import { useDispatch, useSelector } from 'react-redux';
import { dispatch, store } from '../../redux/store';
import { setAddress, setCelcius } from '../../redux/slices/authSlice';
import OnTopScreen from '../../components/OnTopScreen';
import CustomLoader from '../../components/CustomLoader';
import { isTablet } from '../../components/TabletResponsiveSize';


const HomeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const serviceDetails = useSelector(state => state.cart.items);
  const [productData, setProductData] = useState([]);   // ✅
  const [allProducts, setAllProducts] = useState([]);
  const {
    latitude,
    longitude,
    addressText,
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
    {
      label: 'Sell Old AC',
      icon: images.sellAcIcon,
      // action: handleSellOldAC
    },
    {
      label: 'AMC',
      icon: images.AMCicon,
      action: handleAMC,
    },
    {
      label: 'Free Consultancy',
      icon: images.consultancyIcon,
      action: handleFreeConsult,
    },
    {
      label: 'Copper Pipe',
      icon: images.copperIcon,
      // action: handleCopperPipe
    },
  ];

  const utilities = [
    {
      label: 'Tonnage Calculator',
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
      // action: handleProComparison,
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
      setAddressTextLocation(locationData.address.fullAddress);
      dispatch(setAddress({ address: locationData.address }));
      getWeather(locationData.latitude, locationData.longitude);
      return;
    }

    // ✅ CASE 2: Address coming from navigation params
    if (route?.params?.selectedAddress) {
      const addr = route.params.selectedAddress;

      console.log('Address', JSON.stringify(addr));
      setLoader(false);
      setAddressTextLocation(addr.address); // string
      dispatch(setAddress({ address: addr.address }));
      // getWeather(addr.latitude, addr.longitude);
      return;
    }

    // ✅ CASE 3: No address → fetch current location
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
      fetchFeaturedProducts();
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


  const fetchFeaturedProducts = async () => {
    try {
      const res = await getFeaturedProducts(1, 20);

      const mapped = res.data.map(item => ({
        id: item._id,              // 👈 REAL BACKEND ID
        name: item.name,
        image: { uri: item.image },
        mrp: `₹ ${item.mrp}`,
        price: `₹ ${item.customerPrice}`,
        discount: item.discountedPercentage
          ? `${item.discountedPercentage}% off`
          : 'Hot Deal',
        rating: item.rating || '4.0',
        reviews: item.offerLabel || 'Limited time deal',
      }));
      setAllProducts(mapped);
      setProductData(mapped.slice(0, 10));
    } catch (e) {
      console.log('fetchFeaturedProducts error', e);
    }
  };


  // show view all text after 10 item list of product
  const listData =
    allProducts.length > 10
      ? [...productData, { id: 'VIEW_ALL' }]
      : productData;

  //  booking navigation
  const screens = {
    STERILIZATION: 'GasChargeScreen',
    REPAIR: 'GasChargeScreen',
    INSTALLATION: 'GasChargeScreen',
    COMPRESSOR: 'GasChargeScreen',
    GAS_CHARGING: 'GasChargeScreen',
    OTHER: 'OtherScreen',
  };
  const handleServiceNavigation = service => {
    const screen = screens[service?.key];
    if (service.name === 'Other') {
      navigation.navigate('OtherScreen', {
        serviceId: service._id,
        serviceKey: service.key,
      });
    }
    else {
      navigation.navigate('GasChargeScreen', {
        screenName: service.name,
        serviceId: service?._id,
        source: 'HOME',
      });
    }
  };

  // getBanner list
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
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!pages?.[0]?.length) return;

    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;

      if (nextIndex >= pages[0].length) {
        nextIndex = 0; // 다시 처음으로
      }

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, 2500); // ⏱ scroll time (ms)

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: dynamicStyles.safeArea.backgroundColor },
      ]}
      edges={['top', 'left', 'right']}
    >
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        translucent={true}
      />
      {serviceDetails.length === 0 ? (
        <></>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate("ViewCart")} style={styles.cartViewIcon}>

          <Text style={styles.TotalcoutnCart}>{serviceDetails.length}</Text>
          <Image source={images.cart} style={{ width: wp(7), height: wp(7) }} resizeMode='contain' />
        </TouchableOpacity>
      )

      }

      <OnTopScreen>
        {/* Header with Location Icon and Add Location Text */}
        <View style={styles.header}>
          <Text style={styles.locationtitle}>Location</Text>
          <View style={styles.addressRow}>
            {Loader ? (
              <>
                <CustomLoader size="small" />
              </>
            ) : (
              <View style={styles.locationContainer}>
                <Image
                  source={images.homeLocation}
                  style={styles.locationIcon}
                  resizeMode="contain"
                />
                <Text style={styles.locationText} numberOfLines={1}>
                  {addresslocation ? `${addresslocation?.house}  ${addresslocation?.road} ${addresslocation?.city}` :
                    'Select Location'
                  }
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
                  <CustomLoader size="small" />
                  <Text
                    style={styles.locationText}
                  >Loading...</Text>
                </>
              ) : (
                <Text
                  style={styles.locationText}
                >{WeatherData ? `${WeatherData?.current_weather?.temperature} ${WeatherData?.current_weather_units?.temperature}` :
                  'Loading...'}</Text>
              )}
            </View>
          </View>
        </View>
        {/* Banner Image */}
        <View style={{ height: isTablet ? hp(30) : hp(18) }}>
          {loading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <CustomLoader size="large" />
            </View>
          ) : (
            <CustomSlider images={bannerImages} />
          )}
        </View>



        {/* Book a service */}
        <View style={[styles.reqcontainer, { height: isTablet ? hp(33) : hp(28) }]}>
          <Text style={styles.reqtitle}>Book AC Services</Text>

          <View style={{ flex: 1 }}>
            {loading ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <CustomLoader size="large" />
              </View>
            ) : (
              <View style={styles.reqgrid}>
                {bookServices
                  .filter(item => !['COPPER_PIPING', 'AMC', 'COMMERCIAL_AC'].includes(item.key))
                  .map((item, index) => (
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
                style={[styles.utilityView]}
                onPress={item.action}
              >
                <FastImage source={item.icon} style={styles.utiicon} />
                <Text style={styles.utilabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </LinearGradient>

        {/* OEM Partner */}
        <View style={[styles.reqcontainer, { height: isTablet ? hp(30) : hp(13) }]}>
          <Text style={styles.reqtitle}>OEM Partner</Text>
          {loading ? (
            <CustomLoader size="large" />
          ) : (
            <FlatList
              ref={flatListRef}
              data={pages?.[0]}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => `page-${index}`}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item?.logo }}
                  style={styles.authicon}
                  resizeMode="contain"
                />
              )}
              getItemLayout={(data, index) => ({
                length: 100, // ⚠️ image width
                offset: 100 * index,
                index,
              })}
            />
          )}
        </View>

        {/* Feature Product */}
        <View style={[styles.uticontainer, { padding: wp('0%') }]}>
          <View style={styles.topRow}>
            <Text
              style={[
                styles.reqtitle,
                { marginLeft: hp('1.5%') },
                dynamicStyles.title,
              ]}
            >
              Feature Product
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('FeaturedProductsScreen')}
            >
              <Text
                style={[
                  styles.accountBlueText,
                  { marginRight: hp('1.5%'), fontSize: hp('1.6%'), },
                ]}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>
          {listData && listData.length > 0 ? (<FlatList
            data={listData}
            horizontal
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              if (item.id === 'VIEW_ALL') {
                return (
                  <TouchableOpacity
                    style={{ alignSelf: 'center' }}
                    onPress={() =>
                      navigation.navigate('FeaturedProductsScreen')
                    }
                  >
                    <Text style={[styles.accountBlueText, { textDecorationLine: 'underline', textDecorationStyle: 'solid', textDecorationColor: COLORS.themeColor }]}>View All</Text>
                  </TouchableOpacity>
                );
              }
              return (<View style={styles.productCard}>
                <View style={[styles.boderinercard, { height: hp('15%') }]}>
                  <View style={styles.topRow}>
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>{item.discount}</Text>
                    </View>

                    {/* <Image
                      source={images.dislike}
                      style={styles.likeButton}
                    /> */}
                  </View>

                  <Image source={item?.image} style={[styles.image, { height: '80%' }]} resizeMode='contain' />
                </View>

                <View style={styles.dealRow}>
                  <View style={styles.dealTag}>
                    <Text style={styles.dealText}>{item?.reviews}</Text>
                  </View>
                  {/* <StarRating
                    maxStars={5}
                    starSize={18}
                    rating={item.rating}
                  /> */}
                </View>

                <Text style={styles.name} numberOfLines={1}>
                  {item.name}
                </Text>



                <View style={styles.bottomRow}>
                  <Text style={styles.price}>{item.price} {'  '}</Text>

                  <Text style={[styles.mrp, { textDecorationLine: 'line-through' }]}>
                    {item.mrp}
                  </Text>

                </View>
                <TouchableOpacity
                  style={styles.productView}
                  onPress={() =>
                    navigation.navigate('ProductDetails', {
                      productId: item.id,
                    })
                  }
                >
                  <Text
                    style={styles.interestText}
                  >
                    View Details
                  </Text>
                </TouchableOpacity>

              </View>)
            }}
          />) : (
            // 👇 Empty cart / no data UI
            <View
              style={styles.emptyCard}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: '#888',
                  fontFamily: Fonts.medium,
                }}
              >
                No featured ACs right now 😕 {'\n'}
                Cool deals coming soon! ❄️
              </Text>
            </View>)}

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
      </OnTopScreen>
      {/* </ScrollView> */}


    </SafeAreaView>
  );
};

export default HomeScreen;


