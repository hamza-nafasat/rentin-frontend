import React from 'react';
import AgentCardHeader from './AgentCardHeader';
import AgentCard from './AgentCard';
import { myAgentData, myPropertiesData } from '@/data/data';

function MyAgents({role}) {
  return (
    <section
      className="mt-4 rounded-lg bg-white p-4"
      style={{ boxShadow: '0px 2px 12px 0px #3582E71A' }}
    >
      <AgentCardHeader />
      <div className="scroll-0 mt-5 grid max-h-[800px] grid-cols-1 gap-6 overflow-y-scroll md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
        {myAgentData.map((card, i) => (
          <AgentCard data={card} key={i} role={role}/>
        ))}
      </div>
    </section>
  );
}

export default MyAgents;
