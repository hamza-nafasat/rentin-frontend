import CustomLoading from '@/components/shared/small/CustomLoading';
import Dropdown from '@/components/shared/small/Dropdown';
import Input from '@/components/shared/small/Input';
import dynamic from 'next/dynamic';
import { useState, useCallback, memo } from 'react';

const MapWithLocation = dynamic(() => import('./MapWithLocation'), {
  ssr: false,
  loading: () => <CustomLoading />,
});

// Move static options outside component to prevent recreation on each render
const propertyOptions = [
  { option: 'House', value: 'house' },
  { option: 'Villa', value: 'villa' },
  { option: 'Condo', value: 'condo' },
  { option: 'Appartment', value: 'appartment' },
  { option: 'Townhouse', value: 'townhouse' },
  { option: 'Retail Space', value: 'retail space' },
  { option: 'Office', value: 'office' },
];

const regionOptions = [
  { option: 'North Region', value: 'north-region' },
  { option: 'South Region', value: 'south-region' },
  { option: 'East Region', value: 'east-region' },
  { option: 'West Region', value: 'west-region' },
];
const showDaysOptions = [{ option: 'Withing 7 days', value: '7-days' }];
const showHoursOptions = [{ option: 'Withing 12 hours', value: '12-hours' }];
const locationOptions = [{ option: 'Thailand', value: 'thailand' }];
const subDistrictOptions = [{ option: 'Thailand', value: 'thailand' }];

const BasicInfo = memo(({ setCurrentStep }) => {
  const [streetAddress, setStreetAddress] = useState('thailand');

  // Memoize handlers to prevent unnecessary re-renders
  const handleNext = useCallback(() => {
    setCurrentStep(prevStep => prevStep + 1);
  }, [setCurrentStep]);

  const handleAddressChange = useCallback(e => {
    setStreetAddress(e.target.value);
  }, []);

  const handlePropertySelect = useCallback(selectedOption => {
    console.log('Selected:', selectedOption);
  }, []);

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(streetAddress)}&output=embed`;

  return (
    <div>
      <h4 className="text-textColor text-center text-base font-medium md:text-lg">
        Property Information
      </h4>
      <form className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <Dropdown
            label="Type of property"
            onSelect={handlePropertySelect}
            options={propertyOptions}
            shadow
          />
        </div>
        <div className="lg:col-span-6">
          <Input label="Project Name" shadow />
        </div>
        <div className="lg:col-span-6">
          <Dropdown label="Region" options={regionOptions} shadow />
        </div>
        <div className="lg:col-span-6">
          <Dropdown label="Buildings can be shown in (Days)" options={showDaysOptions} shadow />
        </div>
        <div className="lg:col-span-6">
          <Dropdown label="Buildings can be shown in (Hours)" options={showHoursOptions} shadow />
        </div>
        <div className="lg:col-span-6">
          <Dropdown label="Location" options={locationOptions} shadow />
        </div>
        <div className="lg:col-span-6">
          <Dropdown label="Sub district" options={subDistrictOptions} shadow />
        </div>
        <div className="lg:col-span-12">
          <Input
            label="Street Address (Optional)"
            name="streetAddress"
            value={streetAddress}
            onChange={handleAddressChange}
          />
        </div>
        {/* MAP (iframe) */}
        <div className="h-[300px] md:h-[400px] lg:col-span-12">
          <MapWithLocation location={streetAddress} />
        </div>
        <div className="flex justify-end gap-[14px] lg:col-span-12">
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
});

BasicInfo.displayName = 'BasicInfo';

export default BasicInfo;
