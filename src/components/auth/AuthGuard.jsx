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

  // Helper to determine if redirection is crossing role boundaries
  const isCrossingRoleBoundaries = (currentPath, targetPath) => {
    // Extract the role segment from path
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

  useEffect(() => {
    // Debug the auth state
    console.log('Auth state in AuthGuard:', auth?.user?.user?.data?.role);

    // Return if a redirect is already in progress
    if (isRedirectingRef.current) {
      console.log('Redirect already in progress, skipping auth check');
      return;
    }

    // Extract user and authentication status safely
    const isAuthenticated = auth?.isAuthenticated || false;
    const user = auth?.user || null;
    console.log('useruseruser', user);

    // Handle non-authenticated users
    if (!isAuthenticated || !user) {
      console.log('User not authenticated, redirecting to login');
      isRedirectingRef.current = true;
      router.replace('/login');
      if (isChecking) setIsChecking(false);
      if (isAuthorized) setIsAuthorized(false);
      return;
    }

    // Get user role with proper null checks
    let role = auth?.user?.user?.data?.role;
    console.log('skjdhdkdksdcksdbcsdcsdcsdbc', user);

    // Try different paths to find the role
    if (user.role) {
      console.log('1sd');

      role = user.role;
      console.log('2sd');
    } else if (user.data && user.data.role) {
      console.log('3sd');
      role = user.data.role;
    }
    console.log('4sd', role);

    if (!role) {
      console.error('No role found in user object:', user);
      toast.error('User role not found. Please log in again.');
      isRedirectingRef.current = true;
      router.replace('/login');
      if (isChecking) setIsChecking(false);
      if (isAuthorized) setIsAuthorized(false);
      return;
    }

    console.log('Current role:', role, 'Current path:', pathname);

    // Use centralized utility to determine if redirection is needed
    const redirectPath = getRedirectPath(pathname, role);

    if (redirectPath) {
      console.log('Redirecting from', pathname, 'to', redirectPath);

      // Only show toast error if redirecting due to unauthorized access, not for convenience redirects
      if (pathname !== '/' && !pathname.includes('/login') && !pathname.includes('/signup')) {
        toast.error('You are not authorized to access this page');
      }

      isRedirectingRef.current = true;

      // Determine if this redirect crosses role boundaries
      if (isCrossingRoleBoundaries(pathname, redirectPath)) {
        console.log('Cross-role redirect - using hard refresh');
        // Use window.location for a full page refresh when crossing role boundaries
        window.location.href = redirectPath;
      } else {
        // Use Next.js router for same-role navigation
        router.replace(redirectPath);
      }

      if (isAuthorized) setIsAuthorized(false);
      if (isChecking) setIsChecking(false);
      return;
    }

    // If we get here, the user is allowed to access this route
    console.log('Access allowed to', pathname);
    if (!isAuthorized) setIsAuthorized(true);
    if (isChecking) setIsChecking(false);

    // Reset the redirect flag
    isRedirectingRef.current = false;
  }, [auth, pathname, router, isAuthorized, isChecking]);

  // Show loader while checking authorization
  if (isChecking) {
    return <Loader />;
  }

  // Only render children if user is authorized
  return isAuthorized ? children : null;
};

export default AuthGuard;
