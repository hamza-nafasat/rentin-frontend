// 'use client';
// import { Bath, BedIcons, Garage, Kitchens, Rooms, SqftIcon } from '@/assets/icon';
// import UserReviewsCard from '@/components/owner/properties/UserReviewsCard';
// import MapWithLocation from '../../owner/addProperty/MapWithLocation';
// import Button from '@/components/shared/small/Button';
// import dynamic from 'next/dynamic';
// import Image from 'next/image';
// import React, { useState } from 'react';
// import { FaTimes } from 'react-icons/fa';
// import { MdLocationPin } from 'react-icons/md';
// import { GoArrowUpRight } from 'react-icons/go';
// import Link from 'next/link';

// // import HouseMap from './HouseMap';
// const HouseMap = dynamic(() => import('./HouseMap'), {
//   ssr: false,
// });

// function PropertyDetailsSlider({ data, onClose, setIsModalOpen }) {
//   // console.log("data",data);

//   const [selectedTab, setSelectedTab] = useState('overview');

//   // Function to handle tab click
//   const handleTabClick = tab => {
//     setSelectedTab(tab);
//   };

//   return (
//     <div className="scroll-0 h-full overflow-y-auto p-5">
//       <div className="flex items-center justify-between">
//         <button onClick={onClose} className="scale-on-hover cursor-pointer text-xl">
//           <FaTimes />
//         </button>
//         <h2 className="text-2xl font-bold">Property Details</h2>
//         <Link
//           href={`/tenant/browser-property/property-details/${data?.id}`}
//           className="scale-on-hover bg-primary flex size-6 cursor-pointer items-center justify-center rounded-sm"
//         >
//           <GoArrowUpRight className="font-bold text-white" />
//         </Link>
//       </div>
//       <div className="mt-5 grid grid-cols-6 gap-2">
//         {/* Main large image */}
//         <div className="col-span-4">
//           <Image
//             src={data?.images[0]}
//             width={310}
//             height={216}
//             alt="icon"
//             className="h-full w-full rounded-lg object-cover"
//           />
//         </div>

//         {/* Smaller images */}
//         <div className="col-span-2">
//           <div className="flex flex-col gap-2">
//             <div>
//               <Image
//                 src={data?.images[1]}
//                 width={101}
//                 height={101}
//                 alt="icon"
//                 className="h-full w-full rounded-lg object-cover"
//               />
//             </div>
//             <div className="relative flex flex-col gap-2">
//               <Image
//                 src={data?.images[1]}
//                 width={101}
//                 height={101}
//                 alt="icon"
//                 className="h-full w-full rounded-lg object-cover"
//               />

//               {data?.images.length > 3 && (
//                 <div className="absolute inset-0 top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-white/50 text-xs font-bold text-white">
//                   {data?.images.length - 3} {data?.images.length - 3 > 1} +
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="mt-4 flex flex-col">
//         <div className="flex items-center justify-between">
//           <p className="text-[22px] font-semibold">Dream House</p>
//           <p className="text-[22px] font-semibold">
//             {data?.rentPrice}
//             <span className="text-textSecondary text-sm font-semibold">/month</span>
//           </p>
//         </div>
//         <div className="flex items-center">
//           <MdLocationPin className="text-primary" />
//           <p className="text-sm text-[#545454]">{data?.address}</p>
//         </div>
//       </div>

//       <div className="h-full overflow-y-auto p-5">
//         <div className="mb-4 flex w-full">
//           <div
//             onClick={() => handleTabClick('overview')}
//             className={`w-full cursor-pointer px-4 py-2 text-center text-base font-semibold text-[#848A9C] ${
//               selectedTab === 'overview' ? 'border-b-2 text-black' : 'bg-white'
//             }`}
//           >
//             Overview
//           </div>

//           <div
//             onClick={() => handleTabClick('reviews')}
//             className={`w-full cursor-pointer px-4 py-2 text-center text-base font-semibold text-[#848A9C] ${
//               selectedTab === 'reviews' ? 'border-b-2 text-black' : 'bg-white'
//             }`}
//           >
//             Reviews
//           </div>
//         </div>

//         {/* Content Based on Selected Tab */}
//         <div>
//           {selectedTab === 'overview' && (
//             <div className=" ">
//               <div>
//                 <p className="text-base font-semibold">Description</p>
//                 <p className="custom-scroll h-12 overflow-auto text-sm leading-tight tracking-tight">
//                   {data?.description}
//                 </p>
//               </div>
//               <div className="my-5">
//                 <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
//                   {/* <FeatureItem icon={Rooms} value={data?.rooms} label="Rooms" /> */}
//                   <FeatureItem icon={BedIcons} value={data?.bedRooms} label="Beds" />
//                   <FeatureItem icon={Bath} value={data?.bathRooms} label="Baths" />
//                 </div>

//                 <div className="mt-4 flex flex-col items-center justify-center gap-4 md:flex-row">
//                   <FeatureItem icon={Kitchens} value={data?.kitchens} label="Kitchens" />
//                   <FeatureItem icon={SqftIcon} value={data?.beds} label="sqft" />
//                   <FeatureItem icon={Garage} value={data?.garages} label="Garage" />
//                 </div>
//               </div>
//               <div className="flex flex-col justify-center gap-4 md:flex-row">
//                 <Button cn={''} onClick={() => setIsModalOpen(true)} text="Visit Now" />
//                 <Button cn={''} text="Book Now" />
//               </div>
//               <div className="mt-5">
//                 <HouseMap location={data?.address} image={data?.images[0]} name={'Dream house'} status={data?.type} />
//               </div>
//             </div>
//           )}

//           {selectedTab === 'reviews' && (
//             <div className="p-4">
//               <UserReviewsCard />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PropertyDetailsSlider;

// const FeatureItem = ({ icon: Icon, value, label }) => (
//   <div className="flex items-center justify-between gap-2 rounded-lg border px-2 py-1.5 text-[14px]">
//     <Icon />
//     {value} {label}
//   </div>
// );

'use client';
import { Bath, BedIcons, Garage, Kitchens, Rooms, SqftIcon } from '@/assets/icon';
import UserReviewsCard from '@/components/owner/properties/UserReviewsCard';
// import MapWithLocation from '../../owner/addProperty/MapWithLocation';
import Button from '@/components/shared/small/Button';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { GoArrowUpRight } from 'react-icons/go';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// import HouseMap from './HouseMap';
const HouseMap = dynamic(() => import('./HouseMap'), {
  ssr: false,
});

function PropertyDetailsSlider({ data, onClose, setIsModalOpen }) {
  // console.log("data",data);

  const [selectedTab, setSelectedTab] = useState('overview');
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  // Function to handle tab click
  const handleTabClick = tab => {
    setSelectedTab(tab);
  };

  const getPropertyImages = () => {
    if (data?.images && data.images.length > 0) {
      return data.images.map(img => img.url);
    }
    return ['/images/placeholder-property.jpg'];
  };

  const propertyImages = getPropertyImages();

  useEffect(() => {
    // Check if router is ready and mounted
    if (router.isReady) {
      setIsReady(true);
    }
  }, [router.isReady]);

  return (
    <div className="scroll-0 h-full overflow-y-auto p-5">
      <div className="flex items-center justify-between">
        <button onClick={onClose} className="scale-on-hover cursor-pointer text-xl">
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold">Property Details</h2>
        <Link
          href={`/tenant/browser-property/property-details/${data?._id}`}
          className="scale-on-hover bg-primary flex size-6 cursor-pointer items-center justify-center rounded-sm"
        >
          <GoArrowUpRight className="font-bold text-white" />
        </Link>
      </div>
      <div className="mt-5 grid grid-cols-6 gap-2">
        {/* Main large image */}
        <div className="col-span-4">
          <Image
            src={propertyImages[0]}
            width={310}
            height={216}
            alt="Property main image"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>

        {/* Smaller images */}
        <div className="col-span-2">
          <div className="flex flex-col gap-2">
            <div>
              <Image
                src={propertyImages[1] || propertyImages[0]}
                width={101}
                height={101}
                alt="Property image"
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <Image
                src={propertyImages[2] || propertyImages[1] || propertyImages[0]}
                width={101}
                height={101}
                alt="Property image"
                className="h-full w-full rounded-lg object-cover"
              />

              {propertyImages.length > 3 && (
                <div className="absolute inset-0 top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-black/50 text-xs font-bold text-white">
                  +{propertyImages.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <div className="flex items-center justify-between">
          <p className="text-[22px] font-semibold">{data?.projectName || 'Property Name'}</p>
          <p className="text-[22px] font-semibold">
            ${data?.contractRate?.rate}
            <span className="text-textSecondary text-sm font-semibold">/month</span>
          </p>
        </div>
        <div className="flex items-center">
          <MdLocationPin className="text-primary" />
          <p className="text-sm text-[#545454]">{data?.address || 'Address not available'}</p>
        </div>
      </div>

      <div className="h-full overflow-y-auto p-5">
        <div className="mb-4 flex w-full">
          <div
            onClick={() => handleTabClick('overview')}
            className={`w-full cursor-pointer px-4 py-2 text-center text-base font-semibold text-[#848A9C] ${
              selectedTab === 'overview' ? 'border-b-2 text-black' : 'bg-white'
            }`}
          >
            Overview
          </div>

          <div
            onClick={() => handleTabClick('reviews')}
            className={`w-full cursor-pointer px-4 py-2 text-center text-base font-semibold text-[#848A9C] ${
              selectedTab === 'reviews' ? 'border-b-2 text-black' : 'bg-white'
            }`}
          >
            Reviews
          </div>
        </div>

        {/* Content Based on Selected Tab */}
        <div>
          {selectedTab === 'overview' && (
            <div className=" ">
              <div>
                <p className="text-base font-semibold">Description</p>
                <p className="custom-scroll h-12 overflow-auto text-sm leading-tight tracking-tight">
                  {data?.description || 'No description available'}
                </p>
              </div>
              <div className="my-5">
                <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                  {/* <FeatureItem icon={Rooms} value={data?.rooms} label="Rooms" /> */}
                  <FeatureItem icon={BedIcons} value={data?.bedRooms || 0} label="Beds" />
                  <FeatureItem icon={Bath} value={data?.bathRooms || 0} label="Baths" />
                </div>

                <div className="mt-4 flex flex-col items-center justify-center gap-4 md:flex-row">
                  <FeatureItem icon={Kitchens} value={data?.kitchens || 0} label="Kitchens" />
                  <FeatureItem icon={SqftIcon} value={data?.unitArea || 'N/A'} />
                  <FeatureItem icon={Garage} value={data?.garages || 0} label="Garage" />
                </div>
              </div>

              <div className="flex flex-col justify-center gap-4 md:flex-row">
                <Button cn={''} onClick={() => setIsModalOpen(true)} text="Visit Request" />
                <Button cn={''} onClick={() => router.push(`/tenant/booking-details/${data?._id}`)} text="Rent Now" />
              </div>
              <div className="mt-5">
                <HouseMap
                  location={data?.address || 'Location not available'}
                  image={propertyImages[0]}
                  name={data?.propertyTitle || data?.projectName || 'Property'}
                  status={data?.propertyStatus || 'available'}
                  latitude={data?.latitude}
                  longitude={data?.longitude}
                  rent={data?.contractRate?.rate}
                />
              </div>
            </div>
          )}

          {selectedTab === 'reviews' && (
            <div className="p-4">
              <UserReviewsCard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyDetailsSlider;

const FeatureItem = ({ icon: Icon, value, label }) => (
  <div className="flex items-center justify-between gap-2 rounded-lg border px-2 py-1.5 text-[14px]">
    <Icon />
    {value} {label}
  </div>
);
