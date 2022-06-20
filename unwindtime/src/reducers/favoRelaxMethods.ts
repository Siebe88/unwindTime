import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface MethodFavo{

  id: Number;
  name: String;
  svg: String;
  transform: String;
}


export const favoRelaxMethodsSlice = createSlice({
  name: 'favoRelaxMethods',
  initialState: [] as MethodFavo[],
  reducers: {
    addNewFavoArray: (state, action) => {
      action.payload.forEach((methodFavo) => {
        if (!state.some((method) => method['name'] === methodFavo['name'])) {
          state.push(methodFavo);
        }
      });
    },

    addFavo: (state, action) => {
      if (state.some((method) => method['name'] !== action.payload.name)) {
        state.push(action.payload);
      }
    },
    deleteFavo: (state, action) => {
      return state.filter((method) => method['name'] !== action.payload.name);
    },
    switchFavo: (state, action) => {
      if (state.some((method) => method['name'] === action.payload.name)) {
        return state.filter((method) => method['name'] !== action.payload.name);
      } else {
        state.push(action.payload);
      }
    },
  },
});



export const { addNewFavoArray, addFavo, deleteFavo, switchFavo } = favoRelaxMethodsSlice.actions;

export default favoRelaxMethodsSlice.reducer;
