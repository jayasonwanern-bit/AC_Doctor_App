// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  assessToken: null,
  signupToken: null,
  isInternetConected: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.assessToken = action.payload.assessToken;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    logout: state => {
      state.user = null;
      state.assessToken = null;
    },
    
  },
});

export const { setToken, logout, setUser } = authSlice.actions;

export default authSlice.reducer;
