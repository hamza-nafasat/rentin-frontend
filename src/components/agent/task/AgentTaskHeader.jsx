'use client';

import Button from '@/components/shared/small/Button';
import SearchInput from '@/components/shared/small/SearchInput';
import Selector from '@/components/shared/small/Selector';
import Image from 'next/image';
import { useState } from 'react';
import { FaMapLocationDot } from 'react-icons/fa6';
import { IoListSharp } from 'react-icons/io5';

const AgentTaskHeader = ({ tabView, setTabView }) => {
  const [selectedStatus, setSelectedStatus] = useState('Status');
  const [selectedType, setSelectedType] = useState('Type');

  return (
    <section className="flex flex-col items-center justify-between gap-5 border-b border-[#395d8c4d] pb-4 md:flex-row">
      <div className="text-textPrimary flex items-center gap-[10px] text-sm font-semibold">
        <Image src="/images/dashboard/rental.png" width={32} height={32} alt="icon" />
        <p>My Tasks</p>
      </div>
      <div className="flex items-center gap-2 md:gap-6">
        <div className="!w-full xl:!w-[440px]">
          <SearchInput placeholder="properties" cn="" />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Button text={'Inspection'} cn={'!bg-buttonSecondary hover:!bg-gray-500'} />
        <Button text={'Property Showing'} />
      </div>
    </section>
  );
};

export default AgentTaskHeader;
