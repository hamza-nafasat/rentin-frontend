import DashboardLayout from '@/components/shared/DashboardLayout';
import TenantDashboardLayout from '@/components/shared/TenantDashboardLayout';

const TenantLayout = ({ children }) => {
  return <TenantDashboardLayout>{children}</TenantDashboardLayout>;
};

export default TenantLayout;
