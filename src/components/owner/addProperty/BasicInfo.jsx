'use client';
import CustomLoading from '@/components/shared/small/CustomLoading';
import Input from '@/components/shared/small/Input';
import dynamic from 'next/dynamic';
import { memo, useRef, useEffect } from 'react';
import ShowBuildingHours from './ShowBuildingHours';

import Dropdown from '@/components/shared/small/Dropdown';

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

const propertyStatus = [
  { option: 'Available', value: 'available' },
  { option: 'Rented', value: 'rented' },
];

const BasicInfo = memo(
  ({
    data,
    index,
    updateField,
    setCurrentStep,
    streetAddress,
    searchTerm,
    showSuggestions,
    setShowSuggestions,
    handleInputChange,
    handleProvinceSelect,
    handleDistrictSelect,
    handleSubdistrictSelect,
    handleSubdistrictClear,
    handleAddressChange,
    filteredProvinces,
    filteredDistrictOptions,
    filteredSubdistrictOptions,
    selectedProvince,
    selectedDistrict,
    selectedSubdistrict,
  }) => {
    // Refs for suggestion containers
    const provinceRef = useRef(null);
    const districtRef = useRef(null);
    const subdistrictRef = useRef(null);

    // Close suggestions when clicking outside
    useEffect(() => {
      const handleClickOutside = event => {
        if (provinceRef.current && !provinceRef.current.contains(event.target)) {
          setShowSuggestions(prev => ({ ...prev, province: false }));
        }
        if (districtRef.current && !districtRef.current.contains(event.target)) {
          setShowSuggestions(prev => ({ ...prev, district: false }));
        }
        if (subdistrictRef.current && !subdistrictRef.current.contains(event.target)) {
          setShowSuggestions(prev => ({ ...prev, subdistrict: false }));
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setShowSuggestions]);

    const SuggestionList = ({ suggestions, onSelect, show, containerRef }) => {
      if (!show || suggestions.length === 0) return null;

      return (
        <div
          ref={containerRef}
          className="ring-opacity-5 scroll-0 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white py-1 shadow-lg"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => onSelect(suggestion)}
            >
              {suggestion.label}
            </div>
          ))}
        </div>
      );
    };

    const handleNext = () => {
      setCurrentStep(prevStep => prevStep + 1);
    };

    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(streetAddress)}&output=embed`;

    return (
      <div>
        <h4 className="text-textPrimary text-center text-base font-medium md:text-lg">Property Information</h4>
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Dropdown
              label="Property types"
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
              label="Address"
              name="streetAddress"
              value={searchTerm.address}
              onChange={e => handleInputChange('address', e.target.value)}
              shadow
            />
          </div>
          <div className="lg:col-span-6">
            <Input
              label="Road"
              value={data.road || ''}
              onChange={e => updateField(index, 'road', e.target.value)}
              shadow
            />
          </div>
          <div className="relative lg:col-span-6">
            <Input
              label="Province"
              value={searchTerm.province}
              onChange={e => handleInputChange('province', e.target.value)}
              onFocus={() => setShowSuggestions(prev => ({ ...prev, province: true }))}
              shadow
            />
            <SuggestionList
              suggestions={filteredProvinces}
              onSelect={handleProvinceSelect}
              show={showSuggestions.province}
              containerRef={provinceRef}
            />
          </div>
          <div className="relative lg:col-span-6">
            <Input
              label="District"
              value={searchTerm.district}
              onChange={e => handleInputChange('district', e.target.value)}
              onFocus={() => selectedProvince && setShowSuggestions(prev => ({ ...prev, district: true }))}
              disabled={!selectedProvince}
              shadow
            />
            <SuggestionList
              suggestions={filteredDistrictOptions}
              onSelect={handleDistrictSelect}
              show={showSuggestions.district}
              containerRef={districtRef}
            />
          </div>
          <div className="relative lg:col-span-6">
            <Input
              label="Sub District"
              value={searchTerm.subdistrict}
              onChange={e => handleInputChange('subdistrict', e.target.value)}
              onFocus={() => selectedDistrict && setShowSuggestions(prev => ({ ...prev, subdistrict: true }))}
              onKeyDown={e => {
                if (e.key === 'Backspace' && !searchTerm.subdistrict) {
                  handleSubdistrictClear();
                }
              }}
              disabled={!selectedDistrict}
              shadow
            />
            <SuggestionList
              suggestions={filteredSubdistrictOptions}
              onSelect={handleSubdistrictSelect}
              show={showSuggestions.subdistrict}
              containerRef={subdistrictRef}
            />
          </div>
          <div className="lg:col-span-6">
            <Input
              shadow
              label="Zip Code"
              value={data.postalCode || ''}
              onChange={e => updateField(index, 'postalCode', e.target.value)}
              disabled={!selectedDistrict}
            />
          </div>
          <div className="lg:col-span-6">
            <Input
              label="Country"
              // value="Thailand"
              value={data.country || ''}
              // disabled
              onChange={e => updateField(index, 'country', e.target.value)}
              shadow
            />
          </div>

          <div className="lg:col-span-6">
            <Dropdown
              label="Property Status"
              options={propertyStatus}
              onSelect={option => updateField(index, 'propertyStatus', option.value)}
              shadow
            />
          </div>
          {data.propertyStatus === 'available' && (
            <div className="flex justify-center lg:col-span-12">
              <div className="shadow-card w-[100%] rounded-lg border bg-white p-3 md:w-[80%]">
                <ShowBuildingHours />
              </div>
            </div>
          )}
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
        </div>
      </div>
    );
  }
);

BasicInfo.displayName = 'BasicInfo';

export default BasicInfo;
