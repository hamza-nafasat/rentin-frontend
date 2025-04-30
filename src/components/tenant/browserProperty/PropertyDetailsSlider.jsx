'use client';
import { Bath, BedIcons, Garage, Kitchens, Rooms, SqftIcon } from '@/assets/icon';
import UserReviewsCard from '@/components/owner/properties/UserReviewsCard';
// import MapWithLocation from '../../owner/addProperty/MapWithLocation';
import Button from '@/components/shared/small/Button';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { GoArrowUpRight } from 'react-icons/go';
import Link from 'next/link';

// import HouseMap from './HouseMap';
const HouseMap = dynamic(() => import('./HouseMap'), {
  ssr: false,
});

function PropertyDetailsSlider({ data, onClose }) {
  // console.log("data",data);

  const [selectedTab, setSelectedTab] = useState('overview');

  // Function to handle tab click
  const handleTabClick = tab => {
    setSelectedTab(tab);
  };

  return (
    <div className="scroll-0 h-full overflow-y-auto p-5">
      <div className="flex items-center justify-between">
        <button onClick={onClose} className="scale-on-hover cursor-pointer text-xl">
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold">Property Details</h2>
        <Link
          href={`/tenant/browser-property/property-details/${data?.id}`}
          className="scale-on-hover bg-primary flex size-6 cursor-pointer items-center justify-center rounded-sm"
        >
          <GoArrowUpRight className="font-bold text-white" />
        </Link>
      </div>
      <div className="mt-5 grid grid-cols-6 gap-2">
        {/* Main large image */}
        <div className="col-span-4">
          <Image
            src={data?.images[0]}
            width={310}
            height={216}
            alt="icon"
            className="h-full w-full rounded-md object-cover"
          />
        </div>

        {/* Smaller images */}
        <div className="col-span-2">
          <div className="flex flex-col gap-2">
            <div>
              <Image
                src={data?.images[1]}
                width={101}
                height={101}
                alt="icon"
                className="h-full w-full rounded-md object-cover"
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <Image
                src={data?.images[1]}
                width={101}
                height={101}
                alt="icon"
                className="h-full w-full rounded-md object-cover"
              />

              {data?.images.length > 3 && (
                <div className="absolute inset-0 top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-white/50 text-xs font-bold text-white">
                  {data?.images.length - 3} {data?.images.length - 3 > 1} +
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <div className="flex items-center justify-between">
          <p className="text-[22px] font-semibold">Dream House</p>
          <p className="text-[22px] font-semibold">
            {data?.rentPrice}
            <span className="text-sm font-semibold text-[#C2C2C2]">/month</span>
          </p>
        </div>
        <div className="flex items-center">
          <MdLocationPin className="text-primary" />
          <p className="text-sm text-[#545454]">{data?.address}</p>
        </div>
      </div>

      <div className="h-full overflow-y-auto p-5">
        <div className="mb-4 flex w-full">
          <div
            onClick={() => handleTabClick('overview')}
            className={`w-full cursor-pointer px-4 py-2 text-center text-base font-semibold text-[#848A9C] ${
              selectedTab === 'overview' ? 'border-b-2 text-black' : 'bg-white'
            }`}
          >
            Overview
          </div>

          <div
            onClick={() => handleTabClick('reviews')}
            className={`w-full cursor-pointer px-4 py-2 text-center text-base font-semibold text-[#848A9C] ${
              selectedTab === 'reviews' ? 'border-b-2 text-black' : 'bg-white'
            }`}
          >
            Reviews
          </div>
        </div>

        {/* Content Based on Selected Tab */}
        <div>
          {selectedTab === 'overview' && (
            <div className=" ">
              <div>
                <p className="text-base font-semibold">Description</p>
                <p className="custom-scroll h-12 overflow-auto text-sm leading-tight tracking-tight">
                  {data?.description}
                </p>
              </div>
              <div className="my-5">
                <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                  <FeatureItem icon={Rooms} value={data?.rooms} label="Rooms" />
                  <FeatureItem icon={BedIcons} value={data?.beds} label="Beds" />
                  <FeatureItem icon={Bath} value={data?.baths} label="Baths" />
                </div>

                <div className="mt-4 flex flex-col items-center justify-center gap-4 md:flex-row">
                  <FeatureItem icon={Kitchens} value={data?.kitchens} label="Kitchens" />
                  <FeatureItem icon={SqftIcon} value={data?.beds} label="sqft" />
                  <FeatureItem icon={Garage} value={data?.garages} label="Garage" />
                </div>
              </div>
              <div className="flex flex-col gap-4 md:flex-row">
                <Button text="Visit Now" />
                <Button text="Book Now" />
              </div>
              <div className="mt-5">
                <HouseMap
                  location={data?.address}
                  image={data?.images[0]}
                  name={'Dream house'}
                  status={data?.type}
                />
              </div>
            </div>
          )}

          {selectedTab === 'reviews' && (
            <div className="p-4">
              <UserReviewsCard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyDetailsSlider;

const FeatureItem = ({ icon: Icon, value, label }) => (
  <div className="flex items-center justify-center gap-1 rounded-md border px-[14px] py-2">
    <Icon />
    {value} {label}
  </div>
);
