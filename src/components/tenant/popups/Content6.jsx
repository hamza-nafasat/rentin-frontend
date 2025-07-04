// 'use client';
// import React from 'react';
// import PropertyImage from './PropertyImage';
// import Image from 'next/image';
// import InputText from '../forms/InputText';
// import Move from '../forms/Move';
// import InputDate from '../forms/InputDate';
// import InputTime from '../forms/InputTime';
// import Buttons from './Buttons';
// import Input from '@/components/shared/small/Input';
// function Content6({ cancelHandle, acceptHandle }) {
//   return (
//     <div className="flex flex-col">
//       <PropertyImage />
//       <div className="mt-3">
//         <form action="">
//           <div>
//             <Input shadow type={'text'} label={'Full Name'} placeholder={'John Doe'} />
//           </div>
//           <div className="mt-3 flex flex-wrap justify-between">
//             <div className="basis-[100%] sm:basis-[49%]">
//               <Input shadow type={'date'} label={'Visit Date'} />
//             </div>
//             <div className="basis-[100%] sm:basis-[49%]">
//               <Input shadow type={'time'} label={'Visit Time'} />
//             </div>
//           </div>
//           <div className="mt-3 flex flex-wrap justify-between">
//             <div className="basis-[100%] sm:basis-[49%]">
//               <Input shadow type={'text'} label={'Nationality'} placeholder={'NYC'} />
//             </div>
//             <div className="basis-[100%] sm:basis-[49%]">
//               <Input shadow type={'text'} label={'Number of Occupants'} placeholder={'5'} />
//             </div>
//           </div>
//           <div className="mt-3 flex flex-wrap justify-between">
//             <div className="basis-[100%] sm:basis-[49%]">
//               <Input shadow type={'text'} label={'Purpose of Rental'} placeholder={'For Study'} />
//             </div>
//             <div className="flex basis-[100%] flex-wrap justify-between sm:basis-[49%]">
//               <Move />
//             </div>
//           </div>
//         </form>
//       </div>
//       <div className="mt-2 flex justify-end gap-2">
//         <Buttons
//           cancelHandle={cancelHandle}
//           acceptHandle={acceptHandle}
//           text1={'Rejected'}
//           cn={'!bg-[#E35454]'}
//           text2={'Accept'}
//         />
//       </div>
//     </div>
//   );
// }

// export default Content6;

// 'use client';
// import React from 'react';
// import PropertyImage from './PropertyImage';
// import Image from 'next/image';
// import Buttons from './Buttons';
// import Input from '@/components/shared/small/Input';

// function Content6({ cancelHandle, acceptHandle, visitRequestData }) {
//   if (!visitRequestData) {
//     return (
//       <div className="flex h-32 items-center justify-center">
//         <div className="border-primary h-6 w-6 animate-spin rounded-full border-b-2"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col">
//       {/* Property Image using original components */}
//       <PropertyImage
//         propertyData={{
//           id: 1,
//           city: visitRequestData.city,
//           address: visitRequestData.address || 'Address not available',
//           type: 'For Rent',
//           images: [
//             visitRequestData.propertyImage
//               ? visitRequestData.propertyImage.replace(/^http:/, 'https:')
//               : '/images/browser-property/Properties.png',
//             visitRequestData.propertyImage
//               ? visitRequestData.propertyImage.replace(/^http:/, 'https:')
//               : '/images/browser-property/Properties.png',
//           ],
//           price: visitRequestData.contractRate ? `${visitRequestData.contractRate}` : '$0',
//           rentPrice: visitRequestData.contractRate ? `${visitRequestData.contractRate}` : '$0',
//           beds: visitRequestData.bedRooms || 0,
//           baths: visitRequestData.bathRooms || 0,
//           area: visitRequestData.unitArea || 0,
//           description: `Property for ${visitRequestData.tenantName || 'tenant'}`,
//           status: 'occupied',
//         }}
//       />

//       <div className="mt-3">
//         <form>
//           <div>
//             <Input shadow type={'text'} label={'Full Name'} value={visitRequestData.tenantName || ''} readOnly />
//           </div>
//           <div className="mt-3 flex flex-wrap justify-between">
//             <div className="basis-[100%] sm:basis-[49%]">
//               <Input shadow type={'text'} label={'Visit Date'} value={visitRequestData.visitDate || ''} readOnly />
//             </div>
//             <div className="basis-[100%] sm:basis-[49%]">
//               <Input shadow type={'text'} label={'Visit Time'} value={visitRequestData.time || ''} readOnly />
//             </div>
//           </div>
//           <div className="mt-3 flex flex-wrap justify-between">
//             <div className="basis-[100%] sm:basis-[49%]">
//               <Input shadow type={'text'} label={'Nationality'} value={visitRequestData.nationality || ''} readOnly />
//             </div>
//             <div className="basis-[100%] sm:basis-[49%]">
//               <Input
//                 shadow
//                 type={'text'}
//                 label={'Number of Occupants'}
//                 value={visitRequestData.numOfOccupants || ''}
//                 readOnly
//               />
//             </div>
//           </div>
//           <div className="mt-3 flex flex-wrap justify-between">
//             <div className="basis-[100%] sm:basis-[49%]">
//               <Input
//                 shadow
//                 type={'text'}
//                 label={'Purpose of Rental'}
//                 value={visitRequestData.purposeOfRental || ''}
//                 readOnly
//               />
//             </div>
//             <div className="basis-[100%] sm:basis-[49%]">
//               <Input shadow type={'text'} label={'Move In Date'} value={visitRequestData.moveInDate || ''} readOnly />
//             </div>
//           </div>
//           <div className="mt-3">
//             <Input shadow type={'text'} label={'Move Out Date'} value={visitRequestData.moveOutDate || ''} readOnly />
//           </div>
//         </form>
//       </div>
//       <div className="mt-4 flex justify-end gap-2">
//         <Buttons
//           cancelHandle={cancelHandle}
//           acceptHandle={acceptHandle}
//           text1={'Reject'}
//           cn={'!bg-[#E35454]'}
//           text2={'Accept'}
//         />
//       </div>
//     </div>
//   );
// }

// export default Content6;

'use client';
import React from 'react';
import PropertyImage from './PropertyImage';
import Buttons from './Buttons';
import Input from '@/components/shared/small/Input';

function Content6({ cancelHandle, acceptHandle, visitRequestData }) {
  console.log(visitRequestData);

  if (!visitRequestData) {
    return (
      <div className="flex h-32 items-center justify-center">
        <div className="border-primary h-6 w-6 animate-spin rounded-full border-b-2"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Property Image using original components */}
      <PropertyImage
        propertyData={{
          id: 1,
          city: visitRequestData.city || 'City',
          address: visitRequestData.address || 'Address not available',
          type: 'For Rent',
          images: [
            visitRequestData.propertyImage
              ? visitRequestData?.propertyImage.replace(/^http:/, 'https:')
              : '/images/browser-property/Properties.png',
            visitRequestData.propertyImage
              ? visitRequestData.propertyImage.replace(/^http:/, 'https:')
              : '/images/browser-property/Properties.png',
          ],
          price: visitRequestData.contractRate ? `${visitRequestData.contractRate}` : '$0',
          rentPrice: visitRequestData.contractRate ? `${visitRequestData.contractRate}` : '$0',
          beds: visitRequestData?.bedRooms || 0,
          baths: visitRequestData?.bathRooms || 0,
          area: visitRequestData.unitArea || 0,
          kitchens: 1,
          garages: 0,
          latitude: 13.736717,
          longitude: 100.523186,
          rooms: 7,
          description: `Property for ${visitRequestData.tenantName || 'tenant'}`,
          status: 'occupied',
        }}
      />

      <div className="mt-3">
        <form>
          <div>
            <Input shadow type={'text'} label={'Full Name'} value={visitRequestData.tenantName || ''} readOnly />
          </div>
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'text'} label={'Visit Date'} value={visitRequestData.visitDate || ''} readOnly />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'text'} label={'Visit Time'} value={visitRequestData.time || ''} readOnly />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'text'} label={'Nationality'} value={visitRequestData.nationality || ''} readOnly />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input
                shadow
                type={'text'}
                label={'Number of Occupants'}
                value={visitRequestData.numOfOccupants || ''}
                readOnly
              />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input
                shadow
                type={'text'}
                label={'Purpose of Rental'}
                value={visitRequestData.purposeOfRental || ''}
                readOnly
              />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input shadow type={'text'} label={'Move In Date'} value={visitRequestData.moveInDate || ''} readOnly />
            </div>
          </div>
          <div className="mt-3">
            <Input shadow type={'text'} label={'Move Out Date'} value={visitRequestData.moveOutDate || ''} readOnly />
          </div>
        </form>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Buttons
          cancelHandle={cancelHandle}
          acceptHandle={acceptHandle}
          text1={'Reject'}
          cn={'!bg-[#E35454] hover:!bg-red-500'}
          text2={'Accept'}
        />
      </div>
    </div>
  );
}

export default Content6;
