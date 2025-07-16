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
import { visitRequestApi } from './visitRequest/visitRequestApi';
import visitRequestReducer from './visitRequest/visitRequestSlice';
import { messageApi } from './message/messageApi';
import selectedId from './selectedId/selecetdId';
import { bookingRequestApi } from './booking/bookingRequestApi';

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [propertyApi.reducerPath]: propertyApi.reducer,
    [ratingApi.reducerPath]: ratingApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [agentApi.reducerPath]: agentApi.reducer,
    [superAdminApi.reducerPath]: superAdminApi.reducer,
    [visitRequestApi.reducerPath]: visitRequestApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [selectedId.name]: selectedId.reducer,
    [bookingRequestApi.reducerPath]: bookingRequestApi.reducer,

    location: locationReducer,
    visitRequest: visitRequestReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      propertyApi.middleware,
      ratingApi.middleware,
      userApi.middleware,
      bookingRequestApi.middleware,
      agentApi.middleware,
      superAdminApi.middleware,
      visitRequestApi.middleware,
      messageApi.middleware
    ),
});

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export { store, StoreProvider };
