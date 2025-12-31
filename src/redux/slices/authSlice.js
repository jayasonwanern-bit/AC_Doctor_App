// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: null,
  user: null,
  accessToken: null,
  signupToken: null,
  isInternetConected: true,
  celcius: null,
  brandList: [],
  brandName: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setAddress: (state, action) => {
      state.address = action.payload.address;
    },
    setCelcius: (state, action) => {
      state.celcius = action.payload.celcius;
    },
    setBrandList: (state, action) => {
      state.brandList = action.payload.brandList;
    },
    setBrand: (state, action) => {
      state.brandName = action.payload.brandName;
    },
    logout: state => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const {
  setToken,
  logout,
  setUser,
  setAddress,
  setBrandList,
  setCelcius,
  setBrand,
} = authSlice.actions;

export default authSlice.reducer;
