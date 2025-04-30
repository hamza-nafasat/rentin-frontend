import { MessageUser } from '@/assets/icon';
import RentOverview from '@/components/tenant/dashboard/RentOverview';
import { agentIncomeOverview } from '@/data/data';
import Image from 'next/image';
import React from 'react';
import { BsChatSquareDotsFill, BsPatchCheckFill } from 'react-icons/bs';
import { FaBookmark } from 'react-icons/fa';
import { IoHomeOutline } from 'react-icons/io5';
import PropertyOwnerTransactionHistory from './PropertyOwnerTransactionHistory';
import PropertyOwnerPaymentDetails from './PropertyOwnerPaymentDetails';

function PropertyOwnerDetails() {
  const rentalAgreementDetails = [
    [
      { label: 'Monthly Rent', value: '$1,500' },
      { label: 'Monthly Rent', value: '$1,500' },
      { label: 'Monthly Rent', value: '$1,500' },
    ],
    [
      { label: 'Monthly Rent', value: '$1,500' },
      { label: 'Monthly Rent', value: '$1,500' },
    ],
  ];
  const paymentHistory = [
    [
      { label: 'Last Payment Date', value: '5th Jan 2024' },
      { label: 'Total Amount Paid', value: '$1,500' },
    ],
    [
      { label: 'Next Due Date', value: '5th Jan 2024' },
      { label: 'Pending Amount', value: '$1,500' },
    ],
  ];
  return (
    <div className="h-full w-full rounded-lg bg-white px-6 py-8">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex items-center justify-center">
          <Image
            src="/images/agent/UserProfile.png"
            alt="User Profile"
            layout="intrinsic"
            width={176}
            height={176}
            className="h-w-44 w-44 rounded-full sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-44 lg:w-44"
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center md:flex-row md:justify-between">
          <div className="w-full">
            <div className="flex flex-col">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <div className="mt-3 flex flex-col items-center justify-between sm:flex-row">
                    <button className="bg-primary rounded-md px-[8px] py-[6px] text-white">
                      <div className="flex items-end gap-2">
                        <p>Property Owner</p>
                      </div>
                    </button>
                  </div>
                </div>
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
            </div>
          </div>
          <div className="mt-4 flex h-full items-end justify-center gap-4 sm:mt-0">
            <div className="flex size-9 items-center justify-center bg-[#E9F2FF]">
              <BsChatSquareDotsFill className="text-[#0245A5]" />
            </div>
            <div className="flex size-9 items-center justify-center bg-[#E9F2FF]">
              <FaBookmark className="text-[#0245A5]" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3.5 grid grid-cols-12 gap-4">
        <div className="col-span-12 rounded-md border bg-white px-5 py-2.5 shadow-xl md:col-span-8">
          <div className="flex w-full flex-col justify-center">
            <div>
              <p className="text-lg font-semibold">Rental Agreement Details</p>
              <p className="text-primary text-lg font-bold">Luxury Apartment - 5th Avenue, NY</p>
            </div>
            <InfoSection
              //   title="Rental Agreement Details"
              columns={2}
              data={rentalAgreementDetails}
            />
          </div>
        </div>
        <div className="col-span-12 rounded-md border bg-white shadow-xl md:col-span-4">
          <RentOverview
            title={'Income OverView'}
            data={agentIncomeOverview}
            totalTitle={'Total Income'}
          />
        </div>
      </div>
      <div className="mt-3.5 grid grid-cols-12 gap-4">
        <div className="col-span-12 rounded-md border bg-white px-5 py-2.5 shadow-xl md:col-span-6">
          <InfoSection title="Payment History & Dues" columns={2} data={paymentHistory} />
        </div>
        <div className="col-span-12 rounded-md border bg-white px-5 py-2.5 shadow-xl md:col-span-6">
          <InfoSection title="Lease & Contract Overview" columns={2} data={paymentHistory} />
        </div>
      </div>
      <div className="mt-3.5 grid grid-cols-12 gap-4">
        <div className="col-span-12 rounded-md border bg-white shadow-xl md:col-span-7">
          <PropertyOwnerPaymentDetails />
        </div>
        <div className="col-span-12 rounded-md border bg-white shadow-xl md:col-span-5">
          <PropertyOwnerTransactionHistory />
        </div>
      </div>
    </div>
  );
}

export default PropertyOwnerDetails;

const InfoItem = ({ label, value }) => (
  <div className="flex flex-col gap-2.5">
    <div className="flex justify-between">
      <p className="text-xs text-[#5F5F5F]">{label}</p>
      <p className="text-xs font-medium text-[#5F5F5F]">{value}</p>
    </div>
    <div className="border-t-1 border-[#5F5F5F]" />
  </div>
);

const InfoSection = ({ title, columns, data }) => (
  <section>
    <h2 className="text-sm font-semibold">{title}</h2>
    <div className={`grid grid-cols-1 gap-5 lg:grid-cols-${columns} mt-[17.5px]`}>
      {data.map((colItems, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-2.5">
          {colItems.map((item, idx) => (
            <InfoItem key={idx} label={item.label} value={item.value} />
          ))}
        </div>
      ))}
    </div>
  </section>
);
