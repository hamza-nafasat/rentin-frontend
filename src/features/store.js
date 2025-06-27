'use client';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { authApi } from './auth/authApi';
import authSlice from './auth/authSlice';
import { propertyApi } from './property/propertyApi';
import locationReducer from './location/locationSlice';
import { ratingApi } from './rating/ratingApi';
import { userApi } from './user/userApi';
import { agentApi } from './agent/agentApi';
import { superAdminApi } from './superAdmin/superAdminApi';

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [propertyApi.reducerPath]: propertyApi.reducer,
    [ratingApi.reducerPath]: ratingApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [agentApi.reducerPath]: agentApi.reducer,
    [superAdminApi.reducerPath]: superAdminApi.reducer,
    location: locationReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      propertyApi.middleware,
      ratingApi.middleware,
      userApi.middleware,
      agentApi.middleware,
      superAdminApi.middleware
    ),
});

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export { store, StoreProvider };
