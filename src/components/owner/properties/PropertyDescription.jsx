'use client';
// import ShowMap from '@/components/shared/ShowMap';
import dynamic from 'next/dynamic';
import Description from './Description';
import ReviewsCard from './ReviewsCard';
import UserPropertyCard from './UserPropertyCard';
import UserReviewsCard from './UserReviewsCard';
// import HouseMap from '../../tenant/browserProperty/HouseMap';
const HouseMap = dynamic(() => import('../../tenant/browserProperty/HouseMap'), {
  ssr: false, // Disable SSR for this component (client-side rendering only)
});

// Arrays moved from child components
const reviews = [
  {
    id: 1,
    name: 'Micheal',
    date: '22 Jul',
    image: '/images/properties/Bg.png',
    rating: 4,
    comment:
      'I really liked the location of this rental property. The market and public transport were nearby. The house was clean, and the landlord took care of maintenance on time. The only issue was that the internet speed was a bit slow, but overall, it was a good experience!',
  },
  {
    id: 2,
    name: 'Sarah',
    date: '10 Aug',
    image: '/images/properties/Bg.png',
    rating: 5,
    comment:
      'The apartment was spacious and well-lit. The security measures were impressive, making me feel safe. However, parking was limited, which was a slight inconvenience.',
  },
  {
    id: 3,
    name: 'John',
    date: '5 Sep',
    image: '/images/properties/Bg.png',
    rating: 3,
    comment:
      'Decent place to stay, but the noise levels were high during the night. The location was central, but the rent was slightly overpriced for the amenities offered.',
  },
];

const rentalAgreementDetails = [
  [
    { label: 'Monthly Rent', value: '$1,500' },
    { label: 'Monthly Rent', value: '$1,500' },
    { label: 'Monthly Rent', value: '$1,500' },
  ],
  [
    { label: 'Monthly Rent', value: '$1,500' },
    { label: 'Monthly Rent', value: '$1,500' },
  ],
];

const paymentHistory = [
  [
    { label: 'Last Payment Date', value: '5th Jan 2024' },
    { label: 'Total Amount Paid', value: '$1,500' },
  ],
  [
    { label: 'Next Due Date', value: '5th Jan 2024' },
    { label: 'Pending Amount', value: '$1,500' },
  ],
];

const amenities = [
  [
    { icon: 'Balcony', label: 'Balcony' },
    { icon: 'Balcony', label: 'Big Balcony' },
    { icon: 'Parking', label: 'Parking' },
  ],
  [
    { icon: 'Garden', label: 'Garden' },
    { icon: 'Gym', label: 'Gym' },
    { icon: 'Maids', label: 'Maids Room' },
  ],
  [
    { icon: 'Pool', label: 'Swimming Pool' },
    { icon: 'Internet', label: 'Hi Speed Internet' },
    { icon: 'Private', label: 'Private Garden' },
  ],
  [
    { icon: 'Study', label: 'Study Room' },
    { icon: 'Bath', label: 'Bathtub' },
    { icon: 'Barbeque', label: 'Barbecue Area' },
  ],
];

const furnishing = [
  [{ icon: 'Wardrobe', label: 'Build in Wardrobe' }],
  [{ icon: 'Furnished', label: 'Fully Furnished' }],
  [{ icon: 'Renovated', label: 'Renovated' }],
  [{ icon: 'Theatre', label: 'TV/Home Theatre' }],
];

const security = [
  [{ icon: 'Guard', label: 'Security Guard' }],
  [{ icon: 'Security', label: '24-hour Security' }],
  [{ icon: 'Cctv', label: 'Cctv' }],
];

const views = [
  [{ icon: 'Canal', label: 'Canal View' }],
  [{ icon: 'City', label: 'City View' }],
  [{ icon: 'Garden', label: 'Garden View' }],
  [{ icon: 'GreenView', label: 'Green View' }],
];

function PropertyDescription() {
  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <section className="rounded-lg bg-white px-5 py-3.5 lg:col-span-8">
        <Description
          rentalAgreementDetails={rentalAgreementDetails}
          paymentHistory={paymentHistory}
          amenities={amenities}
          furnishing={furnishing}
          security={security}
          views={views}
        />
      </section>
      <section className="gap-4 rounded-lg bg-white px-6 py-10 lg:col-span-4">
        <UserPropertyCard />
        <ReviewsCard />
        <UserReviewsCard reviews={reviews} />
      </section>
      <section className="gap-4 rounded-lg bg-white px-6 py-10 lg:col-span-12">
        <div className="pb-3">
          <h1 className="text-sm font-semibold">Map View</h1>
        </div>
        <div className="border-t border-[#32343C] py-3"></div>
        {/* <ShowMap /> */}
        <HouseMap
          location={'lahore'}
          image={'/images/browser-property/Properties.png'}
          name={'Dream house'}
          status={'free'}
        />
      </section>
    </section>
  );
}

export default PropertyDescription;
