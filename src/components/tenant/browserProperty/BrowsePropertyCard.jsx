import { Bath, BedIcons, SqftIcon } from '@/assets/icon';
import Image from 'next/image';
import React from 'react';
import { FaBookmark } from 'react-icons/fa';

function BrowsePropertyCard({ data }) {
  return (
    <div className="h-full w-full cursor-pointer rounded-md border bg-white shadow-lg lg:h-[440px]">
      <div className="relative h-[239px] w-full">
        <Image
          src={data?.images[0]}
          width={368}
          height={239}
          alt="icon"
          className="h-full w-full rounded-tl-md rounded-tr-md object-cover"
        />
        <div className="absolute top-2 right-2">
          <div className="scale-on-hover text-primary flex size-8 items-center justify-center rounded-full border bg-[#E9F2FF] px-2 py-1 text-sm shadow">
            <FaBookmark className="text-primary" />
          </div>
        </div>

        <div className="absolute top-2 left-2">
          <div className="text-primary rounded-md border bg-white px-1 py-[2px] text-sm shadow">
            <p className="text-xs font-bold">{data?.type}</p>
          </div>
        </div>
        <div className="absolute right-2 bottom-2">
          <div className="text-primary rounded-full bg-[#32343C80] px-2.5 py-1 text-sm shadow">
            <p className="text-white">1/10</p>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div>
          <p className="text-sm text-[#969696]">{data?.address}</p>
        </div>
        <div className="mt-4 flex flex-col">
          <div className="flex flex-col items-center justify-between lg:flex-row">
            <p className="text-[22px] font-semibold">{data?.price}</p>
            <p className="text-[22px] font-semibold">
              {data?.rentPrice}
              <span className="text-sm font-semibold text-[#C2C2C2]">/month</span>
            </p>
          </div>
          <div>
            <p className="text-lg text-[#545454]">Dream House</p>
          </div>
        </div>
        <div className="mt-4 mb-4 border-b-2"></div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
            <BedIcons />
            <p className="text-sm font-semibold text-[#32343CCC]/50">{data?.beds}</p>
            <p className="text-sm font-semibold text-[#32343CCC]/50"> Beds</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
            <Bath />
            <p className="text-sm font-semibold text-[#32343CCC]/50">{data?.baths} </p>
            <p className="text-sm font-semibold text-[#32343CCC]/50"> Bath</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
            <SqftIcon />
            <p className="text-sm font-semibold text-[#32343CCC]/50">{data?.area} </p>
            <p className="text-sm font-semibold text-[#32343CCC]/50"> Sqft</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowsePropertyCard;
