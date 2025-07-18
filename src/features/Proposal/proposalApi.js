import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const proposalApi = createApi({
  reducerPath: 'proposalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/proposal`,
    credentials: 'include', // include cookies
  }),
  tagTypes: ['Proposal'],
  endpoints: builder => ({
    // POST /create
    createProposal: builder.mutation({
      query: body => ({
        url: '/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Proposal'],
    }),

    // GET /single/:proposalId
    getSingleProposal: builder.query({
      query: proposalId => `/single/${proposalId}`,
      providesTags: ['Proposal'],
    }),

    // POST /accept
    acceptProposal: builder.mutation({
      query: body => ({
        url: '/accept',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Proposal'],
    }),

    // POST /reject
    rejectProposal: builder.mutation({
      query: body => ({
        url: '/reject',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Proposal'],
    }),

    // GET /proposals (owner-specific)
    getOwnerProposals: builder.query({
      query: () => '/proposals',
      providesTags: ['Proposal'],
    }),

    // GET /all (combined booking + visit proposals)
    getAllProposals: builder.query({
      query: () => '/all',
      providesTags: ['Proposal'],
    }),
    getTenantProposals: builder.query({
      query: () => '/tenant-all',
      providesTags: ['Proposal'],
    }),
  }),
});

export const {
  useCreateProposalMutation,
  useGetSingleProposalQuery,
  useAcceptProposalMutation,
  useRejectProposalMutation,
  useGetOwnerProposalsQuery,
  useGetAllProposalsQuery,
  useGetTenantProposalsQuery,
} = proposalApi;
