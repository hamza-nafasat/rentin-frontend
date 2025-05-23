'use client';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import Image from 'next/image';
import Dropdown from '@/components/shared/small/Dropdown';
import Input from '@/components/shared/small/Input';
import InputDropdown from '@/components/shared/small/InputDropdown';
import { FaUser } from 'react-icons/fa'; // Example icon from react-icons
import ValueAdjuster from '@/components/shared/small/ValueAdjuster';
import Textarea from '@/components/shared/small/Textarea';
import RadioButton from '@/components/shared/small/RadioButton';

// Static data moved outside component to prevent recreation on each render
const BEDROOM_OPTIONS = [
  { option: '1 Bedroom', value: '1' },
  { option: '2 Bedrooms', value: '2' },
  { option: '3 Bedrooms', value: '3' },
  { option: '4+ Bedrooms', value: '4plus' },
];

const BATHROOM_OPTIONS = [
  { option: '1 Bathroom', value: '1' },
  { option: '1.5 Bathrooms', value: '1.5' },
  { option: '2 Bathrooms', value: '2' },
  { option: '2.5 Bathrooms', value: '2.5' },
  { option: '3 Bathrooms', value: '3' },
  { option: '3.5 Bathrooms', value: '3.5' },
  { option: '4+ Bathrooms', value: '4plus' },
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
  { option: 'High rise', value: 'high ' },
  { option: 'Low rise', value: 'rise' },
];

const PropertyInfo = ({ data, index, updateField, setCurrentStep, formData }) => {
  const fileInputRef = useRef(null);
  const floorFileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [floorImage, setFloorImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState('option1');
  const options = [
    { label: 'Building A', value: 'building-a' },
    { label: 'Building B', value: 'building-b' },
    { label: 'Building C', value: 'building-c' },
    { label: 'Building D', value: 'building-d' },
  ];
  console.log('formData', formData[0].propertyType);

  const handleNext = useCallback(() => setCurrentStep(prevStep => prevStep + 1), [setCurrentStep]);
  const handlePrevious = useCallback(() => setCurrentStep(prevStep => prevStep - 1), [setCurrentStep]);

  const handleImageUpload = useCallback(e => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  }, []);
  const handleFloorImageUpload = useCallback(e => {
    const file = e.target.files?.[0];
    if (file) {
      const floorImageUrl = URL.createObjectURL(file);
      setFloorImage(floorImageUrl);
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
  const handleFloorDrop = useCallback(e => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const floorImageUrl = URL.createObjectURL(file);
      setFloorImage(floorImageUrl);
    }
  }, []);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  const handleFloorClick = useCallback(() => {
    floorFileInputRef.current?.click();
  }, []);

  const handleButtonClick = useCallback(
    event => {
      event.stopPropagation();
      handleClick();
    },
    [handleClick]
  );
  const handleFloorButtonClick = useCallback(
    event => {
      event.stopPropagation();
      handleFloorClick();
    },
    [handleFloorClick]
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
  const [isChecked, setIsChecked] = useState(false);

  // Function to handle checkbox change
  const handleCheckboxChange = event => {
    setIsChecked(event.target.checked);
  };
  const [count, setCount] = useState(1);
  return (
    <div>
      <h4 className="text-textColor text-center text-base font-medium md:text-lg">Property Information</h4>
      <form className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <Input label="Property Title" shadow />
        </div>
        <div className="lg:col-span-12">
          <Textarea label="Description" placeholder="Enter a description for the image..." shadow={true} />
        </div>
        <div className="flex items-end lg:col-span-6">
          <ValueAdjuster label="Bedrooms" value={count} onChange={setCount} />
        </div>
        <div className="lg:col-span-6">
          {/* {formData[0].propertyType === 'condo' ? ( */}
          <ValueAdjuster label="BathRooms" value={count} onChange={setCount} />
          {/* ) : (
            <Dropdown placeholder="select" label="BathRooms" options={BATHROOM_OPTIONS} shadow />
          )} */}
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
        {/* <div className="lg:col-span-6">
          <Dropdown placeholder="select" label="Floor" options={FLOOR_OPTIONS} shadow />
        </div> */}
        <div className="lg:col-span-6">
          <Dropdown placeholder="Unfurnished" label="Property Condition" options={CONDITION_OPTIONS} shadow />
        </div>
        <div className="lg:col-span-6">
          {/* <h1>Select Building</h1> */}
          {/* <Dropdown
            placeholder="Only 1 Bldg"
            label="Building Your Property Located"
            options={BUILDING_OPTIONS}
            shadow
          /> */}
          <div className="h-full space-y-3">
            <label className="text-sm font-medium text-[#666666] lg:text-base">Select Building</label>
            <div className="flex h-full items-center gap-4">
              {options.map(option => (
                <RadioButton
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  checked={selected === option.value}
                  onChange={setSelected}
                />
              ))}
            </div>
            {/* <p className="mt-2 text-sm text-gray-600">Selected: {selected}</p> */}
          </div>
        </div>
        <div className="lg:col-span-6">
          <Dropdown placeholder="Building " label="Building Height" options={Building} shadow />
        </div>
        <div className="flex items-end lg:col-span-6">
          <ValueAdjuster label="Floor" value={count} onChange={setCount} />
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
