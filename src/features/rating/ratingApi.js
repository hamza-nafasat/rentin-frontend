import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const ratingApi = createApi({
  reducerPath: 'ratingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/rating`,
    credentials: 'include',
  }),
  tagTypes: ['Ratings'],
  endpoints: builder => ({
    postRating: builder.mutation({
      query: data => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Ratings'],
    }),

    getRatingsByProperty: builder.query({
      query: propertyId => ({
        url: `/${propertyId}`,
        method: 'GET',
      }),
      providesTags: ['Ratings'],
    }),
    postAgentRating: builder.mutation({
      query: data => ({
        url: '/agent',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Ratings'],
    }),

    getRatingsByAgent: builder.query({
      query: agentId => ({
        url: `/agent/${agentId}`,
        method: 'GET',
      }),
      providesTags: ['Ratings'],
    }),
  }),
});

export const {
  usePostRatingMutation,
  useGetRatingsByPropertyQuery,
  usePostAgentRatingMutation,
  useGetRatingsByAgentQuery,
} = ratingApi;

export const resetRatingApiState = ratingApi.util.resetApiState;
