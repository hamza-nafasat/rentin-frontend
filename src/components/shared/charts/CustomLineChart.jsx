'use client';
import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { LuChevronRight } from 'react-icons/lu';
import { ListIcon } from '@/assets/icon';
import { IoIosArrowDown } from 'react-icons/io';
import CustomLoading from '../small/CustomLoading';

const CustomActiveDot = props => {
  const { cx, cy, value } = props;
  if (cx == null || cy == null) return null;
  const chartBottom = 240 - 20;
  return (
    <g>
      <line x1={cx} y1={chartBottom} x2={cx} y2={cy} stroke="#FB923C" strokeWidth={2} />
      <circle cx={cx} cy={cy} r={5} fill="#FFF" stroke="#FB923C" strokeWidth={2} />
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

const CustomLineChart = ({
  title,
  earningsData,
  width = '100%',
  height = 350,
  isLoading = false,
}) => {
  const [selectedRange, setSelectedRange] = useState('daily');
  const [filteredData, setFilteredData] = useState(earningsData);

  const handleRangeChange = event => {
    const range = event.target.value;
    setSelectedRange(range);

    if (range === 'daily') {
      setFilteredData(earningsData); // Daily data
    } else if (range === 'weekly') {
      setFilteredData(earningsData.slice(0, 7)); // First 7 days, for example
    } else if (range === 'monthly') {
      setFilteredData(earningsData); // Assuming we should have monthly data here
    }
  };

  if (isLoading) {
    return (
      <div style={{ width, height }} className="p-4 lg:p-5">
        <div className="flex items-center justify-between">
          <div>
            <h6 className="text-textColor text-sm font-semibold md:text-base">
              {title || 'Earnings'}
            </h6>
          </div>
          <div className="">
            <CustomDropDown lists={['Week', 'Month', 'Year']} />
          </div>
        </div>
        <CustomLoading />
      </div>
    );
  }

  return (
    <div style={{ width, height }} className="p-4 lg:p-5">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-textColor text-sm font-semibold md:text-base">
            {title || 'Earnings'}
          </h6>
        </div>
        <div className="">
          <CustomDropDown lists={['Week', 'Month', 'Year']} />
        </div>
      </div>
      <ResponsiveContainer>
        <AreaChart data={filteredData} margin={{ top: 15, right: 15, left: -15, bottom: 20 }}>
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

          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#666' }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            domain={[0, 1000]}
            ticks={[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 1000]}
            tickFormatter={val => (val === 1000 ? '1k+' : val)}
            tick={{ fill: '#666' }}
          />
          <CartesianGrid horizontal={false} vertical={false} />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Area
            type="monotone"
            dataKey="previous"
            stroke="#CBD5E1"
            strokeWidth={2}
            fill="url(#colorPrevious)"
            activeDot={false}
          />
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
};

export default CustomLineChart;

const CustomDropDown = ({ lists }) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Week');
  const selectHandler = option => {
    setSelectedOption(option);
    setIsOptionOpen(false);
  };
  const optionsHandler = () => setIsOptionOpen(!isOptionOpen);
  return (
    <div className="relative z-50 w-[110px]">
      <div
        className="flex cursor-pointer items-center justify-between gap-2 rounded-[4px] bg-[#7C848D] p-2 text-sm text-nowrap text-white"
        onClick={() => optionsHandler()}
      >
        <ListIcon />
        {selectedOption}
        <div className={`transition-all duration-300 ${isOptionOpen ? 'rotate-180' : 'rotate-0'}`}>
          <IoIosArrowDown fontSize={18} />
        </div>
      </div>
      {isOptionOpen && (
        <ul className="absolute top-[40px] left-0 flex w-full flex-col rounded-lg bg-white shadow-md">
          {lists.map((list, i) => (
            <li
              key={i}
              className="cursor-pointer border-b px-2 py-1 text-sm text-[#00000099] hover:bg-gray-100"
              onClick={() => selectHandler(list)}
            >
              {list}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
