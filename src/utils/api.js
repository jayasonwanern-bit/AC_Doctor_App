// src/utils/api.js
import axios from 'axios';  // Install agar nahi: npm install axios

export const sendOTP = async (mobile) => {
  try {
    const response = await axios.post('https://your-backend.com/send-otp', { mobile: `+91${mobile}` });
    return response.data;  // Assume success
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const verifyOTP = async (mobile, otp) => {
  try {
    const response = await axios.post('https://your-backend.com/verify-otp', { mobile: `+91${mobile}`, otp });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};