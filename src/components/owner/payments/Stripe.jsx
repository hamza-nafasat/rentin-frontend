'use client';
import Input from '@/components/shared/small/Input';
import Modal from '@/components/shared/small/Modal';
import Image from 'next/image';
import React, { useState } from 'react';
import { BiLogOut } from 'react-icons/bi';

function Stripe() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <Image src="/images/payment/Stripe.png" width={354} height={107} alt="icon" />
      <div className="flex flex-col items-center gap-3">
        <p className="text-lg font-bold">Available Balance</p>
        <p className="text-[34px] font-bold">$144,000.00</p>
      </div>
      <div className="mb-3.5">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary rounded-md px-3 py-2 text-white"
        >
          <div className="flex items-center gap-1">
            <p className="text-sm font-medium">Connect Account</p>
            <BiLogOut />
          </div>
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col items-center p-5">
            <Image src="/images/payment/Stripe.png" width={354} height={107} alt="icon" />
            <Input placeholder="Enter amount" />
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md bg-gray-400 px-4 py-2 text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => alert('Amount Confirmed!')}
                className="bg-primary rounded-md px-4 py-2 text-white"
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
