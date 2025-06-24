import Dropdown from '@/components/shared/small/Dropdown';
import IconButton from '@/components/shared/small/IconButton';
import Input from '@/components/shared/small/Input';
import ValueAdjuster from '@/components/shared/small/ValueAdjuster';
import InputDropdown from '@/components/shared/small/InputDropdown';
import InputWithRightContent from '@/components/shared/small/InputWithRightContent';
import { useEffect, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const Pricing = ({ data, index, updateField, setCurrentStep, formData, onSubmit, isLoading }) => {
  const handlePrevious = () => setCurrentStep(prevStep => prevStep - 1);

  const handleSelect = option => {
    console.log('Selected option:', option);
  };

  // State to manage the visibility of the customize input fields
  const [customFields, setCustomFields] = useState([]);

  // Function to add a new custom field input
  const handleAddCustomField = () => {
    setCustomFields(prevFields => [
      ...prevFields,
      {
        id: Date.now(),
        month: '',
        rentPrice: '',
        securityDeposit: '',
      },
    ]);
  };

  useEffect(() => {
    updateField(index, 'deals', customFields);
  }, [customFields, index, updateField]);

  // Function to remove a specific custom field input
  const handleRemoveCustomField = id => {
    setCustomFields(prevFields => prevFields.filter(field => field.id !== id));
  };

  const updateCustomField = (id, key, value) => {
    setCustomFields(prev => prev.map(field => (field.id === id ? { ...field, [key]: value } : field)));
  };

  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // Handle add property button click
  const handleAddProperty = () => {
    if (onSubmit) {
      onSubmit();
      console.log('asdjkasdjhgasdjhgasdjhsgdjhg', formData);
    }
  };

  return (
    <div>
      <h4 className="text-textColor text-center text-lg font-medium md:text-lg">Pricing</h4>
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="col-span-12">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-6">
              <InputWithRightContent
                shadow
                label="1 Month Contract"
                value={data.oneMonth || ''}
                onChange={e => updateField(index, 'oneMonth', e.target.value)}
                // value={searchValue}
                // onChange={e => setSearchValue(e.target.value)}
                rightContent={'THB'}
              />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <InputWithRightContent
                value={data.oneMonthDeposit || ''}
                onChange={e => updateField(index, 'oneMonthDeposit', e.target.value)}
                shadow
                rightContent={'THB'}
                label={'Security Deposit of Contract'}
              />
            </div>
          </div>
        </div>

        <div className="col-span-12">
          <div className="flex h-full">
            <IconButton text="Add contract" leftIcon={<BsPlus />} cn="!text-base" onClick={handleAddCustomField} />
          </div>
        </div>

        {customFields.map(field => (
          <div key={field.id} className="col-span-12">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 mt-6 sm:col-span-6 md:col-span-4">
                  <ValueAdjuster
                    label="Month"
                    value={field.month}
                    onChange={val => updateCustomField(field.id, 'month', val)}
                    steps={month}
                  />
                </div>
                <div className="col-span-12 sm:col-span-6 md:col-span-4">
                  <InputWithRightContent
                    label="Rent Price"
                    rightContent="THB/Per month"
                    value={field.rentPrice}
                    onChange={e => updateCustomField(field.id, 'rentPrice', e.target.value)}
                  />
                </div>
                <div className="col-span-12 flex items-center justify-between gap-3 md:col-span-4">
                  <div className="w-[100%]">
                    <Input
                      shadow
                      label="Security Deposit of Contract"
                      value={field.securityDeposit}
                      onChange={e => updateCustomField(field.id, 'securityDeposit', e.target.value)}
                    />
                  </div>
                  <div className="relative top-3.5">
                    <IconButton
                      leftIcon={<IoClose className="text-xl text-white" />}
                      cn="!px-2 bg-primary !rounded-full !size-[40px] !text-white shadow-card"
                      onClick={() => handleRemoveCustomField(field.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="col-span-12 flex justify-end gap-[14px]">
          <button
            type="button"
            className="cursor-pointer rounded-sm bg-[#7C848DB2] px-5 py-[10px] text-sm font-medium text-white md:text-base"
            onClick={handlePrevious}
          >
            Previous
          </button>
          <button
            type="button"
            className={`bg-primary cursor-pointer rounded-sm px-5 py-[10px] text-sm font-medium text-white md:text-base ${
              isLoading ? 'cursor-not-allowed opacity-50' : ''
            }`}
            onClick={handleAddProperty}
            disabled={isLoading}
          >
            {isLoading ? 'Adding Property...' : 'Add Property'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
