'use client';
import React from 'react';
import { useState } from 'react';
import PropertyImage from './PropertyImage';
import Modal from '@/components/shared/small/Modal';
import Buttons from './Buttons';
import ViewBuilding from './ViewBuildingContent';
import Input from '@/components/shared/small/Input';
import Button from '@/components/shared/small/Button';
function Content17() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({ fullName: '', inspectionAmount: '', date: '2025-05-05', time: '14:30' });

  console.log(formData);

  return (
    <div className="flex flex-col">
      <PropertyImage>
        <Button text={'View Building'} onClick={() => setIsModalOpen(true)} />
      </PropertyImage>
      <div>
        <form action="">
          <div className="mt-4 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input
                onChange={e => {
                  setFormData({ ...formData, fullName: e.target.value });
                }}
                shadow
                type={'text'}
                label={'Full name'}
                value={formData.fullName}
                placeholder={'Jamie Fox'}
              />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input
                onChange={e => {
                  setFormData({ ...formData, inspectionAmount: e.target.value });
                }}
                shadow
                type={'text'}
                label={'Inspection Amount'}
                value={formData.inspectionAmount}
                placeholder={'$400'}
              />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input
                onChange={e => {
                  setFormData({ ...formData, date: e.target.value });
                }}
                shadow
                type={'date'}
                value={formData.date}
                label={'Date Range'}
              />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input
                onChange={e => {
                  setFormData({ ...formData, time: e.target.value });
                }}
                shadow
                type={'time'}
                label={'Time Range'}
                value={formData.time}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Buttons text1={'Reject'} cn={'!bg-[#E35454] hover:!bg-red-500'} text2={'Accept'} />
      </div>
      <div>
        {isModalOpen && (
          <Modal width={500} onClose={() => setIsModalOpen(false)}>
            <ViewBuilding />
          </Modal>
        )}
      </div>
    </div>
  );
}
export default Content17;
