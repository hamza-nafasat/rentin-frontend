'use client';
import React, { useState } from 'react';
import SearchInput from '@/components/shared/small/SearchInput';
import Selector from '@/components/shared/small/Selector';
import Image from 'next/image';
import ShowBuildings from './ShowBuildings';

function Content15() {
  const [selectedType, setSelectedType] = useState('Type');
  const [selectedPrice, setSelectedPrice] = useState('Status');
  return (
    <div className="shadow-card bg-white">
      <div className="flex flex-col border-b pb-4 sm:flex-row">
        <div className="mt-3 flex w-[200px] items-center gap-2">
          <Image src="/images/default/building.png" width={32} height={30} alt="icon" />
          <p className="text-[16px] font-semibold text-[#32343C]">My Properties</p>
        </div>
        <div>
          <FiltersSection
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
          />
        </div>
      </div>
      <div className="my-3">
        <ShowBuildings />
      </div>
    </div>
  );
}
export default Content15;
const FiltersSection = ({ selectedType, setSelectedType, selectedPrice, setSelectedPrice }) => {
  return (
    <div className="mt-4 flex flex-wrap gap-4">
      <div className="w-full flex-grow md:w-auto md:flex-grow-[2]">
        <SearchInput placeholder="properties" cn="!w-full text-[#000]" />
      </div>
      <div className="min-w-[150px] flex-grow md:w-auto">
        <Selector
          cn="!w-full"
          lists={['All', 'Active', 'Inactive']}
          selectedOption={selectedPrice}
          setSelectedOption={setSelectedPrice}
        />
      </div>
      <div className="min-w-[150px] flex-grow md:w-auto">
        <Selector
          cn="!w-full"
          lists={['All', 'Active', 'Inactive']}
          selectedOption={selectedType}
          setSelectedOption={setSelectedType}
        />
      </div>
    </div>
  );
};
