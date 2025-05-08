'use client';
import React from 'react';
import PropertyImage from './PropertyImage';
import InputText from '../forms/InputText';
import Move from '../forms/Move';
import InputTime from '../forms/InputTime';
import Image from 'next/image';
import Buttons from './Buttons';
import InputDate from '../forms/InputDate';
import Input from '@/components/shared/small/Input';

function Content16() {
  return (
    <div className="flex flex-col">
      <PropertyImage />
      <div>
        <form action="">
          <div className="mt-4 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input type={'text'} label={'Full name'} placeholder={'Jamie Fox'} />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input type={'text'} label={'Inspection Amount'} placeholder={'$400'} />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input type={'date'} label={'Date Range'} value="2025-05-05" />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input type={'time'} label={'Time Range'} value="14:30" />
            </div>
          </div>
        </form>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Buttons text1={'Cancel'} cn={'!bg-[#E35454]'} text2={'Send: Proposal'} />
      </div>
    </div>
  );
}

export default Content16;
