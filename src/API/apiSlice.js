// src/services/api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myApi = createApi({
  reducerPath: "myApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getProductsCategory: builder.query({
      query: () => "products/category-list",
    }),
    getProductsByCategory: builder.query({
      query: ({ category, limit = 10, skip = 0 }) =>
        `products/category/${category}?limit=${limit}&skip=${skip}`,
    }),
    getAllProducts: builder.query({
      query: ({ limit = 30, skip = 0 }) => `products?limit=${limit}&skip=${skip}`,
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    addToCart: builder.mutation({
      query: ({ userId = 1, products }) => ({
        url: "carts/add",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          userId,
          products,
        },
      }),
    }),
  }),
});

export const {
  useGetProductsCategoryQuery,
  useGetProductsByCategoryQuery,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useAddToCartMutation,
} = myApi;
