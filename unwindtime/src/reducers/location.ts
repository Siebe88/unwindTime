import { createSlice,PayloadAction } from "@reduxjs/toolkit";

import { Location } from "../interfaces/interfaces";

const initialStateValue : Location  = {
  lat: null,
  lng: null,
  latitude: null,
  longitude: null,
};
const locationSlice = createSlice({
  name: "location",
  initialState: { value: initialStateValue },
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLocation: (state, action:PayloadAction<Location>) => {
      state.value = action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
