// src/services/api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myApi = createApi({
  reducerPath: "myApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/products/" }),
  endpoints: (builder) => ({
    getProductsCategory: builder.query({
      query: () => "category-list",
    }),
  }),
});

export const { useGetProductsCategoryQuery } = myApi;
