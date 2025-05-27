'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyImage from './PropertyImage';
import Move from '../forms/Move';
import Buttons from './Buttons';
import Input from '@/components/shared/small/Input';

const allDays = [
  { day: 'MON', date: '25 Feb' },
  { day: 'TUE', date: '26 Feb' },
  { day: 'WED', date: '27 Feb' },
  { day: 'THU', date: '28 Feb' },
  { day: 'FRI', date: '29 Feb' },
  { day: 'SAT', date: '01 Mar' },
]; // No Sunday

const allTimes = ['09:00AM-', '10:00AM-', '11:00AM-', '01:00PM-', '03:00PM-'];

function Content2() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  // const [selectedTimeIndex, setSelectedTimeIndex] = useState(null);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);

  // Navigation handlers
  const handleNextTime = () => {
    if (selectedTimeIndex < allTimes.length - 1) {
      setSelectedTimeIndex(prev => prev + 1);
    }
  };

  const handlePrevTime = () => {
    if (selectedTimeIndex > 0) {
      setSelectedTimeIndex(prev => prev - 1);
    }
  };
  const handleNextDay = () => {
    if (selectedDayIndex < allDays.length - 1) {
      setSelectedDayIndex(prev => prev + 1);
    }
  };

  const handlePrevDay = () => {
    if (selectedDayIndex > 0) {
      setSelectedDayIndex(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col">
      <PropertyImage />

      <div className="mt-3 bg-white py-4">
        <h1 className="text-[20px] font-semibold text-[#32343C]">Select a Preferred Day</h1>

        <div className="my-3 flex w-full items-center justify-between gap-2 overflow-auto px-3">
          <button
            onClick={handlePrevDay}
            className="cursor-pointer text-[#0245A5] disabled:opacity-30"
            disabled={selectedDayIndex === 0}
          >
            <ChevronLeft />
          </button>

          <div className="flex gap-8">
            {allDays.map((item, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-[7px] p-4 text-white ${
                  selectedDayIndex === index ? 'bg-[#0245A5]' : 'bg-blue-300'
                }`}
              >
                <h1 className="text-center text-sm font-semibold">{item.day}</h1>
                <p className="flex flex-nowrap text-center text-sm font-semibold">{item.date}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleNextDay}
            className="cursor-pointer text-[#0245A5] disabled:opacity-30"
            disabled={selectedDayIndex === allDays.length - 1}
          >
            <ChevronRight />
          </button>
        </div>

        <h1 className="text-[20px] font-semibold text-[#32343C]">Select a Preferred Time</h1>
        <div className="my-3 flex w-full items-center justify-between gap-2 overflow-auto px-3">
          <button
            onClick={handlePrevTime}
            className="cursor-pointer text-[#0245A5] disabled:opacity-30"
            disabled={selectedTimeIndex === 0}
          >
            <ChevronLeft />
          </button>

          <div className="flex gap-8">
            {allTimes.map((time, idx) => (
              <div
                key={idx}
                className={`cursor-pointer rounded-[7px] px-4 py-3 text-[13px] font-semibold text-white ${
                  selectedTimeIndex === idx ? 'bg-[#0245A5]' : 'bg-blue-300'
                }`}
              >
                {time}
              </div>
            ))}
          </div>

          <button
            onClick={handleNextTime}
            className="cursor-pointer text-[#0245A5] disabled:opacity-30"
            disabled={selectedTimeIndex === allTimes.length - 1}
          >
            <ChevronRight />
          </button>
        </div>
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
        <Buttons text1="Cancel" cn="!bg-[#E35454]" text2="Next" />
      </div>
    </div>
  );
}

export default Content2;
