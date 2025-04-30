import { useCallback } from 'react';
import Dropdown from '@/components/shared/small/Dropdown';
import DropdownCheckbox from '@/components/shared/small/DropdownCheckbox';

const propertyFeatures = [
  { option: 'Private Gym / Fitness Room', value: 'private_gym_fitness_room' },
  { option: 'Private Lift', value: 'private_lift' },
  { option: 'Private Sauna', value: 'private_sauna' },
  { option: 'Jacuzzi / Hot Tub', value: 'jacuzzi_hot_tub' },
  { option: 'Corner Unit', value: 'corner_unit' },
  { option: 'Maids Quarters / Staff Room', value: 'maids_quarters_staff_room' },
  { option: 'Duplex', value: 'duplex' },
  { option: 'Penthouse', value: 'penthouse' },
  { option: 'Full Western Kitchen', value: 'full_western_kitchen' },
  { option: 'Bathtub', value: 'bathtub' },
  { option: 'Fully Renovated', value: 'fully_renovated' },
  { option: 'Renovated Kitchen', value: 'renovated_kitchen' },
  { option: 'Renovated Bathroom', value: 'renovated_bathroom' },
  { option: 'Smart Home', value: 'smart_home' },
  { option: 'Media Room / Home Theater', value: 'media_room_home_theater' },
  { option: 'Balcony / Outdoor Terrace', value: 'balcony_outdoor_terrace' },
];

const amenities = [
  { option: 'Rooftop Terrace', value: 'rooftop_terrace' },
  { option: 'Terrace', value: 'terrace' },
  { option: 'Outdoor Showers', value: 'outdoor_showers' },
  { option: 'Swimming Pool', value: 'swimming_pool' },
  { option: 'Gym', value: 'gym' },
  { option: 'Pet Area', value: 'pet_area' },
  { option: 'Garden', value: 'garden' },
  { option: 'Jacuzzi', value: 'jacuzzi' },
  { option: 'Security', value: 'security' },
  { option: 'EV Charging Stations', value: 'ev_charging_stations' },
  { option: 'Spa', value: 'spa' },
  { option: 'Cinema', value: 'cinema' },
  { option: 'Smart Building', value: 'smart_building' },
  { option: 'Co-working Space', value: 'co_working_space' },
  { option: 'Retail Store', value: 'retail_store' },
  { option: 'Rooftop Deck', value: 'rooftop_deck' },
  { option: 'Balcony', value: 'balcony' },
  { option: 'Concierge', value: 'concierge' },
  { option: 'Community Garden', value: 'community_garden' },
  { option: 'Laundry Amenities', value: 'laundry_amenities' },
  { option: 'Reading Area', value: 'reading_area' },
  { option: 'Automated Parking', value: 'automated_parking' },
  { option: 'Covered Parking', value: 'covered_parking' },
  { option: 'Open Parking', value: 'open_parking' },
  { option: 'Smart Application', value: 'smart_application' },
  { option: 'Green Space', value: 'green_space' },
  { option: 'Others', value: 'others' },
];

const rentalFeatures = [
  { option: 'High Speed Internet', value: 'high_speed_internet' },
  { option: 'Microwave', value: 'microwave' },
  { option: 'Oven', value: 'oven' },
  { option: 'Cable TV', value: 'cable_tv' },
  { option: 'Air Conditioning', value: 'air_conditioning' },
  { option: 'Dishwasher', value: 'dishwasher' },
  { option: 'Refrigerator', value: 'refrigerator' },
];

const propertyViews = [
  { option: 'Blocked / Obstructed View', value: 'blocked_view' },
  { option: 'Unblocked / Open View', value: 'open_view' },
  { option: 'Panorama View', value: 'panorama_view' },
  { option: 'Skyline View', value: 'skyline_view' },
  { option: 'City View', value: 'city_view' },
  { option: 'River or Canal View', value: 'river_canal_view' },
  { option: 'Pool View', value: 'pool_view' },
  { option: 'Garden View', value: 'garden_view' },
  { option: 'Park View', value: 'park_view' },
  { option: 'Courtyard View', value: 'courtyard_view' },
  { option: 'Lake View', value: 'lake_view' },
  { option: 'Golf Course View', value: 'golf_course_view' },
  { option: 'Sunset View', value: 'sunset_view' },
  { option: 'Sunrise View', value: 'sunrise_view' },
  { option: 'Street View', value: 'street_view' },
  { option: 'Beach View', value: 'beach_view' },
];

const Button = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`cursor-pointer rounded-sm px-5 py-[10px] text-sm font-medium text-white md:text-base ${className}`}
  >
    {children}
  </button>
);

const FeatureAndAmenities = ({ setCurrentStep }) => {
  const handleNext = useCallback(() => setCurrentStep(prevStep => prevStep + 1), [setCurrentStep]);
  const handlePrevious = useCallback(
    () => setCurrentStep(prevStep => prevStep - 1),
    [setCurrentStep]
  );
  const handleSelect = selectedValues => {
    console.log('Checked items:', selectedValues);
  };
  return (
    <div>
      <h4 className="text-textColor text-center text-base font-medium md:text-lg">
        Features & Amenities
      </h4>
      <form className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <DropdownCheckbox label="Property Feature" options={propertyFeatures} shadow />
        </div>

        <div className="lg:col-span-6">
          <DropdownCheckbox label="Amenities" options={amenities} shadow />
        </div>
        <div className="lg:col-span-6">
          <DropdownCheckbox label="Rental Feature" options={rentalFeatures} shadow />
        </div>
        <div className="lg:col-span-6">
          <DropdownCheckbox
            label="View from the property"
            options={propertyViews}
            onSelect={handleSelect}
            defaultText="Select fruits"
          />
          {/* <Dropdown label="View from the property" options={propertyViews} shadow /> */}
        </div>

        <div className="flex justify-end gap-[14px] lg:col-span-12">
          <Button onClick={handlePrevious} className="bg-[#7C848DB2]">
            Previous
          </Button>
          <Button onClick={handleNext} className="bg-primary">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FeatureAndAmenities;
