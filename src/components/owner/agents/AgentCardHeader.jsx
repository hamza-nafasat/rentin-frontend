'use client';

import SearchInput from '@/components/shared/small/SearchInput';
import Selector from '@/components/shared/small/Selector';
import Image from 'next/image';
import { useState } from 'react';
import { FaMapLocationDot } from 'react-icons/fa6';
import { IoListSharp } from 'react-icons/io5';

const AgentCardHeader = ({ tabView, setTabView }) => {
  const [selectedStatus, setSelectedStatus] = useState('Favorite');
  const [selectedType, setSelectedType] = useState('Type');

  return (
    <section className="flex flex-col items-center justify-between gap-5 border-b border-[#395d8c4d] pb-4 md:flex-row">
      <div className="text-textColor flex items-center gap-[10px] text-sm font-semibold">
        <Image src="/images/dashboard/rental.png" width={32} height={32} alt="icon" />
        My On Demand Agents
      </div>
      <div className="flex items-center gap-2 md:gap-6">
        <div className="lg:w-[440px]">
          <SearchInput placeholder="properties" cn="" />
        </div>
        <Selector
          lists={['All', 'Active', 'Inactive']}
          selectedOption={selectedStatus}
          setSelectedOption={setSelectedStatus}
        />
        <Selector
          lists={['Rented', 'Free']}
          selectedOption={selectedType}
          setSelectedOption={setSelectedType}
        />
      </div>
    </section>
  );
};

export default AgentCardHeader;
