// import React from 'react';
// import {
//   Balcony,
//   Barbeque,
//   Bath,
//   Canal,
//   Cctv,
//   City,
//   Furnished,
//   Garden,
//   GreenView,
//   Guard,
//   Gym,
//   Internet,
//   Maids,
//   Parking,
//   Pool,
//   Private,
//   Renovated,
//   Security,
//   Study,
//   Theatre,
//   Wardrobe,
// } from '@/assets/icon';

// export default function ViewBuildingDetails() {
//   const payment = [
//     { label: 'Monthly Rent', count: '$1,500' },
//     { label: 'Minimum Lease Duration', count: '1 Month' },
//     { label: 'Security Deposit', count: '$3,000' },
//     { label: 'Renewal Option', count: 'Yes' },
//     { label: 'Renewal Notice', count: '7 Days' },
//   ];
//   const Amenities = [
//     { icon: <Balcony />, label: 'Balcony', count: '$1,500' },
//     { icon: <Balcony />, label: 'Big Balcony', count: '$1,500' },
//     { icon: <Parking />, label: 'Parking', count: '$1,500' },
//     { icon: <Garden />, label: 'Garden', count: '$1,500' },
//     { icon: <Gym />, label: 'Gym', count: '$1,500' },
//     { icon: <Maids />, label: 'Maids Room', count: '$1,500' },
//     { icon: <Pool />, label: 'Swimming Pool', count: '$1,500' },
//     { icon: <Internet />, label: 'Hi Speed Internet', count: '$1,500' },
//     { icon: <Private />, label: 'Private Garden', count: '$1,500' },
//     { icon: <Study />, label: 'Study Room', count: '$1,500' },
//     { icon: <Bath />, label: 'Bathtub', count: '$1,500' },
//     { icon: <Barbeque />, label: 'Barbeque Area', count: '$1,500' },
//   ];
//   const Furnishing = [
//     { icon: <Wardrobe />, label: 'Built in Wardrobe', count: '$1,500' },
//     { icon: <Furnished />, label: 'Fully Furnished', count: '$1,500' },
//     { icon: <Renovated />, label: 'Renovated', count: '$1,500' },
//     { icon: <Theatre />, label: 'TV/Home Theatre', count: '$1,500' },
//   ];
//   const security = [
//     { icon: <Guard />, label: 'Security Guard', count: '$1,500' },
//     { icon: <Security />, label: '24-hour Security', count: '$1,500' },
//     { icon: <Cctv />, label: 'CCTV', count: '$1,500' },
//   ];
//   const Views = [
//     { icon: <Canal />, label: 'Canal View', count: '$1,500' },
//     { icon: <City />, label: 'City View', count: '$1,500' },
//     { icon: <Garden />, label: 'Garden View', count: '$1,500' },
//     { icon: <GreenView />, label: 'Green View', count: '$1,500' },
//   ];
//   return (
//     <div>
//       <h1 className="text-[16px] font-semibold text-[#32343C]">🏡 Key Features:</h1>
//       <div className="mt-3">
//         <h1 className="text-[16px] font-semibold text-[#32343C]">Rental Agreement Details</h1>
//         <div className="my-2 grid grid-cols-1 grid-rows-5 gap-x-5 sm:grid-cols-2 sm:grid-rows-3">
//           {payment.map((item, index) => (
//             <h1 key={index} className="flex items-center justify-between border-b py-2 text-[12px] text-[#5F5F5F]">
//               <span>{item.label}</span>
//               <span>{item.count}</span>
//             </h1>
//           ))}
//         </div>
//         <h1 className="my-2 text-[16px] font-semibold text-[#32343C]">Amenities</h1>
//         <div className="grid grid-cols-1 grid-rows-12 gap-x-5 sm:grid-cols-4 sm:grid-rows-3">
//           {Amenities.map((item, index) => (
//             <h1 className="flex items-center gap-2 border-b py-2 text-[12px] text-[#5F5F5F]">
//               <span>{item.icon}</span>
//               <span>{item.label}</span>
//             </h1>
//           ))}
//         </div>
//         <h1 className="my-2 text-[16px] font-semibold text-[#32343C]">Furnishing</h1>
//         <div className="grid grid-cols-1 grid-rows-4 gap-x-5 sm:grid-cols-4 sm:grid-rows-1">
//           {Furnishing.map((item, index) => (
//             <h1 className="flex items-center gap-2 border-b py-2 text-[12px] text-[#5F5F5F]">
//               <span>{item.icon}</span>
//               <span>{item.label}</span>
//             </h1>
//           ))}
//         </div>
//         <h1 className="my-2 text-[16px] font-semibold text-[#32343C]">Security and Safety</h1>
//         <div className="grid grid-cols-1 grid-rows-3 gap-x-5 sm:grid-cols-3 sm:grid-rows-1">
//           {security.map((item, index) => (
//             <h1 className="flex items-center gap-2 border-b py-2 text-[12px] text-[#5F5F5F]">
//               <span>{item.icon}</span>
//               <span>{item.label}</span>
//             </h1>
//           ))}
//         </div>
//         <h1 className="mt-2 text-[16px] font-semibold text-[#32343C]">Views and Direction</h1>
//         <div className="grid grid-cols-1 grid-rows-4 gap-x-5 sm:grid-cols-4 sm:grid-rows-1">
//           {Views.map((item, index) => (
//             <h1 className="flex items-center gap-2 border-b py-2 text-[12px] text-[#5F5F5F]">
//               <span>{item.icon}</span>
//               <span>{item.label}</span>
//             </h1>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import {
  Balcony,
  Barbeque,
  Bath,
  Canal,
  Cctv,
  City,
  Furnished,
  Garden,
  GreenView,
  Guard,
  Gym,
  Internet,
  Maids,
  Parking,
  Pool,
  Private,
  Renovated,
  Security,
  Study,
  Theatre,
  Wardrobe,
} from '@/assets/icon';

export default function ViewBuildingDetails({ data }) {
  // Map the data to payment details
  const payment = [
    { label: 'Monthly Rent', count: data?.contractRate?.rate ? `$${data.contractRate.rate}` : 'N/A' },
    { label: 'Minimum Lease Duration', count: '1 Month' }, // Default value as not in API
    {
      label: 'Security Deposit',
      count: data?.contractRate?.securityDeposit ? `$${data.contractRate.securityDeposit}` : 'N/A',
    },
    { label: 'Renewal Option', count: 'Yes' }, // Default value as not in API
    { label: 'Renewal Notice', count: '7 Days' }, // Default value as not in API
  ];

  // Map amenities from API data
  const getAmenityIcon = amenity => {
    const iconMap = {
      rooftop_terrace: <Balcony />,
      terrace: <Balcony />,
      parking: <Parking />,
      garden: <Garden />,
      gym: <Gym />,
      maids_room: <Maids />,
      swimming_pool: <Pool />,
      pool: <Pool />,
      private_garden: <Private />,
      study_room: <Study />,
      bathtub: <Bath />,
      barbeque_area: <Barbeque />,
    };
    return iconMap[amenity] || <Garden />; // Default icon
  };

  const getAmenityLabel = amenity => {
    const labelMap = {
      rooftop_terrace: 'Rooftop Terrace',
      terrace: 'Terrace',
      parking: 'Parking',
      garden: 'Garden',
      gym: 'Gym',
      maids_room: 'Maids Room',
      swimming_pool: 'Swimming Pool',
      pool: 'Swimming Pool',
      private_garden: 'Private Garden',
      study_room: 'Study Room',
      bathtub: 'Bathtub',
      barbeque_area: 'Barbeque Area',
    };
    return labelMap[amenity] || amenity.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const Amenities =
    data?.amenities?.map(amenity => ({
      icon: getAmenityIcon(amenity),
      label: getAmenityLabel(amenity),
      count: '', // Remove count as it's not relevant for amenities
    })) || [];

  // Map furnishing from property condition and features
  const getFurnishingItems = () => {
    const items = [];

    // Add based on condition
    if (data?.condition === 'fully_furnished') {
      items.push({ icon: <Furnished />, label: 'Fully Furnished', count: '' });
    }

    // Add based on property features
    data?.propertyFeatures?.forEach(feature => {
      if (feature.toLowerCase().includes('gym')) {
        items.push({ icon: <Gym />, label: 'Private Gym/Fitness Room', count: '' });
      }
      if (feature.toLowerCase().includes('sauna')) {
        items.push({ icon: <Bath />, label: 'Private Sauna', count: '' });
      }
      if (feature.toLowerCase().includes('lift')) {
        items.push({ icon: <Renovated />, label: 'Private Lift', count: '' });
      }
    });

    // Add default items if none found
    if (items.length === 0) {
      items.push(
        { icon: <Wardrobe />, label: 'Built in Wardrobe', count: '' },
        { icon: <Theatre />, label: 'TV/Home Theatre', count: '' }
      );
    }

    return items;
  };

  const Furnishing = getFurnishingItems();

  // Map security features
  const getSecurityIcon = security => {
    const iconMap = {
      cctv: <Cctv />,
      guards: <Guard />,
      security_guard: <Guard />,
      '24_hour_security': <Security />,
    };
    return iconMap[security] || <Security />;
  };

  const getSecurityLabel = security => {
    const labelMap = {
      cctv: 'CCTV',
      guards: 'Security Guard',
      security_guard: 'Security Guard',
      '24_hour_security': '24-hour Security',
    };
    return labelMap[security] || security.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const security =
    data?.security?.map(sec => ({
      icon: getSecurityIcon(sec),
      label: getSecurityLabel(sec),
      count: '',
    })) || [];

  // Map views from property
  const getViewIcon = view => {
    const iconMap = {
      canal_view: <Canal />,
      city_view: <City />,
      skyline_view: <City />,
      garden_view: <Garden />,
      green_view: <GreenView />,
    };
    return iconMap[view] || <City />;
  };

  const getViewLabel = view => {
    const labelMap = {
      canal_view: 'Canal View',
      city_view: 'City View',
      skyline_view: 'Skyline View',
      garden_view: 'Garden View',
      green_view: 'Green View',
    };
    return labelMap[view] || view.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const Views =
    data?.viewFromTheProperty?.map(view => ({
      icon: getViewIcon(view),
      label: getViewLabel(view),
      count: '',
    })) || [];

  // Map rental features
  const getRentalFeatureIcon = feature => {
    const iconMap = {
      high_speed_internet: <Internet />,
      microwave: <Furnished />,
      air_conditioning: <Furnished />,
      washing_machine: <Furnished />,
    };
    return iconMap[feature] || <Furnished />;
  };

  const getRentalFeatureLabel = feature => {
    const labelMap = {
      high_speed_internet: 'Hi Speed Internet',
      microwave: 'Microwave',
      air_conditioning: 'Air Conditioning',
      washing_machine: 'Washing Machine',
    };
    return labelMap[feature] || feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const RentalFeatures =
    data?.rentalFeatures?.map(feature => ({
      icon: getRentalFeatureIcon(feature),
      label: getRentalFeatureLabel(feature),
      count: '',
    })) || [];

  // Combine amenities with rental features for display
  const combinedAmenities = [...Amenities, ...RentalFeatures];

  return (
    <div>
      <h1 className="text-[16px] font-semibold text-[#32343C]">🏡 Key Features:</h1>
      <div className="mt-3">
        <h1 className="text-[16px] font-semibold text-[#32343C]">Rental Agreement Details</h1>
        <div className="my-2 grid grid-cols-1 grid-rows-5 gap-x-5 sm:grid-cols-2 sm:grid-rows-3">
          {payment.map((item, index) => (
            <h1 key={index} className="flex items-center justify-between border-b py-2 text-[12px] text-[#5F5F5F]">
              <span>{item.label}</span>
              <span>{item.count}</span>
            </h1>
          ))}
        </div>

        {combinedAmenities.length > 0 && (
          <>
            <h1 className="my-2 text-[16px] font-semibold text-[#32343C]">Amenities</h1>
            <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-4">
              {combinedAmenities.map((item, index) => (
                <h1 key={index} className="flex items-center gap-2 border-b py-2 text-[12px] text-[#5F5F5F]">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </h1>
              ))}
            </div>
          </>
        )}

        {Furnishing.length > 0 && (
          <>
            <h1 className="my-2 text-[16px] font-semibold text-[#32343C]">Furnishing</h1>
            <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-4">
              {Furnishing.map((item, index) => (
                <h1 key={index} className="flex items-center gap-2 border-b py-2 text-[12px] text-[#5F5F5F]">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </h1>
              ))}
            </div>
          </>
        )}

        {security.length > 0 && (
          <>
            <h1 className="my-2 text-[16px] font-semibold text-[#32343C]">Security and Safety</h1>
            <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-3">
              {security.map((item, index) => (
                <h1 key={index} className="flex items-center gap-2 border-b py-2 text-[12px] text-[#5F5F5F]">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </h1>
              ))}
            </div>
          </>
        )}

        {Views.length > 0 && (
          <>
            <h1 className="mt-2 text-[16px] font-semibold text-[#32343C]">Views and Direction</h1>
            <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-4">
              {Views.map((item, index) => (
                <h1 key={index} className="flex items-center gap-2 border-b py-2 text-[12px] text-[#5F5F5F]">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </h1>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
