import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = { name: '' };

const profileSlice = createSlice({
  name: 'profile',
  initialState: { value: initialStateValue },
  reducers: {
    loginProfile: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    changeProfilePic: (state, action) => {
      state.value.profilePic = action.payload;
    },
    changeProfileName: (state, action) => {
      state.value.name = action.payload;
    },
    changeProfileToken: (state, action) => {
      state.value.token = action.payload;
    },
  },
});

export const { loginProfile, changeProfilePic, changeProfileName, changeProfileToken } =
  profileSlice.actions;

export default profileSlice.reducer;
