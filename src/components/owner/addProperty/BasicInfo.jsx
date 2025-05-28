'use client';
import CustomLoading from '@/components/shared/small/CustomLoading';
import Input from '@/components/shared/small/Input';
import dynamic from 'next/dynamic';
import { useState, useCallback, memo, useEffect, useRef } from 'react';
import ShowBuildingHours from './ShowBuildingHours';
import provincesData from '@/data/addPropoerty/provinces.json';
import districtsData from '@/data/addPropoerty/districts.json';
import subdistrictsData from '@/data/addPropoerty/subdistricts.json';
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

const subDistrictOptions = [{ option: 'Thailand', value: 'thailand' }];
const propertyStatus = [
  { option: 'Available', value: 'available' },
  { option: 'Rented', value: 'rented' },
];

const BasicInfo = memo(({ data, index, updateField, setCurrentStep }) => {
  const [streetAddress, setStreetAddress] = useState('thailand');
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedSubdistrict, setSelectedSubdistrict] = useState(null);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredSubdistricts, setFilteredSubdistricts] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    province: '',
    district: '',
    subdistrict: '',
  });
  const [showSuggestions, setShowSuggestions] = useState({
    province: false,
    district: false,
    subdistrict: false,
  });
  console.log('data', data);

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
  }, []);

  // Convert data to suggestion format
  const provinceOptions = provincesData.map(province => ({
    label: `${province.provinceNameEn} (${province.provinceNameTh})`,
    value: province.provinceCode.toString(),
  }));

  // Filter provinces based on search
  const filteredProvinces = provinceOptions.filter(province =>
    province.label.toLowerCase().includes(searchTerm.province.toLowerCase())
  );

  // Update districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      const districts = districtsData
        .filter(district => district.provinceCode.toString() === selectedProvince)
        .map(district => ({
          label: `${district.districtNameEn} (${district.districtNameTh})`,
          value: district.districtCode.toString(),
          postalCode: district.postalCode,
        }));
      setFilteredDistricts(districts);
      setSelectedDistrict(null);
      setSelectedSubdistrict(null);
      setSearchTerm(prev => ({ ...prev, district: '', subdistrict: '' }));
    } else {
      setFilteredDistricts([]);
    }
  }, [selectedProvince]);

  // Update subdistricts when district changes
  useEffect(() => {
    if (selectedDistrict) {
      const subdistricts = subdistrictsData
        .filter(subdistrict => subdistrict.districtCode.toString() === selectedDistrict)
        .map(subdistrict => ({
          label: `${subdistrict.subdistrictNameEn} (${subdistrict.subdistrictNameTh})`,
          value: subdistrict.subdistrictCode.toString(),
        }));
      setFilteredSubdistricts(subdistricts);
      setSelectedSubdistrict(null);
      setSearchTerm(prev => ({ ...prev, subdistrict: '' }));
    } else {
      setFilteredSubdistricts([]);
    }
  }, [selectedDistrict]);

  // Filter districts based on search
  const filteredDistrictOptions = filteredDistricts.filter(district =>
    district.label.toLowerCase().includes(searchTerm.district.toLowerCase())
  );

  // Filter subdistricts based on search
  const filteredSubdistrictOptions = filteredSubdistricts.filter(subdistrict =>
    subdistrict.label.toLowerCase().includes(searchTerm.subdistrict.toLowerCase())
  );

  const handleProvinceSelect = useCallback(
    option => {
      setSelectedProvince(option.value);
      setSearchTerm(prev => ({ ...prev, province: option.label }));
      updateField(index, 'province', option.value);
      setShowSuggestions(prev => ({ ...prev, province: false }));
    },
    [index, updateField]
  );

  const handleDistrictSelect = useCallback(
    option => {
      setSelectedDistrict(option.value);
      setSearchTerm(prev => ({ ...prev, district: option.label }));
      updateField(index, 'district', option.value);
      updateField(index, 'postalCode', option.postalCode);
      setShowSuggestions(prev => ({ ...prev, district: false }));
    },
    [index, updateField]
  );

  const handleSubdistrictSelect = useCallback(
    option => {
      setSelectedSubdistrict(option.value);
      setSearchTerm(prev => ({ ...prev, subdistrict: option.label }));
      updateField(index, 'subdistrict', option.value);
      setShowSuggestions(prev => ({ ...prev, subdistrict: false }));
    },
    [index, updateField]
  );

  const handleInputChange = useCallback((field, value) => {
    setSearchTerm(prev => ({ ...prev, [field]: value }));
    setShowSuggestions(prev => ({ ...prev, [field]: true }));
  }, []);

  const SuggestionList = ({ suggestions, onSelect, show, containerRef }) => {
    if (!show || suggestions.length === 0) return null;

    return (
      <div
        ref={containerRef}
        className="ring-opacity-5 scroll-0 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white py-1 shadow-lg"
      >
        {suggestions.map((suggestion, index) => (
          <div key={index} className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => onSelect(suggestion)}>
            {suggestion.label}
          </div>
        ))}
      </div>
    );
  };

  console.log('log', data.propertyStatus);

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
            onChange={e => handleInputChange('subDistrict', e.target.value)}
            onFocus={() => selectedDistrict && setShowSuggestions(prev => ({ ...prev, subdistrict: true }))}
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
          <Input label="Country" value="Thailand" disabled shadow />
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
          <div className="flex justify-start lg:col-span-12">
            <div className="shadow-card rounded-lg border bg-white px-5">
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
      </form>
    </div>
  );
});

BasicInfo.displayName = 'BasicInfo';

export default BasicInfo;
