import React from 'react';

const leases = [
  {
    id: 1,
    startDate: '2025-01-23',
    endDate: '2025-02-23',
    spendDays: '6',
  },
];

function LeaseDuration({ startDate, endDate, spendDays }) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const totalTimeMs = end - start;
  const totalDays = Math.floor(totalTimeMs / (1000 * 60 * 60 * 24));

  const daysSpent = parseInt(spendDays, 10) || 0;

  let progress = (daysSpent / totalDays) * 100;

  if (daysSpent >= 20 && progress < 50) {
    progress = 50;
  }

  progress = Math.min(progress, 100);

  const formattedStart = start.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const formattedEnd = end.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="my-[11px] rounded-lg bg-white p-[4px] shadow-lg">
      <div className="flex w-full items-center justify-center">
        <span className="text-xs font-medium">Lease Duration</span>
      </div>
      <div className="mx-9 my-2 flex items-center">
        <div className="h-[6px] w-[6px] rounded-full bg-blue-500"></div>
        <div className="relative h-[2px] flex-1 bg-gray-300">
          <div style={{ width: `${progress}%` }} className="h-full bg-blue-500"></div>
        </div>
        <div className="h-[6px] w-[6px] rounded-full bg-gray-600"></div>
      </div>
      <div className="mx-3 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-medium">Start Date</span>
          <span className="text-[8px] font-medium">{formattedStart}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium">End Date</span>
          <span className="text-[8px] font-medium">{formattedEnd}</span>
        </div>
      </div>
    </div>
  );
}

function LeaseList() {
  return (
    <div className="">
      {leases.map(lease => (
        <LeaseDuration
          key={lease.id}
          startDate={lease.startDate}
          endDate={lease.endDate}
          spendDays={lease.spendDays}
        />
      ))}
    </div>
  );
}

export default LeaseList;
