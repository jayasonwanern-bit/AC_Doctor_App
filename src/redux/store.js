// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from '../redux/slices/authSlice';
import cartReducer from '../redux/slices/cartSlice';
import serviceReducer from '../redux/slices/serviceSlice';

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user', 'token'],
};

const cartPersistConfig = {
  key: 'cart',
  storage: AsyncStorage,
};

const servicePersistConfig = {
  key: 'service',
  storage: AsyncStorage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedServiceReducer = persistReducer(servicePersistConfig, serviceReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
    service: persistedServiceReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// ******** GLOBAL DISPATCH & SELECT ********
export const dispatch = store.dispatch;
export const select = store.getState;
