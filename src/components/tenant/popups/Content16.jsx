'use client';
import React, { useState } from 'react';
import PropertyImage from './PropertyImage';
import Buttons from './Buttons';
import Input from '@/components/shared/small/Input';

function Content16() {
  const [formData, setFormData] = useState({ fullName: '', inspectionAmount: '', date: '2025-05-05', time: '14:30' });

  return (
    <div className="flex flex-col">
      <PropertyImage />
      <div>
        <form action="">
          <div className="mt-4 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'text'} label={'Full name'} placeholder={'Jamie Fox'} />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'text'} label={'Inspection Amount'} placeholder={'$400'} />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'date'} label={'Date Range'} value="2025-05-05" />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'time'} label={'Time Range'} value="14:30" />
            </div>
          </div>
        </form>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Buttons text1={'Cancel'} cn={'!bg-[#E35454] hover:!bg-red-500'} text2={'Send Proposal'} />
      </div>
    </div>
  );
}

export default Content16;
