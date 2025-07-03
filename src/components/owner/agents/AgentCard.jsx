'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';
import { PiMapPinFill } from 'react-icons/pi';
import { TbStarFilled } from 'react-icons/tb';
import { useRouter } from 'next/navigation';
import { Chat, MessageUser } from '@/assets/icon';
import { GoBookmarkFill } from 'react-icons/go';
import { IoHomeOutline } from 'react-icons/io5';
import { GoArrowUpRight } from 'react-icons/go';

const AgentCard = ({ data, role, sendContract }) => {
  const router = useRouter();
  const handleViewDetails = () => {
    if (role === 'owner') {
      router.push(`/owner/agent/agent-profile/${data?._id}`);
    } else if (role === 'admin') {
      router.push(`/admin/users/agent/agent-profile/${data?._id}`);
    } else {
      console.warn('Unknown role:', role);
    }
  };
  console.log('datatata', data);

  console.log('datadatadatadatadatadata', data);

  return (
    <div className="shadow-card relative h-full min-h-[255px] w-full min-w-[270px] rounded-lg">
      <Image
        src={data?.image?.url}
        width={270}
        height={225}
        className="absolute inset-0 h-full w-full rounded-lg object-cover"
        alt="property image"
      />
      <div className="absolute inset-0 h-full w-full rounded-lg bg-black/20"></div>
      <div className="absolute top-0 left-0 m-2 flex items-center justify-between gap-1 rounded-lg bg-white px-2 py-1 text-[10px] font-semibold text-[#3582E7]">
        <div>
          <TbStarFilled className="text-md text-[#FAD400]" />
        </div>
        <div>
          <span className="text-textSecondary text-xs">{data?.averageRating}/5</span>
        </div>
      </div>
      <div className="absolute top-2 right-2 cursor-pointer">
        <Chat className="text-xl text-white" />
      </div>
      <div className="absolute bottom-3 left-3 w-[calc(100%-24px)] rounded-lg bg-white p-3">
        <div className="flex items-end justify-between gap-2">
          <div>
            <h6 className="text-xs font-bold text-[#FDAC3B]">{data?.speciality}</h6>
            <h4 className="text-textPrimary text-sm leading-none font-semibold md:text-base">{data?.firstName}</h4>
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
            <p className="text-xs text-[#0245a5]">Task:</p>
          </div>
          <div>
            {data?.tasks?.map(item => (
              <p className="text-xs font-semibold">{item?.taskType}</p>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 border-t border-[#d8d8d8dc] pt-[8px]">
          <Button onClick={handleViewDetails} text={'View Details'} icon={<GoArrowUpRight />} />
          <Button
            text={'Hire Agent'}
            icon={<MessageUser />}
            onClick={() => router.push(`/owner/messages?agent=${data._id}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default AgentCard;

const Button = ({ className, text, icon, ...rest }) => {
  return (
    <button
      {...rest}
      className={`${className} bg-primary flex cursor-pointer items-center gap-2 space-x-4 rounded px-4 py-2 text-sm font-medium text-white hover:bg-[#01367f]`}
    >
      {text}
      {icon}
    </button>
  );
};
