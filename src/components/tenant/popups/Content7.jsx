// 'use client';
// import React from 'react';
// import PropertyImage from './PropertyImage';
// import Image from 'next/image';
// import Buttons from './Buttons';
// function Content7() {
//   return (
//     <div className="flex flex-col">
//       <p className="px-2 text-[13.4px] text-[#32343C]">
//         You have approved the tenant’s visit request. Please select how you want to show the property
//       </p>
//       <PropertyImage />
//       <div className="mt-3 font-bold text-[#32343C]">
//         <h1>Select One ( who will show the Property )</h1>
//         <div className="mt-4">
//           <div class="mb-4 flex items-center">
//             <input
//               id="myself"
//               type="radio"
//               value=""
//               name="disabled-radio"
//               class="h-4 w-4 border-gray-300 bg-gray-100"
//             />
//             <label for="myself" class="text-md ms-2 font-medium text-[#374151]">
//               <span className="font-bold">Show By Myself</span> → I will show the property
//             </label>
//           </div>
//           <div class="mb-4 flex items-center">
//             <input
//               id="existing"
//               type="radio"
//               value=""
//               name="disabled-radio"
//               class="h-4 w-4 border-gray-300 bg-gray-100"
//             />
//             <label for="existing" class="text-md ms-2 font-medium text-[#374151]">
//               <span className="font-bold">Existing Agent</span> → Assign my agent
//             </label>
//           </div>
//           <div class="flex items-center">
//             <input id="new" type="radio" value="" name="disabled-radio" class="h-4 w-4 border-gray-300 bg-gray-100" />
//             <label for="new" class="text-md ms-2 font-medium text-[#374151]">
//               <span className="font-bold">New Agent</span> → Hire a new agent
//             </label>
//           </div>
//         </div>
//       </div>
//       <div className="mt-3 flex justify-end gap-2">
//         <Buttons text1={'Back'} cn={'!bg-[#5390E0]'} text2={'Confirm Selection'} />
//       </div>
//     </div>
//   );
// }

// export default Content7;

'use client';
import React from 'react';
import PropertyImage from './PropertyImage';
import Buttons from './Buttons';

function Content7({ selectedOption, onOptionChange, onConfirm, onBack, visitRequestData }) {
  return (
    <div className="flex flex-col">
      <p className="px-2 text-[13.4px] text-[#32343C]">
        You have approved the tenant's visit request. Please select how you want to show the property
      </p>

      {/* Property Image using original components with dynamic data */}
      <PropertyImage
        propertyData={
          visitRequestData
            ? {
                id: 1,
                city: visitRequestData.city || 'City',
                address: visitRequestData.address || 'Address not available',
                type: 'For Rent',
                images: [
                  visitRequestData.propertyImage
                    ? visitRequestData.propertyImage.replace(/^http:/, 'https:')
                    : '/images/browser-property/Properties.png',
                  visitRequestData.propertyImage
                    ? visitRequestData.propertyImage.replace(/^http:/, 'https:')
                    : '/images/browser-property/Properties.png',
                ],
                price: visitRequestData.contractRate ? `${visitRequestData.contractRate}` : '$0',
                rentPrice: visitRequestData.contractRate ? `${visitRequestData.contractRate}` : '$0',
                beds: parseInt(visitRequestData.bedRooms) || 0,
                baths: parseInt(visitRequestData.bathRooms) || 0,
                area: parseInt(visitRequestData.unitArea) || 0,
                kitchens: 1,
                garages: 0,
                latitude: 13.736717,
                longitude: 100.523186,
                rooms: 7,
                description: `Property for ${visitRequestData.tenantName || 'tenant'}`,
                status: 'occupied',
              }
            : null
        }
      />

      <div className="mt-3 font-bold text-[#32343C]">
        <h1>Select One ( who will show the Property )</h1>
        <div className="mt-4">
          <div className="mb-4 flex items-center">
            <input
              id="myself"
              type="radio"
              value="myself"
              name="show-property-radio"
              className="h-4 w-4 border-gray-300 bg-gray-100"
              checked={selectedOption === 'myself'}
              onChange={e => onOptionChange(e.target.value)}
            />
            <label htmlFor="myself" className="text-md ms-2 font-medium text-[#374151]">
              <span className="font-bold">Show By Myself</span> → I will show the property
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              id="existing"
              type="radio"
              value="existing"
              name="show-property-radio"
              className="h-4 w-4 border-gray-300 bg-gray-100"
              checked={selectedOption === 'existing'}
              onChange={e => onOptionChange(e.target.value)}
            />
            <label htmlFor="existing" className="text-md ms-2 font-medium text-[#374151]">
              <span className="font-bold">Existing Agent</span> → Assign my agent
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="new"
              type="radio"
              value="new"
              name="show-property-radio"
              className="h-4 w-4 border-gray-300 bg-gray-100"
              checked={selectedOption === 'new'}
              onChange={e => onOptionChange(e.target.value)}
            />
            <label htmlFor="new" className="text-md ms-2 font-medium text-[#374151]">
              <span className="font-bold">New Agent</span> → Hire a new agent
            </label>
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <Buttons
          text1={'Back'}
          cn={'!bg-[#5390E0]'}
          text2={'Confirm Selection'}
          cancelHandle={onBack}
          acceptHandle={onConfirm}
        />
      </div>
    </div>
  );
}

export default Content7;
