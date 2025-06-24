'use client';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Dropdown from '../shared/small/Dropdown';
import Input from '../shared/small/Input';
import provincesData from '@/data/addPropoerty/provinces.json';
import districtsData from '@/data/addPropoerty/districts.json';
import subdistrictsData from '@/data/addPropoerty/subdistricts.json';
import { useCreatePropertyMutation } from '@/features/property/propertyApi';
import ShowBuildingHours from '../owner/addProperty/ShowBuildingHours';

const ServiceArea = memo(({ setCurrentStep, index }) => {
  const [formData, setFormData] = useState([
    {
      propertyType: '',
      projectName: '',
      address: '',
      road: '',
      province: '',
      subDistrict: '',
      postalCode: '',
      startTime: '',
      endTime: '',
      location: '',
      district: '',
      street: '',
      propertyStatus: '',
      country: '',
    },
    {
      propertyTitle: '',
      PropertyDescription: '',
      bedRoom: '1',
      bathRoom: '1',
      area: '',
      unitNum: '',
      PropertyCondition: '',
      buildingHeight: '',
      floor: '1',
      building: '',
    },
    { propertyFeature: [], amenities: [], rentalFeature: [], propertyView: [] },
    { propertyImage: [], VerifyPropertyImage: [], floorPlanImage: [] },
    { oneMonth: '', oneMonthDeposit: '', deals: [] },
  ]);
  console.log('formData', formData);
  console.log(
    'location',
    formData[index].road,
    formData[index].subDistrict,
    formData[index].district,
    formData[index].province,
    formData[index].postalCode,
    formData[index].country
  );

  // Memoize updateField to ensure it's stable
  const updateField = useCallback((index, field, value) => {
    setFormData(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  }, []); // No dependencies needed as it only uses setState function

  // Add new state for BasicInfo component
  const [streetAddress, setStreetAddress] = useState('lahore');
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedSubdistrict, setSelectedSubdistrict] = useState(null);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredSubdistricts, setFilteredSubdistricts] = useState([]);
  const [createProperty, { isLoading, isSuccess, error }] = useCreatePropertyMutation();
  const [searchTerm, setSearchTerm] = useState({
    province: '',
    district: '',
    subdistrict: '',
    address: '',
  });
  const [showSuggestions, setShowSuggestions] = useState({
    province: false,
    district: false,
    subdistrict: false,
  });

  // Define handleSubdistrictClear first
  const handleSubdistrictClear = useCallback(() => {
    setSelectedSubdistrict(null);
    setSearchTerm(prev => ({ ...prev, subdistrict: '' }));
    updateField(0, 'subdistrict', '');
  }, [updateField]);

  // Then define handleInputChange which depends on handleSubdistrictClear
  const handleInputChange = useCallback(
    (field, value) => {
      setSearchTerm(prev => ({ ...prev, [field]: value }));
      setShowSuggestions(prev => ({ ...prev, [field]: true }));

      // If the field is subdistrict and the value is empty, clear the selection
      if (field === 'subdistrict' && !value) {
        handleSubdistrictClear();
      }
    },
    [handleSubdistrictClear]
  );

  const handleProvinceSelect = useCallback(option => {
    setSelectedProvince(option.value);
    setSearchTerm(prev => ({ ...prev, province: option.label }));
    updateField(0, 'province', option.label);
    setShowSuggestions(prev => ({ ...prev, province: false }));
  }, []);

  const handleDistrictSelect = useCallback(option => {
    setSelectedDistrict(option.value);
    setSearchTerm(prev => ({ ...prev, district: option.label }));
    updateField(0, 'district', option.label);
    updateField(0, 'postalCode', option.postalCode);
    setShowSuggestions(prev => ({ ...prev, district: false }));
  }, []);

  const handleSubdistrictSelect = useCallback(
    option => {
      // If the same subdistrict is selected again, clear it
      if (selectedSubdistrict === option.value) {
        setSelectedSubdistrict(null);
        setSearchTerm(prev => ({ ...prev, subdistrict: '' }));
        updateField(0, 'subdistrict', '');
      } else {
        setSelectedSubdistrict(option.value);
        setSearchTerm(prev => ({ ...prev, subdistrict: option.label }));
        updateField(0, 'subdistrict', option.label);
      }
      setShowSuggestions(prev => ({ ...prev, subdistrict: false }));
    },
    [selectedSubdistrict, updateField]
  );

  const handleAddressChange = useCallback(e => {
    setStreetAddress(e.target.value);
  }, []);

  // Update districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      const districts = districtsData
        .filter(district => district.provinceCode.toString() === selectedProvince)
        .map(district => ({
          label: `${district.districtNameEn} `,
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

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   const formData = new FormData();

  //   // Append text fields
  //   // formData.append('name', name);
  //   // formData.append('type', type);
  //   // formData.append('title', title);
  //   // formData.append('description', description);
  //   // formData.append('propertyStatus', propertyStatus);
  //   // formData.append('building', building);
  //   // formData.append('buildingHeight', buildingHeight);
  //   // formData.append('latitude', latitude);
  //   // formData.append('longitude', longitude);
  //   // formData.append('bedrooms', bedrooms);
  //   // formData.append('bathrooms', bathrooms);
  //   // formData.append('unitArea', unitArea);
  //   // formData.append('unitAreaUnit', unitAreaUnit);
  //   // formData.append('unitNumber', unitNumber);
  //   // formData.append('floor', floor);
  //   // formData.append('condition', condition);
  //   // formData.append('propertyClassification', propertyClassification);
  //   // formData.append('propertyLocated', propertyLocated);
  //   // formData.append('contractRate', contractRate);
  //   // formData.append('securityDeposit', securityDeposit);
  //   // formData.append('deals', deals);

  //   // // Append arrays (stringify them)
  //   // formData.append('amenities', JSON.stringify(amenities));
  //   // formData.append('propertyFeatures', JSON.stringify(propertyFeatures));
  //   // formData.append('rentalFeatures', JSON.stringify(rentalFeatures));
  //   // formData.append('viewFromTheProperty', JSON.stringify(viewFromTheProperty));
  //   // formData.append('availability', JSON.stringify(availability)); // make sure it's an array of objects

  //   // // Append files
  //   // if (ownershipDocument) {
  //   //   formData.append('ownershipDocument', ownershipDocument);
  //   // }

  //   // if (bluePrint) {
  //   //   formData.append('bluePrint', bluePrint);
  //   // }

  //   // images.forEach(image => {
  //   //   formData.append('images', image);
  //   // });

  //   // try {
  //   //   await createProperty(formData).unwrap();
  //   //   toast.success('Property created successfully!');
  //   // } catch (err) {
  //   //   console.error(err);
  //   //   toast.error(err?.data?.message || 'Failed to create property');
  //   // }
  // };

  // Update subdistricts when district changes
  useEffect(() => {
    if (selectedDistrict) {
      const subdistricts = subdistrictsData
        .filter(subdistrict => subdistrict.districtCode.toString() === selectedDistrict)
        .map(subdistrict => ({
          label: `${subdistrict.subdistrictNameEn}`,
          value: subdistrict.subdistrictCode.toString(),
        }));
      setFilteredSubdistricts(subdistricts);
      setSelectedSubdistrict(null);
      setSearchTerm(prev => ({ ...prev, subdistrict: '' }));
    } else {
      setFilteredSubdistricts([]);
    }
  }, [selectedDistrict]);

  // Filter provinces based on search
  const provinceOptions = useMemo(
    () =>
      provincesData.map(province => ({
        label: `${province.provinceNameEn}`,
        value: province.provinceCode.toString(),
      })),
    []
  );

  const propertyStatus = [
    { option: 'Available', value: 'available' },
    { option: 'Rented', value: 'rented' },
  ];

  const filteredProvinces = useMemo(
    () => provinceOptions.filter(province => province.label.toLowerCase().includes(searchTerm.province.toLowerCase())),
    [provinceOptions, searchTerm.province]
  );

  const filteredDistrictOptions = useMemo(
    () =>
      filteredDistricts.filter(district => district.label.toLowerCase().includes(searchTerm.district.toLowerCase())),
    [filteredDistricts, searchTerm.district]
  );

  const filteredSubdistrictOptions = useMemo(
    () =>
      filteredSubdistricts.filter(subdistrict =>
        subdistrict.label.toLowerCase().includes(searchTerm.subdistrict.toLowerCase())
      ),
    [filteredSubdistricts, searchTerm.subdistrict]
  );
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
          <div key={index} className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => onSelect(suggestion)}>
            {suggestion.label}
          </div>
        ))}
      </div>
    );
  };

  const handleNext = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handlePrevious = useCallback(() => setCurrentStep(prevStep => prevStep - 1), [setCurrentStep]);

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(streetAddress)}&output=embed`;

  return (
    <div>
      <h4 className="text-textPrimary text-center text-base font-medium md:text-lg">Service Area</h4>
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
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
            value={formData[index].road || ''}
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
            value={formData[0].postalCode || ''}
            onChange={e => updateField(0, 'postalCode', e.target.value)}
            disabled={!selectedDistrict}
          />
        </div>
        <div className="lg:col-span-6">
          <Input
            label="Country"
            // value="Thailand"
            value={formData[index].country || ''}
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
        {formData[index].propertyStatus === 'available' && (
          <div className="flex justify-center lg:col-span-12">
            <div className="shadow-card w-[100%] rounded-lg border bg-white p-3 md:w-[80%]">
              <ShowBuildingHours />
            </div>
          </div>
        )}
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
      </div>
    </div>
  );
});

ServiceArea.displayName = 'ServiceArea';

export default ServiceArea;
