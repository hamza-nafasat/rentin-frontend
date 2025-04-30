/* eslint-disable react/prop-types */
'use client';
import { useState } from 'react';
import { LuChevronRight } from 'react-icons/lu';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Activities } from '@/assets/icon';

const RecentChat = () => {
  const image = '/images/tenant/dashboard/Bitmap.png';
  return (
    <div className="p-3">
      <h3 className="text-sm font-[600] md:text-base">Recent Chat</h3>
      <div className="custom-scroll mt-1 h-[300px] overflow-auto">
        <SingleUser type="Asif" icon={image} />
        <SingleUser type="Yasir" icon={image} />
        <SingleUser type="Usman" icon={image} />

        <SingleUser type="Sensor Malfunction" icon={image} />
        <SingleUser type="Asif" icon={image} />
        <SingleUser type="Yasir" icon={image} />
        <SingleUser type="Usman" icon={image} />

        <SingleUser type="Sensor Malfunction" icon={image} />
      </div>
    </div>
  );
};

export default RecentChat;

const SingleUser = ({ icon, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className="flex cursor-pointer items-start justify-between gap-4 border-b-[1px] p-2 hover:bg-gray-100"
      onClick={handleOpen}
    >
      <img src={icon} className="w-8 rounded-full" />

      <div className="flex grow flex-col items-start gap-1">
        <h3 className="text-sm">{type}</h3>
        <h5 className="text-[8px]">30 min ago</h5>

        {isOpen && (
          <div className="flex items-center gap-1">
            <RiErrorWarningFill className="text-[#EE4444]" />
            <p className="text-[10px]">
              Driver’s real-time location is not updating correctly in the system
            </p>
          </div>
        )}
      </div>
      <h5 className="text-[8px]">30 min ago</h5>
      <div className={`transition-all duration-300 ${isOpen ? '-rotate-90' : 'rotate-0'} `}>
        <LuChevronRight fontSize={20} />
      </div>
    </div>
  );
};

// export default RecentChat
// export default RecentChat
