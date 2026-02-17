import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../redux/store';
import { dispatchLogout } from '../redux/store';
import { Alert } from 'react-native';

// 🔥 Create axios instance
const api = axios.create({
  baseURL: 'https://api.acdoctor.in/api/v1/',
  // baseURL: 'http://10.0.2.2:8080/api/v1',
  // baseURL: "http://137.59.53.70:8080/api/v1",
  // baseURL: 'https://devyn-unawaked-kaylin.ngrok-free.dev/api/v1',
  // baseURL: 'https://hematoid-autohypnotic-rey.ngrok-free.dev/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// 🔐 Request Interceptor (Attach Token with header)
api.interceptors.request.use(
  async config => {
    const reduxToken = store?.getState()?.auth?.accessToken;
    const storageToken = await AsyncStorage.getItem('accessToken');
    const token = reduxToken || storageToken;

    console.log('------ REQUEST DEBUG ------');
    console.log('URL:', config.url);
    console.log('Redux Token:', reduxToken);
    console.log('Storage Token:', storageToken);
    console.log('Final Token Used:', token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization Header:', config.headers.Authorization);
    } else {
      console.log('❌ No Token Found');
      delete config.headers.Authorization;
    }

    return config;
  },
  error => Promise.reject(error),
);


// ❗ Response Interceptor (UnAuthorized User Handling)

api.interceptors.response.use(
  response => response,
  async error => {
    const status = error?.response?.status;

    // 🔑 Read token properly
    const reduxToken = store?.getState()?.auth?.accessToken;
    const storageToken = await AsyncStorage.getItem('accessToken');
    const token = reduxToken || storageToken;

    if (status === 401 && token) {

      await AsyncStorage.removeItem('accessToken');

      Alert.alert(
        'Session Expired',
        'Your session has expired. Please login again.',
        [
          {
            text: 'OK',
            onPress: () => {
              // navigation handled below
            },
          },
        ],
      );
    }

    return Promise.reject(error);
  },
);

export default api;
