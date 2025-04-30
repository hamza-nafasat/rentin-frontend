'use client';
import { useState, useEffect } from 'react';
import { Cell, Pie, PieChart } from 'recharts';

const colors = ['#003f9a', '#5c9df5', '#f04444'];

const TenantIntent = ({ title, data, legend }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevents SSR from mismatching HTML

  return (
    <div className="flex h-full w-full flex-col items-start gap-1 bg-white p-4">
      <h6 className="text-center text-base font-semibold text-gray-700">{title}</h6>
      <div className="flex items-center gap-2 md:gap-5">
        {/* Pie Chart */}
        {data?.length > 0 && (
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={66}
              outerRadius={90}
              fill="#8884d8"
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${entry.id || index}`}
                  fill={colors[index % colors.length]}
                  cornerRadius={5}
                />
              ))}
            </Pie>
          </PieChart>
        )}

        {/* Legend Section */}
        <div className="flex flex-col gap-4">
          {legend.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="size-[22px] rounded-sm"
                style={{ backgroundColor: colors[index] }}
              ></div>
              <p className="text-sm text-wrap text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TenantIntent;
