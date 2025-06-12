import NewAgentCard from '@/components/owner/newAgent/NewAgentCard';
import NewAgentCardHeader from '@/components/owner/newAgent/NewAgentCardHeader';
import NewAgentHeader from '@/components/owner/newAgent/NewAgentHeader';
import React from 'react';

function HiringNewAgent() {
  const cardsData = [
    {
      id: 1,
      inspectionImage: '/images/inspection/Inspection.png',
      userImage: '/images/agent/UserProfile.png',
      name: 'John Doe',
      address: '123 Sukhumvit Rd, Bangkok, Thailand',
      service: 'Property Inspection',
      role: 'Property Showing',
      price: '3,000$',
    },
    {
      id: 2,
      inspectionImage: '/images/inspection/Inspection.png',
      userImage: '/images/agent/UserProfile.png',
      name: 'Jane Smith',
      address: '456 Rama IX Rd, Bangkok, Thailand',
      service: 'Building Inspection',
      role: 'Property Showing',
      price: '3,500$',
    },
    {
      id: 3,
      inspectionImage: '/images/inspection/Inspection.png',
      userImage: '/images/agent/UserProfile.png',
      name: 'Robert Johnson',
      address: '789 Silom Rd, Bangkok, Thailand',
      service: 'Electrical Inspection',
      role: 'Property Showing',
      price: '2,800$',
    },
    {
      id: 4,
      inspectionImage: '/images/inspection/Inspection.png',
      userImage: '/images/agent/UserProfile.png',
      name: 'Alice Brown',
      address: '101 Ploenchit Rd, Bangkok, Thailand',
      service: 'Safety Inspection',
      role: 'Property Showing',
      price: '4,000$',
    },
    {
      id: 5,
      inspectionImage: '/images/inspection/Inspection.png',
      userImage: '/images/agent/UserProfile.png',
      name: 'Charlie Wilson',
      address: '202 Asoke Rd, Bangkok, Thailand',
      service: 'Structural Inspection',
      role: 'Property Showing',
      price: '3,200$',
    },
    {
      id: 6,
      inspectionImage: '/images/inspection/Inspection.png',
      userImage: '/images/agent/UserProfile.png',
      name: 'Emma Davis',
      address: '303 Sathorn Rd, Bangkok, Thailand',
      service: 'HVAC Inspection',
      role: 'Property Showing',
      price: '3,700$',
    },
    {
      id: 7,
      inspectionImage: '/images/inspection/Inspection.png',
      userImage: '/images/agent/UserProfile.png',
      name: 'Liam Anderson',
      address: '404 Ratchadaphisek Rd, Bangkok, Thailand',
      service: 'Fire Safety Inspection',
      role: 'Property Showing',
      price: '4,200$',
    },
  ];
  return (
    <div>
      <NewAgentHeader />
      <section
        className="mt-4 rounded-lg bg-white p-4"
        style={{ boxShadow: '0px 2px 12px 0px #3582E71A' }}
      >
        <NewAgentCardHeader />
        <div className="mt-5 grid max-h-[800px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {cardsData.map((data, index) => (
            <NewAgentCard key={index} data={data} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HiringNewAgent;
