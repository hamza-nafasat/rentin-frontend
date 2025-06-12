'use client';
import Loader from '@/components/Loader';
import DashboardLayout from '@/components/shared/DashboardLayout';
import CustomLoading from '@/components/shared/small/CustomLoading';
import TenantDashboardLayout from '@/components/shared/TenantDashboardLayout';
import { useSelector } from 'react-redux';

const TenantLayout = ({ children }) => {
  const { user, isAuthenticated } = useSelector(state => state.auth);

  // Only show the layout if the user is authenticated and has the correct role
  if (!isAuthenticated || !user || user.role !== 'tenant') return <Loader />;
  return <TenantDashboardLayout>{children}</TenantDashboardLayout>;
};

export default TenantLayout;
