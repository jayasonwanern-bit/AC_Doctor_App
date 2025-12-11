import api from './axoisInsance';
import endPoint from './endPoint';

export const getUserProfile = async (userId) => {
  try {
    const res = await api.get(`${endPoint.USER_PROFILE}${userId}`);
    return res.data; 
  } catch (error) {
    console.log("Profile API Error:", error?.response?.data || error);
    throw error;
  }
};

export const updateUserProfile = async payload => {
  try {
    const res = await api.post(endPoint.UPDATE_PROFILE, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async (userId) => {
  try {
    const res = await api.post(`${endPoint.LOG_OUT}${userId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

