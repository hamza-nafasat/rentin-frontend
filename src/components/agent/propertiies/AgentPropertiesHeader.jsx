'use client';

import SearchInput from '@/components/shared/small/SearchInput';
import Selector from '@/components/shared/small/Selector';
import Image from 'next/image';
import { useState } from 'react';
import { FaMapLocationDot } from 'react-icons/fa6';
import { IoListSharp } from 'react-icons/io5';

const AgentPropertiesHeader = ({ tabView, setTabView }) => {
  const [selectedStatus, setSelectedStatus] = useState('Status');
  const [selectedType, setSelectedType] = useState('Type');

  return (
    <section className="flex flex-col items-center justify-between gap-5 border-b border-[#395d8c4d] pb-4 md:flex-row">
      <div className="text-textPrimary flex items-center gap-[10px] text-sm font-semibold">
        <Image src="/images/dashboard/rental.png" width={32} height={32} alt="icon" />
        <p>My Properties</p>
      </div>
      <div className="flex items-center gap-2 md:gap-6">
        <div className="!w-full xl:w-[440px]">
          <SearchInput placeholder="properties" cn="" />
        </div>
        <Selector
          lists={['All', 'Active', 'Inactive']}
          selectedOption={selectedStatus}
          setSelectedOption={setSelectedStatus}
        />
        <Selector lists={['Rented', 'Free']} selectedOption={selectedType} setSelectedOption={setSelectedType} />
      </div>
      <div className="flex items-center gap-6">
        {['Map View', 'Grid View'].map((view, i) => (
          <button
            key={i}
            className={`flex h-[30px] cursor-pointer items-center gap-[6px] rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-[#01367f] ${
              view === tabView ? 'bg-primary' : 'bg-[#7C848DB2]'
            }`}
            onClick={() => setTabView(view)}
          >
            {view === 'Map View' ? (
              <FaMapLocationDot className="text-base text-white" />
            ) : (
              <IoListSharp className="text-base text-white" />
            )}
            {view}
          </button>
        ))}
      </div>
    </section>
  );
};

export default AgentPropertiesHeader;
