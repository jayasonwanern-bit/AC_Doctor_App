import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

export const requestNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Notification permission granted');
  }
};
