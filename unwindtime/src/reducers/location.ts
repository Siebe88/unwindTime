import { createSlice,PayloadAction } from "@reduxjs/toolkit";

import { Location, LocationState } from "../interfaces/interfaces";



const initialStateValue: Location = {
  lat: 0,
  lng: 0,
  latitude: 0,
  longitude: 0,
};
const locationSlice = createSlice({
  name: "location",
  initialState: { value: initialStateValue },
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLocation: (state: LocationState, action:PayloadAction<Location>) => {
      state.value = action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
