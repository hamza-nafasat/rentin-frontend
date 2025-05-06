import { myPropertiesData } from '@/data/data';
import Image from 'next/image';
import React from 'react';
import LinkedOwnerPropertyCard from './LinkedOwnerPropertyCard';

function LinkPropertyCards() {
  return (
    <div className="w-full p-4">
      <div className="text-textColor flex items-center gap-[10px] text-sm font-semibold">
        <Image src="/images/dashboard/rental.png" width={32} height={32} alt="icon" priority />
        <p>My Properties</p>
      </div>
      <div className="w-[67vw]">
        <div className="scrollbar-hide flex w-[89vw] gap-4 overflow-x-auto pb-4 md:w-[94vw] lg:w-[87vw]">
          {myPropertiesData.map((card, i) => (
            <div key={i} className="w-[280px] flex-shrink-0 sm:w-[300px] md:w-[300px] lg:w-[320px] xl:w-[350px]">
              <LinkedOwnerPropertyCard data={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LinkPropertyCards;
