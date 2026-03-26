// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { myApi } from "../API/apiSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    [myApi.reducerPath]: myApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(myApi.middleware),
});
