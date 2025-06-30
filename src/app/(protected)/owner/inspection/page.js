'use client';

import { MessageUser } from '@/assets/icon';
import InspectionCard from '@/components/owner/instection/InspectionCard';
import InspectionCardHeader from '@/components/owner/instection/InspectionCardHeader';
import InspectionHeader from '@/components/owner/instection/InspectionHeader';
import Image from 'next/image';
import { BsPatchCheckFill } from 'react-icons/bs';
import { FaBookmark } from 'react-icons/fa';
import { GoArrowUpRight } from 'react-icons/go';
import { IoHomeOutline } from 'react-icons/io5';
import { useGetAgentsByServiceTypeQuery } from '@/features/agent/agentApi';
import React, { useState } from 'react';

function Inspection() {
  const [selectedService, setSelectedService] = useState('Inspection');

  const { data: agentsResponse, isLoading, isError, error } = useGetAgentsByServiceTypeQuery(selectedService);

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
      <InspectionHeader />
      <section
        className="shadow-card mt-4 w-full rounded-lg bg-white p-4"
        style={{ boxShadow: '0px 2px 12px 0px #3582E71A' }}
      >
        <InspectionCardHeader selectedService={selectedService} setSelectedService={setSelectedService} />
        <div className="mt-5 grid max-h-[800px] grid-cols-1 gap-6 overflow-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {transformedAgents.map((data, index) => (
            <InspectionCard key={index} data={data} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Inspection;
