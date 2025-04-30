'use client';
import CustomLineChart from '@/components/shared/charts/CustomLineChart';
import {
  activitiesData,
  dummyPropertyStatuses,
  earningsData,
  tenantRentOverview,
} from '@/data/data';
import { useEffect, useState } from 'react';
import PropertiesRented from './PropertiesRented';
import RecentActivities from './RecentActivities';
import RecentChat from './RecentChat';
import RentOverview from './RentOverview';
import TenantTransactionHistory from './TenantTransactionHistory';

function TenantDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex h-full flex-col gap-4">
      <h3 className="text-textColor text-lg font-semibold md:text-[22px]">
        Welcome! <span className="text-xl font-normal">Mikal</span>
      </h3>
      <div className="grid w-full grid-cols-1 gap-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-5">
            <PropertiesRented data={dummyPropertyStatuses} title={'Total Properties Rented'} />
          </div>
          <div className="col-span-12 w-full rounded-md bg-white shadow-md lg:col-span-3">
            <RentOverview
              title={'Rent OverView'}
              data={tenantRentOverview}
              totalTitle={'Total Rent'}
              isLoading={isLoading}
            />
          </div>
          <div className="col-span-12 w-full rounded-md bg-white shadow-md lg:col-span-4">
            <RecentActivities cn={'h-[200px]'} data={activitiesData} />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 w-full rounded-md bg-white shadow-md lg:col-span-5">
            <RecentChat />
          </div>
          <div className="col-span-12 w-full rounded-md bg-white shadow-md lg:col-span-7">
            <CustomLineChart
              title={'Compilation Rate'}
              earningsData={earningsData}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="grid w-full grid-cols-1 rounded-md bg-white shadow-md">
          <TenantTransactionHistory />
        </div>
      </div>
    </div>
  );
}

export default TenantDashboard;
