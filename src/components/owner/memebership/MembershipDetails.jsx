'use client';

import { useState } from 'react';
import SubscriptionPlan from './SubscriptionPlan';
import AlreadySubscribed from './AlreadySubscribed';

const MembershipDetails = () => {
  const [tab, setTab] = useState('Subcription Plans');
  return (
    <div>
      <h3 className="text-textColor mb-4 text-lg font-semibold md:text-[22px]">
        Membership Details
      </h3>
      <div className="shadow-custom mb-[18px] inline-flex items-center rounded-[8px] bg-white p-[6px]">
        {['Subcription Plans', 'Already Subscribed'].map((item, i) => (
          <button
            key={i}
            className={`cursor-pointer rounded-md px-4 py-2 text-sm ${
              tab === item
                ? 'bg-primary font-semibold text-white'
                : 'bg-transparent font-medium text-[#474950]'
            }`}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>
      {tab === 'Subcription Plans' && <SubscriptionPlan />}
      {tab === 'Already Subscribed' && <AlreadySubscribed />}
    </div>
  );
};

export default MembershipDetails;
