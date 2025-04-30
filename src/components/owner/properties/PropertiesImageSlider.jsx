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

const Modal = ({ onClose, children, width }) => {
  return (
    <div
      className="modal fixed inset-0 top-0 left-0 z-[99] flex items-center justify-center bg-[#000000c5] p-6"
      onClick={onClose}
    >
      <div
        className={`overflow-hidden rounded-[12px] bg-white shadow-lg ${width ? width : 'w-[300px] md:w-[400px] lg:w-[700px] xl:w-[900px]'} h-[400px]`}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const PropertiesImageSlider = ({
  mainImages = [
    '/images/dashboard/property-card-1.png',
    '/images/dashboard/property-two.jpeg',
    '/images/dashboard/property-three.jpeg',
    '/images/dashboard/property-four.jpeg',
  ],
  sideImages = [
    '/images/dashboard/side-image.png',
    '/images/dashboard/side-image-2.png',
    '/images/dashboard/side-image-3.png',
    '/images/dashboard/property-card-1.png',
  ],
  propertyFeatures = [
    { icon: 'BedIcon', label: 'Bed', count: 2 },
    { icon: 'BathIcon', label: 'Bath', count: 2 },
    { icon: 'SqmIcon', label: 'Sqm', count: 2 },
    { icon: 'FloorsIcon', label: 'Floors', count: 2 },
  ],
  propertyInfo = {
    title: 'The Crest Sukhumvit 34, Bangkok',
    address: '778 Sukhumvit Road, Khong Tan, Khlong Toei, Bangkok',
    price: 243,
    status: 'Available',
  },
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Combine main and side images for the modal carousel
  const allImages = [...mainImages, ...sideImages];

  // Open modal with the correct starting slide
  const openModal = index => {
    setSelectedIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <section className="grid grid-cols-1 gap-4 rounded-lg bg-white p-4 lg:grid-cols-12">
        {/* Left Slider Section */}
        <div className="relative lg:col-span-8">
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={10}
            loop
            navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
            pagination={{ clickable: true }}
          >
            {mainImages.map((img, i) => (
              <SwiperSlide key={i}>
                <div onClick={() => openModal(i)} className="cursor-pointer">
                  <Image
                    src={img}
                    width={700}
                    height={380}
                    alt={`Main image ${i + 1}`}
                    className="h-[380px] w-full rounded-lg object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute top-[50%] z-50 flex w-full translate-y-[-50%] items-center justify-between px-6">
            <div className="custom-next grid place-items-center rounded-full bg-white p-1">
              <IoIosArrowBack className="text-primary -ml-[2px] cursor-pointer text-base" />
            </div>
            <div className="custom-prev grid place-items-center rounded-full bg-white p-1">
              <IoIosArrowBack className="text-primary -mr-[2px] rotate-180 cursor-pointer text-base" />
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4 lg:col-span-4">
          {sideImages.slice(0, 3).map((img, i) => (
            <div
              key={i}
              className="relative cursor-pointer"
              onClick={() => openModal(mainImages.length + i)}
            >
              <Image
                src={img}
                alt={`Side image ${i + 1}`}
                width={221}
                height={185}
                className="h-[180px] w-full rounded-lg object-cover"
              />
            </div>
          ))}
          {sideImages.length > 3 && (
            <div
              className="relative cursor-pointer"
              onClick={() => openModal(mainImages.length + 3)}
            >
              <Image
                src={sideImages[3]}
                alt="Side image 4"
                width={221}
                height={185}
                className="h-[180px] w-full rounded-lg object-cover"
              />
              {sideImages.length > 4 && (
                <p className="absolute inset-0 grid place-items-center rounded-lg bg-black/40 text-2xl font-medium text-white md:text-[41px]">
                  +{sideImages.length - 4}
                </p>
              )}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-12">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-xl font-semibold text-black">{propertyInfo.title}</span>
              <span className="rounded-lg bg-[#34C75926] px-2 py-1.5 text-sm font-bold text-[#34C759]">
                {propertyInfo.status}
              </span>
            </div>
            <span className="block text-lg text-[#32343C]">{propertyInfo.address}</span>
            <div className="text-[43px] font-bold">
              ${propertyInfo.price}
              <span className="text-base text-[#32343C]"> / month</span>
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
              navigation={{ nextEl: '.modal-next', prevEl: '.modal-prev' }}
              pagination={{ clickable: true }}
              className="h-full"
            >
              {allImages.map((img, i) => (
                <SwiperSlide key={i} className="h-full">
                  <div className="relative h-full">
                    <Image
                      src={img}
                      alt={`Carousel image ${i + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Custom navigation arrows for modal */}
            <div className="modal-prev absolute top-1/2 left-4 z-50 flex size-5 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-white">
              <IoIosArrowBack className="text-primary -ml-[2px] cursor-pointer text-lg" />
            </div>
            <div className="modal-next absolute top-1/2 right-4 z-50 flex size-5 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-white">
              <IoIosArrowBack className="text-primary -ml-[2px] rotate-180 cursor-pointer text-lg" />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PropertiesImageSlider;
