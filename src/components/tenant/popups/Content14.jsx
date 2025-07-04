'use client';
import React from 'react';
import Buttons from './Buttons';

function Content14() {
  return (
    <div>
      <p className="px-2 text-[14px] text-[#32343C]">
        Congratulations! Your property booking has been confirmed. You will receive further details via <br /> email and
        can check your booking status on your dashboard.
      </p>
      <div className="mt-2">
        <Buttons text1={'Go to Dashboard'} cn={'!bg-[#5390E0] hover:!bg-blue-400'} text2={'View Booking Details'} />
      </div>
    </div>
  );
}

export default Content14;
