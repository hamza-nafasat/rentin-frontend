'use client';

import { useState } from 'react';
import SubscriptionPlan from './SubscriptionPlan';
import AlreadySubscribed from './AlreadySubscribed';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Modal from '@/components/shared/small/Modal';
import { RxCross2 } from 'react-icons/rx';
import { FaCircleCheck } from 'react-icons/fa6';
import { BiSolidError } from 'react-icons/bi';
import PaymentModal from '../../shared/small/PaymentModal';

const MembershipDetails = () => {
  const [tab, setTab] = useState('Subcription Plans');
  const searchParams = useSearchParams();
  const router = useRouter();

  console.log(searchParams);

  const handleClearStatus = () => {
    const params = new URLSearchParams(searchParams.toString());
    // console.log(params.get('status'));
    params.delete('status');
    // console.log(params.get('status'));
    router.replace(`?${params}`);
    // params.delete('status');
    // console.log('params', `${params.toString()}`);
    // router.replace(`?${params.toString()}`);
  };

  return (
    <>
      <div>
        <h3 className="text-textPrimary mb-4 text-lg font-semibold md:text-[22px]">Membership Details</h3>
        <div className="shadow-custom mb-[18px] inline-flex items-center rounded-[8px] bg-white p-[6px]">
          {['Subcription Plans', 'Already Subscribed'].map((item, i) => (
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
        {tab === 'Subcription Plans' && <SubscriptionPlan />}
        {tab === 'Already Subscribed' && <AlreadySubscribed />}
      </div>
      {searchParams.get('status') === 'success' && (
        <PaymentModal onClose={handleClearStatus}>
          <div className="flex w-full flex-col items-center gap-6 overflow-auto">
            <FaCircleCheck fill="#34C759" size={67} />
            <div className="flex w-full flex-col gap-3">
              <h3 className="text-textPrimary text-2xl font-semibold">Payment Successful</h3>
              <p className="text-textPrimary text-base">
                Your payment was completed successfully. Thank you for your purchase!
              </p>
            </div>
          </div>
        </PaymentModal>
      )}
      {searchParams.get('status') === 'failed' && (
        <PaymentModal onClose={handleClearStatus}>
          <div className="flex w-full flex-col items-center gap-6 overflow-auto">
            <BiSolidError fill="#FF9500" size={67} />
            <div className="flex w-full flex-col gap-3">
              <h3 className="text-textPrimary text-2xl font-semibold">Payment Failed</h3>
              <p className="text-textPrimary text-base">
                Something went wrong while processing your payment. Please try again or use a different method.
              </p>
            </div>
          </div>
        </PaymentModal>
      )}
    </>
  );
};

export default MembershipDetails;
