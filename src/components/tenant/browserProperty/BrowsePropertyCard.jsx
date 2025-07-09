// import { Bath, BedIcons, SqftIcon } from '@/assets/icon';
// import Image from 'next/image';
// import React from 'react';
// import { FaBookmark } from 'react-icons/fa';

// function BrowsePropertyCard({ data }) {
//   return (
//     <div className="shadow-card h-full w-full cursor-pointer rounded-lg border bg-white lg:h-[440px]">
//       <div className="relative h-[239px] w-full">
//         <Image
//           src={data?.images[0]?.url ? data?.images[0].url : data?.images[0]}
//           width={368}
//           height={239}
//           alt="icon"
//           className="h-full w-full rounded-tl-md rounded-tr-md object-cover"
//         />
//         <div className="absolute top-2 right-2">
//           <div className="scale-on-hover text-primary flex size-8 items-center justify-center rounded-full border bg-[#E9F2FF] px-2 py-1 text-sm shadow">
//             <FaBookmark className="text-primary" />
//           </div>
//         </div>

//         <div className="absolute top-2 left-2">
//           <div className="text-secondaryy rounded-lg border bg-white px-1 py-[2px] text-sm shadow">
//             <p className="text-xs font-bold">{data?.type}</p>
//           </div>
//         </div>
//         <div className="absolute right-2 bottom-2">
//           <div className="text-primary rounded-full bg-[#0245a580] px-2.5 py-1 text-sm shadow">
//             <p className="text-white">1/10</p>
//           </div>
//         </div>
//       </div>
//       <div className="p-5">
//         <div>
//           <p className="text-textSecondary text-sm">{data?.address}</p>
//         </div>
//         <div className="mt-4 flex flex-col">
//           <div className="flex flex-col items-center justify-between lg:flex-row">
//             <p className="text-[22px] font-semibold">{data?.price}</p>
//             <p className="text-[22px] font-semibold">
//               {data?.rentPrice}
//               <span className="text-textSecondary text-sm font-semibold">/month</span>
//             </p>
//           </div>
//           <div>
//             <p className="text-lg text-[#545454]">Dream House</p>
//           </div>
//         </div>
//         <div className="mt-4 mb-4 border-b-2"></div>
//         <div className="flex items-center justify-between">
//           <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
//             <BedIcons />
//             <p className="text-primary text-sm font-semibold">{data?.beds}</p>
//             <p className="text-primary text-sm font-semibold"> Beds</p>
//           </div>
//           <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
//             <Bath />
//             <p className="text-primary text-sm font-semibold">{data?.baths} </p>
//             <p className="text-primary text-sm font-semibold"> Bath</p>
//           </div>
//           <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
//             <SqftIcon />
//             <p className="text-primary text-sm font-semibold">{data?.area} </p>
//             <p className="text-primary text-sm font-semibold"> Sqft</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BrowsePropertyCard;

import { Bath, BedIcons, SqftIcon } from '@/assets/icon';
import Image from 'next/image';
import React from 'react';
import { FaBookmark } from 'react-icons/fa';

function BrowsePropertyCard({ data }) {
  // Map API response to expected format
  const mappedData = {
    id: data?._id || data?.id,
    city: data?.city || 'Bangkok',
    address: data?.address || 'Address not available',
    type: data?.propertyType || data?.type || 'For Sale',
    images: data?.images || ['/images/browser-property/Properties.png'],
    price: data?.contractRate?.rate ? `$${data.contractRate.rate}` : data?.price || '$450,000',
    rentPrice: data?.contractRate?.rate ? `$${data.contractRate.rate}` : data?.rentPrice || '$2,500',
    beds: data?.bedRooms || data?.beds || 3,
    baths: data?.bathRooms || data?.baths || 2,
    area: data?.unitArea || data?.area || 1800,
    kitchens: data?.kitchens || 1,
    garages: data?.garages || 2,
    latitude: data?.latitude || 13.736717,
    longitude: data?.longitude || 100.523186,
    rooms: data?.rooms || 7,
    description: data?.description || 'Beautiful property',
    status: data?.propertyStatus || data?.status || 'available',
  };

  return (
    <div className="shadow-card h-full w-full cursor-pointer rounded-lg border bg-white lg:h-[440px]">
      <div className="relative h-[239px] w-full">
        <Image
          src={mappedData?.images[0]?.url || mappedData?.images[0]}
          width={368}
          height={239}
          alt="property"
          className="h-full w-full rounded-tl-md rounded-tr-md object-cover"
        />
        <div className="absolute top-2 right-2">
          <div className="scale-on-hover text-primary flex size-8 items-center justify-center rounded-full border bg-[#E9F2FF] px-2 py-1 text-sm shadow">
            <FaBookmark className="text-primary" />
          </div>
        </div>

        <div className="absolute top-2 left-2">
          <div className="text-secondaryy rounded-lg border bg-white px-1 py-[2px] text-sm shadow">
            <p className="text-xs font-bold capitalize">{mappedData?.type}</p>
          </div>
        </div>
        <div className="absolute right-2 bottom-2">
          <div className="text-primary rounded-full bg-[#0245a580] px-2.5 py-1 text-sm shadow">
            <p className="text-white">1/{mappedData?.images?.length || 1}</p>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div>
          <p className="text-textSecondary text-sm">{mappedData?.address}</p>
        </div>
        <div className="mt-4 flex flex-col">
          <div className="flex flex-col items-center justify-between lg:flex-row">
            <p className="text-[22px] font-semibold">{mappedData?.price}</p>
            <p className="text-[22px] font-semibold">
              {mappedData?.rentPrice}
              <span className="text-textSecondary text-sm font-semibold">/month</span>
            </p>
          </div>
          <div>
            <p className="text-lg text-[#545454]">{data?.propertyTitle || data?.projectName || 'Dream House'}</p>
          </div>
        </div>
        <div className="mt-4 mb-4 border-b-2"></div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
            <BedIcons />
            <p className="text-primary text-sm font-semibold">{mappedData?.beds}</p>
            <p className="text-primary text-sm font-semibold"> Beds</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
            <Bath />
            <p className="text-primary text-sm font-semibold">{mappedData?.baths} </p>
            <p className="text-primary text-sm font-semibold"> Bath</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
            <SqftIcon />
            <p className="text-primary text-sm font-semibold">{mappedData?.area} </p>
            <p className="text-primary text-sm font-semibold"> Sqft</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowsePropertyCard;
