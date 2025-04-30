'use client';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import Image from 'next/image';
import Dropdown from '@/components/shared/small/Dropdown';
import Input from '@/components/shared/small/Input';
import InputDropdown from '@/components/shared/small/InputDropdown';
import { FaUser } from 'react-icons/fa'; // Example icon from react-icons

// Static data moved outside component to prevent recreation on each render
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

const FREQUENCY_OPTIONS = [
  { value: 'SqM', label: 'SqM' },
  { value: 'SqW', label: 'SqW' },
  { value: 'Sqft', label: 'Sqft' },
];
const CommonAreaMaintenanceFee = [
  { value: 'THB', label: 'THB (Thai Baht)' },
  { value: 'USD', label: 'USD (US Dollar)' },
  { value: 'EUR', label: 'EUR (Euro)' },
  { value: 'GBP', label: 'GBP (British Pound)' },
  { value: 'JPY', label: 'JPY (Japanese Yen)' },
  { value: 'PKR', label: 'PKR (Pakistani Rupee)' },
  { value: 'INR', label: 'INR (Indian Rupee)' },
  { value: 'CNY', label: 'CNY (Chinese Yuan)' },
  { value: 'AED', label: 'AED (UAE Dirham)' },
];

const FLOOR_OPTIONS = [
  { option: 'Ground Floor', value: 'ground' },
  { option: '1st Floor', value: '1st' },
  { option: '2nd Floor', value: '2nd' },
  { option: '3rd Floor', value: '3rd' },
];

const CONDITION_OPTIONS = [
  { option: 'Unfurnished', value: 'unfurnished' },
  { option: 'Fully Furnished', value: 'fully_furnished' },
  { option: 'Partly Furnished', value: 'partly_furnished' },
  { option: 'Negotiable', value: 'negotiable' },
];

const BUILDING_OPTIONS = [
  { option: 'Only 1 Bldg', value: 'only_1_bldg' },
  { option: 'Bldg. A or 1', value: 'bldg_a_or_1' },
  { option: 'Bldg. B or 2', value: 'bldg_b_or_2' },
  { option: 'Bldg. C or 3', value: 'bldg_c_or_3' },
  { option: 'Bldg. D or 4', value: 'bldg_d_or_4' },
  { option: 'Other', value: 'other' },
];
const Building = [
  { option: 'High ', value: 'high ' },
  { option: 'Rise', value: 'rise' },
  { option: 'Low ', value: 'low ' },
];

const PropertyInfo = ({ setCurrentStep }) => {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState('');

  // Memoized handlers
  const handleNext = useCallback(() => setCurrentStep(prevStep => prevStep + 1), [setCurrentStep]);
  const handlePrevious = useCallback(
    () => setCurrentStep(prevStep => prevStep - 1),
    [setCurrentStep]
  );

  const handleImageUpload = useCallback(e => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  }, []);

  const handleDrop = useCallback(e => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  }, []);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleButtonClick = useCallback(
    event => {
      event.stopPropagation();
      handleClick();
    },
    [handleClick]
  );

  const handleSelect = useCallback(option => {
    console.log('Selected option:', option);
  }, []);

  // Cleanup image URL when component unmounts
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  return (
    <div>
      <h4 className="text-textColor text-center text-base font-medium md:text-lg">
        Property Information
      </h4>
      <form className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Dropdown placeholder="select" label="Bedrooms" options={BEDROOM_OPTIONS} shadow />
        </div>
        <div className="lg:col-span-6">
          <Dropdown placeholder="select" label="BathRooms" options={BATHROOM_OPTIONS} shadow />
        </div>
        <div className="lg:col-span-6">
          <InputDropdown
            placeholder="0"
            label="Unit Area"
            options={FREQUENCY_OPTIONS}
            defaultText=""
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onSelect={option => setSelectedOption(option)}
            shadow={true}
            mainClassName="custom-dropdown"
            width="w--[79px]"
          />
        </div>
        <div className="lg:col-span-6">
          <Input placeholder="i. e A302" label="Unit Number (optional)" shadow />
        </div>
        <div className="lg:col-span-6">
          <Dropdown placeholder="select" label="Floor" options={FLOOR_OPTIONS} shadow />
        </div>
        <div className="lg:col-span-6">
          <Dropdown
            placeholder="Unfurnished"
            label="Property Condition"
            options={CONDITION_OPTIONS}
            shadow
          />
        </div>
        <div className="lg:col-span-6">
          <Dropdown
            placeholder="Only 1 Bldg"
            label="Building Your Property Located"
            options={BUILDING_OPTIONS}
            shadow
          />
        </div>
        <div className="lg:col-span-6">
          {/* <InputDropdown
            placeholder="0"
            label="Common Area Maintenance Fee"
            options={CommonAreaMaintenanceFee}
            defaultText=""
            onSelect={handleSelect}
            mainClassName="custom-dropdown"
            dropdownIcon={'$ '}
            width="w--[79px]"
          /> */}
          <Dropdown placeholder="Building " label="Building" options={Building} shadow />
        </div>
        <div className="lg:col-span-12">
          <div
            className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-blue-500"
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <AiOutlineCloudUpload className="text-primary h-10 w-10" />
            <p className="mt-2 text-xs text-[#32343C]">
              Click here to upload your ownership documents
            </p>
            <p className="mt-2 text-sm text-[#32343C]">
              (Condo Title Deed, House Book, Land Title, Etc.)
            </p>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
            />

            <button
              type="button"
              onClick={handleButtonClick}
              className="bg-primary mt-3 cursor-pointer rounded-lg px-4 py-2 text-white hover:bg-blue-600"
            >
              Browse
            </button>

            {image && (
              <div className="relative mt-3 h-40 w-40">
                <Image
                  src={image}
                  alt="Uploaded"
                  fill
                  className="rounded-lg object-cover"
                  priority
                />
              </div>
            )}
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
};

export default PropertyInfo;

const CustomIcon = (
  <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 2a8 8 0 108 8 8.009 8.009 0 00-8-8zm1 12H9v-2h2zm0-4H9V6h2z" />
  </svg>
);
