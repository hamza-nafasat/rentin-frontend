'use client';
import React from 'react';
import PropertyImage from './PropertyImage';
import InputText from '../forms/InputText';
import Move from '../forms/Move';
import InputTime from '../forms/InputTime';
import Buttons from './Buttons';
import Image from 'next/image';
import Input from '@/components/shared/small/Input';
import Button from '@/components/shared/small/Button';

function Content13() {
  return (
    <div className="flex flex-col">
      <PropertyImage />
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Full name'} placeholder={'John Doe'} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Current City'} placeholder={'xyz country'} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Nationality'} placeholder={'xyz nationality'} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'People Staying'} placeholder={'4'} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Visa Type'} placeholder={'xyz nationality'} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Purpose of Rental'} placeholder={'Study'} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Move />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'time'} label={'Your arrival time'} value={'14:30'} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Rent Amount'} value={'800'} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Security Amount'} value={'400'} />
        </div>
      </div>
      <div className="mt-3">
        <p className="text-[16px] font-semibold text-[#32343C]">Click to view and Accepted To Complete a Booking</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="basis-[100%] bg-[#ECECECB2] sm:basis-[59%]">
            <a
              href="#"
              className="flex items-center gap-3 px-5 py-3 text-[16px] font-medium text-[#374151]"
              download={'/pdf/Contract File.pdf'}
            >
              <Image src="/images/default/pdf.png" width={30} height={31} alt="icon" />
              Contract File.pdf
            </a>
          </div>
          <div>
            <button className="flex cursor-pointer items-center gap-3">
              <a href="#" className="flex gap-2" download={'/pdf/Contract File.pdf'}>
                <p className="rounded-[2px] bg-[#0245A5] px-4 py-3.5 text-[14px] text-white">Acknowledge Contract</p>
                <span>
                  <Image src="/images/default/download.png" width={'49'} height={'49'} alt="icon" />
                </span>
              </a>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between">
        <div className="mt-2 flex gap-2">
          <Button text={'Reject'} cn="!bg-[#E35454] hover:!bg-red-500" />
        </div>
        <div className="flex items-center justify-end gap-10">
          <h1 className="text-[16px] font-bold text-[#32343C]">Total Amount </h1>
          <p className="py-2.5 text-[24px] font-semibold text-[#32343C]">$1200</p>
        </div>
        {/* <Button text={'Next'} /> */}
      </div>
    </div>
  );
}

export default Content13;
