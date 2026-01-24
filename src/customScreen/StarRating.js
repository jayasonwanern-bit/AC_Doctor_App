import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

const StarRating = ({
    maxStars = 5,
    starSize = 15,
    rating = 0,
    onRatingChange,
}) => {
    const [selectedRating, setSelectedRating] = useState(rating);

    useEffect(() => {
        setSelectedRating(rating);
    }, [rating]);

    const onPressStar = value => {
        setSelectedRating(value);
        onRatingChange && onRatingChange(value);
    };

    return (
        <View style={{ flexDirection: 'row' }}>
            {Array.from({ length: maxStars }).map((_, index) => {
                const starValue = index + 1;
                return (
                    <TouchableOpacity key={index} disabled activeOpacity={0.7}>
                        <Image
                            source={
                                starValue <= selectedRating
                                    ? require('../assets/icons/star.png')
                                    : require('../assets/icons/DisStar.png')
                            }
                            style={{
                                width: starSize,
                                height: starSize,
                                marginHorizontal: 1,
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default StarRating;   
