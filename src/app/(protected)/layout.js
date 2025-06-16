'use client';

import { setUser, deleteUser } from '@/features/auth/authSlice';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthGuard from '@/components/auth/AuthGuard';
import { useRouter } from 'next/navigation';
import { getRedirectPath, getDefaultRouteForRole } from '@/utils/routingUtils';
import Loader from '@/components/Loader';
import { useGetProfileQuery } from '@/features/auth/authApi';

const ProtectedLayout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, isSuccess, isLoading, isError, isUninitialized, error } = useGetProfileQuery();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const isRedirectingRef = useRef(false);

  // Helper to determine if redirection is crossing role boundaries
  const isCrossingRoleBoundaries = (currentPath, targetPath) => {
    const getRoleFromPath = path => {
      if (path.startsWith('/admin')) return 'admin';
      if (path.startsWith('/owner')) return 'owner';
      if (path.startsWith('/agent')) return 'agent';
      if (path.startsWith('/tenant')) return 'tenant';
      return null;
    };

    const currentRole = getRoleFromPath(currentPath);
    const targetRole = getRoleFromPath(targetPath);
    return currentRole !== targetRole && currentRole !== null && targetRole !== null;
  };

  // Helper to safely extract user role
  const getUserRole = userData => {
    if (!userData) return null;
    return userData.role || userData.user?.role || userData.data?.role;
  };

  // Helper to safely extract user ID
  const getUserId = userData => {
    if (!userData) return null;
    return userData._id || userData.id || userData.user?._id || userData.user?.id;
  };

  // Check if we have valid auth state
  const hasValidAuth = () => {
    if (typeof window === 'undefined') return false;
    try {
      const storedAuth = localStorage.getItem('auth');
      if (!storedAuth) return false;
      const authData = JSON.parse(storedAuth);
      return !!(authData?.user && authData?.isAuthenticated);
    } catch {
      return false;
    }
  };

  useEffect(() => {
    // Skip if redirect is in progress
    if (isRedirectingRef.current) {
      console.log('ProtectedLayout: Redirect in progress, skipping check');
      return;
    }

    // Debug state
    console.log('ProtectedLayout State:', {
      profile: { isSuccess, isLoading, isError, hasData: !!data?.data },
      auth: {
        hasUser: !!user,
        isAuthenticated,
        userRole: getUserRole(user),
        userId: getUserId(user),
        hasValidAuth: hasValidAuth(),
      },
      path: window.location.pathname,
    });

    // Handle invalid auth state
    if (!hasValidAuth()) {
      console.log('ProtectedLayout: Invalid auth state');
      dispatch(deleteUser());
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
      window.location.replace('/login');
      return;
    }

    // Handle profile data update
    if (isSuccess && data?.data) {
      const userData = data.data;
      const userId = getUserId(userData);
      const storeUserId = getUserId(user);

      // Update Redux store if user ID changed
      if (!storeUserId || storeUserId !== userId) {
        console.log('ProtectedLayout: Updating user data');
        dispatch(setUser(userData));
      }

      // Handle role-based redirects
      const userRole = getUserRole(userData);
      if (userRole && isAuthenticated) {
        const currentPath = window.location.pathname;
        const redirectPath = getRedirectPath(currentPath, userRole);

        if (redirectPath) {
          console.log('ProtectedLayout: Redirecting to', redirectPath);
          isRedirectingRef.current = true;

          // Use window.location for cross-role navigation
          if (isCrossingRoleBoundaries(currentPath, redirectPath)) {
            window.location.replace(redirectPath);
          } else {
            router.replace(redirectPath);
          }
          return;
        }
      }
    } else if (!isLoading && !isUninitialized && isAuthenticated && user) {
      // Handle existing user data
      const userRole = getUserRole(user);
      if (userRole) {
        const currentPath = window.location.pathname;
        const redirectPath = getRedirectPath(currentPath, userRole);

        if (redirectPath) {
          console.log('ProtectedLayout: Redirecting to', redirectPath);
          isRedirectingRef.current = true;

          if (isCrossingRoleBoundaries(currentPath, redirectPath)) {
            window.location.replace(redirectPath);
          } else {
            router.replace(redirectPath);
          }
          return;
        }
      }
    }

    // Reset redirect flag
    isRedirectingRef.current = false;

    return () => {
      isRedirectingRef.current = false;
    };
  }, [data, isSuccess, isLoading, isUninitialized, dispatch, router, user, isAuthenticated]);

  // Handle profile fetch errors
  useEffect(() => {
    if (isError) {
      console.error('ProtectedLayout: Profile fetch error:', error);
      dispatch(deleteUser());
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
      window.location.replace('/login');
    }
  }, [isError, error, dispatch]);

  if (isLoading || isUninitialized) {
    console.log('ProtectedLayout: Loading profile');
    return <Loader />;
  }

  return <AuthGuard>{children}</AuthGuard>;
};

export default ProtectedLayout;
