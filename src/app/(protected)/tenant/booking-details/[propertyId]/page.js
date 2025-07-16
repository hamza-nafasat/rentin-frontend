// 'use client';
// import Button from '@/components/shared/small/Button';
// import Dropdown from '@/components/shared/small/Dropdown';
// import Input from '@/components/shared/small/Input';
// import BrowsePropertyCard from '@/components/tenant/browserProperty/BrowsePropertyCard';
// import { bookingHouses } from '@/data/data';
// import React, { useState } from 'react';
// import { useGetSinglePropertyQuery } from '@/features/property/propertyApi';
// import { use } from 'react';
// import { useParams } from 'next/navigation';

// function BookingDetails() {
//   const parms = useParams();
//   console.log('param', parms);

//   // const { id: propertyId } = use(params);
//   const [showInput1, setShowInput1] = useState(false);
//   const [showInput2, setShowInput2] = useState(false);
//   const [showInput3, setShowInput3] = useState(false);

//   const { data, error, isLoading } = useGetSinglePropertyQuery(parms.propertyId);

//   const handleRentReasonChange1 = e => {
//     setShowInput1(e.target.id === 'rentOther1');
//   };

//   const handleRentReasonChange2 = e => {
//     setShowInput2(e.target.id === 'rentOther2');
//   };

//   const handleRentReasonChange3 = e => {
//     setShowInput3(e.target.id === 'rentOther3');
//   };

//   const reasonOptions1 = [
//     { id: 'vacation1', label: '1(Solo)' },
//     { id: 'study1', label: '2(Couple)' },
//     { id: 'family1', label: '3-5(Family/Small Group)' },
//     { id: 'rentOther1', label: '5+ (Custom)' },
//   ];

//   const reasonOptions2 = [
//     { id: 'remote2', label: 'Vacation/Holiday' },
//     { id: 'relocation2', label: 'Remote Work (Digital Nomad)' },
//     { id: 'healthcare2', label: 'Business/Working Assignment' },
//     { id: 'healthcare', label: 'Retirement/Long-Term Stay' },
//     { id: 'rentOther2', label: 'Other (Specify:)' },
//   ];

//   const reasonOptions3 = [
//     { id: 'business3', label: 'Tourist Visa (TR)' },
//     { id: 'conference3', label: 'Visa on Arrival (VoA)' },
//     { id: 'extended', label: 'Work Permit' },
//     { id: 'extended1', label: 'Digital Nomad Visa (DTV) (New!)' },
//     { id: 'extended2', label: 'Retirement Visa (O-A/O-X)' },
//     { id: 'extended3', label: 'Education Visa (ED)' },
//     { id: 'rentOther3', label: 'Other (Specify:)' },
//   ];

//   const countryOptions = [
//     { option: 'Thailand', value: 'thailand' },
//     { option: 'Japan', value: 'japan' },
//     { option: 'Canada', value: 'canada' },
//     { option: 'Germany', value: 'germany' },
//     { option: 'Brazil', value: 'brazil' },
//     { option: 'Australia', value: 'australia' },
//     { option: 'Others', value: 'others' },
//   ];
//   const cityOptions = [
//     { option: 'Bangkok', value: 'bangkok' },
//     { option: 'Chiang Mai', value: 'chiang_mai' },
//     { option: 'Phuket', value: 'phuket' },
//     { option: 'Pattaya', value: 'pattaya' },
//     { option: 'Ayutthaya', value: 'ayutthaya' },
//     { option: 'Krabi', value: 'krabi' },
//     { option: 'Others', value: 'others' },
//   ];
//   const nationalityOptions = [
//     { option: 'American', value: 'american' },
//     { option: 'British', value: 'british' },
//     { option: 'Canadian', value: 'canadian' },
//     { option: 'Chinese', value: 'chinese' },
//     { option: 'French', value: 'french' },
//     { option: 'German', value: 'german' },
//     { option: 'Indian', value: 'indian' },
//     { option: 'Japanese', value: 'japanese' },
//     { option: 'Pakistani', value: 'pakistani' },
//     { option: 'Thai', value: 'thai' },
//     { option: 'Others', value: 'others' },
//   ];
//   const occupationOptions = [
//     { option: 'Employed', value: 'employed' },
//     { option: 'Self-Employed', value: 'self_employed' },
//     { option: 'Student', value: 'student' },
//     { option: 'Retired', value: 'retired' },
//     { option: 'Digital Nomad', value: 'digital_nomad' },
//     { option: 'Unemployed', value: 'unemployed' },
//     { option: 'Others', value: 'others' },
//   ];
//   console.log('property data', data);

//   return (
//     <div className="rounded-lg bg-white p-6">
//       <div className="flex items-center justify-center">
//         <p className="text-xl font-semibold">Rent Form</p>
//       </div>
//       <div className="mt-6 grid grid-cols-12 gap-6">
//         {/* LEFT COLUMN */}
//         <div className="col-span-12 space-y-4 lg:col-span-4">
//           <div>
//             <BrowsePropertyCard data={data?.data} />
//           </div>
//           <div className="shadow-card rounded-lg border bg-white p-5">
//             <h3 className="text-lg font-semibold">Your booking details</h3>
//             <div className="mt-6 flex items-stretch justify-between space-x-8">
//               <div>
//                 <p className="font-medium">Start Date</p>
//                 <p className="text-lg font-semibold">Sun 27 Apr 2025</p>
//                 <p className="font-medium">14:00-15:00</p>
//               </div>
//               <div className="w-px bg-gray-300" />
//               <div>
//                 <p className="font-medium">End Date</p>
//                 <p className="text-lg font-semibold">Mon 28 Apr 2025</p>
//                 <p className="font-medium">10:00-11:00</p>
//               </div>
//             </div>
//             <div className="mt-4">
//               <h4 className="font-medium">Total Length of Stay:</h4>
//               <h4 className="text-lg font-semibold">1 Month</h4>
//             </div>
//           </div>
//           <div className="shadow-card rounded-lg border bg-white p-5">
//             <h1 className="text-lg font-semibold">Your Price Summary</h1>
//             <div className="mt-6 flex justify-between">
//               <h3 className="font-medium">Rental Amount:</h3>
//               <h3 className="text-base font-bold">$450</h3>
//             </div>
//             <div className="mt-3">
//               <div className="flex justify-between">
//                 <h3 className="font-medium">Security Deposit:</h3>
//                 <h3 className="text-base font-bold">$450</h3>
//               </div>
//               <p className="mt-1 text-xs font-medium text-[#32343CB2]/70">
//                 A security deposit is required at the time of booking and will be fully refunded when you vacate the
//                 property in its original condition.
//               </p>
//             </div>
//             <div className="mt-5 flex justify-between">
//               <h1 className="text-[22px] font-medium">Total Amount</h1>
//               <h1 className="text-[22px] font-medium">$1250</h1>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="col-span-12 lg:col-span-8">
//           <div className="grid grid-cols-12 gap-4">
//             <div className="col-span-12 md:col-span-6">
//               <Input shadow label="Full Legal Name" placeholder="Enter first name" type="text" />
//             </div>
//             <div className="col-span-12 md:col-span-6">
//               <Dropdown label="Current Country" options={countryOptions} />
//             </div>
//             <div className="col-span-12 md:col-span-6">
//               <Dropdown label="City of Residence" options={cityOptions} />
//             </div>
//             <div className="col-span-12 md:col-span-6">
//               <Dropdown label="Nationality" options={nationalityOptions} />
//             </div>
//             <div className="col-span-12">
//               <Dropdown label="Occupation" options={occupationOptions} />
//             </div>
//             <div className="col-span-12 md:col-span-6">
//               <Input shadow label="Start Date" placeholder="Enter Start Date" type="date" />
//             </div>
//             <div className="col-span-12 md:col-span-6">
//               <Input shadow label="End Date" placeholder="Enter End Date" type="date" />
//             </div>
//             <div className="col-span-12 sm:col-span-6">
//               <h1 className="text-[#32343CB2]">Number of Guests Staying</h1>
//               <div className="mt-2.5 grid grid-cols-1 gap-2">
//                 {reasonOptions1.map(({ id, label }) => (
//                   <div key={id} className="flex items-center gap-2">
//                     <input id={id} type="radio" name="rentReason1" onChange={handleRentReasonChange1} />
//                     <label className="text-[13px]" htmlFor={id}>
//                       {label}
//                     </label>
//                   </div>
//                 ))}
//                 {showInput1 && (
//                   <div className="mt-8">
//                     <Input shadow type="text" placeholder="Enter" />
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="col-span-12 sm:col-span-6">
//               <h1 className="text-[#32343CB2]">Primary Reason for Renting</h1>
//               <div className="mt-2.5 grid grid-cols-1 gap-2">
//                 {reasonOptions2.map(({ id, label }) => (
//                   <div key={id} className="flex items-center gap-2">
//                     <input id={id} type="radio" name="rentReason2" onChange={handleRentReasonChange2} />
//                     <label className="text-[13px]" htmlFor={id}>
//                       {label}
//                     </label>
//                   </div>
//                 ))}
//                 {showInput2 && (
//                   <div className="mt-1">
//                     <Input shadow type="text" placeholder="Enter" />
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="col-span-12 sm:col-span-12">
//               <h1 className="text-[#32343CB2]">Visa Type for Thailand</h1>
//               <div className="mt-2.5 flex flex-wrap gap-2">
//                 {reasonOptions3.map(({ id, label }) => (
//                   <div key={id} className="flex items-center gap-1 rounded px-2 py-1">
//                     <input id={id} type="radio" name="rentReason3" onChange={handleRentReasonChange3} />
//                     <label className="text-[13px]" htmlFor={id}>
//                       {label}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//               {showInput3 && (
//                 <div className="mt-1">
//                   <Input shadow type="text" placeholder="Enter" />
//                 </div>
//               )}
//             </div>

//             {/* <div className="col-span-12 md:col-span-6"></div> */}
//           </div>
//           <div className="mt-6">
//             <div>
//               <h1 className="text-base font-semibold">Special requests</h1>
//               <h1 className="text-xs font-semibold text-[#32343CB2]/70">
//                 Special requests cannot be guaranteed – but the property will do its best to meet your needs. You can
//                 always make a special request after your booking is complete!
//               </h1>
//             </div>
//             <div className="mt-5">
//               <h1 className="">
//                 Please write your requests in English or Thai. <span className="text-[10px]">(optional)</span>
//               </h1>
//               <textarea className="h-[200px] w-full rounded-lg border" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Buttons */}
//       <div className="mt-6 flex items-center justify-end">
//         <div className="flex gap-4">
//           <Button cn="!bg-buttonSecondary hover:!bg-gray-500" text="Cancel" />
//           <Button text="Send Rent Request" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookingDetails;

// 'use client';
// import Button from '@/components/shared/small/Button';
// import Dropdown from '@/components/shared/small/Dropdown';
// import Input from '@/components/shared/small/Input';
// import BrowsePropertyCard from '@/components/tenant/browserProperty/BrowsePropertyCard';
// import { bookingHouses } from '@/data/data';
// import React, { useState, useEffect } from 'react';
// import { useGetSinglePropertyQuery } from '@/features/property/propertyApi';
// import { use } from 'react';
// import { useParams } from 'next/navigation';

// // Countries and Cities Data
// const countriesWithCities = {
//   'United States': [
//     'New York',
//     'Los Angeles',
//     'Chicago',
//     'Houston',
//     'Phoenix',
//     'Philadelphia',
//     'San Antonio',
//     'San Diego',
//     'Dallas',
//     'San Jose',
//   ],
//   Canada: [
//     'Toronto',
//     'Vancouver',
//     'Montreal',
//     'Calgary',
//     'Edmonton',
//     'Ottawa',
//     'Winnipeg',
//     'Quebec City',
//     'Hamilton',
//     'Kitchener',
//   ],
//   'United Kingdom': [
//     'London',
//     'Birmingham',
//     'Manchester',
//     'Leeds',
//     'Liverpool',
//     'Sheffield',
//     'Bristol',
//     'Glasgow',
//     'Edinburgh',
//     'Newcastle',
//   ],
//   Australia: [
//     'Sydney',
//     'Melbourne',
//     'Brisbane',
//     'Perth',
//     'Adelaide',
//     'Gold Coast',
//     'Newcastle',
//     'Canberra',
//     'Sunshine Coast',
//     'Wollongong',
//   ],
//   Germany: [
//     'Berlin',
//     'Hamburg',
//     'Munich',
//     'Cologne',
//     'Frankfurt',
//     'Stuttgart',
//     'Düsseldorf',
//     'Dortmund',
//     'Essen',
//     'Leipzig',
//   ],
//   France: [
//     'Paris',
//     'Marseille',
//     'Lyon',
//     'Toulouse',
//     'Nice',
//     'Nantes',
//     'Strasbourg',
//     'Montpellier',
//     'Bordeaux',
//     'Lille',
//   ],
//   Japan: ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto', 'Kawasaki', 'Saitama'],
//   'South Korea': ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Suwon', 'Ulsan', 'Changwon', 'Goyang'],
//   China: [
//     'Beijing',
//     'Shanghai',
//     'Guangzhou',
//     'Shenzhen',
//     'Tianjin',
//     'Wuhan',
//     'Dongguan',
//     'Chengdu',
//     'Nanjing',
//     'Foshan',
//   ],
//   India: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'],
//   Brazil: [
//     'São Paulo',
//     'Rio de Janeiro',
//     'Brasília',
//     'Salvador',
//     'Fortaleza',
//     'Belo Horizonte',
//     'Manaus',
//     'Curitiba',
//     'Recife',
//     'Porto Alegre',
//   ],
//   Mexico: [
//     'Mexico City',
//     'Guadalajara',
//     'Monterrey',
//     'Puebla',
//     'Tijuana',
//     'León',
//     'Juárez',
//     'Torreón',
//     'Querétaro',
//     'San Luis Potosí',
//   ],
//   Thailand: [
//     'Bangkok',
//     'Chiang Mai',
//     'Phuket',
//     'Pattaya',
//     'Ayutthaya',
//     'Krabi',
//     'Hua Hin',
//     'Koh Samui',
//     'Chiang Rai',
//     'Sukhothai',
//   ],
//   Singapore: ['Singapore'],
//   Malaysia: [
//     'Kuala Lumpur',
//     'George Town',
//     'Ipoh',
//     'Shah Alam',
//     'Petaling Jaya',
//     'Klang',
//     'Johor Bahru',
//     'Subang Jaya',
//     'Kota Kinabalu',
//     'Seremban',
//   ],
//   Indonesia: [
//     'Jakarta',
//     'Surabaya',
//     'Bandung',
//     'Medan',
//     'Semarang',
//     'Makassar',
//     'Palembang',
//     'Tangerang',
//     'Depok',
//     'Bekasi',
//   ],
//   Philippines: [
//     'Manila',
//     'Quezon City',
//     'Caloocan',
//     'Davao',
//     'Cebu City',
//     'Zamboanga',
//     'Antipolo',
//     'Taguig',
//     'Pasig',
//     'Cagayan de Oro',
//   ],
//   Vietnam: [
//     'Ho Chi Minh City',
//     'Hanoi',
//     'Da Nang',
//     'Hai Phong',
//     'Can Tho',
//     'Bien Hoa',
//     'Vung Tau',
//     'Nha Trang',
//     'Hue',
//     'Buon Ma Thuot',
//   ],
//   Italy: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Catania'],
//   Spain: [
//     'Madrid',
//     'Barcelona',
//     'Valencia',
//     'Seville',
//     'Zaragoza',
//     'Málaga',
//     'Murcia',
//     'Palma',
//     'Las Palmas',
//     'Bilbao',
//   ],
//   Netherlands: [
//     'Amsterdam',
//     'Rotterdam',
//     'The Hague',
//     'Utrecht',
//     'Eindhoven',
//     'Tilburg',
//     'Groningen',
//     'Almere',
//     'Breda',
//     'Nijmegen',
//   ],
//   Others: ['Other City'],
// };

// function BookingDetails() {
//   const parms = useParams();
//   console.log('param', parms);

//   const [showInput1, setShowInput1] = useState(false);
//   const [showInput2, setShowInput2] = useState(false);
//   const [showInput3, setShowInput3] = useState(false);
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [availableCities, setAvailableCities] = useState([]);
//   const [moveInDate, setMoveInDate] = useState('');
//   const [moveOutDate, setMoveOutDate] = useState('');
//   const [bookingDetails, setBookingDetails] = useState(null);
//   const [priceDetails, setPriceDetails] = useState(null);

//   const { data, error, isLoading } = useGetSinglePropertyQuery(parms.propertyId);

//   // Update cities when country changes
//   useEffect(() => {
//     if (selectedCountry && selectedCountry !== 'others') {
//       const cities = countriesWithCities[selectedCountry] || [];
//       setAvailableCities(cities.map(city => ({ option: city, value: city.toLowerCase().replace(/\s+/g, '_') })));
//     } else {
//       setAvailableCities([]);
//     }
//   }, [selectedCountry]);

//   // Calculate rental details when dates change
//   useEffect(() => {
//     if (moveInDate && moveOutDate && data?.data) {
//       calculateRentalDetails();
//     }
//   }, [moveInDate, moveOutDate, data]);

//   const calculateRentalDetails = () => {
//     if (!moveInDate || !moveOutDate || !data?.data) return;

//     const startDate = new Date(moveInDate);
//     const endDate = new Date(moveOutDate);
//     const timeDiff = endDate - startDate;
//     const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
//     const monthsDiff = daysDiff / 30; // Approximate months

//     if (daysDiff <= 0) return;

//     const property = data.data;
//     const dailyRate = property.contractRate?.rate || 50; // Default daily rate from contractRate
//     const securityDeposit = property.contractRate?.securityDeposit || 450; // Default security deposit from contractRate
//     const deals = property.deals || []; // Array of deals like [{ rent: 22, duration: "2", securityDeposit: 22 }]

//     let totalRent = 0;
//     let applicableDeal = null;
//     let finalSecurityDeposit = securityDeposit;

//     // Sort deals by duration in descending order
//     const sortedDeals = deals.sort((a, b) => parseInt(b.duration) - parseInt(a.duration));

//     // Find applicable deal
//     for (const deal of sortedDeals) {
//       if (monthsDiff >= parseInt(deal.duration)) {
//         applicableDeal = deal;
//         finalSecurityDeposit = deal.securityDeposit; // Use deal's security deposit
//         break;
//       }
//     }

//     if (applicableDeal) {
//       // Calculate rent with deal
//       const dealMonths = parseInt(applicableDeal.duration);
//       const dealRate = applicableDeal.rent;
//       const dealDays = dealMonths * 30;

//       if (daysDiff <= dealDays) {
//         // All days covered by deal
//         totalRent = daysDiff * dealRate;
//       } else {
//         // Some days covered by deal, rest at regular rate
//         const dealPortion = dealDays * dealRate;
//         const remainingDays = daysDiff - dealDays;
//         const remainingPortion = remainingDays * dailyRate;
//         totalRent = dealPortion + remainingPortion;
//       }
//     } else {
//       // No deal applicable, use regular rate
//       totalRent = daysDiff * dailyRate;
//     }

//     const totalAmount = totalRent + finalSecurityDeposit;

//     // Set booking details
//     setBookingDetails({
//       startDate: startDate.toLocaleDateString('en-US', {
//         weekday: 'short',
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//       }),
//       endDate: endDate.toLocaleDateString('en-US', {
//         weekday: 'short',
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//       }),
//       totalDays: daysDiff,
//       totalMonths: Math.ceil(monthsDiff),
//     });

//     // Set price details
//     setPriceDetails({
//       rentalAmount: totalRent,
//       securityDeposit: finalSecurityDeposit,
//       totalAmount: totalAmount,
//       dealApplied: applicableDeal,
//     });
//   };

//   const handleRentReasonChange1 = e => {
//     setShowInput1(e.target.id === 'rentOther1');
//   };

//   const handleRentReasonChange2 = e => {
//     setShowInput2(e.target.id === 'rentOther2');
//   };

//   const handleRentReasonChange3 = e => {
//     setShowInput3(e.target.id === 'rentOther3');
//   };

//   const handleCountryChange = value => {
//     setSelectedCountry(value);
//   };

//   const reasonOptions1 = [
//     { id: 'vacation1', label: '1(Solo)' },
//     { id: 'study1', label: '2(Couple)' },
//     { id: 'family1', label: '3-5(Family/Small Group)' },
//     { id: 'rentOther1', label: '5+ (Custom)' },
//   ];

//   const reasonOptions2 = [
//     { id: 'remote2', label: 'Vacation/Holiday' },
//     { id: 'relocation2', label: 'Remote Work (Digital Nomad)' },
//     { id: 'healthcare2', label: 'Business/Working Assignment' },
//     { id: 'healthcare', label: 'Retirement/Long-Term Stay' },
//     { id: 'rentOther2', label: 'Other (Specify:)' },
//   ];

//   const reasonOptions3 = [
//     { id: 'business3', label: 'Tourist Visa (TR)' },
//     { id: 'conference3', label: 'Visa on Arrival (VoA)' },
//     { id: 'extended', label: 'Work Permit' },
//     { id: 'extended1', label: 'Digital Nomad Visa (DTV) (New!)' },
//     { id: 'extended2', label: 'Retirement Visa (O-A/O-X)' },
//     { id: 'extended3', label: 'Education Visa (ED)' },
//     { id: 'rentOther3', label: 'Other (Specify:)' },
//   ];

//   const countryOptions = Object.keys(countriesWithCities).map(country => ({
//     option: country,
//     value: country === 'Others' ? 'others' : country,
//   }));

//   const nationalityOptions = [
//     { option: 'American', value: 'american' },
//     { option: 'British', value: 'british' },
//     { option: 'Canadian', value: 'canadian' },
//     { option: 'Chinese', value: 'chinese' },
//     { option: 'French', value: 'french' },
//     { option: 'German', value: 'german' },
//     { option: 'Indian', value: 'indian' },
//     { option: 'Japanese', value: 'japanese' },
//     { option: 'Pakistani', value: 'pakistani' },
//     { option: 'Thai', value: 'thai' },
//     { option: 'Others', value: 'others' },
//   ];

//   const occupationOptions = [
//     { option: 'Employed', value: 'employed' },
//     { option: 'Self-Employed', value: 'self_employed' },
//     { option: 'Student', value: 'student' },
//     { option: 'Retired', value: 'retired' },
//     { option: 'Digital Nomad', value: 'digital_nomad' },
//     { option: 'Unemployed', value: 'unemployed' },
//     { option: 'Others', value: 'others' },
//   ];

//   console.log('property data', data);

//   return (
//     <div className="rounded-lg bg-white p-6">
//       <div className="flex items-center justify-center">
//         <p className="text-xl font-semibold">Rent Form</p>
//       </div>
//       <div className="mt-6 grid grid-cols-12 gap-6">
//         {/* LEFT COLUMN */}
//         <div className="col-span-12 space-y-4 lg:col-span-4">
//           <div>
//             <BrowsePropertyCard data={data?.data} />
//           </div>

//           {/* Show booking details only when dates are selected and calculated */}
//           {bookingDetails && (
//             <div className="shadow-card rounded-lg border bg-white p-5">
//               <h3 className="text-lg font-semibold">Your booking details</h3>
//               <div className="mt-6 flex items-stretch justify-between space-x-8">
//                 <div>
//                   <p className="font-medium">Start Date</p>
//                   <p className="text-lg font-semibold">{bookingDetails.startDate}</p>
//                   <p className="font-medium">14:00-15:00</p>
//                 </div>
//                 <div className="w-px bg-gray-300" />
//                 <div>
//                   <p className="font-medium">End Date</p>
//                   <p className="text-lg font-semibold">{bookingDetails.endDate}</p>
//                   <p className="font-medium">10:00-11:00</p>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <h4 className="font-medium">Total Length of Stay:</h4>
//                 <h4 className="text-lg font-semibold">
//                   {bookingDetails.totalDays} days ({bookingDetails.totalMonths} month
//                   {bookingDetails.totalMonths > 1 ? 's' : ''})
//                 </h4>
//               </div>
//             </div>
//           )}

//           {/* Show price summary only when price is calculated */}
//           {priceDetails && (
//             <div className="shadow-card rounded-lg border bg-white p-5">
//               <h1 className="text-lg font-semibold">Your Price Summary</h1>
//               <div className="mt-6 flex justify-between">
//                 <h3 className="font-medium">Rental Amount:</h3>
//                 <h3 className="text-base font-bold">${priceDetails.rentalAmount}</h3>
//               </div>
//               {priceDetails.dealApplied && (
//                 <div className="mt-2 text-xs text-green-600">
//                   Deal applied: {priceDetails.dealApplied.duration} month deal at ${priceDetails.dealApplied.rent}/day
//                 </div>
//               )}
//               <div className="mt-3">
//                 <div className="flex justify-between">
//                   <h3 className="font-medium">Security Deposit:</h3>
//                   <h3 className="text-base font-bold">${priceDetails.securityDeposit}</h3>
//                 </div>
//                 <p className="mt-1 text-xs font-medium text-[#32343CB2]/70">
//                   A security deposit is required at the time of booking and will be fully refunded when you vacate the
//                   property in its original condition.
//                 </p>
//               </div>
//               <div className="mt-5 flex justify-between">
//                 <h1 className="text-[22px] font-medium">Total Amount</h1>
//                 <h1 className="text-[22px] font-medium">${priceDetails.totalAmount}</h1>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="col-span-12 lg:col-span-8">
//           <div className="grid grid-cols-12 gap-4">
//             <div className="col-span-12 md:col-span-6">
//               <Input shadow label="Full Legal Name" placeholder="Enter first name" type="text" />
//             </div>
//             <div className="col-span-12 md:col-span-6">
//               <Dropdown label="Current Country" options={countryOptions} onChange={handleCountryChange} />
//             </div>
//             <div className="col-span-12 md:col-span-6">
//               <Dropdown
//                 label="City of Residence"
//                 options={availableCities}
//                 disabled={!selectedCountry || selectedCountry === 'others'}
//               />
//             </div>
//             <div className="col-span-12 md:col-span-6">
//               <Dropdown label="Nationality" options={nationalityOptions} />
//             </div>
//             <div className="col-span-12">
//               <Dropdown label="Occupation" options={occupationOptions} />
//             </div>
//             <div className="col-span-12 md:col-span-6">
//               <Input
//                 shadow
//                 label="Start Date"
//                 placeholder="Enter Start Date"
//                 type="date"
//                 value={moveInDate}
//                 onChange={e => setMoveInDate(e.target.value)}
//               />
//             </div>
//             <div className="col-span-12 md:col-span-6">
//               <Input
//                 shadow
//                 label="End Date"
//                 placeholder="Enter End Date"
//                 type="date"
//                 value={moveOutDate}
//                 onChange={e => setMoveOutDate(e.target.value)}
//               />
//             </div>
//             <div className="col-span-12 sm:col-span-6">
//               <h1 className="text-[#32343CB2]">Number of Guests Staying</h1>
//               <div className="mt-2.5 grid grid-cols-1 gap-2">
//                 {reasonOptions1.map(({ id, label }) => (
//                   <div key={id} className="flex items-center gap-2">
//                     <input id={id} type="radio" name="rentReason1" onChange={handleRentReasonChange1} />
//                     <label className="text-[13px]" htmlFor={id}>
//                       {label}
//                     </label>
//                   </div>
//                 ))}
//                 {showInput1 && (
//                   <div className="mt-8">
//                     <Input shadow type="text" placeholder="Enter custom number" />
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="col-span-12 sm:col-span-6">
//               <h1 className="text-[#32343CB2]">Primary Reason for Renting</h1>
//               <div className="mt-2.5 grid grid-cols-1 gap-2">
//                 {reasonOptions2.map(({ id, label }) => (
//                   <div key={id} className="flex items-center gap-2">
//                     <input id={id} type="radio" name="rentReason2" onChange={handleRentReasonChange2} />
//                     <label className="text-[13px]" htmlFor={id}>
//                       {label}
//                     </label>
//                   </div>
//                 ))}
//                 {showInput2 && (
//                   <div className="mt-1">
//                     <Input shadow type="text" placeholder="Specify other reason" />
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="col-span-12 sm:col-span-12">
//               <h1 className="text-[#32343CB2]">Visa Type for Thailand</h1>
//               <div className="mt-2.5 flex flex-wrap gap-2">
//                 {reasonOptions3.map(({ id, label }) => (
//                   <div key={id} className="flex items-center gap-1 rounded px-2 py-1">
//                     <input id={id} type="radio" name="rentReason3" onChange={handleRentReasonChange3} />
//                     <label className="text-[13px]" htmlFor={id}>
//                       {label}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//               {showInput3 && (
//                 <div className="mt-1">
//                   <Input shadow type="text" placeholder="Specify other visa type" />
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="mt-6">
//             <div>
//               <h1 className="text-base font-semibold">Special requests</h1>
//               <h1 className="text-xs font-semibold text-[#32343CB2]/70">
//                 Special requests cannot be guaranteed – but the property will do its best to meet your needs. You can
//                 always make a special request after your booking is complete!
//               </h1>
//             </div>
//             <div className="mt-5">
//               <h1 className="">
//                 Please write your requests in English or Thai. <span className="text-[10px]">(optional)</span>
//               </h1>
//               <textarea className="h-[200px] w-full rounded-lg border" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Buttons */}
//       <div className="mt-6 flex items-center justify-end">
//         <div className="flex gap-4">
//           <Button cn="!bg-buttonSecondary hover:!bg-gray-500" text="Cancel" />
//           <Button text="Send Rent Request" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookingDetails;

// 'use client';
// import Button from '@/components/shared/small/Button';
// import Dropdown from '@/components/shared/small/Dropdown';
// import Input from '@/components/shared/small/Input';
// import BrowsePropertyCard from '@/components/tenant/browserProperty/BrowsePropertyCard';
// import { bookingHouses } from '@/data/data';
// import React, { useState, useEffect } from 'react';
// import { useGetSinglePropertyQuery } from '@/features/property/propertyApi';
// import { use } from 'react';
// import { useParams } from 'next/navigation';

// function BookingDetails() {
//   const parms = useParams();
//   console.log('param', parms);

//   const [showInput1, setShowInput1] = useState(false);
//   const [showInput2, setShowInput2] = useState(false);
//   const [showInput3, setShowInput3] = useState(false);
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [selectedCountryCode, setSelectedCountryCode] = useState('');
//   const [countries, setCountries] = useState([]);
//   const [availableCities, setAvailableCities] = useState([]);
//   const [loadingCountries, setLoadingCountries] = useState(true);
//   const [loadingCities, setLoadingCities] = useState(false);
//   const [moveInDate, setMoveInDate] = useState('');
//   const [moveOutDate, setMoveOutDate] = useState('');
//   const [bookingDetails, setBookingDetails] = useState(null);
//   const [priceDetails, setPriceDetails] = useState(null);

//   const { data, error, isLoading } = useGetSinglePropertyQuery(parms.propertyId);

//   // Fetch countries on component mount
//   useEffect(() => {
//     fetchCountries();
//   }, []);

//   // Fetch cities when country changes
//   useEffect(() => {
//     if (selectedCountryCode) {
//       fetchCities(selectedCountryCode);
//     } else {
//       setAvailableCities([]);
//     }
//   }, [selectedCountryCode]);

//   // Calculate rental details when dates change
//   useEffect(() => {
//     if (moveInDate && moveOutDate && data?.data) {
//       calculateRentalDetails();
//     }
//   }, [moveInDate, moveOutDate, data]);

//   // Fetch countries from REST Countries API
//   const fetchCountries = async () => {
//     try {
//       setLoadingCountries(true);
//       const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2');
//       const data = await response.json();

//       // Sort countries alphabetically and format for dropdown
//       const formattedCountries = data
//         .sort((a, b) => a.name.common.localeCompare(b.name.common))
//         .map(country => ({
//           option: country.name.common,
//           value: country.cca2, // Use country code as value
//           code: country.cca2,
//         }));

//       setCountries(formattedCountries);
//     } catch (error) {
//       console.error('Error fetching countries:', error);
//       // Fallback to a basic list if API fails
//       setCountries([
//         { option: 'United States', value: 'US', code: 'US' },
//         { option: 'Canada', value: 'CA', code: 'CA' },
//         { option: 'United Kingdom', value: 'GB', code: 'GB' },
//         { option: 'Australia', value: 'AU', code: 'AU' },
//         { option: 'Germany', value: 'DE', code: 'DE' },
//       ]);
//     } finally {
//       setLoadingCountries(false);
//     }
//   };

//   // Fetch cities using GeoDB Cities API (free tier)
//   const fetchCities = async countryCode => {
//     try {
//       setLoadingCities(true);
//       setAvailableCities([]);

//       // Using GeoDB Cities API - free tier allows 1000 requests/day
//       const response = await fetch(
//         `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryCode}/cities?limit=50&sort=name`,
//         {
//           headers: {
//             'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || 'YOUR_RAPIDAPI_KEY',
//             'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch cities');
//       }

//       const data = await response.json();
//       const formattedCities = data.data.map(city => ({
//         option: city.name,
//         value: city.name.toLowerCase().replace(/\s+/g, '_'),
//       }));

//       setAvailableCities(formattedCities);
//     } catch (error) {
//       console.error('Error fetching cities:', error);
//       // Fallback to alternative API or show error message
//       await fetchCitiesAlternative(countryCode);
//     } finally {
//       setLoadingCities(false);
//     }
//   };

//   // Alternative method using a different API or fallback
//   const fetchCitiesAlternative = async countryCode => {
//     try {
//       // Alternative: Using REST Countries API to get just the capital
//       const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}?fields=capital`);
//       const data = await response.json();

//       if (data.capital && data.capital.length > 0) {
//         setAvailableCities([
//           {
//             option: data.capital[0],
//             value: data.capital[0].toLowerCase().replace(/\s+/g, '_'),
//           },
//         ]);
//       }
//     } catch (error) {
//       console.error('Error fetching cities from alternative source:', error);
//       // Final fallback - allow manual entry
//       setAvailableCities([
//         {
//           option: 'Other City',
//           value: 'other',
//         },
//       ]);
//     }
//   };

//   // Alternative implementation using a different cities API
//   const fetchCitiesWithCountryStateCity = async countryCode => {
//     try {
//       setLoadingCities(true);
//       // Using CountryStateCity API (if you have access)
//       const response = await fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/cities`, {
//         headers: {
//           'X-CSCAPI-KEY': process.env.NEXT_PUBLIC_CSC_API_KEY || 'YOUR_CSC_API_KEY',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch cities');
//       }

//       const cities = await response.json();
//       const formattedCities = cities.map(city => ({
//         option: city.name,
//         value: city.name.toLowerCase().replace(/\s+/g, '_'),
//       }));

//       setAvailableCities(formattedCities);
//     } catch (error) {
//       console.error('Error fetching cities:', error);
//       await fetchCitiesAlternative(countryCode);
//     } finally {
//       setLoadingCities(false);
//     }
//   };

//   const calculateRentalDetails = () => {
//     if (!moveInDate || !moveOutDate || !data?.data) return;

//     const startDate = new Date(moveInDate);
//     const endDate = new Date(moveOutDate);
//     const timeDiff = endDate - startDate;
//     const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

//     // Calculate actual calendar months between dates
//     const actualCalendarMonths =
//       (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());

//     // If there are remaining days beyond complete months, count as additional month
//     const remainingDays = endDate.getDate() - startDate.getDate();
//     const totalCalendarMonths = actualCalendarMonths + (remainingDays > 0 ? 1 : 0);

//     if (daysDiff <= 0) return;

//     const property = data.data;
//     const dailyRate = property.contractRate?.rate || 50;
//     const securityDeposit = property.contractRate?.securityDeposit || 450;
//     const deals = property.deals || [];

//     let totalRent = 0;
//     let applicableDeal = null;
//     let finalSecurityDeposit = securityDeposit;

//     // Sort deals by duration (longest first)
//     const sortedDeals = deals.slice().sort((a, b) => parseInt(b.duration) - parseInt(a.duration));

//     // Find the applicable deal based on calendar months
//     for (const deal of sortedDeals) {
//       if (totalCalendarMonths >= parseInt(deal.duration)) {
//         applicableDeal = deal;
//         finalSecurityDeposit = deal.securityDeposit;
//         break;
//       }
//     }

//     if (applicableDeal) {
//       const monthlyRate = applicableDeal.rent; // This is monthly rate

//       // Calculate rent based on actual calendar months
//       totalRent = totalCalendarMonths * monthlyRate;
//     } else {
//       // No deal applies, use daily rate
//       totalRent = daysDiff * dailyRate;
//     }

//     const totalAmount = totalRent + finalSecurityDeposit;

//     setBookingDetails({
//       startDate: startDate.toLocaleDateString('en-US', {
//         weekday: 'short',
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//       }),
//       endDate: endDate.toLocaleDateString('en-US', {
//         weekday: 'short',
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//       }),
//       totalDays: daysDiff,
//       totalMonths: totalCalendarMonths,
//     });

//     setPriceDetails({
//       rentalAmount: totalRent,
//       securityDeposit: finalSecurityDeposit,
//       totalAmount: totalAmount,
//       dealApplied: applicableDeal,
//     });
//   };

//   const handleRentReasonChange1 = e => {
//     setShowInput1(e.target.id === 'rentOther1');
//   };

//   const handleRentReasonChange2 = e => {
//     setShowInput2(e.target.id === 'rentOther2');
//   };

//   const handleRentReasonChange3 = e => {
//     setShowInput3(e.target.id === 'rentOther3');
//   };

//   const handleCountryChange = value => {
//     const selectedCountryData = countries.find(country => country.value === value);
//     setSelectedCountry(selectedCountryData?.option || '');
//     setSelectedCountryCode(value);
//   };

//   const reasonOptions1 = [
//     { id: 'vacation1', label: '1(Solo)' },
//     { id: 'study1', label: '2(Couple)' },
//     { id: 'family1', label: '3-5(Family/Small Group)' },
//     { id: 'rentOther1', label: '5+ (Custom)' },
//   ];

//   const reasonOptions2 = [
//     { id: 'remote2', label: 'Vacation/Holiday' },
//     { id: 'relocation2', label: 'Remote Work (Digital Nomad)' },
//     { id: 'healthcare2', label: 'Business/Working Assignment' },
//     { id: 'healthcare', label: 'Retirement/Long-Term Stay' },
//     { id: 'rentOther2', label: 'Other (Specify:)' },
//   ];

//   const reasonOptions3 = [
//     { id: 'business3', label: 'Tourist Visa (TR)' },
//     { id: 'conference3', label: 'Visa on Arrival (VoA)' },
//     { id: 'extended', label: 'Work Permit' },
//     { id: 'extended1', label: 'Digital Nomad Visa (DTV) (New!)' },
//     { id: 'extended2', label: 'Retirement Visa (O-A/O-X)' },
//     { id: 'extended3', label: 'Education Visa (ED)' },
//     { id: 'rentOther3', label: 'Other (Specify:)' },
//   ];

//   const nationalityOptions = [
//     { option: 'American', value: 'american' },
//     { option: 'British', value: 'british' },
//     { option: 'Canadian', value: 'canadian' },
//     { option: 'Chinese', value: 'chinese' },
//     { option: 'French', value: 'french' },
//     { option: 'German', value: 'german' },
//     { option: 'Indian', value: 'indian' },
//     { option: 'Japanese', value: 'japanese' },
//     { option: 'Pakistani', value: 'pakistani' },
//     { option: 'Thai', value: 'thai' },
//     { option: 'Others', value: 'others' },
//   ];

//   const occupationOptions = [
//     { option: 'Employed', value: 'employed' },
//     { option: 'Self-Employed', value: 'self_employed' },
//     { option: 'Student', value: 'student' },
//     { option: 'Retired', value: 'retired' },
//     { option: 'Digital Nomad', value: 'digital_nomad' },
//     { option: 'Unemployed', value: 'unemployed' },
//     { option: 'Others', value: 'others' },
//   ];

//   console.log('property data', data);

//   return (
//     <div className="rounded-lg bg-white p-6">
//       <div className="flex items-center justify-center">
//         <p className="text-xl font-semibold">Rent Form</p>
//       </div>
//       <div className="mt-6 grid grid-cols-12 gap-6">
//         {/* LEFT COLUMN */}
//         <div className="col-span-12 space-y-4 lg:col-span-4">
//           <div>
//             <BrowsePropertyCard data={data?.data} />
//           </div>

//           {/* Show booking details only when dates are selected and calculated */}
//           {bookingDetails && (
//             <div className="shadow-card rounded-lg border bg-white p-5">
//               <h3 className="text-lg font-semibold">Your booking details</h3>
//               <div className="mt-6 flex items-stretch justify-between space-x-8">
//                 <div>
//                   <p className="font-medium">Start Date</p>
//                   <p className="text-lg font-semibold">{bookingDetails.startDate}</p>
//                   <p className="font-medium">14:00-15:00</p>
//                 </div>
//                 <div className="w-px bg-gray-300" />
//                 <div>
//                   <p className="font-medium">End Date</p>
//                   <p className="text-lg font-semibold">{bookingDetails.endDate}</p>
//                   <p className="font-medium">10:00-11:00</p>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <h4 className="font-medium">Total Length of Stay:</h4>
//                 <h4 className="text-lg font-semibold">
//                   {bookingDetails.totalDays} days ({bookingDetails.totalMonths} month
//                   {bookingDetails.totalMonths > 1 ? 's' : ''})
//                 </h4>
//               </div>
//             </div>
//           )}

//           {/* Show price summary only when price is calculated */}
//           {priceDetails && (
//             <div className="shadow-card rounded-lg border bg-white p-5">
//               <h1 className="text-lg font-semibold">Your Price Summary</h1>
//               <div className="mt-6 flex justify-between">
//                 <h3 className="font-medium">Rental Amount:</h3>
//                 <h3 className="text-base font-bold">${priceDetails.rentalAmount}</h3>
//               </div>
//               {priceDetails.dealApplied && (
//                 <div className="mt-2 text-xs text-green-600">
//                   Deal applied: {priceDetails.dealApplied.duration} month deal at ${priceDetails.dealApplied.rent}/day
//                 </div>
//               )}
//               <div className="mt-3">
//                 <div className="flex justify-between">
//                   <h3 className="font-medium">Security Deposit:</h3>
//                   <h3 className="text-base font-bold">${priceDetails.securityDeposit}</h3>
//                 </div>
//                 <p className="mt-1 text-xs font-medium text-[#32343CB2]/70">
//                   A security deposit is required at the time of booking and will be fully refunded when you vacate the
//                   property in its original condition.
//                 </p>
//               </div>
//               <div className="mt-5 flex justify-between">
//                 <h1 className="text-[22px] font-medium">Total Amount</h1>
//                 <h1 className="text-[22px] font-medium">${priceDetails.totalAmount}</h1>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="col-span-12 lg:col-span-8">
//           <div className="grid grid-cols-12 gap-4">
//             <div className="col-span-12 md:col-span-6">
//               <Input shadow label="Full Legal Name" placeholder="Enter first name" type="text" />
//             </div>
//             <div className="col-span-12 md:col-span-6">
//               <Dropdown
//                 label="Current Country"
//                 options={countries}
//                 onChange={handleCountryChange}
//                 loading={loadingCountries}
//                 placeholder={loadingCountries ? 'Loading countries...' : 'Select country'}
//               />
//             </div>
//             <div className="col-span-12 md:col-span-6">
//               <Dropdown
//                 label="City of Residence"
//                 options={availableCities}
//                 disabled={!selectedCountryCode}
//                 loading={loadingCities}
//                 placeholder={
//                   !selectedCountryCode ? 'Select country first' : loadingCities ? 'Loading cities...' : 'Select city'
//                 }
//               />
//             </div>
//             <div className="col-span-12 md:col-span-6">
//               <Dropdown label="Nationality" options={nationalityOptions} />
//             </div>
//             <div className="col-span-12">
//               <Dropdown label="Occupation" options={occupationOptions} />
//             </div>
//             <div className="col-span-12 md:col-span-6">
//               <Input
//                 shadow
//                 label="Start Date"
//                 placeholder="Enter Start Date"
//                 type="date"
//                 value={moveInDate}
//                 onChange={e => setMoveInDate(e.target.value)}
//               />
//             </div>
//             <div className="col-span-12 md:col-span-6">
//               <Input
//                 shadow
//                 label="End Date"
//                 placeholder="Enter End Date"
//                 type="date"
//                 value={moveOutDate}
//                 onChange={e => setMoveOutDate(e.target.value)}
//               />
//             </div>
//             <div className="col-span-12 sm:col-span-6">
//               <h1 className="text-[#32343CB2]">Number of Guests Staying</h1>
//               <div className="mt-2.5 grid grid-cols-1 gap-2">
//                 {reasonOptions1.map(({ id, label }) => (
//                   <div key={id} className="flex items-center gap-2">
//                     <input id={id} type="radio" name="rentReason1" onChange={handleRentReasonChange1} />
//                     <label className="text-[13px]" htmlFor={id}>
//                       {label}
//                     </label>
//                   </div>
//                 ))}
//                 {showInput1 && (
//                   <div className="mt-8">
//                     <Input shadow type="text" placeholder="Enter custom number" />
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="col-span-12 sm:col-span-6">
//               <h1 className="text-[#32343CB2]">Primary Reason for Renting</h1>
//               <div className="mt-2.5 grid grid-cols-1 gap-2">
//                 {reasonOptions2.map(({ id, label }) => (
//                   <div key={id} className="flex items-center gap-2">
//                     <input id={id} type="radio" name="rentReason2" onChange={handleRentReasonChange2} />
//                     <label className="text-[13px]" htmlFor={id}>
//                       {label}
//                     </label>
//                   </div>
//                 ))}
//                 {showInput2 && (
//                   <div className="mt-1">
//                     <Input shadow type="text" placeholder="Specify other reason" />
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="col-span-12 sm:col-span-12">
//               <h1 className="text-[#32343CB2]">Visa Type for Thailand</h1>
//               <div className="mt-2.5 flex flex-wrap gap-2">
//                 {reasonOptions3.map(({ id, label }) => (
//                   <div key={id} className="flex items-center gap-1 rounded px-2 py-1">
//                     <input id={id} type="radio" name="rentReason3" onChange={handleRentReasonChange3} />
//                     <label className="text-[13px]" htmlFor={id}>
//                       {label}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//               {showInput3 && (
//                 <div className="mt-1">
//                   <Input shadow type="text" placeholder="Specify other visa type" />
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="mt-6">
//             <div>
//               <h1 className="text-base font-semibold">Special requests</h1>
//               <h1 className="text-xs font-semibold text-[#32343CB2]/70">
//                 Special requests cannot be guaranteed – but the property will do its best to meet your needs. You can
//                 always make a special request after your booking is complete!
//               </h1>
//             </div>
//             <div className="mt-5">
//               <h1 className="">
//                 Please write your requests in English or Thai. <span className="text-[10px]">(optional)</span>
//               </h1>
//               <textarea className="h-[200px] w-full rounded-lg border" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Buttons */}
//       <div className="mt-6 flex items-center justify-end">
//         <div className="flex gap-4">
//           <Button cn="!bg-buttonSecondary hover:!bg-gray-500" text="Cancel" />
//           <Button text="Send Rent Request" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookingDetails;

// 'use client';
// import Button from '@/components/shared/small/Button';
// import Dropdown from '@/components/shared/small/Dropdown';
// import Input from '@/components/shared/small/Input';
// import BrowsePropertyCard from '@/components/tenant/browserProperty/BrowsePropertyCard';
// import { bookingHouses } from '@/data/data';
// import React, { useState, useEffect } from 'react';
// import { useGetSinglePropertyQuery } from '@/features/property/propertyApi';
// import { use } from 'react';
// import { useParams } from 'next/navigation';

// function BookingDetails() {
//   const parms = useParams();
//   console.log('param', parms);

//   const [showInput1, setShowInput1] = useState(false);
//   const [showInput2, setShowInput2] = useState(false);
//   const [showInput3, setShowInput3] = useState(false);
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [selectedCountryCode, setSelectedCountryCode] = useState('');
//   const [countries, setCountries] = useState([]);
//   const [availableCities, setAvailableCities] = useState([]);
//   const [nationalities, setNationalities] = useState([]);
//   const [loadingCountries, setLoadingCountries] = useState(true);
//   const [loadingCities, setLoadingCities] = useState(false);
//   const [loadingNationalities, setLoadingNationalities] = useState(true);
//   const [moveInDate, setMoveInDate] = useState('');
//   const [moveOutDate, setMoveOutDate] = useState('');
//   const [bookingDetails, setBookingDetails] = useState(null);
//   const [priceDetails, setPriceDetails] = useState(null);

//   const { data, error, isLoading } = useGetSinglePropertyQuery(parms.propertyId);

//   // Fetch countries and nationalities on component mount
//   useEffect(() => {
//     fetchCountries();
//     fetchNationalities();
//   }, []);

//   // Fetch cities when country changes
//   useEffect(() => {
//     if (selectedCountryCode) {
//       fetchCities(selectedCountryCode);
//     } else {
//       setAvailableCities([]);
//     }
//   }, [selectedCountryCode]);

//   // Calculate rental details when dates change
//   useEffect(() => {
//     if (moveInDate && moveOutDate && data?.data) {
//       calculateRentalDetails();
//     }
//   }, [moveInDate, moveOutDate, data]);

//   // Fetch countries from REST Countries API
//   const fetchCountries = async () => {
//     try {
//       setLoadingCountries(true);
//       const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2');
//       const data = await response.json();

//       // Sort countries alphabetically and format for dropdown
//       const formattedCountries = data
//         .sort((a, b) => a.name.common.localeCompare(b.name.common))
//         .map(country => ({
//           option: country.name.common,
//           value: country.cca2,
//           code: country.cca2,
//         }));

//       setCountries(formattedCountries);
//     } catch (error) {
//       console.error('Error fetching countries:', error);
//       // Fallback to a basic list if API fails
//       setCountries([
//         { option: 'United States', value: 'US', code: 'US' },
//         { option: 'Canada', value: 'CA', code: 'CA' },
//         { option: 'United Kingdom', value: 'GB', code: 'GB' },
//         { option: 'Australia', value: 'AU', code: 'AU' },
//         { option: 'Germany', value: 'DE', code: 'DE' },
//       ]);
//     } finally {
//       setLoadingCountries(false);
//     }
//   };

//   // Fetch nationalities from REST Countries API
//   const fetchNationalities = async () => {
//     try {
//       setLoadingNationalities(true);
//       const response = await fetch('https://restcountries.com/v3.1/all?fields=name,demonyms');
//       const data = await response.json();

//       // Extract nationalities and format for dropdown
//       const formattedNationalities = data
//         .filter(country => country.demonyms && country.demonyms.eng)
//         .map(country => {
//           const nationality = country.demonyms.eng.m || country.demonyms.eng.f;
//           return {
//             option: nationality,
//             value: nationality.toLowerCase().replace(/\s+/g, '_'),
//             country: country.name.common,
//           };
//         })
//         .filter(item => item.option) // Remove entries without nationality
//         .sort((a, b) => a.option.localeCompare(b.option))
//         // Remove duplicates
//         .reduce((acc, current) => {
//           const isDuplicate = acc.find(item => item.value === current.value);
//           if (!isDuplicate) {
//             acc.push(current);
//           }
//           return acc;
//         }, []);

//       setNationalities(formattedNationalities);
//     } catch (error) {
//       console.error('Error fetching nationalities:', error);
//       // Fallback to basic nationalities if API fails
//       setNationalities([
//         { option: 'American', value: 'american' },
//         { option: 'British', value: 'british' },
//         { option: 'Canadian', value: 'canadian' },
//         { option: 'Chinese', value: 'chinese' },
//         { option: 'French', value: 'french' },
//         { option: 'German', value: 'german' },
//         { option: 'Indian', value: 'indian' },
//         { option: 'Japanese', value: 'japanese' },
//         { option: 'Pakistani', value: 'pakistani' },
//         { option: 'Thai', value: 'thai' },
//         { option: 'Others', value: 'others' },
//       ]);
//     } finally {
//       setLoadingNationalities(false);
//     }
//   };

//   // Primary method: Using GeoNames API (free, no API key required)
//   const fetchCities = async countryCode => {
//     try {
//       setLoadingCities(true);
//       setAvailableCities([]);

//       // Using GeoNames API - free and reliable
//       const response = await fetch(
//         `http://api.geonames.org/searchJSON?country=${countryCode}&featureClass=P&maxRows=100&username=demo`
//       );

//       if (!response.ok) {
//         throw new Error('GeoNames API failed');
//       }

//       const data = await response.json();

//       if (data.geonames && data.geonames.length > 0) {
//         const formattedCities = data.geonames
//           .map(city => ({
//             option: city.name,
//             value: city.name.toLowerCase().replace(/\s+/g, '_'),
//             population: city.population || 0,
//           }))
//           .sort((a, b) => b.population - a.population) // Sort by population (largest first)
//           .slice(0, 50); // Limit to top 50 cities

//         setAvailableCities(formattedCities);
//         return;
//       }
//     } catch (error) {
//       console.error('Error fetching cities from GeoNames:', error);
//     }

//     // Fallback to alternative methods
//     await fetchCitiesAlternative(countryCode);
//   };

//   // Alternative method 1: Using REST Countries API for capitals + major cities
//   const fetchCitiesAlternative = async countryCode => {
//     try {
//       const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}?fields=capital,name`);
//       const data = await response.json();

//       const cities = [];

//       // Add capital(s)
//       if (data.capital && data.capital.length > 0) {
//         data.capital.forEach(capital => {
//           cities.push({
//             option: capital,
//             value: capital.toLowerCase().replace(/\s+/g, '_'),
//             isCapital: true,
//           });
//         });
//       }

//       // Add some major cities based on country (you can expand this)
//       const majorCities = getMajorCitiesByCountry(countryCode);
//       majorCities.forEach(city => {
//         if (!cities.find(c => c.value === city.value)) {
//           cities.push(city);
//         }
//       });

//       // If we have cities, use them
//       if (cities.length > 0) {
//         setAvailableCities(cities);
//         return;
//       }
//     } catch (error) {
//       console.error('Error fetching cities from REST Countries:', error);
//     }

//     // Final fallback
//     await fetchCitiesFinalFallback(countryCode);
//   };

//   // Get major cities for common countries (you can expand this list)
//   const getMajorCitiesByCountry = countryCode => {
//     const cityMap = {
//       US: [
//         { option: 'New York', value: 'new_york' },
//         { option: 'Los Angeles', value: 'los_angeles' },
//         { option: 'Chicago', value: 'chicago' },
//         { option: 'Houston', value: 'houston' },
//         { option: 'Phoenix', value: 'phoenix' },
//         { option: 'Philadelphia', value: 'philadelphia' },
//         { option: 'San Antonio', value: 'san_antonio' },
//         { option: 'San Diego', value: 'san_diego' },
//         { option: 'Dallas', value: 'dallas' },
//         { option: 'San Jose', value: 'san_jose' },
//       ],
//       GB: [
//         { option: 'London', value: 'london' },
//         { option: 'Birmingham', value: 'birmingham' },
//         { option: 'Manchester', value: 'manchester' },
//         { option: 'Glasgow', value: 'glasgow' },
//         { option: 'Liverpool', value: 'liverpool' },
//         { option: 'Edinburgh', value: 'edinburgh' },
//         { option: 'Leeds', value: 'leeds' },
//         { option: 'Sheffield', value: 'sheffield' },
//       ],
//       CA: [
//         { option: 'Toronto', value: 'toronto' },
//         { option: 'Montreal', value: 'montreal' },
//         { option: 'Vancouver', value: 'vancouver' },
//         { option: 'Calgary', value: 'calgary' },
//         { option: 'Edmonton', value: 'edmonton' },
//         { option: 'Ottawa', value: 'ottawa' },
//         { option: 'Winnipeg', value: 'winnipeg' },
//         { option: 'Quebec City', value: 'quebec_city' },
//       ],
//       AU: [
//         { option: 'Sydney', value: 'sydney' },
//         { option: 'Melbourne', value: 'melbourne' },
//         { option: 'Brisbane', value: 'brisbane' },
//         { option: 'Perth', value: 'perth' },
//         { option: 'Adelaide', value: 'adelaide' },
//         { option: 'Gold Coast', value: 'gold_coast' },
//         { option: 'Newcastle', value: 'newcastle' },
//       ],
//       DE: [
//         { option: 'Berlin', value: 'berlin' },
//         { option: 'Hamburg', value: 'hamburg' },
//         { option: 'Munich', value: 'munich' },
//         { option: 'Cologne', value: 'cologne' },
//         { option: 'Frankfurt', value: 'frankfurt' },
//         { option: 'Stuttgart', value: 'stuttgart' },
//         { option: 'Düsseldorf', value: 'dusseldorf' },
//       ],
//       FR: [
//         { option: 'Paris', value: 'paris' },
//         { option: 'Marseille', value: 'marseille' },
//         { option: 'Lyon', value: 'lyon' },
//         { option: 'Toulouse', value: 'toulouse' },
//         { option: 'Nice', value: 'nice' },
//         { option: 'Nantes', value: 'nantes' },
//         { option: 'Strasbourg', value: 'strasbourg' },
//       ],
//       IN: [
//         { option: 'Mumbai', value: 'mumbai' },
//         { option: 'Delhi', value: 'delhi' },
//         { option: 'Bangalore', value: 'bangalore' },
//         { option: 'Hyderabad', value: 'hyderabad' },
//         { option: 'Chennai', value: 'chennai' },
//         { option: 'Kolkata', value: 'kolkata' },
//         { option: 'Pune', value: 'pune' },
//       ],
//       TH: [
//         { option: 'Bangkok', value: 'bangkok' },
//         { option: 'Chiang Mai', value: 'chiang_mai' },
//         { option: 'Phuket', value: 'phuket' },
//         { option: 'Pattaya', value: 'pattaya' },
//         { option: 'Krabi', value: 'krabi' },
//         { option: 'Hua Hin', value: 'hua_hin' },
//       ],
//       PK: [
//         { option: 'Karachi', value: 'karachi' },
//         { option: 'Lahore', value: 'lahore' },
//         { option: 'Islamabad', value: 'islamabad' },
//         { option: 'Rawalpindi', value: 'rawalpindi' },
//         { option: 'Faisalabad', value: 'faisalabad' },
//         { option: 'Multan', value: 'multan' },
//       ],
//     };

//     return cityMap[countryCode] || [];
//   };

//   // Final fallback method
//   const fetchCitiesFinalFallback = async countryCode => {
//     try {
//       // Allow manual entry option
//       setAvailableCities([
//         {
//           option: 'Enter city manually',
//           value: 'manual_entry',
//           isManual: true,
//         },
//       ]);
//     } catch (error) {
//       console.error('Final fallback failed:', error);
//       setAvailableCities([]);
//     } finally {
//       setLoadingCities(false);
//     }
//   };

//   const calculateRentalDetails = () => {
//     if (!moveInDate || !moveOutDate || !data?.data) return;

//     const startDate = new Date(moveInDate);
//     const endDate = new Date(moveOutDate);
//     const timeDiff = endDate - startDate;
//     const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

//     // Calculate actual calendar months between dates
//     const actualCalendarMonths =
//       (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());

//     // If there are remaining days beyond complete months, count as additional month
//     const remainingDays = endDate.getDate() - startDate.getDate();
//     const totalCalendarMonths = actualCalendarMonths + (remainingDays > 0 ? 1 : 0);

//     if (daysDiff <= 0) return;

//     const property = data.data;
//     const dailyRate = property.contractRate?.rate || 50;
//     const securityDeposit = property.contractRate?.securityDeposit || 450;
//     const deals = property.deals || [];

//     let totalRent = 0;
//     let applicableDeal = null;
//     let finalSecurityDeposit = securityDeposit;

//     // Sort deals by duration (longest first)
//     const sortedDeals = deals.slice().sort((a, b) => parseInt(b.duration) - parseInt(a.duration));

//     // Find the applicable deal based on calendar months
//     for (const deal of sortedDeals) {
//       if (totalCalendarMonths >= parseInt(deal.duration)) {
//         applicableDeal = deal;
//         finalSecurityDeposit = deal.securityDeposit;
//         break;
//       }
//     }

//     if (applicableDeal) {
//       const monthlyRate = applicableDeal.rent; // This is monthly rate

//       // Calculate rent based on actual calendar months
//       totalRent = totalCalendarMonths * monthlyRate;
//     } else {
//       // No deal applies, use daily rate
//       totalRent = daysDiff * dailyRate;
//     }

//     const totalAmount = totalRent + finalSecurityDeposit;

//     setBookingDetails({
//       startDate: startDate.toLocaleDateString('en-US', {
//         weekday: 'short',
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//       }),
//       endDate: endDate.toLocaleDateString('en-US', {
//         weekday: 'short',
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//       }),
//       totalDays: daysDiff,
//       totalMonths: totalCalendarMonths,
//     });

//     setPriceDetails({
//       rentalAmount: totalRent,
//       securityDeposit: finalSecurityDeposit,
//       totalAmount: totalAmount,
//       dealApplied: applicableDeal,
//     });
//   };

//   const handleRentReasonChange1 = e => {
//     setShowInput1(e.target.id === 'rentOther1');
//   };

//   const handleRentReasonChange2 = e => {
//     setShowInput2(e.target.id === 'rentOther2');
//   };

//   const handleRentReasonChange3 = e => {
//     setShowInput3(e.target.id === 'rentOther3');
//   };

//   const handleCountryChange = value => {
//     const selectedCountryData = countries.find(country => country.value === value);
//     setSelectedCountry(selectedCountryData?.option || '');
//     setSelectedCountryCode(value);
//   };

//   const reasonOptions1 = [
//     { id: 'vacation1', label: '1(Solo)' },
//     { id: 'study1', label: '2(Couple)' },
//     { id: 'family1', label: '3-5(Family/Small Group)' },
//     { id: 'rentOther1', label: '5+ (Custom)' },
//   ];

//   const reasonOptions2 = [
//     { id: 'remote2', label: 'Vacation/Holiday' },
//     { id: 'relocation2', label: 'Remote Work (Digital Nomad)' },
//     { id: 'healthcare2', label: 'Business/Working Assignment' },
//     { id: 'healthcare', label: 'Retirement/Long-Term Stay' },
//     { id: 'rentOther2', label: 'Other (Specify:)' },
//   ];

//   const reasonOptions3 = [
//     { id: 'business3', label: 'Tourist Visa (TR)' },
//     { id: 'conference3', label: 'Visa on Arrival (VoA)' },
//     { id: 'extended', label: 'Work Permit' },
//     { id: 'extended1', label: 'Digital Nomad Visa (DTV) (New!)' },
//     { id: 'extended2', label: 'Retirement Visa (O-A/O-X)' },
//     { id: 'extended3', label: 'Education Visa (ED)' },
//     { id: 'rentOther3', label: 'Other (Specify:)' },
//   ];

//   const occupationOptions = [
//     { option: 'Employed', value: 'employed' },
//     { option: 'Self-Employed', value: 'self_employed' },
//     { option: 'Student', value: 'student' },
//     { option: 'Retired', value: 'retired' },
//     { option: 'Digital Nomad', value: 'digital_nomad' },
//     { option: 'Unemployed', value: 'unemployed' },
//     { option: 'Others', value: 'others' },
//   ];

//   console.log('property data', data);

//   return (
//     <div className="rounded-lg bg-white p-6">
//       <div className="flex items-center justify-center">
//         <p className="text-xl font-semibold">Rent Form</p>
//       </div>
//       <div className="mt-6 grid grid-cols-12 gap-6">
//         {/* LEFT COLUMN */}
//         <div className="col-span-12 space-y-4 lg:col-span-4">
//           <div>
//             <BrowsePropertyCard data={data?.data} />
//           </div>

//           {/* Show booking details only when dates are selected and calculated */}
//           {bookingDetails && (
//             <div className="shadow-card rounded-lg border bg-white p-5">
//               <h3 className="text-lg font-semibold">Your booking details</h3>
//               <div className="mt-6 flex items-stretch justify-between space-x-8">
//                 <div>
//                   <p className="font-medium">Start Date</p>
//                   <p className="text-lg font-semibold">{bookingDetails.startDate}</p>
//                   <p className="font-medium">14:00-15:00</p>
//                 </div>
//                 <div className="w-px bg-gray-300" />
//                 <div>
//                   <p className="font-medium">End Date</p>
//                   <p className="text-lg font-semibold">{bookingDetails.endDate}</p>
//                   <p className="font-medium">10:00-11:00</p>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <h4 className="font-medium">Total Length of Stay:</h4>
//                 <h4 className="text-lg font-semibold">
//                   {bookingDetails.totalDays} days ({bookingDetails.totalMonths} month
//                   {bookingDetails.totalMonths > 1 ? 's' : ''})
//                 </h4>
//               </div>
//             </div>
//           )}

//           {/* Show price summary only when price is calculated */}
//           {priceDetails && (
//             <div className="shadow-card rounded-lg border bg-white p-5">
//               <h1 className="text-lg font-semibold">Your Price Summary</h1>
//               <div className="mt-6 flex justify-between">
//                 <h3 className="font-medium">Rental Amount:</h3>
//                 <h3 className="text-base font-bold">${priceDetails.rentalAmount}</h3>
//               </div>
//               {priceDetails.dealApplied && (
//                 <div className="mt-2 text-xs text-green-600">
//                   Deal applied: {priceDetails.dealApplied.duration} month deal at ${priceDetails.dealApplied.rent}/day
//                 </div>
//               )}
//               <div className="mt-3">
//                 <div className="flex justify-between">
//                   <h3 className="font-medium">Security Deposit:</h3>
//                   <h3 className="text-base font-bold">${priceDetails.securityDeposit}</h3>
//                 </div>
//                 <p className="mt-1 text-xs font-medium text-[#32343CB2]/70">
//                   A security deposit is required at the time of booking and will be fully refunded when you vacate the
//                   property in its original condition.
//                 </p>
//               </div>
//               <div className="mt-5 flex justify-between">
//                 <h1 className="text-[22px] font-medium">Total Amount</h1>
//                 <h1 className="text-[22px] font-medium">${priceDetails.totalAmount}</h1>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="col-span-12 lg:col-span-8">
//           <div className="grid grid-cols-12 gap-4">
//             <div className="col-span-12 md:col-span-6">
//               <Input shadow label="Full Legal Name" placeholder="Enter first name" type="text" />
//             </div>
//             <div className="col-span-12 md:col-span-6">
//               <Dropdown
//                 label="Current Country"
//                 options={countries}
//                 onChange={handleCountryChange}
//                 loading={loadingCountries}
//                 placeholder={loadingCountries ? 'Loading countries...' : 'Select country'}
//               />
//             </div>
//             <div className="col-span-12 md:col-span-6">
//               <Dropdown
//                 label="City of Residence"
//                 options={availableCities}
//                 disabled={!selectedCountryCode}
//                 loading={loadingCities}
//                 placeholder={
//                   !selectedCountryCode ? 'Select country first' : loadingCities ? 'Loading cities...' : 'Select city'
//                 }
//               />
//             </div>
//             <div className="col-span-12 md:col-span-6">
//               <Dropdown
//                 label="Nationality"
//                 options={nationalities}
//                 loading={loadingNationalities}
//                 placeholder={loadingNationalities ? 'Loading nationalities...' : 'Select nationality'}
//               />
//             </div>
//             <div className="col-span-12">
//               <Dropdown label="Occupation" options={occupationOptions} />
//             </div>
//             <div className="col-span-12 md:col-span-6">
//               <Input
//                 shadow
//                 label="Start Date"
//                 placeholder="Enter Start Date"
//                 type="date"
//                 value={moveInDate}
//                 onChange={e => setMoveInDate(e.target.value)}
//               />
//             </div>
//             <div className="col-span-12 md:col-span-6">
//               <Input
//                 shadow
//                 label="End Date"
//                 placeholder="Enter End Date"
//                 type="date"
//                 value={moveOutDate}
//                 onChange={e => setMoveOutDate(e.target.value)}
//               />
//             </div>
//             <div className="col-span-12 sm:col-span-6">
//               <h1 className="text-[#32343CB2]">Number of Guests Staying</h1>
//               <div className="mt-2.5 grid grid-cols-1 gap-2">
//                 {reasonOptions1.map(({ id, label }) => (
//                   <div key={id} className="flex items-center gap-2">
//                     <input id={id} type="radio" name="rentReason1" onChange={handleRentReasonChange1} />
//                     <label className="text-[13px]" htmlFor={id}>
//                       {label}
//                     </label>
//                   </div>
//                 ))}
//                 {showInput1 && (
//                   <div className="mt-8">
//                     <Input shadow type="text" placeholder="Enter custom number" />
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="col-span-12 sm:col-span-6">
//               <h1 className="text-[#32343CB2]">Primary Reason for Renting</h1>
//               <div className="mt-2.5 grid grid-cols-1 gap-2">
//                 {reasonOptions2.map(({ id, label }) => (
//                   <div key={id} className="flex items-center gap-2">
//                     <input id={id} type="radio" name="rentReason2" onChange={handleRentReasonChange2} />
//                     <label className="text-[13px]" htmlFor={id}>
//                       {label}
//                     </label>
//                   </div>
//                 ))}
//                 {showInput2 && (
//                   <div className="mt-1">
//                     <Input shadow type="text" placeholder="Specify other reason" />
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="col-span-12 sm:col-span-12">
//               <h1 className="text-[#32343CB2]">Visa Type for Thailand</h1>
//               <div className="mt-2.5 flex flex-wrap gap-2">
//                 {reasonOptions3.map(({ id, label }) => (
//                   <div key={id} className="flex items-center gap-1 rounded px-2 py-1">
//                     <input id={id} type="radio" name="rentReason3" onChange={handleRentReasonChange3} />
//                     <label className="text-[13px]" htmlFor={id}>
//                       {label}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//               {showInput3 && (
//                 <div className="mt-1">
//                   <Input shadow type="text" placeholder="Specify other visa type" />
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="mt-6">
//             <div>
//               <h1 className="text-base font-semibold">Special requests</h1>
//               <h1 className="text-xs font-semibold text-[#32343CB2]/70">
//                 Special requests cannot be guaranteed – but the property will do its best to meet your needs. You can
//                 always make a special request after your booking is complete!
//               </h1>
//             </div>
//             <div className="mt-5">
//               <h1 className="">
//                 Please write your requests in English or Thai. <span className="text-[10px]">(optional)</span>
//               </h1>
//               <textarea className="h-[200px] w-full rounded-lg border" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Buttons */}
//       <div className="mt-6 flex items-center justify-end">
//         <div className="flex gap-4">
//           <Button cn="!bg-buttonSecondary hover:!bg-gray-500" text="Cancel" />
//           <Button text="Send Rent Request" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookingDetails;

'use client';
import Button from '@/components/shared/small/Button';
import Dropdown from '@/components/shared/small/Dropdown';
import Input from '@/components/shared/small/Input';
import BrowsePropertyCard from '@/components/tenant/browserProperty/BrowsePropertyCard';
import { bookingHouses } from '@/data/data';
import React, { useState, useEffect } from 'react';
import { useGetSinglePropertyQuery } from '@/features/property/propertyApi';
import { use } from 'react';
import { useParams } from 'next/navigation';
import { useCreateBookingRequestMutation } from '@/features/booking/bookingRequestApi'; // adjust path as needed
import { toast } from 'react-hot-toast';

function BookingDetails() {
  const parms = useParams();
  console.log('param', parms);

  const [showInput1, setShowInput1] = useState(false);
  const [showInput2, setShowInput2] = useState(false);
  const [showInput3, setShowInput3] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [countries, setCountries] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingNationalities, setLoadingNationalities] = useState(true);
  const [moveInDate, setMoveInDate] = useState('');
  const [moveOutDate, setMoveOutDate] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [priceDetails, setPriceDetails] = useState(null);
  const [fullName, setFullName] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedNationality, setSelectedNationality] = useState('');
  const [selectedOccupation, setSelectedOccupation] = useState('');
  const [numOfOccupants, setNumOfOccupants] = useState('');
  const [customOccupants, setCustomOccupants] = useState('');
  const [purpose, setPurpose] = useState('');
  const [customPurpose, setCustomPurpose] = useState('');
  const [visaType, setVisaType] = useState('');
  const [customVisaType, setCustomVisaType] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const { data, error, isLoading } = useGetSinglePropertyQuery(parms.propertyId);
  const [createBookingRequest, { isLoading: isCreatingBooking }] = useCreateBookingRequestMutation();

  // Fetch countries and nationalities on component mount
  useEffect(() => {
    fetchCountries();
    fetchNationalities();
  }, []);

  // Fetch cities when country changes
  useEffect(() => {
    if (selectedCountryCode) {
      fetchCities(selectedCountryCode);
    } else {
      setAvailableCities([]);
    }
  }, [selectedCountryCode]);

  // Calculate rental details when dates change
  useEffect(() => {
    if (moveInDate && moveOutDate && data?.data) {
      calculateRentalDetails();
    }
  }, [moveInDate, moveOutDate, data]);

  // Fetch countries from REST Countries API
  const fetchCountries = async () => {
    try {
      setLoadingCountries(true);
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2');
      const data = await response.json();

      // Sort countries alphabetically and format for dropdown
      const formattedCountries = data
        .sort((a, b) => a.name.common.localeCompare(b.name.common))
        .map(country => ({
          option: country.name.common,
          value: country.cca2,
          code: country.cca2,
        }));

      setCountries(formattedCountries);
    } catch (error) {
      console.error('Error fetching countries:', error);
      // Fallback to a basic list if API fails
      setCountries([
        { option: 'United States', value: 'US', code: 'US' },
        { option: 'Canada', value: 'CA', code: 'CA' },
        { option: 'United Kingdom', value: 'GB', code: 'GB' },
        { option: 'Australia', value: 'AU', code: 'AU' },
        { option: 'Germany', value: 'DE', code: 'DE' },
      ]);
    } finally {
      setLoadingCountries(false);
    }
  };

  // Fetch nationalities from REST Countries API
  const fetchNationalities = async () => {
    try {
      setLoadingNationalities(true);
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,demonyms');
      const data = await response.json();

      // Extract nationalities and format for dropdown
      const formattedNationalities = data
        .filter(country => country.demonyms && country.demonyms.eng)
        .map(country => {
          const nationality = country.demonyms.eng.m || country.demonyms.eng.f;
          return {
            option: nationality,
            value: nationality.toLowerCase().replace(/\s+/g, '_'),
            country: country.name.common,
          };
        })
        .filter(item => item.option) // Remove entries without nationality
        .sort((a, b) => a.option.localeCompare(b.option))
        // Remove duplicates
        .reduce((acc, current) => {
          const isDuplicate = acc.find(item => item.value === current.value);
          if (!isDuplicate) {
            acc.push(current);
          }
          return acc;
        }, []);

      setNationalities(formattedNationalities);
    } catch (error) {
      console.error('Error fetching nationalities:', error);
      // Fallback to basic nationalities if API fails
      setNationalities([
        { option: 'American', value: 'american' },
        { option: 'British', value: 'british' },
        { option: 'Canadian', value: 'canadian' },
        { option: 'Chinese', value: 'chinese' },
        { option: 'French', value: 'french' },
        { option: 'German', value: 'german' },
        { option: 'Indian', value: 'indian' },
        { option: 'Japanese', value: 'japanese' },
        { option: 'Pakistani', value: 'pakistani' },
        { option: 'Thai', value: 'thai' },
        { option: 'Others', value: 'others' },
      ]);
    } finally {
      setLoadingNationalities(false);
    }
  };

  // Primary method: Using GeoNames API (free, no API key required)
  const fetchCities = async countryCode => {
    try {
      setLoadingCities(true);
      setAvailableCities([]);

      // Using GeoNames API - free and reliable
      const response = await fetch(
        `http://api.geonames.org/searchJSON?country=${countryCode}&featureClass=P&maxRows=100&username=demo`
      );

      if (!response.ok) {
        throw new Error('GeoNames API failed');
      }

      const data = await response.json();

      if (data.geonames && data.geonames.length > 0) {
        const formattedCities = data.geonames
          .map(city => ({
            option: city.name,
            value: city.name.toLowerCase().replace(/\s+/g, '_'),
            population: city.population || 0,
          }))
          .sort((a, b) => b.population - a.population) // Sort by population (largest first)
          .slice(0, 50); // Limit to top 50 cities

        setAvailableCities(formattedCities);
        return;
      }
    } catch (error) {
      console.error('Error fetching cities from GeoNames:', error);
    }

    // Fallback to alternative methods
    await fetchCitiesAlternative(countryCode);
  };

  // Alternative method 1: Using REST Countries API for capitals + major cities
  const fetchCitiesAlternative = async countryCode => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}?fields=capital,name`);
      const data = await response.json();

      const cities = [];

      // Add capital(s)
      if (data.capital && data.capital.length > 0) {
        data.capital.forEach(capital => {
          cities.push({
            option: capital,
            value: capital.toLowerCase().replace(/\s+/g, '_'),
            isCapital: true,
          });
        });
      }

      // Add some major cities based on country (you can expand this)
      const majorCities = getMajorCitiesByCountry(countryCode);
      majorCities.forEach(city => {
        if (!cities.find(c => c.value === city.value)) {
          cities.push(city);
        }
      });

      // If we have cities, use them
      if (cities.length > 0) {
        setAvailableCities(cities);
        return;
      }
    } catch (error) {
      console.error('Error fetching cities from REST Countries:', error);
    }

    // Final fallback
    await fetchCitiesFinalFallback(countryCode);
  };

  // Get major cities for common countries (you can expand this list)
  const getMajorCitiesByCountry = countryCode => {
    const cityMap = {
      US: [
        { option: 'New York', value: 'new_york' },
        { option: 'Los Angeles', value: 'los_angeles' },
        { option: 'Chicago', value: 'chicago' },
        { option: 'Houston', value: 'houston' },
        { option: 'Phoenix', value: 'phoenix' },
        { option: 'Philadelphia', value: 'philadelphia' },
        { option: 'San Antonio', value: 'san_antonio' },
        { option: 'San Diego', value: 'san_diego' },
        { option: 'Dallas', value: 'dallas' },
        { option: 'San Jose', value: 'san_jose' },
      ],
      GB: [
        { option: 'London', value: 'london' },
        { option: 'Birmingham', value: 'birmingham' },
        { option: 'Manchester', value: 'manchester' },
        { option: 'Glasgow', value: 'glasgow' },
        { option: 'Liverpool', value: 'liverpool' },
        { option: 'Edinburgh', value: 'edinburgh' },
        { option: 'Leeds', value: 'leeds' },
        { option: 'Sheffield', value: 'sheffield' },
      ],
      CA: [
        { option: 'Toronto', value: 'toronto' },
        { option: 'Montreal', value: 'montreal' },
        { option: 'Vancouver', value: 'vancouver' },
        { option: 'Calgary', value: 'calgary' },
        { option: 'Edmonton', value: 'edmonton' },
        { option: 'Ottawa', value: 'ottawa' },
        { option: 'Winnipeg', value: 'winnipeg' },
        { option: 'Quebec City', value: 'quebec_city' },
      ],
      AU: [
        { option: 'Sydney', value: 'sydney' },
        { option: 'Melbourne', value: 'melbourne' },
        { option: 'Brisbane', value: 'brisbane' },
        { option: 'Perth', value: 'perth' },
        { option: 'Adelaide', value: 'adelaide' },
        { option: 'Gold Coast', value: 'gold_coast' },
        { option: 'Newcastle', value: 'newcastle' },
      ],
      DE: [
        { option: 'Berlin', value: 'berlin' },
        { option: 'Hamburg', value: 'hamburg' },
        { option: 'Munich', value: 'munich' },
        { option: 'Cologne', value: 'cologne' },
        { option: 'Frankfurt', value: 'frankfurt' },
        { option: 'Stuttgart', value: 'stuttgart' },
        { option: 'Düsseldorf', value: 'dusseldorf' },
      ],
      FR: [
        { option: 'Paris', value: 'paris' },
        { option: 'Marseille', value: 'marseille' },
        { option: 'Lyon', value: 'lyon' },
        { option: 'Toulouse', value: 'toulouse' },
        { option: 'Nice', value: 'nice' },
        { option: 'Nantes', value: 'nantes' },
        { option: 'Strasbourg', value: 'strasbourg' },
      ],
      IN: [
        { option: 'Mumbai', value: 'mumbai' },
        { option: 'Delhi', value: 'delhi' },
        { option: 'Bangalore', value: 'bangalore' },
        { option: 'Hyderabad', value: 'hyderabad' },
        { option: 'Chennai', value: 'chennai' },
        { option: 'Kolkata', value: 'kolkata' },
        { option: 'Pune', value: 'pune' },
      ],
      TH: [
        { option: 'Bangkok', value: 'bangkok' },
        { option: 'Chiang Mai', value: 'chiang_mai' },
        { option: 'Phuket', value: 'phuket' },
        { option: 'Pattaya', value: 'pattaya' },
        { option: 'Krabi', value: 'krabi' },
        { option: 'Hua Hin', value: 'hua_hin' },
      ],
      PK: [
        { option: 'Karachi', value: 'karachi' },
        { option: 'Lahore', value: 'lahore' },
        { option: 'Islamabad', value: 'islamabad' },
        { option: 'Rawalpindi', value: 'rawalpindi' },
        { option: 'Faisalabad', value: 'faisalabad' },
        { option: 'Multan', value: 'multan' },
      ],
    };

    return cityMap[countryCode] || [];
  };

  // Final fallback method
  const fetchCitiesFinalFallback = async countryCode => {
    try {
      // Allow manual entry option
      setAvailableCities([
        {
          option: 'Enter city manually',
          value: 'manual_entry',
          isManual: true,
        },
      ]);
    } catch (error) {
      console.error('Final fallback failed:', error);
      setAvailableCities([]);
    } finally {
      setLoadingCities(false);
    }
  };

  const calculateRentalDetails = () => {
    if (!moveInDate || !moveOutDate || !data?.data) return;

    const startDate = new Date(moveInDate);
    const endDate = new Date(moveOutDate);
    const timeDiff = endDate - startDate;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    // Calculate actual calendar months between dates
    const actualCalendarMonths =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());

    // If there are remaining days beyond complete months, count as additional month
    const remainingDays = endDate.getDate() - startDate.getDate();
    const totalCalendarMonths = actualCalendarMonths + (remainingDays > 0 ? 1 : 0);

    if (daysDiff <= 0) return;

    const property = data.data;
    const dailyRate = property.contractRate?.rate || 50;
    const securityDeposit = property.contractRate?.securityDeposit || 450;
    const deals = property.deals || [];

    let totalRent = 0;
    let applicableDeal = null;
    let finalSecurityDeposit = securityDeposit;

    // Sort deals by duration (longest first)
    const sortedDeals = deals.slice().sort((a, b) => parseInt(b.duration) - parseInt(a.duration));

    // Find the applicable deal based on calendar months
    for (const deal of sortedDeals) {
      if (totalCalendarMonths >= parseInt(deal.duration)) {
        applicableDeal = deal;
        finalSecurityDeposit = deal.securityDeposit;
        break;
      }
    }

    if (applicableDeal) {
      const monthlyRate = applicableDeal.rent; // This is monthly rate

      // Calculate rent based on actual calendar months
      totalRent = totalCalendarMonths * monthlyRate;
    } else {
      // No deal applies, use daily rate
      totalRent = daysDiff * dailyRate;
    }

    const totalAmount = totalRent + finalSecurityDeposit;

    setBookingDetails({
      startDate: startDate.toLocaleDateString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      endDate: endDate.toLocaleDateString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      totalDays: daysDiff,
      totalMonths: totalCalendarMonths,
    });

    setPriceDetails({
      rentalAmount: totalRent,
      securityDeposit: finalSecurityDeposit,
      totalAmount: totalAmount,
      dealApplied: applicableDeal,
    });
  };

  const handleRentReasonChange1 = e => {
    const value = e.target.value;
    setShowInput1(e.target.id === 'rentOther1');
    setNumOfOccupants(value);
  };

  const handleRentReasonChange2 = e => {
    const value = e.target.value;
    setShowInput2(e.target.id === 'rentOther2');
    setPurpose(value);
  };

  const handleRentReasonChange3 = e => {
    const value = e.target.value;
    setShowInput3(e.target.id === 'rentOther3');
    setVisaType(value);
  };

  const handleCountryChange = value => {
    const selectedCountryData = countries.find(country => country.value === value);
    setSelectedCountry(selectedCountryData?.option || '');
    setSelectedCountryCode(value);
  };

  const reasonOptions1 = [
    { id: 'vacation1', label: '1(Solo)' },
    { id: 'study1', label: '2(Couple)' },
    { id: 'family1', label: '3-5(Family/Small Group)' },
    { id: 'rentOther1', label: '5+ (Custom)' },
  ];

  const reasonOptions2 = [
    { id: 'remote2', label: 'Vacation/Holiday' },
    { id: 'relocation2', label: 'Remote Work (Digital Nomad)' },
    { id: 'healthcare2', label: 'Business/Working Assignment' },
    { id: 'healthcare', label: 'Retirement/Long-Term Stay' },
    { id: 'rentOther2', label: 'Other (Specify:)' },
  ];

  const reasonOptions3 = [
    { id: 'business3', label: 'Tourist Visa (TR)' },
    { id: 'conference3', label: 'Visa on Arrival (VoA)' },
    { id: 'extended', label: 'Work Permit' },
    { id: 'extended1', label: 'Digital Nomad Visa (DTV) (New!)' },
    { id: 'extended2', label: 'Retirement Visa (O-A/O-X)' },
    { id: 'extended3', label: 'Education Visa (ED)' },
    { id: 'rentOther3', label: 'Other (Specify:)' },
  ];

  const occupationOptions = [
    { option: 'Employed', value: 'employed' },
    { option: 'Self-Employed', value: 'self_employed' },
    { option: 'Student', value: 'student' },
    { option: 'Retired', value: 'retired' },
    { option: 'Digital Nomad', value: 'digital_nomad' },
    { option: 'Unemployed', value: 'unemployed' },
    { option: 'Others', value: 'others' },
  ];

  console.log('property data', data);

  const handleSendRentRequest = async () => {
    try {
      // Determine final values
      const finalNumOfOccupants = showInput1 ? customOccupants : numOfOccupants;
      const finalPurpose = showInput2 ? customPurpose : purpose;
      const finalVisaType = showInput3 ? customVisaType : visaType;

      const requestData = {
        propertyId: parms.propertyId,
        numOfOccupants: finalNumOfOccupants,
        purpose: finalPurpose,
        currentCountry: selectedCountry,
        nationality: selectedNationality,
        occupation: selectedOccupation,
        startDate: moveInDate,
        endDate: moveOutDate,
        arrivalTime: '14:00-15:00', // You can make this dynamic if needed
        requestDescription: specialRequests,
        name: fullName,
        visaType: finalVisaType,
      };

      const response = await createBookingRequest(requestData).unwrap();
      toast.success('Booking request sent successfully!');

      // Optionally reset form or redirect
      // navigate('/my-bookings') or reset form fields
    } catch (error) {
      console.error('Error sending booking request:', error);
      toast.error(error?.data?.message || 'Failed to send booking request');
    }
  };

  return (
    <div className="rounded-lg bg-white p-6">
      <div className="flex items-center justify-center">
        <p className="text-xl font-semibold">Rent Form</p>
      </div>
      <div className="mt-6 grid grid-cols-12 gap-6">
        {/* LEFT COLUMN */}
        <div className="col-span-12 space-y-4 lg:col-span-4">
          <div>
            <BrowsePropertyCard data={data?.data} />
          </div>

          {/* Show booking details only when dates are selected and calculated */}
          {bookingDetails && (
            <div className="shadow-card rounded-lg border bg-white p-5">
              <h3 className="text-lg font-semibold">Your booking details</h3>
              <div className="mt-6 flex items-stretch justify-between space-x-8">
                <div>
                  <p className="font-medium">Start Date</p>
                  <p className="text-lg font-semibold">{bookingDetails.startDate}</p>
                  <p className="font-medium">14:00-15:00</p>
                </div>
                <div className="w-px bg-gray-300" />
                <div>
                  <p className="font-medium">End Date</p>
                  <p className="text-lg font-semibold">{bookingDetails.endDate}</p>
                  <p className="font-medium">10:00-11:00</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-medium">Total Length of Stay:</h4>
                <h4 className="text-lg font-semibold">
                  {bookingDetails.totalDays} days ({bookingDetails.totalMonths} month
                  {bookingDetails.totalMonths > 1 ? 's' : ''})
                </h4>
              </div>
            </div>
          )}

          {/* Show price summary only when price is calculated */}
          {priceDetails && (
            <div className="shadow-card rounded-lg border bg-white p-5">
              <h1 className="text-lg font-semibold">Your Price Summary</h1>
              <div className="mt-6 flex justify-between">
                <h3 className="font-medium">Rental Amount:</h3>
                <h3 className="text-base font-bold">${priceDetails.rentalAmount}</h3>
              </div>
              {priceDetails.dealApplied && (
                <div className="mt-2 text-xs text-green-600">
                  Deal applied: {priceDetails.dealApplied.duration} month deal at ${priceDetails.dealApplied.rent}/day
                </div>
              )}
              <div className="mt-3">
                <div className="flex justify-between">
                  <h3 className="font-medium">Security Deposit:</h3>
                  <h3 className="text-base font-bold">${priceDetails.securityDeposit}</h3>
                </div>
                <p className="mt-1 text-xs font-medium text-[#32343CB2]/70">
                  A security deposit is required at the time of booking and will be fully refunded when you vacate the
                  property in its original condition.
                </p>
              </div>
              <div className="mt-5 flex justify-between">
                <h1 className="text-[22px] font-medium">Total Amount</h1>
                <h1 className="text-[22px] font-medium">${priceDetails.totalAmount}</h1>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-12 lg:col-span-8">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6">
              <Input
                shadow
                label="Full Legal Name"
                placeholder="Enter first name"
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Dropdown
                label="Current Country"
                options={countries}
                onChange={handleCountryChange}
                loading={loadingCountries}
                placeholder={loadingCountries ? 'Loading countries...' : 'Select country'}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Dropdown
                label="City of Residence"
                options={availableCities}
                disabled={!selectedCountryCode}
                loading={loadingCities}
                placeholder={
                  !selectedCountryCode ? 'Select country first' : loadingCities ? 'Loading cities...' : 'Select city'
                }
                onChange={value => setSelectedCity(value)}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Dropdown
                label="Nationality"
                options={nationalities}
                loading={loadingNationalities}
                placeholder={loadingNationalities ? 'Loading nationalities...' : 'Select nationality'}
                onChange={value => setSelectedNationality(value)}
              />
            </div>
            <div className="col-span-12">
              <Dropdown
                label="Occupation"
                options={occupationOptions}
                onChange={value => setSelectedOccupation(value)}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Input
                shadow
                label="Start Date"
                placeholder="Enter Start Date"
                type="date"
                value={moveInDate}
                onChange={e => setMoveInDate(e.target.value)}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Input
                shadow
                label="End Date"
                placeholder="Enter End Date"
                type="date"
                value={moveOutDate}
                onChange={e => setMoveOutDate(e.target.value)}
              />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <h1 className="text-[#32343CB2]">Number of Guests Staying</h1>
              <div className="mt-2.5 grid grid-cols-1 gap-2">
                {reasonOptions1.map(({ id, label }) => (
                  <div key={id} className="flex items-center gap-2">
                    <input id={id} type="radio" name="rentReason1" value={label} onChange={handleRentReasonChange1} />
                    <label className="text-[13px]" htmlFor={id}>
                      {label}
                    </label>
                  </div>
                ))}
                {showInput1 && (
                  <div className="mt-8">
                    <Input
                      shadow
                      type="text"
                      placeholder="Enter custom number"
                      value={customOccupants}
                      onChange={e => setCustomOccupants(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6">
              <h1 className="text-[#32343CB2]">Primary Reason for Renting</h1>
              <div className="mt-2.5 grid grid-cols-1 gap-2">
                {reasonOptions2.map(({ id, label }) => (
                  <div key={id} className="flex items-center gap-2">
                    <input id={id} type="radio" name="rentReason2" value={label} onChange={handleRentReasonChange2} />
                    <label className="text-[13px]" htmlFor={id}>
                      {label}
                    </label>
                  </div>
                ))}
                {showInput2 && (
                  <div className="mt-1">
                    <Input
                      shadow
                      type="text"
                      placeholder="Specify other reason"
                      value={customPurpose}
                      onChange={e => setCustomPurpose(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-12 sm:col-span-12">
              <h1 className="text-[#32343CB2]">Visa Type for Thailand</h1>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {reasonOptions3.map(({ id, label }) => (
                  <div key={id} className="flex items-center gap-1 rounded px-2 py-1">
                    <input id={id} type="radio" name="rentReason3" value={label} onChange={handleRentReasonChange3} />
                    <label className="text-[13px]" htmlFor={id}>
                      {label}
                    </label>
                  </div>
                ))}
              </div>
              {showInput3 && (
                <div className="mt-1">
                  <Input
                    shadow
                    type="text"
                    placeholder="Specify other visa type"
                    value={customVisaType}
                    onChange={e => setCustomVisaType(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="mt-6">
            <div>
              <h1 className="text-base font-semibold">Special requests</h1>
              <h1 className="text-xs font-semibold text-[#32343CB2]/70">
                Special requests cannot be guaranteed – but the property will do its best to meet your needs. You can
                always make a special request after your booking is complete!
              </h1>
            </div>
            <div className="mt-5">
              <h1 className="">
                Please write your requests in English or Thai. <span className="text-[10px]">(optional)</span>
              </h1>
              <textarea
                className="h-[200px] w-full rounded-lg border"
                value={specialRequests}
                onChange={e => setSpecialRequests(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="mt-6 flex items-center justify-end">
        <div className="flex gap-4">
          <Button cn="!bg-buttonSecondary hover:!bg-gray-500" text="Cancel" />
          <Button text="Send Rent Request" onClick={handleSendRentRequest} disabled={isCreatingBooking} />
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
