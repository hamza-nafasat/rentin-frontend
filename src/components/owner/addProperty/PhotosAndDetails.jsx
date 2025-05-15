import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Input from '@/components/shared/small/Input';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { AiOutlineCloudUpload, AiOutlineClose } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';

const ImageCarousel = ({ images = [] }) => {
  const key = `swiper-${images.length}`;

  if (!images.length) {
    return (
      <div className="flex h-80 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4">
        <p className="text-gray-500">No images to display</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Swiper
        key={key}
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        spaceBetween={10}
        loop
        navigation={{ nextEl: '.swiper-next', prevEl: '.swiper-prev' }}
        pagination={{ clickable: true }}
        onSwiper={swiper => {
          swiper.params.navigation.nextEl = '.swiper-next';
          swiper.params.navigation.prevEl = '.swiper-prev';
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={src}
              width={700}
              height={380}
              alt={`Slide ${idx + 1}`}
              className="h-[380px] w-full rounded-lg object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="swiper-prev absolute top-1/2 left-3 z-50 -translate-y-1/2 rounded-full bg-white p-2 shadow">
        <IoIosArrowBack className="text-xl text-gray-700" />
      </button>
      <button className="swiper-next absolute top-1/2 right-3 z-50 -translate-y-1/2 rounded-full bg-white p-2 shadow">
        <IoIosArrowBack className="rotate-180 text-xl text-gray-700" />
      </button>
    </div>
  );
};

const PhotosAndDetails = ({ setCurrentStep }) => {
  const [propertyImages, setPropertyImages] = useState([]);
  const [floorImages, setFloorImages] = useState([]);
  const [hasFloorPlan, setHasFloorPlan] = useState(false);

  const propInputRef = useRef(null);
  const floorInputRef = useRef(null);

  const handleNext = () => setCurrentStep(prev => prev + 1);
  const handlePrevious = () => setCurrentStep(prev => prev - 1);

  const addImages = (files, setter) => {
    const urls = Array.from(files).map(file => URL.createObjectURL(file));
    setter(prev => [...prev, ...urls]);
  };

  const onPropFiles = e => addImages(e.target.files, setPropertyImages);
  const onPropDrop = e => {
    e.preventDefault();
    addImages(e.dataTransfer.files, setPropertyImages);
  };
  const onPropClick = () => propInputRef.current.click();
  const removeProp = i => setPropertyImages(prev => prev.filter((_, idx) => idx !== i));

  const onFloorFiles = e => addImages(e.target.files, setFloorImages);
  const onFloorDrop = e => {
    e.preventDefault();
    addImages(e.dataTransfer.files, setFloorImages);
  };
  const onFloorClick = () => floorInputRef.current.click();
  const removeFloor = i => setFloorImages(prev => prev.filter((_, idx) => idx !== i));

  return (
    <div>
      <h4 className="text-textColor text-center text-base font-medium md:text-lg">Photos & Details</h4>
      <form className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Title */}
        <div className="lg:col-span-12">
          <Input label="Property Title" shadow />
        </div>

        {/* Property Images Uploader */}
        <div className="lg:col-span-12">
          <label className="text-base font-medium">Property Images</label>
          <div
            className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-blue-500"
            onDragOver={e => e.preventDefault()}
            onDrop={onPropDrop}
            onClick={onPropClick}
          >
            <AiOutlineCloudUpload className="text-primary h-10 w-10" />
            <p className="mt-2 text-xs text-[#0245a5]">Click or drag to upload</p>
            <input type="file" accept="image/*" multiple className="hidden" ref={propInputRef} onChange={onPropFiles} />
          </div>

          {/* Thumbnails */}
          {propertyImages.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {propertyImages.map((src, idx) => (
                <div key={idx} className="relative h-20 w-20 overflow-hidden rounded-md">
                  <Image src={src} alt="" layout="fill" objectFit="cover" />
                  <button
                    type="button"
                    onClick={() => removeProp(idx)}
                    className="absolute top-1 right-1 rounded-full bg-white p-1"
                  >
                    <AiOutlineClose size={12} />
                  </button>
                </div>
              ))}
              {/* Carousel */}
              <div className="mt-4 w-full">
                <ImageCarousel images={propertyImages} />
              </div>
            </div>
          )}
        </div>

        {/* Floor plan checkbox */}
        <div className="flex items-center lg:col-span-12">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={hasFloorPlan}
              onChange={e => setHasFloorPlan(e.target.checked)}
              className="h-5 w-5 text-blue-600"
            />
            <span className="text-base font-medium">Do you have a floor plan?</span>
          </label>
        </div>

        {/* Floor Plan Uploader */}
        {hasFloorPlan && (
          <div className="lg:col-span-12">
            <label className="text-base font-medium">Floor Plan Images</label>
            <div
              className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-blue-500"
              onDragOver={e => e.preventDefault()}
              onDrop={onFloorDrop}
              onClick={onFloorClick}
            >
              <AiOutlineCloudUpload className="text-primary h-10 w-10" />
              <p className="mt-2 text-xs text-[#0245a5]">Click or drag to upload</p>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                ref={floorInputRef}
                onChange={onFloorFiles}
              />
            </div>

            {floorImages.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {floorImages.map((src, idx) => (
                  <div key={idx} className="relative h-20 w-20 overflow-hidden rounded-md">
                    <Image src={src} alt="" layout="fill" objectFit="cover" />
                    <button
                      type="button"
                      onClick={() => removeFloor(idx)}
                      className="absolute top-1 right-1 rounded-full bg-white p-1"
                    >
                      <AiOutlineClose size={12} />
                    </button>
                  </div>
                ))}
                {/* Carousel */}
                <div className="mt-4 w-full">
                  <ImageCarousel images={floorImages} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-end gap-4 lg:col-span-12">
          <button type="button" onClick={handlePrevious} className="rounded bg-gray-400 px-5 py-2 text-white">
            Previous
          </button>
          <button type="button" onClick={handleNext} className="bg-primary rounded px-5 py-2 text-white">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhotosAndDetails;
