import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../../../utils/colors';
import images from '../../../assets/images';
import Header from '../../../components/Header';
import HomeScreenStyles from '../HomeScreenStyles';
import { useNavigation } from '@react-navigation/native';
import DetailsCard from "../../../customScreen/DetailsCard";

const ErrorDetails = ({ route }) => {
    const { errorData, brandName } = route?.params || {};
    const detailError = JSON.parse(errorData || '{}');
    console.log('Parsed errorData:', detailError);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    const PlaceOptions = [
        { label: 'Split AC', value: 'Split AC' },
        { label: 'Window AC', value: 'Window AC' },
        { label: 'Ducted AC', value: 'Ducted AC' },
        { label: 'VRV/VRF', value: 'VRV/VRF' },
        { label: 'Concealed AC', value: 'Concealed AC' },
        { label: 'Tower AC', value: 'Tower AC' },
    ];



    return (
        <View style={HomeScreenStyles.workcontainer}>
            <Header title="Error Code" onBack={() => navigation.goBack()} />

            <ScrollView
                style={HomeScreenStyles.workscrollstyle}
                showsVerticalScrollIndicator={false}
            >
                {/* Problem of ac */}
                <View style={[styles.card, { marginTop: hp(3) }]}>
                    <View style={styles.brandView}>
                        <View style={styles.rowStyle}>
                            <Image source={images.brand_icon} style={styles.iconstyle} />
                            <View>
                                <Text style={styles.labelTitle}>Brand</Text>
                                <Text style={styles.valuestyle}>{brandName}</Text>
                            </View>
                        </View>
                        <View style={styles.rowStyle}>
                            <Image source={images.ac_cassette} style={styles.iconstyle} />
                            <View>
                                <Text style={styles.labelTitle}>AC Type</Text>
                                <Text style={styles.valuestyle}>{detailError?.acType}</Text>
                            </View>
                        </View>
                        <View style={styles.rowStyle}>
                            <Image source={images.errorCodeIcon} style={styles.iconstyle} />
                            <View>
                                <Text style={styles.labelTitle}>Error Code</Text>
                                <Text style={styles.valuestyle}>{detailError?.code}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.boderLine} />
                    <View style={{ marginVertical: wp(2) }}>
                        <Text style={styles.labelTitle}>Heading:</Text>
                        <Text style={styles.valuestyle}>
                            {detailError?.models}
                        </Text>
                    </View>
                    <View style={{ marginVertical: wp(1) }}>
                        <Text style={styles.labelTitle}>Category</Text>
                        <Text style={styles.valuestyle}>{detailError?.category}</Text>
                    </View>

                    {/* <View >
                        <Text style={styles.labelTitle}>Meaning:</Text>
                        <Text style={styles.valuestyle}>
                            Tempreature Sensor malfunction
                        </Text>
                    </View> */}
                    <View style={{ marginVertical: wp(3) }}>
                        <Text style={styles.labelTitle}>Troubleshooting Steps:</Text>
                        {detailError?.solution?.map((step, index) => (<Text style={styles.valuestyle}>
                            {step}
                        </Text>))}
                    </View>
                </View>

                <View style={HomeScreenStyles.worksliderview}>
                    <Image source={images.bannerTwo} style={HomeScreenStyles.workimage} />
                </View>

                {/* Details card */}
                <DetailsCard
                    title="Details"
                    icon={images.roundRightarrow} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: wp('3%'),
        marginBottom: hp('1%'),
        elevation: 2,
        borderColor: COLORS.lightSky,
        borderWidth: wp(0.2),
        marginTop: 10,
        padding: hp('1.5%'),
    },
    boderLine: {
        borderColor: COLORS.lightSky,
        borderWidth: wp(0.1),
        marginVertical: hp('0.5%'),
    },
    icon: {
        width: wp('7%'),
        height: wp('7%'),
        marginRight: wp('3%'),
        resizeMode: 'contain',
        tintColor: COLORS.themeColor,
    },
    title: {
        flex: 1,
        fontSize: wp('3%'),
        color: COLORS.black,
        fontFamily: Fonts.regular,
    },
    flexView: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        marginVertical: hp('1%'),
    },
    brandView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(1),
    },
    rowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconstyle: {
        marginRight: hp(1),
        height: wp(8.5),
        width: wp(8.6),
        resizeMode: 'contain',
    },
    labelTitle: {
        fontSize: hp('1.5%'),
        color: COLORS.textColor,
        fontFamily: Fonts.medium,
    },
    valuestyle: {
        fontSize: hp('1.5%'),
        color: COLORS.black,
        fontFamily: Fonts.medium,
    },
});

export default ErrorDetails;
