import React from 'react';
import AgentProperties from './AgentProperties';
import Image from 'next/image';

function LinkBuildings() {
  return (
    <div className="w-full rounded-lg bg-white p-3.5">
      {
        <div className="flex items-center gap-4">
          <Image src="/images/dashboard/rental.png" width={32} height={32} alt="icon" />
          <span className="text-sm font-semibold">Linked Properties</span>
        </div>
      }
      <div className="mt-4 w-[400px] md:w-full">
        <AgentProperties />
      </div>
    </div>
  );
}

export default LinkBuildings;
