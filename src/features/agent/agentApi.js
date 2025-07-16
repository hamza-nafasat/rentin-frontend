import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const agentApi = createApi({
  reducerPath: 'agentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/agent`,
    credentials: 'include',
  }),
  tagTypes: ['Agent', 'Task', 'Revenue'],
  endpoints: builder => ({
    acceptAgentTask: builder.mutation({
      query: data => ({
        url: '/accept',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Task'],
    }),

    completeAgentTask: builder.mutation({
      query: data => ({
        url: '/complete',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Task'],
    }),

    getTasksByStatus: builder.query({
      query: status => ({
        url: `/tasks/${status}`,
        method: 'GET',
      }),
      providesTags: ['Task'],
    }),

    updateAgentAvailability: builder.mutation({
      query: data => ({
        url: '/update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Agent'],
    }),

    getTotalRevenue: builder.query({
      query: () => ({
        url: '/Revenue',
        method: 'GET',
      }),
      providesTags: ['Revenue'],
    }),

    getAllWorkProperties: builder.query({
      query: () => ({
        url: '/jobs',
        method: 'GET',
      }),
      providesTags: ['Task'],
    }),
    getAgentProperties: builder.query({
      query: agentId => ({
        url: `/properties/${agentId}`,
        method: 'GET',
      }),
      providesTags: ['Agent'],
    }),

    getAgentsByServiceType: builder.query({
      query: type => ({
        url: `/list?type=${type}`,
        method: 'GET',
      }),
      providesTags: ['Agent'],
    }),

    getAgentDetailsById: builder.query({
      query: id => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: ['Agent'],
    }),
    assignTask: builder.mutation({
      query: data => ({
        url: '/assign',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useAcceptAgentTaskMutation,
  useAssignTaskMutation,
  useCompleteAgentTaskMutation,
  useGetTasksByStatusQuery,
  useUpdateAgentAvailabilityMutation,
  useGetTotalRevenueQuery,
  useGetAllWorkPropertiesQuery,
  useGetAgentsByServiceTypeQuery,
  useGetAgentDetailsByIdQuery,
  useGetAgentPropertiesQuery,
} = agentApi;

export const resetAgentApiState = agentApi.util.resetApiState;
