// 'use client';

// import IconDropdown from '@/components/shared/small/IconDropdown';
// import Image from 'next/image';
// import { useState } from 'react';
// import { LuArrowUpDown } from 'react-icons/lu';
// import FiltersSection from './FiltersSection';
// import HeaderGreeting from './HeaderGreeting';
// import ListView from './ListView';
// import ViewSwitcher from './ViewSwitcher';
// import { houses } from '@/data/data';
// import MapView from './MapView';

// function BrowserHeader() {
//   const [tabView, setTabView] = useState('List');
//   const [selectedType, setSelectedType] = useState('All Types');
//   const [selectedPrice, setSelectedPrice] = useState('Price');
//   const [selectedLocation, setSelectedLocation] = useState('Location');
//   const [selectedOption, setSelectedOption] = useState('sort');

//   const [selectedProperty, setSelectedProperty] = useState(null);

//   const handleCardClick = property => {
//     setSelectedProperty(property);
//   };

//   const handleCloseSlider = () => {
//     setSelectedProperty(null);
//   };

//   return (
//     <div className="flex flex-col gap-4">
//       <div className="shadow-card rounded-lg bg-white px-6 py-3.5">
//         {/* Top Header */}
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <HeaderGreeting />
//           <ViewSwitcher tabView={tabView} setTabView={setTabView} />
//         </div>

//         {/* Filter Section */}
//         <FiltersSection
//           selectedType={selectedType}
//           setSelectedType={setSelectedType}
//           selectedPrice={selectedPrice}
//           setSelectedPrice={setSelectedPrice}
//           selectedLocation={selectedLocation}
//           setSelectedLocation={setSelectedLocation}
//         />
//       </div>
//       <div className="shadow-card rounded-lg bg-white px-6 py-4">
//         <section className="flex flex-col items-center justify-between border-b border-[#395d8c4d] pb-4 md:flex-row">
//           <div className="text-textPrimary flex items-center gap-[10px] text-sm font-semibold">
//             <Image src="/images/dashboard/rental.png" width={40} height={40} alt="icon" />
//             <div className="flex flex-col">
//               <p className="text-[22px] font-semibold">Properties</p>
//               <p className="text-sm font-medium text-[#666666]">Showing 1-20 of 350 properties</p>
//             </div>
//           </div>
//           <div className="flex w-full items-end justify-end">
//             <IconDropdown
//               lists={['Today', 'Week', 'Month']}
//               icon={<LuArrowUpDown className="text-white" />}
//               containerClass="w-[125px]" // container width
//               buttonClass="bg-primary text-white" // button style
//               optionClass="bg-white text-black" // option list style
//               selectedOption={selectedOption}
//               setSelectedOption={setSelectedOption}
//             />
//           </div>
//         </section>

//         {tabView === 'List' ? (
//           <ListView
//             handleCloseSlider={handleCloseSlider}
//             handleCardClick={handleCardClick}
//             houses={houses}
//             selectedProperty={selectedProperty}
//           />
//         ) : (
//           <div>
//             <MapView
//               handleCloseSlider={handleCloseSlider}
//               handleCardClick={handleCardClick}
//               houses={houses}
//               selectedProperty={selectedProperty}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default BrowserHeader;

'use client';

import IconDropdown from '@/components/shared/small/IconDropdown';
import Image from 'next/image';
import { useState } from 'react';
import { LuArrowUpDown } from 'react-icons/lu';
import FiltersSection from './FiltersSection';
import HeaderGreeting from './HeaderGreeting';
import ListView from './ListView';
import ViewSwitcher from './ViewSwitcher';
import MapView from './MapView';
import { useGetAllPropertiesQuery } from '@/features/property/propertyApi';

function BrowserHeader() {
  const [tabView, setTabView] = useState('List');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedPrice, setSelectedPrice] = useState('Price');
  const [selectedLocation, setSelectedLocation] = useState('Location');
  const [selectedOption, setSelectedOption] = useState('sort');

  const [selectedProperty, setSelectedProperty] = useState(null);

  // API call to get all properties
  const { data: propertiesData, isLoading, isError, error } = useGetAllPropertiesQuery();

  const handleCardClick = property => {
    setSelectedProperty(property);
  };

  const handleCloseSlider = () => {
    setSelectedProperty(null);
  };

  // Extract properties array from API response
  const properties = propertiesData?.data || [];

  // Show loading state
  // if (isLoading) {
  //   return (
  //     <div className="flex flex-col gap-4">
  //       <div className="shadow-card rounded-lg bg-white px-6 py-3.5">
  //         <div className="flex flex-wrap items-center justify-between gap-4">
  //           <HeaderGreeting />
  //           <ViewSwitcher tabView={tabView} setTabView={setTabView} />
  //         </div>
  //         <FiltersSection
  //           selectedType={selectedType}
  //           setSelectedType={setSelectedType}
  //           selectedPrice={selectedPrice}
  //           setSelectedPrice={setSelectedPrice}
  //           selectedLocation={selectedLocation}
  //           setSelectedLocation={setSelectedLocation}
  //         />
  //       </div>
  //       <div className="shadow-card rounded-lg bg-white px-6 py-4">
  //         <div className="flex h-64 items-center justify-center">
  //           <div className="text-center">
  //             <p className="text-lg font-semibold">Loading properties...</p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // Show error state
  // if (isError) {
  //   return (
  //     <div className="flex flex-col gap-4">
  //       <div className="shadow-card rounded-lg bg-white px-6 py-3.5">
  //         <div className="flex flex-wrap items-center justify-between gap-4">
  //           <HeaderGreeting />
  //           <ViewSwitcher tabView={tabView} setTabView={setTabView} />
  //         </div>
  //         <FiltersSection
  //           selectedType={selectedType}
  //           setSelectedType={setSelectedType}
  //           selectedPrice={selectedPrice}
  //           setSelectedPrice={setSelectedPrice}
  //           selectedLocation={selectedLocation}
  //           setSelectedLocation={setSelectedLocation}
  //         />
  //       </div>
  //       <div className="shadow-card rounded-lg bg-white px-6 py-4">
  //         <div className="flex h-64 items-center justify-center">
  //           <div className="text-center">
  //             <p className="text-lg font-semibold text-red-600">Error loading properties</p>
  //             <p className="mt-2 text-sm text-gray-600">
  //               {error?.data?.message || error?.message || 'Something went wrong'}
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col gap-4">
      <div className="shadow-card rounded-lg bg-white px-6 py-3.5">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <HeaderGreeting />
          <ViewSwitcher tabView={tabView} setTabView={setTabView} />
        </div>

        {/* Filter Section */}
        <FiltersSection
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      </div>
      <div className="shadow-card rounded-lg bg-white px-6 py-4">
        <section className="flex flex-col items-center justify-between border-b border-[#395d8c4d] pb-4 md:flex-row">
          <div className="text-textPrimary flex items-center gap-[10px] text-sm font-semibold">
            <Image src="/images/dashboard/rental.png" width={40} height={40} alt="icon" />
            <div className="flex flex-col">
              <p className="text-[22px] font-semibold">Properties</p>
              <p className="text-sm font-medium text-[#666666]">
                Showing 1-{Math.min(20, properties.length)} of {properties.length} properties
              </p>
            </div>
          </div>
          <div className="flex w-full items-end justify-end">
            <IconDropdown
              lists={['Today', 'Week', 'Month']}
              icon={<LuArrowUpDown className="text-white" />}
              containerClass="w-[125px]" // container width
              buttonClass="bg-primary text-white" // button style
              optionClass="bg-white text-black" // option list style
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          </div>
        </section>

        {tabView === 'List' ? (
          <ListView
            handleCloseSlider={handleCloseSlider}
            handleCardClick={handleCardClick}
            houses={properties}
            selectedProperty={selectedProperty}
          />
        ) : (
          <div>
            <MapView
              handleCloseSlider={handleCloseSlider}
              handleCardClick={handleCardClick}
              houses={properties}
              selectedProperty={selectedProperty}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default BrowserHeader;
