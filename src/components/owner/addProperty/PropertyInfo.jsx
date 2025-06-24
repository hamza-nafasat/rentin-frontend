'use client';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import Image from 'next/image';
import styles from './PropertyInfo.module.css';
import Dropdown from '@/components/shared/small/Dropdown';
import Input from '@/components/shared/small/Input';
import InputDropdown from '@/components/shared/small/InputDropdown';
import { FaUser } from 'react-icons/fa'; // Example icon from react-icons
import ValueAdjuster from '@/components/shared/small/ValueAdjuster';
import Textarea from '@/components/shared/small/Textarea';
import RadioButton from '@/components/shared/small/RadioButton';
import InputWithRightContent from '@/components/shared/small/InputWithRightContent';

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
  { value: 'SqM', label: 'Sqm' },
  { value: 'SqW', label: 'Sqw' },
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
  { option: 'Fully Furnished', value: 'fully_furnished' },
  { option: 'Partly Furnished', value: 'partly_furnished' },
  { option: 'Unfurnished', value: 'unfurnished' },
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
  const [showInput1, setShowInput1] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState('');

  // const handleRentReasonChange1 = e => {
  //   setShowInput1(e.target.id === 'Custom');
  // };

  const options = [
    { label: 'Building A', id: 'building-a' },
    { label: 'Building B', id: 'building-b' },
    { label: 'Building C', id: 'building-c' },
    { label: 'Building D', id: 'building-d' },
    { label: 'Building E', id: 'building-e' },
    { label: 'Custom', id: 'Custom' },
  ];
  console.log('formData', formData[0].propertyType);

  const handleNext = useCallback(() => setCurrentStep(prevStep => prevStep + 1), [setCurrentStep]);
  const handlePrevious = useCallback(() => setCurrentStep(prevStep => prevStep - 1), [setCurrentStep]);

  const handleRentReasonChange1 = e => {
    const { id } = e.target;
    setShowInput1(id === 'Custom');

    if (id !== 'Custom') {
      updateField(index, 'building', id); // Save building ID for predefined options
      setSelectedBuilding(id);
    } else {
      setSelectedBuilding(''); // Clear previously selected building
      updateField(index, 'building', ''); // Optional: clear the field initially
    }
  };

  // Handles typing in custom input
  const handleCustomInputChange = e => {
    const value = e.target.value;
    setSelectedBuilding(value);
    updateField(index, 'building', value); // Save custom input
  };

  // Cleanup image URL when component unmounts
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  const floors = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  ];

  // Case 2: Studio + numeric
  const bedRooms = [
    'Studio',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
  ];

  // Case 3: Decimal steps
  const bathrooms = [
    1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14,
    14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20,
  ];

  return (
    <div>
      <h4 className="text-textPrimary text-center text-base font-medium md:text-lg">Property Information</h4>
      <form className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <Input
            value={data.propertyTitle}
            shadow
            label="Property Title"
            onChange={e => updateField(index, 'propertyTitle', e.target.value)}
          />
        </div>
        <div className="lg:col-span-12">
          <Textarea
            label="Description"
            value={data.PropertyDescription}
            onChange={e => updateField(index, 'PropertyDescription', e.target.value)}
            placeholder="Enter a description for the image..."
            shadow={true}
          />
        </div>
        <div className="flex items-end lg:col-span-6">
          <ValueAdjuster
            label="Bedrooms"
            value={data.bedRoom}
            onChange={val => updateField(index, 'bedRoom', val)} // val = "3 sqft"
            steps={bedRooms}
          />
        </div>
        <div className="lg:col-span-6">
          {/* {formData[0].propertyType === 'condo' ? ( */}
          <ValueAdjuster
            label="Bathrooms"
            value={data.bathRoom}
            onChange={val => updateField(index, 'bathRoom', val)}
            steps={bathrooms}
          />
          {/* ) : (
            <Dropdown placeholder="select" label="BathRooms" options={BATHROOM_OPTIONS} shadow />
          )} */}
        </div>
        <div className="lg:col-span-6">
          <InputDropdown
            placeholder="0"
            label="Unit Area"
            options={FREQUENCY_OPTIONS}
            onChange={val => updateField(index, 'area', val)} // val = "3 sqft"
            width="w--[79px]"
          />
        </div>
        <div className="lg:col-span-6">
          <Input
            value={data.unitNum}
            onChange={e => updateField(index, 'unitNum', e.target.value)}
            shadow
            placeholder="i. e A302"
            label="Unit Number (optional)"
          />
        </div>
        {/* <div className="lg:col-span-6">
          <Dropdown placeholder="select" label="Floor" options={FLOOR_OPTIONS} shadow />
        </div> */}
        <div className="lg:col-span-6">
          <Dropdown
            placeholder="Unfurnished"
            onSelect={option => updateField(index, 'PropertyCondition', option.value)}
            label="Property Condition"
            options={CONDITION_OPTIONS}
            shadow
          />
        </div>

        <div className="lg:col-span-6">
          <Dropdown
            placeholder="Building "
            onSelect={option => updateField(index, 'buildingHeight', option.value)}
            label="Building Height"
            options={Building}
            shadow
          />
        </div>
        <div className="flex items-end lg:col-span-6">
          <ValueAdjuster
            label="Floor"
            value={data.floor}
            onChange={val => updateField(index, 'floor', val)}
            steps={floors}
          />
        </div>
        <div className="lg:col-span-12">
          <div className="flex h-full flex-col space-y-2">
            <label className="text-sm font-medium text-[#666666] lg:text-base">Select Building</label>
            <div className="flex h-full flex-wrap gap-4">
              {options.map(({ id, label }) => (
                <div key={id} className="flex h-fit gap-2">
                  <label className={styles.radioItem} htmlFor={id}>
                    <input
                      id={id}
                      type="radio"
                      onChange={handleRentReasonChange1}
                      name="option"
                      checked={selectedBuilding === id || (id === 'Custom' && showInput1)}
                    />
                    <div className={styles.customRadio}></div>
                    <span>{label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          {showInput1 && (
            <div>
              <label className="text-sm font-medium text-[#666666] lg:text-base">Enter Custom Building</label>
              <div className="mt-1">
                <Input type="text" placeholder="Enter" value={selectedBuilding} onChange={handleCustomInputChange} />
              </div>
            </div>
          )}
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
