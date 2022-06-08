import { createSlice } from '@reduxjs/toolkit';

export const favoRelaxMethodsSlice = createSlice({
  name: 'favoRelaxMethods',
  initialState: [],
  reducers: {
    addFavo: (state, action) => {
      state.push(action.payload);
    },
    deleteFavo: (state, action) => {
      return state.filter((method) => method.name !== action.payload.name);
    },
    switchFavo: (state, action) => {
      if (state.some((method) => method.name === action.payload.name)) {
        return state.filter((method) => method.name !== action.payload.name);
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const { addFavo, deleteFavo, switchFavo } = favoRelaxMethodsSlice.actions;

export default favoRelaxMethodsSlice.reducer;
