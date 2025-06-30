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

export default function PropertyImage({ children, propertyData }) {
  // Debug: Log the received data
  console.log('PropertyImage received propertyData:', propertyData);

  // Use provided propertyData or fallback to default data
  const data = propertyData
    ? [propertyData]
    : [
        {
          id: 1,
          city: 'Bangkok',
          address: '123 Sukhumvit Rd, Bangkok',
          type: 'For Sale',
          images: ['/images/browser-property/Properties.png', '/images/browser-property/Properties.png'],
          price: '$450,000',
          rentPrice: '$2,500',
          beds: 3,
          baths: 2,
          area: 1800,
          kitchens: 1,
          garages: 2,
          latitude: 13.736717,
          longitude: 100.523186,
          rooms: 7,
          description: 'Beautiful home in Sukhumvit area, with cozy bedrooms and a spacious living area.',
          status: 'free',
        },
      ];

  console.log('PropertyImage final data array:', data);

  return (
    <div>
      {data?.map(property => (
        <div key={property.id}>
          <BrowsePropertyCard cn={'!h-fit'} data={property} Children={children} />
        </div>
      ))}
    </div>
  );
}
