import api from './axoisInsance';
import endPoint from './endPoint';

export const getBookingList = async (userId) => {
  try {
    const res = await api.get(`${endPoint.BRAND_LIST}${userId}`);
    return res.data; 
  } catch (error) {
    console.log("Booking API Error:", error?.response?.data || error);
    throw error;
  }
};