'use client';
import IconButton from '@/components/shared/small/IconButton';
import InputDropdown from '@/components/shared/small/InputDropdown';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa'; // Example icon from react-icons
import { BsPlus } from 'react-icons/bs';
import Input from '@/components/shared/small/Input';
import Dropdown from '@/components/shared/small/Dropdown';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';

const Pricing = ({ setCurrentStep }) => {
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
            <div className="col-span-9">
              <InputDropdown
                placeholder="0"
                type="date"
                label="1 Month Contract"
                options={frequencyOptions}
                defaultText="/month"
                onSelect={handleSelect}
                mainClassName="custom-dropdown"
                dropdownIcon={'THB - $'}
                // width="w-[79px]"
              />
            </div>
            <div className="col-span-3">
              <div className="flex h-full items-end justify-end">
                <IconButton
                  text="Add Deal"
                  leftIcon={<BsPlus />}
                  // rightIcon={<FaArrowRight />}
                  cn="!px-2"
                  width="w-full"
                  // height="h-12"
                  // onClick={}
                  onClick={handleAddCustomField} // Add new custom field
                />
              </div>
            </div>
          </div>
        </div>
        {customFields.map(field => (
          <div key={field.id} className="lg:col-span-12">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-10">
                <div className="relative w-full">
                  {/* Label for the parent input */}
                  <label className="text-sm text-[#666666] lg:text-base">Customize</label>

                  {/* Parent input field */}
                  <div className="relative flex w-full items-center">
                    <input
                      type="text"
                      className="shadow-input h-[56px] w-full rounded-xl border-[0.5px] border-[#66666659] px-4 pr-12 text-sm text-[#666666] outline-none lg:text-base"
                    />

                    {/* Nested input field (right-aligned) */}
                    <div className="absolute right-0 flex h-[56px] w-[150px] items-center rounded-xl rounded-tl-none rounded-bl-none border-[0.5px] border-[#66666659] bg-[#E9F2FF] pl-12 text-sm text-[#666666] lg:text-base">
                      <input
                        type="text"
                        className="h-full w-full border-none px-4 text-sm text-[#666666] outline-none"
                        placeholder="Enter"
                      />

                      {/* Div containing "hallo" inside the nested input */}
                      <div className="absolute top-1/2 left-2 -translate-y-1/2 transform text-sm text-[#666666]">
                        Month
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex h-full items-end justify-end">
                  <IconButton
                    leftIcon={<IoClose className="text-3xl text-[#41414199]" />}
                    cn="!px-2 bg-white shadow-lg"
                    width="w-full"
                    onClick={() => handleRemoveCustomField(field.id)} // Remove specific custom field
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="lg:col-span-12">
          <Dropdown
            label="Security Deposit per Contract"
            options={[{ option: 'Condo', value: 'condo' }]}
            shadow
          />
        </div>
        {/* <div> */}
        <div className="lg:col-span-12">
          <label className="flex cursor-pointer items-center space-x-2">
            <input
              type="checkbox"
              id="myCheckbox"
              className="h-[18px] w-[18px] text-blue-600"
              onChange={handleCheckboxChange}
            />
            <span className="text-base font-medium">I want to set custom price</span>
          </label>
        </div>

        {isChecked && (
          <div className="lg:col-span-12">
            <Input label="Custom Price" shadow />
          </div>
        )}
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
