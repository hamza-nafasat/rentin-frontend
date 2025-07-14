'use client';
import React, { useState, useEffect } from 'react';
import PropertyImage from './PropertyImage';
import Move from '../forms/Move';
import Buttons from './Buttons';
import Input from '@/components/shared/small/Input';
import { useCreateVisitRequestMutation } from '@/features/visitRequest/visitRequestApi';
import toast from 'react-hot-toast';

function Content4({ data, setIsModalOpen2, setIsModalOpen3, formData, setFormData, onBack, onCancel }) {
  const [localFormData, setLocalFormData] = useState(formData);
  const [createVisitRequest, { isLoading, error }] = useCreateVisitRequestMutation();

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const handleInputChange = (field, value) => {
    setLocalFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConfirm = async () => {
    try {
      // Update the form data
      setFormData(localFormData);

      // Prepare the request body according to your API schema
      const requestBody = {
        propertyId: data._id,
        time: Array.isArray(localFormData.selectedTime)
          ? localFormData.selectedTime.join(', ')
          : localFormData.selectedTime,
        date: localFormData.selectedDate,
        nationality: localFormData.nationality,
        numOfOccupants: localFormData.numberOfOccupants,
        purposeOfRental: localFormData.purposeOfRental,
      };
      console.log('data for property', requestBody);

      const response = await createVisitRequest(requestBody).unwrap();
      toast.success(response.message || 'Visit request sent successfully!');

      setIsModalOpen2(false);
      setIsModalOpen3(true);
    } catch (err) {
      const errorMessage = err?.data?.message || err?.message || 'Failed to send visit request. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleBack = () => {
    setFormData(localFormData);
    onBack();
  };

  const formatTime = timeArray => {
    if (Array.isArray(timeArray) && timeArray.length > 0) {
      return timeArray.join(', ');
    }
    return timeArray || '';
  };

  return (
    <div className="flex flex-col">
      <PropertyImage propertyData={data} />
      <div>
        <form action="">
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input
                shadow
                type={'text'}
                label={'Name'}
                placeholder={'John Doe'}
                value={localFormData.fullName}
                onChange={e => handleInputChange('fullName', e.target.value)}
                readOnly
              />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input
                shadow
                type={'text'}
                label={'Nationality'}
                placeholder={'American'}
                value={localFormData.nationality}
                onChange={e => handleInputChange('nationality', e.target.value)}
                readOnly
              />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input
                shadow
                type={'date'}
                label={'Date'}
                value={localFormData.selectedDate || ''}
                onChange={e => handleInputChange('selectedDate', e.target.value)}
                readOnly
              />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input
                shadow
                type={'text'}
                label={'Time'}
                value={formatTime(localFormData.selectedTime)}
                onChange={e => handleInputChange('selectedTime', e.target.value)}
                readOnly
              />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input
                shadow
                type={'number'}
                label={'Number of Occupants'}
                placeholder={'5'}
                value={localFormData.numberOfOccupants}
                onChange={e => handleInputChange('numberOfOccupants', e.target.value)}
                readOnly
              />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input
                shadow
                label="Purpose of Rental"
                placeholder="For Study"
                value={localFormData.purposeOfRental}
                onChange={e => handleInputChange('purposeOfRental', e.target.value)}
                readOnly
              />
            </div>
          </div>
        </form>
      </div>

      <div className="mt-2 flex justify-between gap-2">
        <button
          onClick={handleBack}
          className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
        >
          Back
        </button>
        <div className="flex gap-2">
          <Buttons
            cancelHandle={onCancel}
            text1={'Cancel'}
            cn={'!bg-[#E35454] hover:!bg-red-500'}
            text2={isLoading ? 'Sending...' : 'Confirm'}
            acceptHandle={handleConfirm}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default Content4;
