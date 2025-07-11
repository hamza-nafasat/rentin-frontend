'use client';
import IconButton from '@/components/shared/small/IconButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import { PiMapPinFill } from 'react-icons/pi';
import { TbStarFilled } from 'react-icons/tb';

const LinkedOwnerPropertyCard = ({ data }) => {
  const router = useRouter();

  const ownerPropertyHandle = useMemo(
    () => id => {
      router.push(`/agent/properties/owner-property-details/${id}`);
    },
    []
  );

  const propertyType = useMemo(
    () => ({
      className: 'rounded-xs bg-[#1D7FFF1A] px-[6px] py-[3px] text-xs font-semibold text-[#0245A5]',
      text: 'Rent',
    }),
    []
  );

  return (
    <div className="shadow-card relative h-full min-h-[255px] rounded-lg bg-white">
      <Image
        src={data?.image}
        width={270}
        height={215}
        className="absolute inset-0 h-[200px] w-full rounded-lg object-cover"
        alt="property image"
        priority
      />
      <div className="absolute inset-0 h-full w-full rounded-lg"></div>
      <div className="absolute top-0 left-0 rounded-br-xs bg-white px-2 py-1 text-[10px] font-semibold text-[#3582E7]">
        {data?.house}
      </div>

      <div className="absolute bottom-16 left-3 w-[calc(100%-24px)] rounded-lg bg-white p-3">
        <div className="flex items-end justify-between gap-2">
          <div>
            <h6 className="text-xs font-bold text-[#FDAC3B]">{data?.speciality}</h6>
            <h4 className="text-textPrimary text-sm leading-none font-semibold md:text-base">{data?.name}</h4>
          </div>
          <span className={propertyType.className}>{propertyType.text}</span>
        </div>
        <p className="text-textSecondary my-1 flex items-center gap-1 text-[10px]">
          <PiMapPinFill className="text-[#0345A5]" />
          {data?.address}
        </p>
        <div className="flex items-center justify-between border-t border-[#d8d8d8dc] pt-1">
          <p className="text-textPrimary text-sm font-semibold md:text-base">
            ${data?.price}.00
            <span className="text-textSecondary text-[10px]">/month</span>
          </p>
          <div className="flex items-center gap-1">
            <TbStarFilled className="text-sm text-[#FAD400]" />
            <p className="text-textSecondary text-[10px]">{data?.ratings}</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-1 w-full rounded-lg p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-end">
            <p className="text-primary text-lg font-semibold">{data.price}$</p>
            <span className="text-xs font-semibold text-[#1F242F]">Pending Commision</span>
          </div>
          <div>
            <IconButton
              cn="!text-[10px] font-medium py-[3px] !w-[110px] !h-[29px]"
              text={'View Details'}
              rightIcon={<GoArrowUpRight />}
              onClick={() => ownerPropertyHandle(data._id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedOwnerPropertyCard;
