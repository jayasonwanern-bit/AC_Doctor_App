import { useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const useCurrentLocation = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [addressText, setAddressText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

 const getLocation = async (onSuccess) => {
  try {
    setLoading(true);
    setError(null);

    const permissionGranted = await requestPermission();
    if (!permissionGranted) {
      setError('Location permission denied');
      setLoading(false);
      return;
    }

    Geolocation.getCurrentPosition(
      async position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLatitude(lat);
        setLongitude(lon);

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'MyReactNativeApp/1.0',
                'Accept': 'application/json',
              },
            }
          );

          const data = await response.json();

          const addr = data?.address || {};

          // ✅ Split & structured address
          const addressObj = {
            fullAddress: data?.display_name || '',
            house: addr.house_number || '',
            road: addr.road || '',
            area:
              addr.suburb ||
              addr.neighbourhood ||
              addr.village ||
              '',
            city:
              addr.city ||
              addr.town ||
              addr.municipality ||
              '',
            state: addr.state || '',
            pincode: addr.postcode || '',
            country: addr.country || '',
          };

          setAddressText(addressObj.fullAddress);

          // ✅ CALLBACK WITH ALL DATA
          onSuccess &&
            onSuccess({
              latitude: lat,
              longitude: lon,
              address: addressObj,
            });

        } catch (err) {
          setError('Failed to fetch address');
        }

        setLoading(false);
      },
      err => {
        setError(err.message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  } catch (err) {
    setError(err.message);
    setLoading(false);
  }
};


  return {
    latitude,
    longitude,
    addressText,
    loading,
    error,
    getLocation,
  };
};

export default useCurrentLocation;
