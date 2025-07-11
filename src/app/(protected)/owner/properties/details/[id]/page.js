'use client';
import { use } from 'react';
import PropertiesImageSlider from '@/components/owner/properties/PropertiesImageSlider';
import PropertyDescription from '@/components/owner/properties/PropertyDescription';
import { useGetSinglePropertyQuery } from '@/features/property/propertyApi';

const PropertyDetails = ({ params }) => {
  const { id: propertyId } = use(params);

  const { data, error, isLoading } = useGetSinglePropertyQuery(propertyId);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <h6 className="text-textPrimary mb-[18px] text-lg font-semibold md:text-[22px]">Property Details</h6>
        <div className="flex h-64 items-center justify-center">
          <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <h6 className="text-textPrimary mb-[18px] text-lg font-semibold md:text-[22px]">Property Details</h6>
        <div className="shadow-card rounded-lg bg-white p-8 text-center">
          <p className="text-lg text-red-500">Error loading property details</p>
          <p className="mt-2 text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!data?.data) {
    return (
      <div className="flex flex-col gap-4">
        <h6 className="text-textPrimary mb-[18px] text-lg font-semibold md:text-[22px]">Property Details</h6>
        <div className="shadow-card rounded-lg bg-white p-8 text-center">
          <p className="text-lg text-gray-600">Property not found</p>
        </div>
      </div>
    );
  }

  const property = data.data;

  // Transform API data for PropertiesImageSlider
  const transformedImages = {
    mainImages: property.images?.slice(0, 4).map(img => img.url) || ['/images/placeholder-property.jpg'],
    sideImages: property.images?.slice(4, 8).map(img => img.url) || [],
    propertyFeatures: [
      { icon: 'BedIcon', label: 'Bed', count: property.bedRooms || 0 },
      { icon: 'BathIcon', label: 'Bath', count: property.bathRooms || 0 },
      { icon: 'SqmIcon', label: 'Sqm', count: property.unitArea?.replace(' Sqm', '') || 0 },
      { icon: 'FloorsIcon', label: 'Floor', count: property.floor || 1 },
    ],
    propertyInfo: {
      title: property.propertyTitle || property.projectName || 'Untitled Property',
      address: property.address || 'Address not available',
      price: property.contractRate?.rate || 0,
      status: property.isBooked ? 'Rented' : property.propertyStatus === 'available' ? 'Available' : 'Not Available',
    },
  };

  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-textPrimary mb-[18px] text-lg font-semibold md:text-[22px]">Property Details</h6>
      <PropertiesImageSlider {...transformedImages} />
      <PropertyDescription data={property} />
    </div>
  );
};

export default PropertyDetails;
