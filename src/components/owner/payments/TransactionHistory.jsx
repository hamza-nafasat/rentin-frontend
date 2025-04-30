'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const TransactionHistory = () => {
  // Filled percentages
  const collectedPercent = 40; // for Earned (outer donut)
  const pendingPercent = 60; // for Withdraw (inner donut)

  // Dynamic values
  const collectedRent = '$2000';
  const pendingRent = '$500';

  // Data arrays (each has two segments, but only the filled segment gets a label)
  const collectedData = [
    { name: 'Earned', value: collectedPercent },
    { name: 'Remaining', value: 100 - collectedPercent },
  ];
  const pendingData = [
    { name: 'Withdraw', value: pendingPercent },
    { name: 'Remaining', value: 100 - pendingPercent },
  ];

  // Colors for each donut: first for filled portion, second for the remaining (light gray)
  const outerColors = ['#003480', '#E0E0E0'];
  const innerColors = ['#90BEFF', '#E0E0E0'];
  // ['#003480', '#90BEFF'];
  // --- CHART DIMENSIONS ---
  // We'll use a fixed container of 175x175 px.
  const containerSize = 175;
  const center = containerSize / 2; // 87.5 px

  // --- DONUT RADII ---
  // Outer donut (Earned)
  const outerInnerRadius = 60;
  const outerOuterRadius = 75;
  // Inner donut (Withdraw)
  const innerInnerRadius = 40;
  const innerOuterRadius = 55;

  // --- ANGLE CALCULATIONS ---
  // In Recharts, the arc is drawn from startAngle to endAngle (in degrees)
  // For the outer donut:
  const outerStartAngle = 90;
  const outerEndAngle = 90 - 360 * (collectedPercent / 100); // 90 - 144 = -54 for 40%
  const outerMidAngle = (outerStartAngle + outerEndAngle) / 2; // (90 + (-54))/2 = 18°

  // For the inner donut:
  const innerStartAngle = 90;
  const innerEndAngle = 90 - 360 * (pendingPercent / 100); // 90 - 216 = -126 for 60%
  const innerMidAngle = (innerStartAngle + innerEndAngle) / 2; // (90 + (-126))/2 = -18°

  // --- LABEL POSITIONING (in pixels) ---
  // For the outer donut, we position the label just outside its arc.
  const outerOffset = 5;
  const outerLabelRadius = outerOuterRadius + outerOffset; // 70 + 5 = 75
  const outerRad = (outerMidAngle * Math.PI) / 180; // Convert degrees to radians
  const outerLabelX = center + outerLabelRadius * Math.cos(outerRad);
  const outerLabelY = center - outerLabelRadius * Math.sin(outerRad); // subtract since y increases downward

  // For the inner donut, we position the label inside its arc.
  const innerOffset = 5;
  const innerLabelRadius = innerInnerRadius - innerOffset; // 40 - 5 = 35
  const innerRad = (innerMidAngle * Math.PI) / 180;
  const innerLabelX = center + innerLabelRadius * Math.cos(innerRad);
  const innerLabelY = center - innerLabelRadius * Math.sin(innerRad);

  return (
    <div className="flex h-[337px] flex-col rounded-lg bg-white px-5 py-4 shadow-lg">
      {/* Chart Title */}
      <div className="flex flex-col">
        <h1 className="mb-2 text-sm font-semibold">Transaction History</h1>
        <h1 className="mb-2 text-sm text-[#717579]">Transaction History</h1>
      </div>

      {/* Chart Container with fixed dimensions and relative positioning */}
      <div className="flex w-full flex-1 items-center justify-center">
        <div
          style={{
            position: 'relative',
            width: containerSize,
            height: containerSize,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: -20, right: 10, left: -10, bottom: -20 }}>
              {/* Outer Donut (Earned) */}
              <Pie
                data={collectedData}
                cx="50%"
                cy="50%"
                innerRadius={outerInnerRadius}
                outerRadius={outerOuterRadius}
                paddingAngle={0}
                cornerRadius={5}
                dataKey="value"
              >
                {collectedData.map((entry, index) => (
                  <Cell
                    key={`collected-cell-${index}`}
                    fill={outerColors[index % outerColors.length]}
                  />
                ))}
              </Pie>
              {/* Inner Donut (Withdraw) */}
              <Pie
                data={pendingData}
                cx="50%"
                cy="50%"
                innerRadius={innerInnerRadius}
                outerRadius={innerOuterRadius}
                paddingAngle={0}
                cornerRadius={5}
                dataKey="value"
              >
                {pendingData.map((entry, index) => (
                  <Cell
                    key={`pending-cell-${index}`}
                    fill={innerColors[index % innerColors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Absolutely positioned labels */}
          <div
            style={{
              position: 'absolute',
              left: outerLabelX,
              top: outerLabelY,
              transform: 'translate(-50%, -50%)',
              fontSize: '12px',
              color: '#000',
              pointerEvents: 'none',
            }}
          >
            {`${collectedPercent}%`}
          </div>
          <div
            style={{
              position: 'absolute',
              left: innerLabelX,
              top: innerLabelY,
              transform: 'translate(-50%, -50%)',
              fontSize: '12px',
              color: '#000',
              pointerEvents: 'none',
            }}
          >
            {`${pendingPercent}%`}
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="mt-4 grid w-full grid-cols-2 gap-4">
        {/* Earned */}
        <div className="flex items-center justify-center space-x-2">
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: outerColors[0] }}
          />
          <div>
            <span className="block text-xs font-semibold">Earned</span>
            <span className="block text-xs">{collectedRent}</span>
          </div>
        </div>
        {/* Withdraw */}
        <div className="flex items-center justify-center space-x-2">
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: innerColors[0] }}
          />
          <div>
            <span className="block text-xs font-semibold">Withdraw</span>
            <span className="block text-xs">{pendingRent}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
