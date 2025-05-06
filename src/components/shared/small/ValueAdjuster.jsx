import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { FaMinus } from 'react-icons/fa6';

export default function ValueAdjuster({ label, value, onChange }) {
  return (
    <div className="shadow-input mt-2 flex h-[56px] w-full items-center justify-between rounded-xl border-[0.5px] border-[#66666659] px-4 text-sm text-[#666666] outline-none lg:text-base">
      <span className="text-lg font-medium">{label}</span>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="border-primary l flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white text-lg hover:bg-gray-300"
        >
          <FaMinus />
        </button>
        <span className="w-10 text-center text-lg font-semibold">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="border-primary l flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white text-lg hover:bg-gray-300"
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
}
