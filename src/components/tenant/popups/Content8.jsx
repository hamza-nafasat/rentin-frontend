'use client';
import React from 'react';
import { useState } from 'react';
import PropertyImage from './PropertyImage';
import Image from 'next/image';
import InputText from '../forms/InputText';
import InputTime from '../forms/InputTime';
import InputDate from '../forms/InputDate';
import Modal from '@/components/shared/small/Modal';
import Buttons from './Buttons';
import ViewBuilding from './ViewBuildingContent';
import Input from '@/components/shared/small/Input';
function Content8() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex flex-col">
      <PropertyImage>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-2 ml-2 cursor-pointer rounded-[2px] bg-[#0245A5] px-5 py-1.25 text-[14px] text-white"
        >
          View Building
        </button>
      </PropertyImage>
      <div>
        <form action="">
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'text'} label={'Full name'} placeholder={'Jamie Fox'} />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'text'} label={'Price'} placeholder={'12$'} />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'date'} value={'2025-05-05'} label={'Date'} />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'time'} value="14:30" label={'Appointment'} />
            </div>
          </div>
        </form>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <Buttons text1={'Back'} cn={'!bg-[#5390E0]'} text2={'Send Contract'} />
      </div>
      <div>
        {isModalOpen && (
          <Modal width={500} onClose={() => setIsModalOpen(false)}>
            <ViewBuilding />
          </Modal>
        )}
      </div>
      ;
    </div>
  );
}
export default Content8;
