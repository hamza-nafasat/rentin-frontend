import RequestTable from '@/components/admin/request/RequestTable';
import { agentRequestData } from '@/data/data';
import React from 'react';

function PropertyRequest() {
  return (
    <div>
      <RequestTable data={agentRequestData} title={'Property Request'} />
    </div>
  );
}

export default PropertyRequest;
