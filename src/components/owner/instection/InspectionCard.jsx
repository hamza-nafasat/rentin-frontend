'use client';
import Image from 'next/image';
import { FaBookmark } from 'react-icons/fa';
import { IoHomeOutline } from 'react-icons/io5';
import { BsPatchCheckFill } from 'react-icons/bs';
import { GoArrowUpRight } from 'react-icons/go';
import { MessageUser } from '@/assets/icon';
import { useRouter } from 'next/navigation';

const InspectionCard = ({ data }) => {
  const router = useRouter();
  // Destructure the data object
  const { inspectionImage, userImage, name, address, role, service, price, id } = data;

  return (
    <div className="relative h-full min-h-[283px] w-full rounded-md border bg-white p-2">
      <div className="relative h-[93px] overflow-visible">
        <Image
          src={inspectionImage}
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
      {/* Additional card content */}
      <div className="mt-4 flex w-full flex-col gap-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-semibold">{name}</p>
          </div>
          <div className="h-w-3.5 flex w-3.5 cursor-pointer items-center justify-center rounded-[2px] bg-[#E9F2FF]">
            <FaBookmark className="text-primary" />
          </div>
        </div>
        <div className="text-primary flex items-center gap-1">
          <IoHomeOutline />
          <span className="text-xs font-medium">{address}</span>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-xs font-medium">{role}</h1>
          <BsPatchCheckFill className="text-primary" />
        </div>
        <div>
          <p className="text-xs font-medium">{service}</p>
        </div>
        <div>
          <p className="text-base font-medium">{price}</p>
        </div>
        <div className="mt-3 flex items-center justify-center gap-4">
          <div className="flex h-6 items-center justify-end rounded-[2px]">
            <Button
              onClick={() => router.push(`/owner/agent/agent-profile/${id}`)}
              className="!bg-[#A4A9B0]"
              text={'View Profile'}
              icon={<GoArrowUpRight />}
            />
          </div>
          <div className="flex h-6 items-center justify-end rounded-[2px]">
            <Button
              // onClick={() => router.push(`/owner/tenants/tenants-profile/${tenant?.id}`)}
              text={'Hire Agent'}
              icon={<MessageUser />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionCard;

const Button = ({ className, text, icon, ...rest }) => {
  return (
    <button
      {...rest}
      className={`${className} bg-primary flex cursor-pointer items-center gap-2 rounded-[4px] p-2 text-sm font-medium text-white`}
    >
      {text}
      {icon}
    </button>
  );
};
