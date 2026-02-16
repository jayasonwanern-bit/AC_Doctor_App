import { createSlice } from '@reduxjs/toolkit';


const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        serviceId: null,
        serviceKey: null,
    },
    reducers: {
        setServiceData: (state, action) => {
            state.serviceId = action.payload.serviceId;
            state.serviceKey = action.payload.serviceKey;
        },
        clearServiceData: (state) => {
            state.serviceId = null;
            state.serviceKey = null;
        },
    },
});

export const {
    setServiceData,
    clearServiceData,
} = serviceSlice.actions;

export default serviceSlice.reducer;
