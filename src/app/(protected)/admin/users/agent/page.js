'use client';
import TopCards from '@/components/admin/properties/TopCards';
import MyAgents from '@/components/owner/agents/MyAgents';
import { adminCardsData } from '@/data/data';
import { useGetAccountsQuery } from '@/features/superAdmin/superAdminApi';
import React from 'react';
import { useSelector } from 'react-redux';

function Agent() {
  const { data, isLoading, isError, error } = useGetAccountsQuery('agent');
  const { user, isAuthenticated } = useSelector(state => state.auth);
  console.log('user', user.role);
  console.log('api data', data?.data);

  return (
    <div>
      <h3 className="text-textPrimary text-lg font-semibold md:text-[22px]">Agents</h3>
      <TopCards data={adminCardsData} />
      <MyAgents data={[]} isLoading={isLoading} isError={isError} error={error} role={user.role} />
    </div>
  );
}

export default Agent;
