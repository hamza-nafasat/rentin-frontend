'use client';
import Button from '@/components/shared/small/Button';
import Dropdown from '@/components/shared/small/Dropdown';
import Input from '@/components/shared/small/Input';
import BrowsePropertyCard from '@/components/tenant/browserProperty/BrowsePropertyCard';
import { bookingHouses } from '@/data/data';
import Image from 'next/image';
import React, { useState } from 'react';

function BookingDetails() {
  const [showInput, setShowInput] = useState(true);
  const subDistrictOptions = [
    { option: 'Thailand', value: 'thailand' },
    { option: 'Others', value: 'others' },
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
        <div className="col-span-12 grid gap-4 lg:col-span-4">
          {bookingHouses?.map(property => (
            <div key={property.id}>
              <BrowsePropertyCard data={property} />
            </div>
          ))}
          <div className="rounded-md border bg-white p-5 shadow-lg">
            <h3 className="text-lg font-semibold">Your booking details</h3>
            <div className="mt-6 flex items-stretch justify-between space-x-8">
              <div>
                <p className="font-medium">Move-in</p>
                <p className="text-lg font-semibold">Sun 27 Apr 2025</p>
                <p className="font-medium">14:00-15:00</p>
              </div>

              {/* Vertical divider */}
              <div className="w-px bg-gray-300" />

              <div>
                <p className="font-medium">Move-out</p>
                <p className="text-lg font-semibold">Mon 28 Apr 2025</p>
                <p className="font-medium">10:00-11:00</p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium">Total Length of Stay:</h4>
              <h4 className="text-lg font-semibold">1 Month</h4>
            </div>
          </div>
          <div className="rounded-md border bg-white p-5 shadow-lg">
            <h1 className="text-lg font-semibold">Your Price Summary</h1>
            <div className="mt-6 flex justify-between">
              <h3 className="font-medium">Rental Amount:</h3>
              <h3 className="text-base font-bold">$450</h3>
            </div>
            <div className="mt-3">
              <div className="flex justify-between">
                <h3 className="font-medium">Security Amount: Amount:</h3>
                <h3 className="text-base font-bold">$450</h3>
              </div>
              <div>
                <p className="text-xs font-medium text-[#32343CB2]/70">
                  A security deposit is required at the time of booking and will be fully refunded when you vacate the
                  property in its original condition.
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-between">
              <h1 className="text-[22px] font-medium">Total Amount</h1>
              <h1 className="text-[22px] font-medium">$1250</h1>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <div className="rounded-lg bg-[#F3F3F3] p-3.5">
            <div className="flex items-center gap-2">
              <div>
                <Image src="/images/dashboard/rental.png" width={42} height={42} alt="icon" className="rounded-full" />
              </div>
              <div>
                <h1 className="text-primary font-bold">You are signed in</h1>
                <h1 className="text-xs text-[#06060699]/60">katesmith@gmail.com</h1>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-12 gap-4">
            <div className="col-span-12 mt-2 lg:col-span-6">
              <Input label={'Full Legal Name (as per passport)'} />
            </div>
            <div className="col-span-12 mt-2 lg:col-span-6">
              <Dropdown label="Current Country" options={countryOptions} shadow />
            </div>
            <div className="col-span-12 mt-2 lg:col-span-6">
              <Dropdown label="City of Residence" options={cityOptions} shadow />
            </div>
            <div className="col-span-12 mt-2 lg:col-span-6">
              <Dropdown label="Nationality" options={nationalityOptions} shadow />
            </div>
            <div className="col-span-12 mt-2 lg:col-span-6">
              <Dropdown label="Occupation" options={occupationOptions} shadow />
            </div>
            <div className="col-span-12 mt-2 lg:col-span-6">
              <h1 className="text-[#32343CB2]">Number of Guests Staying</h1>
              <div className="relative top-2.5 grid grid-cols-2 items-center justify-between">
                <div className="flex items-center gap-2">
                  <input id="solo" type="radio" />
                  <label className="text-[13px]" htmlFor="solo">
                    1 (Solo)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input id="couple" type="radio" />
                  <label className="text-[13px]" htmlFor="couple">
                    Couple
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input id="group" type="radio" />
                  <label className="text-[12px]" htmlFor="group">
                    3-5 (Family/Small Group)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input id="custom" type="radio" />
                  <label className="text-[13px]" htmlFor="custom">
                    5+ (Custom)
                  </label>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className="col-span-12 h-fit lg:col-span-6">
                <h1 className="text-[#32343CB2]">Visa Type</h1>
                <div className="mt-2.5 grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-2">
                    <input id="tr" type="radio" name="visaType" />
                    <label className="text-[13px]" htmlFor="tr">
                      Tourist Visa (TR)
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="voa" type="radio" name="visaType" />
                    <label className="text-[13px]" htmlFor="voa">
                      Visa on Arrival (VoA)
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="work" type="radio" name="visaType" />
                    <label className="text-[13px]" htmlFor="work">
                      Work Permit
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="dtv" type="radio" name="visaType" />
                    <label className="text-[13px]" htmlFor="dtv">
                      Digital Nomad Visa (DTV) <span className="font-semibold text-green-600">(New!)</span>
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="retire" type="radio" name="visaType" />
                    <label className="text-[13px]" htmlFor="retire">
                      Retirement Visa (O-A/O-X)
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="ed" type="radio" name="visaType" />
                    <label className="text-[13px]" htmlFor="ed">
                      Education Visa (ED)
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="other" type="radio" name="visaType" />
                    <label className="text-[13px]" htmlFor="other">
                      Other (Specify:)
                    </label>
                    <input
                      type="text"
                      className="ml-2 w-1/2 rounded border border-gray-300 px-2 py-1 text-[13px]"
                      placeholder="Enter visa type"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className="col-span-12 lg:col-span-6">
                <div className="col-span-12 h-fit lg:col-span-6">
                  <h1 className="text-[#32343CB2]">Primary Reason for Renting</h1>
                  <div className="mt-2.5 grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-2">
                      <input id="vacation" type="radio" name="rentReason" />
                      <label className="text-[13px]" htmlFor="vacation">
                        Vacation/Holiday
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input id="remote" type="radio" name="rentReason" />
                      <label className="text-[13px]" htmlFor="remote">
                        Remote Work (Digital Nomad)
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input id="business" type="radio" name="rentReason" />
                      <label className="text-[13px]" htmlFor="business">
                        Business/Work Assignment
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input id="retirement" type="radio" name="rentReason" />
                      <label className="text-[13px]" htmlFor="retirement">
                        Retirement/Long-Term Stay
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        id="rentOther"
                        type="radio"
                        onChange={() => {
                          setShowInput(prev => !prev);
                        }}
                        name="rentReason"
                      />
                      <label
                        onChange={() => {
                          setShowInput(prev => !prev);
                        }}
                        className="text-[13px]"
                        htmlFor="rentOther"
                      >
                        Other (Specify:)
                      </label>
                    </div>
                    <div>{showInput && <Input type={'text'} placeholder="Enter reason" />}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 mt-2">
              <h1>Requested Rental Period (Minimum 1 month)</h1>
              <div className="flex w-full justify-between">
                <div className="basis-[49%]">
                  <Input type={'date'} label="Start Date" />
                </div>
                <div className="basis-[49%]">
                  <Input type={'date'} label="End Date" />
                </div>
              </div>
            </div>
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
              <textarea className="h-[200px] w-full rounded-md border" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <div className="flex gap-4">
          <Button
            cn={'!text-base !font-semibold !py-2 !px-4 !rounded-md !bg-[#E35454]'}
            text={'Cancel'}
            width={'90px'}
            height={'40px'}
          />
          <Button cn={'!text-base !font-semibold !py-2 !px-4 !rounded-md'} text={'Send Rent Request'} height={'40px'} />
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
