'use client';
import React from 'react';
import Settings from '@/components/shared/Settings';
import { useState } from 'react';
import CardDetails from '@/components/shared/CardDetails';

function Setting() {
  const [tab, setTab] = useState('Basic Details');
  return (
    <div>
      <div className="flex w-[100%] items-center justify-between bg-[#F4F4F5] sm:w-[458px]">
        {['Basic Details', 'Card Details'].map((item, i) => (
          <div key={i} className="w-[50%]">
            <button
              key={i}
              className={`w-[100%] cursor-pointer rounded-md px-4 py-2 text-[16px] text-[#71717A] ${
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
        {tab === 'Basic Details' && <Settings />}
        {tab === 'Card Details' && <CardDetails />}
      </div>
    </div>
  );
}

export default Setting;
