import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateProfile, Profile } from "../../Interfaces";

const initialStateValue = { name: "" };

const profileSlice = createSlice({
  name: "profile",
  initialState: { value: initialStateValue },
  reducers: {
    loginProfile: (state: { value: Profile }, action: { payload: Profile }) => {
      state.value = { ...state.value, ...action.payload };
    },
    changeProfilePic: (state: StateProfile, action: PayloadAction<string>) => {
      state.value.profilePic = action.payload;
    },
    changeProfileName: (state: StateProfile, action: PayloadAction<string>) => {
      state.value.name = action.payload;
    },
    changeProfileToken: (
      state: StateProfile,
      action: PayloadAction<string>
    ) => {
      state.value.token = action.payload;
    },
  },
});

export const {
  loginProfile,
  changeProfilePic,
  changeProfileName,
  changeProfileToken,
} = profileSlice.actions;

export default profileSlice.reducer;
