'use client';
import RequestTable from '@/components/admin/request/RequestTable';
import { agentRequestData, ownerRequestData, tenantRequestData } from '@/data/data';
import React, { useState } from 'react';

function AdminRequests() {
  const [activeTab, setActiveTab] = useState('Agent Requests');

  const renderComponent = () => {
    switch (activeTab) {
      case 'Agent Requests':
        return <RequestTable data={agentRequestData} title={'Agent Requests'} />;
      case 'Tenant Requests':
        return <RequestTable data={tenantRequestData} title={'Tenant Requests'} />;
      case 'Owner Requests':
        return <RequestTable data={ownerRequestData} title={'Owner Requests'} />;
      default:
        return null;
    }
  };
  const buttonStyle = tab =>
    ` hover:bg-secondary cursor-pointer  rounded w-[131px] ${
      activeTab === tab ? 'bg-primary text-white' : 'bg-transparent text-gray-400'
    }`;

  return (
    <div className="py-4">
      <div className="item-center flex w-[140px] flex-col justify-center space-x-2 rounded-md bg-white p-1 lg:h-10 lg:w-[413px] lg:flex-row">
        <section className="flex flex-col md:gap-1 lg:flex-row">
          <button
            className={buttonStyle('Agent Requests')}
            onClick={() => setActiveTab('Agent Requests')}
          >
            Agent Requests
          </button>
          <button
            className={buttonStyle('Tenant Requests')}
            onClick={() => setActiveTab('Tenant Requests')}
          >
            Tenant Requests
          </button>
          <button
            className={buttonStyle('Owner Requests')}
            onClick={() => setActiveTab('Owner Requests')}
          >
            Owner Requests
          </button>
        </section>
      </div>

      <div className="mt-5 flex w-full">{renderComponent()}</div>
    </div>
  );
}

export default AdminRequests;
