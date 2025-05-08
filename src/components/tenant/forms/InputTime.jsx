import React from 'react';

export default function InputTime({ title }) {
  return (
    <div>
      <label className="text-[16px] font-semibold text-[#32343C]" htmlFor="city">
        {title}
      </label>
      <br></br>
      <input
        defaultValue="14:30"
        className="b-[#41414129] mt-1.5 w-full rounded-[1px] border-b px-4 py-3 text-[#414141CC]"
        id="city"
        type="time"
      />
    </div>
  );
}
