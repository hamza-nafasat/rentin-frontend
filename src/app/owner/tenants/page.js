import MyTenants from '@/components/owner/Tenants/MyTenants';
import TenantsHeader from '@/components/owner/Tenants/TenantsHeader';
import TopCards from '@/components/owner/Tenants/TopCards';
import { tenantsCardsData } from '@/data/data';

const Tenants = () => {
  return (
    <div>
      <TenantsHeader />
      <TopCards data={tenantsCardsData} />
      <MyTenants />
    </div>
  );
};

export default Tenants;
