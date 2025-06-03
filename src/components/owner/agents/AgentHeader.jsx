'use client';
import { BuildingIcon, EyeIcon, OnDemandIcon } from '@/assets/icon';
import Modal from '@/components/shared/small/Modal';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { LuCircleUser } from 'react-icons/lu';

const AgentHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalOpenHandler = () => setIsModalOpen(true);
  const modalCloseHandler = () => setIsModalOpen(false);

  return (
    <>
      {isModalOpen && (
        <Modal
          onClose={modalCloseHandler}
          title={
            <div className="flex items-center gap-4">
              <Image src="/images/dashboard/rental.png" width={32} height={32} alt="icon" />
              <span className="text-sm font-semibold">Properties Views</span>
            </div>
          }
          width="w-[320px] md:w-[1150px]"
        ></Modal>
      )}

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h3 className="text-textPrimary text-lg font-semibold md:text-[22px]">Agents Details</h3>
        <div className="flex items-center gap-4 md:gap-5">
          <Link href="/owner/agent/hiring-new-agent">
            <Button text="Hire New Agent" icon={<LuCircleUser className="text-base text-white" />} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default AgentHeader;

const Button = ({ className, text, icon, ...rest }) => {
  return (
    <button
      {...rest}
      className={`${className} bg-primary flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-[#01367f]`}
    >
      {icon}
      {text}
    </button>
  );
};
