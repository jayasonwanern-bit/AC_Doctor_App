import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    StyleSheet,
} from 'react-native';
import { State, City } from 'country-state-city';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const StateCityPicker = ({
    selectedState,
    selectedCity,
    onStateSelect,
    onCitySelect,
}) => {
    const [stateModal, setStateModal] = useState(false);
    const [cityModal, setCityModal] = useState(false);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        // Load India states
        setStates(State.getStatesOfCountry('IN'));
    }, []);

    const handleStatePress = item => {
        onStateSelect(item.name);
        setCities(City.getCitiesOfState('IN', item.isoCode));
        setStateModal(false);
        onCitySelect('');
    };

    return (
        <View>
            {/* STATE */}
            <Text style={styles.label}>State</Text>
            <TouchableOpacity
                style={styles.box}
                onPress={() => setStateModal(true)}
                activeOpacity={0.8}
            >
                <Text style={styles.valueText}>
                    {selectedState || 'Select State'}
                </Text>
            </TouchableOpacity>

            {/* CITY */}
            <Text style={styles.label}>City</Text>
            <TouchableOpacity
                style={styles.box}
                onPress={() => selectedState && setCityModal(true)}
                activeOpacity={0.8}
            >
                <Text style={styles.valueText}>
                    {selectedCity || 'Select City'}
                </Text>
            </TouchableOpacity>

            {/* STATE MODAL */}
            <Modal
                visible={stateModal}
                animationType="slide"
                statusBarTranslucent
            >
                <SafeAreaView style={styles.modalContainer}>
                    <FlatList
                        data={states}
                        keyExtractor={item => item.isoCode}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => handleStatePress(item)}
                            >
                                <Text style={styles.itemText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </SafeAreaView>
            </Modal>

            {/* CITY MODAL */}
            <Modal
                visible={cityModal}
                animationType="slide"
                statusBarTranslucent
            >
                <SafeAreaView style={styles.modalContainer}>
                    <FlatList
                        data={cities}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => {
                                    onCitySelect(item.name);
                                    setCityModal(false);
                                }}
                            >
                                <Text style={styles.itemText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </SafeAreaView>
            </Modal>
        </View>
    );
};

export default StateCityPicker;

const styles = StyleSheet.create({
    label: {
        fontFamily: Fonts.semiBold,
        fontSize: hp(1.5),
        color: COLORS.black,
        marginBottom: hp(0.5),
        marginTop: hp(1),
    },

    box: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: wp(10),
        padding: wp(3),
        marginBottom: hp(1),
        backgroundColor: COLORS.white,
    },

    valueText: {
        fontFamily: Fonts.medium,
        fontSize: hp(1.5),
        color: COLORS.black,
    },

    modalContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
    },

    item: {
        padding: wp(4),
        borderBottomWidth: 1,
        borderColor: '#eee',
        backgroundColor: COLORS.white,
    },

    itemText: {
        fontFamily: Fonts.medium,
        fontSize: hp(1.6),
        color: COLORS.black,
    },
});
