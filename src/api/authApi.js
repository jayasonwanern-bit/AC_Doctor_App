import api from './axoisInsance';
import endPoint from './endPoint';

export const loginUser = async (data) => {
  try {
    const res = await api.post(endPoint.LOGIN, data);
    console.log("Login Response:", res.data);   
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const VerifyOTP = async (data) => {
  try {
    const res = await api.post(endPoint.VERIFY_OTP, data);
    console.log("VerifyOTP Response:", res.data);   
    return res.data;
  } catch (error) {
    throw error;
  }
};
