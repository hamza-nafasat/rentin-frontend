import RequestTable from '@/components/admin/request/RequestTable';
import { agentRequestData } from '@/data/data';
import React from 'react';

function AgentRequest() {
  return (
    <div>
      <RequestTable data={agentRequestData} title={'Agent Requests'} />
    </div>
  );
}

export default AgentRequest;
