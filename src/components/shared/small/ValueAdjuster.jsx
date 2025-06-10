import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { FaMinus } from 'react-icons/fa6';

export default function ValueAdjuster({ label, value, onChange, steps = [] }) {
  if (!steps || steps.length === 0) {
    return <div className="text-red-500">⚠️ No steps provided to ValueAdjuster.</div>;
  }

  const currentIndex = steps.findIndex(v => v === value);

  const handleIncrement = () => {
    if (currentIndex < steps.length - 1) {
      onChange(steps[currentIndex + 1]);
    }
  };

  const handleDecrement = () => {
    if (currentIndex > 0) {
      onChange(steps[currentIndex - 1]);
    }
  };

  return (
    <div className="shadow-input mt-2 flex h-[56px] w-full items-center justify-between rounded-xl border-[0.5px] border-[#66666659] px-4 text-sm text-[#666666] outline-none lg:text-base">
      <span className="text-lg font-medium">{label}</span>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={currentIndex <= 0}
          className="border-primary flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white text-lg hover:bg-gray-300 disabled:opacity-40"
        >
          <FaMinus />
        </button>
        <span className="w-16 text-center text-lg font-semibold">{value}</span>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={currentIndex === steps.length - 1}
          className="border-primary flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white text-lg hover:bg-gray-300 disabled:opacity-40"
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
}
