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
import { selectCoordinates } from '@/features/location/locationSlice';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AddProperty = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const coordinates = useSelector(selectCoordinates);
  const steps = useMemo(() => ['Basic Info', 'Property Info', 'Feature & Amenities', 'Photos ', 'Pricing'], []);
  const router = useRouter();
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
    { visitRequestPrice: '', propertyPrice: '', oneMonth: '', oneMonthDeposit: '', deals: [] },
  ]);

  // Add new state for BasicInfo component
  const [streetAddress, setStreetAddress] = useState('');
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

  const extractCoordinates = useCallback(coordinatesData => {
    if (!coordinatesData) return { latitude: null, longitude: null };

    // If coordinates is an object with lat/lng properties
    if (coordinatesData.latitude !== undefined && coordinatesData.longitude !== undefined) {
      return {
        latitude: coordinatesData.latitude,
        longitude: coordinatesData.longitude,
      };
    }

    // If coordinates is an object with latitude/longitude properties
    if (coordinatesData.latitude !== undefined && coordinatesData.longitude !== undefined) {
      return {
        latitude: coordinatesData.latitude,
        longitude: coordinatesData.longitude,
      };
    }

    // If coordinates is a string like "lat,lng"
    if (typeof coordinatesData === 'string' && coordinatesData.includes(',')) {
      const [latitude, longitude] = coordinatesData.split(',').map(coord => parseFloat(coord.trim()));
      return { latitude, longitude };
    }

    // If coordinates is an array [lat, lng]
    if (Array.isArray(coordinatesData) && coordinatesData.length >= 2) {
      return {
        latitude: parseFloat(coordinatesData[0]),
        longitude: parseFloat(coordinatesData[1]),
      };
    }

    return { lat: null, lng: null };
  }, []);
  console.log('jmssksksk', coordinates);
  console.log('formData', formData);
  console.log('streetAddress', streetAddress);
  // useEffect(() => {
  //   const { road, province, district, subdistrict, postalCode, country } = formData[0];

  //   if (road && province && district && subdistrict && postalCode && country) {
  //     const formattedAddress = `${road}, ${province} Province, ${district} District, ${subdistrict} Subdistrict, ${postalCode}, ${country}`;
  //     console.log('newewe', formattedAddress);

  //     setStreetAddress(formattedAddress);
  //   } else {
  //     console.log('nelsewewe');
  //     setStreetAddress('');
  //   }
  // }, [
  //   formData[0].road,
  //   formData[0].province,
  //   formData[0].district,
  //   formData[0].subDistrict,
  //   formData[0].postalCode,
  //   formData[0].country,
  // ]);

  useEffect(() => {
    const { road, province, district, subdistrict, postalCode, country } = formData[0];

    if (road && province && district && subdistrict && postalCode && country) {
      const formattedAddress = `${road}, ${province} Province, ${district} District, ${subdistrict} Subdistrict, ${postalCode}, ${country}`;
      console.log('Formatted street address:', formattedAddress);
      setStreetAddress(formattedAddress);
    } else {
      setStreetAddress('');
    }
  }, [
    formData[0].road,
    formData[0].province,
    formData[0].district,
    formData[0].subDistrict,
    formData[0].postalCode,
    formData[0].country,
  ]);
  // Memoize updateField to ensure it's stable
  const updateField = useCallback((index, field, value) => {
    setFormData(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  }, []);

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

  const handleProvinceSelect = useCallback(
    option => {
      setSelectedProvince(option.value);
      setSearchTerm(prev => ({ ...prev, province: option.label }));
      updateField(0, 'province', option.label);
      setShowSuggestions(prev => ({ ...prev, province: false }));
    },
    [updateField]
  );

  const handleDistrictSelect = useCallback(
    option => {
      setSelectedDistrict(option.value);
      setSearchTerm(prev => ({ ...prev, district: option.label }));
      updateField(0, 'district', option.label);
      updateField(0, 'postalCode', option.postalCode);
      setShowSuggestions(prev => ({ ...prev, district: false }));
    },
    [updateField]
  );

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

  const validateBasicInfo = () => {
    const basicInfo = formData[0];
    if (!basicInfo.propertyType) {
      toast.error('Please select property type');
      return false;
    }
    if (!basicInfo.projectName) {
      toast.error('Please enter project name');
      return false;
    }
    if (
      !basicInfo.road ||
      !basicInfo.province ||
      !basicInfo.district ||
      !basicInfo.subdistrict ||
      !basicInfo.postalCode
    ) {
      toast.error('Please fill in all address fields');
      return false;
    }
    if (!basicInfo.propertyStatus) {
      toast.error('Please select property status');
      return false;
    }
    return true;
  };

  const validatePropertyInfo = () => {
    const propertyInfo = formData[1];
    if (!propertyInfo.propertyTitle) {
      toast.error('Please enter property title');
      return false;
    }
    if (!propertyInfo.PropertyDescription) {
      toast.error('Please enter property description');
      return false;
    }
    if (!propertyInfo.area) {
      toast.error('Please enter property area');
      return false;
    }
    if (!propertyInfo.unitNum) {
      toast.error('Please enter unit number');
      return false;
    }
    if (!propertyInfo.PropertyCondition) {
      toast.error('Please select property condition');
      return false;
    }
    return true;
  };

  const validateFeaturesAndAmenities = () => {
    const features = formData[2];
    if (!features.propertyFeature || features.propertyFeature.length === 0) {
      toast.error('Please select at least one property feature');
      return false;
    }
    if (!features.amenities || features.amenities.length === 0) {
      toast.error('Please select at least one amenity');
      return false;
    }
    return true;
  };

  const validatePhotos = () => {
    const photos = formData[3];
    if (!photos.propertyImage || photos.propertyImage.length < 5) {
      toast.error('Please upload at least 5 property images');
      return false;
    }
    if (!photos.VerifyPropertyImage || photos.VerifyPropertyImage.length === 0) {
      toast.error('Please upload ownership document');
      return false;
    }
    return true;
  };

  const validatePricing = () => {
    const pricing = formData[4];
    if (!pricing.oneMonth) {
      toast.error('Please enter monthly rate');
      return false;
    }
    if (!pricing.oneMonthDeposit) {
      toast.error('Please enter security deposit');
      return false;
    }
    return true;
  };

  // Fixed handleSubmit function - no longer needs event parameter
  const handleSubmit = async () => {
    try {
      // Validate all sections before submitting
      if (!validateBasicInfo()) {
        setCurrentStep(0);
        return;
      }
      if (!validatePropertyInfo()) {
        setCurrentStep(1);
        return;
      }
      if (!validateFeaturesAndAmenities()) {
        setCurrentStep(2);
        return;
      }
      if (!validatePhotos()) {
        setCurrentStep(3);
        return;
      }
      if (!validatePricing()) {
        setCurrentStep(4);
        return;
      }
      // Extract data from formData array
      const basicInfo = formData[0];
      const propertyInfo = formData[1];
      const features = formData[2];
      const photos = formData[3];
      const pricing = formData[4];

      if (!photos.propertyImage || photos.propertyImage.length < 5) {
        alert('Please upload at least 5 property images');
        return;
      }
      if (!photos.VerifyPropertyImage || photos.VerifyPropertyImage.length === 0) {
        alert('Please upload ownership document');
        return;
      }
      const fullAddress =
        `${basicInfo.road || ''}, ${basicInfo.subDistrict || ''}, ${basicInfo.district || ''}, ${basicInfo.province || ''} ${basicInfo.postalCode || ''}, ${basicInfo.country || ''}`
          .replace(/,\s*,/g, ',')
          .replace(/^,\s*|,\s*$/g, '');

      const { latitude, longitude } = extractCoordinates(coordinates);
      const formDataToSend = new FormData();

      // Append basic info
      formDataToSend.append('projectName', basicInfo.projectName);
      formDataToSend.append('propertyType', basicInfo.propertyType);
      formDataToSend.append('address', fullAddress);

      formDataToSend.append('propertyStatus', basicInfo.propertyStatus);
      // formDataToSend.append('country', basicInfo.country);

      // Append property info
      formDataToSend.append('propertyTitle', propertyInfo.propertyTitle);
      formDataToSend.append('description', propertyInfo.PropertyDescription);
      formDataToSend.append('bedRooms', propertyInfo.bedRoom);
      formDataToSend.append('bathRooms', propertyInfo.bathRoom);
      formDataToSend.append('unitArea', propertyInfo.area);
      formDataToSend.append('unitNumber', propertyInfo.unitNum);
      formDataToSend.append('condition', propertyInfo.PropertyCondition);
      formDataToSend.append('buildingHeight', propertyInfo.buildingHeight);
      formDataToSend.append('floor', propertyInfo.floor);
      formDataToSend.append('building', propertyInfo.building);

      // Append features and amenities

      const appendArrayToFormData = (formData, fieldName, array) => {
        if (array && Array.isArray(array) && array.length > 0) {
          array.forEach((item, index) => {
            if (item !== null && item !== undefined && item !== '') {
              formData.append(`${fieldName}[${index}]`, item);
            }
          });
        }
      };

      appendArrayToFormData(formDataToSend, 'propertyFeatures', features.propertyFeature);
      appendArrayToFormData(formDataToSend, 'amenities', features.amenities);
      appendArrayToFormData(formDataToSend, 'rentalFeatures', features.rentalFeature);
      appendArrayToFormData(formDataToSend, 'viewFromTheProperty', features.propertyView);
      appendArrayToFormData(formDataToSend, 'security', features.security);

      // Append pricing
      formDataToSend.append('contractRate[rate]', pricing.oneMonth);
      formDataToSend.append('contractRate[securityDeposit]', pricing.oneMonthDeposit);
      const cleanedDeals = pricing.deals.map(deal => ({
        rent: Number(deal.rentPrice),
        duration: deal.month,
        secrityDeposit: Number(deal.securityDeposit),
      }));

      formDataToSend.append('deals', JSON.stringify(cleanedDeals));

      if (latitude !== null && longitude !== null) {
        formDataToSend.append('latitude', latitude.toString());
        formDataToSend.append('longitude', longitude.toString());
        //console.log('Adding coordinates to FormData - Lat:', lat, 'Lng:', lng);
      } else {
        console.warn('No valid coordinates found to send to backend');
      }

      if (coordinates && coordinates.latitude && coordinates.longitude) {
        formDataToSend.append('latitude', coordinates.latitude);
        formDataToSend.append('longitude', coordinates.longitude);
      }

      // Append images
      // if (photos.propertyImage && photos.propertyImage.length > 0) {
      //   photos.propertyImage.forEach(image => {
      //     formDataToSend.append('images', image);
      //   });
      // }
      if (photos.propertyImage && photos.propertyImage.length > 0) {
        photos.propertyImage.forEach(image => {
          // If image is a File object, append it directly
          // If it's a URL string (from existing data), skip it for now
          if (image instanceof File) {
            formDataToSend.append('images', image);
          }
        });
      }

      // if (photos.VerifyPropertyImage && photos.VerifyPropertyImage.length > 0) {
      //   photos.VerifyPropertyImage.forEach(image => {
      //     formDataToSend.append('ownershipDocument', image);
      //   });
      // }

      // if (photos.floorPlanImage && photos.floorPlanImage.length > 0) {
      //   photos.floorPlanImage.forEach(image => {
      //     formDataToSend.append('bluePrint', image);
      //   });

      // }

      if (photos.VerifyPropertyImage && photos.VerifyPropertyImage.length > 0) {
        photos.VerifyPropertyImage.forEach(image => {
          if (image instanceof File) {
            formDataToSend.append('ownershipDocument', image);
          }
        });
      }

      // Append floor plan images (multiple files) - only if they exist
      if (photos.floorPlanImage && photos.floorPlanImage.length > 0) {
        photos.floorPlanImage.forEach(image => {
          if (image instanceof File) {
            formDataToSend.append('bluePrint', image);
          }
        });
      }

      //     // Call the API
      //     await createProperty(formDataToSend).unwrap();

      //     console.log('Property created successfully!');
      //   } catch (err) {
      //     console.error('Error creating property:', err);
      //   }
      // };
      console.log('FormData contents:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
      const loadingToast = toast.loading('Creating property...');

      // Call the API
      const result = await createProperty(formDataToSend).unwrap();

      console.log('Property created successfully!', result);
      //alert('Property created successfully!');
      toast.dismiss(loadingToast);
      toast.success('Property created successfully!');
      console.log('Property created successfully!', result);
      router.push('/owner/properties');
      // Reset form or redirect as needed
      // You might want to redirect to property list or reset the form
    } catch (err) {
      console.error('Error creating property:', err);
      //alert('Error creating property: ' + (err.data?.message || err.message || 'Unknown error'));
    }
  };

  // Filter provinces based on search
  const provinceOptions = useMemo(
    () =>
      provincesData.map(province => ({
        label: `${province.provinceNameEn}`,
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
        onSubmit={handleSubmit} // Pass the submit handler to Pricing component
        isLoading={isLoading}
      />,
    ],
    [
      formData,
      updateField,
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
      handleSubmit,
      isLoading,
    ]
  );

  return (
    <div className="shadow-custom rounded-[10px] bg-white px-5 py-[30px] md:px-10">
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
    </div>
  );
};

export default AddProperty;
