'use client';
import BasicInfo from '@/components/owner/addProperty/BasicInfo';
import FeatureAndAmenities from '@/components/owner/addProperty/FeatureAndAmenities';
import PhotosAndDetails from '@/components/owner/addProperty/PhotosAndDetails';
import Pricing from '@/components/owner/addProperty/Pricing';
import PropertyInfo from '@/components/owner/addProperty/PropertyInfo';
import { useState, useMemo, useCallback, useEffect } from 'react';
import Step from './Step';
import provincesData from '@/data/addPropoerty/provinces.json';
import districtsData from '@/data/addPropoerty/districts.json';
import subdistrictsData from '@/data/addPropoerty/subdistricts.json';
import { useCreatePropertyMutation } from '@/features/property/propertyApi';

const AddProperty = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = useMemo(() => ['Basic Info', 'Property Info', 'Feature & Amenities', 'Photos ', 'Pricing'], []);

  // Define formData and updateField first

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
    { input1: '', input2: '', dropdown1: '', month: '1' },
  ]);
  console.log('formData', formData);
  console.log(
    'location',
    formData[0].road,
    formData[0].subDistrict,
    formData[0].district,
    formData[0].province,
    formData[0].postalCode,
    formData[0].country
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
    updateField(0, 'province', option.value);
    setShowSuggestions(prev => ({ ...prev, province: false }));
  }, []);

  const handleDistrictSelect = useCallback(option => {
    setSelectedDistrict(option.value);
    setSearchTerm(prev => ({ ...prev, district: option.label }));
    updateField(0, 'district', option.value);
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
        updateField(0, 'subdistrict', option.value);
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
  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();

    // Append text fields
    formData.append('name', name);
    formData.append('type', type);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('propertyStatus', propertyStatus);
    formData.append('building', building);
    formData.append('buildingHeight', buildingHeight);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('bedrooms', bedrooms);
    formData.append('bathrooms', bathrooms);
    formData.append('unitArea', unitArea);
    formData.append('unitAreaUnit', unitAreaUnit);
    formData.append('unitNumber', unitNumber);
    formData.append('floor', floor);
    formData.append('condition', condition);
    formData.append('propertyClassification', propertyClassification);
    formData.append('propertyLocated', propertyLocated);
    formData.append('contractRate', contractRate);
    formData.append('securityDeposit', securityDeposit);
    formData.append('deals', deals);

    // Append arrays (stringify them)
    formData.append('amenities', JSON.stringify(amenities));
    formData.append('propertyFeatures', JSON.stringify(propertyFeatures));
    formData.append('rentalFeatures', JSON.stringify(rentalFeatures));
    formData.append('viewFromTheProperty', JSON.stringify(viewFromTheProperty));
    formData.append('availability', JSON.stringify(availability)); // make sure it's an array of objects

    // Append files
    if (ownershipDocument) {
      formData.append('ownershipDocument', ownershipDocument);
    }

    if (bluePrint) {
      formData.append('bluePrint', bluePrint);
    }

    images.forEach(image => {
      formData.append('images', image);
    });

    try {
      await createProperty(formData).unwrap();
      toast.success('Property created successfully!');
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || 'Failed to create property');
    }
  };

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

  // Filter provinces based on search
  const provinceOptions = useMemo(
    () =>
      provincesData.map(province => ({
        label: `${province.provinceNameEn} (${province.provinceNameTh})`,
        value: province.provinceCode.toString(),
      })),
    []
  );

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

  const stepComponents = useMemo(
    () => [
      <BasicInfo
        key="basic-info"
        setCurrentStep={setCurrentStep}
        data={formData[0]}
        index={0}
        updateField={updateField}
        formData={formData}
        streetAddress={streetAddress}
        searchTerm={searchTerm}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        handleInputChange={handleInputChange}
        handleProvinceSelect={handleProvinceSelect}
        handleDistrictSelect={handleDistrictSelect}
        handleSubdistrictSelect={handleSubdistrictSelect}
        handleSubdistrictClear={handleSubdistrictClear}
        handleAddressChange={handleAddressChange}
        filteredProvinces={filteredProvinces}
        filteredDistrictOptions={filteredDistrictOptions}
        filteredSubdistrictOptions={filteredSubdistrictOptions}
        selectedProvince={selectedProvince}
        selectedDistrict={selectedDistrict}
        selectedSubdistrict={selectedSubdistrict}
      />,
      <PropertyInfo
        key="property-info"
        setCurrentStep={setCurrentStep}
        data={formData[1]}
        index={1}
        updateField={updateField}
        formData={formData}
      />,
      <FeatureAndAmenities
        key="feature-amenities"
        setCurrentStep={setCurrentStep}
        data={formData[2]}
        index={2}
        updateField={updateField}
        formData={formData}
      />,
      <PhotosAndDetails
        key="photos-details"
        setCurrentStep={setCurrentStep}
        data={formData[3]}
        index={3}
        updateField={updateField}
        formData={formData}
      />,
      <Pricing
        key="pricing"
        setCurrentStep={setCurrentStep}
        data={formData[4]}
        index={4}
        updateField={updateField}
        formData={formData}
      />,
    ],
    [
      formData,
      setCurrentStep,
      streetAddress,
      searchTerm,
      showSuggestions,
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
    ]
  );

  return (
    //     <div className="shadow-custom rounded-[10px] bg-white px-5 py-[30px] md:px-10">
    //       <h2 className="text-textPrimary text-center text-xl font-semibold md:text-[22px]">Add Property</h2>
    //       <div className="mx-auto mt-4 flex max-w-[900px] flex-wrap items-center justify-between gap-4 md:mt-5 md:gap-8">
    //         {steps.map((step, index) => (
    //           <Step
    //             key={step}
    //             step={step}
    //             index={index}
    //             currentStep={currentStep}
    //             setCurrentStep={setCurrentStep}
    //             stepsLength={steps.length}
    //           />
    //         ))}
    //       </div>
    //       <div className="mt-4 md:mt-6 2xl:mt-8">{stepComponents[currentStep]}</div>
    //     </div>
    //   );
    // };
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="shadow-custom rounded-[10px] bg-white px-5 py-[30px] md:px-10"
    >
      <h2 className="text-textPrimary text-center text-xl font-semibold md:text-[22px]">Add Property</h2>

      <div className="mx-auto mt-4 flex max-w-[900px] flex-wrap items-center justify-between gap-4 md:mt-5 md:gap-8">
        {steps.map((step, index) => (
          <Step
            key={step}
            step={step}
            index={index}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            stepsLength={steps.length}
          />
        ))}
      </div>

      <div className="mt-4 md:mt-6 2xl:mt-8">{stepComponents[currentStep]}</div>

      {/* Show submit only on the last step */}
      {currentStep === steps.length - 1 && (
        <div className="mt-6 flex justify-center">
          <button type="submit" className="bg-primary hover:bg-primaryDark rounded-lg px-6 py-2 text-white transition">
            Submit Property
          </button>
        </div>
      )}
    </form>
  );
};
export default AddProperty;
