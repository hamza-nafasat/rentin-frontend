'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyImage from './PropertyImage';
import Move from '../forms/Move';
import Buttons from './Buttons';
import Input from '@/components/shared/small/Input';
import ShowBuildingHours from '@/components/owner/addProperty/ShowBuildingHours';

function Content2({ setIsModalOpen1, setIsModalOpen2, data, formData, setFormData, onCancel }) {
  const [localFormData, setLocalFormData] = useState(formData);

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const handleInputChange = (field, value) => {
    setLocalFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateTimeChange = (selectedDate, selectedTime) => {
    setLocalFormData(prev => ({
      ...prev,
      selectedDate,
      selectedTime,
    }));
  };

  const handleMoveInDateChange = value => {
    setLocalFormData(prev => ({
      ...prev,
      moveInDate: value,
    }));
  };

  const handleMoveOutDateChange = value => {
    setLocalFormData(prev => ({
      ...prev,
      moveOutDate: value,
    }));
  };

  const handleNext = () => {
    setFormData(localFormData);
    setIsModalOpen1(false);
    setIsModalOpen2(true);
  };

  return (
    <div className="flex flex-col">
      <PropertyImage propertyData={data} />

      <div className="mt-3 bg-white py-4">
        <ShowBuildingHours
          selectedDate={localFormData.selectedDate}
          selectedTime={localFormData.selectedTime}
          onDateTimeChange={handleDateTimeChange}
        />
      </div>

      <div className="mt-3 mb-3">
        <form action="">
          <Input
            shadow
            label="Full Name"
            placeholder="Jamie Fox"
            value={localFormData.fullName}
            onChange={e => handleInputChange('fullName', e.target.value)}
          />
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input
                shadow
                label="Nationality"
                placeholder="NYC"
                value={localFormData.nationality}
                onChange={e => handleInputChange('nationality', e.target.value)}
              />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input
                shadow
                type={'number'}
                label="Number of Occupants"
                placeholder="5"
                value={localFormData.numberOfOccupants}
                onChange={e => handleInputChange('numberOfOccupants', e.target.value)}
              />
            </div>
          </div>

          <Input
            shadow
            label="Purpose of Rental"
            placeholder="For Study"
            value={localFormData.purposeOfRental}
            onChange={e => handleInputChange('purposeOfRental', e.target.value)}
          />
        </form>
      </div>

      <div className="mt-2 flex justify-end gap-2">
        <Buttons
          cancelHandle={onCancel}
          text1="Cancel"
          cn={'!bg-[#E35454] hover:!bg-red-500'}
          text2="Next"
          acceptHandle={handleNext}
        />
      </div>
    </div>
  );
}

export default Content2;
