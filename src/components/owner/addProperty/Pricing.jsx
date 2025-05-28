'use client';
import Dropdown from '@/components/shared/small/Dropdown';
import IconButton from '@/components/shared/small/IconButton';
import Input from '@/components/shared/small/Input';
import ValueAdjuster from '@/components/shared/small/ValueAdjuster';
import InputDropdown from '@/components/shared/small/InputDropdown';
import InputWithRightContent from '@/components/shared/small/InputWithRightContent';
import { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const Pricing = ({ setCurrentStep }) => {
  const [count, setCount] = useState(2);
  const handlePrevious = () => setCurrentStep(prevStep => prevStep - 1);
  const frequencyOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  const handleSelect = option => {
    console.log('Selected option:', option);
  };

  // State to manage the visibility of the customize input fields
  const [customFields, setCustomFields] = useState([]);

  // Function to add a new custom field input
  const handleAddCustomField = () => {
    setCustomFields(prevFields => [
      ...prevFields,
      { id: Date.now() }, // Use a unique id for each input field (can also be an incrementing counter)
    ]);
  };

  // Function to remove a specific custom field input
  const handleRemoveCustomField = id => {
    setCustomFields(prevFields => prevFields.filter(field => field.id !== id));
  };

  const [isChecked, setIsChecked] = useState(false);

  // Function to handle checkbox change
  const handleCheckboxChange = event => {
    setIsChecked(event.target.checked);
  };

  return (
    <div>
      <h4 className="text-textColor text-center text-lg font-medium md:text-lg">Pricing</h4>
      <form className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <Input
                shadowWithRightContent
                label="1 Month Contract"
                // value={searchValue}
                // onChange={e => setSearchValue(e.target.value)}
                rightContent={'THB/Per month'}
              />
            </div>
            <div className="col-span-6">
              <Input shadow label={'Security Deposit of Contract'} />
            </div>
          </div>
        </div>

        {/* <div className="lg:col-span-12">
          <Dropdown label="Security Deposit per Contract" options={[{ option: 'Condo', value: 'condo' }]} shadow />
        </div> */}
        {/* <div> */}
        <div className="col-span-2">
          <div className="flex h-full">
            <IconButton
              text="Add contract"
              leftIcon={<BsPlus />}
              // rightIcon={<FaArrowRight />}
              cn="!px-2 !text-base !font-medium"
              width="w-[145px]"
              // height="h-12"
              // onClick={}
              onClick={handleAddCustomField} // Add new custom field
            />
          </div>
        </div>
        {customFields.map(field => (
          <div key={field.id} className="lg:col-span-12">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-10 grid grid-cols-3 gap-4">
                <div className="mt-6">
                  <ValueAdjuster
                    label="Months"
                    value={count}
                    onChange={value => setCount(Math.max(2, Math.min(24, value)))}
                  />
                </div>
                <div>
                  <InputWithRightContent
                    label="Rent Price"
                    // value={searchValue}
                    // onChange={e => setSearchValue(e.target.value)}
                    rightContent={'THB/Per month'}
                  />
                </div>
                <div>
                  <Input shadow label={'Security Deposit of Contract'} />
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex h-full items-end justify-end">
                  <IconButton
                    leftIcon={<IoClose className="text-3xl text-[#41414199]" />}
                    cn="!px-2 bg-white shadow-card"
                    width="w-full"
                    onClick={() => handleRemoveCustomField(field.id)} // Remove specific custom field
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* </div> */}
        <div className="flex justify-end gap-[14px] lg:col-span-12">
          <button
            className="cursor-pointer rounded-sm bg-[#7C848DB2] px-5 py-[10px] text-sm font-medium text-white md:text-base"
            onClick={handlePrevious}
          >
            Previous
          </button>
          <button className="bg-primary cursor-pointer rounded-sm px-5 py-[10px] text-sm font-medium text-white md:text-base">
            Add Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default Pricing;
