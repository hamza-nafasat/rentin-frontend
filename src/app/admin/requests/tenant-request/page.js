import RequestTable from '@/components/admin/request/RequestTable';
import { agentRequestData } from '@/data/data';
import React from 'react';

function TenantRequest() {
  return (
    <div>
      <RequestTable data={agentRequestData} title={'Agent Request'} />
    </div>
  );
}

export default TenantRequest;
