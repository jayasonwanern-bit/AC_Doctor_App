import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import Header from '../../components/Header';
import Commonstyles from '../Home/HomeScreenStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import images from '../../assets/images';
import { COLORS, Fonts } from '../../utils/colors';
import FastImage from 'react-native-fast-image';

const OrderSummaryScreen = ({ navigation }) => {
  const [listLike, setListLike] = useState({});
  const [count, setCount] = useState(1);

  const decrease = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
    }
  };

  const increase = () => {
    const newCount = count + 1;
    setCount(newCount);
  };
  
  // list like or dislike
  const toggleLike = itemId => {
    setListLike(prev => ({
      ...prev,
      [itemId]: !prev[itemId], // Toggle
    }));
  };

  const isLiked = itemId => !!listLike[itemId];

  const products = [
    {
      id: '1',
      title:
        'Godrej 1.5 Ton 3 Star Inverter Split AC (Copper, 5-in-1 Convertible, 2023 Model)',
      price: 41990,
      mrp: 65900,
      discount: '36% off',
      image: images.ACimage,
      limitedDeal: true,
    },
    {
      id: '2',
      title:
        'Godrej 1.5 Ton 3 Star Inverter Split AC (Copper, 5-in-1 Convertible, 2023 Model)',
      price: 41990,
      mrp: 65900,
      discount: '36% off',
      image: images.ACimage,
      limitedDeal: true,
    },
  ];


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
  // render
  return (
    <View style={Commonstyles.container}>
      <Header title={'Order Summary'} onBack={() => navigation.goBack()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={Commonstyles.container}
        contentContainerStyle={{ paddingHorizontal: wp('2.5%') }}
      >
        <View style={[Commonstyles.allSideRadiusStyle]}>
          <View style={Commonstyles.faquestionContainer}>
            <View>
              <Image source={images.acFrame} style={styles.cardimage} />
            </View>
            <View style={{ width: wp(55) }}>
              <Text
                style={[
                  Commonstyles.locationtitle,
                  { color: COLORS.black, lineHeight: 23 },
                ]}
              >
                WindFree Inverter Split AC AR18CY5APWK, 5.00kw (1.5T) 5 Star
              </Text>
            </View>
          </View>
          <View style={Commonstyles.faquestionContainer}>
            <Text style={Commonstyles.mediumText}>
              ₹32,290.00{'  '}
              <Text
                style={[
                  Commonstyles.locationText,
                  { textDecorationLine: 'line-through', color: '#666' },
                ]}
              >
                ₹63,900.00
              </Text>
            </Text>
            <View style={styles.addContainer}>
              <TouchableOpacity onPress={decrease}>
                <Text style={[Commonstyles.locationText]}> - </Text>
              </TouchableOpacity>
              <Text style={[Commonstyles.locationText]}>{count}</Text>
              <TouchableOpacity onPress={increase}>
                <Text style={[Commonstyles.locationText]}> + </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Frequently added together */}
        <Text style={[Commonstyles.mediumText, { marginVertical: hp(1.5) }]}>
          Frequently added together
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

        {/* Payment Summary */}
        <View style={[Commonstyles.allSideRadiusStyle, { borderRadius: 0 }]}>
          <Text style={Commonstyles.mediumText}>Payment Summary</Text>
          <View style={[Commonstyles.addressRow, { marginVertical: wp(1.5) }]}>
            <Text style={styles.title}>Item total</Text>
            <Text style={styles.title}>36,000</Text>
          </View>
          <View style={[Commonstyles.addressRow]}>
            <Text style={styles.title}>Item discount</Text>
            <Text style={styles.title}>300</Text>
          </View>
          <View style={[Commonstyles.addressRow, { marginVertical: wp(1) }]}>
            <Text style={styles.title}>Taxes and fee</Text>
            <Text style={styles.title}>100</Text>
          </View>
          <View style={Commonstyles.bottomLine} />
          <View style={[Commonstyles.addressRow]}>
            <Text
              style={[Commonstyles.mediumText, { color: COLORS.themeColor }]}
            >
              Total
            </Text>
            <Text
              style={[Commonstyles.mediumText, { color: COLORS.themeColor }]}
            >
              ₹35,000
            </Text>
          </View>
        </View>

        {/* contact detail */}
        <View style={[Commonstyles.addressRow, { marginTop: wp(3) }]}>
          <Text style={[Commonstyles.mediumText]}>Contact Details</Text>
          <FastImage
            source={images.edit}
            style={[Commonstyles.locationIcon]}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>

        <View style={[Commonstyles.allSideRadiusStyle, { borderRadius: 0 }]}>
          <Text style={styles.title}>Rahul Jain</Text>
          <Text style={styles.title}>09999999999</Text>
          <Text style={styles.title}>
            Address- um dolor sit amet consectetur. Egestas vulputate hac
            pulvinar scelerisque aliquam. Ipsum urna pellentesque eget urna
            tellus.
          </Text>
        </View>

        <View
          style={{
            marginVertical: hp(10),
            alignItems: 'center',
            marginBottom: hp(15),
          }}
        >
          <Text style={styles.title}>
            By proceeding you accept our{' '}
            <Text
              style={[
                styles.title,
                {
                  color: COLORS.themeColor,
                  textDecorationLine: 'underline',
                  textAlign: 'center',
                },
              ]}
            >
              Terms & Conditions
            </Text>
          </Text>
        </View>
      </ScrollView>

      {/* bttn */}
      <View style={Commonstyles.servicesSection}>
        <TouchableOpacity
          style={[Commonstyles.viewCartButton, styles.payBtn]}
          onPress={() => navigation.navigate('PaymentScreen')}
        >
          <Image
            source={images.swipRight}
            style={[Commonstyles.chaticon, { width: wp(14) }]}
          />
          <Text
            style={[
              Commonstyles.mediumText,
              {
                fontSize: hp('2%'),
                color: COLORS.white,
                flex: 0.5,
                borderRightColor: 'white',
                borderRightWidth: 1,
              },
            ]}
          >
            Pay
          </Text>
          <Text
            style={[
              Commonstyles.mediumText,
              {
                fontSize: hp('2%'),
                color: COLORS.white,
                textAlign: 'right',
                flex: 0.4,
              },
            ]}
          >
            35,000
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderSummaryScreen;

const styles = StyleSheet.create({
  cardimage: {
    width: wp(30),
    height: hp('10%'),
    borderRadius: 15,
    resizeMode: 'contain',
  },
  payBtn: {
    width: wp('90%'),
    alignSelf: 'center',
    paddingVertical: wp(1.5),
  },
  addContainer: {
    width: wp(20),
    borderRadius: wp(1),
    backgroundColor: COLORS.lightSky,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: wp(1.5),
    borderWidth: hp('0.1%'),
    borderColor: COLORS.themeColor,
  },
  container: {
    //   marginVertical: 16,
  },
  listContent: {
    // marginBottom: hp(15),
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
