'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';
import { PiMapPinFill } from 'react-icons/pi';
import { TbStarFilled } from 'react-icons/tb';
import { useRouter } from 'next/navigation';
import { Chat } from '@/assets/icon';
import { GoBookmarkFill } from 'react-icons/go';
import { IoHomeOutline } from 'react-icons/io5';
import { GoArrowUpRight } from 'react-icons/go';

const AgentCard = ({ data, role }) => {
  const router = useRouter();
  const handleViewDetails = () => {
    if (role === 'agent') {
      router.push(`/owner/agent/agent-profile/${data?._id}`);
    } else if (role === 'admin') {
      router.push(`/admin/users/agent/agent-profile/${data?._id}`);
    } else {
      console.warn('Unknown role:', role);
    }
  };
  return (
    <div className="relative h-full min-h-[255px] w-full min-w-[270px] rounded-md">
      <Image
        src={data?.image}
        width={270}
        height={225}
        className="absolute inset-0 h-full w-full rounded-md object-cover"
        alt="property image"
      />
      <div className="absolute inset-0 h-full w-full rounded-md bg-black/20"></div>
      <div className="absolute top-0 left-0 m-2 flex items-center justify-between gap-1 rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-[#3582E7]">
        <div>
          <TbStarFilled className="text-md text-[#FAD400]" />
        </div>
        <div>
          <span className="text-xs text-[#969696]">{data?.ratings}/5</span>
        </div>
      </div>
      <div className="absolute top-2 right-2 cursor-pointer">
        <Chat className="text-xl text-white" />
      </div>
      <div className="absolute bottom-3 left-3 w-[calc(100%-24px)] rounded-md bg-white p-3">
        <div className="flex items-end justify-between gap-2">
          <div>
            <h6 className="text-xs font-bold text-[#FDAC3B]">{data?.speciality}</h6>
            <h4 className="text-textColor text-sm leading-none font-semibold md:text-base">
              {data?.name}
            </h4>
          </div>
          <span
            className={`flex size-[18px] items-center justify-center rounded-xs bg-[#1D7FFF1A] text-xs font-semibold text-[#0245A5]`}
          >
            <GoBookmarkFill />
          </span>
        </div>
        <p className="my-1 flex items-center gap-1 text-[10px] text-[#0345A5]">
          <IoHomeOutline className="text-[#0345A5]" />
          {data?.address}
        </p>
        <div className="item center flex justify-between">
          <div>
            <p className="text-xs text-[#32343C]">Task:</p>
          </div>
          <div>
            <p className="text-xs font-semibold">{data?.task}</p>
          </div>
        </div>

        <div className="flex items-center justify-center border-t border-[#d8d8d8dc] pt-[8px]">
          <button
            onClick={handleViewDetails}
            // onClick={() => router.push(`/owner/agent/agent-profile/${data?._id}`)}
            className="bg-primary cursor-pointer rounded-sm px-[4px] py-[3px]"
          >
            <div className="flex items-center gap-1">
              <p className="text-xs text-white">View Details</p>
              <GoArrowUpRight className="text-md font-semibold text-white" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
