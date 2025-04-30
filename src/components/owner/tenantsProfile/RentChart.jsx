'use client';

import React from 'react';
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

const data = [
  { name: 'Jan', paidRent: 400, dueRent: 2400, overdueRent: 1000 },
  { name: 'Feb', paidRent: 300, dueRent: 1398, overdueRent: 800 },
  { name: 'Mar', paidRent: 200, dueRent: 980, overdueRent: 700 },
  { name: 'Apr', paidRent: 278, dueRent: 390, overdueRent: 600 },
  { name: 'May', paidRent: 189, dueRent: 480, overdueRent: 500 },
  { name: 'Jun', paidRent: 239, dueRent: 380, overdueRent: 450 },
  { name: 'Jul', paidRent: 349, dueRent: 430, overdueRent: 400 },
  { name: 'Aug', paidRent: 300, dueRent: 600, overdueRent: 350 },
  { name: 'Sep', paidRent: 500, dueRent: 700, overdueRent: 300 },
  { name: 'Oct', paidRent: 600, dueRent: 1200, overdueRent: 250 },
  { name: 'Nov', paidRent: 700, dueRent: 1600, overdueRent: 200 },
  { name: 'Dec', paidRent: 800, dueRent: 2000, overdueRent: 150 },
];

const ChartComponent = () => {
  return (
    <div className='shadow-lg" h-[238px] rounded-lg bg-white px-5 py-2.5'>
      <h1 className="text-sm font-semibold">Rent Payment Trend</h1>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 2400]} />
          <Tooltip />
          <Legend
            wrapperStyle={{
              fontSize: '8px',
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
              marginTop: '10px',
            }}
          />
          {/* Removed strokeDasharray to make lines solid */}
          <Line type="monotone" dataKey="paidRent" stroke="#8884d8" name="Paid Rent" />
          <Line type="monotone" dataKey="dueRent" stroke="#82ca9d" name="Due Rent" />
          <Line type="monotone" dataKey="overdueRent" stroke="#ff0000" name="Overdue Rent" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
