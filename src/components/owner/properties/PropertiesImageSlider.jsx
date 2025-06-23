'use client';
import Image from 'next/image';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import BathIcon from '../../../assets/propertyDetails/BathIcon';
import BedIcon from '../../../assets/propertyDetails/BedIcon';
import FloorsIcon from '../../../assets/propertyDetails/FloorsIcon';
import SqmIcon from '../../../assets/propertyDetails/SqmIcon';
import { BsFullscreen } from 'react-icons/bs';

const Modal = ({ onClose, children, width }) => {
  return (
    <div
      className="modal fixed inset-0 top-0 left-0 z-[99] flex items-center justify-center bg-[#000000c5] p-6"
      onClick={onClose}
    >
      <div
        className={`shadow-card overflow-hidden rounded-[12px] bg-white ${width ? width : 'w-[300px] md:w-[400px] lg:w-[700px] xl:w-[900px]'} h-[400px]`}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const PropertiesImageSlider = ({
  mainImages = ['/images/placeholder-property.jpg'],
  sideImages = [],
  propertyFeatures = [
    { icon: 'BedIcon', label: 'Bed', count: 0 },
    { icon: 'BathIcon', label: 'Bath', count: 0 },
    { icon: 'SqmIcon', label: 'Sqm', count: 0 },
    { icon: 'FloorsIcon', label: 'Floors', count: 1 },
  ],
  propertyInfo = {
    title: 'Property Title',
    address: 'Address not available',
    price: 0,
    status: 'Available',
  },
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Ensure we have at least one image for main images
  const validMainImages = mainImages.length > 0 ? mainImages : ['/images/placeholder-property.jpg'];
  const validSideImages = sideImages.length > 0 ? sideImages : [];

  // Combine all images for modal and side grid logic
  const allImages = [...validMainImages, ...validSideImages];

  // For side grid: show all images except the first one from the combined array
  const sideGridImages = allImages.slice(1); // Skip the first image

  // Open modal with the correct starting slide
  const openModal = index => {
    setSelectedIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <section className="shadow-card grid grid-cols-1 gap-4 rounded-lg bg-white p-4 lg:grid-cols-12">
        {/* Left Slider Section */}
        <div className="relative lg:col-span-8">
          <div>
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              spaceBetween={10}
              loop={validMainImages.length > 1}
              navigation={{ nextEl: '.custom-prev', prevEl: '.custom-next' }}
              pagination={{ clickable: true }}
              onSlideChange={swiper => {
                setCurrentIndex(swiper.realIndex);
              }}
            >
              {validMainImages.map((img, i) => (
                <SwiperSlide key={i}>
                  <div>
                    <Image
                      src={img}
                      width={700}
                      height={380}
                      alt={`${propertyInfo.title} - Image ${i + 1}`}
                      className="h-[380px] w-full rounded-lg object-cover"
                      unoptimized={true}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {validMainImages.length > 1 && (
              <div className="absolute top-[50%] z-50 flex w-full translate-y-[-50%] items-center justify-between px-6">
                <div className="custom-next grid place-items-center rounded-full bg-white p-1">
                  <IoIosArrowBack className="text-primary -ml-[2px] cursor-pointer text-base" />
                </div>
                <div className="custom-prev grid place-items-center rounded-full bg-white p-1">
                  <IoIosArrowBack className="text-primary -mr-[2px] rotate-180 cursor-pointer text-base" />
                </div>
              </div>
            )}
            <button
              onClick={() => openModal(currentIndex)}
              className="bg-primary absolute top-[90%] left-[96%] z-50 cursor-pointer rounded-lg p-2 py-1.5 text-[12px] text-white"
            >
              <BsFullscreen />
            </button>
          </div>
        </div>

        {/* Right Section - Side Grid Images */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4 lg:col-span-4">
          {sideGridImages.length > 0 ? (
            <>
              {sideGridImages.slice(0, 3).map((img, i) => (
                <div key={i} className="relative cursor-pointer" onClick={() => openModal(1 + i)}>
                  <Image
                    src={img}
                    alt={`${propertyInfo.title} - Image ${2 + i}`}
                    width={221}
                    height={185}
                    className="h-[180px] w-full rounded-lg object-cover"
                    unoptimized={true}
                  />
                </div>
              ))}
              {sideGridImages.length > 3 && (
                <div className="relative cursor-pointer" onClick={() => openModal(4)}>
                  <Image
                    src={sideGridImages[3]}
                    alt={`${propertyInfo.title} - Image 5`}
                    width={221}
                    height={185}
                    className="h-[180px] w-full rounded-lg object-cover"
                    unoptimized={true}
                  />
                  {sideGridImages.length > 4 && (
                    <p className="absolute inset-0 grid place-items-center rounded-lg bg-black/40 text-2xl font-medium text-white md:text-[41px]">
                      +{sideGridImages.length - 4}
                    </p>
                  )}
                </div>
              )}
            </>
          ) : (
            // Show message when no additional images beyond the first 4
            <div className="col-span-2 row-span-2 flex items-center justify-center rounded-lg bg-gray-100">
              <p className="text-sm text-gray-500">No additional images</p>
            </div>
          )}
        </div>

        {/* Property Info Section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-12">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-xl font-semibold text-black">{propertyInfo.title}</span>
              <span
                className={`rounded-lg px-2 py-1.5 text-sm font-bold ${
                  propertyInfo.status === 'Available'
                    ? 'bg-[#34C75926] text-[#34C759]'
                    : 'bg-[#FF3B3026] text-[#FF3B30]'
                }`}
              >
                {propertyInfo.status}
              </span>
            </div>
            <span className="block text-lg text-[#0245a5]">{propertyInfo.address}</span>
            <div className="text-[43px] font-bold">
              ${propertyInfo.price}
              <span className="text-base text-[#0245a5]"> / month</span>
            </div>
            <button className="bg-primary flex h-10 w-[87px] cursor-pointer items-center justify-center gap-2 rounded-xl text-base font-medium text-white lg:text-xl">
              <FaEdit className="text-base text-white lg:text-xl" />
              Edit
            </button>
          </div>

          {/* Property Features */}
          <div className="flex items-center justify-center gap-8 md:justify-end">
            {propertyFeatures.map((item, index) => {
              const IconComponent = {
                BedIcon: BedIcon,
                BathIcon: BathIcon,
                SqmIcon: SqmIcon,
                FloorsIcon: FloorsIcon,
              }[item.icon];

              return (
                <div key={index} className="flex flex-col items-center text-[#0245A5]">
                  <IconComponent />
                  <span className="text-lg font-medium">{item.count}</span>
                  <span className="text-sm">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal Section */}
      {modalOpen && (
        <Modal onClose={closeModal}>
          <div className="relative h-full">
            <Swiper
              modules={[Navigation, Pagination]}
              initialSlide={selectedIndex}
              slidesPerView={1}
              spaceBetween={10}
              loop={allImages.length > 1}
              navigation={{ nextEl: '.modal-next', prevEl: '.modal-prev' }}
              pagination={{ clickable: true }}
              className="h-full"
            >
              {allImages.map((img, i) => (
                <SwiperSlide key={i} className="h-full">
                  <div className="relative h-full">
                    <Image
                      src={img}
                      alt={`${propertyInfo.title} - Image ${i + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                      unoptimized={true}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Custom navigation arrows for modal */}
            {allImages.length > 1 && (
              <>
                <div className="modal-prev absolute top-1/2 left-4 z-50 flex size-8 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-white shadow-lg">
                  <IoIosArrowBack className="text-primary -ml-[2px] cursor-pointer text-lg" />
                </div>
                <div className="modal-next absolute top-1/2 right-4 z-50 flex size-8 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-white shadow-lg">
                  <IoIosArrowBack className="text-primary -ml-[2px] rotate-180 cursor-pointer text-lg" />
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default PropertiesImageSlider;
