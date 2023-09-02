import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = "http://localhost:8000";

export const ApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURI,
  }),
  endpoints: (builder) => ({
    //  get categories
    getCategories: builder.query({
      // get: "http://localhost:8000/api/categories"
      query: () => "/api/categories",
      providesTags: ['categories']
    }),

    //  get labels
    getLabels: builder.query({
      // get: "http://localhost:8000/api/labels"
      query: () => "/api/labels",
      providesTags: ['labels']
    }),

    // add new transaction
    addTransaction: builder.mutation({
      query: (initialTransaction) => ({
        // post: "http://localhost:8000/api/transaction"
        url: "/api/transaction",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: ['transaction']
    }),

    // delete record
    deleteTransaction: builder.mutation({
      query: (recordId) => ({
        // delete: "http://localhost:8000/api/transaction"
        url: "/api/transaction",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ['transaction']
    }),
  }),
});

export default ApiSlice;
