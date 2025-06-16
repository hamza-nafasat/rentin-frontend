'use client';
import Loader from '@/components/Loader';
import AgentDashboardLayout from '@/components/shared/AgentDashboardLayout';
import CustomLoading from '@/components/shared/small/CustomLoading';
import { useSelector } from 'react-redux';

const AgentLayout = ({ children }) => {
  const { user, isAuthenticated } = useSelector(state => state.auth);

  // Only show the layout if the user is authenticated and has the correct role
  if (!isAuthenticated || !user || user.role !== 'agent') return <Loader />;
  return <AgentDashboardLayout>{children}</AgentDashboardLayout>;
};

export default AgentLayout;
