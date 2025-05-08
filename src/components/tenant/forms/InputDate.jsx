import React from 'react';

export default function InputDate({ title }) {
  return (
    <div>
      <label className="text-[16px] font-semibold text-[#32343C]" htmlFor="date">
        {title}
      </label>
      <br></br>
      <input
        defaultValue="2025-05-05"
        className="b-[#41414129] w-full rounded-[1px] border-b px-4 py-4 text-[12px] text-[#414141CC] sm:text-[14px]"
        type="date"
      />
    </div>
  );
}
