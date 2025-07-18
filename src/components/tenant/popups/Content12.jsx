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
// function Content12() {
//   return (
//     <div className="flex flex-col">
//       <PropertyImage />
//       <div className="grid grid-cols-2 gap-3">
//         <div className="col-span-2 md:col-span-1">
//           <Input shadow type={'text'} label={'Full name'} placeholder={'John Doe'} />
//         </div>
//         <div className="col-span-2 md:col-span-1">
//           <Input shadow type={'text'} label={'Current City'} placeholder={'xyz country'} />
//         </div>
//         <div className="col-span-2 md:col-span-1">
//           <Input shadow type={'text'} label={'Nationality'} placeholder={'xyz nationality'} />
//         </div>
//         <div className="col-span-2 md:col-span-1">
//           <Input shadow type={'text'} label={'People Staying'} placeholder={'4'} />
//         </div>
//         <div className="col-span-2 md:col-span-1">
//           <Input shadow type={'text'} label={'Visa Type'} placeholder={'xyz nationality'} />
//         </div>
//         <div className="col-span-2 md:col-span-1">
//           <Input shadow type={'text'} label={'Purpose of Rental'} placeholder={'Study'} />
//         </div>
//         <div className="col-span-2 md:col-span-1">
//    <Move />
//         </div>
//         <div className="col-span-2 md:col-span-1">
//           <Input shadow type={'time'} label={'Your arrival time'} value={'14:30'} />
//         </div>
//         <div className="col-span-2 md:col-span-1">
//           <Input shadow type={'text'} label={'Rent Amount'} value={'800'} />
//         </div>
//         <div className="col-span-2 md:col-span-1">
//           <Input shadow type={'text'} label={'Security Amount'} value={'400'} />
//         </div>
//       </div>
//       <div className="mt-3 flex flex-wrap justify-between">
//         <div className="flex basis-[100%] items-center gap-10 sm:basis-[49%]">
//           <h1 className="text-[16px] font-bold text-[#32343C]">Total Amount </h1>
//           <p className="py-2.5 text-[24px] font-semibold text-[#32343C]">$1200</p>
//         </div>
//         <div className="mt-2 flex basis-[100%] justify-end gap-2 sm:basis-[49%]">
//           <Buttons text1={'Cancel'} cn={'!bg-[#E35454] hover:!bg-red-500'} text2={'Confirm'} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Content12;

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

// function Content12({ bookingRequestData, onAccept, onReject }) {
//   // Extract data from bookingRequestData
//   // Note: bookingRequestData is already the data object, not wrapped in another data property
//   const {
//     tenantName = '',
//     nationality = '',
//     cityOfResidence = '',
//     numOfOccupants = '',
//     visaType = '',
//     purposeOfRental = '',
//     arrivalTime = '',
//     moveInDate = '',
//     moveOutDate = '',
//     totalRent = 0,
//     securityDeposit = 0,
//     propertyName = '',
//     address = '',
//     propertyImage = '',
//     bedRooms = '',
//     bathRooms = '',
//     unitArea = '',
//     propertyType = '',
//     contractRate = 0,
//   } = bookingRequestData || {};

//   // Calculate total amount
//   const totalAmount = totalRent + securityDeposit;

//   // Create property object for PropertyImage component
//   const propertyData = {
//     propertyName,
//     address,
//     propertyImage,
//     bedRooms,
//     bathRooms,
//     unitArea,
//     propertyType,
//     contractRate,
//   };

//   const handleCancel = () => {
//     if (onReject) {
//       onReject();
//     }
//   };

//   // Handle confirm (accept) action
//   const handleConfirm = () => {
//     if (onAccept) {
//       onAccept();
//     }
//   };

//   return (
//     <div className="flex flex-col">
//       <PropertyImage
//         propertyData={{
//           address: propertyData.address || 'Address not available',
//           propertyType: propertyData.propertyType,
//           type: 'For Rent',
//           images: [
//             {
//               url: propertyData.propertyImage
//                 ? propertyData.propertyImage.replace(/^http:/, 'https:')
//                 : '/images/browser-property/Properties.png',
//             },
//           ],
//           // Contract rate mapping
//           contractRate: {
//             rate: propertyData.contractRate || 0,
//           },
//           price: `$${propertyData.contractRate || 0}`,
//           rentPrice: `$${propertyData.contractRate || 0}`,
//           totalPrice: propertyData.contractRate || 0,

//           // Room details
//           bedRooms: parseInt(propertyData.bedRooms) || 0,
//           beds: parseInt(propertyData.bedRooms) || 0,
//           bathRooms: parseInt(propertyData.bathRooms) || 0,
//           baths: parseInt(propertyData.bathRooms) || 0,
//           unitArea: propertyData.unitArea || '0 Sqm',

//           // Property names

//           projectName: propertyData.propertyName || 'Property',
//           description: propertyData.propertyName || `Property for ${propertyData.tenantName || 'tenant'}`,

//           // Additional fields
//           kitchens: 1,
//           garages: 0,
//           latitude: 13.736717,
//           longitude: 100.523186,
//           rooms: parseInt(propertyData.bedRooms) || 0,
//           status: 'occupied',
//           propertyStatus: 'occupied',
//           propertyFor: 'rent',
//         }}
//       />
//       <div className="grid grid-cols-2 gap-3">
//         <div className="col-span-2 md:col-span-1">
//           <Input shadow type={'text'} label={'Full name'} placeholder={'John Doe'} value={tenantName} readOnly />
//         </div>
//         <div className="col-span-2 md:col-span-1">
//           <Input
//             shadow
//             type={'text'}
//             label={'Current City'}
//             placeholder={'xyz country'}
//             value={cityOfResidence}
//             readOnly
//           />
//         </div>
//         <div className="col-span-2 md:col-span-1">
//           <Input
//             shadow
//             type={'text'}
//             label={'Nationality'}
//             placeholder={'xyz nationality'}
//             value={nationality}
//             readOnly
//           />
//         </div>
//         <div className="col-span-2 md:col-span-1">
//           <Input shadow type={'text'} label={'People Staying'} placeholder={'4'} value={numOfOccupants} readOnly />
//         </div>
//         <div className="col-span-2 md:col-span-1">
//           <Input shadow type={'text'} label={'Visa Type'} placeholder={'xyz nationality'} value={visaType} readOnly />
//         </div>
//         <div className="col-span-2 md:col-span-1">
//           <Input
//             shadow
//             type={'text'}
//             label={'Purpose of Rental'}
//             placeholder={'Study'}
//             value={purposeOfRental}
//             readOnly
//           />
//         </div>
//         <div className="col-span-2 md:col-span-1">
//           <Move moveInDate={moveInDate} moveOutDate={moveOutDate} />
//         </div>
//         <div className="col-span-2 md:col-span-1">
//           <Input shadow type={'time'} label={'Your arrival time'} value={arrivalTime} readOnly />
//         </div>
//         <div className="col-span-2 md:col-span-1">
//           <Input shadow type={'text'} label={'Rent Amount'} value={`$${totalRent}`} readOnly />
//         </div>
//         <div className="col-span-2 md:col-span-1">
//           <Input shadow type={'text'} label={'Security Amount'} value={`$${securityDeposit}`} readOnly />
//         </div>
//       </div>
//       <div className="mt-3 flex flex-wrap justify-between">
//         <div className="flex basis-[100%] items-center gap-10 sm:basis-[49%]">
//           <h1 className="text-[16px] font-bold text-[#32343C]">Total Amount </h1>
//           <p className="py-2.5 text-[24px] font-semibold text-[#32343C]">${totalAmount}</p>
//         </div>
//         <div className="mt-2 flex basis-[100%] justify-end gap-2 sm:basis-[49%]">
//           <Buttons
//             text1={'Cancel'}
//             cn={'!bg-[#E35454] hover:!bg-red-500'}
//             text2={'Confirm'}
//             onButton1Click={handleCancel}
//             onButton2Click={handleConfirm}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Content12;

'use client';
import React from 'react';
import PropertyImage from './PropertyImage';
import Image from 'next/image';
import InputText from '../forms/InputText';
import Move from '../forms/Move';
import InputDate from '../forms/InputDate';
import InputTime from '../forms/InputTime';
import Buttons from './Buttons';
import Input from '@/components/shared/small/Input';

function Content12({ bookingRequestData, onAccept, onReject, onCancel }) {
  // Extract data from bookingRequestData
  // Note: bookingRequestData is already the data object, not wrapped in another data property
  const {
    tenantName = '',
    nationality = '',
    cityOfResidence = '',
    numOfOccupants = '',
    visaType = '',
    purposeOfRental = '',
    arrivalTime = '',
    moveInDate = '',
    moveOutDate = '',
    totalRent = 0,
    securityDeposit = 0,
    propertyName = '',
    address = '',
    propertyImage = '',
    bedRooms = '',
    bathRooms = '',
    unitArea = '',
    propertyType = '',
    contractRate = 0,
  } = bookingRequestData || {};

  // Calculate total amount
  const totalAmount = totalRent + securityDeposit;

  // Create property object for PropertyImage component
  const propertyData = {
    propertyName,
    address,
    propertyImage,
    bedRooms,
    bathRooms,
    unitArea,
    propertyType,
    contractRate,
  };

  // Handle cancel action (close modal)
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  // Handle reject action (reject the request)
  const handleReject = () => {
    if (onReject) {
      onReject();
    }
  };

  // Handle confirm (accept) action
  const handleConfirm = () => {
    if (onAccept) {
      onAccept();
    }
  };

  return (
    <div className="flex flex-col">
      <PropertyImage
        propertyData={{
          address: propertyData.address || 'Address not available',
          propertyType: propertyData.propertyType,
          type: 'For Rent',
          images: [
            {
              url: propertyData.propertyImage
                ? propertyData.propertyImage.replace(/^http:/, 'https:')
                : '/images/browser-property/Properties.png',
            },
          ],
          // Contract rate mapping
          contractRate: {
            rate: propertyData.contractRate || 0,
          },
          price: `$${propertyData.contractRate || 0}`,
          rentPrice: `$${propertyData.contractRate || 0}`,
          totalPrice: propertyData.contractRate || 0,

          // Room details
          bedRooms: parseInt(propertyData.bedRooms) || 0,
          beds: parseInt(propertyData.bedRooms) || 0,
          bathRooms: parseInt(propertyData.bathRooms) || 0,
          baths: parseInt(propertyData.bathRooms) || 0,
          unitArea: propertyData.unitArea || '0 Sqm',

          // Property names

          projectName: propertyData.propertyName || 'Property',
          description: propertyData.propertyName || `Property for ${propertyData.tenantName || 'tenant'}`,

          // Additional fields
          kitchens: 1,
          garages: 0,
          latitude: 13.736717,
          longitude: 100.523186,
          rooms: parseInt(propertyData.bedRooms) || 0,
          status: 'occupied',
          propertyStatus: 'occupied',
          propertyFor: 'rent',
        }}
      />
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Full name'} placeholder={'John Doe'} value={tenantName} readOnly />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input
            shadow
            type={'text'}
            label={'Current City'}
            placeholder={'xyz country'}
            value={cityOfResidence}
            readOnly
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input
            shadow
            type={'text'}
            label={'Nationality'}
            placeholder={'xyz nationality'}
            value={nationality}
            readOnly
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'People Staying'} placeholder={'4'} value={numOfOccupants} readOnly />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Visa Type'} placeholder={'xyz nationality'} value={visaType} readOnly />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input
            shadow
            type={'text'}
            label={'Purpose of Rental'}
            placeholder={'Study'}
            value={purposeOfRental}
            readOnly
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Move moveInDate={moveInDate} moveOutDate={moveOutDate} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'time'} label={'Your arrival time'} value={arrivalTime} readOnly />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Rent Amount'} value={`$${totalRent}`} readOnly />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Security Amount'} value={`$${securityDeposit}`} readOnly />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap justify-between">
        <div className="flex basis-[100%] items-center gap-10 sm:basis-[49%]">
          <h1 className="text-[16px] font-bold text-[#32343C]">Total Amount </h1>
          <p className="py-2.5 text-[24px] font-semibold text-[#32343C]">${totalAmount}</p>
        </div>
        <div className="mt-2 flex basis-[100%] justify-end gap-2 sm:basis-[49%]">
          {/* Three buttons: Cancel, Reject, Confirm */}
          <button
            onClick={handleCancel}
            className="rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleReject}
            className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
          >
            Reject
          </button>
          <button
            onClick={handleConfirm}
            className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Content12;
