// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL;

// export const messageApi = createApi({
//   reducerPath: 'messageApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${SERVER_URL}/api/message`,
//     credentials: 'include',
//   }),
//   tagTypes: ['Message'],
//   endpoints: builder => ({
//     getMessagesByChatId: builder.query({
//       query: chatId => `/${chatId}`,
//       providesTags: ['Message'],
//     }),
//     getChatsByRole: builder.query({
//       query: role => `/user/chats?role=${role}`,
//       providesTags: ['Message'],
//     }),
//   }),
// });

// export const { useGetMessagesByChatIdQuery } = messageApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/message`,
    credentials: 'include',
  }),
  tagTypes: ['Message'],
  endpoints: builder => ({
    getMessagesByChatId: builder.query({
      query: chatId => `/${chatId}`,
      providesTags: ['Message'],
    }),
    getChatsByRole: builder.query({
      query: role => `/user/chats?role=${role}`,
      providesTags: ['Message'],
    }),
  }),
});

export const { useGetMessagesByChatIdQuery, useGetChatsByRoleQuery } = messageApi;
