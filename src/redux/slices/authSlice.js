// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address:null,
  user: null,
  accessToken: null,
  signupToken: null,
  isInternetConected: true,
  brandList: [], 
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
     setBrandList: (state, action) => {
      state.brandList = action.payload.brandList;
    },

    logout: state => {
      state.user = null;
      state.accessToken = null;
    },
    
  },
});

export const { setToken, logout, setUser,setAddress,setBrandList } = authSlice.actions;

export default authSlice.reducer;
