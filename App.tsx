import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import React, { useEffect } from 'react';

import { initRemoteConfig } from './src/services/remoteConfig';
import { checkForceUpdate } from './src/hook/useForceUpdate';
import { requestNotificationPermission } from './src/services/notificationPermission';
import { getFcmToken } from './src/services/getFcmToken';
import { setupPushListeners } from './src/services/pushHandler';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import notifee from '@notifee/react-native';
export default function App() {
  useEffect(() => {
    const init = async () => {
      await initRemoteConfig();
      await checkForceUpdate();
      await requestNotificationPermission();
      await getFcmToken();
      await setupPushListeners();
      messaging().requestPermission();

      // Token (sirf confirm ke liye)
      messaging()
        .getToken()
        .then(token => {
          console.log('FCM TOKEN:--', token);
        });

      // Foreground ke liye
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('Foreground notification:', remoteMessage);
      });

      return unsubscribe;
    };

    init();
  }, []);

  useEffect(() => {
    setup();
  }, []);

  const setup = async () => {
    // 🔹 Permission
    await notifee.requestPermission();
    await messaging().requestPermission();

    // 🔹 Token
    const token = await messaging().getToken();
    console.log('🔥 FCM TOKEN:', token);

    // 🔹 Foreground notification
    messaging().onMessage(async remoteMessage => {
      showNotification(
        remoteMessage.notification?.title,
        remoteMessage.notification?.body,
      );
    });
  };

  const showNotification = async (title, body) => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
      },
    });
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}
