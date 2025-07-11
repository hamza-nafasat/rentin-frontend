// import React from 'react';
// import Image from 'next/image';
// import { BathIcon, BedIcon, FloorsIcon, SqmIcon } from '@/assets/icon';

// export default function ViewBuildingImages() {
//   return (
//     <div>
//       <div className="flex flex-col items-center gap-2 sm:flex-row">
//         <div>
//           <Image src="/images/default/viewbuilding1.png" width={428} height={382} alt="icon" />
//         </div>
//         <div className="flex gap-2 sm:flex-col">
//           <div className="flex gap-2">
//             <div>
//               <Image src="/images/default/viewbuilding2.png" width={106} height={185} alt="icon" />
//             </div>
//             <div>
//               <Image src="/images/default/viewbuilding3.png" width={106} height={185} alt="icon" />
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <div>
//               <Image src="/images/default/viewbuilding4.png" width={106} height={185} alt="icon" />
//             </div>
//             <div>
//               <Image src="/images/default/viewbuilding5.png" width={106} height={185} alt="icon" />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="mt-2 flex flex-col items-center justify-between sm:flex-row">
//         <div className="w-full sm:basis-[50%]">
//           <h1 className="text-[18px] font-semibold text-[#32343C]">
//             The Crest Sukhumvit 34, Bangkok
//           </h1>
//           <p className="text-[17px] font-normal text-[#32343C]">
//             778 Sukhumvit Road, Khong Tan, Khlong Toei, Bangkok
//           </p>
//         </div>
//         <div className="flex w-full justify-between sm:basis-[42%]">
//           <p className="flex flex-col gap-2 text-[#0245A5]">
//             <BedIcon />
//             <span className="text-center leading-4">
//               2 <br /> Bed
//             </span>
//           </p>
//           <p className="flex flex-col gap-2 text-[#0245A5]">
//             <BathIcon />
//             <span className="text-center leading-4">
//               2 <br /> Baths
//             </span>
//           </p>
//           <p className="flex flex-col gap-2 text-[#0245A5]">
//             <SqmIcon />
//             <span className="text-center leading-4">
//               223 <br /> Sqm
//             </span>
//           </p>
//           <p className="flex flex-col gap-2 text-[#0245A5]">
//             <FloorsIcon />
//             <span className="text-center leading-4">
//               04 <br /> Floors
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import Image from 'next/image';
import { BathIcon, BedIcon, FloorsIcon, SqmIcon } from '@/assets/icon';

export default function ViewBuildingImages({ data }) {
  // Get the main image and additional images
  const mainImage = data?.images?.[0]?.url || '/images/default/viewbuilding1.png';
  const additionalImages = data?.images?.slice(1, 5) || [];

  // Fill remaining slots with default images if needed
  const defaultImages = [
    '/images/default/viewbuilding2.png',
    '/images/default/viewbuilding3.png',
    '/images/default/viewbuilding4.png',
    '/images/default/viewbuilding5.png',
  ];

  const displayImages = [...additionalImages];
  while (displayImages.length < 4) {
    displayImages.push({ url: defaultImages[displayImages.length] });
  }

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-12">
        <div className="md:col-span-7">
          <Image
            src={mainImage}
            width={428}
            height={382}
            alt="Property main image"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 md:col-span-5">
          <div>
            <Image
              src={displayImages[0]?.url}
              width={106}
              height={185}
              alt="Property image 1"
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <div>
            <Image
              src={displayImages[1]?.url}
              width={106}
              height={185}
              alt="Property image 2"
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <div>
            <Image
              src={displayImages[2]?.url}
              width={106}
              height={185}
              alt="Property image 3"
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <div>
            <Image
              src={displayImages[3]?.url}
              width={106}
              height={185}
              alt="Property image 4"
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-col items-center justify-between sm:flex-row">
        <div className="w-full sm:basis-[50%]">
          <h1 className="text-[18px] font-semibold text-[#32343C]">{data?.propertyTitle || 'Property Title'}</h1>
          <p className="text-[17px] font-normal text-[#32343C]">{data?.address || 'Address not available'}</p>
        </div>
        <div className="flex w-full justify-between sm:basis-[42%]">
          <p className="flex flex-col gap-2 text-[#0245A5]">
            <BedIcon />
            <span className="text-center leading-4">
              {data?.bedRooms || 'N/A'} <br /> Bed
            </span>
          </p>
          <p className="flex flex-col gap-2 text-[#0245A5]">
            <BathIcon />
            <span className="text-center leading-4">
              {data?.bathRooms || 'N/A'} <br /> Bath{data?.bathRooms > 1 ? 's' : ''}
            </span>
          </p>
          <p className="flex flex-col gap-2 text-[#0245A5]">
            <SqmIcon />
            <span className="text-center leading-4">
              {data?.unitArea || 'N/A'} <br />
            </span>
          </p>
          <p className="flex flex-col gap-2 text-[#0245A5]">
            <FloorsIcon />
            <span className="text-center leading-4">
              {data?.floor || 'N/A'} <br /> Floor
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
