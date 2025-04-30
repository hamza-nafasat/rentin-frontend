import MyProperties from '@/components/admin/properties/MyProperties';
import TopCards from '@/components/admin/properties/TopCards';
import { CardsData, homeCardsData, propertiesCardsData } from '@/data/data';
import React from 'react';

function AdminProperties() {
  return (
    <div>
      <h3 className="text-textColor text-lg font-semibold md:text-[22px]">Properties</h3>
      <TopCards data={CardsData} />
      <MyProperties />
    </div>
  );
}

export default AdminProperties;
