import Button from '@/components/shared/small/Button';
import Dropdown from '@/components/shared/small/Dropdown';
import Input from '@/components/shared/small/Input';
import BrowsePropertyCard from '@/components/tenant/browserProperty/BrowsePropertyCard';
import { bookingHouses } from '@/data/data';
import Image from 'next/image';
import React from 'react';

function BookingDetails() {
  const subDistrictOptions = [{ option: 'Thailand', value: 'thailand' }];

  return (
    <div className="rounded-lg bg-white p-6">
      <div className="flex items-center justify-center">
        <p className="text-xl font-semibold">Booking Details</p>
      </div>
      <div className="mt-6 grid grid-cols-12 gap-6">
        <div className="col-span-4 grid gap-4">
          {bookingHouses?.map(property => (
            <div key={property.id}>
              <BrowsePropertyCard data={property} />
            </div>
          ))}
          <div className="rounded-md border bg-white p-5 shadow-lg">
            <h3 className="text-lg font-semibold">Your booking details</h3>
            <div className="mt-6 flex justify-between">
              <div>
                <p className="font-medium">Move-in</p>
                <p className="text-lg font-semibold">Sun 27 Apr 2025</p>
                <p className="font-medium">14:00-15:00</p>
              </div>
              <div className="border border-l"></div>
              <div>
                <p className="font-medium">Move-in</p>
                <p className="text-lg font-semibold">Sun 27 Apr 2025</p>
                <p className="font-medium">14:00-15:00</p>
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
        <div className="col-span-8">
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
            <div className="mt-2 lg:col-span-6">
              <Input label={'Full Name'} />
            </div>
            <div className="mt-2 lg:col-span-6">
              <Input label={'Current City'} />
            </div>
            <div className="mt-2 lg:col-span-6">
              <Input label={'Nationality'} />
            </div>
            <div className="mt-2 lg:col-span-6">
              <Input label={'People Staying'} />
            </div>
            <div className="mt-2 lg:col-span-6">
              <Input label={'Occupation'} />
            </div>
            <div className="mt-2 lg:col-span-6">
              <Input label={'Designation'} />
            </div>
            <div className="mt-2 lg:col-span-6">
              <Input label={'Visa type'} />
            </div>
            <div className="mt-2 lg:col-span-6">
              <Dropdown label="Purpose of rental" options={subDistrictOptions} shadow />
            </div>
            <div className="mt-2 lg:col-span-6">
              <Dropdown label="Move In - Move Out" options={subDistrictOptions} shadow />
            </div>
            <div className="mt-2 lg:col-span-6">
              <Dropdown label="Your arrival time" options={subDistrictOptions} shadow />
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
          <Button
            cn={'!text-base !font-semibold !py-2 !px-4 !rounded-md'}
            text={'CancSend: Booking Requestel'}
            height={'40px'}
          />
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
