import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,Alert, PermissionsAndroid, Platform 
} from 'react-native';
import Commonstyles, {
  productData,
  testimonialData,
  WindoData,
} from '../Home/HomeScreenStyles';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomSlider from '../../components/CustomSlider';
import { COLORS, Fonts } from '../../utils/colors';
import RNFetchBlob from 'rn-fetch-blob';

const ProductDetailScreen = ({ navigation, route }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [likeStatus, setLikeStatus] = useState(false);
  const [compareStatus, setCompareStatus] = useState(false);
  const [listLike, setListLike] = useState({});
  const { productId, product, productScreenName } = route.params;
  const bannerImages = [images.shopFrame, images.acPoster, images.shopFrame];

  const products = [
    {
      id: '1',
      title:
        'Godrej 1.5 Ton 3 Star Inverter Split AC (Copper, 5-in-1 Convertible, 2023 Model)',
      price: 41990,
      mrp: 65900,
      discount: '36% off',
      image: images.demoAc,
      limitedDeal: true,
    },
    {
      id: '2',
      title:
        'Godrej 1.5 Ton 3 Star Inverter Split AC (Copper, 5-in-1 Convertible, 2023 Model)',
      price: 41990,
      mrp: 65900,
      discount: '36% off',
      image: images.demoAc,
      limitedDeal: true,
    },
  ];

  // FAQ'S Toggle
  const toggleExpand = index => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  // list like or dislike
  const toggleLike = itemId => {
    setListLike(prev => ({
      ...prev,
      [itemId]: !prev[itemId], // Toggle
    }));
  };

  const isLiked = itemId => !!listLike[itemId];

  const ProductCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <FastImage
          source={item.image}
          style={styles.image}
          resizeMode={FastImage.resizeMode.contain}
        />

        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>

        {item.limitedDeal && (
          <View style={styles.dealBadge}>
            <Text style={styles.dealText}>Limited time deal</Text>
          </View>
        )}

        <Text style={styles.price}>
          ₹{item.price.toLocaleString('en-IN')}.00
        </Text>

        <View style={styles.mrpRow}>
          <Text style={styles.mrp}>M.R.P </Text>
          <Text style={styles.mrpPrice}>
            ₹{item.mrp.toLocaleString('en-IN')}
          </Text>
        </View>

        <View style={styles.discountRow}>
          <Text style={styles.discount}>{item.discount}</Text>
          <TouchableOpacity
            style={styles.heartButton}
            onPress={() => toggleLike(item.id)}
          >
            <FastImage
              source={isLiked(item.id) ? images.redHeart : images.heart}
              style={[Commonstyles.locationIcon]}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    );
  };

// 1️⃣ Permission request function
async function requestStoragePermission() {
  if (Platform.OS === 'android') {
    if (Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
         {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage to download the brochure.',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  }
  return true;
}

 const downloadBrochure = async (pdfUrl, fileName = 'AC_Brochure.pdf') => {
  const hasPermission = await requestStoragePermission();
  if (!hasPermission) {
    Alert.alert('Permission Denied', 'Cannot download without storage access.');
    return;
  }

  const { fs } = RNFetchBlob;
  const dirToSave = Platform.OS === 'android' ? fs.dirs.DownloadDir : fs.dirs.DocumentDir;
  const path = `${dirToSave}/${fileName}`;

  RNFetchBlob.config({
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path,
      description: 'Downloading brochure...',
      title: fileName,
      mime: 'application/pdf',
      mediaScannable: true,
    },
  })
    .fetch('GET', pdfUrl)
    .then(res => {
      console.log('File downloaded to:', res.path());
      Alert.alert('Download Complete', 'File saved in your Downloads folder.');
    })
    .catch(error => {
      console.log('Download error:', error);
      Alert.alert('Error', 'Download failed. Please try again.');
    });
};

  return (
    <SafeAreaView style={Commonstyles.safeArea}>
      {/* Header with Location Icon and Add Location Text */}
      <View style={Commonstyles.header}>
        <View style={Commonstyles.addressRow}>
          <TouchableOpacity
            style={Commonstyles.locationContainer}
            onPress={() => navigation.goBack()}
          >
            <FastImage
              source={images.backArrow}
              style={Commonstyles.locationIcon}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={Commonstyles.headText}>{productScreenName}</Text>
          </TouchableOpacity>
          <View style={[Commonstyles.reqgrid]}>
            <TouchableOpacity>
              <FastImage
                source={images.heart}
                style={[Commonstyles.locationIcon, { marginHorizontal: wp(2) }]}
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={Commonstyles.container}
        contentContainerStyle={{ paddingHorizontal: wp('2.5%') }}
      >
        <View
          style={[
            Commonstyles.allSideRadiusStyle,
            { paddingRight: wp(3), paddingHorizontal: 0 },
          ]}
        >
          <CustomSlider images={bannerImages} />
        </View>

        {/* WindFree Inverter  */}
        <View style={[Commonstyles.oneWidthRow, { width: wp(85) }]}>
          <Text style={Commonstyles.mediumText}>
            WindFree Inverter Split AC AR18CY5APWK, 5.00kw (1.5T) 5 Star
          </Text>
          <TouchableOpacity onPress={() => setLikeStatus(!likeStatus)}>
            <FastImage
              source={likeStatus ? images.redHeart : images.heart}
              style={[Commonstyles.locationIcon, { marginHorizontal: wp(2) }]}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        </View>

        {/* of-24%f */}
        <View style={[Commonstyles.oneWidthRow]}>
          <Text style={Commonstyles.bigMediumText}>
            ₹32,290.00{' '}
            <Text
              style={[Commonstyles.locationText, { color: COLORS.darkgreen }]}
            >
              -24% off
            </Text>
          </Text>
        </View>

        {/* ★★★★ compare */}
        <View style={[Commonstyles.oneWidthRow]}>
          <Text style={[Commonstyles.mediumText, { color: COLORS.yellow }]}>
            ★★★★ <Text style={[Commonstyles.accountNumber]}>(4.00)</Text>
          </Text>
          <TouchableOpacity
            style={Commonstyles.locationContainer}
            onPress={() => {
              setCompareStatus(!compareStatus),
                navigation.navigate('CompareACScreen');
            }}
          >
            <FastImage
              source={compareStatus ? images.check : images.uncheck}
              style={[Commonstyles.locationIcon, { marginHorizontal: wp(2) }]}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={[Commonstyles.locationText]}>Compare</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={{ marginTop: wp(3) }}>
          <Text style={[Commonstyles.locationText, { color: COLORS.black }]}>
            Description
          </Text>
          <Text style={[Commonstyles.accountNumber, { marginVertical: wp(3) }]}>
            Lorem ipsum dolor sit amet consectetur. Mauris justo bibendum
            consequat mauris. Sed elit a condimentum massa non sem elementum. Et
            sed amet malesuada semper integer mauris.
          </Text>
        </View>

        {/* Service Guarantee */}
        <View style={[Commonstyles.allSideRadiusStyle]}>
          <Text style={Commonstyles.mediumText}>Service Guarantee</Text>
          {/* Services and View Cart Section */}
          <View style={Commonstyles.oneWidthRow}>
            <Text
              style={[Commonstyles.locationText, { color: COLORS.textHeading }]}
            >
              Brand
            </Text>
            <Text style={Commonstyles.locationText}>Voltas</Text>
          </View>
          <View style={Commonstyles.bottomLine} />
          <View style={Commonstyles.sergrid}>
            <Text
              style={[Commonstyles.locationText, { color: COLORS.textHeading }]}
            >
              Capacity
            </Text>
            <Text style={Commonstyles.locationText}>2 Tons</Text>
          </View>
          <View style={Commonstyles.bottomLine} />
          <View style={Commonstyles.sergrid}>
            <Text
              style={[Commonstyles.locationText, { color: COLORS.textHeading }]}
            >
              Cooling Power
            </Text>
            <Text style={Commonstyles.locationText}>3200 Watts</Text>
          </View>
          <View style={Commonstyles.bottomLine} />
          <View style={Commonstyles.sergrid}>
            <Text
              style={[Commonstyles.locationText, { color: COLORS.textHeading }]}
            >
              Special Feature
            </Text>
            <Text style={Commonstyles.locationText}>
              Antibacterial Coaring, {'\n'}
              Dehumidifier
            </Text>
          </View>
          <View style={Commonstyles.bottomLine} />
          <View style={Commonstyles.sergrid}>
            <Text
              style={[Commonstyles.locationText, { color: COLORS.textHeading }]}
            >
              Colour
            </Text>
            <Text style={Commonstyles.locationText}>White</Text>
          </View>
          <View style={Commonstyles.bottomLine} />
          <View style={Commonstyles.sergrid}>
            <Text
              style={[Commonstyles.locationText, { color: COLORS.textHeading }]}
            >
              Voltage
            </Text>
            <Text style={Commonstyles.locationText}>230 Volts</Text>
          </View>
          <View style={Commonstyles.bottomLine} />
          <View style={Commonstyles.sergrid}>
            <Text
              style={[Commonstyles.locationText, { color: COLORS.textHeading }]}
            >
              Product Dimensions
            </Text>
            <Text style={Commonstyles.locationText}>
              84D x 84D x 23H{'\n'}
              Centimeters
            </Text>
          </View>
          <View style={Commonstyles.bottomLine} />
          <View style={Commonstyles.sergrid}>
            <Text
              style={[Commonstyles.locationText, { color: COLORS.textHeading }]}
            >
              Noise Level
            </Text>
            <Text style={Commonstyles.locationText}>44 dB</Text>
          </View>
          <View style={Commonstyles.bottomLine} />
          <View style={Commonstyles.sergrid}>
            <Text
              style={[Commonstyles.locationText, { color: COLORS.textHeading }]}
            >
              Floor Area
            </Text>
            <Text style={Commonstyles.locationText}>180 Square Feet</Text>
          </View>
          <View style={Commonstyles.bottomLine} />
          <View style={Commonstyles.sergrid}>
            <Text
              style={[Commonstyles.locationText, { color: COLORS.textHeading }]}
            >
              Power Source
            </Text>
            <Text style={Commonstyles.locationText}>Corded Electric</Text>
          </View>
        </View>

        {/* Dowbload btn */}
        <TouchableOpacity
          style={[
            Commonstyles.boderwhiteButton,
            {
              marginVertical: hp(2),
              paddingVertical: hp(1.5),
              borderColor: COLORS.themeColor,
            },
          ]}
          onPress={() =>
            downloadBrochure(
              'https://www.samsung.com/in/pdf/air-conditioners/WindFree_AC_Brochure.pdf',
              'Samsung_WindFree_AC.pdf',
            )
          }
        >
          <Text
            style={[Commonstyles.accountBlueText, { fontSize: hp('1.7%') }]}
          >
            Download Brochure
          </Text>
        </TouchableOpacity>


        {/* freeDelivery */}
        <View style={[Commonstyles.allSideRadiusStyle, { marginBottom: hp(2) }]}>
          <View
            style={Commonstyles.sergrid}>
            <TouchableOpacity
              style={Commonstyles.serstatCard}
              activeOpacity={0.8}
            >
              <Image
                source={images.delivery_truck}
                style={Commonstyles.sericon}
              />
              <View>
                <Text
                  style={[
                    Commonstyles.serstatTitle,
                    { color: COLORS.themeColor },
                  ]}
                >
                  Free Delivery
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={Commonstyles.serstatCard}
              activeOpacity={0.8}
            >
              <Image source={images.replacement} style={Commonstyles.sericon} />
              <View>
                <Text
                  style={[
                    Commonstyles.serstatTitle,
                    { color: COLORS.themeColor },
                  ]}
                >
                  10 days Replacement
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={Commonstyles.serstatCard}
              activeOpacity={0.8}
            >
              <Image
                source={images.customer_support}
                style={Commonstyles.sericon}
              />
              <View>
                <Text
                  style={[
                    Commonstyles.serstatTitle,
                    { color: COLORS.themeColor },
                  ]}
                >
                  Service Available
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={Commonstyles.serstatCard}
              activeOpacity={0.8}
            >
              <Image source={images.waranty} style={Commonstyles.sericon} />
              <View>
                <Text
                  style={[
                    Commonstyles.serstatTitle,
                    { color: COLORS.themeColor },
                  ]}
                >
                  1 Year Warranty
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Manufactor Items */}
        <>
          {WindoData.map((item, index) => (
            <View key={index} style={Commonstyles.faqItem}>
              <TouchableOpacity
                onPress={() => toggleExpand(index)}
                style={Commonstyles.faquestionContainer}
              >
                <Text style={Commonstyles.faquestionText}>{item.question}</Text>
                <Text style={Commonstyles.faqarrow}>
                  {expandedIndex === index ? '﹀' : '>'}
                </Text>
              </TouchableOpacity>

              {expandedIndex === index && (
                <View style={{ paddingHorizontal: hp(1.5) }}>
                  <View style={[Commonstyles.sergrid]}>
                    <Text
                      style={[
                        Commonstyles.locationText,
                        { color: COLORS.textHeading },
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text style={Commonstyles.locationText}>{item.text}</Text>
                  </View>
                  <View style={Commonstyles.bottomLine} />
                  <View style={[Commonstyles.sergrid]}>
                    <Text
                      style={[
                        Commonstyles.locationText,
                        { color: COLORS.textHeading },
                      ]}
                    >
                      Capacity
                    </Text>
                    <Text style={Commonstyles.locationText}>
                      {item.capacity}
                    </Text>
                  </View>
                  <View style={Commonstyles.bottomLine} />
                  <View style={[Commonstyles.sergrid]}>
                    <Text
                      style={[
                        Commonstyles.locationText,
                        { color: COLORS.textHeading },
                      ]}
                    >
                      Cooling Power
                    </Text>
                    <Text style={Commonstyles.locationText}>
                      {item.cooling}
                    </Text>
                  </View>
                  <View style={Commonstyles.bottomLine} />
                  <View style={[Commonstyles.sergrid]}>
                    <Text
                      style={[
                        Commonstyles.locationText,
                        { color: COLORS.textHeading },
                      ]}
                    >
                      Special Feature
                    </Text>
                    <Text style={Commonstyles.locationText}>
                      {item.feature}
                    </Text>
                  </View>
                  <View style={Commonstyles.bottomLine} />
                  <View style={[Commonstyles.sergrid]}>
                    <Text
                      style={[
                        Commonstyles.locationText,
                        { color: COLORS.textHeading },
                      ]}
                    >
                      Colour
                    </Text>
                    <Text style={Commonstyles.locationText}>{item.colour}</Text>
                  </View>
                  <View style={Commonstyles.bottomLine} />
                  <View style={[Commonstyles.sergrid]}>
                    <Text
                      style={[
                        Commonstyles.locationText,
                        { color: COLORS.textHeading },
                      ]}
                    >
                      Voltage
                    </Text>
                    <Text style={Commonstyles.locationText}>
                      {item.voltage}
                    </Text>
                  </View>
                  <View style={Commonstyles.bottomLine} />
                  <View style={[Commonstyles.sergrid]}>
                    <Text
                      style={[
                        Commonstyles.locationText,
                        { color: COLORS.textHeading },
                      ]}
                    >
                      Product Dimensions
                    </Text>
                    <Text style={Commonstyles.locationText}>
                      {item.product}
                    </Text>
                  </View>
                  <View style={Commonstyles.bottomLine} />
                  <View style={[Commonstyles.sergrid]}>
                    <Text
                      style={[
                        Commonstyles.locationText,
                        { color: COLORS.textHeading },
                      ]}
                    >
                      Noise Level
                    </Text>
                    <Text style={Commonstyles.locationText}>{item.noise}</Text>
                  </View>
                  <View style={Commonstyles.bottomLine} />
                  <View style={[Commonstyles.sergrid]}>
                    <Text
                      style={[
                        Commonstyles.locationText,
                        { color: COLORS.textHeading },
                      ]}
                    >
                      Floor Area
                    </Text>
                    <Text style={Commonstyles.locationText}>{item.floor}</Text>
                  </View>
                  <View style={Commonstyles.bottomLine} />
                  <View
                    style={[Commonstyles.sergrid, { paddingBottom: hp(2) }]}
                  >
                    <Text
                      style={[
                        Commonstyles.locationText,
                        { color: COLORS.textHeading },
                      ]}
                    >
                      Power Source
                    </Text>
                    <Text style={Commonstyles.locationText}>{item.power}</Text>
                  </View>
                </View>
              )}
            </View>
          ))}
        </>

        {/* you Might Also Like*/}
        <Text style={[Commonstyles.mediumText, { marginVertical: hp(1.5) }]}>
          You Might Also Like
        </Text>
        <View style={styles.container}>
          <FlatList
            data={products}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ProductCard item={item} />}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </ScrollView>

      <View style={[Commonstyles.servicesSection,{flexDirection:'row',justifyContent:'space-between'}]}>
        <TouchableOpacity
          style={[Commonstyles.boderwhiteButton, { width: wp(43) }]}
        >
          <Image
            source={images.heart}
            style={[Commonstyles.carticon, { marginHorizontal: wp(2) }]}
          />
          <Text style={Commonstyles.locationText}>WishList</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Commonstyles.serviceCartButton}
          onPress={() => navigation.navigate('OrderSummaryScreen')}
        >
          <Image
            source={images.cart}
            style={[Commonstyles.carticon, { marginHorizontal: wp(2) }]}
          />
          <Text style={[Commonstyles.locationText, { color: COLORS.white }]}>
            Buy Now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  listContent: {
    marginBottom: hp(15),
  },
  card: {
    width: wp('45%'),
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: hp(1.4),
    fontFamily: Fonts.medium,
    color: '#333',
    marginBottom: 6,
    lineHeight: 18,
  },
  dealBadge: {
    backgroundColor: '#ffebee',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 6,
  },
  dealText: {
    fontSize: 11,
    color: COLORS.black,
    fontFamily: Fonts.medium,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 2,
  },
  mrpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  mrp: {
    fontSize: 12,
    color: '#666',
  },
  mrpPrice: {
    fontSize: 12,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  discount: {
    fontSize: 14,
    color: COLORS.green,
    fontFamily: Fonts.semiBold,
  },
  heartButton: {
    padding: 4,
  },
  heart: {
    fontSize: 20,
  },
  addButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.themeColor,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  addText: {
    color: COLORS.themeColor,
    fontFamily: Fonts.medium,
    fontSize: 14,
  },
});
