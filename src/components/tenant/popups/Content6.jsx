'use client';
import React from 'react';
import PropertyImage from './PropertyImage';
import Image from 'next/image';
import InputText from '../forms/InputText';
import Move from '../forms/Move';
import InputDate from '../forms/InputDate';
import InputTime from '../forms/InputTime';
import Buttons from './Buttons';
import Input from '@/components/shared/small/Input';
function Content6() {
  return (
    <div className="flex flex-col">
      <PropertyImage />
      <div className="mt-3">
        <form action="">
          <div>
            <Input type={'text'} label={'Full Name'} placeholder={'John Doe'} />
          </div>
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input type={'date'} label={'Visit Date'} />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input type={'time'} label={'Visit Time'} />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input type={'text'} label={'Nationality'} placeholder={'NYC'} />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input type={'text'} label={'Number of Occupants'} placeholder={'5'} />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input type={'text'} label={'Purpose of Rental'} placeholder={'For Study'} />
            </div>
            <div className="flex basis-[100%] flex-wrap justify-between sm:basis-[49%]">
              <Move />
            </div>
          </div>
        </form>
      </div>
      <div className="mt-2 flex justify-end gap-2">
        <Buttons text1={'Rejected'} cn={'!bg-[#E35454]'} text2={'Accept'} />
      </div>
    </div>
  );
}

export default Content6;
