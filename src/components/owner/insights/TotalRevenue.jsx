'use client';
import React, { useState } from 'react';
import { Bar, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

function TotalRevenue() {
  const [view, setView] = useState('weekly');
  const maxCapacity = 50; // Maximum capacity; values can range from 1 to 50

  const getRandomValue = () => Math.floor(Math.random() * maxCapacity) + 1;

  const weeklyData = [
    { name: 'M', value: getRandomValue() },
    { name: 'T', value: getRandomValue() },
    { name: 'W', value: getRandomValue() },
    { name: 'T', value: getRandomValue() },
    { name: 'F', value: getRandomValue() },
    { name: 'S', value: getRandomValue() },
    { name: 'S', value: getRandomValue() },
  ];

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const monthlyData = monthNames.map(month => ({
    name: month,
    value: getRandomValue(),
  }));

  const dailyData = Array.from({ length: 24 }, (_, i) => ({
    name: `${i % 12 || 12} ${i < 12 ? 'AM' : 'PM'}`,
    value: getRandomValue(),
  }));

  let data;
  if (view === 'weekly') {
    data = weeklyData;
  } else if (view === 'monthly') {
    data = monthlyData;
  } else if (view === 'daily') {
    data = dailyData;
  }

  const transformedData = data.map(item => ({
    name: item.name,
    active: item.value,
    remaining: maxCapacity - item.value,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const activePayload = payload.find(p => p.dataKey === 'active');
      if (activePayload) {
        return (
          <div className="custom-tooltip bg-primary rounded border p-2 shadow">
            <p className="label">{`${activePayload.value} Revenue`}</p>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="flex w-full flex-col rounded-lg p-2 md:p-3">
      <div className="mb-4 flex items-center justify-between">
        <h6 className="text-center text-base font-semibold text-gray-700">Total Revenue</h6>
        <select
          className="rounded border p-1 px-3"
          value={view}
          onChange={e => setView(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <ResponsiveContainer background="red" width="100%" height="100%">
        <ComposedChart data={transformedData} margin={{ top: 0, right: 10, left: 10, bottom: 10 }}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 14, fill: '#808191' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar radius={[10, 10, 0, 0]} dataKey="active" stackId="a" fill="#5B9EF333" barSize={50} />
          <Bar dataKey="remaining" stackId="a" fill="#F4F5F9" margin="10px" barSize={50} />
          <Line type="linear" dataKey="active" stroke="#0245A5" strokeWidth={4} dot={{ r: 4 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TotalRevenue;
