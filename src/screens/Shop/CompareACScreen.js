import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
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

const CompareACScreen = ({navigation}) => {
  const [selectCompare, setSelectCompare] = useState({});

  // list like or dislike
  const toggleLike = itemId => {
    setSelectCompare(prev => ({
      ...prev,
      [itemId]: !prev[itemId], // Toggle
    }));
  };

  const isLiked = itemId => !!selectCompare[itemId];

  const products = [
    {
      id: '1',
      title:
        'Godrej 1.5 Ton 3 Star Inverter Split AC (Copper, 5-in-1 Convertible, 2023 Model)',
      rating: 4,
      ton: '1.5 Ton 3 Star',
      image: images.ACimage,
      limitedDeal: true,
    },
    {
      id: '2',
      title:
        'Godrej 1.5 Ton 3 Star Inverter Split AC (Copper, 5-in-1 Convertible, 2023 Model)',
      rating: 3,
      ton: '1.5 Ton 3 Star',
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
        <Text style={styles.title} numberOfLines={1}>
          {item.ton}
        </Text>


        <View style={styles.mrpRow}>     
        <Text style={styles.price}>
          ₹43437.00
        </Text>
          <Text style={styles.mrpPrice}>
           {' '} ₹{item.mrp}
          </Text>
        </View>

        <View style={styles.discountRow}>
          <TouchableOpacity
            style={styles.mrpRow}
            onPress={() => toggleLike(item.id)}
          >
            <FastImage
              source={isLiked(item.id) ? images.check : images.uncheck}
              style={[Commonstyles.locationIcon]}
              resizeMode={FastImage.resizeMode.contain}
            />
             <Text style={styles.mrp}>Compare</Text>
          </TouchableOpacity>
          <View style={styles.ratingRow}>
                        <View style={styles.stars}>
                          {[...Array(5)].map((_, i) => (
                            <Text
                              key={i}
                              style={
                                i < (item.rating || 0)
                                  ? styles.starFilled
                                  : styles.starEmpty
                              }
                            >
                             ★
                            </Text>
                          ))}
                        </View>
                      </View>
        </View>
      </View>
    );
  };
  return (
    <View style={Commonstyles.container}>
      <Header title={'Compare AC'} onBack={() => navigation.goBack()} />
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
            </View>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={()=>navigation.navigate('BrandScreen')}>
            <Text style={styles.addText}> + Add AC</Text>
          </TouchableOpacity>
        </View>

        <Text style={[Commonstyles.mediumText, { marginVertical: hp(1.5) }]}>
          Selected Similar ACs
        </Text>
        <View >
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
    </View>
  );
};

export default CompareACScreen;

const styles = StyleSheet.create({
  cardimage: {
    width: wp(30),
    height: hp('10%'),
    borderRadius: 15,
    resizeMode: 'contain',
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
 
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.themeColor,
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
   ratingRow: {
    alignItems: 'flex-start',
  },
  stars: {
    flexDirection: 'row',
  },
  starFilled: {
    color: '#FFD700',
    fontSize: hp(1.3),
  },
  starEmpty: {
    color: '#ddd',
    fontSize: hp(1.3),
  },
});
