'use client';
import Input from '@/components/shared/small/Input';
import Modal from '@/components/shared/small/Modal';
import Image from 'next/image';
import React, { useState } from 'react';
import { BiLogOut } from 'react-icons/bi';

function Stripe() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <Image className="ml-4" src="/images/default/stripe-logo.png" width={170} height={107} alt="icon" />
      <div className="flex flex-col items-center gap-3">
        <p className="text-lg font-bold">Available Balance</p>
        <p className="text-[34px] font-bold">$144,000.00</p>
      </div>
      <div className="mb-3.5 text-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary cursor-pointer rounded-lg px-3 py-2 text-white"
        >
          <div className="flex items-center gap-1">
            <p className="text-sm font-medium">Connect Account</p>
            <BiLogOut />
          </div>
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} title={'Withdraw Amount'}>
          <div className="flex flex-col items-center p-5">
            <Image src="/images/default/stripe-logo.png" width={220} height={107} alt="icon" />
            <div className="mt-4 w-full text-center">
              <Input shadow cn={'!w-[70%] !h-[47px] !rounded-[6px] !mt-0'} placeholder="Enter amount" />
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer rounded-lg bg-gray-400 px-4 py-2 text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => alert('Amount Confirmed!')}
                className="bg-primary cursor-pointer rounded-lg px-4 py-2 text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Stripe;
