'use client';
import BookingSummary from '@/components/owner/dashboard/BookingSummary';
import HomeCards from '@/components/owner/dashboard/HomeCards';
import MyProperties from '@/components/owner/dashboard/MyProperties';
import Welcome from '@/components/owner/dashboard/Welcome';
import CustomLineChart from '@/components/shared/charts/CustomLineChart';
import RecentActivities from '@/components/tenant/dashboard/RecentActivities';
import RentOverview from '@/components/tenant/dashboard/RentOverview';
import { activitiesData, agentHomeCardsData, agentIncomeOverview, earningsData } from '@/data/data';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const CustomPieChart = dynamic(() => import('@/components/shared/charts/CustomPieChart'));
const AgentDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Welcome />
      <HomeCards data={agentHomeCardsData} />
      <div className="mt-4 grid grid-cols-5 gap-6">
        <div className="col-span-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-3">
          <div className="shadow-card rounded-lg border bg-white p-4 sm:col-span-1">
            <RentOverview title={'Income OverView'} data={agentIncomeOverview} totalTitle={'Total Income'} />
          </div>
          <div className="shadow-card rounded-lg border bg-white p-4 sm:col-span-1">
            <RecentActivities cn={'h-[200px]'} data={activitiesData} />
          </div>
          <div className="sm:col-span-2">
            <div className="shadow-card rounded-lg border bg-white p-4 lg:p-5">
              <CustomLineChart earningsData={earningsData} isLoading={isLoading} />
            </div>
          </div>
        </div>
        <div className="shadow-card col-span-5 h-[100%] lg:col-span-2 lg:h-[697px]">
          <MyProperties />
        </div>
        <div className="shadow-card col-span-5">
          <BookingSummary title={'Booking Summary'} />
        </div>
      </div>
    </>
  );
};

export default AgentDashboard;

// export default AgentDashboard;
