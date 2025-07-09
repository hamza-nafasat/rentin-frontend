import React from 'react';
import {
  Balcony,
  Barbeque,
  Bath,
  Canal,
  Cctv,
  City,
  Furnished,
  Garden,
  GreenView,
  Guard,
  Gym,
  Internet,
  Maids,
  Parking,
  Pool,
  Private,
  Renovated,
  Security,
  Study,
  Theatre,
  Wardrobe,
} from '@/assets/icon';

export default function ViewBuildingDetails() {
  const payment = [
    { label: 'Monthly Rent', count: '$1,500' },
    { label: 'Minimum Lease Duration', count: '1 Month' },
    { label: 'Security Deposit', count: '$3,000' },
    { label: 'Renewal Option', count: 'Yes' },
    { label: 'Renewal Notice', count: '7 Days' },
  ];
  const Amenities = [
    { icon: <Balcony />, label: 'Balcony', count: '$1,500' },
    { icon: <Balcony />, label: 'Big Balcony', count: '$1,500' },
    { icon: <Parking />, label: 'Parking', count: '$1,500' },
    { icon: <Garden />, label: 'Garden', count: '$1,500' },
    { icon: <Gym />, label: 'Gym', count: '$1,500' },
    { icon: <Maids />, label: 'Maids Room', count: '$1,500' },
    { icon: <Pool />, label: 'Swimming Pool', count: '$1,500' },
    { icon: <Internet />, label: 'Hi Speed Internet', count: '$1,500' },
    { icon: <Private />, label: 'Private Garden', count: '$1,500' },
    { icon: <Study />, label: 'Study Room', count: '$1,500' },
    { icon: <Bath />, label: 'Bathtub', count: '$1,500' },
    { icon: <Barbeque />, label: 'Barbeque Area', count: '$1,500' },
  ];
  const Furnishing = [
    { icon: <Wardrobe />, label: 'Built in Wardrobe', count: '$1,500' },
    { icon: <Furnished />, label: 'Fully Furnished', count: '$1,500' },
    { icon: <Renovated />, label: 'Renovated', count: '$1,500' },
    { icon: <Theatre />, label: 'TV/Home Theatre', count: '$1,500' },
  ];
  const security = [
    { icon: <Guard />, label: 'Security Guard', count: '$1,500' },
    { icon: <Security />, label: '24-hour Security', count: '$1,500' },
    { icon: <Cctv />, label: 'CCTV', count: '$1,500' },
  ];
  const Views = [
    { icon: <Canal />, label: 'Canal View', count: '$1,500' },
    { icon: <City />, label: 'City View', count: '$1,500' },
    { icon: <Garden />, label: 'Garden View', count: '$1,500' },
    { icon: <GreenView />, label: 'Green View', count: '$1,500' },
  ];
  return (
    <div>
      <h1 className="text-[16px] font-semibold text-[#32343C]">🏡 Key Features:</h1>
      <div className="mt-3">
        <h1 className="text-[16px] font-semibold text-[#32343C]">Rental Agreement Details</h1>
        <div className="my-2 grid grid-cols-1 grid-rows-5 gap-x-5 sm:grid-cols-2 sm:grid-rows-3">
          {payment.map((item, index) => (
            <h1 key={index} className="flex items-center justify-between border-b py-2 text-[12px] text-[#5F5F5F]">
              <span>{item.label}</span>
              <span>{item.count}</span>
            </h1>
          ))}
        </div>
        <h1 className="my-2 text-[16px] font-semibold text-[#32343C]">Amenities</h1>
        <div className="grid grid-cols-1 grid-rows-12 gap-x-5 sm:grid-cols-4 sm:grid-rows-3">
          {Amenities.map((item, index) => (
            <h1 className="flex items-center gap-2 border-b py-2 text-[12px] text-[#5F5F5F]">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </h1>
          ))}
        </div>
        <h1 className="my-2 text-[16px] font-semibold text-[#32343C]">Furnishing</h1>
        <div className="grid grid-cols-1 grid-rows-4 gap-x-5 sm:grid-cols-4 sm:grid-rows-1">
          {Furnishing.map((item, index) => (
            <h1 className="flex items-center gap-2 border-b py-2 text-[12px] text-[#5F5F5F]">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </h1>
          ))}
        </div>
        <h1 className="my-2 text-[16px] font-semibold text-[#32343C]">Security and Safety</h1>
        <div className="grid grid-cols-1 grid-rows-3 gap-x-5 sm:grid-cols-3 sm:grid-rows-1">
          {security.map((item, index) => (
            <h1 className="flex items-center gap-2 border-b py-2 text-[12px] text-[#5F5F5F]">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </h1>
          ))}
        </div>
        <h1 className="mt-2 text-[16px] font-semibold text-[#32343C]">Views and Direction</h1>
        <div className="grid grid-cols-1 grid-rows-4 gap-x-5 sm:grid-cols-4 sm:grid-rows-1">
          {Views.map((item, index) => (
            <h1 className="flex items-center gap-2 border-b py-2 text-[12px] text-[#5F5F5F]">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
}
