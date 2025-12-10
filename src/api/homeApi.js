import api from './axoisInsance';
import endPoint from './endPoint';

export const getAuthpatner = async (userId) => {
  try {
    const res = await api.get(endPoint.AUTH_PATNER);
    return res.data; 
  } catch (error) {
    console.log("Profile API Error:", error?.response?.data || error);
    throw error;
  }
};

export const getServiceList = async () => {
  try {
    const res = await api.get(endPoint.SERVICE_CATEGORIES);
    return res.data; 
  } catch (error) {
    console.log("Profile API Error:", error?.response?.data || error);
    throw error;
  }
};

export const getBanner = async () => {
  try {
    const res = await api.get(endPoint.BANNER_HOME);
    return res.data; 
  } catch (error) {
    console.log("Profile API Error:", error?.response?.data || error);
    throw error;
  }
};
