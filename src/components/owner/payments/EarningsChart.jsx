'use client';
import { Arrow } from '@/assets/icon';
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Sample data for each time period
const weekData = [
  { name: 'Mon', amt: 200 },
  { name: 'Tue', amt: 300 },
  { name: 'Wed', amt: 250 },
  { name: 'Thu', amt: 400 },
  { name: 'Fri', amt: 350 },
  { name: 'Sat', amt: 500 },
  { name: 'Sun', amt: 450 },
];

const monthlyData = [
  { name: 'Week 1', amt: 1500 },
  { name: 'Week 2', amt: 2000 },
  { name: 'Week 3', amt: 1800 },
  { name: 'Week 4', amt: 2200 },
];

const yearlyData = [
  { name: 'Jan', amt: 5000 },
  { name: 'Feb', amt: 4500 },
  { name: 'Mar', amt: 4800 },
  { name: 'Apr', amt: 5200 },
  { name: 'May', amt: 5500 },
  { name: 'Jun', amt: 5300 },
  { name: 'Jul', amt: 6000 },
  { name: 'Aug', amt: 5800 },
  { name: 'Sep', amt: 5600 },
  { name: 'Oct', amt: 5900 },
  { name: 'Nov', amt: 6200 },
  { name: 'Dec', amt: 6000 },
];

const EarningsChart = () => {
  const [timePeriod, setTimePeriod] = useState('week');

  // Determine which data set to use based on the selected time period.
  let data;
  if (timePeriod === 'week') {
    data = weekData;
  } else if (timePeriod === 'monthly') {
    data = monthlyData;
  } else {
    data = yearlyData;
  }

  // Calculate the total earnings for the current data set
  const totalEarnings = data.reduce((acc, item) => acc + item.amt, 0);

  return (
    <div className="h-[294px]" style={{ padding: '1rem' }}>
      {/* Header with Earnings title, total earnings and dropdown */}
      <div
        className="items-start"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <div className="flex flex-col">
          <h2 className="text-base font-semibold">Earnings - Total</h2>
          <h2 className="mt-3 text-3xl font-bold"> ${totalEarnings}</h2>
          <div className="flex items-center gap-2">
            <Arrow />
            <p className="text-xs font-bold">12%</p>
          </div>
        </div>
        <div className="h-full rounded-md border p-1">
          <select value={timePeriod} onChange={e => setTimePeriod(e.target.value)}>
            <option value="week">Week</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={170}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amt" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningsChart;
