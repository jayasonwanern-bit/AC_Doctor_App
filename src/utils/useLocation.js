import { useState, useEffect, useCallback } from 'react';
import { Platform, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

/**
 * Custom hook to get user's current location
 * 
 * @returns {{
 *   location: { latitude: number, longitude: number } | null,
 *   error: string | null,
 *   isLoading: boolean,
 *   isLocationEnabled: boolean,
 *   retry: () => void
 * }}
 */
const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);

  const permission = Platform.select({
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  });

  const getLocation = useCallback(() => {
    setIsLoading(true);
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setError(null);
        setIsLocationEnabled(true);
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLocationEnabled(false);
        setIsLoading(false);
        Alert.alert('Error', `Failed to get location: ${err.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  }, []);

  const requestLocationPermission = useCallback(async () => {
    if (!permission) {
      setError('Permission type is undefined for this platform');
      return;
    }

    try {
      setIsLoading(true);
      const result = await check(permission);

      if (result === RESULTS.GRANTED) {
        getLocation();
      } else if (result === RESULTS.DENIED) {
        const requestResult = await request(permission);
        if (requestResult === RESULTS.GRANTED) {
          getLocation();
        } else {
          setIsLoading(false);
          setIsLocationEnabled(false);
          Alert.alert(
            'Location Permission Denied',
            'Please enable location access in settings to use this feature.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Open Settings', onPress: () => openSettings() },
            ]
          );
        }
      } else if (result === RESULTS.BLOCKED) {
        setIsLoading(false);
        setIsLocationEnabled(false);
        Alert.alert(
          'Location Permission Blocked',
          'Location access is blocked. Please enable it in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => openSettings() },
          ]
        );
      }
    } catch (err) {
      setError(err.message || 'Unknown error');
      setIsLocationEnabled(false);
      setIsLoading(false);
      Alert.alert('Error', `Permission error: ${err.message}`);
    }
  }, [permission, getLocation]);

  useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);

  const retry = useCallback(() => {
    setError(null);
    requestLocationPermission();
  }, [requestLocationPermission]);

  return {
    location,
    error,
    isLoading,
    isLocationEnabled,
    retry,
  };
};

export default useLocation;
