import TopCards from '@/components/admin/properties/TopCards';
import AdminTenants from '@/components/admin/users/AdminTenants';
import MyTenants from '@/components/owner/Tenants/MyTenants';
import { adminCardsData, CardsData } from '@/data/data';
import React from 'react';

function AdminUsers() {
  return (
    <div>
      <h3 className="text-textColor text-lg font-semibold md:text-[22px]">Tenants Details</h3>
      <TopCards data={adminCardsData} />
      <AdminTenants />
    </div>
  );
}

export default AdminUsers;
