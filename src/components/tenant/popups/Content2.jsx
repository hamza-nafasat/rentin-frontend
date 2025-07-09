'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyImage from './PropertyImage';
import Move from '../forms/Move';
import Buttons from './Buttons';
import Input from '@/components/shared/small/Input';
import ShowBuildingHours from '@/components/owner/addProperty/ShowBuildingHours';

const allDays = [
  { day: 'MON', date: '25 Feb' },
  { day: 'TUE', date: '26 Feb' },
  { day: 'WED', date: '27 Feb' },
  { day: 'THU', date: '28 Feb' },
  { day: 'FRI', date: '29 Feb' },
  { day: 'SAT', date: '01 Mar' },
]; // No Sunday

const allTimes = ['09:00AM-', '10:00AM-', '11:00AM-', '01:00PM-', '03:00PM-'];

function Content2({ setIsModalOpen1, setIsModalOpen2 }) {
  return (
    <div className="flex flex-col">
      <PropertyImage />

      <div className="mt-3 bg-white py-4">
        <ShowBuildingHours />
      </div>

      <div className="mt-3 mb-3">
        <form action="">
          <Input shadow label="Full Name" placeholder="Jamie Fox" />
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="flex basis-[100%] flex-wrap justify-between sm:basis-[49%]">
              <Move />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow label="Nationality" placeholder="NYC" />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow label="Number of Occupants" placeholder="Jamie Fox" />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow label="Purpose of Rental" placeholder="For Study" />
            </div>
          </div>
        </form>
      </div>

      <div className="mt-2 flex justify-end gap-2">
        <Buttons
          cancelHandle={() => setIsModalOpen1(false)}
          text1="Cancel"
          cn={'!bg-[#E35454] hover:!bg-red-500'}
          text2="Next"
          acceptHandle={() => {
            setIsModalOpen1(false);
            setIsModalOpen2(true);
          }}
        />
      </div>
    </div>
  );
}

export default Content2;
