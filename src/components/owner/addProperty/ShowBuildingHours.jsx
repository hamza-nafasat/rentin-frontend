import React, { useState } from 'react';

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function ShowBuildingHours() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState([]);
  const allDays = [
    { day: 'MON', date: '25 Feb' },
    { day: 'TUE', date: '26 Feb' },
    { day: 'WED', date: '27 Feb' },
    { day: 'THU', date: '28 Feb' },
    { day: 'FRI', date: '29 Feb' },
    { day: 'SAT', date: '01 Mar' },
  ];
  const allTimes = ['10:00AM-', '11:00AM-', '12:00AM-', '03:00PM-', '04:00PM-'];
  const addDayIndex = (item, index) => {
    setSelectedDayIndex(index);
    setSelectedTimeIndex('');
    console.log(item.day);
  };
  const addTimeIndex = indx => {
    setSelectedTimeIndex(prev => (prev.includes(indx) ? prev.filter(i => i != indx) : [...prev, indx]));
  };
  console.log(selectedTimeIndex);
  // const [dayStatus, setDayStatus] = useState({
  //   sunday: null,
  //   monday: null,
  //   tuesday: null,
  //   wednesday: null,
  //   thursday: null,
  //   friday: null,
  //   saturday: null,
  // });

  // console.log('dayStatus', dayStatus);

  // const toggleDay = day => {
  //   setDayStatus(prev => ({ ...prev, [day]: prev[day] ? null : { startTime: '', endTime: '' } }));
  // };

  return (
    // <div className="flex flex-col gap-4 py-4">
    //   <h1 className="font-medium text-[#32343CB2]">Buildings can be shown in (Hours)</h1>
    //   {days.map((day, i) => (
    //     <div className="flex flex-col gap-2 md:flex-row md:gap-5" key={i}>
    //       <div className="flex items-center justify-between">
    //         <label className="w-[100px] capitalize" htmlFor={day.toLowerCase()}>
    //           {day}
    //         </label>
    //         <div className="flex items-center gap-4">
    //           <div className="relative mt-3 flex items-center gap-2">
    //             <div>
    //               <input
    //                 id={day.toLowerCase()}
    //                 onChange={() => toggleDay(day)}
    //                 checked={dayStatus[day]}
    //                 type="checkbox"
    //                 className="peer h-5 w-11 cursor-pointer appearance-none rounded-full bg-[#B9B9B9] transition-colors duration-300 checked:bg-[#0245A5]"
    //               />
    //               <label
    //                 htmlFor={day.toLowerCase()}
    //                 className="shadow-card absolute top-0 left-0 h-5 w-5 cursor-pointer rounded-full border border-slate-300 bg-white transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800"
    //               ></label>
    //             </div>
    //           </div>
    //           <span className="relative top-1 capitalize">{dayStatus[day] ? 'Open' : 'closed'}</span>
    //         </div>
    //       </div>
    //       <div>
    //         {dayStatus[day] && (
    //           <div className="flex items-center gap-3">
    //             <input
    //               className="border px-2 py-1.5"
    //               type="time"
    //               value={dayStatus[day].startTime}
    //               onChange={e =>
    //                 setDayStatus(prev => ({
    //                   ...prev,
    //                   [day]: {
    //                     ...prev[day],
    //                     startTime: e.target.value,
    //                   },
    //                 }))
    //               }
    //             />
    //             <span className="font-medium text-[#32343CB2]">To</span>
    //             <input
    //               className="border px-2 py-1.5"
    //               type="time"
    //               value={dayStatus[day].endTime}
    //               onChange={e =>
    //                 setDayStatus(prev => ({
    //                   ...prev,
    //                   [day]: {
    //                     ...prev[day],
    //                     endTime: e.target.value,
    //                   },
    //                 }))
    //               }
    //             />
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <div>
      <h2 className="text-[20px] font-semibold text-[#32343C]">Select a Preferred Day</h2>
      <div className="my-3 flex w-full items-center justify-between gap-2 overflow-auto px-3">
        <div className="flex gap-8">
          {allDays.map((item, index) => (
            <div
              onClick={() => addDayIndex(item, index)}
              key={index}
              className={`cursor-pointer rounded-[7px] bg-blue-300 p-4 text-white ${
                selectedDayIndex === index && 'bg-primary'
              }`}
            >
              <h1 className="text-center text-sm font-semibold">{item.day}</h1>
              <p className="flex flex-nowrap text-center text-sm font-semibold">{item.date}</p>
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-[20px] font-semibold text-[#32343C]">Select a Preferred Time</h2>
      <div className="my-3 flex w-full items-center justify-between gap-2 overflow-auto px-3">
        <div className="flex gap-8">
          {allTimes.map((time, idx) => (
            <div
              onClick={() => addTimeIndex(idx)}
              key={idx}
              className={`cursor-pointer rounded-[7px] px-4 py-3 text-[13px] font-semibold text-white ${
                selectedTimeIndex.includes(idx) ? 'bg-primary' : `bg-blue-300`
              }`}
            >
              {time}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowBuildingHours;
