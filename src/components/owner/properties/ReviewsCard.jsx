import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function ReviewsCard({ averageRating = 0, totalReviews = 0, isLoading = false }) {
  // Function to render stars based on rating
  const renderStars = rating => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }

    // Add empty stars to make total 5
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }

    return stars;
  };

  if (isLoading) {
    return (
      <section className="mt-5">
        <h1 className="text-lg font-semibold">Reviews</h1>
        <div className="shadow-card flex h-[146px] flex-col items-center justify-center rounded-lg border-[#D5E0F6] p-4">
          <div className="animate-pulse text-gray-400">Loading reviews...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-5">
      <h1 className="text-lg font-semibold">Reviews</h1>
      <div className="shadow-card flex h-[146px] flex-col items-center rounded-lg border-[#D5E0F6] p-4">
        <h1 className="text-[22px] font-semibold">Average Rating</h1>
        <div className="flex items-center">
          <span className="text-[42px] font-bold">{averageRating}</span>
          <div className="ml-2 flex text-[#ECBA0B]">{renderStars(parseFloat(averageRating))}</div>
        </div>
        <div className="text-xs text-[#323232]">
          Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
        </div>
      </div>
    </section>
  );
}

export default ReviewsCard;
