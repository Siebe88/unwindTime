import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RelaxOption} from "../../Interfaces"



export const favoRelaxMethodsSlice = createSlice({
  name: 'favoRelaxMethods',
  initialState: [], 
  reducers: {
    addNewFavoArray: (state: RelaxOption[], action:PayloadAction<RelaxOption[]>) => {
      action.payload.forEach((methodFavo) => {
        if (!state.some((method) => method['name'] === methodFavo['name'])) {
          state.push(methodFavo);
        }
      });
    },

    addFavo: (state: RelaxOption[], action:PayloadAction<RelaxOption>) => {
      if (state.some((method) => method['name'] !== action.payload.name)) {
        state.push(action.payload);
      }
    },
    deleteFavo: (state: RelaxOption[], action:PayloadAction<RelaxOption>) => {
       state.filter((method) => method['name'] !== action.payload.name);
    },
    switchFavo: (state: RelaxOption[] | void, action:PayloadAction<RelaxOption>) => {
  
      
     
      if (state?.some((method) => method.name === action.payload.name)) {
        return state.filter((method) => method.name !== action.payload.name) as unknown as any;
      } else {
        state?.push(action.payload);
      }
    },
  },
});



export const { addNewFavoArray, addFavo, deleteFavo, switchFavo } = favoRelaxMethodsSlice.actions;

export default favoRelaxMethodsSlice.reducer;
