import { IoHomeOutline } from 'react-icons/io5';
import { FaBookmark } from 'react-icons/fa';
import Image from 'next/image';

const UserPropertyCard = () => {
  return (
    <section className="relative flex flex-col gap-8 rounded-lg border-[#D5E0F6] p-4 shadow-lg">
      <div className="relative">
        <Image
          src="/images/properties/Bg.png"
          width={378}
          height={94}
          alt="Property Background"
          className="mx-auto h-auto w-full rounded-t-lg"
        />
        <div className="absolute -bottom-10 left-1/2 size-[103px] -translate-x-1/2 transform">
          <Image
            src="/images/properties/Buildings.png"
            width={103}
            height={103}
            alt="Profile Image"
            className="h-full w-full rounded-full border-4 border-white shadow-md"
          />
        </div>
      </div>
      <div className="mt-8 flex flex-col px-3.5">
        <div className="flex justify-between">
          <div>
            <h1 className="text-xs font-semibold">John Doe</h1>
            <div className="flex items-center gap-1 text-[#0245A5]">
              <IoHomeOutline /> <span className="text-xs">123 Sukhumvit Rd, Bangkok, Thailand</span>
            </div>
          </div>
          <div className="flex size-8 items-center justify-center rounded-[2px] bg-[#E9F2FF]">
            <FaBookmark className="text-[#0245A5]" />
          </div>
        </div>
        <div className="mt-2 flex flex-col">
          <h1 className="text-xs font-semibold">Buildings</h1>
          <div className="flex text-xs text-[#0245A5]">5 Buildings</div>
          <div className="mt-2 mb-8 flex gap-3">
            {[...Array(3)].map((_, index) => (
              <Image
                key={index}
                src="/images/properties/Buildings.png"
                width={78}
                height={43}
                alt="Building"
                className="h-[43px] w-[78px] rounded-sm"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPropertyCard;
