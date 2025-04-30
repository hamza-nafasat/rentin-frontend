'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaStar, FaRegStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function UserReviewsCard({ reviews }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!reviews || reviews.length === 0) {
    return <div>No reviews available.</div>;
  }

  const currentReview = reviews[currentIndex];

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNext = () => {
    setIsExpanded(false);
    setCurrentIndex(prevIndex => (prevIndex + 1) % reviews.length);
  };

  const handlePrevious = () => {
    setIsExpanded(false);
    setCurrentIndex(prevIndex => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="mt-2 flex w-full flex-col items-center rounded-lg border-[#D5E0F6] p-4 shadow-lg">
      {/* User Info & Rating */}
      <div className="flex w-full flex-col items-center justify-between lg:flex-row">
        <div className="flex items-center gap-2">
          <Image
            src={currentReview.image}
            width={32}
            height={32}
            alt="User Profile"
            className="size-8 rounded-full"
          />
          <div className="flex gap-1 text-sm font-semibold">
            <span>{currentReview.name}</span> <span>-</span> <span>{currentReview.date}</span>
          </div>
        </div>
        {/* Star Rating */}
        <div className="flex text-[#ECBA0B]">
          {[...Array(5)].map((_, i) =>
            i < currentReview.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
          )}
        </div>
      </div>

      {/* Review Comment */}
      <div className="mt-2 text-xs text-[#323232]">
        {isExpanded ? currentReview.comment : `${currentReview.comment.substring(0, 120)}...`}
      </div>

      {/* Read More Button */}
      {currentReview.comment.length > 120 && (
        <div className="flex w-full justify-end">
          <button onClick={toggleReadMore} className="text-primary mt-2 text-sm underline">
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        </div>
      )}

      {/* Navigation Arrows */}
      <div className="mt-4 flex w-full justify-between">
        <button onClick={handlePrevious} className="text-primary">
          <FaChevronLeft size={20} />
        </button>
        <button onClick={handleNext} className="text-primary">
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default UserReviewsCard;
