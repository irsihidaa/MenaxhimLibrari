import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookApi = createApi({
  reducerPath: 'bookApi',

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().user.user?.token;
        if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
      providesTags: ['Book'],
    }),

    setBooks: builder.mutation({
      query: (newBook) => ({
        url: '/books',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['Book'],
    }),

    updateBooks: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Book'],
    }),

    deleteBooks: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book'],
    }),
  }),
});

export const { useGetBooksQuery, useSetBooksMutation, useUpdateBooksMutation, useDeleteBooksMutation } = bookApi;