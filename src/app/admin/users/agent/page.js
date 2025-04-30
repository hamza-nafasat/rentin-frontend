import TopCards from '@/components/admin/properties/TopCards';
import MyAgents from '@/components/owner/agents/MyAgents';
import { adminCardsData } from '@/data/data';
import React from 'react';

function Agent() {
  return (
    <div>
      <h3 className="text-textColor text-lg font-semibold md:text-[22px]">Agents</h3>
      <TopCards data={adminCardsData} />
      <MyAgents role={'admin'} />
    </div>
  );
}

export default Agent;
