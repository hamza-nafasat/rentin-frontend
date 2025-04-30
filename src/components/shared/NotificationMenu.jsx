import { notificationsData } from '@/data/data';
import Image from 'next/image';
import { RiArrowRightUpLine } from 'react-icons/ri';

const NotificationMenu = ({ isNotificationOpen }) => {
  return (
    <div
      className={`custom-scroll absolute top-[45px] right-0 z-[99] w-[300px] overflow-y-scroll rounded-lg bg-white px-5 py-4 transition-all duration-200 md:w-[400px] ${
        isNotificationOpen ? 'h-[300px] opacity-100 md:h-[500px]' : 'h-0 opacity-0'
      }`}
      style={{ boxShadow: '0px 2px 12px 0px #3582E71A' }}
    >
      <h6 className="text-text-textColor text-base font-semibold md:text-xl">Notifications</h6>
      <div className="mt-4">
        <h6 className="text-text-textColor text-sm font-medium md:text-base">Today</h6>
        <div className="mt-4 flex flex-col gap-4">
          {notificationsData.slice(0, 3).map((list, i) => (
            <List list={list} key={i} />
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h6 className="text-text-textColor text-sm font-medium md:text-base">Yesterday</h6>
        <div className="mt-4 flex flex-col gap-4">
          {notificationsData.slice(0, 2).map((list, i) => (
            <List list={list} key={i} />
          ))}
        </div>
      </div>
      {/* view more button */}
      <div className="mt-4">
        <button className="bg-primary mx-auto flex cursor-pointer items-center justify-center gap-[6px] rounded-[4px] px-2 py-[6px] text-sm font-medium text-white">
          View more
          <RiArrowRightUpLine className="mt-1 text-base text-white" />
        </button>
      </div>
    </div>
  );
};

export default NotificationMenu;

const List = ({ list }) => {
  return (
    <div className="flex items-center gap-[14px] border-b border-[#5F5F5F33] pb-[10px]">
      <Image
        src="https://placehold.co/100x100"
        width={28}
        height={28}
        alt="flag image"
        className="size-[28px] rounded-full object-cover"
      />
      <div>
        <h6 className="text-xs text-[#5F5F5F] md:text-sm">
          <span className="font-medium">{list?.reason}</span> - {list?.message}
        </h6>
        <span className="text-xs text-[#5F5F5F99]">{list?.time}</span>
      </div>
    </div>
  );
};
