import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

interface RelaxMethods {
  id: number;
  name: string;
  svg:string;
  transform: string
}



export const favoRelaxMethodsSlice = createSlice({
  name: 'favoRelaxMethods',
  initialState: [],
  reducers: {
    addNewFavoArray: (state: RelaxMethods[], action:PayloadAction<RelaxMethods[]>) => {
      action.payload.forEach((methodFavo) => {
        if (!state.some((method) => method.name === methodFavo.name)) {
          state.push(methodFavo);
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
    switchFavo: (state: RelaxMethods[] | void, action:PayloadAction<RelaxMethods>) => { // probably the filter is the reason of the error check it later. Find a way to do it without filter
      if (state?.some((method) => method.name === action.payload.name)) {               //indexOf?
        return state.filter((method) => method.name !== action.payload.name) as unknown as any;
      }
      else {
         state?.push(action.payload);
      }
    },
  },
});

export const { addNewFavoArray, switchFavo } = favoRelaxMethodsSlice.actions;

export default favoRelaxMethodsSlice.reducer;
