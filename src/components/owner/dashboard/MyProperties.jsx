import { RightArrowForwardIcon } from '@/assets/icon';
import Image from 'next/image';
import Link from 'next/link';
import PropertyCard from './PropertyCard';
import { propertiesData } from '@/data/data';

const MyProperties = () => {
  return (
    <div className="scroll-0 h-[710px] overflow-y-scroll rounded-lg border bg-white p-4 shadow-sm lg:p-5 xl:h-full 2xl:h-[730px]">
      <div className="flex items-center justify-between">
        <div className="text-textColor flex items-center gap-[10px] text-sm font-semibold">
          <Image src="/images/dashboard/rental.png" width={32} height={32} alt="icon" />
          My Properties
        </div>
        <Link href="">
          <RightArrowForwardIcon />
        </Link>
      </div>
      <div className="mt-[18px] flex flex-col gap-4 md:gap-6">
        {propertiesData.slice(0, 8).map((card, i) => (
          <PropertyCard data={card} key={i} />
        ))}
      </div>
    </div>
  );
};

export default MyProperties;
