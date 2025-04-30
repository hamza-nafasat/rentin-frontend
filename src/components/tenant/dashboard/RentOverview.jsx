'use client';

import CustomLoading from '@/components/shared/small/CustomLoading';
import React, { useMemo, useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const CHART_CONFIG = {
  colors: ['#0245A5', '#5390E0'],
  pieConfig: {
    cx: '50%',
    cy: '80%',
    startAngle: 180,
    endAngle: 0,
    innerRadius: 70,
    outerRadius: 90,
    cornerRadius: 5,
    paddingAngle: 4,
    stroke: 'none',
  },
  margin: { top: 40, right: 0, left: 0, bottom: 0 },
  textStyles: {
    total: { fontSize: '18px', fontWeight: 'bold' },
    title: { fontSize: '12px', fill: '#555' },
  },
};

const RentOverview = ({ title, data, totalTitle }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const totalRent = useMemo(() => data.reduce((acc, cur) => acc + cur.value, 0), [data]);

  const renderLegend = useMemo(
    () =>
      ({ payload }) => (
        <div className="mb-7 flex w-full flex-wrap justify-evenly gap-4 px-2">
          {payload.map((entry, index) => {
            const item = data.find(d => d.name === entry.value);
            return (
              <div key={index} className="flex items-start space-x-2">
                <span
                  className="mt-1 h-3 w-3 rounded-sm"
                  style={{ backgroundColor: entry.color }}
                />
                <div className="flex flex-col">
                  <span className="text-xs text-[#76808D]">{entry.value}</span>
                  <span className="mt-2 -ml-5 text-base font-medium text-black">
                    ${item?.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ),
    [data]
  );

  if (isLoading) {
    return (
      <div className="relative flex w-full flex-col items-center">
        <h2 className="mt-3.5 mb-2 text-lg font-semibold">{title}</h2>
        <CustomLoading />
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-col items-center">
      <h2 className="mt-3.5 mb-2 text-lg font-semibold">{title}</h2>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={CHART_CONFIG.margin}>
            <Pie data={data} dataKey="value" {...CHART_CONFIG.pieConfig}>
              {data.map((entry, index) => (
                <Cell
                  key={`slice-${index}`}
                  fill={CHART_CONFIG.colors[index % CHART_CONFIG.colors.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend layout="horizontal" verticalAlign="top" content={renderLegend} />

            <text
              x="50%"
              y="70%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={CHART_CONFIG.textStyles.total}
            >
              ${totalRent}
            </text>

            <text
              x="50%"
              y="80%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={CHART_CONFIG.textStyles.title}
            >
              {totalTitle}
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default React.memo(RentOverview);
