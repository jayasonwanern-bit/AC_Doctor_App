import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const OrderSummaryModal = ({
    visible,
    onClose,
    routeAddress,
    userDetails,
    selectedAddress,
    selectedSlot,
    images,
    hp,
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>

                    {/* LOCATION */}
                    <View style={styles.row}>
                        <FastImage source={images.locationRed} style={styles.icon} />
                        <Text style={styles.text}>
                            {routeAddress
                                ? `${routeAddress?.name || ''}, ${routeAddress?.address || ''}`
                                : `${userDetails?.name || ''}, ${selectedAddress?.street || ''},
                   ${selectedAddress?.city || ''}, ${selectedAddress?.state || ''},
                   ${selectedAddress?.zipcode || ''}`}
                        </Text>
                    </View>

                    {/* PHONE */}
                    <View style={[styles.row, { marginVertical: hp('1.5%') }]}>
                        <FastImage
                            source={images.callRed}
                            style={styles.icon}
                            resizeMode="contain"
                        />
                        <Text style={styles.text}>
                            {userDetails?.countryCode}-{userDetails?.phoneNumber}
                        </Text>
                    </View>

                    {/* SLOT */}
                    <View style={[styles.row, { marginBottom: hp('2%') }]}>
                        <FastImage source={images.timeRed} style={styles.icon} />
                        <Text style={styles.text}>
                            {selectedSlot?.date}/{selectedSlot?.monthNumber}/
                            {selectedSlot?.year}, {selectedSlot?.Timeslot}
                        </Text>
                    </View>

                </View>
            </View>
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
        flex: 1,
        fontSize: 14,
        color: '#222',
    },
});
