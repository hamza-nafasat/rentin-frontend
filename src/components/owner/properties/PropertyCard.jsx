// 'use client';
// import Image from 'next/image';
// import Link from 'next/link';
// import { FaRegEdit } from 'react-icons/fa';
// import { PiMapPinFill } from 'react-icons/pi';
// import { TbStarFilled } from 'react-icons/tb';
// import { useRouter } from 'next/navigation';

// const PropertyCard = ({ data }) => {
//   const router = useRouter();
//   return (
//     <Link
//       href={`/owner/properties/details/${data?._id}`}
//       passHref
//       className="shadow-card relative h-full min-h-[255px] w-full min-w-[270px] cursor-pointer rounded-lg"
//     >
//       <Image
//         src={data?.image}
//         width={270}
//         height={225}
//         className="absolute inset-0 h-full w-full rounded-lg object-cover"
//         alt="property image"
//       />
//       <div className="absolute inset-0 h-full w-full rounded-lg bg-black/20"></div>
//       <div className="absolute top-0 left-0 rounded-br-xs bg-white px-2 py-1 text-[10px] font-semibold text-[#3582E7]">
//         {data?.house}
//       </div>
//       <div className="absolute top-2 right-2 cursor-pointer">
//         <FaRegEdit className="text-xl text-white" />
//       </div>
//       <div className="absolute bottom-3 left-3 w-[calc(100%-24px)] rounded-lg bg-white p-3">
//         <div className="flex items-end justify-between gap-2">
//           <div>
//             <h6 className="text-xs font-bold text-[#FDAC3B]">{data?.speciality}</h6>
//             <h4 className="text-textPrimary text-sm leading-none font-semibold md:text-base">{data?.name}</h4>
//           </div>
//           <span className={`rounded-xs bg-[#1D7FFF1A] px-[6px] py-[3px] text-xs font-semibold text-[#0245A5]`}>
//             Rent
//           </span>
//         </div>
//         <p className="text-textSecondary my-1 flex items-center gap-1 text-[10px]">
//           <PiMapPinFill className="text-[#0345A5]" />
//           {data?.address}
//         </p>
//         <div className="flex items-center justify-between border-t border-[#d8d8d8dc] pt-1">
//           <p className="text-textPrimary text-sm font-semibold md:text-base">
//             ${data?.price}.00
//             <span className="text-textSecondary text-[10px]">/month</span>
//           </p>
//           <div className="flex items-center gap-1">
//             <TbStarFilled className="text-sm text-[#FAD400]" />
//             <p className="text-textSecondary text-[10px]">{data?.ratings}</p>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default PropertyCard;

'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';
import { PiMapPinFill } from 'react-icons/pi';
import { TbStarFilled } from 'react-icons/tb';
import { useRouter } from 'next/navigation';

const PropertyCard = ({ data }) => {
  const router = useRouter();

  // Extract the first image from the images array or use a default
  const propertyImage = data?.images?.[0]?.url || '/images/placeholder-property.jpg';

  // Get the first deal's rent or use contractRate
  const rentPrice = data?.contractRate?.rate || 0;

  // Format property status for display
  const getPropertyStatus = () => {
    if (data?.isBooked) return 'Rented';
    return 'Available';
  };

  // Get property type for display
  const getPropertyType = () => {
    return data?.propertyType || 'Property';
  };

  return (
    <Link
      href={`/owner/properties/details/${data?._id}`}
      passHref
      className="shadow-card relative h-full min-h-[255px] w-full min-w-[270px] cursor-pointer rounded-lg"
    >
      <Image
        src={propertyImage}
        width={270}
        height={225}
        className="absolute inset-0 h-full w-full rounded-lg object-cover"
        alt="property image"
        unoptimized={true}
      />
      <div className="absolute inset-0 h-full w-full rounded-lg bg-black/20"></div>
      <div className="absolute top-0 left-0 rounded-br-xs bg-white px-2 py-1 text-[10px] font-semibold text-[#3582E7]">
        {getPropertyType()}
      </div>
      <div className="absolute top-2 right-2 cursor-pointer">
        <FaRegEdit className="text-xl text-white" />
      </div>
      <div className="absolute bottom-3 left-3 w-[calc(100%-24px)] rounded-lg bg-white p-3">
        <div className="flex items-end justify-between gap-2">
          <div>
            <h6 className="text-xs font-bold text-[#FDAC3B]">{data?.building || 'Building'}</h6>
            <h4 className="text-textPrimary text-sm leading-none font-semibold md:text-base">
              {data?.propertyTitle || data?.projectName || 'Untitled Property'}
            </h4>
          </div>
          <span className={`rounded-xs bg-[#1D7FFF1A] px-[6px] py-[3px] text-xs font-semibold text-[#0245A5]`}>
            {getPropertyStatus()}
          </span>
        </div>
        <p className="text-textSecondary my-1 flex items-center gap-1 text-[10px]">
          <PiMapPinFill className="text-[#0345A5]" />
          {data?.address || 'Address not available'}
        </p>
        <div className="flex items-center justify-between border-t border-[#d8d8d8dc] pt-1">
          <p className="text-textPrimary text-sm font-semibold md:text-base">
            ${rentPrice}.00
            <span className="text-textSecondary text-[10px]">/month</span>
          </p>
          <div className="flex items-center gap-1">
            <TbStarFilled className="text-sm text-[#FAD400]" />
            <p className="text-textSecondary text-[10px]">4.5</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
