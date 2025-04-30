'use client';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CustomActiveDot = props => {
  const { cx, cy, value } = props;
  if (cx == null || cy == null) return null;
  const chartBottom = 240 - 20;
  return (
    <g>
      {/* Vertical orange line from the top of chart to the data point */}
      <line x1={cx} y1={chartBottom} x2={cx} y2={cy} stroke="#FB923C" strokeWidth={2} />
      {/* Dot at the hovered data point */}
      <circle cx={cx} cy={cy} r={10} fill="#FFF" stroke="#FB923C" strokeWidth={2} />
      {/* Label above the dot (e.g. "$510") */}
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#000" fontSize={14} fontWeight="bold">
        {`$${value}`}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: '#fff',
          border: '1px solid #ddd',
          padding: '8px',
          borderRadius: '4px',
        }}
      >
        <strong>{label}</strong>
        <div>{`$${payload[0].value}`}</div>
      </div>
    );
  }
  return null;
};

export default function InsightEarning({ data, width = '100%', height = 320 }) {
  return (
    <div style={{ width, height }} className="rounded-lg">
      <h6 className="text-textColor text-sm font-semibold md:text-base">Earnings</h6>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 15, right: 15, left: -15, bottom: 20 }}>
          {/* Gradients for the filled areas under each line */}
          <defs>
            <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#CBD5E1" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#CBD5E1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Axes */}
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#666' }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            domain={[0, 1000]}
            ticks={[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 1000]}
            tickFormatter={val => (val === 1000 ? '1k+' : val)}
            tick={{ fill: '#666' }}
          />

          {/* Remove default grid lines or customize as needed */}
          <CartesianGrid horizontal={false} vertical={false} />

          {/* Tooltip with custom cursor disabled (we have our own vertical line) */}
          <Tooltip content={<CustomTooltip />} cursor={false} />

          {/* "Previous" line/area */}
          <Area
            type="monotone"
            dataKey="previous"
            stroke="#CBD5E1"
            strokeWidth={2}
            fill="url(#colorPrevious)"
            activeDot={false}
          />

          {/* "Current" line/area with custom active dot */}
          <Area
            type="monotone"
            dataKey="current"
            stroke="#3B82F6"
            strokeWidth={2}
            fill="url(#colorCurrent)"
            activeDot={<CustomActiveDot />}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// export default InsightEarning
