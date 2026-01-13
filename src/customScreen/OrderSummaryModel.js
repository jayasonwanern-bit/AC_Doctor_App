import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomButton from '../components/CustomButton';
import { COLORS } from '../utils/colors';

const OrderSummaryModal = ({
    visible,
    onClose,
    locationText,
    phoneText,
    slotText,
    images,
    hp,
    OnPressBtn
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <View style={styles.container}>

                    {/* LOCATION */}
                    <View style={styles.row}>
                        <FastImage source={images.locationRed} style={styles.icon} />
                        <Text style={styles.text}>{locationText?.trim()}</Text>
                    </View>

                    {/* PHONE */}
                    <View style={[styles.row, { marginVertical: hp('1.5%') }]}>
                        <FastImage
                            source={images.callRed}
                            style={styles.icon}
                            resizeMode="contain"
                        />
                        <Text style={styles.text}>
                            {phoneText?.trim()}
                        </Text>
                    </View>

                    {/* SLOT */}
                    <View style={[styles.row, { marginBottom: hp('2%') }]}>
                        <FastImage source={images.timeRed} style={styles.icon} />
                        <Text style={styles.text}>
                            {slotText?.trim()}
                        </Text>
                    </View>

                    <CustomButton
                        buttonName={'Proceed Booking'}
                        btnTextColor={COLORS.white}
                        btnColor={COLORS.themeColor}
                        onPress={() => {
                            OnPressBtn()
                        }}
                        marginBottom={10}
                    />

                    <TouchableOpacity
                        style={{
                            marginVertical: 4,
                            marginBottom: 5, alignSelf: 'center'
                        }}
                    >
                        <Text style={styles.text}>
                            By proceeding, you agree to our <Text style={styles.textHeighlight}>T&C ,Privacy & Cancellation
                                Policy</Text>
                        </Text>
                    </TouchableOpacity>

                </View>
            </Pressable>
        </Modal>
    );
};

export default OrderSummaryModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: '#fff',
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
    },
    icon: {
        width: 22,
        height: 22,
        marginRight: 10,
    },
    text: {
        fontSize: 14,
        color: '#222',
        fontWeight: '500'
    },
    textHeighlight: {
        fontSize: 14,
        color: '#2a80e9',
        fontWeight: '500',
        textDecorationLine: 'underline', textDecorationColor: '#2a80e9',
    },
});
