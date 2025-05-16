import React from 'react';
import Checkbox from '../tenant/forms/Checkbox';
import NewCards from '../tenant/forms/NewCards';
import Input from './small/Input';

function CardDetails() {
  return (
    <div className="grid grid-cols-12 rounded-[12px] bg-white px-5 py-3">
      <div className="col-span-12 flex flex-col justify-between">
        <div>
          <div className="mt-3">
            <h1 className="text-[17px] font-semibold text-[#32343C] sm:text-[20px]">How would you like to pay?</h1>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <Checkbox />
            </div>
          </div>
          <div className="mt-4">
            <h1 className="text-[20px] font-semibold text-[#32343C]">New Cards</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <NewCards />
            </div>
          </div>

          <div className="mt-4">
            <form action="">
              <Input type={'text'} label={'Cardholder’s Name*'} placeholder="Michal jhon" />
              <div className="mt-3">
                <Input type={'number'} label={'Card Number*'} />
              </div>
              <div className="mt-3 flex flex-wrap justify-between">
                <div className="basis-[100%] sm:basis-[49%]">
                  <Input type={'date'} label={'Expiry Date*'} defaultValue={'2025-05-05'} />
                </div>
                <div className="basis-[100%] sm:basis-[49%]">
                  <Input type={'text'} label={'CVC*'} />
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
                    className="absolute top-0 left-0 h-5 w-5 cursor-pointer rounded-full border border-slate-300 bg-white shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800"
                  ></label>
                </div>
                <label htmlFor="switch-component" className="flex w-full text-[13px] text-[#32343CB2] sm:text-[16px]">
                  Save Card for future purchase
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
