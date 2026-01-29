import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Header from '../../components/Header';
import CustomSearchWithFilter from '../../components/CustomSearchWithFilter';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2; // 2 columns, 16px padding each side, 16px gap

const products = [
  {
    id: '1',
    title:
      'Voltas 1 Ph Rot. SAC C2-N Venture I-Cassette AC (2 Ton White) Corded Electric',
    price: 74890,
    originalPrice: 98100,
    discount: '24% off',
    rating: 4.5,
    reviews: 1150,
    freeDelivery: true,
    image: 'https://picsum.photos/200/300',
  },
  {
    id: '2',
    title:
      'LG 1 Ph Rot. SAC C2-N Venture I-Cassette AC (2 Ton White) Corded Electric',
    price: 74890,
    originalPrice: 98100,
    discount: '24% off',
    rating: 4.5,
    reviews: 1150,
    freeDelivery: true,
    image: 'https://picsum.photos/200/300',
  },
  {
    id: '3',
    title:
      'Daikin 1 Ph Rot. SAC C2-N Venture I-Cassette AC (2 Ton White) Corded Electric',
    price: 374890,
    originalPrice: 98100,
    discount: '24% off',
    rating: 2.5,
    reviews: 1150,
    freeDelivery: true,
    image: 'https://picsum.photos/200/300',
  },
  {
    id: '4',
    title:
      'Hitachi 1 Ph Rot. SAC C2-N Venture I-Cassette AC (2 Ton White) Corded Electric',
    price: 6890,
    originalPrice: 98100,
    discount: '24% off',
    rating: 4.5,
    reviews: 1150,
    freeDelivery: true,
    image: 'https://picsum.photos/200/300',
  },
  {
    id: '5',
    title:
      'Voltas 1 Ph Rot. SAC C2-N Venture I-Cassette AC (2 Ton White) Corded Electric',
    price: 74890,
    originalPrice: 923100,
    discount: '24% off',
    rating: 3.5,
    reviews: 1150,
    freeDelivery: true,
    image: 'https://picsum.photos/200/300',
  },
];

const ProductListScreen = ({ navigation, route }) => {
  const Sname = route?.params?.screenName;


  return (
    <View style={styles.container}>
      <Header title={Sname} onBack={() => navigation.goBack()} />
      {/* Search Bar */}
      <CustomSearchWithFilter
        initialData={products}
        onProductPress={item =>
          navigation.navigate('ProductDetailScreen', {
            productId: item.id,
            productScreenName: Sname,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default ProductListScreen;
