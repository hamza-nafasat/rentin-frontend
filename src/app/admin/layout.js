import AdminDashboardLayout from '@/components/shared/AdminDashboardLayout';
import React from 'react';

function AdminLayout({ children }) {
  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}

export default AdminLayout;
