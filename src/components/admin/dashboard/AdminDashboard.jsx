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
      <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-5">
        <div className="col-span-5 grid gap-5 lg:grid-cols-5">
          <div className="col-span-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-3">
            <div className="col-span-2 sm:col-span-1">
              <PieChartHalf
                title="Earning Breakdown"
                data={totalEarningsChartData}
                config={totalEarningschartConfig}
                totalLabel="Total Earnings"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <CustomPieChart title="Properties Status" data={incomeBreakdata} legend={incomeLegendLabels} />
            </div>
            <div className="col-span-2">
              <div className="shadow-card rounded-lg border bg-white p-4 lg:p-5">
                <CustomLineChart title={'Revenue Growth'} earningsData={earningsData} isLoading={isLoading} />
              </div>
            </div>
          </div>
          <div className="shadow-card col-span-5 rounded-lg bg-white lg:col-span-2">
            <RecentActivities cn={'h-[650px]'} data={activitiesData} />
          </div>
        </div>
        <div className="shadow-card col-span-5">
          <BookingSummary title={'Financial Summary'} />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

// export default AdminDashboard;
