import PropertiesImageSlider from '@/components/owner/properties/PropertiesImageSlider';
import PropertyDescription from '@/components/owner/properties/PropertyDescription';
import React from 'react';

function AgentPropertyDetails({
  mainImages = [
    '/images/dashboard/property-card-1.png',
    '/images/dashboard/property-two.jpeg',
    '/images/dashboard/property-three.jpeg',
    '/images/dashboard/property-four.jpeg',
  ],
  sideImages = [
    '/images/dashboard/side-image.png',
    '/images/dashboard/side-image-2.png',
    '/images/dashboard/side-image-3.png',
    '/images/dashboard/property-card-1.png',
  ],
  propertyFeatures = [
    { icon: 'BedIcon', label: 'Bed', count: 2 },
    { icon: 'BathIcon', label: 'Bath', count: 2 },
    { icon: 'SqmIcon', label: 'Sqm', count: 2 },
    { icon: 'FloorsIcon', label: 'Floors', count: 2 },
  ],
  propertyInfo = {
    title: 'The Crest Sukhumvit 34, Bangkok',
    address: '778 Sukhumvit Road, Khong Tan, Khlong Toei, Bangkok',
    price: 243,
    status: 'Available',
  },
}) {
  return (
    <div className="flex flex-col gap-4">
      <PropertiesImageSlider
        mainImages={mainImages}
        sideImages={sideImages}
        propertyFeatures={propertyFeatures}
        propertyInfo={propertyInfo}
      />
      <PropertyDescription />
    </div>
  );
}

export default AgentPropertyDetails;
