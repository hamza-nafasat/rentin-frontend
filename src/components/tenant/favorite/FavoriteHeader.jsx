'use client';

import IconDropdown from '@/components/shared/small/IconDropdown';
import Image from 'next/image';
import { useState } from 'react';
import { LuArrowUpDown } from 'react-icons/lu';
// import FiltersSection from './FiltersSection';
// import HeaderGreeting from './HeaderGreeting';
// import ListView from './ListView';
// import ViewSwitcher from './ViewSwitcher';
import HeaderGreeting from '../browserProperty/HeaderGreeting';
import FiltersSection from '../browserProperty/FiltersSection';
import ViewSwitcher from '../browserProperty/ViewSwitcher';
import ListView from '../browserProperty/ListView';
import { houses } from '@/data/data';
import MapView from '../browserProperty/MapView';

function FavoriteHeader() {
  const [tabView, setTabView] = useState('List');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedPrice, setSelectedPrice] = useState('Price');
  const [selectedLocation, setSelectedLocation] = useState('Location');
  const [selectedOption, setSelectedOption] = useState('sort');

  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleCardClick = property => {
    setSelectedProperty(property);
  };

  const handleCloseSlider = () => {
    setSelectedProperty(null);
  };

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
        <section className="flex flex-col items-center justify-between gap-5 border-b border-[#395d8c4d] pb-4 md:flex-row">
          <div className="text-textPrimary flex items-center gap-[10px] text-sm font-semibold">
            <Image src="/images/dashboard/rental.png" width={40} height={40} alt="icon" />
            <div className="flex flex-col">
              <p className="text-[22px] font-semibold">Properties</p>
              <p className="text-sm font-medium text-[#666666]">Showing 1-20 of 350 properties</p>
            </div>
          </div>
          <div className="flex items-end justify-end">
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
            houses={houses}
            selectedProperty={selectedProperty}
          />
        ) : (
          <div>
            <MapView
              handleCloseSlider={handleCloseSlider}
              handleCardClick={handleCardClick}
              houses={houses}
              selectedProperty={selectedProperty}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoriteHeader;
