'use client';
const { configureStore } = require('@reduxjs/toolkit');
// const { authApi } = require('./features/auth/authApi');
import { Provider } from 'react-redux';
import { authApi } from './auth/authApi';
import authSlice from './auth/authSlice';
import { propertyApi } from './property/propertyApi';
import locationSlice from './location/locationSlice';
// import { sensorApi } from './features/sensor/sensorApi';
// import authSlice from './features/auth/authSlice';
// import buildingSlice from './features/building/buildingSlice';
const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,

    // [buildingSlice.name]: buildingSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    // [sensorApi.reducerPath]: sensorApi.reducer,
    [propertyApi.reducerPath]: propertyApi.reducer,
    location: locationSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware, propertyApi.middleware),
});

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export { StoreProvider };
