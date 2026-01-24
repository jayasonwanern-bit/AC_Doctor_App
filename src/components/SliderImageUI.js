import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    FlatList,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const SliderImageUI = ({
    data = [],
    height = 180,
    autoPlay = true,
    interval = 3000,
    showDots = true,
    borderRadius = 12,
}) => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // 🔁 Auto scroll
    useEffect(() => {
        if (!autoPlay || data.length <= 1) return;

        const timer = setInterval(() => {
            const nextIndex =
                currentIndex === data.length - 1 ? 0 : currentIndex + 1;

            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });

            setCurrentIndex(nextIndex);
        }, interval);

        return () => clearInterval(timer);
    }, [currentIndex, autoPlay, data.length]);

    const renderItem = ({ item }) => (
        <View style={[styles.slideView, { height }]}>
            <Image
                source={item}
                style={[styles.image, { borderRadius }]}
                resizeMode='contain'
            />
        </View>
    );

    const onViewRef = useRef(({ viewableItems }) => {
        if (viewableItems?.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    });

    const viewConfigRef = useRef({
        viewAreaCoveragePercentThreshold: 50,
    });

    return (
        <View>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                getItemLayout={(_, index) => ({
                    length: width,
                    offset: width * index,
                    index,
                })}
            />

            {/* 🔘 Dots */}
            {showDots && (
                <View style={styles.dotsContainer}>
                    {data.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index && styles.activeDot,
                            ]}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

export default SliderImageUI;
const styles = StyleSheet.create({
    slideView: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',         // 👈 MUST have width
        height: '100%',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#000',
        width: 12,
    },
});
