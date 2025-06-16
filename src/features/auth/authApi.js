import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL;
console.log(SERVER_URL);

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/auth`,
    credentials: 'include',
  }),
  tagTypes: ['Profile'],
  endpoints: builder => ({
    register: builder.mutation({
      query: data => ({
        url: '/register',
        method: 'POST',
        body: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          contact: data.contact,
          password: data.password,
          role: data.role,
          otp: data.otp,
        },
      }),
    }),
    registerAgent: builder.mutation({
      query: formData => ({
        url: '/register-agent',
        method: 'POST',
        body: formData, // Using FormData directly since it contains file uploads
      }),
    }),
    login: builder.mutation({
      query: data => ({
        url: '/login',
        method: 'POST',
        body: {
          email: data.email,
          password: data.password,
        },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'GET',
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: '/my-profile',
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),
    verifyEmail: builder.mutation({
      query: data => ({
        url: '/verify-email',
        method: 'POST',
        body: {
          email: data.email,
        },
      }),
    }),
    forgetPassword: builder.mutation({
      query: data => ({
        url: '/forget-password',
        method: 'POST',
        body: {
          email: data.email,
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: data => ({
        url: '/reset-password',
        method: 'POST',
        body: {
          resetToken: data.resetToken,
          newPassword: data.newPassword,
        },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useRegisterAgentMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useVerifyEmailMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;

export const resetAuthApiState = authApi.util.resetApiState;
