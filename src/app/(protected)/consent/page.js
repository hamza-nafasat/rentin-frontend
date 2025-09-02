'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getDefaultRouteForRole } from '@/utils/routingUtils';
import ConsentForm from '@/components/auth/ConsentForm';

const ConsentPage = () => {
  const router = useRouter();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    // Check if user is authenticated
    // if (!user?.isAuthenticated) {
    //   router.push('/login');
    //   return;
    // }

    // Check if user has already consented - fix the path to access hasConsented
    const hasConsented = user?.user?.data?.hasConsented || user?.user?.hasConsented || user?.hasConsented;
    if (hasConsented) {
      const userRole = user?.user?.role || user?.user?.data?.role || user?.role;
      const defaultRoute = getDefaultRouteForRole(userRole);
      router.push(defaultRoute);
    }
  }, [user, router]); // Remove authState from dependency array

  // Also fix the loading check:
  if (!user?.isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const hasConsented = user?.user?.data?.hasConsented || user?.user?.hasConsented || user?.hasConsented;
  if (hasConsented) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ConsentForm />
    </div>
  );
};

export default ConsentPage;
