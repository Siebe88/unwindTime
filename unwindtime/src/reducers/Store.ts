import { configureStore } from '@reduxjs/toolkit'
// ...
import {addNewFavoArray, deleteFavo, switchFavo, addFavo} from "./favoRelaxMethods"

export const store = configureStore({
  reducer: {
    addNewFavoArray: addNewFavoArray as any,
    addFavo: addFavo as any,
    deleteFavo: deleteFavo as any,
    switchFavo: switchFavo as any
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
