import CustomLoading from '@/components/shared/small/CustomLoading';
import Dropdown from '@/components/shared/small/Dropdown';
import DropdownCheckbox from '@/components/shared/small/DropdownCheckbox';
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
  { option: 'Apartment', value: 'apartment' },
  { option: 'Townhouse', value: 'townhouse' },
  { option: 'Retail Space', value: 'retail space' },
  { option: 'Office', value: 'office' },
  { option: 'Shop Space', value: 'shop space' },
];

const weekDayOptions = [
  { option: 'Monday', value: 'monday' },
  { option: 'Tuesday', value: 'tuesday' },
  { option: 'Wednesday', value: 'wednesday' },
  { option: 'Thursday', value: 'thursday' },
  { option: 'Friday', value: 'friday' },
  { option: 'Saturday', value: 'saturday' },
  { option: 'Sunday', value: 'sunday' },
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

const BasicInfo = memo(({ data, index, updateField, setCurrentStep }) => {
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
      <h4 className="text-textColor text-center text-base font-medium md:text-lg">Property Information</h4>
      <form className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Dropdown
            label="Type of property"
            onSelect={option => updateField(index, 'propertyType', option.value)}
            options={propertyOptions}
            shadow
          />
        </div>
        <div className="lg:col-span-6">
          <Input
            label="Project Name"
            value={data.projectName}
            onChange={e => updateField(index, 'projectName', e.target.value)}
            shadow
          />
        </div>
        <div className="lg:col-span-6">
          <Input
            label="Street Address (Optional)"
            name="streetAddress"
            value={streetAddress}
            onChange={handleAddressChange}
          />
        </div>
        <div className="lg:col-span-6">
          <Input
            label="Rode/Soi"
            value={data.projectName}
            onChange={e => updateField(index, 'projectName', e.target.value)}
            shadow
          />
        </div>
        <div className="lg:col-span-6">
          <Dropdown
            label="District"
            options={subDistrictOptions}
            onSelect={option => updateField(index, 'district', option.value)}
            shadow
          />
        </div>
        <div className="lg:col-span-6">
          <Dropdown
            label="Sub District"
            options={subDistrictOptions}
            onSelect={option => updateField(index, 'district', option.value)}
            shadow
          />
        </div>
        <div className="lg:col-span-6">
          <Input
            label="State/Province"
            value={data.projectName}
            onChange={e => updateField(index, 'projectName', e.target.value)}
            shadow
          />
        </div>
        <div className="lg:col-span-6">
          <Input
            label="Country"
            value={data.projectName}
            onChange={e => updateField(index, 'projectName', e.target.value)}
            shadow
          />
        </div>
        <div className="lg:col-span-6">
          <Input
            label="Zip Code"
            value={data.projectName}
            onChange={e => updateField(index, 'projectName', e.target.value)}
            shadow
          />
        </div>

        <div className="lg:col-span-6">
          <DropdownCheckbox
            label="Buildings can be shown in (Days)"
            options={weekDayOptions}
            onSelect={option => updateField(index, 'day', option.value)}
            defaultText="Select fruits"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:col-span-6">
          <div>
            <Input
              label="Start time"
              value={data.startTime}
              onChange={e => updateField(index, 'startTime', e.target.value)}
              shadow
            />
          </div>
          <div>
            <Input
              label="End Time"
              value={data.endTime}
              onChange={e => updateField(index, 'endTime', e.target.value)}
              shadow
            />
          </div>
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
