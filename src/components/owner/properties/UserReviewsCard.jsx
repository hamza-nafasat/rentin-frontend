'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaStar, FaRegStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function UserReviewsCard({ reviews = [], isLoading = false, error = null }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Loading state
  if (isLoading) {
    return (
      <div className="shadow-card mt-2 flex h-32 w-full flex-col items-center justify-center rounded-lg border-[#D5E0F6] p-4">
        <div className="animate-pulse text-gray-400">Loading reviews...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="shadow-card mt-2 flex h-32 w-full flex-col items-center justify-center rounded-lg border-[#D5E0F6] p-4">
        <div className="text-sm text-red-500">Failed to load reviews</div>
      </div>
    );
  }

  // No reviews state
  if (!reviews || reviews.length === 0) {
    return (
      <div className="shadow-card mt-2 flex h-32 w-full flex-col items-center justify-center rounded-lg border-[#D5E0F6] p-4">
        <div className="text-sm text-gray-500">No reviews available yet</div>
      </div>
    );
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

  // Function to render stars
  const renderStars = rating => {
    return [...Array(5)].map((_, i) => (i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />));
  };

  return (
    <div className="shadow-card mt-2 flex w-full flex-col items-center rounded-lg border-[#D5E0F6] p-4">
      {/* User Info & Rating */}
      <div className="flex w-full flex-col items-center justify-between lg:flex-row">
        <div className="flex items-center gap-2">
          <Image
            src={currentReview.image}
            width={32}
            height={32}
            alt="User Profile"
            className="size-8 rounded-full object-cover"
            onError={e => {
              e.target.src = '/images/properties/Bg.png'; // Fallback image
            }}
          />
          <div className="flex gap-1 text-sm font-semibold">
            <span>{currentReview.name}</span>
            <span>-</span>
            <span>{currentReview.date}</span>
          </div>
        </div>
        {/* Star Rating */}
        <div className="flex text-[#ECBA0B]">{renderStars(currentReview.rating)}</div>
      </div>

      {/* Review Comment */}
      <div className="mt-2 w-full text-xs text-[#323232]">
        {isExpanded || currentReview.comment.length <= 120
          ? currentReview.comment
          : `${currentReview.comment.substring(0, 120)}...`}
      </div>

      {/* Read More Button */}
      {currentReview.comment.length > 120 && (
        <div className="flex w-full justify-end">
          <button onClick={toggleReadMore} className="text-primary mt-2 text-sm underline">
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        </div>
      )}

      {/* Navigation Arrows - Only show if more than 1 review */}
      {reviews.length > 1 && (
        <div className="mt-4 flex w-full justify-between">
          <button
            onClick={handlePrevious}
            className="text-primary transition-colors hover:text-blue-700"
            disabled={reviews.length <= 1}
          >
            <FaChevronLeft size={20} />
          </button>

          {/* Review counter */}
          <div className="flex items-center text-xs text-gray-500">
            {currentIndex + 1} of {reviews.length}
          </div>

          <button
            onClick={handleNext}
            className="text-primary transition-colors hover:text-blue-700"
            disabled={reviews.length <= 1}
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default UserReviewsCard;
