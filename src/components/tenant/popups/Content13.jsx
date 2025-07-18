'use client';
import PropertyImage from './PropertyImage';
import InputText from '../forms/InputText';
import Move from '../forms/Move';
import React, { useState } from 'react';
import InputTime from '../forms/InputTime';
import Buttons from './Buttons';
import Image from 'next/image';
import Input from '@/components/shared/small/Input';
import Button from '@/components/shared/small/Button';
import { useAcknowledgedBookingRequestMutation } from '@/features/booking/bookingRequestApi';

function Content13({ bookingRequestData, isLoading, error, bookingRequestId, onAcknowledgeSuccess }) {
  const [acknowledgeBookingRequest, { isLoading: acknowledgeLoading }] = useAcknowledgedBookingRequestMutation();
  const [acknowledgeError, setAcknowledgeError] = useState(null);

  const handleAcknowledge = async () => {
    try {
      setAcknowledgeError(null);
      await acknowledgeBookingRequest({
        bookingRequestId: bookingRequestId,
      }).unwrap();
      onAcknowledgeSuccess();
    } catch (error) {
      setAcknowledgeError(error?.data?.message || 'Failed to acknowledge booking request');
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error loading booking request data</p>
          <p className="text-sm">{error?.data?.message || 'Something went wrong'}</p>
        </div>
      </div>
    );
  }

  if (!bookingRequestData) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center text-gray-500">
          <p>No booking request data available</p>
        </div>
      </div>
    );
  }

  const data = bookingRequestData;
  const totalAmount = (data.totalRent || 0) + (data.securityDeposit || 0);
  return (
    <div className="flex flex-col">
      <PropertyImage
        propertyData={{
          _id: 1,
          city: data.city || 'City',
          address: data.address || 'Address not available',
          propertyType: data.propertyType,
          type: 'For Rent',
          images: [
            {
              url: data.propertyImage
                ? data.propertyImage.replace(/^http:/, 'https:')
                : '/images/browser-property/Properties.png',
            },
          ],
          // Contract rate mapping
          contractRate: {
            rate: data.contractRate || 0,
          },
          price: `$${data.contractRate || 0}`,
          rentPrice: `$${data.contractRate || 0}`,
          totalPrice: data.contractRate || 0,

          // Room details
          bedRooms: parseInt(data.bedRooms) || 0,
          beds: parseInt(data.bedRooms) || 0,
          bathRooms: parseInt(data.bathRooms) || 0,
          baths: parseInt(data.bathRooms) || 0,
          unitArea: data.unitArea || '0 Sqm',

          // Property names

          projectName: data.propertyName || 'Property',
          description: data.propertyName || `Property for ${data.tenantName || 'tenant'}`,

          // Additional fields
          kitchens: 1,
          garages: 0,
          latitude: 13.736717,
          longitude: 100.523186,
          rooms: parseInt(data.bedRooms) || 0,
          status: 'occupied',
          propertyStatus: 'occupied',
          propertyFor: 'rent',
        }}
      />
      {/* <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Full name'} placeholder={'John Doe'} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Current City'} placeholder={'xyz country'} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Nationality'} placeholder={'xyz nationality'} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'People Staying'} placeholder={'4'} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Visa Type'} placeholder={'xyz nationality'} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Purpose of Rental'} placeholder={'Study'} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Move />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'time'} label={'Your arrival time'} value={'14:30'} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Rent Amount'} value={'800'} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Security Amount'} value={'400'} />
        </div>
      </div> */}
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 md:col-span-1">
          <Input
            shadow
            type={'text'}
            label={'Full name'}
            placeholder={'John Doe'}
            value={data.tenantName || ''}
            readOnly
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input
            shadow
            type={'text'}
            label={'Current City'}
            placeholder={'xyz country'}
            value={data.cityOfResidence || ''}
            readOnly
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input
            shadow
            type={'text'}
            label={'Nationality'}
            placeholder={'xyz nationality'}
            value={data.nationality || ''}
            readOnly
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input
            shadow
            type={'text'}
            label={'People Staying'}
            placeholder={'4'}
            value={data.numOfOccupants || ''}
            readOnly
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input
            shadow
            type={'text'}
            label={'Visa Type'}
            placeholder={'xyz nationality'}
            value={data.visaType || ''}
            readOnly
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input
            shadow
            type={'text'}
            label={'Purpose of Rental'}
            placeholder={'Study'}
            value={data.purposeOfRental || ''}
            readOnly
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Move moveInDate={data.moveInDate} moveOutDate={data.moveOutDate} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'time'} label={'Your arrival time'} value={data.arrivalTime || ''} readOnly />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Rent Amount'} value={data.totalRent || ''} readOnly />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Security Amount'} value={data.securityDeposit || ''} readOnly />
        </div>
      </div>
      {/* <div className="mt-3">
        <p className="text-[16px] font-semibold text-[#32343C]">Click to view and Accepted To Complete a Booking</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="basis-[100%] bg-[#ECECECB2] sm:basis-[59%]">
            <a
              href="#"
              className="flex items-center gap-3 px-5 py-3 text-[16px] font-medium text-[#374151]"
              download={'/pdf/Contract File.pdf'}
            >
              <Image src="/images/default/pdf.png" width={30} height={31} alt="icon" />
              Contract File.pdf
            </a>
          </div>
          <div>
            <button className="flex cursor-pointer items-center gap-3">
              <a href="#" className="flex gap-2" download={'/pdf/Contract File.pdf'}>
                <p className="rounded-[2px] bg-[#0245A5] px-4 py-3.5 text-[14px] text-white">Download Contract</p>
                <span>
                  <Image src="/images/default/download.png" width={'49'} height={'49'} alt="icon" />
                </span>
              </a>
            </button>
          </div>
        </div>
      </div> */}
      <div className="mt-3">
        <p className="text-[16px] font-semibold text-[#32343C]">Click to view and Accepted To Complete a Booking</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="basis-[100%] bg-[#ECECECB2] sm:basis-[59%]">
            <a
              href="#"
              className="flex items-center gap-3 px-5 py-3 text-[16px] font-medium text-[#374151]"
              download={'/pdf/Contract File.pdf'}
            >
              <Image src="/images/default/pdf.png" width={30} height={31} alt="icon" />
              Contract File.pdf
            </a>
          </div>
          <div>
            <button className="flex cursor-pointer items-center gap-3">
              <a href="#" className="flex gap-2" download={'/pdf/Contract File.pdf'}>
                <p className="rounded-[2px] bg-[#0245A5] px-4 py-3.5 text-[14px] text-white">Download Contract</p>
                <span>
                  <Image src="/images/default/download.png" width={'49'} height={'49'} alt="icon" />
                </span>
              </a>
            </button>
          </div>
        </div>
      </div>
      {acknowledgeError && (
        <div className="mt-3 rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{acknowledgeError}</div>
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center justify-between">
        <div className="mt-2 flex gap-2">
          <Button text={'Reject'} cn="!bg-[#E35454] hover:!bg-red-500" />
          <Button
            text={acknowledgeLoading ? 'Processing...' : 'Acknowledge'}
            cn="!bg-[#34C759] hover:!bg-green-500"
            onClick={handleAcknowledge}
            disabled={acknowledgeLoading}
          />
        </div>
        <div className="flex items-center justify-end gap-10">
          <h1 className="text-[16px] font-bold text-[#32343C]">Total Amount </h1>
          <p className="py-2.5 text-[24px] font-semibold text-[#32343C]">${totalAmount}</p>
        </div>
      </div>
    </div>
  );
}

export default Content13;
