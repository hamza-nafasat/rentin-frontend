// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// import { useState, useRef } from 'react';
// import styles from './PropertyInfo.module.css';
// import Image from 'next/image';
// import Input from '@/components/shared/small/Input';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';
// import { AiOutlineCloudUpload, AiOutlineClose } from 'react-icons/ai';
// import { IoIosArrowBack } from 'react-icons/io';

// const ImageCarousel = ({ images = [] }) => {
//   const key = `swiper-${images.length}`;

//   if (!images.length) {
//     return (
//       <div className="flex h-80 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4">
//         <p className="text-gray-500">No images to display</p>
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full">
//       <Swiper
//         key={key}
//         modules={[Navigation, Pagination]}
//         slidesPerView={1}
//         spaceBetween={10}
//         loop
//         navigation={{ nextEl: '.swiper-next', prevEl: '.swiper-prev' }}
//         pagination={{ clickable: true }}
//         onSwiper={swiper => {
//           swiper.params.navigation.nextEl = '.swiper-next';
//           swiper.params.navigation.prevEl = '.swiper-prev';
//           swiper.navigation.init();
//           swiper.navigation.update();
//         }}
//       >
//         {images.map((src, idx) => (
//           <SwiperSlide key={idx}>
//             <Image
//               src={src}
//               width={700}
//               height={380}
//               alt={`Slide ${idx + 1}`}
//               className="h-[380px] w-full rounded-lg object-contain"
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <button className="swiper-prev bg-primary absolute top-1/2 left-3 z-50 -translate-y-1/2 cursor-pointer rounded-full p-2 shadow">
//         <IoIosArrowBack className="text-xl text-white" />
//       </button>
//       <button className="swiper-next bg-primary absolute top-1/2 right-3 z-50 -translate-y-1/2 cursor-pointer rounded-full p-2 shadow">
//         <IoIosArrowBack className="rotate-180 text-xl text-white" />
//       </button>
//     </div>
//   );
// };

// const PhotosAndDetails = ({ setCurrentStep }) => {
//   const [propertyImages, setPropertyImages] = useState([]);
//   const [floorImages, setFloorImages] = useState([]);
//   const [hasFloorPlan, setHasFloorPlan] = useState(false);
//   const [radioInput, setInputRadio] = useState('');
//   console.log('propertyImages', propertyImages);

//   const propInputRef = useRef(null);
//   const floorInputRef = useRef(null);

//   const handleNext = () => setCurrentStep(prev => prev + 1);
//   const handlePrevious = () => setCurrentStep(prev => prev - 1);

//   const addImages = (files, setter) => {
//     const urls = Array.from(files).map(file => URL.createObjectURL(file));
//     setter(prev => [...prev, ...urls]);
//   };

//   const onPropFiles = e => addImages(e.target.files, setPropertyImages);
//   const onPropDrop = e => {
//     e.preventDefault();
//     addImages(e.dataTransfer.files, setPropertyImages);
//   };
//   const onPropClick = () => propInputRef.current.click();
//   const removeProp = i => setPropertyImages(prev => prev.filter((_, idx) => idx !== i));

//   const onFloorFiles = e => addImages(e.target.files, setFloorImages);
//   const onFloorDrop = e => {
//     e.preventDefault();
//     addImages(e.dataTransfer.files, setFloorImages);
//   };
//   const onFloorClick = () => floorInputRef.current.click();
//   const removeFloor = i => setFloorImages(prev => prev.filter((_, idx) => idx !== i));

//   return (
//     <div>
//       <h4 className="text-textPrimary text-center text-base font-medium md:text-lg">Photos & Details</h4>
//       <form className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
//         {/* Property Images Uploader */}
//         <div className="lg:col-span-12">
//           <label className="text-base font-medium">Property Images</label>
//           <div
//             className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-blue-500"
//             onDragOver={e => e.preventDefault()}
//             onDrop={onPropDrop}
//             onClick={onPropClick}
//           >
//             <AiOutlineCloudUpload className="text-primary h-10 w-10" />
//             <p className="mt-2 text-xs text-[#0245a5]">Click or drag to upload</p>
//             <input type="file" accept="image/*" multiple className="hidden" ref={propInputRef} onChange={onPropFiles} />
//           </div>

//           {/* Thumbnails */}
//           {propertyImages.length > 0 && (
//             <div className="mt-3 flex flex-wrap gap-2">
//               {propertyImages.map((src, idx) => (
//                 <div key={idx} className="relative h-20 w-20 overflow-hidden rounded-lg">
//                   <Image src={src} alt="" layout="fill" objectFit="cover" />
//                   <button
//                     type="button"
//                     onClick={() => removeProp(idx)}
//                     className="absolute top-1 right-1 rounded-full bg-white p-1"
//                   >
//                     <AiOutlineClose size={12} />
//                   </button>
//                 </div>
//               ))}
//               {/* Carousel */}
//               <div className="mt-4 w-full">
//                 <ImageCarousel images={propertyImages} />
//               </div>
//             </div>
//           )}
//         </div>

//         {/*radio buttons */}

//         <div className="flex flex-col gap-3 lg:col-span-12">
//           <h2 className="text-base font-semibold">Verify property ownership / Property ownership verification</h2>
//           <div className="flex flex-col gap-6 sm:flex-row">
//             <div className="flex items-center">
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   value="radio1"
//                   checked={radioInput === 'radio1'}
//                   onChange={e => {
//                     setInputRadio(e.target.value);
//                   }}
//                   name="radio"
//                 />
//                 <span className="text-base font-medium">Land Title Deed</span>
//               </label>
//             </div>
//             <div className="flex items-center">
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   value="radio2"
//                   checked={radioInput === 'radio2'}
//                   onChange={e => {
//                     setInputRadio(e.target.value);
//                   }}
//                   name="radio"
//                 />
//                 <span className="text-base font-medium">Purchase Contract</span>
//               </label>
//             </div>
//             <div className="flex items-center">
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   value="radio3"
//                   checked={radioInput === 'radio3'}
//                   onChange={e => {
//                     setInputRadio(e.target.value);
//                   }}
//                   name="radio"
//                 />
//                 <span className="text-base font-medium">Utility bill or receipt (water/electricity)</span>
//               </label>
//             </div>
//           </div>
//         </div>

//         {/*radio buttons uploader*/}
//         {radioInput !== '' && (
//           <div className="lg:col-span-12">
//             <label className="text-base font-semibold">{`${radioInput === 'radio1' ? `Land Title Deed` : `${radioInput === 'radio2' ? `Purchase Contract` : `${radioInput === 'radio3' ? `Utility bill or receipt (water/electricity)` : ``}`}`}`}</label>
//             <div
//               className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-blue-500"
//               onDragOver={e => e.preventDefault()}
//               onDrop={onFloorDrop}
//               onClick={onFloorClick}
//             >
//               <AiOutlineCloudUpload className="text-primary h-10 w-10" />
//               <p className="mt-2 text-xs text-[#0245a5]">Click or drag to upload</p>
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 className="hidden"
//                 ref={floorInputRef}
//                 onChange={onFloorFiles}
//               />
//             </div>

//             {floorImages.length > 0 && (
//               <div className="mt-3 flex flex-wrap gap-2">
//                 {floorImages.map((src, idx) => (
//                   <div key={idx} className="relative h-20 w-20 overflow-hidden rounded-lg">
//                     <Image src={src} alt="" layout="fill" objectFit="cover" />
//                     <button
//                       type="button"
//                       onClick={() => removeFloor(idx)}
//                       className="absolute top-1 right-1 rounded-full bg-white p-1"
//                     >
//                       <AiOutlineClose size={12} />
//                     </button>
//                   </div>
//                 ))}
//                 {/* Carousel */}
//                 <div className="mt-4 w-full">
//                   <ImageCarousel images={floorImages} />
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Floor plan checkbox */}
//         <div className="flex items-center lg:col-span-12">
//           <label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               checked={hasFloorPlan}
//               onChange={e => setHasFloorPlan(e.target.checked)}
//               className="h-5 w-5 text-blue-600"
//             />
//             <span className="text-base font-medium">I have a floor plan?</span>
//           </label>
//         </div>

//         {/* Floor Plan Uploader */}
//         {hasFloorPlan && (
//           <div className="lg:col-span-12">
//             <label className="text-base font-semibold">Floor Plan Images</label>
//             <div
//               className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-blue-500"
//               onDragOver={e => e.preventDefault()}
//               onDrop={onFloorDrop}
//               onClick={onFloorClick}
//             >
//               <AiOutlineCloudUpload className="text-primary h-10 w-10" />
//               <p className="mt-2 text-xs text-[#0245a5]">Click or drag to upload</p>
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 className="hidden"
//                 ref={floorInputRef}
//                 onChange={onFloorFiles}
//               />
//             </div>

//             {floorImages.length > 0 && (
//               <div className="mt-3 flex flex-wrap gap-2">
//                 {floorImages.map((src, idx) => (
//                   <div key={idx} className="relative h-20 w-20 overflow-hidden rounded-lg">
//                     <Image src={src} alt="" layout="fill" objectFit="cover" />
//                     <button
//                       type="button"
//                       onClick={() => removeFloor(idx)}
//                       className="absolute top-1 right-1 rounded-full bg-white p-1"
//                     >
//                       <AiOutlineClose size={12} />
//                     </button>
//                   </div>
//                 ))}
//                 {/* Carousel */}
//                 <div className="mt-4 w-full">
//                   <ImageCarousel images={floorImages} />
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Navigation */}
//         <div className="flex justify-end gap-4 lg:col-span-12">
//           <button type="button" onClick={handlePrevious} className="rounded bg-gray-400 px-5 py-2 text-white">
//             Previous
//           </button>
//           <button type="button" onClick={handleNext} className="bg-primary rounded px-5 py-2 text-white">
//             Next
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PhotosAndDetails;

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useState, useRef, useEffect } from 'react';
import styles from './PropertyInfo.module.css';
import Image from 'next/image';
// import Input from '@/components/shared/small/Input';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { AiOutlineCloudUpload, AiOutlineClose } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import Button from '@/components/shared/small/Button';

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
              src={typeof src === 'string' ? src : URL.createObjectURL(src)}
              width={700}
              height={380}
              alt={`Slide ${idx + 1}`}
              className="h-[380px] w-full rounded-lg object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="swiper-prev bg-primary absolute top-1/2 left-3 z-50 -translate-y-1/2 cursor-pointer rounded-full p-2 shadow">
        <IoIosArrowBack className="text-xl text-white" />
      </button>
      <button className="swiper-next bg-primary absolute top-1/2 right-3 z-50 -translate-y-1/2 cursor-pointer rounded-full p-2 shadow">
        <IoIosArrowBack className="rotate-180 text-xl text-white" />
      </button>
    </div>
  );
};

const PhotosAndDetails = ({ setCurrentStep, data, index, updateField, formData }) => {
  const [radioInput, setInputRadio] = useState('');
  const [hasFloorPlan, setHasFloorPlan] = useState(false);
  const [errors, setErrors] = useState({});

  const propInputRef = useRef(null);
  const ownershipInputRef = useRef(null);
  const floorInputRef = useRef(null);

  // Get current data from formData
  const propertyImages = data.propertyImage || [];
  const ownershipImages = data.VerifyPropertyImage || [];
  const floorImages = data.floorPlanImage || [];

  console.log('PhotosAndDetails data:', data);

  useEffect(() => {
    // Set hasFloorPlan based on existing floor plan images
    if (floorImages.length > 0) {
      setHasFloorPlan(true);
    }
  }, [floorImages.length]);

  const validateForm = () => {
    const newErrors = {};

    if (propertyImages.length < 5) {
      newErrors.propertyImages = 'Please upload at least 5 property images';
    }

    if (ownershipImages.length === 0) {
      newErrors.ownershipImages = 'Please upload ownership document';
    }

    if (hasFloorPlan && floorImages.length === 0) {
      newErrors.floorImages = 'Please upload floor plan image';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => setCurrentStep(prev => prev - 1);

  // Property Images handlers
  const onPropFiles = e => {
    const files = Array.from(e.target.files);
    const updatedImages = [...propertyImages, ...files];
    updateField(index, 'propertyImage', updatedImages);

    // Clear error if now we have enough images
    if (updatedImages.length >= 5) {
      setErrors(prev => ({ ...prev, propertyImages: '' }));
    }
  };

  const onPropDrop = e => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const updatedImages = [...propertyImages, ...files];
    updateField(index, 'propertyImage', updatedImages);

    // Clear error if now we have enough images
    if (updatedImages.length >= 5) {
      setErrors(prev => ({ ...prev, propertyImages: '' }));
    }
  };

  const onPropClick = () => propInputRef.current.click();

  const removeProp = i => {
    const updatedImages = propertyImages.filter((_, idx) => idx !== i);
    updateField(index, 'propertyImage', updatedImages);
  };

  // Ownership Document handlers
  const onOwnershipFiles = e => {
    const files = Array.from(e.target.files);
    const updatedImages = [...ownershipImages, ...files];
    updateField(index, 'VerifyPropertyImage', updatedImages);

    // Clear error
    if (updatedImages.length > 0) {
      setErrors(prev => ({ ...prev, ownershipImages: '' }));
    }
  };

  const onOwnershipDrop = e => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const updatedImages = [...ownershipImages, ...files];
    updateField(index, 'VerifyPropertyImage', updatedImages);

    // Clear error
    if (updatedImages.length > 0) {
      setErrors(prev => ({ ...prev, ownershipImages: '' }));
    }
  };

  const onOwnershipClick = () => ownershipInputRef.current.click();

  const removeOwnership = i => {
    const updatedImages = ownershipImages.filter((_, idx) => idx !== i);
    updateField(index, 'VerifyPropertyImage', updatedImages);
  };

  // Floor Plan handlers
  const onFloorFiles = e => {
    const files = Array.from(e.target.files);
    const updatedImages = [...floorImages, ...files];
    updateField(index, 'floorPlanImage', updatedImages);

    // Clear error
    if (updatedImages.length > 0) {
      setErrors(prev => ({ ...prev, floorImages: '' }));
    }
  };

  const onFloorDrop = e => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const updatedImages = [...floorImages, ...files];
    updateField(index, 'floorPlanImage', updatedImages);

    // Clear error
    if (updatedImages.length > 0) {
      setErrors(prev => ({ ...prev, floorImages: '' }));
    }
  };

  const onFloorClick = () => floorInputRef.current.click();

  const removeFloor = i => {
    const updatedImages = floorImages.filter((_, idx) => idx !== i);
    updateField(index, 'floorPlanImage', updatedImages);
  };

  // Handle floor plan checkbox
  const handleFloorPlanChange = e => {
    setHasFloorPlan(!hasFloorPlan);
  };

  return (
    <div>
      <h4 className="text-textPrimary text-center text-base font-medium md:text-lg">Photos & Details</h4>
      <form className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Property Images Uploader */}
        <div className="lg:col-span-12">
          <label className="text-base font-medium">
            Property Images <span className="text-red-500">*</span>
            <span className="ml-2 text-sm text-gray-500">(Minimum 5 images required)</span>
          </label>
          <div
            className={`mt-2 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 hover:border-blue-500 ${
              errors.propertyImages ? 'border-red-300' : 'border-gray-300'
            }`}
            onDragOver={e => e.preventDefault()}
            onDrop={onPropDrop}
            onClick={onPropClick}
          >
            <AiOutlineCloudUpload className="text-primary h-10 w-10" />
            <p className="mt-2 text-xs text-[#0245a5]">Click or drag to upload</p>
            <p className="text-xs text-gray-500">Uploaded: {propertyImages.length}/5 minimum</p>
            <input type="file" accept="image/*" multiple className="hidden" ref={propInputRef} onChange={onPropFiles} />
          </div>
          {errors.propertyImages && <p className="mt-1 text-sm text-red-500">{errors.propertyImages}</p>}

          {/* Property Images Thumbnails */}
          {propertyImages.length > 0 && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {propertyImages.map((file, idx) => (
                  <div key={idx} className="relative h-20 w-20 overflow-hidden rounded-lg">
                    <Image
                      src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeProp(idx)}
                      className="absolute top-1 right-1 rounded-full bg-white p-1"
                    >
                      <AiOutlineClose size={12} />
                    </button>
                  </div>
                ))}
              </div>
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
            <Button text={'I have a floor plan?'} onClick={handleFloorPlanChange} />
            <span className="text-base font-medium"></span>
          </label>
        </div>

        {/* Floor Plan Uploader */}
        {hasFloorPlan && (
          <div className="lg:col-span-12">
            <label className="text-base font-semibold">
              Floor Plan Images <span className="text-red-500">*</span>
            </label>
            <div
              className={`mt-2 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 hover:border-blue-500 ${
                errors.floorImages ? 'border-red-300' : 'border-gray-300'
              }`}
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
            {errors.floorImages && <p className="mt-1 text-sm text-red-500">{errors.floorImages}</p>}

            {floorImages.length > 0 && (
              <div className="mt-3">
                <div className="flex flex-wrap gap-2">
                  {floorImages.map((file, idx) => (
                    <div key={idx} className="relative h-20 w-20 overflow-hidden rounded-lg">
                      <Image
                        src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeFloor(idx)}
                        className="absolute top-1 right-1 rounded-full bg-white p-1"
                      >
                        <AiOutlineClose size={12} />
                      </button>
                    </div>
                  ))}
                </div>
                {/* Carousel */}
                <div className="mt-4 w-full">
                  <ImageCarousel images={floorImages} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Radio buttons for ownership verification */}
        <div className="flex flex-col gap-3 lg:col-span-12">
          <h2 className="text-base font-semibold">
            Verify property ownership / Property ownership verification <span className="text-red-500">*</span>
          </h2>
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex items-center">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="radio1"
                  checked={radioInput === 'radio1'}
                  onChange={e => setInputRadio(e.target.value)}
                  name="radio"
                />
                <span className="text-base font-medium">Land Title Deed</span>
              </label>
            </div>
            <div className="flex items-center">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="radio2"
                  checked={radioInput === 'radio2'}
                  onChange={e => setInputRadio(e.target.value)}
                  name="radio"
                />
                <span className="text-base font-medium">Purchase Contract</span>
              </label>
            </div>
            <div className="flex items-center">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="radio3"
                  checked={radioInput === 'radio3'}
                  onChange={e => setInputRadio(e.target.value)}
                  name="radio"
                />
                <span className="text-base font-medium">Utility bill or receipt (water/electricity)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Ownership Document Uploader */}
        <div className="lg:col-span-12">
          <label className="text-base font-semibold">
            Ownership Document <span className="text-red-500">*</span>
            {radioInput && (
              <span className="ml-2 text-sm text-gray-600">
                (
                {radioInput === 'radio1'
                  ? 'Land Title Deed'
                  : radioInput === 'radio2'
                    ? 'Purchase Contract'
                    : 'Utility bill or receipt (water/electricity)'}
                )
              </span>
            )}
          </label>
          <div
            className={`mt-2 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 hover:border-blue-500 ${
              errors.ownershipImages ? 'border-red-300' : 'border-gray-300'
            }`}
            onDragOver={e => e.preventDefault()}
            onDrop={onOwnershipDrop}
            onClick={onOwnershipClick}
          >
            <AiOutlineCloudUpload className="text-primary h-10 w-10" />
            <p className="mt-2 text-xs text-[#0245a5]">Click or drag to upload</p>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              ref={ownershipInputRef}
              onChange={onOwnershipFiles}
            />
          </div>
          {errors.ownershipImages && <p className="mt-1 text-sm text-red-500">{errors.ownershipImages}</p>}

          {ownershipImages.length > 0 && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {ownershipImages.map((file, idx) => (
                  <div key={idx} className="relative h-20 w-20 overflow-hidden rounded-lg">
                    <Image
                      src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeOwnership(idx)}
                      className="absolute top-1 right-1 rounded-full bg-white p-1"
                    >
                      <AiOutlineClose size={12} />
                    </button>
                  </div>
                ))}
              </div>
              {/* Carousel */}
              <div className="mt-4 w-full">
                <ImageCarousel images={ownershipImages} />
              </div>
            </div>
          )}
        </div>

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
