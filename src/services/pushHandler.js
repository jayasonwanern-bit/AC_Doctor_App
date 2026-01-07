import messaging from '@react-native-firebase/messaging';
import remoteConfig from '@react-native-firebase/remote-config';
import { Alert } from 'react-native';

export const setupPushListeners = () => {
  // 🔹 App in background
  messaging().onNotificationOpenedApp(remoteMessage => {
    handlePush(remoteMessage);
  });

  // 🔹 App killed
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        handlePush(remoteMessage);
      }
    });

  // 🔹 Foreground
  messaging().onMessage(async remoteMessage => {
    handlePush(remoteMessage);
  });
};

const handlePush = async remoteMessage => {
  await remoteConfig().fetchAndActivate();

  const pushEnabled = remoteConfig().getBoolean('push_enabled');

  if (!pushEnabled) {
    console.log('Push disabled from Remote Config');
    return;
  }

  const title =
    remoteConfig().getString('push_title') || remoteMessage.notification?.title;

  const message =
    remoteConfig().getString('push_message') ||
    remoteMessage.notification?.body;

  Alert.alert(title, message);
};
