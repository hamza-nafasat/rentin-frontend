'use client';
import React from 'react';
import PropertyImage from './PropertyImage';
import Image from 'next/image';
import Buttons from './Buttons';
import Checkbox from '../forms/Checkbox';
import NewCards from '../forms/NewCards';
import Input from '@/components/shared/small/Input';
function Content3() {
  return (
    <div className="flex w-[500px] flex-col">
      <PropertyImage />
      <div className="mt-3">
        <h1 className="text-[17px] font-semibold text-[#32343C] sm:text-[20px]">
          How would you like to pay?
        </h1>
        <div className="mb-3 flex flex-wrap items-center gap-4">
          <Checkbox />
        </div>
      </div>
      <div>
        <h1 className="text-[20px] font-semibold text-[#32343C]">New Cards</h1>
        <div className="mt-3 mb-3 flex flex-wrap items-center gap-2">
          <NewCards />
        </div>
      </div>
      <div>
        <form action="">
          <Input type={'text'} label={'Cardholder’s Name*'} placeholder="Michal jhon" />
          <Input type={'number'} label={'Card Number*'} />
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input type={'date'} label={'Expiry Date*'} value={'2025-05-05'} />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input type={'text'} label={'CVC*'} />
            </div>
          </div>
          <div className="relative mt-3 flex items-center gap-2">
            <div>
              <input
                id="switch-component"
                type="checkbox"
                className="peer h-5 w-11 cursor-pointer appearance-none rounded-full bg-[#B9B9B9] transition-colors duration-300 checked:bg-[#0245A5]"
              />
              <label
                htmlFor="switch-component"
                className="absolute top-0 left-0 h-5 w-5 cursor-pointer rounded-full border border-slate-300 bg-white shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800"
              ></label>
            </div>
            <label
              htmlFor="switch-component"
              className="flex w-full text-[13px] text-[#32343CB2] sm:text-[16px]"
            >
              Save Card for future purchase
            </label>
          </div>
        </form>
      </div>
      <div className="mt-2 flex justify-end gap-2">
        <Buttons text1={'Back'} cn={'!bg-[#E35454]'} text2={'Confirm'} />
      </div>
    </div>
  );
}

export default Content3;
