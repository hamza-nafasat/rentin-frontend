import AgentProperties from '@/components/agent/propertiies/AgentProperties';
import TopCards from '@/components/agent/propertiies/TopCards';
import PropertyHeader from '@/components/owner/properties/PropertyHeader';
import { agentPropertiesCardsData, propertiesCardsData } from '@/data/data';
import React from 'react';

function Properties() {
  return (
    <div>
      <PropertyHeader title={'Properties History'} />
      <TopCards data={agentPropertiesCardsData} />
      <AgentProperties />
    </div>
  );
}

export default Properties;
