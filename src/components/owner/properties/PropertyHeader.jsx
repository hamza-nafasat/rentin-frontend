'use client';
import { BuildingIcon, EyeIcon } from '@/assets/icon';
import Modal from '@/components/shared/small/Modal';
import Link from 'next/link';
import { useState } from 'react';
import PropertiesView from './PropertiesView';
import Image from 'next/image';

const PropertyHeader = ({ title }) => {
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
          // width="w-[700px] md:w-full"
        >
          <PropertiesView />
        </Modal>
      )}

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h3 className="text-textColor text-lg font-semibold md:text-[22px]">{title}</h3>
        <div className="flex items-center gap-4 md:gap-5">
          {/* ✅ Fixed: Correct onClick handler */}
          <Button onClick={modalOpenHandler} text="Property Views" icon={<EyeIcon />} />
          <Link href="/owner/add-property">
            <Button text="Add Property" icon={<BuildingIcon />} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default PropertyHeader;

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
