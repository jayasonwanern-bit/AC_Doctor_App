import React, { useEffect, useState, useMemo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    SafeAreaView,
    TextInput,
    StyleSheet,
} from 'react-native';
import { State, City } from 'country-state-city';
import { Fonts } from '../utils/colors';

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

    const [stateSearch, setStateSearch] = useState('');
    const [citySearch, setCitySearch] = useState('');

    useEffect(() => {
        setStates(State.getStatesOfCountry('IN'));
    }, []);

    const handleStatePress = item => {
        onStateSelect(item.name);
        setCities(City.getCitiesOfState('IN', item.isoCode));
        setStateModal(false);
        onCitySelect('');
        setCitySearch('');
    };

    // 🔥 Optimized Filtering using useMemo
    const filteredStates = useMemo(() => {
        return states.filter(item =>
            item.name.toLowerCase().includes(stateSearch.toLowerCase()),
        );
    }, [stateSearch, states]);

    const filteredCities = useMemo(() => {
        return cities.filter(item =>
            item.name.toLowerCase().includes(citySearch.toLowerCase()),
        );
    }, [citySearch, cities]);

    return (
        <View>
            {/* STATE FIELD */}
            <Text style={styles.label}>State</Text>
            <TouchableOpacity style={styles.box} onPress={() => setStateModal(true)}>
                <Text style={styles.valueText}>{selectedState || 'Select State'}</Text>
            </TouchableOpacity>

            {/* CITY FIELD */}
            <Text style={styles.label}>City</Text>
            <TouchableOpacity
                style={styles.box}
                onPress={() => selectedState && setCityModal(true)}
            >
                <Text style={styles.valueText}>{selectedCity || 'Select City'}</Text>
            </TouchableOpacity>

            {/* ================= STATE MODAL ================= */}
            <Modal visible={stateModal} animationType="slide">
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.headerRow}>
                        <Text style={styles.modalTitle}>Select State</Text>
                        <TouchableOpacity onPress={() => setStateModal(false)}>
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        placeholder="Search State..."
                        value={stateSearch}
                        onChangeText={setStateSearch}
                        style={styles.searchInput}
                    />

                    <FlatList
                        data={filteredStates}
                        keyExtractor={item => item.isoCode}
                        keyboardShouldPersistTaps="handled"
                        initialNumToRender={15}
                        windowSize={10}
                        renderItem={({ item }) => {
                            const isSelected = selectedState === item.name;
                            return (
                                <TouchableOpacity
                                    style={[styles.item, isSelected && styles.selectedItem]}
                                    onPress={() => handleStatePress(item)}
                                >
                                    <Text style={styles.itemText}>{item.name}</Text>
                                </TouchableOpacity>
                            );
                        }}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>No state found</Text>
                        }
                    />
                </SafeAreaView>
            </Modal>

            {/* ================= CITY MODAL ================= */}
            <Modal visible={cityModal} animationType="slide">
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.headerRow}>
                        <Text style={styles.modalTitle}>Select City</Text>
                        <TouchableOpacity onPress={() => setCityModal(false)}>
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        placeholder="Search City..."
                        placeholderTextColor={'#333'}
                        value={citySearch}
                        onChangeText={setCitySearch}
                        style={styles.searchInput}
                    />

                    <FlatList
                        data={filteredCities}
                        keyExtractor={(item, index) => index.toString()}
                        keyboardShouldPersistTaps="handled"
                        initialNumToRender={20}
                        windowSize={10}
                        renderItem={({ item }) => {
                            const isSelected = selectedCity === item.name;
                            return (
                                <TouchableOpacity
                                    style={[styles.item, isSelected && styles.selectedItem]}
                                    onPress={() => {
                                        onCitySelect(item.name);
                                        setCityModal(false);
                                    }}
                                >
                                    <Text style={styles.itemText}>{item.name}</Text>
                                </TouchableOpacity>
                            );
                        }}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>No city found</Text>
                        }
                    />
                </SafeAreaView>
            </Modal>
        </View>
    );
};

export default StateCityPicker;


const styles = StyleSheet.create({
    label: {
        fontSize: 16.5,
        marginTop: 10,
        marginBottom: 5,
        color: '#333',
        fontFamily: Fonts.semiBold
    },
    box: {
        height: 48,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        justifyContent: 'center',
        paddingHorizontal: 12,
        backgroundColor: '#fff',
    },
    valueText: {
        fontSize: 14,
        color: '#888787',
        fontFamily: '500'
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    closeText: {
        fontSize: 14,
        color: 'red',
        fontWeight: '600',
    },
    searchInput: {
        height: 45,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        margin: 10,
        paddingHorizontal: 10,
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: '#161616',
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    selectedItem: {
        backgroundColor: '#e6f0ff',
    },
    itemText: {
        fontSize: 14,
        color: '#333',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#999',
    },
});

