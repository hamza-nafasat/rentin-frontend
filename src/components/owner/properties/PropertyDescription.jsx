'use client';
import dynamic from 'next/dynamic';
import { useGetRatingsByPropertyQuery } from '@/features/rating/ratingApi';
import { useGetUserByIdQuery } from '@/features/user/userApi';
import { useMemo } from 'react';
import Description from './Description';
import ReviewsCard from './ReviewsCard';
import UserPropertyCard from './UserPropertyCard';
import UserReviewsCard from './UserReviewsCard';

const HouseMap = dynamic(() => import('../../tenant/browserProperty/HouseMap'), {
  ssr: false,
});

function PropertyDescription({ data }) {
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useGetRatingsByPropertyQuery(data?._id, {
    skip: !data?._id,
  });

  const {
    data: ownerData,
    isLoading: ownerLoading,
    error: ownerError,
  } = useGetUserByIdQuery(data?.owner || data?.userId, {
    skip: !data?.owner && !data?.userId,
  });

  const transformedReviews = useMemo(() => {
    if (!reviewsData?.ratings) return [];

    return reviewsData.ratings.map(review => ({
      id: review._id,

      name: review.user.name,
      date: new Date(review.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
      }),
      image: review.user.profileImage || '/images/properties/Bg.png',
      rating: review.rate,
      comment: review.comment,
      userId: review.user._id,
      email: review.user.email,
    }));
  }, [reviewsData]);

  const averageRating = reviewsData?.ratings?.length
    ? (reviewsData.ratings.reduce((sum, review) => sum + review.rate, 0) / reviewsData.ratings.length).toFixed(1)
    : 0;

  const rentalAgreementDetails = [
    [
      { label: 'Monthly Rent', value: `${data?.contractRate?.rate || 0}` },
      { label: 'Security Deposit', value: `${data?.contractRate?.securityDeposit || 0}` },
      { label: 'Property Type', value: data?.propertyType || 'N/A' },
    ],
  ];

  const paymentHistory = [
    [
      { label: 'Monthly Rent', value: `TBH ${data?.contractRate?.rate || 0}` },
      { label: 'Security Deposit', value: `${data?.contractRate?.securityDeposit || 0}` },
    ],
  ];

  // Transform deals into structured format for better display
  const availableContracts = useMemo(() => {
    if (!data?.deals?.length) return [];

    return data.deals.map((deal, index) => ({
      id: deal._id || `deal-${index}`,
      name: `Deal ${index + 1}`,
      rent: deal?.rent || 0,
      duration: deal?.duration || 0,
      durationUnit: 'Months',

      securityDeposit: deal?.securityDeposit,
    }));
  }, [data?.deals]);

  // Map API amenities to display names
  const amenityMap = {
    rooftop_terrace: 'Rooftop Terrace',
    terrace: 'Terrace',
    swimming_pool: 'Swimming Pool',
    gym: 'Gym',
    parking: 'Parking',
    garden: 'Garden',
    balcony: 'Balcony',
    elevator: 'Elevator',
    high_speed_internet: 'High Speed Internet',
    microwave: 'Microwave',
  };

  const amenities = [
    ...(data?.amenities?.map(amenity => amenityMap[amenity] || amenity.replace('_', ' ').toUpperCase()) || []),
    ...(data?.rentalFeatures?.map(feature => amenityMap[feature] || feature.replace('_', ' ').toUpperCase()) || []),
  ];

  const furnishing = [
    ...(data?.propertyFeatures || []),
    { label: 'Condition', value: data?.condition?.replace('_', ' ').toUpperCase() || 'N/A' },
  ];

  const securityMap = {
    cctv: 'CCTV',
    guards: 'Security Guard',
    '24_hour_security': '24-hour Security',
    access_control: 'Access Control',
  };

  const security = data?.security?.map(sec => securityMap[sec] || sec.replace('_', ' ').toUpperCase()) || [];

  const rentalFeatureMap = {
    high_speed_internet: 'High Speed Internet',
    microwave: 'Microwave',
    air_conditioning: 'Air Conditioning',
    heating: 'Heating',
    washing_machine: 'Washing Machine',
    dishwasher: 'Dishwasher',
  };

  const rentalFeatures =
    data?.rentalFeatures?.map(feature => rentalFeatureMap[feature] || feature.replace('_', ' ').toUpperCase()) || [];

  const viewMap = {
    skyline_view: 'Skyline View',
    city_view: 'City View',
    garden_view: 'Garden View',
    canal_view: 'Canal View',
    mountain_view: 'Mountain View',
    sea_view: 'Sea View',
  };

  const views = [
    ...(data?.viewFromTheProperty?.map(view => ({
      label: viewMap[view] || view.replace('_', ' ').toUpperCase(),
      value: '',
    })) || []),
  ];

  const propertyImage = data?.images?.[0]?.url || '/images/browser-property/Properties.png';
  const propertyName = data?.propertyTitle || data?.projectName || 'Dream house';
  const propertyLocation = data?.address || 'lahore';
  const propertyStatus = data?.isBooked ? 'rented' : 'available';

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <section className="shadow-card rounded-lg bg-white px-5 py-3.5 lg:col-span-8">
        <Description
          data={data}
          rentalAgreementDetails={rentalAgreementDetails}
          paymentHistory={paymentHistory}
          amenities={amenities}
          furnishing={furnishing}
          rentalFeatures={rentalFeatures}
          security={security}
          views={views}
          availableContracts={availableContracts}
        />
      </section>
      <section className="shadow-card gap-4 rounded-lg bg-white px-6 py-10 lg:col-span-4">
        <UserPropertyCard data={data} ownerData={ownerData} ownerLoading={ownerLoading} ownerError={ownerError} />
        <ReviewsCard
          averageRating={averageRating}
          totalReviews={reviewsData?.ratings?.length || 0}
          isLoading={reviewsLoading}
        />
        <UserReviewsCard reviews={transformedReviews} isLoading={reviewsLoading} error={reviewsError} />
      </section>
      <section className="shadow-card gap-4 rounded-lg bg-white px-6 py-10 lg:col-span-12">
        <div className="pb-3">
          <h1 className="text-sm font-semibold">Map View</h1>
        </div>
        <div className="border-t border-[#0245a5] py-3"></div>
        <HouseMap
          location={propertyLocation}
          image={propertyImage}
          name={propertyName}
          status={propertyStatus}
          latitude={data?.latitude}
          longitude={data?.longitude}
          rent={data?.contractRate?.rate}
        />
      </section>
    </section>
  );
}

export default PropertyDescription;
