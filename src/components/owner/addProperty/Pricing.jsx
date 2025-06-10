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

const Pricing = ({ data, index, updateField, setCurrentStep, formData }) => {
  const [count, setCount] = useState(2);
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
  const month = [1, 2, 3, 4, 5];

  return (
    <div>
      <h4 className="text-textColor text-center text-lg font-medium md:text-lg">Pricing</h4>
      <form className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="col-span-12">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-6">
              <InputWithRightContent
                shadowWithRightContent
                label="1 Month Contract"
                // value={searchValue}
                // onChange={e => setSearchValue(e.target.value)}
                rightContent={'THB/Per month'}
              />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <Input shadow label={'Security Deposit of Contract'} />
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex h-full">
            <IconButton
              text="Add contract"
              leftIcon={<BsPlus />}
              // rightIcon={<FaArrowRight />}
              cn="!text-base"
              onClick={handleAddCustomField} // Add new custom field
            />
          </div>
        </div>
        {customFields.map(field => (
          <div key={field.id} className="col-span-12">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 mt-6 sm:col-span-6 md:col-span-4">
                  {/* <ValueAdjuster
                    label="Months"
                    value={count}
                    onChange={value => setCount(Math.max(2, Math.min(24, value)))}
                  />
                  <ValueAdjuster
                    label="Floor"
                    value={data.month}
                    onChange={val => updateField(index, 'month', val)}
                    steps={steps1}
                  /> */}
                  <ValueAdjuster
                    label="Month"
                    value={data.month}
                    onChange={val => updateField(index, 'month', val)}
                    steps={month}
                  />
                </div>
                <div className="col-span-12 sm:col-span-6 md:col-span-4">
                  <InputWithRightContent
                    label="Rent Price"
                    // value={searchValue}
                    // onChange={e => setSearchValue(e.target.value)}
                    rightContent={'THB/Per month'}
                  />
                </div>
                <div className="col-span-12 flex items-center justify-between gap-3 md:col-span-4">
                  <div className="w-[100%]">
                    <Input shadow label={'Security Deposit of Contract'} />
                  </div>
                  <div className="relative top-3.5">
                    <IconButton
                      leftIcon={<IoClose className="text-xl text-white" />}
                      cn="!px-2 bg-primary !rounded-full !size-[40px] !text-white shadow-card"
                      width="w-full"
                      onClick={() => handleRemoveCustomField(field.id)} // Remove specific custom field
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="col-span-12 flex justify-end gap-[14px]">
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
