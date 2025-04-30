import AgentHeader from '@/components/owner/agents/AgentHeader';
import MyAgents from '@/components/owner/agents/MyAgents';
import TopCards from '@/components/owner/agents/TopCards';
import { agentCardsData } from '@/data/data';
import React from 'react';

function Agent() {
  return (
    <div>
      <AgentHeader />
      <TopCards data={agentCardsData} />
      <MyAgents role={'agent'} />
    </div>
  );
}

export default Agent;
