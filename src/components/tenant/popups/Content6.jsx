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
          _id: 1,
          city: visitRequestData.city || 'City',
          address: visitRequestData.address || 'Address not available',
          propertyType: visitRequestData.propertyType,
          type: 'For Rent',
          images: [
            {
              url: visitRequestData.propertyImage
                ? visitRequestData.propertyImage.replace(/^http:/, 'https:')
                : '/images/browser-property/Properties.png',
            },
          ],
          // Contract rate mapping
          contractRate: {
            rate: visitRequestData.contractRate || 0,
          },
          price: `$${visitRequestData.contractRate || 0}`,
          rentPrice: `$${visitRequestData.contractRate || 0}`,
          totalPrice: visitRequestData.contractRate || 0,

          // Room details
          bedRooms: parseInt(visitRequestData.bedRooms) || 0,
          beds: parseInt(visitRequestData.bedRooms) || 0,
          bathRooms: parseInt(visitRequestData.bathRooms) || 0,
          baths: parseInt(visitRequestData.bathRooms) || 0,
          unitArea: visitRequestData.unitArea || '0 Sqm',

          // Property names

          projectName: visitRequestData.propertyName || 'Property',
          description: visitRequestData.propertyName || `Property for ${visitRequestData.tenantName || 'tenant'}`,

          // Additional fields
          kitchens: 1,
          garages: 0,
          latitude: 13.736717,
          longitude: 100.523186,
          rooms: parseInt(visitRequestData.bedRooms) || 0,
          status: 'occupied',
          propertyStatus: 'occupied',
          propertyFor: 'rent',
        }}
      />

      <div className="mt-3 grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Full Name'} value={visitRequestData.tenantName || ''} readOnly />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Visit Date'} value={visitRequestData.visitDate || ''} readOnly />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Visit Time'} value={visitRequestData.time || ''} readOnly />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Nationality'} value={visitRequestData.nationality || ''} readOnly />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input
            shadow
            type={'text'}
            label={'Number of Occupants'}
            value={visitRequestData.numOfOccupants || ''}
            readOnly
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input
            shadow
            type={'text'}
            label={'Purpose of Rental'}
            value={visitRequestData.purposeOfRental || ''}
            readOnly
          />
        </div>
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
