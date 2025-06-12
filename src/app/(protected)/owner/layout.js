'use client';
import Loader from '@/components/Loader';
import DashboardLayout from '@/components/shared/DashboardLayout';
import CustomLoading from '@/components/shared/small/CustomLoading';
import { useSelector } from 'react-redux';

const OwnerLayout = ({ children }) => {
  const { user, isAuthenticated } = useSelector(state => state.auth);

  // Only show the layout if the user is authenticated and has the correct role
  if (!isAuthenticated || !user || user.role !== 'owner') return <Loader />;
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default OwnerLayout;
