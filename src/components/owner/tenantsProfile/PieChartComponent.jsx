'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Excellent (40%)', value: 20 },
  { name: 'Good (30%)', value: 20 },
  { name: 'Average (20%)', value: 20 },
  { name: 'Poor (10%)', value: 20 },
];

const COLORS = ['#002E7A', '#004FBE', '#297BFF', '#85AFFF'];

const PieChartComponent = () => {
  return (
    <div className="flex h-[337px] flex-col items-center rounded-lg bg-white px-5 py-4 shadow-lg">
      {/* Chart Title */}
      <h1 className="mb-2 text-sm font-semibold">Tenant Feedback & Ratings</h1>

      {/* Pie Chart Container */}
      <div className="flex w-full flex-1 items-center justify-center">
        <ResponsiveContainer width="100%" height="90%">
          <PieChart margin={{ top: -20, right: 10, left: -10, bottom: -20 }}>
            <Pie
              data={data}
              // Center the pie in the middle of the container
              cx="50%"
              cy="50%"
              // Adjust inner/outer radius to change the donut thickness
              innerRadius={40}
              outerRadius={80}
              // Increase or decrease for more/less gap between slices
              paddingAngle={5}
              // Rounded edges on slices
              cornerRadius={8}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div className="grid grid-cols-2 space-x-1">
        {data.map((entry, index) => (
          <div key={index} className="flex gap-2 space-y-4 text-sm">
            {/* Colored circle for each slice */}
            <div>
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              />
            </div>
            <div>
              <span className="text-xs">{entry.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartComponent;
