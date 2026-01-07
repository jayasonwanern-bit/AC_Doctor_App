import messaging from '@react-native-firebase/messaging';
export const getFcmToken = async () => {
  const token = await messaging().getToken();
  console.log('FCM TOKEN:', token);

  // 👉 backend me save karo
};
