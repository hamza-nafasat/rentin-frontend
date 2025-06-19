'use client';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { authApi } from './auth/authApi';
import authSlice from './auth/authSlice';
import { propertyApi } from './property/propertyApi';
import locationReducer from './location/locationSlice'; // ✅ notice the name

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [propertyApi.reducerPath]: propertyApi.reducer,
    location: locationReducer, // ✅ reducer only!
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware, propertyApi.middleware),
});

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export { store, StoreProvider };
