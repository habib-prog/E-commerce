// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { myApi } from "../API/apiSlice";

export const store = configureStore({
  reducer: {
    [myApi.reducerPath]: myApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(myApi.middleware),
});
