import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  coordinates: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
    clearCoordinates: state => {
      state.coordinates = null;
    },
  },
});

export const { setCoordinates, clearCoordinates } = locationSlice.actions;
export const selectCoordinates = state => state.location.coordinates;

// ✅ Export only the reducer!
export default locationSlice.reducer;
