import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RelaxMethods } from '../interfaces/interfaces';


export const favoRelaxMethodsSlice = createSlice({
  name: 'favoRelaxMethods',
  initialState: [],
  reducers: {
    addNewFavoArray: (state: RelaxMethods[], action:PayloadAction<RelaxMethods[]>) => {
      action.payload.forEach((methodFavo) => {
        if (!state.some((method) => method.name === methodFavo.name)) { //avoid directly pushing and mutating the state - fix it
          state = [...state,methodFavo]

        }
      });
    },

    // addFavo: (state: RelaxMethods[], action:PayloadAction<RelaxMethods>) => {
    //   console.log('addFav', action)
    //   if (state.some((method) => method.name !== action.payload.name)) {
    //     state.push(action.payload);
    //   }
    // },
    // deleteFavo: (state: RelaxMethods[], action:PayloadAction<RelaxMethods>) => { // probably the filter is the reason of the error check it later
    //   return state.filter((method) => method.name !== action.payload.name);
    // },
    toggleFavo: (state: RelaxMethods[] | any, action:PayloadAction<RelaxMethods>) => { // probably the filter is the reason of the error check it later. Find a way to do it without filter
      if (state?.some((method) => method.name === action.payload.name)) {
        return state.filter((method: { name: string; }) => method.name !== action.payload.name) as unknown as any;
      }
      else {

         state?.push(action.payload);


      }
    },

  },
});

export const { addNewFavoArray, toggleFavo } = favoRelaxMethodsSlice.actions;

export default favoRelaxMethodsSlice.reducer;


