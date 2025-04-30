'use client';
import dynamic from 'next/dynamic';
import { PieChartHalf } from '@/components/shared/charts/PieChartHalf';
import HomeCards from './HomeCards';
import Welcome from './Welcome';
import {
  earningsData,
  homeCardsData,
  incomeBreakdata,
  incomeLegendLabels,
  totalEarningschartConfig,
  totalEarningsChartData,
} from '@/data/data';
import MyProperties from './MyProperties';
import CustomLineChart from '@/components/shared/charts/CustomLineChart';
import BookingSummary from './BookingSummary';
import { useEffect, useState } from 'react';
const CustomPieChart = dynamic(() => import('@/components/shared/charts/CustomPieChart'));

const Dashboard = () => {
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
      <HomeCards data={homeCardsData} />
      <div className="mt-4 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-12">
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:col-span-7 lg:grid-cols-12">
          <div className="lg:col-span-6 xl:col-span-12 2xl:col-span-6">
            <PieChartHalf
              title="Payment Overview"
              data={totalEarningsChartData}
              config={totalEarningschartConfig}
              totalLabel="Total Earnings"
            />
          </div>
          <div className="lg:col-span-6 xl:col-span-12 2xl:col-span-6">
            <CustomPieChart
              title="Income Breakdown"
              data={incomeBreakdata}
              legend={incomeLegendLabels}
            />
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

export default Dashboard;
