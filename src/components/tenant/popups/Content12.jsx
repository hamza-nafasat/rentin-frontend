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
function Content12() {
  return (
    <div className="flex flex-col">
      <PropertyImage />
      <div>
        <form action="">
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'text'} label={'Full name'} placeholder={'John Doe'} />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'text'} label={'Current City'} placeholder={'xyz country'} />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'text'} label={'Nationality'} placeholder={'xyz nationality'} />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'text'} label={'People Staying'} placeholder={'4'} />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'text'} label={'Visa Type'} placeholder={'xyz nationality'} />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'text'} label={'Purpose of Rental'} placeholder={'Study'} />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Move />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'time'} label={'Your arrival time'} value={'14:30'} />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'text'} label={'Rent Amount'} value={'800'} />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'text'} label={'Security Amount'} value={'400'} />
            </div>
          </div>
        </form>
      </div>
      <div className="mt-3 flex flex-wrap justify-between">
        <div className="flex basis-[100%] items-center gap-10 sm:basis-[49%]">
          <h1 className="text-[16px] font-bold text-[#32343C]">Total Amount </h1>
          <p className="py-2.5 text-[24px] font-semibold text-[#32343C]">$1200</p>
        </div>
        <div className="mt-2 flex basis-[100%] justify-end gap-2 sm:basis-[49%]">
          <Buttons text1={'Cancel'} cn={'!bg-[#E35454] hover:!bg-red-500'} text2={'Confirm'} />
        </div>
      </div>
    </div>
  );
}

export default Content12;
