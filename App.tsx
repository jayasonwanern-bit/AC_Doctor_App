import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import { Alert, Linking, Platform, View } from 'react-native';

import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import React, { useEffect } from 'react';

import { initRemoteConfig } from './src/services/remoteConfig';
import { requestNotificationPermission } from './src/services/notificationPermission';
import { getFcmToken } from './src/services/getFcmToken';
import { setupPushListeners } from './src/services/pushHandler';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { useNavigation } from '@react-navigation/native';
import { getAppVersion } from './src/utils/appVersion';
import remoteConfig from '@react-native-firebase/remote-config';
// import { getAppVersion } from '../utils/appVersion';
import { isUpdateRequired } from './src/utils/versionCompare';

export default function App() {
  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    await initRemoteConfig();
    await checkForceUpdate();
    await requestNotificationPermission();
    await getFcmToken();
    await setupPushListeners();
  };

  const checkForceUpdate = async () => {
    const currentVersion = getAppVersion();

    const forceUpdate = remoteConfig().getBoolean('force_update');
    const latestVersion =
      Platform.OS === 'android'
        ? remoteConfig().getString('latest_version_android')
        : remoteConfig().getString('latest_version_ios');

    const updateMessage = remoteConfig().getString('update_message');
    const storeUrl =
      Platform.OS === 'android'
        ? remoteConfig().getString('android_store_url')
        : remoteConfig().getString('ios_store_url');

    if (forceUpdate && isUpdateRequired(currentVersion, latestVersion)) {
      Alert.alert(
        'Update Required',
        updateMessage,
        [
          {
            text: 'Update Now',
            onPress: () => Linking.openURL(storeUrl),
          },
        ],
        { cancelable: false },
      );
    }
  };
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
