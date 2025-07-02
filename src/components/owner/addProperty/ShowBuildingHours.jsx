import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

function ShowBuildingHours() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [width, setWidth] = useState(0);

  const dayScrollRef = useRef(null);
  const timeScrollRef = useRef(null);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  const allDays = [
    { day: 'MON', date: '25 Feb' },
    { day: 'TUE', date: '26 Feb' },
    { day: 'WED', date: '27 Feb' },
    { day: 'THU', date: '28 Feb' },
    { day: 'FRI', date: '29 Feb' },
    { day: 'SAT', date: '01 Mar' },
    { day: 'SUN', date: '02 Mar' },
  ];
  const allTimes = ['09 AM', '10 AM', '11 AM', '01 PM', '02 PM', '03 PM', '04 PM', '05 PM'];
  const [dayStatus, setDayStatus] = useState([
    { label: '', availableTime: [] },
    { label: '', availableTime: [] },
    { label: '', availableTime: [] },
    { label: '', availableTime: [] },
    { label: '', availableTime: [] },
    { label: '', availableTime: [] },
    { label: '', availableTime: [] },
  ]);

  const addDayIndex = (item, index) => {
    setSelectedDayIndex(index);
    setSelectedTimeIndex([]);
    const update = [...dayStatus];
    update[index].label = item.day;
    setSelectedTime([]);
    setDayStatus(update);
  };

  const addTimeIndex = (item, indx) => {
    const isSelected = selectedTime.includes(item);
    const updatedTime = isSelected ? selectedTime.filter(t => t !== item) : [...selectedTime, item];

    setSelectedTime(selectedTime.includes(item) ? selectedTime.filter(t => t !== item) : [...selectedTime, item]);
    setSelectedTimeIndex(prev => (prev.includes(indx) ? prev.filter(i => i !== indx) : [...prev, indx]));

    const update = [...dayStatus];
    update[selectedDayIndex].availableTime = updatedTime;
    setDayStatus(update);
  };

  console.log('update', dayStatus);

  const handlePrevDay = scrollOffset => {
    dayScrollRef.current.scrollLeft += scrollOffset;
  };
  const handleNextDay = scrollOffset => {
    dayScrollRef.current.scrollLeft += scrollOffset;
  };
  const handleNextTime = scrollOffset => {
    timeScrollRef.current.scrollLeft += scrollOffset;
  };

  const handlePrevTime = scrollOffset => {
    timeScrollRef.current.scrollLeft += scrollOffset;
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);

  return (
    <div>
      <h2 className="text-center text-[20px] font-semibold text-[#32343C]">Select a Preferred Day</h2>
      <div
        className={`my-3 flex w-full items-center justify-between gap-2 overflow-auto px-3 ${width > 1420 && 'justify-center'}`}
      >
        <button
          onClick={() => handlePrevDay(-110)}
          className={`cursor-pointer text-[#0245A5] disabled:opacity-30 ${width > 1420 && 'hidden'}`}
        >
          <ChevronLeft />
        </button>
        <div ref={dayScrollRef} className="scroll-0 flex gap-8 overflow-hidden">
          {allDays.map((item, index) => (
            <div
              onClick={() => addDayIndex(item, index)}
              key={index}
              className={`text-primary border-primary cursor-pointer rounded-[7px] border bg-blue-100 px-2.5 py-2 sm:p-4 ${
                selectedDayIndex === index && 'bg-primary text-white'
              }`}
            >
              <h1 className="text-center text-[13px] font-semibold sm:text-sm">{item.day}</h1>
              <p className="flex flex-nowrap text-center text-[13px] font-semibold text-nowrap sm:text-sm">
                {item.date}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={() => handleNextDay(110)}
          className={`cursor-pointer text-[#0245A5] disabled:opacity-30 ${width > 1420 && 'hidden'}`}
        >
          <ChevronRight />
        </button>
      </div>
      <h2 className="text-center text-[20px] font-semibold text-[#32343C]">Select a Preferred Time</h2>
      <div
        className={`${width > 1481 && 'justify-center'} my-3 flex w-full items-center justify-between gap-2 overflow-auto px-3`}
      >
        <button
          onClick={() => handlePrevTime(-120)}
          className={`${width > 1481 && 'hidden'} cursor-pointer text-[#0245A5] disabled:opacity-30`}
        >
          <ChevronLeft />
        </button>

        <div ref={timeScrollRef} className="scroll-0 flex gap-8 overflow-hidden">
          {allTimes.map((time, idx) => (
            <div
              onClick={() => addTimeIndex(time, idx)}
              key={idx}
              className={`border-primary text-primary cursor-pointer rounded-[7px] border px-3 py-2 text-[13px] font-semibold text-nowrap sm:px-4 sm:py-3 ${
                selectedTimeIndex.includes(idx) ? 'bg-primary text-white' : `bg-blue-100`
              } ${dayStatus[selectedDayIndex]?.availableTime?.includes(time) ? '!bg-primary text-white' : ''}`}
            >
              {time}
            </div>
          ))}
        </div>
        <button
          onClick={() => handleNextTime(120)}
          className={`${width > 1481 && 'hidden'} cursor-pointer text-[#0245A5] disabled:opacity-30 2xl:hidden`}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default ShowBuildingHours;
