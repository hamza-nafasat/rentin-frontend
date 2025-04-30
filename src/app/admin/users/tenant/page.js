import TopCards from '@/components/admin/properties/TopCards';
import AdminTenants from '@/components/admin/users/AdminTenants';
import { adminCardsData } from '@/data/data';
import React from 'react';

function Tenant() {
  return (
    <div>
      <h3 className="text-textColor text-lg font-semibold md:text-[22px]">Tenants</h3>
      <TopCards data={adminCardsData} />
      <AdminTenants />
    </div>
  );
}

export default Tenant;
