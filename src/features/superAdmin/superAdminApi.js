import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const superAdminApi = createApi({
  reducerPath: 'superAdminApi',

  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/superAdmin`,
    credentials: 'include',
  }),

  tagTypes: ['Account', 'Property', 'Tenant'],

  endpoints: builder => ({
    // ───────────── Accounts ─────────────
    getPendingAccounts: builder.query({
      query: (role = 'Owner') => ({
        url: '/pending',
        params: { role },
      }),
      providesTags: result =>
        result ? [...result.map(({ _id }) => ({ type: 'Account', id: _id })), 'Account'] : ['Account'],
    }),

    approveAccount: builder.mutation({
      query: ({ accountId }) => ({
        url: '/approve',
        method: 'PUT',
        body: { accountId },
      }),
      invalidatesTags: (_r, _e, { accountId }) => [{ type: 'Account', id: accountId }],
    }),

    getAccounts: builder.query({
      query: (role = 'Agent') => ({
        url: '/account',
        params: { role },
      }),
      //   providesTags: result =>
      //     result ? [...result.map(({ _id }) => ({ type: 'Account', id: _id })), 'Account'] : ['Account'],
    }),

    // ───────────── Properties ─────────────
    approveProperty: builder.mutation({
      query: ({ propertyId, status }) => ({
        url: '/property',
        method: 'PUT',
        body: { propertyId, status }, // status = 'approve' | 'reject'
      }),
      invalidatesTags: (_r, _e, { propertyId }) => [{ type: 'Property', id: propertyId }],
    }),

    getPropertyList: builder.query({
      query: () => '/list',
      providesTags: result =>
        result ? [...result.map(({ _id }) => ({ type: 'Property', id: _id })), 'Property'] : ['Property'],
    }),

    getPendingProperties: builder.query({
      query: () => '/pending-Property',
      providesTags: ['Property'],
    }),

    // ───────────── Tenants ─────────────
    getTenantList: builder.query({
      query: () => '/tenant',
      providesTags: ['Tenant'],
    }),
  }),
});

// Hooks (auto-generated names = endpoint name in camelCase + Query/Mutation)
export const {
  useGetPendingAccountsQuery,
  useApproveAccountMutation,
  useGetAccountsQuery,
  useApprovePropertyMutation,
  useGetPropertyListQuery,
  useGetPendingPropertiesQuery,
  useGetTenantListQuery,
} = superAdminApi;
