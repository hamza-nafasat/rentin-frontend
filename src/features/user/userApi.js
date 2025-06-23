import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/user`,
    credentials: 'include',
  }),
  tagTypes: ['User'],
  endpoints: builder => ({
    getUserById: builder.query({
      query: userId => ({
        url: `/${userId}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const { useGetUserByIdQuery } = userApi;

export const resetUserApiState = userApi.util.resetApiState;
