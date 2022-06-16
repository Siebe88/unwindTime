import { configureStore } from '@reduxjs/toolkit'
// ...
import {addNewFavoArray, deleteFavo, switchFavo, addFavo} from "./favoRelaxMethods"

export const store = configureStore({
  reducer: {
    addNewFavoArray: addNewFavoArray,
    addFavo: addFavo,
    deleteFavo: deleteFavo,
    switchFavo: switchFavo
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
