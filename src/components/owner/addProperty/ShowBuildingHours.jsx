// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import React, { useEffect, useRef, useState } from 'react';

// function ShowBuildingHours() {
//   const [selectedDayIndex, setSelectedDayIndex] = useState(null);
//   const [selectedTimeIndex, setSelectedTimeIndex] = useState([]);
//   const [selectedTime, setSelectedTime] = useState([]);
//   const [width, setWidth] = useState(0);

//   const dayScrollRef = useRef(null);
//   const timeScrollRef = useRef(null);

//   function handleResize() {
//     setWidth(window.innerWidth);
//   }

//   const allDays = [
//     { day: 'MON', date: '25 Feb' },
//     { day: 'TUE', date: '26 Feb' },
//     { day: 'WED', date: '27 Feb' },
//     { day: 'THU', date: '28 Feb' },
//     { day: 'FRI', date: '29 Feb' },
//     { day: 'SAT', date: '01 Mar' },
//     { day: 'SUN', date: '02 Mar' },
//   ];
//   const allTimes = ['09 AM', '10 AM', '11 AM', '01 PM', '02 PM', '03 PM', '04 PM', '05 PM'];
//   const [dayStatus, setDayStatus] = useState([
//     { label: '', availableTime: [] },
//     { label: '', availableTime: [] },
//     { label: '', availableTime: [] },
//     { label: '', availableTime: [] },
//     { label: '', availableTime: [] },
//     { label: '', availableTime: [] },
//     { label: '', availableTime: [] },
//   ]);

//   const addDayIndex = (item, index) => {
//     setSelectedDayIndex(index);
//     setSelectedTimeIndex([]);
//     const update = [...dayStatus];
//     update[index].label = item.day;
//     setSelectedTime([]);
//     setDayStatus(update);
//   };

//   const addTimeIndex = (item, indx) => {
//     const isSelected = selectedTime.includes(item);
//     const updatedTime = isSelected ? selectedTime.filter(t => t !== item) : [...selectedTime, item];

//     setSelectedTime(selectedTime.includes(item) ? selectedTime.filter(t => t !== item) : [...selectedTime, item]);
//     setSelectedTimeIndex(prev => (prev.includes(indx) ? prev.filter(i => i !== indx) : [...prev, indx]));

//     const update = [...dayStatus];
//     update[selectedDayIndex].availableTime = updatedTime;
//     setDayStatus(update);
//   };

//   console.log('update', dayStatus);

//   const handlePrevDay = scrollOffset => {
//     dayScrollRef.current.scrollLeft += scrollOffset;
//   };
//   const handleNextDay = scrollOffset => {
//     dayScrollRef.current.scrollLeft += scrollOffset;
//   };
//   const handleNextTime = scrollOffset => {
//     timeScrollRef.current.scrollLeft += scrollOffset;
//   };

//   const handlePrevTime = scrollOffset => {
//     timeScrollRef.current.scrollLeft += scrollOffset;
//   };

//   useEffect(() => {
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [width]);

//   return (
//     <div>
//       <h2 className="text-center text-[20px] font-semibold text-[#32343C]">Select a Preferred Day</h2>
//       <div
//         className={`my-3 flex w-full items-center justify-between gap-2 overflow-auto px-3 ${width > 1420 && 'justify-center'}`}
//       >
//         <button
//           onClick={() => handlePrevDay(-110)}
//           className={`cursor-pointer text-[#0245A5] disabled:opacity-30 ${width > 1420 && 'hidden'}`}
//         >
//           <ChevronLeft />
//         </button>
//         <div ref={dayScrollRef} className="scroll-0 flex gap-8 overflow-hidden">
//           {allDays.map((item, index) => (
//             <div
//               onClick={() => addDayIndex(item, index)}
//               key={index}
//               className={`text-primary border-primary cursor-pointer rounded-[7px] border bg-blue-100 px-2.5 py-2 sm:p-4 ${
//                 selectedDayIndex === index && 'bg-primary text-white'
//               }`}
//             >
//               <h1 className="text-center text-[13px] font-semibold sm:text-sm">{item.day}</h1>
//               <p className="flex flex-nowrap text-center text-[13px] font-semibold text-nowrap sm:text-sm">
//                 {item.date}
//               </p>
//             </div>
//           ))}
//         </div>
//         <button
//           onClick={() => handleNextDay(110)}
//           className={`cursor-pointer text-[#0245A5] disabled:opacity-30 ${width > 1420 && 'hidden'}`}
//         >
//           <ChevronRight />
//         </button>
//       </div>
//       <h2 className="text-center text-[20px] font-semibold text-[#32343C]">Select a Preferred Time</h2>
//       <div
//         className={`${width > 1481 && 'justify-center'} my-3 flex w-full items-center justify-between gap-2 overflow-auto px-3`}
//       >
//         <button
//           onClick={() => handlePrevTime(-120)}
//           className={`${width > 1481 && 'hidden'} cursor-pointer text-[#0245A5] disabled:opacity-30`}
//         >
//           <ChevronLeft />
//         </button>

//         <div ref={timeScrollRef} className="scroll-0 flex gap-8 overflow-hidden">
//           {allTimes.map((time, idx) => (
//             <div
//               onClick={() => addTimeIndex(time, idx)}
//               key={idx}
//               className={`border-primary text-primary cursor-pointer rounded-[7px] border px-3 py-2 text-[13px] font-semibold text-nowrap sm:px-4 sm:py-3 ${
//                 selectedTimeIndex.includes(idx) ? 'bg-primary text-white' : `bg-blue-100`
//               } ${dayStatus[selectedDayIndex]?.availableTime?.includes(time) ? '!bg-primary text-white' : ''}`}
//             >
//               {time}
//             </div>
//           ))}
//         </div>
//         <button
//           onClick={() => handleNextTime(120)}
//           className={`${width > 1481 && 'hidden'} cursor-pointer text-[#0245A5] disabled:opacity-30 2xl:hidden`}
//         >
//           <ChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ShowBuildingHours;

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

function ShowBuildingHours({ selectedDate, selectedTime, onDateTimeChange }) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState([]);
  const [selectedTimeArray, setSelectedTimeArray] = useState([]);
  const [width, setWidth] = useState(0);
  const [availableDays, setAvailableDays] = useState([]);

  const dayScrollRef = useRef(null);
  const timeScrollRef = useRef(null);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  // Generate dynamic days based on current date
  useEffect(() => {
    const generateDays = () => {
      const days = [];
      const today = new Date();
      const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      // Generate next 14 days (2 weeks)
      for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        // Skip Sundays for property viewing
        if (date.getDay() !== 0) {
          days.push({
            day: dayNames[date.getDay()],
            date: `${String(date.getDate()).padStart(2, '0')} ${monthNames[date.getMonth()]}`,
            fullDate: date.toISOString().split('T')[0],
            isToday: i === 0,
          });
        }
      }

      return days;
    };

    setAvailableDays(generateDays());
  }, []);

  const allTimes = ['09 AM', '10 AM', '11 AM', '01 PM', '02 PM', '03 PM', '04 PM', '05 PM'];
  const [dayStatus, setDayStatus] = useState([]);

  // Initialize dayStatus when availableDays changes
  useEffect(() => {
    if (availableDays.length > 0) {
      setDayStatus(availableDays.map(() => ({ label: '', availableTime: [] })));
    }
  }, [availableDays]);

  // Restore previous selections when props change
  useEffect(() => {
    if (selectedDate && availableDays.length > 0) {
      const dayIndex = availableDays.findIndex(day => day.fullDate === selectedDate);
      if (dayIndex !== -1) {
        setSelectedDayIndex(dayIndex);
        const update = [...dayStatus];
        if (update[dayIndex]) {
          update[dayIndex].label = availableDays[dayIndex].day;
          setDayStatus(update);
        }
      }
    }
  }, [selectedDate, availableDays, dayStatus]);

  useEffect(() => {
    if (selectedTime && Array.isArray(selectedTime) && selectedTime.length > 0 && selectedDayIndex !== null) {
      setSelectedTimeArray(selectedTime);
      const timeIndices = selectedTime.map(time => allTimes.indexOf(time)).filter(idx => idx !== -1);
      setSelectedTimeIndex(timeIndices);

      const update = [...dayStatus];
      if (update[selectedDayIndex]) {
        update[selectedDayIndex].availableTime = selectedTime;
        setDayStatus(update);
      }
    }
  }, [selectedTime, selectedDayIndex, dayStatus]);

  const addDayIndex = (item, index) => {
    setSelectedDayIndex(index);
    setSelectedTimeIndex([]);
    const update = [...dayStatus];
    update[index].label = item.day;
    setSelectedTimeArray([]);
    setDayStatus(update);

    // Notify parent component about the date change
    if (onDateTimeChange) {
      onDateTimeChange(item.fullDate, []);
    }
  };

  const addTimeIndex = (item, indx) => {
    const isSelected = selectedTimeArray.includes(item);
    const updatedTime = isSelected ? selectedTimeArray.filter(t => t !== item) : [...selectedTimeArray, item];

    setSelectedTimeArray(updatedTime);
    setSelectedTimeIndex(prev => (prev.includes(indx) ? prev.filter(i => i !== indx) : [...prev, indx]));

    const update = [...dayStatus];
    update[selectedDayIndex].availableTime = updatedTime;
    setDayStatus(update);

    // Notify parent component about the time change
    if (onDateTimeChange && selectedDayIndex !== null) {
      onDateTimeChange(availableDays[selectedDayIndex].fullDate, updatedTime);
    }
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
        <div ref={dayScrollRef} className="scroll-0 flex gap-8 overflow-x-auto">
          {availableDays.map((item, index) => (
            <div
              onClick={() => addDayIndex(item, index)}
              key={index}
              className={`text-primary border-primary flex-shrink-0 cursor-pointer rounded-[7px] border bg-blue-100 px-2.5 py-2 sm:p-4 ${
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
