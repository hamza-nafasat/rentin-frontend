'use client';
import React from 'react';
import PropertyImage from './PropertyImage';
import Move from '../forms/Move';
import Buttons from './Buttons';
import Input from '@/components/shared/small/Input';
function Content4({ setIsModalOpen2, setIsModalOpen3 }) {
  return (
    <div className="flex flex-col">
      <PropertyImage />
      <div>
        <form action="">
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'text'} label={'Name'} placeholder={'John Doe'} />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'text'} label={'Nationality'} placeholder={'NYC'} />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'date'} label={'Date'} value={'2025-05-05'} />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'time'} label={'Time'} value={'14:30'} />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'text'} label={'Number of Occupants'} placeholder={'5'} />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Move />
            </div>
          </div>
        </form>
      </div>
      <div className="mt-2 flex justify-end gap-2">
        <Buttons
          cancelHandle={() => setIsModalOpen2(false)}
          text1={'Cancel'}
          cn={'!bg-[#E35454] hover:!bg-red-500'}
          text2={'Confirm'}
          acceptHandle={() => {
            setIsModalOpen2(false);
            setIsModalOpen3(true);
          }}
        />
      </div>
    </div>
  );
}

export default Content4;
