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

function PropertiesView() {
  return (
    <div className="w-[800px] overflow-x-auto lg:w-full">
      {/* Header Section */}
      <div className="flex flex-col gap-2.5">
        <section className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <span className="text-sm font-semibold">Properties</span>
          </div>
          <div className="col-span-6 grid grid-cols-3">
            <div className="flex items-center justify-center">Publish Date</div>
            <div className="flex items-center justify-center">Views</div>
            <div className="flex items-center justify-center">Interested Tenants</div>
          </div>
        </section>
        <section className="border-t"></section>
      </div>

      {/* Properties List */}
      <div className="flex h-[460px] flex-col gap-2 overflow-auto">
        {properties.map(property => (
          <div key={property.id} className="flex flex-col gap-2.5">
            <section className="grid grid-cols-12 gap-4">
              {/* Left Section: Image and Details */}
              <div className="col-span-6">
                <div className="flex gap-3.5">
                  <div>
                    <Image src={property.image} width={182} height={100} alt="icon" />
                  </div>
                  <div className="flex flex-col justify-between p-1">
                    <div>
                      <h1 className="text-base font-semibold text-[#32343C]">{property.title}</h1>
                    </div>
                    <div>
                      <h6 className="text-xs font-normal text-[#969696]">{property.address}</h6>
                    </div>
                    <div>
                      <span className="text-base font-semibold">
                        {property.price}
                        <span className="text-[8px] font-semibold text-[#969696]">
                          {property.period}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section: Publish Date, Views, Interested Tenants */}
              <div className="col-span-6 grid grid-cols-3">
                <div className="flex items-center justify-center">{property.publishDate}</div>
                <div className="flex items-center justify-center">{property.views}</div>
                <div className="flex items-center justify-center">{property.interestedTenants}</div>
              </div>
            </section>
            <section className="border-t"></section>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertiesView;
