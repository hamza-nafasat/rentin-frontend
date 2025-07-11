// import React from 'react';
// import BrowsePropertyCard from '../browserProperty/BrowsePropertyCard';

// export default function PropertyImage({ children }) {
//   const data = [
//     {
//       id: 1,
//       city: 'Bangkok',
//       address: '123 Sukhumvit Rd, Bangkok',
//       type: 'For Sale',
//       images: [
//         '/images/browser-property/Properties.png',
//         '/images/browser-property/Properties.png',
//       ],
//       price: '$450,000',
//       rentPrice: '$2,500',
//       beds: 3,
//       baths: 2,
//       area: 1800,
//       kitchens: 1,
//       garages: 2,
//       latitude: 13.736717,
//       longitude: 100.523186,
//       rooms: 7,
//       description:
//         'Beautiful home in Sukhumvit area, with cozy bedrooms and a spacious living area.',
//       status: 'free',
//     },
//   ];
//   return (
//     <div>
//       {data?.map(property => (
//         <div key={property.id}>
//           <BrowsePropertyCard cn={'!h-fit'} data={property} Children={children} />
//         </div>
//       ))}
//     </div>
//   );
// }

// import React from 'react';
// import BrowsePropertyCard from '../browserProperty/BrowsePropertyCard';

// export default function PropertyImage({ children, propertyData }) {
//   // Use provided propertyData or fallback to default data
//   const data = propertyData
//     ? [propertyData]
//     : [
//         {
//           id: 1,
//           city: 'Bangkok',
//           address: '123 Sukhumvit Rd, Bangkok',
//           type: 'For Sale',
//           images: ['/images/browser-property/Properties.png', '/images/browser-property/Properties.png'],
//           price: '$450,000',
//           rentPrice: '$2,500',
//           beds: 3,
//           baths: 2,
//           area: 1800,
//           kitchens: 1,
//           garages: 2,
//           latitude: 13.736717,
//           longitude: 100.523186,
//           rooms: 7,
//           description: 'Beautiful home in Sukhumvit area, with cozy bedrooms and a spacious living area.',
//           status: 'free',
//         },
//       ];

//   return (
//     <div>
//       {data?.map(property => (
//         <div key={property.id}>
//           <BrowsePropertyCard cn={'!h-fit'} data={property} Children={children} />
//         </div>
//       ))}
//     </div>
//   );
// }

import React from 'react';
import BrowsePropertyCard from '../browserProperty/BrowsePropertyCard';

// export default function PropertyImage({ children, propertyData }) {
//   const data = propertyData
//     ? [propertyData]
//     : [
//         {
//           id: 1,
//           city: 'Bangkok',
//           address: '123 Sukhumvit Rd, Bangkok',
//           type: 'For Sale',
//           images: ['/images/browser-property/Properties.png', '/images/browser-property/Properties.png'],
//           price: '$450,000',
//           rentPrice: '$2,500',
//           beds: 3,
//           baths: 2,
//           area: 1800,
//           kitchens: 1,
//           garages: 2,
//           latitude: 13.736717,
//           longitude: 100.523186,
//           rooms: 7,
//           description: 'Beautiful home in Sukhumvit area, with cozy bedrooms and a spacious living area.',
//           status: 'free',
//         },
//       ];

//   console.log('PropertyImage final data array:', data);

//   return (
//     <div className="flex flex-col gap-4">
//       {data?.map(property => (
//         <div key={property?.id}>
//           <BrowsePropertyCard cn={'!h-fit'} data={property} Children={children} />
//         </div>
//       ))}
//       <div> {children}</div>
//     </div>
//   );
// }

///previous code working before 11 july

// export default function PropertyImage({ children, propertyData }) {
//   // Use the actual property data if available, otherwise use default
//   const data = propertyData
//     ? [propertyData]
//     : [
//         {
//           id: 1,
//           city: 'Bangkok',
//           address: '123 Sukhumvit Rd, Bangkok',
//           type: 'For Sale',
//           images: ['/images/browser-property/Properties.png'],
//           price: '$450,000',
//           rentPrice: '$2,500',
//           beds: 3,
//           baths: 2,
//           area: 1800,
//           kitchens: 1,
//           garages: 2,
//           latitude: 13.736717,
//           longitude: 100.523186,
//           rooms: 7,
//           description: 'Beautiful home in Sukhumvit area, with cozy bedrooms and a spacious living area.',
//           status: 'free',
//         },
//       ];

//   console.log('PropertyImage final data array:', data);

//   return (
//     <div className="flex flex-col gap-4">
//       {data?.map((property, index) => (
//         <div key={property?.id || property?._id || index}>
//           <BrowsePropertyCard cn={'!h-fit'} data={property} Children={children} />
//         </div>
//       ))}
//       <div>{children}</div>
//     </div>
//   );
// }

///previous code working before 11 july

export default function PropertyImage({ children, propertyData }) {
  if (!propertyData) {
    return (
      <div className="flex flex-col gap-4">
        <div className="p-4 text-center text-gray-500">No property data available</div>
        <div>{children}</div>
      </div>
    );
  }

  const formattedProperty = {
    _id: propertyData._id,
    projectName: propertyData.projectName,
    propertyTitle: propertyData.propertyTitle,
    address: propertyData.address,
    images: propertyData.images || [],
    contractRate: propertyData.contractRate,
    totalPrice: propertyData.totalPrice,
    bedRooms: propertyData.bedRooms,
    bathRooms: propertyData.bathRooms,
    unitArea: propertyData.unitArea,
    propertyFor: propertyData.propertyFor,
    // Add any other fields your BrowsePropertyCard expects
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <BrowsePropertyCard cn={'!h-fit'} data={formattedProperty} Children={children} />
      </div>
      <div>{children}</div>
    </div>
  );
}
