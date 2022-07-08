import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationValue, Location } from "../../Interfaces";
const initialStateValue = {
  lat: undefined,
  lng: undefined,
  latitude: undefined,
  longitude: undefined,
};

const locationSlice = createSlice({
  name: "location",
  initialState: { value: initialStateValue },
  reducers: {
    setLocation: (state: Location, action: PayloadAction<LocationValue>) => {
      state.value = action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
