import React, { useCallback } from 'react';
import Dropdown from '../shared/small/Dropdown';
import Input from '../shared/small/Input';

function CommissionDetail({ index, data, formData, setFormData, updateField, setCurrentStep }) {
  const handlePrevious = useCallback(() => setCurrentStep(prevStep => prevStep - 1), [setCurrentStep]);

  console.log(formData);

  return (
    <div>
      <h4 className="text-textPrimary text-center text-base font-medium md:text-lg">Service Area Selection</h4>
      <form className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Input
            key={index}
            shadow
            value={data.basePrice}
            onChange={e => updateField(index, 'basePrice', e.target.value)}
            label={'Property Showing Base Price'}
            placeholder={'Enter fees'}
          />
        </div>
        <div className="lg:col-span-6">
          <Input
            value={data.inspectionPrice}
            onChange={e => {
              const update = [...formData];
              update[index] = e.target.value;
              setFormData(update);
            }}
            placeholder={'Enter fees'}
            label="Property Inspection Base Price"
            shadow
          />
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
