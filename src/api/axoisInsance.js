import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔥 Create axios instance
const api = axios.create({
  // baseURL: 'https://api.acdoctor.in/api/v1/',
  baseURL: 'http://127.0.0.1:8080/api/v1/',
  timeout: 15000,
});

// 🔐 Request Interceptor (Attach Token with header)
// api.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem('authToken');

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// ❗ Response Interceptor (UnAuthorized User Handling)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      // Token expired → logout user
      await AsyncStorage.removeItem('authToken');

      // Optionally navigate to login
      NavigationService.navigate("Login");

      console.log("🔥 Token expired. Logging out.");
    }

    return Promise.reject(error);
  }
);

export default api;