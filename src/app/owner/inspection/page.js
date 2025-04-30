import { MessageUser } from '@/assets/icon';
import InspectionCard from '@/components/owner/instection/InspectionCard';
import InspectionCardHeader from '@/components/owner/instection/InspectionCardHeader';
import InspectionHeader from '@/components/owner/instection/InspectionHeader';
import Image from 'next/image';
import React from 'react';
import { BsPatchCheckFill } from 'react-icons/bs';
import { FaBookmark } from 'react-icons/fa';
import { GoArrowUpRight } from 'react-icons/go';
import { IoHomeOutline } from 'react-icons/io5';

function Inspection() {
  const cardsData = [
    {
      id: 1,
      inspectionImage: '/images/inspection/Inspection.png',
      userImage: '/images/inspection/user.png',
      name: 'John Doe',
      address: '123 Sukhumvit Rd, Bangkok, Thailand',
      role: 'Certified Inspection Officer',
      service: 'Property Inspection',
      price: '3,000$',
    },
    {
      id: 2,
      inspectionImage: '/images/inspection/Inspection.png',
      userImage: '/images/inspection/user.png',
      name: 'Jane Smith',
      address: '456 Rama IX Rd, Bangkok, Thailand',
      role: 'Senior Inspector',
      service: 'Building Inspection',
      price: '3,500$',
    },
    {
      id: 3,
      inspectionImage: '/images/inspection/Inspection.png',
      userImage: '/images/inspection/user.png',
      name: 'Robert Johnson',
      address: '789 Silom Rd, Bangkok, Thailand',
      role: 'Property Inspector',
      service: 'Electrical Inspection',
      price: '2,800$',
    },
    {
      id: 4,
      inspectionImage: '/images/inspection/Inspection.png',
      userImage: '/images/inspection/user.png',
      name: 'Alice Brown',
      address: '101 Ploenchit Rd, Bangkok, Thailand',
      role: 'Inspection Supervisor',
      service: 'Safety Inspection',
      price: '4,000$',
    },
    {
      id: 5,
      inspectionImage: '/images/inspection/Inspection.png',
      userImage: '/images/inspection/user.png',
      name: 'Charlie Wilson',
      address: '202 Asoke Rd, Bangkok, Thailand',
      role: 'Certified Inspector',
      service: 'Structural Inspection',
      price: '3,200$',
    },
    {
      id: 6,
      inspectionImage: '/images/inspection/Inspection.png',
      userImage: '/images/inspection/user.png',
      name: 'Emma Davis',
      address: '303 Sathorn Rd, Bangkok, Thailand',
      role: 'Senior Inspection Officer',
      service: 'HVAC Inspection',
      price: '3,700$',
    },
    {
      id: 7,
      inspectionImage: '/images/inspection/Inspection.png',
      userImage: '/images/inspection/user.png',
      name: 'Liam Anderson',
      address: '404 Ratchadaphisek Rd, Bangkok, Thailand',
      role: 'Lead Inspector',
      service: 'Fire Safety Inspection',
      price: '4,200$',
    },
  ];
  return (
    <div>
      <InspectionHeader />
      <section
        className="mt-4 w-full rounded-lg bg-white p-4"
        style={{ boxShadow: '0px 2px 12px 0px #3582E71A' }}
      >
        <InspectionCardHeader />
        <div className="mt-5 grid max-h-[800px] grid-cols-1 gap-6 overflow-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {cardsData.map((data, index) => (
            <InspectionCard key={index} data={data} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Inspection;
