'use client';
import React from 'react';
import { useState } from 'react';
import AgentSettings from '@/components/agent/setting/AgentSettings';
import AgentOtherDetails from '@/components/agent/setting/AgentOtherDetails';

function Setting() {
  const [tab, setTab] = useState('Basic Details');
  return (
    <div>
      <div className="flex w-[100%] items-center justify-between bg-[#F4F4F5] sm:w-[458px]">
        {['Basic Details', 'Other Details'].map((item, i) => (
          <div key={i} className="w-[50%]">
            <button
              key={i}
              className={`w-[100%] cursor-pointer rounded-lg px-4 py-2 text-[16px] text-[#71717A] ${
                tab === item ? 'bg-white font-semibold text-black' : ''
              }`}
              onClick={() => setTab(item)}
            >
              {item}
            </button>
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
