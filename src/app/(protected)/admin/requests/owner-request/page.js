import RequestTable from '@/components/admin/request/RequestTable';
import { agentRequestData } from '@/data/data';
import React from 'react';

function OwnerRequest() {
  return (
    <div>
      <RequestTable data={agentRequestData} title={'Owner Request'} />
    </div>
  );
}

export default OwnerRequest;
