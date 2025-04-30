'use client';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useMemo, useState, useEffect } from 'react';
import CustomLoading from '@/components/shared/small/CustomLoading';

// Sample data (you can increase this list)
const data = [
  { name: 'Luxury Apartment', price: 120000 },
  { name: 'Villa', price: 180000 },
  { name: 'Cottage', price: 95000 },
  { name: 'Dream Plan', price: 210000 },
  { name: 'Condo', price: 145000 },
  { name: 'Studio Flat', price: 70000 },
  { name: 'Penthouse', price: 230000 },
  { name: 'Farmhouse', price: 160000 },
  { name: 'Duplex', price: 110000 },
];

// Constants for dynamic bar width
const CHART_CONFIG = {
  maxBarWidth: 65,
  chartWidth: 900,
  barGap: 20,
  margin: { top: 20, right: 30, left: 20, bottom: 80 },
  gradient: {
    id: 'priceGradient',
    colors: {
      start: '#0245A5',
      end: 'rgba(2,69,165,0)',
    },
  },
};

const OwnerPaymentOverview = ({ title }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const calculatedBarWidth = useMemo(() => {
    const barCount = data.length;
    return Math.min(
      CHART_CONFIG.maxBarWidth,
      (CHART_CONFIG.chartWidth - CHART_CONFIG.barGap * (barCount - 1)) / barCount
    );
  }, []);

  const formatYAxis = useMemo(() => value => `$${value / 1000}k`, []);
  const formatTooltip = useMemo(() => value => `$${value.toLocaleString()}`, []);

  if (isLoading) {
    return (
      <div className="h-full w-full">
        <h1 className="font-lg font-semibold">{title}</h1>
        <CustomLoading />
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <h1 className="font-lg font-semibold">{title}</h1>
      <div style={{ width: '100%', height: 330 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={CHART_CONFIG.chartWidth}
            data={data}
            margin={CHART_CONFIG.margin}
            barGap={CHART_CONFIG.barGap}
          >
            <defs>
              <linearGradient id={CHART_CONFIG.gradient.id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_CONFIG.gradient.colors.start} stopOpacity={1} />
                <stop offset="100%" stopColor={CHART_CONFIG.gradient.colors.end} stopOpacity={1} />
              </linearGradient>
            </defs>

            <XAxis dataKey="name" angle={0} textAnchor="end" interval={0} height={80} />
            <YAxis tickFormatter={formatYAxis} />
            <Tooltip formatter={formatTooltip} />

            <Bar
              dataKey="price"
              barSize={calculatedBarWidth}
              fill={`url(#${CHART_CONFIG.gradient.id})`}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OwnerPaymentOverview;
