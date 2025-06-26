'use client';
import NewAgentCard from '@/components/owner/newAgent/NewAgentCard';
import NewAgentCardHeader from '@/components/owner/newAgent/NewAgentCardHeader';
import NewAgentHeader from '@/components/owner/newAgent/NewAgentHeader';
import Modal from '@/components/shared/small/Modal';
import Content8 from '@/components/tenant/popups/Content8';
import { useGetAgentsByServiceTypeQuery } from '@/features/agent/agentApi';
import React, { useState } from 'react';

function HiringNewAgent() {
  const [selectedService, setSelectedService] = useState('Show');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: agentsResponse, isLoading, isError, error } = useGetAgentsByServiceTypeQuery(selectedService);

  const sendContract = () => {
    console.log('send');
    openRequestModal();
  };

  const openRequestModal = () => {
    setIsModalOpen(true);
  };

  const closeRequestModal = () => {
    setIsModalOpen(false);
  };

  const sendRequest = () => {
    console.log('send request');
  };

  const cancelHandle = () => {
    console.log('cancelHandle request');
  };
  const transformedAgents =
    agentsResponse?.data?.map(agent => ({
      id: agent._id,
      inspectionImage: '/images/inspection/Inspection.png',
      userImage: agent.image?.url || '/images/agent/UserProfile.png',
      name: agent.name,
      address: agent.email,
      service: selectedService === 'Show' ? 'Property Showing' : 'Property Inspection',
      role: 'Property Showing',
      price: `${agent.fee}$`,
    })) || [];

  return (
    <div>
      {isModalOpen && (
        <Modal width={500} onClose={closeRequestModal} title="Visit Request">
          <Content8 cancelHandle={cancelHandle} acceptHandle={sendRequest} />
        </Modal>
      )}
      <NewAgentHeader />
      <section className="mt-4 rounded-lg bg-white p-4" style={{ boxShadow: '0px 2px 12px 0px #3582E71A' }}>
        <NewAgentCardHeader selectedService={selectedService} setSelectedService={setSelectedService} />
        <div className="mt-5 grid max-h-[800px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {transformedAgents.map((data, index) => (
            <NewAgentCard sendContract={sendContract} key={index} data={data} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HiringNewAgent;
