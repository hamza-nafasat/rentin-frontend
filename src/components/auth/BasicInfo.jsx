import Dropdown from '@/components/shared/small/Dropdown';
import Input from '@/components/shared/small/Input';
import Image from 'next/image';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import Button from '../shared/small/Button';

const experienceLevel = [
  { option: '1 year', value: '1' },
  { option: '3 year', value: '3' },
  { option: '4 year', value: '4' },
  { option: '5 year', value: '5' },
  { option: '2 year', value: '2' },
];

const serviceType = [
  { option: 'Agent', value: 'agent' },
  { option: 'Inspection', value: 'inspection' },
  { option: 'Both', value: 'both' },
];

const BasicInfo = memo(({ data, index, updateField, setCurrentStep, formData }) => {
  // const [streetAddress, setStreetAddress] = useState('thailand');
  const [image, setImage] = useState(null);
  // const [selectedOption, setSelectedOption] = useState(null);
  // const [inputValue, setInputValue] = useState('');
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
      <h4 className="text-textPrimary text-center text-base font-medium md:text-lg">Basic Information</h4>
      <form className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Input
            value={data.unitNum}
            onChange={e => updateField(index, 'unitNum', e.target.value)}
            shadow
            placeholder="i. e A302"
            label="Unit Number (optional)"
          />
        </div>
        <div className="lg:col-span-6">
          <Input shadow label="User Name" />
        </div>
        <div className="lg:col-span-6">
          <div className="grid grid-cols-12 items-end gap-2">
            {!codeSent ? (
              <>
                <div className="col-span-9">
                  <Input shadow label="Email Address" />
                </div>
                <div className="col-span-3 flex justify-end">
                  <Button cn="!h-[55px] !w-full" text={'send Code'} onClick={handleSendCode} />
                </div>
              </>
            ) : (
              <>
                <div className="col-span-10">
                  <Input shadow label="OTP" />
                </div>
                <div className="col-span-2 flex justify-end">
                  <Button cn="!h-[55px] !w-full" text={'verify'} onClick={handleVerifyCode} />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="lg:col-span-6">
          <Input shadow label="Phone Number" />
        </div>

        <div className="lg:col-span-6">
          <Dropdown label="Experience Level" options={experienceLevel} shadow />
        </div>
        <div className="lg:col-span-6">
          <Dropdown label="Service Type" options={serviceType} shadow />
        </div>

        <div className="lg:col-span-12">
          <div
            className="flex w-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-blue-500"
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            // onClick={handleClick}
          >
            <AiOutlineCloudUpload className="text-primary h-10 w-10" />
            <p className="mt-2 text-xs text-[#0245a5]">Upload License/Certification</p>
            <div className="flex gap-2">
              <input type="checkbox" id="license" />
              <label className="text-textSecondary text-[10px]" htmlFor="license">
                I don't have a license yet
              </label>
            </div>

            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />

            <button
              type="button"
              onClick={handleButtonClick}
              className="bg-primary mt-3 cursor-pointer rounded-lg px-4 py-2 text-white hover:bg-blue-600"
            >
              Browse
            </button>

            {image && (
              <div className="relative mt-3 h-40 w-40">
                <Image src={image} alt="Uploaded" fill className="rounded-lg object-cover" priority />
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
