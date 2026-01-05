import api from './axoisInsance';
import endPoint from './endPoint';

export const getAuthpatner = async userId => {
  try {
    const res = await api.get(endPoint.AUTH_PATNER);
    return res.data;
  } catch (error) {
    console.log('API Error:', error?.response?.data || error);
    throw error;
  }
};

export const getServiceList = async () => {
  try {
    const res = await api.get(endPoint.SERVICE_CATEGORIES);
    return res.data;
  } catch (error) {
    console.log('API Error:', error?.response?.data || error);
    throw error;
  }
};

export const getBanner = async () => {
  try {
    const res = await api.get(endPoint.BANNER_HOME);
    return res.data;
  } catch (error) {
    console.log('API Error:', error?.response?.data || error);
    throw error;
  }
};

export const getBrandlist = async () => {
  try {
    const res = await api.get(endPoint.BRAND_LIST);
    return res.data;
  } catch (error) {
    console.log('API Error:', error?.response?.data || error);
    throw error;
  }
};

// free consultancy
export const postConsultancy = async payload => {
  try {
    const res = await api.post(endPoint.CREATE_CONSULT, payload);
    return res.data;
  } catch (error) {
    console.log('API Error:', error?.response?.data || error);
    throw error;
  }
};
export const getConsultancy = async userId => {
  try {
    const res = await api.get(`${endPoint.GET_ALLCONSULT}${userId}`);
    return res.data;
  } catch (error) {
    console.log('API Error:', error?.response?.data || error);
    throw error;
  }
};

// Error code
export const postErrorCode = async payload => {
  try {
    const res = await api.post(endPoint.ERROR_POST, payload);
    return res.data;
  } catch (error) {
    console.log('API Error:', error?.response?.data || error);
    throw error;
  }
};

// AMC Request
export const postAMCRequest = async payload => {
  try {
    const res = await api.post(endPoint.AMC_REQUEST, payload);
    return res.data;
  } catch (error) {
    console.log('API Error:', error?.response?.data || error);
    throw error;
  }
};

// Booking Request
export const postBookingRequest = async payload => {
  try {
    const res = await api.post(endPoint.BOOKING_REQUEST, payload);
    return res.data;
  } catch (error) {
    console.log('API Error:', error?.response?.data || error);
    throw error;
  }
};
