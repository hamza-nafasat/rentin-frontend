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
      <div className="mt-4 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-12">
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:col-span-7 lg:grid-cols-12">
          <div className="rounded-lg border bg-white p-4 shadow-sm lg:col-span-6 lg:p-5 xl:col-span-12 2xl:col-span-6">
            <RentOverview
              title={'Income OverView'}
              data={agentIncomeOverview}
              totalTitle={'Total Income'}
            />
          </div>
          <div className="rounded-lg border bg-white p-4 shadow-sm lg:col-span-6 lg:p-5 xl:col-span-12 2xl:col-span-6">
            <RecentActivities cn={'h-[200px]'} data={activitiesData} />
          </div>
          <div className="lg:col-span-12">
            <div className="rounded-lg border bg-white p-4 shadow-sm lg:p-5">
              <CustomLineChart earningsData={earningsData} isLoading={isLoading} />
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <MyProperties />
        </div>
        <div className="lg:col-span-12">
          <BookingSummary title={'Booking Summary'} />
        </div>
      </div>
    </>
  );
};

export default AgentDashboard;

// export default AgentDashboard;
