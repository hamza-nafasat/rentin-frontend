'use client';
import React from 'react';
import { useState } from 'react';
import AgentSettings from '@/components/agent/setting/AgentSettings';
import AgentOtherDetails from '@/components/agent/setting/AgentOtherDetails';
import Button from '@/components/shared/small/Button';

function Setting() {
  const [tab, setTab] = useState('Basic Details');
  return (
    <div>
      <div className="flex w-[100%] items-center justify-between rounded-lg bg-white px-4 py-2 sm:w-[458px]">
        {['Basic Details', 'Other Details'].map((item, i) => (
          <div key={i} className="w-[50%]">
            <Button
              key={i}
              text={item}
              cn={`w-[100%] cursor-pointer rounded-lg px-4 py-2 text-[16px] text-[#71717A] ${tab === item ? '' : '!bg-transparent !text-[#474950]'}`}
              onClick={() => setTab(item)}
            >
              {item}
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-5">
        {tab === 'Basic Details' && <AgentSettings />}
        {tab === 'Other Details' && <AgentOtherDetails />}
      </div>
    </div>
  );
}

export default Setting;
