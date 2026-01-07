import api from './axoisInsance';
import endPoint from './endPoint';

// My booking list
export const getBookingList = async userId => {
  try {
    const res = await api.get(`${endPoint.BOOKING_LIST}${userId}`);
    return res.data;
  } catch (error) {
    console.log('Booking API Error:', error?.response?.data || error);
    throw error;
  }
};

// booking Detail
export const getBookingDetail = async bookId => {
  try {
    const res = await api.get(`${endPoint.BOOKING_DETAIL}${bookId}`);
    return res.data;
  } catch (error) {
    console.log('Book detail API Error:', error?.response?.data || error);
    throw error;
  }
};
