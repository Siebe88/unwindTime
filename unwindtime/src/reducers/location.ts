import { createSlice  } from "@reduxjs/toolkit";
interface initialState {
  lat: number | null;
  lng: number | null;
  latitude: number | null;
  longitude: number | null;
}
// interface initialState {
//   lat: any,
//   lng: any,
//   latitude: any,
//   longitude: any
// }
const initialStateValue:initialState  = {
  lat: null,
  lng: null,
  latitude: null,
  longitude: null,
};
const locationSlice = createSlice({
  name: "location",
  initialState: { value: initialStateValue },
  reducers: {
    setLocation: (state, action ) => {
      state.value = action.payload;
    },
  },
});
export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;