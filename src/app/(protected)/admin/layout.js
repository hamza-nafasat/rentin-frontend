'use client';
import Loader from '@/components/Loader';
import AdminDashboardLayout from '@/components/shared/AdminDashboardLayout';
import CustomLoading from '@/components/shared/small/CustomLoading';
import React from 'react';
import { useSelector } from 'react-redux';

function AdminLayout({ children }) {
  const { user, isAuthenticated } = useSelector(state => state.auth);

  // Only show the layout if the user is authenticated and has the correct role
  if (!isAuthenticated || !user || user.role !== 'admin') return <Loader />;
  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}

export default AdminLayout;
