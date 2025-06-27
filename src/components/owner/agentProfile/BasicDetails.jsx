'use client';
import Image from 'next/image';
import React from 'react';
import { useParams } from 'next/navigation';
import { IoHomeOutline } from 'react-icons/io5';
import { BsChatSquareDotsFill } from 'react-icons/bs';
import { FaBookmark } from 'react-icons/fa';
import { BsPatchCheckFill } from 'react-icons/bs';
import { MessageUser } from '@/assets/icon';
import UserReviewsCard from '../properties/UserReviewsCard';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useGetAgentDetailsByIdQuery } from '@/features/agent/agentApi';

function BasicDetails() {
  const params = useParams();
  // console.log('helloooo', params?.id);
  console.log('helloooo', params?.agentid);

  const agentId = params?.agentid;

  const { data: agentResponse, isLoading: loading, error, refetch } = useGetAgentDetailsByIdQuery(agentId);

  const agentData = agentResponse?.data;

  // Format available days for display
  const formatAvailableDays = days => {
    if (!days || !Array.isArray(days) || days.length === 0) return 'Not specified';
    // Remove brackets and clean up the string
    return days[0]
      .replace(/[\[\]]/g, '')
      .split(',')
      .map(day => day.trim())
      .join(', ');
  };

  // Format location string
  const formatLocation = (area, city, country) => {
    const locationParts = [area, city, country].filter(Boolean);
    return locationParts.join(', ') || 'Location not specified';
  };

  if (loading) {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="shadow-card flex h-64 w-full items-center justify-center rounded-lg bg-white p-3.5">
          <div className="text-center">
            <div className="border-primary mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2"></div>
            <p>Loading agent details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="shadow-card flex h-64 w-full items-center justify-center rounded-lg bg-white p-3.5">
          <div className="text-center text-red-500">
            <p>Error: {error?.data?.message || error?.message || 'Failed to fetch agent details'}</p>
            <button
              onClick={() => refetch()}
              className="bg-primary hover:bg-primary/80 mt-2 rounded-lg px-4 py-2 text-white"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!agentData) {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="shadow-card flex h-64 w-full items-center justify-center rounded-lg bg-white p-3.5">
          <p>Agent not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="shadow-card h-full w-full rounded-lg bg-white p-3.5">
        <div className="relative w-full">
          <Image
            src="/images/agent/Frame.png"
            alt="Frame image"
            layout="responsive"
            width={1190}
            height={225}
            className="rounded-lg object-cover"
          />

          <div className="absolute -bottom-8 left-4 sm:-bottom-12 sm:left-6 md:-bottom-16 lg:-bottom-20 2xl:-bottom-28">
            <Image
              src={agentData.image?.url || '/images/agent/UserProfile.png'}
              alt="User Profile"
              layout="intrinsic"
              width={226}
              height={226}
              className="h-20 w-20 rounded-full sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-56 lg:w-56"
            />
          </div>
        </div>

        <div className="mt-20 w-full">
          <div className="flex flex-col sm:ml-[260px] md:ml-[200px] lg:ml-[250px]">
            <div className="flex w-full flex-col justify-between sm:flex-row">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-semibold">{agentData.name}</h1>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-medium">
                    {agentData.serviceType === 'Both'
                      ? 'Property Agent & Certified Inspection Officer'
                      : agentData.serviceType === 'Agent'
                        ? 'Property Agent'
                        : 'Certified Inspection Officer'}
                  </h1>
                  <BsPatchCheckFill className="text-primary" />
                </div>
                <div className="text-primary flex items-center text-xl">
                  <IoHomeOutline />
                  <h1>{formatLocation(agentData.area, agentData.city, agentData.country)}</h1>
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
                <p className="text-primary">{agentData.availableHours || '9 AM - 6 PM'}</p>
              </div>
              <div className="mt-3 flex flex-col items-center justify-between sm:flex-row">
                <button className="bg-primary rounded-lg px-5 py-3 text-white">
                  <div className="flex items-end gap-2">
                    <p>Message</p>
                    <MessageUser />
                  </div>
                </button>
                <div className="mt-3 flex gap-2 sm:mt-0">
                  {agentData.availableDays &&
                    agentData.availableDays.length > 0 &&
                    formatAvailableDays(agentData.availableDays)
                      .split(', ')
                      .slice(0, 7)
                      .map((day, index) => (
                        <div key={index} className="bg-primary flex size-8 items-center justify-center rounded-lg">
                          <p className="text-xs font-medium text-white">{day.charAt(0)}</p>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="shadow-card rounded-lg bg-white p-6 lg:col-span-8">
          <div className="flex flex-col lg:flex-row">
            <div>
              <h1 className="text-xl font-medium">Certification</h1>
              <div className="mt-5 h-[219px] w-full overflow-hidden rounded-lg sm:w-[249px]">
                {agentData.license?.url ? (
                  <Image
                    src={agentData.license.url}
                    alt="Agent License"
                    width={249}
                    height={219}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-200">
                    <p className="text-gray-500">License not available</p>
                  </div>
                )}
              </div>
              {agentData.licenseExpiry && (
                <p className="mt-2 text-sm text-gray-600">
                  Expires: {new Date(agentData.licenseExpiry).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="mt-6 lg:mt-0 lg:ml-[53px]">
              <div>
                <h1 className="text-xl font-medium">Experience & Services</h1>
                <div className="mt-5">
                  <h1 className="text-xl font-medium">Experience</h1>
                  <p className="text-base">
                    Experience Level: <span className="font-medium">{agentData.experience || 'Not specified'}</span>
                  </p>
                  <p className="mt-2 text-base">
                    Contact: <span className="font-medium">{agentData.contact}</span>
                  </p>
                  <p className="mt-1 text-base">
                    Email: <span className="font-medium">{agentData.email}</span>
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h1 className="text-xl font-medium">Service Charges</h1>
                <ul className="list-disc pl-5 text-base font-medium">
                  {agentData.propertyShowFee && <li>Property Showing (Base price): ${agentData.propertyShowFee}</li>}
                  {agentData.propertyInspectFee && (
                    <li>Inspection Fee (Base price): ${agentData.propertyInspectFee}</li>
                  )}
                  {!agentData.propertyShowFee && !agentData.propertyInspectFee && (
                    <li>Contact agent for pricing details</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="shadow-card rounded-lg bg-white p-6 lg:col-span-4">
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
