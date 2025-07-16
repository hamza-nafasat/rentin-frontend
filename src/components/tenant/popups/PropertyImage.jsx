import React from 'react';
import BrowsePropertyCard from '../browserProperty/BrowsePropertyCard';

export default function PropertyImage({ children, propertyData }) {
  if (!propertyData) {
    return (
      <div className="flex flex-col gap-4">
        <div className="p-4 text-center text-gray-500">No property data available</div>
        <div>{children}</div>
      </div>
    );
  }

  const formattedProperty = {
    _id: propertyData._id,
    projectName: propertyData.projectName,
    propertyTitle: propertyData.propertyTitle,
    address: propertyData.address,
    images: propertyData.images || [],
    contractRate: propertyData.contractRate,
    totalPrice: propertyData.totalPrice,
    bedRooms: propertyData.bedRooms,
    bathRooms: propertyData.bathRooms,
    unitArea: propertyData.unitArea,
    propertyFor: propertyData.propertyFor,
    propertyType: propertyData.propertyType,
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <BrowsePropertyCard cn={'!h-fit'} data={formattedProperty} Children={children} />
      </div>
      <div>{children}</div>
    </div>
  );
}
