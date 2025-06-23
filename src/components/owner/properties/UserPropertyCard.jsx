// import { IoHomeOutline } from 'react-icons/io5';
// import { FaBookmark } from 'react-icons/fa';
// import Image from 'next/image';

// const UserPropertyCard = () => {
//   return (
//     <section className="shadow-card relative flex flex-col gap-8 rounded-lg border-[#D5E0F6] p-4">
//       <div className="relative">
//         <Image
//           src="/images/properties/Bg.png"
//           width={378}
//           height={94}
//           alt="Property Background"
//           className="mx-auto h-auto w-full rounded-t-lg"
//         />
//         <div className="absolute -bottom-10 left-1/2 size-[103px] -translate-x-1/2 transform">
//           <Image
//             src="/images/properties/Buildings.png"
//             width={103}
//             height={103}
//             alt="Profile Image"
//             className="shadow-card h-full w-full rounded-full border-4 border-white"
//           />
//         </div>
//       </div>
//       <div className="mt-8 flex flex-col px-3.5">
//         <div className="flex justify-between">
//           <div>
//             <h1 className="text-xs font-semibold">John Doe</h1>
//             <div className="flex items-center gap-1 text-[#0245A5]">
//               <IoHomeOutline /> <span className="text-xs">123 Sukhumvit Rd, Bangkok, Thailand</span>
//             </div>
//           </div>
//           <div className="flex size-8 items-center justify-center rounded-[2px] bg-[#E9F2FF]">
//             <FaBookmark className="text-[#0245A5]" />
//           </div>
//         </div>
//         <div className="mt-2 flex flex-col">
//           <h1 className="text-xs font-semibold">Buildings</h1>
//           <div className="flex text-xs text-[#0245A5]">5 Buildings</div>
//           <div className="mt-2 mb-8 flex gap-3">
//             {[...Array(3)].map((_, index) => (
//               <Image
//                 key={index}
//                 src="/images/properties/Buildings.png"
//                 width={78}
//                 height={43}
//                 alt="Building"
//                 className="h-[43px] w-[78px] rounded-sm"
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default UserPropertyCard;

// import { IoHomeOutline } from 'react-icons/io5';
// import { FaBookmark } from 'react-icons/fa';
// import Image from 'next/image';
// import { useGetPropertiesByOwnerIdQuery } from '@/features/property/propertyApi';

// const UserPropertyCard = ({ data, ownerData, ownerLoading, ownerError }) => {
//   // Fetch properties owned by this user
//   const {
//     data: propertiesData,
//     isLoading: propertiesLoading,
//     error: propertiesError,
//   } = useGetPropertiesByOwnerIdQuery(ownerData?._id, {
//     skip: !ownerData?._id,
//   });

//   // Handle loading states
//   if (ownerLoading || propertiesLoading) {
//     return (
//       <section className="shadow-card relative flex flex-col gap-8 rounded-lg border-[#D5E0F6] p-4">
//         <div className="animate-pulse">
//           <div className="mb-4 h-24 rounded-t-lg bg-gray-200"></div>
//           <div className="mb-2 h-6 rounded bg-gray-200"></div>
//           <div className="mb-4 h-4 rounded bg-gray-200"></div>
//           <div className="flex gap-3">
//             {[...Array(3)].map((_, index) => (
//               <div key={index} className="h-[43px] w-[78px] rounded-sm bg-gray-200"></div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // Handle error states
//   if (ownerError || propertiesError) {
//     return (
//       <section className="shadow-card relative flex flex-col gap-8 rounded-lg border-[#D5E0F6] p-4">
//         <div className="py-8 text-center text-red-500">
//           <p>Error loading user information</p>
//         </div>
//       </section>
//     );
//   }

//   // Extract user information
//   const userName = ownerData ? `${ownerData.firstName} ${ownerData.lastName}` : 'Unknown User';
//   const userEmail = ownerData?.email || '';
//   const userImage = ownerData?.profileImage || '/images/properties/Buildings.png';

//   // Extract properties information
//   const properties = propertiesData?.data || [];
//   const totalProperties = properties.length;

//   // Get first 3 properties for display
//   const displayProperties = properties.slice(0, 3);

//   return (
//     <section className="shadow-card relative flex flex-col gap-8 rounded-lg border-[#D5E0F6] p-4">
//       <div className="relative">
//         <Image
//           src="/images/properties/Bg.png"
//           width={378}
//           height={94}
//           alt="Property Background"
//           className="mx-auto h-auto w-full rounded-t-lg"
//         />
//         <div className="absolute -bottom-10 left-1/2 size-[103px] -translate-x-1/2 transform">
//           <Image
//             src={userImage}
//             width={103}
//             height={103}
//             alt="Profile Image"
//             className="shadow-card h-full w-full rounded-full border-4 border-white object-cover"
//           />
//         </div>
//       </div>
//       <div className="mt-8 flex flex-col px-3.5">
//         <div className="flex justify-between">
//           <div className="flex-1">
//             <h1 className="text-xs font-semibold">{userName}</h1>
//             <div className="mt-1 flex items-center gap-1 text-[#0245A5]">
//               <IoHomeOutline className="text-sm" />
//               <span className="text-xs break-all">{userEmail}</span>
//             </div>
//           </div>
//           <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-[2px] bg-[#E9F2FF]">
//             <FaBookmark className="text-[#0245A5]" />
//           </div>
//         </div>

//         {totalProperties > 0 && (
//           <div className="mt-4 flex flex-col">
//             <h1 className="text-xs font-semibold">Properties</h1>
//             <div className="flex text-xs text-[#0245A5]">
//               {totalProperties} {totalProperties === 1 ? 'Property' : 'Properties'}
//             </div>
//             <div className="mt-2 mb-8 flex gap-3">
//               {displayProperties.map((property, index) => (
//                 <div key={property._id} className="relative">
//                   <Image
//                     src={property.image?.url || '/images/properties/Buildings.png'}
//                     width={78}
//                     height={43}
//                     alt={property.projectName || `Property ${index + 1}`}
//                     className="h-[43px] w-[78px] rounded-sm object-cover"
//                     onError={e => {
//                       e.target.src = '/images/properties/Buildings.png';
//                     }}
//                   />
//                   {/* Show count indicator if there are more than 3 properties and this is the last displayed item */}
//                   {totalProperties > 3 && index === 2 && (
//                     <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center rounded-sm bg-black">
//                       <span className="text-xs font-semibold text-white">+{totalProperties - 3}</span>
//                     </div>
//                   )}
//                 </div>
//               ))}

//               {/* Fill empty slots if less than 3 properties */}
//               {displayProperties.length < 3 &&
//                 [...Array(3 - displayProperties.length)].map((_, index) => (
//                   <div
//                     key={`empty-${index}`}
//                     className="flex h-[43px] w-[78px] items-center justify-center rounded-sm border-2 border-dashed border-gray-300 bg-gray-100"
//                   >
//                     <span className="text-xs text-gray-400">No Image</span>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         )}

//         {totalProperties === 0 && (
//           <div className="mt-4 flex flex-col">
//             <h1 className="text-xs font-semibold">Properties</h1>
//             <div className="flex text-xs text-gray-500">No properties found</div>
//             <div className="mt-2 mb-8 flex gap-3">
//               {[...Array(3)].map((_, index) => (
//                 <div
//                   key={index}
//                   className="flex h-[43px] w-[78px] items-center justify-center rounded-sm border-2 border-dashed border-gray-300 bg-gray-100"
//                 >
//                   <span className="text-xs text-gray-400">No Image</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default UserPropertyCard;

import { IoHomeOutline } from 'react-icons/io5';
import { FaBookmark } from 'react-icons/fa';
import Image from 'next/image';
import { useGetPropertiesByOwnerIdQuery } from '@/features/property/propertyApi';

const UserPropertyCard = ({ data, ownerData, ownerLoading, ownerError }) => {
  // Fetch properties owned by this user
  const {
    data: propertiesData,
    isLoading: propertiesLoading,
    error: propertiesError,
  } = useGetPropertiesByOwnerIdQuery(ownerData?._id, {
    skip: !ownerData?._id,
  });

  // Handle loading states
  if (ownerLoading || propertiesLoading) {
    return (
      <section className="shadow-card relative flex flex-col gap-8 rounded-lg border-[#D5E0F6] p-4">
        <div className="animate-pulse">
          <div className="mb-4 h-24 rounded-t-lg bg-gray-200"></div>
          <div className="mb-2 h-6 rounded bg-gray-200"></div>
          <div className="mb-4 h-4 rounded bg-gray-200"></div>
          <div className="flex gap-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-[43px] w-[78px] rounded-sm bg-gray-200"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Handle error states
  if (ownerError || propertiesError) {
    return (
      <section className="shadow-card relative flex flex-col gap-8 rounded-lg border-[#D5E0F6] p-4">
        <div className="py-8 text-center text-red-500">
          <p>Error loading user information</p>
        </div>
      </section>
    );
  }

  // Extract user information
  const userName = ownerData ? `${ownerData.firstName} ${ownerData.lastName}` : 'Unknown User';
  const userEmail = ownerData?.email || '';
  const userImage = ownerData?.profileImage
    ? ownerData.profileImage.replace(/^http:/, 'https:')
    : '/images/properties/Buildings.png';

  // Extract properties information
  const properties = propertiesData?.data || [];
  const totalProperties = properties.length;

  // Get first 3 properties for display
  const displayProperties = properties.slice(0, 3);

  return (
    <section className="shadow-card relative flex flex-col gap-8 rounded-lg border-[#D5E0F6] p-4">
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
            src={userImage}
            width={103}
            height={103}
            alt="Profile Image"
            className="shadow-card h-full w-full rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>
      <div className="mt-8 flex flex-col px-3.5">
        <div className="flex justify-between">
          <div className="flex-1">
            <h1 className="text-xs font-semibold">{userName}</h1>
            <div className="mt-1 flex items-center gap-1 text-[#0245A5]">
              <IoHomeOutline className="text-sm" />
              <span className="text-xs break-all">{userEmail}</span>
            </div>
          </div>
          <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-[2px] bg-[#E9F2FF]">
            <FaBookmark className="text-[#0245A5]" />
          </div>
        </div>

        {totalProperties > 0 && (
          <div className="mt-4 flex flex-col">
            <h1 className="text-xs font-semibold">Properties</h1>
            <div className="flex text-xs text-[#0245A5]">
              {totalProperties} {totalProperties === 1 ? 'Property' : 'Properties'}
            </div>
            <div className="mt-2 mb-8 flex gap-3">
              {displayProperties.map((property, index) => {
                // Ensure HTTPS for property images
                const propertyImageUrl = property.image?.url
                  ? property.image.url.replace(/^http:/, 'https:')
                  : '/images/properties/Buildings.png';

                return (
                  <div key={property._id} className="relative">
                    <Image
                      src={propertyImageUrl}
                      width={78}
                      height={43}
                      alt={property.projectName || `Property ${index + 1}`}
                      className="h-[43px] w-[78px] rounded-sm object-cover"
                      onError={e => {
                        e.target.src = '/images/properties/Buildings.png';
                      }}
                    />
                    {/* Show count indicator if there are more than 3 properties and this is the last displayed item */}
                    {totalProperties > 3 && index === 2 && (
                      <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center rounded-sm bg-black">
                        <span className="text-xs font-semibold text-white">+{totalProperties - 3}</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Fill empty slots if less than 3 properties */}
              {displayProperties.length < 3 &&
                [...Array(3 - displayProperties.length)].map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="flex h-[43px] w-[78px] items-center justify-center rounded-sm border-2 border-dashed border-gray-300 bg-gray-100"
                  >
                    <span className="text-xs text-gray-400">No Image</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {totalProperties === 0 && (
          <div className="mt-4 flex flex-col">
            <h1 className="text-xs font-semibold">Properties</h1>
            <div className="flex text-xs text-gray-500">No properties found</div>
            <div className="mt-2 mb-8 flex gap-3">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="flex h-[43px] w-[78px] items-center justify-center rounded-sm border-2 border-dashed border-gray-300 bg-gray-100"
                >
                  <span className="text-xs text-gray-400">No Image</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserPropertyCard;
