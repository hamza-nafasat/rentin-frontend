import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function ReviewsCard() {
  return (
    <section className="mt-5">
      <h1 className="text-lg font-semibold">Reviews</h1>
      <div className="flex h-[146px] flex-col items-center rounded-lg border-[#D5E0F6] p-4 shadow-lg">
        <h1 className="text-[22px] font-semibold">Average Rating</h1>
        <div className="flex items-center">
          <span className="text-[42px] font-bold">4.0</span>
          <div className="flex text-[#ECBA0B]">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
          </div>
        </div>
        <div className="text-xs text-[#323232]">Average Rating on this Year</div>
      </div>
    </section>
  );
}

export default ReviewsCard;
