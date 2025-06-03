'use client';
import { BuildingIcon, EyeIcon, ListIcon } from '@/assets/icon';
import Link from 'next/link';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-4 px-1 md:flex-row">
      <h3 className="text-textPrimary text-lg font-semibold md:text-[22px]">
        Welcome! <span className="font-normal">Alexander</span>
      </h3>
      <div className="flex flex-wrap items-center gap-4 md:gap-5">
        <Button text="Views & Interested Tenants" icon={<EyeIcon />} />
        <Link href="owner/add-property">
          <Button text="Add Property" icon={<BuildingIcon />} />
        </Link>
        <CustomDropDown lists={['Week', 'Month', 'Year']} />
      </div>
    </div>
  );
};

export default Welcome;

const Button = ({ text, icon }) => {
  return (
    <button className="bg-primary flex cursor-pointer place-items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-[#01367f]">
      {icon}
      {text}
    </button>
  );
};

const CustomDropDown = ({ lists }) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Week');
  const selectHandler = option => {
    setSelectedOption(option);
    setIsOptionOpen(false);
  };
  const optionsHandler = () => setIsOptionOpen(!isOptionOpen);
  return (
    <div className="relative z-10">
      <div
        className="bg-buttonSecondary flex cursor-pointer items-center justify-between gap-2 rounded-lg px-4 py-2 text-sm text-nowrap text-white"
        onClick={() => optionsHandler()}
      >
        <ListIcon />
        {selectedOption}
        <div className={`transition-all duration-300 ${isOptionOpen ? 'rotate-180' : 'rotate-0'}`}>
          <IoIosArrowDown fontSize={18} />
        </div>
      </div>
      {isOptionOpen && (
        <ul className="shadow-card absolute top-[40px] left-0 flex w-full flex-col rounded-lg bg-white">
          {lists.map((list, i) => (
            <li
              key={i}
              className="cursor-pointer border-b px-2 py-1 text-sm text-[#00000099] hover:bg-gray-100"
              onClick={() => selectHandler(list)}
            >
              {list}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
