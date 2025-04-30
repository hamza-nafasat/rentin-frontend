'use client';
import { BuildingIcon, EyeIcon } from '@/assets/icon';
import Modal from '@/components/shared/small/Modal';
import Link from 'next/link';
import { useState } from 'react';
// import PropertiesView from "./PropertiesView";
import Image from 'next/image';
import { LuCircleUser } from 'react-icons/lu';

const InspectionHeader = () => {
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
              <span className="text-sm font-semibold">Properties Inspection Service</span>
            </div>
          }
          width="w-[320px] md:w-[1150px]"
        >
          {/* <PropertiesView /> */}
        </Modal>
      )}

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h3 className="text-textColor text-lg font-semibold md:text-[22px]">
          Properties Inspection Service
        </h3>
        <div className="flex items-center gap-4 md:gap-5">
          {/* ✅ Fixed: Correct onClick handler */}

          <Link href="/owner/agent">
            <Button text="My Agent" icon={<LuCircleUser className="text-base text-white" />} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default InspectionHeader;

// ✅ Fixed: Spread `...rest` so it receives `onClick`
const Button = ({ className, text, icon, ...rest }) => {
  return (
    <button
      {...rest}
      className={`${className} bg-primary flex cursor-pointer items-center gap-2 rounded-[4px] p-2 text-sm font-medium text-white`}
    >
      {icon}
      {text}
    </button>
  );
};
