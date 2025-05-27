'use client';
import Stripe from '@/components/owner/payments/Stripe';
import CustomLineChart from '@/components/shared/charts/CustomLineChart';
import { agentIncomeOverview, earningsData } from '@/data/data';
import React, { Suspense, useState, useEffect } from 'react';
import OwnerPaymentOverview from '../linked-agent/OwnerPaymentOverview';
import RentOverview from '@/components/tenant/dashboard/RentOverview';
import LinkPropertyCards from '../linked-agent/LinkPropertyCards';
import LinkedOwnerTransaction from '../linked-agent/LinkedOwnerTransaction';
import CustomLoading from '@/components/shared/small/CustomLoading';

const ChartLoading = () => <CustomLoading />;
function PaymentDetails() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-textColor text-lg font-semibold md:text-[22px]">Transaction Details</h3>
      <div className="grid grid-cols-12 gap-4">
        <div className="shadow-card col-span-7 rounded-lg border bg-white p-4 lg:p-2">
          <CustomLineChart earningsData={earningsData} isLoading={isLoading} />
        </div>
        <div className="shadow-card col-span-5 rounded-lg border bg-white p-4 lg:p-5">
          <Stripe />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="shadow-card col-span-12 h-[250px] rounded-lg bg-white p-3 lg:col-span-8">
          <Suspense fallback={<ChartLoading />}>
            <OwnerPaymentOverview title="Payment Overview" />
          </Suspense>
        </div>
        <div className="shadow-card col-span-12 h-[250px] rounded-lg bg-white lg:col-span-4">
          <Suspense fallback={<ChartLoading />}>
            <RentOverview title={'Payment OverView'} data={agentIncomeOverview} totalTitle={'Total Payment'} />
          </Suspense>
        </div>
      </div>
      <div className="shadow-card w-full rounded-lg bg-white">
        <LinkPropertyCards />
      </div>
      <div className="gird shadow-card rounded-lg border bg-white md:col-span-5">
        <LinkedOwnerTransaction />
      </div>
    </div>
  );
}

export default PaymentDetails;

// export default PaymentDetails;
