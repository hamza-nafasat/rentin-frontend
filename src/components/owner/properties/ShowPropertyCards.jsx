import { useGetMyAllPropertiesQuery } from '@/features/property/propertyApi';
import Image from 'next/image';
import React from 'react';

const properties = [
  {
    id: 1,
    image: '/images/properties/PropertyView.png',
    title: 'Charming Homes in Thailand',
    address: '123 Sunset Road, Phuket, Thailand',
    price: '$243',
    period: 'pre month',
    publishDate: 'Apr 29,2024',
    views: '321',
    interestedTenants: '34',
  },
  {
    id: 2,
    image: '/images/properties/PropertyView.png',
    title: 'Charming Homes in Thailand',
    address: '123 Sunset Road, Phuket, Thailand',
    price: '$243',
    period: 'pre month',
    publishDate: 'Apr 29,2024',
    views: '321',
    interestedTenants: '34',
  },
  {
    id: 3,
    image: '/images/properties/PropertyView.png',
    title: 'Charming Homes in Thailand',
    address: '123 Sunset Road, Phuket, Thailand',
    price: '$243',
    period: 'pre month',
    publishDate: 'Apr 29,2024',
    views: '321',
    interestedTenants: '34',
  },
  {
    id: 4,
    image: '/images/properties/PropertyView.png',
    title: 'Charming Homes in Thailand',
    address: '123 Sunset Road, Phuket, Thailand',
    price: '$243',
    period: 'pre month',
    publishDate: 'Apr 29,2024',
    views: '321',
    interestedTenants: '34',
  },
  {
    id: 5,
    image: '/images/properties/PropertyView.png',
    title: 'Charming Homes in Thailand',
    address: '123 Sunset Road, Phuket, Thailand',
    price: '$243',
    period: 'pre month',
    publishDate: 'Apr 29,2024',
    views: '321',
    interestedTenants: '34',
  },
];
const selectPropertyHandle = () => {
  console.log('hsdcgjs');
};

function ShowPropertyCards() {
  const { data: propertiesResponse, isLoading, isError, error } = useGetMyAllPropertiesQuery();
  console.log('propertiesResponse', propertiesResponse);
  const properties = propertiesResponse || [];
  console.log('properties', properties);
  return (
    <div className="w-[800px] overflow-x-auto lg:w-full">
      {/* Header Section */}

      {/* Properties List */}
      <div className="flex h-[460px] flex-col gap-2 overflow-auto">
        {propertiesResponse.map(property => (
          <div key={property._id} onClick={selectPropertyHandle()} className="flex flex-col gap-2.5">
            {/* Left Section: Image and Details */}
            <div className="col-span-6">
              <div className="flex gap-3.5">
                <div>
                  <Image
                    src={data?.images?.[0]?.url || '/images/placeholder-property.jpg'}
                    width={182}
                    height={100}
                    alt="icon"
                  />
                </div>
                <div className="flex flex-col justify-between p-1">
                  <div>
                    <h1 className="text-base font-semibold text-[#0245a5]">
                      {' '}
                      {data?.propertyTitle || data?.projectName || 'Untitled Property'}
                    </h1>
                  </div>
                  <div>
                    <h6 className="text-textSecondary text-xs font-normal">{property.address}</h6>
                  </div>
                  <div>
                    <span className="text-base font-semibold">
                      {property.price}
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
    </div>
  );
}

export default ShowPropertyCards;

// export default ShowPropertyCards
