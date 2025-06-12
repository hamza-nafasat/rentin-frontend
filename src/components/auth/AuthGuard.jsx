'use client';

import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { getRedirectPath, hasRouteAccess, getDefaultRouteForRole } from '@/utils/routingUtils';
import Loader from '../Loader';

/**
 * AuthGuard component for protecting routes based on user roles
 * Uses centralized route configuration for consistent access control
 */
const AuthGuard = ({ children }) => {
  const auth = useSelector(state => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const isRedirectingRef = useRef(false);

  // Helper to safely extract user role
  const extractUserRole = userData => {
    if (!userData) return null;
    return userData.role || userData.user?.role || userData.user?.data?.role || userData.data?.role;
  };

  useEffect(() => {
    // Skip if redirect is in progress
    if (isRedirectingRef.current) {
      console.log('AuthGuard: Redirect in progress, skipping check');
      return;
    }

    const isAuthenticated = auth?.isAuthenticated;
    const user = auth?.user;
    const role = extractUserRole(user);

    // Debug auth state
    console.log('AuthGuard State:', {
      isAuthenticated,
      user,
      role,
      pathname,
      isChecking,
      isAuthorized,
    });

    // Handle non-authenticated users
    if (!isAuthenticated || !user) {
      console.log('AuthGuard: User not authenticated');
      isRedirectingRef.current = true;
      router.replace('/login');
      setIsChecking(false);
      setIsAuthorized(false);
      return;
    }

    // Handle missing role
    if (!role) {
      console.error('AuthGuard: No role found in user data:', user);
      toast.error('User role not found. Please log in again.');
      isRedirectingRef.current = true;
      router.replace('/login');
      setIsChecking(false);
      setIsAuthorized(false);
      return;
    }

    // Check if user has access to current path
    const hasAccess = hasRouteAccess(pathname, { role }, isAuthenticated);
    if (!hasAccess) {
      console.log('AuthGuard: Access denied to', pathname);
      toast.error('You are not authorized to access this page');
      isRedirectingRef.current = true;
      router.replace(getDefaultRouteForRole(role));
      setIsAuthorized(false);
      setIsChecking(false);
      return;
    }

    // Check if redirect is needed
    const redirectPath = getRedirectPath(pathname, role);
    if (redirectPath) {
      console.log('AuthGuard: Redirecting to', redirectPath);
      isRedirectingRef.current = true;

      // Use window.location for cross-role navigation
      if (pathname.split('/')[1] !== redirectPath.split('/')[1]) {
        window.location.href = redirectPath;
      } else {
        router.replace(redirectPath);
      }

      setIsAuthorized(false);
      setIsChecking(false);
      return;
    }

    // Access granted
    console.log('AuthGuard: Access granted to', pathname);
    setIsAuthorized(true);
    setIsChecking(false);
    isRedirectingRef.current = false;

    return () => {
      isRedirectingRef.current = false;
    };
  }, [auth, pathname, router]);

  if (isChecking) return <Loader />;
  return isAuthorized ? children : null;
};

export default AuthGuard;
