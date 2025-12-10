import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import images from '../assets/images';

// Placeholder COLORS object (replace with your actual COLORS)
const COLORS = {
  lightGray: '#F5F5F5',
  gray: '#999999',
  accent: '#FF6F61',
};

const CustomSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const { width } = Dimensions.get('window');

  // Autoplay configuration
  useEffect(() => {
    if (images.length === 0) return; // Prevent autoplay if no images
    const autoplayInterval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % images.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 4000); // 4 seconds autoplay timeout

    return () => clearInterval(autoplayInterval);
  }, [images]);

  // Handle scroll to update current index
  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  // Render each slide
  const renderItem = ({ item }) => (
    <View style={styles.sliderview}>
      <Image
        source={
          item?.logo
            ? { uri: item.logo }
            : require('../assets/icons/banner.png')
        }
        style={styles.image}
      />
    </View>
  );

  // Customizable dot properties
  const dotSize = wp('2%');
  const dotMargin = wp('1.5%');
  const dotBottomPosition = hp('1%');
  const dotTopPosition = hp('12%');

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.slider}>
        {images.length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={images}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />
        ) : (
          <View style={styles.sliderview}>
            <Image
              source={{ uri: 'https://via.placeholder.com/800x400' }}
              style={styles.image}
            />
          </View>
        )}
        {images.length > 1 && (
          <View
            style={[
              styles.dots,
              dotTopPosition
                ? { top: dotTopPosition }
                : { bottom: dotBottomPosition },
            ]}
          >
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    width: dotSize,
                    height: dotSize,
                    marginHorizontal: dotMargin,
                    backgroundColor:
                      index === currentIndex ? COLORS.accent : COLORS.gray,
                  },
                ]}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    height: hp('20%'),
    marginVertical: hp('0%'),
  },
  slider: {
    height: hp('20%'),
    overflow: 'hidden',
  },
  sliderview: {
    width: wp('98%'),
    height: hp('35%'),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '93%',
    height: hp('15%'),
    borderRadius: 15,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: hp('14%'),
  },
  dot: {
    borderRadius: 999,
  },
});

export default CustomSlider;
