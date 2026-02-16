import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import images from '../../assets/images'; // Your check icon
import { COLORS, Fonts } from '../../utils/colors';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';

const HelpScreen = () => {
    const navigation = useNavigation();

    return (<>
        <Header title='Help' onBack={() => navigation.goBack()} />
        <View style={styles.container}>
            {/* Success Icon */}
            <View style={styles.iconContainer}>
                <Image
                    source={images.helpnotify}
                    style={styles.checkIcon}
                // resizeMode={'contain'}
                />
                <Text style={styles.helpText}>Hello {'\n'}How can we help you?</Text>
            </View>
            <View style={styles.card}>
                <Image source={images.contact} style={styles.contactIcon} resizeMode={'contain'} />
                <Text style={styles.orderId}>+91 8109663993</Text>
            </View>
            <View style={[styles.card, { marginTop: hp(3) }]}>
                <Image source={images.emailIcon} style={styles.contactIcon} resizeMode={'contain'} />
                <Text style={styles.orderId}>acdoctor@gmail.com</Text>
            </View>


        </View>
    </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(5),
    },
    checkIcon: {
        width: wp(40),
        height: wp(40),
    },
    card: {
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#add1f1',
        borderWidth: 1, padding: 10,
        borderRadius: wp(2), width: '95%', alignSelf: 'center'
    },
    orderId: {
        fontSize: hp(1.6),
        fontFamily: Fonts.medium,
        color: COLORS.black,
        textAlign: 'center',
        // marginBottom: 12,
    },
    helpText: {
        fontSize: hp(1.8),
        fontFamily: Fonts.semiBold,
        color: COLORS.gray,
        textAlign: 'center',
        marginTop: hp(2),
    },
    contactIcon: {
        width: wp(7),
        height: wp(5.5),
        marginRight: wp(2),
    },
    message: {
        fontSize: 13,
        color: '#555',
        textAlign: 'center',
        lineHeight: 22,
    }
});

export default HelpScreen;
