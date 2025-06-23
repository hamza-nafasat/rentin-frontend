import { useGetUserByIdQuery } from '@/features/rating/userApi';
import { useMemo } from 'react';

// Custom hook to fetch user data for multiple reviews
export const useReviewUsers = reviews => {
  // Get unique user IDs to avoid duplicate API calls
  const uniqueUserIds = useMemo(() => {
    if (!reviews || reviews.length === 0) return [];
    const userIds = reviews.map(review => review.userId).filter(Boolean);
    return [...new Set(userIds)]; // Remove duplicates
  }, [reviews]);

  // Create a stable array of user queries
  const userQueries = {};

  // Only call hooks for unique user IDs
  uniqueUserIds.forEach(userId => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    userQueries[userId] = useGetUserByIdQuery(userId, {
      skip: !userId,
    });
  });

  // Check loading and error states
  const isLoading = Object.values(userQueries).some(query => query.isLoading);
  const hasError = Object.values(userQueries).some(query => query.error);

  // Combine user data with review data
  const reviewsWithUserData = useMemo(() => {
    if (!reviews) return [];

    return reviews.map(review => {
      const userQuery = userQueries[review.userId];
      const userData = userQuery?.data;

      return {
        ...review,
        name: userData
          ? `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'Anonymous'
          : review.name || 'Anonymous',
        image: userData?.profileImage || review.image || '/images/properties/Bg.png',
        email: userData?.email || review.email,
        contact: userData?.contact,
      };
    });
  }, [reviews, userQueries]);

  return {
    reviewsWithUserData,
    isLoading,
    hasError,
  };
};
