import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import { PiMapPinFill } from 'react-icons/pi';

function MapHover({ image, name, status, location }) {
  return (
    <div className="flex items-center justify-between gap-1" style={{ width: '355px' }}>
      <div className="relative h-[92px] w-[115px] overflow-hidden rounded-md bg-red-200">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          unoptimized={true}
          className="rounded-md"
        />
      </div>
      <div className="w-full p-1">
        <div className="flex flex-col">
          <div>
            <p className="text-[8px] font-bold text-[#FDAC3B]">Most Demanded Property</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-semibold">{name}</p>
            <div className="rounded-md bg-red-200 px-[6px] py-[3px]">
              <p className="text-[#E35454]">{status}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="flex items-center gap-1 text-[10px] text-[#969696]">
            <PiMapPinFill className="text-[#0345A5]" />
            {location || 'Evergreen 15 Jakarta, Thailand'}
          </p>
        </div>
        <hr className="border-t border-gray-300" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">
              $388.00
              <span className="text-xs font-semibold text-[#32343C]">/month</span>
            </p>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-[#ECBA0B]">
              <FaStar />
            </div>
            <div>
              <p className="text-[9px] text-[#969696]">4.9/5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapHover;
