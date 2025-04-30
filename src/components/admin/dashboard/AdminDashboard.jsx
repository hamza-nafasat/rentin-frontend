'use client';
import BookingSummary from '@/components/owner/dashboard/BookingSummary';
import HomeCards from '@/components/owner/dashboard/HomeCards';
import MyProperties from '@/components/owner/dashboard/MyProperties';
import Welcome from '@/components/owner/dashboard/Welcome';
import CustomLineChart from '@/components/shared/charts/CustomLineChart';
import { PieChartHalf } from '@/components/shared/charts/PieChartHalf';
import RecentActivities from '@/components/tenant/dashboard/RecentActivities';
import {
  activitiesData,
  adminHomeCardsData,
  earningsData,
  homeCardsData,
  incomeBreakdata,
  incomeLegendLabels,
  totalEarningschartConfig,
  totalEarningsChartData,
} from '@/data/data';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
const CustomPieChart = dynamic(() => import('@/components/shared/charts/CustomPieChart'));

const AdminDashboard = () => {
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
      <h3 className="text-textColor text-lg font-semibold md:text-[22px]">
        Welcome! <span className="font-normal">Alexander</span>
      </h3>
      <HomeCards data={adminHomeCardsData} />
      <div className="mt-4 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-12">
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:col-span-7 lg:grid-cols-12">
          <div className="lg:col-span-6 xl:col-span-12 2xl:col-span-6">
            <PieChartHalf
              title="Earning Breakdown"
              data={totalEarningsChartData}
              config={totalEarningschartConfig}
              totalLabel="Total Earnings"
            />
          </div>
          <div className="lg:col-span-6 xl:col-span-12 2xl:col-span-6">
            <CustomPieChart
              title="Properties Status"
              data={incomeBreakdata}
              legend={incomeLegendLabels}
            />
          </div>
          <div className="lg:col-span-12">
            <div className="rounded-lg border bg-white p-4 shadow-sm lg:p-5">
              <CustomLineChart
                title={'Revenue Growth'}
                earningsData={earningsData}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm lg:col-span-5">
          <RecentActivities cn={'h-[650px]'} data={activitiesData} />
        </div>
        <div className="lg:col-span-12">
          <BookingSummary title={'Financial Summary'} />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

// export default AdminDashboard;
