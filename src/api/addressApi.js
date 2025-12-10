import api from './axoisInsance';
import endPoint from './endPoint';

export const addOrEditAddress = async (payload) => {
  try {
    const res = await api.post(endPoint.ADD_EDIT_ADDRESS, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAddress = async (userId) => {
  try {
    const res = await api.get(`${endPoint.ADDRESS_GET}${userId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAddress = async (addressId) => {
  try {
    const res = await api.post(`${endPoint.ADDRESS_DELETE}${addressId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
