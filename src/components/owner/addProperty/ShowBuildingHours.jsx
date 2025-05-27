import React, { useState } from 'react';

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function ShowBuildingHours() {
  const [dayStatus, setDayStatus] = useState({
    sunday: null,
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
  });

  console.log('dayStatus', dayStatus);

  const toggleDay = day => {
    setDayStatus(prev => ({ ...prev, [day]: prev[day] ? null : { startTime: '', endTime: '' } }));
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <h1 className="font-medium text-[#32343CB2]">Buildings can be shown in (Hours)</h1>
      {days.map((day, i) => (
        <div className="flex flex-col gap-2 md:flex-row md:gap-5" key={i}>
          <div className="flex items-center justify-between">
            <label className="w-[100px] capitalize" htmlFor={day.toLowerCase()}>
              {day}
            </label>
            <div className="flex items-center gap-4">
              <div className="relative mt-3 flex items-center gap-2">
                <div>
                  <input
                    id={day.toLowerCase()}
                    onChange={() => toggleDay(day)}
                    checked={dayStatus[day]}
                    type="checkbox"
                    className="peer h-5 w-11 cursor-pointer appearance-none rounded-full bg-[#B9B9B9] transition-colors duration-300 checked:bg-[#0245A5]"
                  />
                  <label
                    htmlFor={day.toLowerCase()}
                    className="shadow-card absolute top-0 left-0 h-5 w-5 cursor-pointer rounded-full border border-slate-300 bg-white transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800"
                  ></label>
                </div>
              </div>
              <span className="relative top-1 capitalize">{dayStatus[day] ? 'Open' : 'closed'}</span>
            </div>
          </div>
          <div>
            {dayStatus[day] && (
              <div className="flex items-center gap-3">
                <input
                  className="border px-2 py-1.5"
                  type="time"
                  value={dayStatus[day].startTime}
                  onChange={e =>
                    setDayStatus(prev => ({
                      ...prev,
                      [day]: {
                        ...prev[day],
                        startTime: e.target.value,
                      },
                    }))
                  }
                />
                <span className="font-medium text-[#32343CB2]">To</span>
                <input
                  className="border px-2 py-1.5"
                  type="time"
                  value={dayStatus[day].endTime}
                  onChange={e =>
                    setDayStatus(prev => ({
                      ...prev,
                      [day]: {
                        ...prev[day],
                        endTime: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowBuildingHours;
