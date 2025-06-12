import RequestTable from '@/components/admin/request/RequestTable';
import { agentRequestData } from '@/data/data';
import React from 'react';

function BuildingRequest() {
  return (
    <div>
      <RequestTable data={agentRequestData} title={'Building Request'} />
    </div>
  );
}

export default BuildingRequest;
