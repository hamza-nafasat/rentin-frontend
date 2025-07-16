import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const bookingRequestApi = createApi({
  reducerPath: 'bookingRequestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/booking-request`,
    credentials: 'include',
  }),
  tagTypes: ['BookingRequest'],
  endpoints: builder => ({
    // Create a new booking request
    createBookingRequest: builder.mutation({
      query: data => ({
        url: '/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['BookingRequest'],
    }),

    // Accept a booking request
    acceptBookingRequest: builder.mutation({
      query: data => ({
        url: '/accept',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['BookingRequest'],
    }),

    // Reject a booking request
    rejectBookingRequest: builder.mutation({
      query: data => ({
        url: '/reject',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['BookingRequest'],
    }),

    // Get all booking requests
    getAllBookingRequests: builder.query({
      query: () => ({
        url: '/all',
        method: 'GET',
      }),
      providesTags: ['BookingRequest'],
    }),

    // Get pending booking requests
    getPendingBookingRequests: builder.query({
      query: () => ({
        url: '/pending',
        method: 'GET',
      }),
      providesTags: ['BookingRequest'],
    }),

    // Get a single booking request by ID
    getSingleBookingRequest: builder.query({
      query: id => ({
        url: `/single/${id}`,
        method: 'GET',
      }),
      providesTags: ['BookingRequest'],
    }),
  }),
});

export const {
  useCreateBookingRequestMutation,
  useAcceptBookingRequestMutation,
  useRejectBookingRequestMutation,
  useGetAllBookingRequestsQuery,
  useGetPendingBookingRequestsQuery,
  useGetSingleBookingRequestQuery,
} = bookingRequestApi;

export const resetBookingRequestApiState = bookingRequestApi.util.resetApiState;
