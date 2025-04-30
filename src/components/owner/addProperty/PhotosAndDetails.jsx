'use client';
import Input from '@/components/shared/small/Input';
import Textarea from '@/components/shared/small/Textarea';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineCloudUpload } from 'react-icons/ai';

const PhotosAndDetails = ({ setCurrentStep }) => {
  const handleNext = () => setCurrentStep(prevStep => prevStep + 1);
  const handlePrevious = () => setCurrentStep(prevStep => prevStep - 1);

  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);

  const handleFiles = useCallback(fileList => {
    const filesArray = Array.from(fileList);
    const newUrls = filesArray.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newUrls]);
  }, []);

  const handleImageUpload = event => {
    handleFiles(event.target.files);
  };

  const handleDrop = event => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = index => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h4 className="text-textColor text-center text-base font-medium md:text-lg">
        Photos & Details
      </h4>
      <form className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <Input label="Property Title" shadow />
        </div>
        {/* <div className="lg:col-span-12">
          <Input label="Project Name" shadow />
        </div> */}
        <div className="lg:col-span-12">
          <Textarea
            label="Description"
            placeholder="Enter a description for the image..."
            shadow={true}
          />
        </div>
        <div className="grid grid-cols-12 gap-4 lg:col-span-12">
          <div
            className="col-span-6 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-blue-500"
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <AiOutlineCloudUpload className="text-primary h-10 w-10" />
            <p className="mt-2 text-xs text-[#32343C]">
              Click or drag here to upload ownership documents
            </p>
            <p className="mt-2 text-sm text-[#32343C]">
              (Condo Title Deed, House Book, Land Title, Etc.)
            </p>

            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                handleClick();
              }}
              className="bg-primary mt-3 cursor-pointer rounded-lg px-4 py-2 text-white hover:bg-blue-600"
            >
              Browse
            </button>
          </div>

          <div className="col-span-6">
            {images.length > 0 ? (
              <div className="flex h-full w-full flex-wrap items-center justify-center gap-2 rounded-lg border-2 border-dashed">
                {images.map((src, idx) => (
                  <div key={idx} className="relative h-20 w-20 overflow-hidden rounded-md">
                    <Image src={src} alt={`upload-${idx}`} layout="fill" objectFit="cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-0 right-0 rounded-full bg-white p-1"
                    >
                      <AiOutlineClose size={12} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4">
                <AiOutlineCloudUpload className="text-primary h-10 w-10" />
                <p className="mt-2 text-xs text-[#32343C]">No image uploaded yet</p>
              </div>
            )}
          </div>
        </div>

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
      </form>
    </div>
  );
};

export default PhotosAndDetails;
