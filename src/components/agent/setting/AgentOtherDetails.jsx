'use client';
import React from 'react';
import ChangePassword from '@/components/shared/ChangePassword';
import Image from 'next/image';
import { useState } from 'react';
import DetailedEdit from './DetailedEdit';
import Button from '@/components/shared/small/Button';

function AgentOtherDetails() {
  const [tab, setTab] = useState('Profile');
  return (
    <div className="rounded-lg bg-white p-4">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-0">
        <div className="flex items-center gap-4">
          <div>
            <Image src="/images/default/agentProfilePic.svg" width={94} height={94} alt="Profile Pic" />
          </div>
          <div>
            <h1 className="text-[19px] font-medium">Alexander</h1>
            <p className="text-[15px] text-[#A3B2C6]">alex@zemlya.com</p>
            <p className="mt-2 flex items-center gap-2 text-[16px] text-[#32343C]">
              Certified Inspection Officer
              <span>
                <Image src="/images/default/quality.png" width={16} height={16} alt="icon" />
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          {['Change Password', 'Profile'].map((item, i) => (
            <div key={i}>
              <Button
                text={item}
                cn={` text-[16px] ${tab === item ? '' : '!bg-buttonSecondary hover:!bg-gray-500'}`}
                onClick={() => setTab(item)}
              >
                {item}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5">
        {tab === 'Change Password' && <ChangePassword />}
        {tab === 'Profile' && <DetailedEdit />}
      </div>
    </div>
  );
}

export default AgentOtherDetails;
