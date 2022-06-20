import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State, Profile } from '../interfaces/interfaces'


// interface State {
//   value: Profile
// }
// interface Profile {
//   uid?: string;
//   name?: string;
//   email?: string;
//   profilePic?: string;
//   relaxMethods?: string;
//   token?: string;

// }

const initialStateValue: Profile = { name: '' };


const profileSlice = createSlice({
  name: 'profile',
  initialState: { value: initialStateValue },
  reducers: {
    loginProfile: (state : State, action: PayloadAction<Profile> ) => {
      state.value = { ...state.value, ...action.payload };
    },
    changeProfilePic: (state : State, action: PayloadAction<string>) => {
      state.value.profilePic = action.payload;
    },
    changeProfileName: (state : State, action: PayloadAction<string>) => {
      state.value.name = action.payload;
    },
    changeProfileToken: (state : State, action: PayloadAction<string>) => {
      state.value.token = action.payload;
    },
  },
});

export const { loginProfile, changeProfilePic, changeProfileName, changeProfileToken } =
  profileSlice.actions;

export default profileSlice.reducer;
