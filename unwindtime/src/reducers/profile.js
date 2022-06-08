import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = { displayName: 'test', age: 0, email: '' };

const profileSlice = createSlice({
  name: 'profile',
  initialState: { value: initialStateValue },
  reducers: {
    loginProfile: (state, action) => {
      console.log(action);
      state.value = action.payload;
    },
  },
});

export const { loginProfile } = profileSlice.actions;

export default profileSlice.reducer;
