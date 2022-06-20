import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface InitialState {
//   name : string
// }
interface State {
  value: Profile
}
interface Profile {
  uid?: string;
  name?: string;
  email?: string;
  profilePic?: string;
  relaxMethods?: string;
  token?: string;

}

const initialStateValue: Profile = { name: '' };

// interface LoginProfile {
//   type: 'loginProfile'
//   payload: Profile
// }
// interface ChangeProfilePic {
//   type: 'changeProfilePic'
//   payload: string
// }
// interface ChangeProfileName {
//   type: 'changeProfileName'
//   payload: string
// }
// interface ChangeProfileToken {
//   type: 'changeProfileToken'
//   payload: string
// }

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
