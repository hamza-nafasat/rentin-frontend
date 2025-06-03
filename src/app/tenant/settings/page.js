import React from 'react';
import Settings from '@/components/shared/Settings';
import { useState } from 'react';
import CardDetails from '@/components/shared/CardDetails';

function Setting() {
  const [tab, setTab] = useState('Basic Details');
  return (
    <div>
      <div className="shadow-custom mb-[18px] inline-flex items-center rounded-[8px] bg-white p-[6px]">
        {['Basic Details', 'Card Details'].map((item, i) => (
          <button
            key={i}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm ${
              tab === item ? 'bg-primary font-semibold text-white' : 'bg-transparent font-medium text-[#474950]'
            }`}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
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
