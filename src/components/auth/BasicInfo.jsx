import Dropdown from '@/components/shared/small/Dropdown';
import Input from '@/components/shared/small/Input';
import Image from 'next/image';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import Button from '../shared/small/Button';

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
  const [image, setImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const fileInputRef = useRef(null);

  // Memoize handlers to prevent unnecessary re-renders
  const handleNext = useCallback(() => {
    setCurrentStep(prevStep => prevStep + 1);
  }, [setCurrentStep]);

  const handleSendCode = useCallback(() => {
    setCodeSent(true);
  }, []);

  const handleVerifyCode = useCallback(() => {
    // Add verification logic here
    console.log('Verifying code');
  }, []);

  const handleImageUpload = useCallback(e => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
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

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleButtonClick = useCallback(
    event => {
      event.stopPropagation();
      handleClick();
    },
    [handleClick]
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

  return (
    <div>
      <h4 className="text-textColor text-center text-base font-medium md:text-lg">
        Basic Information
      </h4>
      <form className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Input label="First Name" shadow />
        </div>
        <div className="lg:col-span-6">
          <Input label="Last Name" shadow />
        </div>
        <div className="lg:col-span-6">
          <div className="grid grid-cols-12 gap-2">
            {!codeSent ? (
              <>
                <div className="col-span-9">
                  <Input label="Email Address" shadow />
                </div>
                <div className="col-span-3 flex items-end">
                  <Button text={'send Code'} onClick={handleSendCode} />
                </div>
              </>
            ) : (
              <>
                <div className="col-span-9">
                  <Input label="OTP" shadow />
                </div>
                <div className="col-span-3 flex items-end">
                  <Button text={'verify'} onClick={handleVerifyCode} />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="lg:col-span-6">
          <Input label="Phone Number" shadow />
        </div>

        <div className="lg:col-span-6">
          <Dropdown label="Experience Level" options={subDistrictOptions} shadow />
        </div>
        <div className="lg:col-span-6">
          <Dropdown label="Service Type" options={subDistrictOptions} shadow />
        </div>

        <div className="lg:col-span-12">
          <div
            className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-blue-500"
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <AiOutlineCloudUpload className="text-primary h-10 w-10" />
            <p className="mt-2 text-xs text-[#32343C]">
              Click here to upload your ownership documents
            </p>
            <p className="mt-2 text-sm text-[#32343C]">
              (Condo Title Deed, House Book, Land Title, Etc.)
            </p>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
            />

            <button
              type="button"
              onClick={handleButtonClick}
              className="bg-primary mt-3 cursor-pointer rounded-lg px-4 py-2 text-white hover:bg-blue-600"
            >
              Browse
            </button>

            {image && (
              <div className="relative mt-3 h-40 w-40">
                <Image
                  src={image}
                  alt="Uploaded"
                  fill
                  className="rounded-lg object-cover"
                  priority
                />
              </div>
            )}
          </div>
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
