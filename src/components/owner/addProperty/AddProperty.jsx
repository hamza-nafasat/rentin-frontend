'use client';
import BasicInfo from '@/components/owner/addProperty/BasicInfo';
import FeatureAndAmenities from '@/components/owner/addProperty/FeatureAndAmenities';
import PhotosAndDetails from '@/components/owner/addProperty/PhotosAndDetails';
import Pricing from '@/components/owner/addProperty/Pricing';
import PropertyInfo from '@/components/owner/addProperty/PropertyInfo';
import { useState, useMemo } from 'react';
import Step from './Step';

const AddProperty = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = useMemo(
    () => ['Basic Info', 'Property Info', 'Feature & Amenities', 'Photos & Details', 'Pricing'],
    []
  );

  const stepComponents = useMemo(
    () => [
      <BasicInfo key="basic-info" setCurrentStep={setCurrentStep} />,
      <PropertyInfo key="property-info" setCurrentStep={setCurrentStep} />,
      <FeatureAndAmenities key="feature-amenities" setCurrentStep={setCurrentStep} />,
      <PhotosAndDetails key="photos-details" setCurrentStep={setCurrentStep} />,
      <Pricing key="pricing" setCurrentStep={setCurrentStep} />,
    ],
    [setCurrentStep]
  );

  return (
    <div className="shadow-custom rounded-[10px] bg-white px-5 py-[30px] md:px-10">
      <h2 className="text-textColor text-center text-xl font-semibold md:text-[22px]">
        Add Property
      </h2>
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
