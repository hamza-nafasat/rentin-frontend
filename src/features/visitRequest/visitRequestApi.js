import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const visitRequestApi = createApi({
  reducerPath: 'visitRequestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/visit-request`,
    credentials: 'include',
  }),
  tagTypes: ['VisitRequest'],
  endpoints: builder => ({
    // Create Visit Request
    createVisitRequest: builder.mutation({
      query: body => ({
        url: '/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['VisitRequest'],
    }),

    // Accept Visit Request
    acceptVisitRequest: builder.mutation({
      query: body => ({
        url: '/accept',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['VisitRequest'],
    }),

    // Reject Visit Request
    rejectVisitRequest: builder.mutation({
      query: body => ({
        url: '/reject',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['VisitRequest'],
    }),

    // Get All Visit Requests (owner)
    getAllVisitRequests: builder.query({
      query: () => '/all',
      providesTags: ['VisitRequest'],
    }),

    // Get Pending Visit Requests
    getPendingVisitRequests: builder.query({
      query: () => '/pending',
      providesTags: ['VisitRequest'],
    }),

    // Get Visit Request By ID
    getVisitRequestById: builder.query({
      query: id => `/visit/${id}`,
      providesTags: ['VisitRequest'],
    }),
  }),
});

export const {
  useCreateVisitRequestMutation,
  useAcceptVisitRequestMutation,
  useRejectVisitRequestMutation,
  useGetAllVisitRequestsQuery,
  useGetPendingVisitRequestsQuery,
  useGetVisitRequestByIdQuery,
} = visitRequestApi;

export const resetVisitRequestApiState = visitRequestApi.util.resetApiState;
