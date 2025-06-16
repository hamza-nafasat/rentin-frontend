import React, { useCallback } from 'react';
import Dropdown from '../shared/small/Dropdown';
import Input from '../shared/small/Input';

function ServiceArea({ setCurrentStep }) {
  // Memoize handlers to prevent unnecessary re-renders
  const handleNext = useCallback(() => setCurrentStep(prevStep => prevStep + 1), [setCurrentStep]);
  const handlePrevious = useCallback(() => setCurrentStep(prevStep => prevStep - 1), [setCurrentStep]);
  const countryOptions = [
    { option: 'Thailand', value: 'thailand' },
    { option: 'Pakistan', value: 'pakistan' },
    { option: 'Iran', value: 'iran' },
    { option: 'India', value: 'india' },
    { option: 'China', value: 'china' },
  ];

  const stateOptions = [
    { option: 'Thailand', value: 'thailand' },
    { option: 'Pakistan', value: 'pakistan' },
    { option: 'Iran', value: 'iran' },
    { option: 'India', value: 'india' },
    { option: 'China', value: 'china' },
  ];
  const cityOptions = [
    { option: 'Thailand', value: 'thailand' },
    { option: 'Pakistan', value: 'pakistan' },
    { option: 'Iran', value: 'iran' },
    { option: 'India', value: 'india' },
    { option: 'China', value: 'china' },
  ];
  const availableDaysOptions = [
    { option: 'Sunday', value: 'sunday' },
    { option: 'Monday', value: 'monday' },
    { option: 'Wednesday', value: 'wednesday' },
    { option: 'Friday', value: 'friday' },
    { option: 'Saturday', value: 'saturday' },
  ];

  return (
    <div>
      <h4 className="text-textPrimary text-center text-base font-medium md:text-lg">Service Area Selection</h4>
      <form className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Dropdown placeholder="select" label="Country" options={countryOptions} shadow />
        </div>
        <div className="lg:col-span-6">
          <Dropdown placeholder="select" label="State/Province" options={stateOptions} shadow />
        </div>
        <div className="lg:col-span-6">
          <Dropdown placeholder="select" label="City" options={cityOptions} shadow />
        </div>
        <div className="lg:col-span-6">
          <Input shadow label={'Area'} placeholder="Search Area" />
        </div>
        <div className="lg:col-span-6">
          <Dropdown placeholder="select" label="Available Days" options={availableDaysOptions} shadow />
        </div>
        <div className="lg:col-span-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Dropdown placeholder="select" label="Open at" options={stateOptions} shadow />
            </div>
            <div className="flex items-end">
              <Dropdown placeholder="Close at" label="" options={stateOptions} shadow />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-[14px] lg:col-span-12">
          <button
            className="cursor-pointer rounded-sm bg-[#7C848DB2] px-5 py-[10px] text-sm font-medium text-white md:text-base"
            onClick={handlePrevious}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-primary cursor-pointer rounded-sm px-5 py-[10px] text-sm font-medium text-white md:text-base"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default ServiceArea;
