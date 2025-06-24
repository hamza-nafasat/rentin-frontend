'use client';
import Button from '@/components/shared/small/Button';
import Dropdown from '@/components/shared/small/Dropdown';
import Input from '@/components/shared/small/Input';
import BrowsePropertyCard from '@/components/tenant/browserProperty/BrowsePropertyCard';
import { bookingHouses } from '@/data/data';
import React, { useState } from 'react';

function BookingDetails() {
  const [showInput1, setShowInput1] = useState(false);
  const [showInput2, setShowInput2] = useState(false);
  const [showInput3, setShowInput3] = useState(false);

  const handleRentReasonChange1 = e => {
    setShowInput1(e.target.id === 'rentOther1');
  };

  const handleRentReasonChange2 = e => {
    setShowInput2(e.target.id === 'rentOther2');
  };

  const handleRentReasonChange3 = e => {
    setShowInput3(e.target.id === 'rentOther3');
  };

  const reasonOptions1 = [
    { id: 'vacation1', label: '1(Solo)' },
    { id: 'study1', label: '2(Couple)' },
    { id: 'family1', label: '3-5(Family/Small Group)' },
    { id: 'rentOther1', label: '5+ (Custom)' },
  ];

  const reasonOptions2 = [
    { id: 'remote2', label: 'Vacation/Holiday' },
    { id: 'relocation2', label: 'Remote Work (Digital Nomad)' },
    { id: 'healthcare2', label: 'Business/Working Assignment' },
    { id: 'healthcare', label: 'Retirement/Long-Term Stay' },
    { id: 'rentOther2', label: 'Other (Specify:)' },
  ];

  const reasonOptions3 = [
    { id: 'business3', label: 'Tourist Visa (TR)' },
    { id: 'conference3', label: 'Visa on Arrival (VoA)' },
    { id: 'extended', label: 'Work Permit' },
    { id: 'extended1', label: 'Digital Nomad Visa (DTV) (New!)' },
    { id: 'extended2', label: 'Retirement Visa (O-A/O-X)' },
    { id: 'extended3', label: 'Education Visa (ED)' },
    { id: 'rentOther3', label: 'Other (Specify:)' },
  ];

  const countryOptions = [
    { option: 'Thailand', value: 'thailand' },
    { option: 'Japan', value: 'japan' },
    { option: 'Canada', value: 'canada' },
    { option: 'Germany', value: 'germany' },
    { option: 'Brazil', value: 'brazil' },
    { option: 'Australia', value: 'australia' },
    { option: 'Others', value: 'others' },
  ];
  const cityOptions = [
    { option: 'Bangkok', value: 'bangkok' },
    { option: 'Chiang Mai', value: 'chiang_mai' },
    { option: 'Phuket', value: 'phuket' },
    { option: 'Pattaya', value: 'pattaya' },
    { option: 'Ayutthaya', value: 'ayutthaya' },
    { option: 'Krabi', value: 'krabi' },
    { option: 'Others', value: 'others' },
  ];
  const nationalityOptions = [
    { option: 'American', value: 'american' },
    { option: 'British', value: 'british' },
    { option: 'Canadian', value: 'canadian' },
    { option: 'Chinese', value: 'chinese' },
    { option: 'French', value: 'french' },
    { option: 'German', value: 'german' },
    { option: 'Indian', value: 'indian' },
    { option: 'Japanese', value: 'japanese' },
    { option: 'Pakistani', value: 'pakistani' },
    { option: 'Thai', value: 'thai' },
    { option: 'Others', value: 'others' },
  ];
  const occupationOptions = [
    { option: 'Employed', value: 'employed' },
    { option: 'Self-Employed', value: 'self_employed' },
    { option: 'Student', value: 'student' },
    { option: 'Retired', value: 'retired' },
    { option: 'Digital Nomad', value: 'digital_nomad' },
    { option: 'Unemployed', value: 'unemployed' },
    { option: 'Others', value: 'others' },
  ];

  return (
    <div className="rounded-lg bg-white p-6">
      <div className="flex items-center justify-center">
        <p className="text-xl font-semibold">Rent Form</p>
      </div>
      <div className="mt-6 grid grid-cols-12 gap-6">
        {/* LEFT COLUMN */}
        <div className="col-span-12 space-y-4 lg:col-span-4">
          {bookingHouses?.map(property => (
            <div key={property.id}>
              <BrowsePropertyCard data={property} />
            </div>
          ))}
          <div className="shadow-card rounded-lg border bg-white p-5">
            <h3 className="text-lg font-semibold">Your booking details</h3>
            <div className="mt-6 flex items-stretch justify-between space-x-8">
              <div>
                <p className="font-medium">Start Date</p>
                <p className="text-lg font-semibold">Sun 27 Apr 2025</p>
                <p className="font-medium">14:00-15:00</p>
              </div>
              <div className="w-px bg-gray-300" />
              <div>
                <p className="font-medium">End Date</p>
                <p className="text-lg font-semibold">Mon 28 Apr 2025</p>
                <p className="font-medium">10:00-11:00</p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-medium">Total Length of Stay:</h4>
              <h4 className="text-lg font-semibold">1 Month</h4>
            </div>
          </div>
          <div className="shadow-card rounded-lg border bg-white p-5">
            <h1 className="text-lg font-semibold">Your Price Summary</h1>
            <div className="mt-6 flex justify-between">
              <h3 className="font-medium">Rental Amount:</h3>
              <h3 className="text-base font-bold">$450</h3>
            </div>
            <div className="mt-3">
              <div className="flex justify-between">
                <h3 className="font-medium">Security Deposit:</h3>
                <h3 className="text-base font-bold">$450</h3>
              </div>
              <p className="mt-1 text-xs font-medium text-[#32343CB2]/70">
                A security deposit is required at the time of booking and will be fully refunded when you vacate the
                property in its original condition.
              </p>
            </div>
            <div className="mt-5 flex justify-between">
              <h1 className="text-[22px] font-medium">Total Amount</h1>
              <h1 className="text-[22px] font-medium">$1250</h1>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-12 lg:col-span-8">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6">
              <Input shadow label="Full Legal Name" placeholder="Enter first name" type="text" />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Dropdown label="Current Country" options={countryOptions} />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Dropdown label="City of Residence" options={cityOptions} />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Dropdown label="Nationality" options={nationalityOptions} />
            </div>
            <div className="col-span-12">
              <Dropdown label="Occupation" options={occupationOptions} />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Input shadow label="Start Date" placeholder="Enter Start Date" type="date" />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Input shadow label="End Date" placeholder="Enter End Date" type="date" />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <h1 className="text-[#32343CB2]">Number of Guests Staying</h1>
              <div className="mt-2.5 grid grid-cols-1 gap-2">
                {reasonOptions1.map(({ id, label }) => (
                  <div key={id} className="flex items-center gap-2">
                    <input id={id} type="radio" name="rentReason1" onChange={handleRentReasonChange1} />
                    <label className="text-[13px]" htmlFor={id}>
                      {label}
                    </label>
                  </div>
                ))}
                {showInput1 && (
                  <div className="mt-8">
                    <Input shadow type="text" placeholder="Enter" />
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6">
              <h1 className="text-[#32343CB2]">Primary Reason for Renting</h1>
              <div className="mt-2.5 grid grid-cols-1 gap-2">
                {reasonOptions2.map(({ id, label }) => (
                  <div key={id} className="flex items-center gap-2">
                    <input id={id} type="radio" name="rentReason2" onChange={handleRentReasonChange2} />
                    <label className="text-[13px]" htmlFor={id}>
                      {label}
                    </label>
                  </div>
                ))}
                {showInput2 && (
                  <div className="mt-1">
                    <Input shadow type="text" placeholder="Enter" />
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-12 sm:col-span-12">
              <h1 className="text-[#32343CB2]">Visa Type for Thailand</h1>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {reasonOptions3.map(({ id, label }) => (
                  <div key={id} className="flex items-center gap-1 rounded px-2 py-1">
                    <input id={id} type="radio" name="rentReason3" onChange={handleRentReasonChange3} />
                    <label className="text-[13px]" htmlFor={id}>
                      {label}
                    </label>
                  </div>
                ))}
              </div>
              {showInput3 && (
                <div className="mt-1">
                  <Input shadow type="text" placeholder="Enter" />
                </div>
              )}
            </div>

            {/* <div className="col-span-12 md:col-span-6"></div> */}
          </div>
          <div className="mt-6">
            <div>
              <h1 className="text-base font-semibold">Special requests</h1>
              <h1 className="text-xs font-semibold text-[#32343CB2]/70">
                Special requests cannot be guaranteed – but the property will do its best to meet your needs. You can
                always make a special request after your booking is complete!
              </h1>
            </div>
            <div className="mt-5">
              <h1 className="">
                Please write your requests in English or Thai. <span className="text-[10px]">(optional)</span>
              </h1>
              <textarea className="h-[200px] w-full rounded-lg border" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="mt-6 flex items-center justify-end">
        <div className="flex gap-4">
          <Button cn="!bg-buttonSecondary hover:!bg-gray-500" text="Cancel" />
          <Button text="Send Rent Request" />
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
