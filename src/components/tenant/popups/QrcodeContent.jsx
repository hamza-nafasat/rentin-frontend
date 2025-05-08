'use client';
import React from 'react';
import PropertyImage from './PropertyImage';
import Image from 'next/image';
import InputDate from '../forms/InputDate';
import InputTime from '../forms/InputTime';
import Buttons from './Buttons';
import Input from '@/components/shared/small/Input';
function QrcodeContent() {
  return (
    <div className="flex flex-col">
      <p className="px-2 text-[14px] text-[#32343C]">
        You have received your QR code and digital code for the property visit. Please show <br />
        these to the agent during your visit.
      </p>
      <PropertyImage />
      <div>
        <form action="">
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input type={'date'} defaultValue={'2025-05-05'} label={'Date'} />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input type={'time'} label={'Time'} value={'14:30'} />
            </div>
          </div>
        </form>
      </div>
      <div className="my-3 flex flex-col items-center justify-between sm:flex-row">
        <div className="basis-[49%]">
          <h1 className="text-center text-[17px] font-bold text-[#32343C]">Showing Agent</h1>
          <Image
            className="mx-auto"
            src="/images/default/kartikk-k.png"
            width={168}
            height={168}
            alt="icon"
          />
          <h1 className="text-[34px] font-bold text-[#32343C]">John Doe </h1>
          <p className="flex items-center gap-2 text-[16px] text-[#32343C]">
            Certified Inspection Officer
            <Image src="/images/default/quality.png" width={16} height={16} alt="icon" />
          </p>
        </div>
        <div className="flex basis-[49%] justify-center">
          <Image src="/images/default/qrcode.png" width={262} height={262} alt="icon" />
        </div>
      </div>
      <div className="my-3">
        <h1 className="mb-3 text-[16px] font-bold text-[#32343C]">
          Guidelines for Showing the QR Code to the Agent
        </h1>
        <ul>
          <li className="flex items-center gap-2 text-[14px] font-semibold text-[#32343C]">
            <span className="h-1 w-1 rounded-[50%] bg-[#32343C]"></span> Show the QR code and
            digital code only after seeing the full property.
          </li>
          <li className="flex items-center gap-2 text-[14px] font-semibold text-[#32343C]">
            <span className="h-1 w-1 rounded-[50%] bg-[#32343C]"></span> Make sure you check all
            rooms before sharing the code.
          </li>
          <li className="flex items-center gap-2 text-[14px] font-semibold text-[#32343C]">
            <span className="h-1 w-1 rounded-[50%] bg-[#32343C]"></span> The agent will verify the
            code to confirm your visit.
          </li>
          <li className="flex items-center gap-2 text-[14px] font-semibold text-[#32343C]">
            <span className="h-1 w-1 rounded-[50%] bg-[#32343C]"></span> Once verified, your visit
            will be marked as complete.
          </li>
        </ul>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <Buttons text1={'Cancel'} Color1={'bg-[#E35454]'} text2={'Download Slip'} />
      </div>
    </div>
  );
}

export default QrcodeContent;
