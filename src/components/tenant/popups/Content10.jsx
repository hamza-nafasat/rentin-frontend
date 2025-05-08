'use client';
import React from 'react';
import PropertyImage from './PropertyImage';
import Image from 'next/image';
import InputDate from '../forms/InputDate';
import InputTime from '../forms/InputTime';
import Buttons from './Buttons';
import Input from '@/components/shared/small/Input';
function Content10() {
  return (
    <div className="flex flex-col">
      <p className="mb-2 px-2 text-[14px] text-[#32343C]">
        You have accepted the owner's request to show the property. Here are the tenant <br />{' '}
        details and scheduled date & time. Please be prepared for the visit.
      </p>
      <PropertyImage />
      <div className="mt-3">
        <h3 className="text-center text-[17px] font-bold">Tenant</h3>
        <Image
          className="mx-auto"
          src="/images/default/kartikk-k.png"
          width={170}
          height={170}
          alt="icon"
        />
        <h1 className="text-center text-[34px] font-bold">John Doe</h1>
      </div>
      <div className="mt-3 flex flex-wrap justify-between">
        <div className="basis-[100%] sm:basis-[49%]">
          <Input type={'date'} value="2025-05-05" label={'Date'} />
        </div>
        <div className="basis-[100%] sm:basis-[49%]">
          <Input type={'time'} value="14:30" label={'Time'} />
        </div>
      </div>
      <div className="my-3">
        <h1 className="text-[19px] font-bold text-[#32343C]">
          Important Guidelines: To Complete Your Task
        </h1>
        <ul className="flex flex-col gap-0.5">
          <li className="flex items-center gap-3 text-[15px] text-[#32343C]">
            <span className="h-2 w-2 rounded-[50%] bg-[#32343C]"></span> After showing the complete
            property, ask the tenant to scan the QR code to <br /> confirm the visit.
          </li>
          <li className="flex items-center gap-3 text-[15px] text-[#32343C]">
            <span className="h-2 w-2 rounded-[50%] bg-[#32343C]"></span>The task will only be marked
            as completed once the QR code is scanned.
          </li>
          <li className="flex items-center gap-3 text-[15px] text-[#32343C]">
            <span className="h-2 w-2 rounded-[50%] bg-[#32343C]"></span>Without scanning, the visit
            will remain pending and won’t be recorded.
          </li>
          <li className="flex items-center gap-3 text-[15px] text-[#32343C]">
            <span className="h-2 w-2 rounded-[50%] bg-[#32343C]"></span> Make sure the tenant scans
            the code before leaving to avoid any issues.
          </li>
        </ul>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <Buttons text2={'Download Slip'} cn={'!hidden'} />
      </div>
    </div>
  );
}

export default Content10;
