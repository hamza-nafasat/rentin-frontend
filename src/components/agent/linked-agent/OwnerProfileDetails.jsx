'use client';

import { MessageUser } from '@/assets/icon';
import Image from 'next/image';
import React, { Suspense, useMemo } from 'react';
import { BsChatSquareDotsFill, BsPatchCheckFill } from 'react-icons/bs';
import { FaBookmark } from 'react-icons/fa';
import { IoHomeOutline } from 'react-icons/io5';
import { agentIncomeOverview } from '@/data/data';
import LinkPropertyCards from './LinkPropertyCards';
import LinkedOwnerTransaction from './LinkedOwnerTransaction';

// Dynamic imports for chart components
const OwnerPaymentOverview = React.lazy(() => import('./OwnerPaymentOverview'));
const RentOverview = React.lazy(() => import('@/components/tenant/dashboard/RentOverview'));

// Loading component for charts
const ChartLoading = () => (
  <div className="flex h-64 items-center justify-center">
    <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
  </div>
);

// Memoized profile actions
const ProfileActions = React.memo(() => (
  <div className="mt-4 flex items-center justify-center gap-4 sm:mt-0">
    <div className="flex size-9 items-center justify-center bg-[#E9F2FF]">
      <BsChatSquareDotsFill className="text-[#0245A5]" />
    </div>
    <div className="flex size-9 items-center justify-center bg-[#E9F2FF]">
      <FaBookmark className="text-[#0245A5]" />
    </div>
  </div>
));

ProfileActions.displayName = 'ProfileActions';

function OwnerProfileDetails() {
  // Memoize the profile image dimensions
  const profileImageClasses = useMemo(
    () => 'h-20 w-20 rounded-full sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-56 lg:w-56',
    []
  );

  return (
    <div>
      <div className="flex w-full flex-col gap-4 rounded-lg bg-white">
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
              priority
            />
            {/* Profile image positioned relative to the frame image */}
            <div className="absolute -bottom-8 left-4 sm:-bottom-12 sm:left-15 md:-bottom-16 lg:-bottom-40 2xl:-bottom-28">
              <Image
                src="/images/agent/UserProfile.png"
                alt="User Profile"
                layout="intrinsic"
                width={226}
                height={226}
                className={profileImageClasses}
                priority
              />
            </div>
          </div>

          {/* Agent Information */}
          <div className="w-full">
            <div className="mt-8 flex flex-col md:mt-0 md:ml-[250px] lg:ml-[290px]">
              <div className="flex w-full flex-col justify-between sm:flex-row">
                <div className="mt-5 flex flex-col gap-2">
                  <h1 className="text-3xl font-semibold">John Doe</h1>
                  <div className="text-primary flex items-center text-xl">
                    <IoHomeOutline />
                    <h1>123 Sukhumvit Rd, Bangkok, Thailand</h1>
                  </div>
                </div>
                <ProfileActions />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-12 gap-4">
          <div className="col-span-12 h-[250px] rounded-lg bg-white p-3 shadow-xl lg:col-span-8">
            <Suspense fallback={<ChartLoading />}>
              <OwnerPaymentOverview title="Payment Overview" />
            </Suspense>
          </div>
          <div className="col-span-12 h-[250px] rounded-lg bg-white shadow-xl lg:col-span-4">
            <Suspense fallback={<ChartLoading />}>
              <RentOverview
                title={'Payment OverView'}
                data={agentIncomeOverview}
                totalTitle={'Total Payment'}
              />
            </Suspense>
          </div>
        </div>
        <div className="w-full rounded-lg bg-white shadow-xl">
          <LinkPropertyCards />
        </div>
        <div className="gird rounded-md border bg-white shadow-xl md:col-span-5">
          <LinkedOwnerTransaction />
        </div>
      </div>
    </div>
  );
}

export default React.memo(OwnerProfileDetails);
