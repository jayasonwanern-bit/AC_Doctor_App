import { Alert, Linking, Platform } from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';
import { getAppVersion } from '../utils/appVersion';
import { isUpdateRequired } from '../utils/versionCompare';

export const checkForceUpdate = async () => {
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
