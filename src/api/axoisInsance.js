import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../redux/store';
import { dispatchLogout } from "../redux/store";

// 🔥 Create axios instance
const api = axios.create({
  // baseURL: 'https://api.acdoctor.in/api/v1/',
  baseURL: 'http://10.0.2.2:8080/api/v1', // emulator
  // baseURL: 'http://192.168.1.5:8080/api/v1', // emulator
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// 🔐 Request Interceptor (Attach Token with header)
api.interceptors.request.use(
  async config => {
    const token = store?.getState()?.auth?.accessToken;
    const user = store?.getState()?.auth?.user;
    console.log('user get----',user)
    console.log('token----',token)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    if (status === 401) {
      // Token expired → logout user
      await AsyncStorage.removeItem('accessToken');
      // Redux Update
      // dispatchLogout();
      // NavigationService.navigate('Login');
      console.log('🔥 Token expired. Logging out.');
    }
    return Promise.reject(error);
  },
);

export default api;
