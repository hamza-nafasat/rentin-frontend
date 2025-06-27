'use client';
import AgentHeader from '@/components/owner/agents/AgentHeader';
import MyAgents from '@/components/owner/agents/MyAgents';
import TopCards from '@/components/owner/agents/TopCards';
import { agentCardsData } from '@/data/data';
import { useGetMyAgentsQuery } from '@/features/property/propertyApi';
import React from 'react';
import { useSelector } from 'react-redux';

function Agent() {
  const { data, isLoading, isError, error } = useGetMyAgentsQuery();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  console.log('dsdfsdsfdsf', data?.data);

  return (
    <div>
      <AgentHeader />
      <TopCards data={agentCardsData} />
      <MyAgents data={data?.data} isLoading={isLoading} isError={isError} error={error} role={user.role} />
    </div>
  );
}

export default Agent;
