import React, { useCallback } from 'react';
import Dropdown from '../shared/small/Dropdown';

function CommissionDetail({ setCurrentStep }) {
  const handlePrevious = useCallback(
    () => setCurrentStep(prevStep => prevStep - 1),
    [setCurrentStep]
  );
  const BEDROOM_OPTIONS = [
    { option: '1 Bedroom', value: '1' },
    { option: '2 Bedrooms', value: '2' },
    { option: '3 Bedrooms', value: '3' },
    { option: '4+ Bedrooms', value: '4plus' },
  ];

  const BATHROOM_OPTIONS = [
    { option: '1 Bathroom', value: '1' },
    { option: '2 Bathrooms', value: '2' },
    { option: '3+ Bathrooms', value: '3plus' },
  ];

  return (
    <div>
      <h4 className="text-textColor text-center text-base font-medium md:text-lg">
        Service Area Selection
      </h4>
      <form className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Dropdown placeholder="select" label="Country" options={BEDROOM_OPTIONS} shadow />
        </div>
        <div className="lg:col-span-6">
          <Dropdown placeholder="select" label="Country" options={BEDROOM_OPTIONS} shadow />
        </div>
        <div className="flex justify-end gap-[14px] lg:col-span-12">
          <button
            className="cursor-pointer rounded-sm bg-[#7C848DB2] px-5 py-[10px] text-sm font-medium text-white md:text-base"
            onClick={handlePrevious}
          >
            Previous
          </button>
          <button className="bg-primary cursor-pointer rounded-sm px-5 py-[10px] text-sm font-medium text-white md:text-base">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommissionDetail;
