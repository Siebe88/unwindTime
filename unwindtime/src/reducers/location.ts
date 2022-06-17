import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  lat: null,
  lng: null,
  latitude: null,
  longitude: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState: { value: initialStateValue },
  reducers: {
    setLocation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
