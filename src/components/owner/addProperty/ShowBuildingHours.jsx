import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useRef, useState } from 'react';

function ShowBuildingHours() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState([]);
  const [time, setTime] = useState([]);
  const dayScrollRef = useRef(null);
  const timeScrollRef = useRef(null);

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
    { label: '', time: [] },
    { label: '', time: [] },
    { label: '', time: [] },
    { label: '', time: [] },
    { label: '', time: [] },
    { label: '', time: [] },
    { label: '', time: [] },
  ]);

  const addDayIndex = (item, index) => {
    setSelectedDayIndex(index);
    setSelectedTimeIndex([]);
    const update = [...dayStatus];
    update[index].label = item.day;
    update[index].time = [];
    setTime([]);
    setDayStatus(update);
  };

  const addTimeIndex = (item, indx) => {
    const isSelected = time.includes(item);
    const updatedTime = isSelected ? time.filter(t => t !== item) : [...time, item];

    setTime(time.includes(item) ? time.filter(t => t !== item) : [...time, item]);
    setSelectedTimeIndex(prev => (prev.includes(indx) ? prev.filter(i => i !== indx) : [...prev, indx]));

    const update = [...dayStatus];
    update[selectedDayIndex].time = updatedTime;
    setDayStatus(update);
  };

  console.log('update', dayStatus);
  // console.log(selectedTimeIndex);
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

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-[20px] font-semibold text-[#32343C]">Select a Preferred Day</h2>
      <div className="my-3 flex w-full items-center justify-between gap-2 overflow-auto px-3">
        <button onClick={() => handlePrevDay(-110)} className="cursor-pointer text-[#0245A5] disabled:opacity-30">
          <ChevronLeft />
        </button>
        <div ref={dayScrollRef} className="scroll-0 flex gap-8 overflow-auto">
          {allDays.map((item, index) => (
            <div
              onClick={() => addDayIndex(item, index)}
              key={index}
              className={`cursor-pointer rounded-[7px] bg-blue-300 px-2.5 py-2 text-white sm:p-4 ${
                selectedDayIndex === index && 'bg-primary'
              }`}
            >
              <h1 className="text-center text-[13px] font-semibold sm:text-sm">{item.day}</h1>
              <p className="flex flex-nowrap text-center text-[13px] font-semibold text-nowrap sm:text-sm">
                {item.date}
              </p>
            </div>
          ))}
        </div>
        <button onClick={() => handleNextDay(110)} className="cursor-pointer text-[#0245A5] disabled:opacity-30">
          <ChevronRight />
        </button>
      </div>
      <h2 className="text-[20px] font-semibold text-[#32343C]">Select a Preferred Time</h2>
      <div className="my-3 flex w-full items-center justify-between gap-2 overflow-auto px-3">
        <button onClick={() => handlePrevTime(-110)} className="cursor-pointer text-[#0245A5] disabled:opacity-30">
          <ChevronLeft />
        </button>

        <div ref={timeScrollRef} className="scroll-0 flex gap-8 overflow-auto">
          {allTimes.map((time, idx) => (
            <div
              onClick={() => addTimeIndex(time, idx)}
              key={idx}
              className={`cursor-pointer rounded-[7px] px-3 py-2 text-[13px] font-semibold text-nowrap text-white sm:px-4 sm:py-3 ${
                selectedTimeIndex.includes(idx) ? 'bg-primary' : `bg-blue-300`
              }`}
            >
              {time}
            </div>
          ))}
        </div>
        <button onClick={() => handleNextTime(110)} className="cursor-pointer text-[#0245A5] disabled:opacity-30">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default ShowBuildingHours;
