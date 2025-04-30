'use client';

import React from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';

const PaymentOverview = () => {
  // Set your percentage values here (0-100)
  const collectedPercent = 40;
  const pendingPercent = 60;

  // Dynamic rent values (update as needed)
  const collectedRent = '$2000';
  const pendingRent = '$500';

  // Colors for the arcs
  const collectedColor = '#003480';
  const pendingColor = '#90BEFF';
  // ['#003480', '#90BEFF'];

  // Calculate the endAngle for each arc.
  // Recharts draws the arc in a clockwise direction.
  // We start at 90° and subtract the angle equivalent to the percentage.
  const collectedEndAngle = 90 - 360 * (collectedPercent / 100);
  const pendingEndAngle = 90 - 360 * (pendingPercent / 100);

  // Custom label for Collected Rent arc: position at the arc's end
  const renderCollectedLabel = ({ cx, cy, innerRadius, outerRadius }) => {
    const midRadius = innerRadius + (outerRadius - innerRadius) / 2;
    // Convert collectedEndAngle to radians
    const rad = (Math.PI / 180) * collectedEndAngle;
    const x = cx + midRadius * Math.cos(rad);
    const y = cy - midRadius * Math.sin(rad);
    return (
      <text x={x} y={y} fill="black" textAnchor="middle" dominantBaseline="central" fontSize="12">
        {`${collectedPercent}%`}
      </text>
    );
  };

  // Custom label for Pending Rent arc: position at the arc's end
  const renderPendingLabel = ({ cx, cy, innerRadius, outerRadius }) => {
    const midRadius = innerRadius + (outerRadius - innerRadius) / 2;
    // Convert pendingEndAngle to radians
    const rad = (Math.PI / 180) * pendingEndAngle;
    const x = cx + midRadius * Math.cos(rad);
    const y = cy - midRadius * Math.sin(rad);
    return (
      <text x={x} y={y} fill="black" textAnchor="middle" dominantBaseline="central" fontSize="12">
        {`${pendingPercent}%`}
      </text>
    );
  };

  return (
    <div className="flex h-[337px] flex-col rounded-lg bg-white px-5 py-4 shadow-lg">
      {/* Chart Title */}
      <div className="flex flex-col">
        <h1 className="mb-2 text-sm font-semibold">Payment Overview</h1>
        <h1 className="mb-2 text-sm text-[#717579]">Total Rent Collected vs. Pending Rent</h1>
      </div>

      {/* Pie Chart Container */}
      <div className="flex h-[175px] w-full flex-1 items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: -20, right: 10, left: -10, bottom: -20 }}>
            {/* Outer Arc for Collected Rent */}
            <Pie
              data={[{ value: collectedPercent }]}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={collectedEndAngle}
              innerRadius={65}
              outerRadius={80}
              fill={collectedColor}
              dataKey="value"
              label={renderCollectedLabel}
              labelLine={false}
            />
            {/* Inner Arc for Pending Rent */}
            <Pie
              data={[{ value: pendingPercent }]}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={pendingEndAngle}
              innerRadius={50}
              outerRadius={65}
              fill={pendingColor}
              dataKey="value"
              label={renderPendingLabel}
              labelLine={false}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Rent Details */}
      <div className="mt-4 grid w-full grid-cols-2 gap-4">
        {/* Collected Rent */}
        <div className="flex items-center justify-center space-x-2">
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: collectedColor }}
          />
          <div>
            <span className="block text-xs font-semibold">Collected Rent</span>
            <span className="block text-xs">{collectedRent}</span>
          </div>
        </div>
        {/* Pending Rent */}
        <div className="flex items-center justify-center space-x-2">
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: pendingColor }}
          />
          <div>
            <span className="block text-xs font-semibold">Pending Rent</span>
            <span className="block text-xs">{pendingRent}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOverview;
