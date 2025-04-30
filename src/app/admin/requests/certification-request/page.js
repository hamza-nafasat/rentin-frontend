import RequestTable from '@/components/admin/request/RequestTable';
import { agentRequestData } from '@/data/data';
import React from 'react';

function CertificationRequest() {
  return (
    <div>
      <RequestTable data={agentRequestData} title={'Certification Request'} />
    </div>
  );
}

export default CertificationRequest;
