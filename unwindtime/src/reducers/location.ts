import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface initialState {
  lat: number | null;
  lng: number | null;
  latitude: number | null;
  longitude: number | null;
}

const initialStateValue: initialState = {
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
    setLocation: (state, action:PayloadAction<initialState>) => {
      state.value = action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
