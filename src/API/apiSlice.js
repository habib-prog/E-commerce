// src/services/api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myApi = createApi({
  reducerPath: "myApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/products/" }),
  endpoints: (builder) => ({
    getProductsCategory: builder.query({
      query: () => "category-list",
    }),
    getProductsByCategory: builder.query({
      query: ({ category, limit = 10, skip = 0 }) =>
        `category/${category}?limit=${limit}&skip=${skip}`,
    }),
  }),
});

export const { useGetProductsCategoryQuery, useGetProductsByCategoryQuery } =
  myApi;
