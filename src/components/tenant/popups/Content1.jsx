import React from 'react';
import Buttons from './Buttons';

export default function Content1() {
  return (
    <div className="flex flex-col">
      <div>
        <p className="mb-3 text-[14px]">
          Are you sure you want to visit this property? You need to pay the visit charges before
          <br></br> proceeding.
        </p>
        <h1 className="mb-3 text-[16px] sm:text-[18px]">
          <span className="font-bold">Visit Fee: $300</span> (Non-refundable)
        </h1>
      </div>
      <div className="flex justify-end gap-2">
        <Buttons text1={'Cancel'} cn={'!bg-[#E35454]'} text2={'Proceed to Visit'} />
      </div>
    </div>
  );
}
