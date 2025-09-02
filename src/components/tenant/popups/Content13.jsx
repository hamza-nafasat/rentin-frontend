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
import {
  useAcknowledgedBookingRequestMutation,
  useRejectBookingContractMutation,
} from '@/features/booking/bookingRequestApi';
import { downloadRentalContract, previewRentalContract } from '@/utils/pdfGenerator';
import { toast } from 'react-hot-toast';

function Content13({
  bookingRequestData,
  isLoading,
  error,
  bookingRequestId,
  onAcknowledgeSuccess,
  setIsRejectModalOpen,
  setIsModalOpen,
}) {
  const [acknowledgeBookingRequest, { isLoading: acknowledgeLoading }] = useAcknowledgedBookingRequestMutation();
  const [acknowledgeError, setAcknowledgeError] = useState(null);
  const [rejectBookingContract, { isLoading: rejectLoading }] = useRejectBookingContractMutation();
  const [rejectError, setRejectError] = useState(null);

  console.log('booking data in modal', bookingRequestData);

  const handleAcknowledge = async () => {
    try {
      setAcknowledgeError(null);
      await acknowledgeBookingRequest({
        bookingRequestId: bookingRequestId,
      }).unwrap();
      toast.success('Contract accepted successfully!');
      onAcknowledgeSuccess();
    } catch (error) {
      setAcknowledgeError(error?.data?.message || 'Failed to acknowledge booking request');
    }
  };
  const handleReject = async () => {
    try {
      setRejectError(null);
      await rejectBookingContract({
        bookingRequestId: bookingRequestId,
      }).unwrap();
      toast.success('Contract rejected successfully!');
      onAcknowledgeSuccess();
      setIsRejectModalOpen(true);
      setIsModalOpen(false);
      // Close modal or refresh data
    } catch (error) {
      setRejectError(error?.data?.message || 'Failed to reject booking contract');
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
  const totalAmount = (Number(data.totalRent) || 0) + (Number(data.securityDeposit) || 0);

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
            rate: Number(data.contractRate) || 0,
          },
          price: `$${Number(data.contractRate) || 0}`,
          rentPrice: `$${Number(data.contractRate) || 0}`,
          totalPrice: Number(data.contractRate) || 0,

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
        {/* <div className="col-span-2 md:col-span-1">
          <Input shadow type={'time'} label={'Your arrival time'} value={data.arrivalTime || ''} readOnly />
        </div> */}
        <div className="col-span-2 md:col-span-1">
          <Input
            shadow
            type={'text'}
            label={'Arrival time'}
            placeholder={'14:00-15:00'}
            value={data.arrivalTime || ''}
            readOnly
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input shadow type={'text'} label={'Rent Amount'} value={`$${Number(data.totalRent) || 0}`} readOnly />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Input
            shadow
            type={'text'}
            label={'Security Amount'}
            value={`$${Number(data.securityDeposit) || 0}`}
            readOnly
          />
        </div>
      </div>

      {acknowledgeError && (
        <div className="mt-3 rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">Acknowledge Error: {acknowledgeError}</div>
        </div>
      )}
      {rejectError && (
        <div className="mt-3 rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">Reject Error: {rejectError}</div>
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center justify-between">
        <div className="mt-2 flex gap-2">
          <Button
            text={rejectLoading ? 'Processing...' : 'Reject'}
            cn="!bg-[#E35454] hover:!bg-red-500"
            onClick={handleReject}
            disabled={rejectLoading}
          />
          <Button
            text={acknowledgeLoading ? 'Processing...' : 'Acknowledge'}
            cn="!bg-[#34C759] hover:!bg-green-500"
            onClick={handleAcknowledge}
            disabled={acknowledgeLoading}
          />
        </div>
        <div className="flex items-center justify-end gap-10">
          <h1 className="text-[16px] font-bold text-[#32343C]">Total Amount </h1>
          <p className="py-2.5 text-[24px] font-semibold text-[#32343C]">${totalAmount.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Content13;
