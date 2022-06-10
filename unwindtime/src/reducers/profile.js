import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = { name: '' };

const profileSlice = createSlice({
  name: 'profile',
  initialState: { value: initialStateValue },
  reducers: {
    loginProfile: (state, action) => {
      state.value = action.payload;
    },
    changeProfilePic: (state, action) => {
      state.value.profilePic = action.payload;
    },
  },
});

export const { loginProfile, changeProfilePic } = profileSlice.actions;

export default profileSlice.reducer;
