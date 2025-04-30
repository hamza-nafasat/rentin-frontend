'use client';
import IconButton from '@/components/shared/small/IconButton';
import Image from 'next/image';
import React from 'react';
import { FaBookmark } from 'react-icons/fa';
import { IoHomeOutline } from 'react-icons/io5';
import { GoArrowUpRight } from 'react-icons/go';
import { useRouter } from 'next/navigation';

function LinkedOwnerCard({ data }) {
  const router = useRouter();
  const ownerProfileHandle = id => {
    router.push(`/agent/linked-owners/owner-profile/${id}`);
  };
  return (
    <div className="relative h-full min-h-[283px] w-full rounded-md border bg-white p-2">
      <div className="relative h-[93px] overflow-visible">
        <Image
          src={data.inspectionImage}
          width={270}
          height={93}
          alt="Property Background"
          className="mx-auto rounded-t-lg object-contain"
        />
        <div className="absolute -bottom-5 left-1/2 z-10 h-[75px] w-[75px] -translate-x-1/2 transform">
          <Image
            src={data.userImage}
            width={75}
            height={75}
            alt="Profile Image"
            className="h-[75px] w-[75px] rounded-full border-4 border-white shadow-md"
          />
        </div>
      </div>
      <div className="mt-4 flex w-full flex-col gap-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-semibold">{data.name}</p>
          </div>
          <div className="h-w-3.5 flex w-3.5 cursor-pointer items-center justify-center rounded-[2px] bg-[#E9F2FF]">
            <FaBookmark className="text-primary" />
          </div>
        </div>
        <div className="text-primary flex items-center">
          <IoHomeOutline />
          <span className="text-xs font-medium">{data.address}</span>
        </div>
        <div>
          <p className="text-base font-medium">{data.price}</p>
        </div>
        <div className="flex items-center">
          <h1 className="text-xs font-medium">{data.role}</h1>
        </div>
        <div className="flex gap-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="relative h-11 w-20">
              <Image
                src={data.inspectionImage}
                alt="Property Background"
                fill
                className="rounded-lg object-contain"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-end">
            <p className="text-primary text-lg font-semibold">{data.price}</p>
            <span className="text-xs font-semibold text-[#1F242F]">Pending Commision</span>
          </div>
          <div>
            <IconButton
              cn="!text-[10px] font-medium  py-[3px] !bg-[#A4A9B0] !w-[110px] !h-[29px]"
              text={'View Details'}
              rightIcon={<GoArrowUpRight />}
              onClick={() => ownerProfileHandle(data.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkedOwnerCard;
