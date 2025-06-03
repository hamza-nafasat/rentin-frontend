import Button from '@/components/shared/small/Button';
import Dropdown from '@/components/shared/small/Dropdown';
import Input from '@/components/shared/small/Input';
import BrowsePropertyCard from '@/components/tenant/browserProperty/BrowsePropertyCard';
import Checkbox from '@/components/tenant/forms/Checkbox';
import NewCards from '@/components/tenant/forms/NewCards';
import Buttons from '@/components/tenant/popups/Buttons';
import { bookingHouses } from '@/data/data';
import Image from 'next/image';
import React from 'react';

function PaymentDetails() {
  const subDistrictOptions = [{ option: 'Thailand', value: 'thailand' }];

  return (
    <div className="rounded-lg bg-white p-6">
      <div className="flex items-center justify-center">
        <p className="text-xl font-semibold">Payment Details</p>
      </div>
      <div className="mt-6 grid grid-cols-12 gap-6">
        <div className="col-span-12 grid gap-4 lg:col-span-4">
          {bookingHouses?.map(property => (
            <div key={property.id}>
              <BrowsePropertyCard data={property} />
            </div>
          ))}
          <div className="shadow-card rounded-lg border bg-white p-5">
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
          <div className="shadow-card rounded-lg border bg-white p-5">
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
        <div className="col-span-12 flex flex-col justify-between lg:col-span-8">
          <div>
            <div className="rounded-lg bg-[#F3F3F3] p-3.5">
              <div className="flex items-center gap-2">
                <div>
                  <h1 className="text-primary font-bold">You are signed in</h1>
                  <h1 className="text-xs text-[#06060699]/60">katesmith@gmail.com</h1>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h1 className="text-[17px] font-semibold text-[#32343C] sm:text-[20px]">How would you like to pay?</h1>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <Checkbox />
              </div>
            </div>
            <div className="mt-7">
              <h1 className="text-[20px] font-semibold text-[#32343C]">New Cards</h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <NewCards />
              </div>
            </div>

            <div className="mt-7">
              <form action="">
                <Input shadow type={'text'} label={'Cardholder’s Name*'} placeholder="Michal jhon" />
                <div className="mt-3">
                  <Input shadow type={'number'} label={'Card Number*'} />
                </div>
                <div className="mt-3 flex flex-wrap justify-between">
                  <div className="basis-[100%] sm:basis-[49%]">
                    <Input shadow type={'date'} label={'Expiry Date*'} value={'2025-05-05'} />
                  </div>
                  <div className="basis-[100%] sm:basis-[49%]">
                    <Input shadow type={'text'} label={'CVC*'} />
                  </div>
                </div>
                <div className="relative mt-3 flex items-center gap-2">
                  <div>
                    <input
                      id="switch-component"
                      type="checkbox"
                      className="peer h-5 w-11 cursor-pointer appearance-none rounded-full bg-[#B9B9B9] transition-colors duration-300 checked:bg-[#0245A5]"
                    />
                    <label
                      htmlFor="switch-component"
                      className="shadow-card absolute top-0 left-0 h-5 w-5 cursor-pointer rounded-full border border-slate-300 bg-white transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800"
                    ></label>
                  </div>
                  <label htmlFor="switch-component" className="flex w-full text-[13px] text-[#32343CB2] sm:text-[16px]">
                    Save Card for future purchase
                  </label>
                </div>
              </form>
            </div>
            <div className="mt-5">
              <p className="text-base text-[#32343CB2]/70">
                By signing up on RRentin, you agree to our terms and allow us to personalize offers based on your usage.
                You can unsubscribe anytime. Read our privacy policy.
              </p>
            </div>
          </div>

          <div className="flex w-full items-center justify-end">
            <div className="flex w-[330px] gap-4">
              <Button cn={'!bg-buttonSecondary hover:!bg-gray-500'} text={'Cancel Request'} />
              <Button text={'Confirm Booking'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetails;
