import RequestTable from '@/components/admin/request/RequestTable';
import { agentRequestData } from '@/data/data';
import React from 'react';

function SignUpRequest() {
  return (
    <div>
      <RequestTable data={agentRequestData} title={'SignUp Request'} />
    </div>
  );
}

export default SignUpRequest;
