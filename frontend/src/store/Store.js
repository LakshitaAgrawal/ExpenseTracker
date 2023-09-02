import { configureStore } from "@reduxjs/toolkit";
import { expenseSlice } from "./Reducer";
import {ApiSlice} from './ApiSlice';

// export const Store = configureStore({
//     reducer : {
//         expense : expenseSlice
//     }
// })

const Store = configureStore({
  reducer: {
    expense: expenseSlice.reducer, // Accessing the reducer property of the expenseSlice
    [ApiSlice.reducerPath]: ApiSlice.reducer
  },

  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(ApiSlice.middleware)
});

export default Store;
