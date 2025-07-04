'use client';
import Button from '@/components/shared/small/Button';
import Image from 'next/image';
import React, { useState } from 'react';

function ShowPropertyCards({ properties = [], onPropertySelect, setIsModalOpen1, isLoading, error }) {
  const [selectBuilding, setSelectBuilding] = useState();

  const selectHandle = (propertyId, property) => {
    console.log('Selected property ID:', propertyId);
    setSelectBuilding(propertyId);
    if (onPropertySelect) {
      onPropertySelect(property);
    }
  };

  const handleNext = () => {
    if (selectBuilding) {
      const selectedProperty = properties.find(p => p._id === selectBuilding);
      if (selectedProperty && onPropertySelect) {
        onPropertySelect(selectedProperty);
      }
      if (setIsModalOpen1) {
        setIsModalOpen1(true);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[460px] items-center justify-center">
        <div className="text-gray-500">Loading properties...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[460px] items-center justify-center">
        <div className="text-red-500">Error loading properties</div>
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="flex h-[460px] items-center justify-center">
        <div className="text-gray-500">No properties found</div>
      </div>
    );
  }

  return (
    <div className="w-[800px] overflow-x-auto lg:w-full">
      {/* Header Section */}

      {/* Properties List */}
      <div className="flex h-[460px] flex-col gap-2 overflow-auto">
        {properties.map(property => (
          <div
            key={property._id}
            onClick={() => selectHandle(property._id, property)}
            className={`flex cursor-pointer flex-col gap-2.5 rounded border p-2 ${
              selectBuilding === property._id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
          >
            {/* Left Section: Image and Details */}
            <div className="col-span-6">
              <div className="flex gap-3.5">
                <div>
                  <Image
                    src={property?.images?.[0]?.url || '/images/placeholder-property.jpg'}
                    width={182}
                    height={100}
                    alt="property image"
                    className="rounded object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between p-1">
                  <div>
                    <h1 className="text-base font-semibold text-[#0245a5]">
                      {property?.propertyTitle || property?.projectName || 'Untitled Property'}
                    </h1>
                  </div>
                  <div>
                    <h6 className="text-textSecondary text-xs font-normal">
                      {property?.address || 'Address not available'}
                    </h6>
                  </div>
                  <div>
                    <span className="text-base font-semibold">
                      ${property?.contractRate?.rate || 'N/A'}
                      <span className="text-textSecondary text-[8px] font-semibold">{property.period}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <section className="border-t"></section>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Button text={'Next'} onClick={handleNext} disabled={!selectBuilding} />
      </div>
    </div>
  );
}

export default ShowPropertyCards;
