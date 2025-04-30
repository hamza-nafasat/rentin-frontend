import Image from 'next/image';
import React from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import { BsChatSquareDotsFill } from 'react-icons/bs';
import { FaBookmark } from 'react-icons/fa';
import { BsPatchCheckFill } from 'react-icons/bs';
import { MessageUser } from '@/assets/icon';
import UserReviewsCard from '../properties/UserReviewsCard';
import { FaStar, FaRegStar } from 'react-icons/fa';

function BasicDetails() {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* Top details */}
      <div className="h-full w-full rounded-lg bg-white p-3.5">
        {/* Header Image with Profile Overlay */}
        <div className="relative w-full">
          {/* Frame image with responsive layout */}
          <Image
            src="/images/agent/Frame.png"
            alt="Frame image"
            layout="responsive"
            width={1190}
            height={225}
            className="rounded-md object-cover"
          />
          {/* Profile image positioned relative to the frame image */}
          <div className="absolute -bottom-8 left-4 sm:-bottom-12 sm:left-6 md:-bottom-16 lg:-bottom-20 2xl:-bottom-28">
            <Image
              src="/images/agent/UserProfile.png"
              alt="User Profile"
              layout="intrinsic"
              width={226}
              height={226}
              className="h-20 w-20 rounded-full sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-56 lg:w-56"
            />
          </div>
        </div>

        {/* Agent Information */}
        <div className="mt-20 w-full">
          <div className="flex flex-col sm:ml-[260px] md:ml-[200px] lg:ml-[250px]">
            <div className="flex w-full flex-col justify-between sm:flex-row">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-semibold">John Doe</h1>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-medium">Certified Inspection Officer</h1>
                  <BsPatchCheckFill className="text-primary" />
                </div>
                <div className="text-primary flex items-center text-xl">
                  <IoHomeOutline />
                  <h1>123 Sukhumvit Rd, Bangkok, Thailand</h1>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-4 sm:mt-0">
                <div className="flex size-9 items-center justify-center bg-[#E9F2FF]">
                  <BsChatSquareDotsFill className="text-[#0245A5]" />
                </div>
                <div className="flex size-9 items-center justify-center bg-[#E9F2FF]">
                  <FaBookmark className="text-[#0245A5]" />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center justify-end">
                <p className="text-primary">9 Am - 6 Pm</p>
              </div>
              <div className="mt-3 flex flex-col items-center justify-between sm:flex-row">
                <button className="bg-primary rounded-md px-5 py-3 text-white">
                  <div className="flex items-end gap-2">
                    <p>Message</p>
                    <MessageUser />
                  </div>
                </button>
                <div className="mt-3 flex gap-2 sm:mt-0">
                  <div className="bg-primary flex size-8 items-center justify-center rounded-md">
                    <p className="text-white">M</p>
                  </div>
                  <div className="bg-primary flex size-8 items-center justify-center rounded-md">
                    <p className="text-white">M</p>
                  </div>
                  <div className="bg-primary flex size-8 items-center justify-center rounded-md">
                    <p className="text-white">M</p>
                  </div>
                  <div className="bg-primary flex size-8 items-center justify-center rounded-md">
                    <p className="text-white">M</p>
                  </div>
                  <div className="bg-primary flex size-8 items-center justify-center rounded-md">
                    <p className="text-white">M</p>
                  </div>
                  <div className="bg-primary flex size-8 items-center justify-center rounded-md">
                    <p className="text-white">M</p>
                  </div>
                  <div className="bg-primary flex size-8 items-center justify-center rounded-md">
                    <p className="text-white">M</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left Side */}
        <div className="rounded-lg bg-white p-6 lg:col-span-8">
          <div className="flex flex-col lg:flex-row">
            <div>
              <h1 className="text-xl font-medium">Certification</h1>
              <div className="mt-5 h-[219px] w-full bg-gray-400 sm:w-[249px]">
                {/* Certification details/image goes here */}
              </div>
            </div>
            <div className="mt-6 lg:mt-0 lg:ml-[53px]">
              <div>
                <h1 className="text-xl font-medium">Experience & Services</h1>
                <div className="mt-5">
                  <h1 className="text-xl font-medium">Experience</h1>
                  <p className="text-base">
                    It is a long established fact that a reader will be distracted by the readable
                    content of a page when looking at its layout.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h1 className="text-xl font-medium">Service Charges</h1>
                <ul className="list-disc pl-5 text-base font-medium">
                  <li>Property Showing (Base price): ฿$200</li>
                  <li>Inspection Fee (Base price): ฿$900</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="rounded-lg bg-white p-6 lg:col-span-4">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">Reviews</p>
              <div className="flex items-center gap-3">
                <p className="text-lg font-semibold">4.0</p>
                <div className="flex text-[#ECBA0B]">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStar />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <UserReviewsCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicDetails;
