import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
export const getFcmToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM TOKEN:', token);

    if (token) {
      await AsyncStorage.setItem('FCM_TOKEN', token); // ✅ save
      console.log('token stetd');
    }

    return token;
  } catch (error) {
    console.log('FCM TOKEN ERROR:', error);
    return null;
  }
};
