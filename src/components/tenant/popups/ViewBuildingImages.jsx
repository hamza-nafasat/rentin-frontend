import React from 'react';
import Image from 'next/image';
import { BathIcon, BedIcon, FloorsIcon, SqmIcon } from '@/assets/icon';

export default function ViewBuildingImages() {
  return (
    <div>
      <div className="flex flex-col items-center gap-2 sm:flex-row">
        <div>
          <Image src="/images/default/viewbuilding1.png" width={428} height={382} alt="icon" />
        </div>
        <div className="flex gap-2 sm:flex-col">
          <div className="flex gap-2">
            <div>
              <Image src="/images/default/viewbuilding2.png" width={106} height={185} alt="icon" />
            </div>
            <div>
              <Image src="/images/default/viewbuilding3.png" width={106} height={185} alt="icon" />
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <Image src="/images/default/viewbuilding4.png" width={106} height={185} alt="icon" />
            </div>
            <div>
              <Image src="/images/default/viewbuilding5.png" width={106} height={185} alt="icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-col items-center justify-between sm:flex-row">
        <div className="w-full sm:basis-[50%]">
          <h1 className="text-[18px] font-semibold text-[#32343C]">
            The Crest Sukhumvit 34, Bangkok
          </h1>
          <p className="text-[17px] font-normal text-[#32343C]">
            778 Sukhumvit Road, Khong Tan, Khlong Toei, Bangkok
          </p>
        </div>
        <div className="flex w-full justify-between sm:basis-[42%]">
          <p className="flex flex-col gap-2 text-[#0245A5]">
            <BedIcon />
            <span className="text-center leading-4">
              2 <br /> Bed
            </span>
          </p>
          <p className="flex flex-col gap-2 text-[#0245A5]">
            <BathIcon />
            <span className="text-center leading-4">
              2 <br /> Baths
            </span>
          </p>
          <p className="flex flex-col gap-2 text-[#0245A5]">
            <SqmIcon />
            <span className="text-center leading-4">
              223 <br /> Sqm
            </span>
          </p>
          <p className="flex flex-col gap-2 text-[#0245A5]">
            <FloorsIcon />
            <span className="text-center leading-4">
              04 <br /> Floors
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
