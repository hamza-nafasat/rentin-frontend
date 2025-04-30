// /* eslint-disable react/prop-types */
// 'use client';
// import { useState } from 'react';
// import { LuChevronRight } from 'react-icons/lu';
// import { RiErrorWarningFill } from 'react-icons/ri';
// import { Activities } from '@/assets/icon';

// const RecentActivities = ({ cn }) => {
//   const image = '/images/tenant/dashboard/leasing.png';
//   return (
//     <div className="p-3">
//       <h3 className="text-sm font-[600] md:text-base">Recent Activities</h3>
//       <div className={`${cn} custom-scroll mt-1 overflow-auto`}>
//         <SingleActivities type="Tracking Failure" icon={image} />
//         <SingleActivities type="Driver Overload" icon={image} />
//         <SingleActivities type="Truck Offline" icon={image} />

//         <SingleActivities type="Sensor Malfunction" icon={image} />
//         <SingleActivities type="Tracking Failure" icon={image} />
//         <SingleActivities type="Driver Overload" icon={image} />
//         <SingleActivities type="Truck Offline" icon={image} />

//         <SingleActivities type="Sensor Malfunction" icon={image} />
//       </div>
//     </div>
//   );
// };

// export default RecentActivities;

// const SingleActivities = ({ icon, type }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const handleOpen = () => {
//     setIsOpen(!isOpen);
//   };
//   return (
//     <div
//       className="flex cursor-pointer items-start justify-between gap-4 border-b-[1px] p-2 hover:bg-gray-100"
//       onClick={handleOpen}
//     >
//       <img src={icon} className="w-8" />

//       <div className="flex grow flex-col items-start gap-1">
//         <h3 className="text-sm">{type}</h3>
//         <h5 className="text-[8px]">30 min ago</h5>

//         {isOpen && (
//           <div className="flex items-center gap-1">
//             <RiErrorWarningFill className="text-[#EE4444]" />
//             <p className="text-[10px]">
//               Driver’s real-time location is not updating correctly in the system
//             </p>
//           </div>
//         )}
//       </div>
//       <div className={`transition-all duration-300 ${isOpen ? '-rotate-90' : 'rotate-0'} `}>
//         <LuChevronRight fontSize={20} />
//       </div>
//     </div>
//   );
// };

// // export default RecentActivities

'use client';
import { useState } from 'react';
import { LuChevronRight } from 'react-icons/lu';
import { RiErrorWarningFill } from 'react-icons/ri';

const RecentActivities = ({ cn, data = [] }) => {
  return (
    <div className="p-3">
      <h3 className="text-sm font-[600] md:text-base">Recent Activities</h3>
      <div className={`${cn} custom-scroll mt-1 overflow-auto`}>
        {data.map((activity, index) => (
          <SingleActivities
            key={index}
            type={activity.type}
            icon={activity.icon}
            time={activity.time}
            description={activity.description}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;

const SingleActivities = ({ icon, type, time, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="flex cursor-pointer items-start justify-between gap-4 border-b-[1px] p-2 hover:bg-gray-100"
      onClick={handleOpen}
    >
      <img src={icon} className="w-8" />

      <div className="flex grow flex-col items-start gap-1">
        <h3 className="text-sm">{type}</h3>
        <h5 className="text-[8px]">{time}</h5>

        {isOpen && (
          <div className="flex items-center gap-1">
            <RiErrorWarningFill className="text-[#EE4444]" />
            <p className="text-[10px]">{description}</p>
          </div>
        )}
      </div>
      <div className={`transition-all duration-300 ${isOpen ? '-rotate-90' : 'rotate-0'} `}>
        <LuChevronRight fontSize={20} />
      </div>
    </div>
  );
};
