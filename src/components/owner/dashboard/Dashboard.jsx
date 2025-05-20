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
      <div className="mt-4 grid grid-cols-5 gap-5">
        <div className="col-span-5 grid grid-cols-5 gap-5 lg:h-[700px]">
          <div className="col-span-5 grid grid-cols-12 gap-5 lg:col-span-3">
            <div className="col-span-12 lg:col-span-6">
              <PieChartHalf
                title="Payment Overview"
                data={totalEarningsChartData}
                config={totalEarningschartConfig}
                totalLabel="Total Earnings"
              />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <CustomPieChart title="Income Breakdown" data={incomeBreakdata} legend={incomeLegendLabels} />
            </div>
            <div className="col-span-12 rounded-lg border bg-white">
              <CustomLineChart earningsData={earningsData} isLoading={isLoading} />
            </div>
          </div>
          <div className="col-span-5 h-[100%] overflow-auto lg:col-span-2">
            <MyProperties />
          </div>
        </div>
        <div className="col-span-5">
          <BookingSummary title={'Booking Summary'} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
