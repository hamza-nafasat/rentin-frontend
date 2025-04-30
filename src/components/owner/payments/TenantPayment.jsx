'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'On Time', value: 40 },
  { name: 'Late', value: 10 },
];

const COLORS = ['#003480', '#90BEFF'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const TenantPayment = () => {
  return (
    <div className="flex h-[337px] flex-col rounded-lg bg-white px-5 py-4 shadow-lg">
      <div className="flex flex-col">
        <h1 className="mb-2 text-sm font-semibold">Tenant Payment Timeliness</h1>
        <h1 className="mb-2 text-sm text-[#717579]">Tenant Payment Timeliness</h1>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 space-x-1">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center justify-center gap-2 text-sm">
            {/* Colored circle for each slice */}
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span className="text-xs">
              {entry.name}: {entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantPayment;
