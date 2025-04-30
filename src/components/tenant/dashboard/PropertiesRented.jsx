'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const PropertyCard = ({ title, value, data }) => (
  <div className="rounded-md border bg-white px-6 py-3.5 shadow-md">
    <p className="text-base font-medium">{title}</p>
    <div className="flex items-center justify-between">
      <div className="text-5xl font-medium">{value}</div>
      <div className="h-[70px] w-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <XAxis dataKey="label" hide />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

const PropertyStatus = ({ count, color, label }) => {
  // Map color codes to Tailwind classes
  const colorClasses = {
    '#049478': 'bg-[#049478] text-[#049478]',
    '#FF8D42': 'bg-[#FF8D42] text-[#FF8D42]',
    '#FF0000': 'bg-[#FF0000] text-[#FF0000]',
    '#0000FF': 'bg-[#0000FF] text-[#0000FF]',
  };

  const colorClass = colorClasses[color] || 'bg-[#8884d8] text-[#8884d8]';

  return (
    <div className="flex">
      <div className="flex h-14 flex-col items-center">
        <div className={`h-3 w-3 rounded-full ${colorClass.split(' ')[0]}`}></div>
        <div className={`w-0.5 flex-1 ${colorClass.split(' ')[0]}`}></div>
        <div className={`h-3 w-3 rounded-full ${colorClass.split(' ')[0]}`}></div>
      </div>
      <div className="ml-5 flex flex-col">
        <p className="text-4xl font-medium">{count}</p>
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${colorClass.split(' ')[0]}`}></div>
          <p className={colorClass.split(' ')[1]}>
            <span className="w-3 truncate overflow-hidden">{label}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const PropertiesRented = ({ data, title }) => {
  const totalProperties = data.reduce((sum, status) => sum + parseInt(status.count), 0).toString();

  return (
    <div className="flex flex-col gap-4">
      <PropertyCard
        title={title}
        value={totalProperties}
        data={data.map(status => ({
          ...status,
          count: parseInt(status.count),
        }))}
      />

      <div className="w-full overflow-auto rounded-md border bg-white px-6 py-3.5 shadow-md">
        <p className="text-sm text-[#76808D]">Overview</p>
        <div className="mt-3.5 flex justify-between gap-4">
          {data.map((status, index) => (
            <PropertyStatus
              key={index}
              count={status.count}
              color={status.color}
              label={status.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertiesRented;
