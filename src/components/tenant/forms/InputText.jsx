import React from 'react';

export default function InputText({ title, placeholder }) {
  return (
    <div>
      <label className="text-[16px] font-semibold text-[#32343C]" htmlFor="date">
        {title}
      </label>
      <br></br>
      <input
        placeholder={placeholder}
        className="b-[#41414129] mt-1.5 w-full rounded-[1px] border-b px-4 py-3 text-[#414141CC]"
        type="text"
      />
    </div>
  );
}
