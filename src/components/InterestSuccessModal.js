import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity, Image
} from 'react-native';
import images from '../assets/images';
import { COLORS } from '../utils/colors';


const InterestSuccessModal = ({ visible, onClose }) => {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <TouchableOpacity style={styles.overlay} onPress={onClose}>
                <View style={styles.card}>
                    {/* Success Icon */}
                    <View style={styles.iconCircle}>
                        <Image source={images.SuccessIcon} // Replace with your blue check icon
                            style={styles.checkIcon} />
                    </View>

                    {/* Title */}
                    <Text style={styles.title}>Interest Noted</Text>

                    {/* Subtitle */}
                    <Text style={styles.subtitle}>
                        Our team will connect with you shortly.
                    </Text>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Done Button */}
                    <TouchableOpacity style={styles.doneBtn} onPress={onClose}>
                        <Text style={styles.doneText}>Done</Text>
                    </TouchableOpacity>

                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default InterestSuccessModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 25,
        paddingHorizontal: 20,
        alignItems: 'center',
        position: 'relative',
    },

    closeBtn: {
        position: 'absolute',
        right: 15,
        top: 15,
    },

    iconCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },

    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#0A0F2C',
        marginBottom: 10,
    },

    checkIcon: {
        width: 100,
        height: 100,
    },
    subtitle: {
        fontSize: 15,
        color: '#7A7A7A',
        textAlign: 'center',
        marginBottom: 20,
    },

    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#E6E6E6',
        marginBottom: 20,
    },
    doneBtn: {
        backgroundColor: '#1E88E5',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 25,
    },
    doneText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
