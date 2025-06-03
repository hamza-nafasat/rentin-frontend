import Button from '@/components/shared/small/Button';
import Image from 'next/image';
import React from 'react';
import { LuClock4 } from 'react-icons/lu';
import { SlCalender } from 'react-icons/sl';

function TaskCard({ data }) {
  return (
    <div className="rounded-lg bg-white px-3 py-2">
      <Image
        src={data.image}
        alt="Frame image"
        layout="responsive"
        width={1190}
        height={86}
        className="rounded-lg object-cover"
      />
      <div className="mt-3 flex flex-col">
        <p className="text-base font-semibold">{data.house}</p>
        <p className="text-textSecondary text-sm font-normal">{data.address}</p>
        <div className="my-2 flex gap-2">
          <div className="flex space-x-1.5">
            <LuClock4 />
            <p className="text-[10px] text-[#37415199]/60">{data.time}</p>
          </div>
          <div className="flex space-x-1.5">
            <SlCalender />
            <p className="text-[10px] text-[#37415199]/60">{data.date}</p>
          </div>
        </div>
        <div className="my-2 flex items-center justify-between">
          <p className="text-base font-semibold">Inspection Amount</p>
          <p className="text-base font-semibold">{data.price}</p>
        </div>
        <div className="mt-2 flex items-center justify-center">
          <Button text={'View Details'} cn={' '} />
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
