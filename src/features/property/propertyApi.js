import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const propertyApi = createApi({
  reducerPath: 'propertyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/property`,
    credentials: 'include',
  }),
  tagTypes: ['Property', 'Agents', 'Tenants'],
  endpoints: builder => ({
    createProperty: builder.mutation({
      query: formData => ({
        url: '/create-property',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Property'],
    }),

    getMyAllProperties: builder.query({
      query: () => ({
        url: '/my-all',
        method: 'GET',
      }),
      providesTags: ['Property'],
    }),
    getMyAllAgentProperties: builder.query({
      query: () => ({
        url: '/my-agent-all',
        method: 'GET',
      }),
      providesTags: ['Property'],
    }),

    getPropertiesByOwnerId: builder.query({
      query: ownerId => ({
        url: `/owner/${ownerId}`, // Adjust based on your backend route
        method: 'GET',
      }),
      providesTags: ['Property'],
    }),

    getSingleProperty: builder.query({
      query: propertyId => ({
        url: `/single/${propertyId}`,
        method: 'GET',
      }),
    }),

    deleteSingleProperty: builder.mutation({
      query: propertyId => ({
        url: `/single/${propertyId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Property'],
    }),

    hireAgent: builder.mutation({
      query: data => ({
        url: '/agent',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Agents'],
    }),

    getMyAgents: builder.query({
      query: () => ({
        url: '/my-Agents',
        method: 'GET',
      }),
      providesTags: ['Agents'],
    }),

    getOwnerTenants: builder.query({
      query: () => ({
        url: '/my-Tenant',
        method: 'GET',
      }),
      providesTags: ['Tenants'],
    }),
  }),
});

export const {
  useCreatePropertyMutation,
  useGetAllPropertiesQuery,
  useGetMyAllPropertiesQuery,

  useGetMyAllAgentPropertiesQuery,
  useGetSinglePropertyQuery,
  useDeleteSinglePropertyMutation,
  useHireAgentMutation,
  useGetMyAgentsQuery,
  useGetOwnerTenantsQuery,
  useGetPropertiesByOwnerIdQuery,
} = propertyApi;

export const resetPropertyApiState = propertyApi.util.resetApiState;
