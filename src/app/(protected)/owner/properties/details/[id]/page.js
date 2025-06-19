'use client';
import PropertiesImageSlider from '@/components/owner/properties/PropertiesImageSlider';
import PropertyDescription from '@/components/owner/properties/PropertyDescription';
import { useGetSinglePropertyQuery } from '@/features/property/propertyApi';

const PropertyDetails = () => {
  const propertyId = '6853fec219c49fa84578b72d';
  const { data, error, isLoading } = useGetSinglePropertyQuery(propertyId);

  console.log('property', data);

  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-textPrimary mb-[18px] text-lg font-semibold md:text-[22px]">Property Details</h6>
      <PropertiesImageSlider />
      <PropertyDescription data={data?.data} />
    </div>
  );
};

export default PropertyDetails;
