import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const stripeApi = createApi({
  reducerPath: 'stripeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/stripe`,
    credentials: 'include',
  }),
  tagTypes: ['Subscription', 'Payment', 'StripeAccount', 'Products'],
  endpoints: builder => ({
    createSubscription: builder.mutation({
      query: data => ({
        url: '/create-subscription',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Subscription'],
    }),

    // Connect Stripe account
    connectAccount: builder.mutation({
      query: () => ({
        url: '/connect',
        method: 'GET',
      }),
      invalidatesTags: ['StripeAccount'],
    }),

    // Pay rent - create payment session
    payRent: builder.mutation({
      query: data => ({
        url: '/pay-rent',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Payment'],
    }),

    // Transfer rent to owner
    transferRent: builder.mutation({
      query: data => ({
        url: '/transfer',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Payment'],
    }),

    // Get Stripe products and prices
    getProducts: builder.query({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),

    // Unsubscribe from subscription
    unsubscribe: builder.mutation({
      query: () => ({
        url: '/unsubscribe',
        method: 'POST',
      }),
      invalidatesTags: ['Subscription'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Force refetch user subscription after successful unsubscribe
          dispatch(stripeApi.util.invalidateTags(['Subscription']));
        } catch {}
      },
    }),
    getUserSubscription: builder.query({
      query: () => ({
        url: '/user-subscription',
        method: 'GET',
      }),
      providesTags: ['Subscription'],
    }),

    // Webhook handler (typically not called from frontend, but included for completeness)
    handleWebhook: builder.mutation({
      query: data => ({
        url: '/webhook',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Subscription', 'Payment'],
    }),
  }),
});

export const {
  useCreateSubscriptionMutation,
  useConnectAccountMutation,
  usePayRentMutation,
  useTransferRentMutation,
  useGetProductsQuery,
  useGetUserSubscriptionQuery,
  useUnsubscribeMutation,
  useHandleWebhookMutation,
} = stripeApi;

export const resetStripeApiState = stripeApi.util.resetApiState;
