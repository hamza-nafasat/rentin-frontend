'use client';
import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const IconDropdown = ({
  lists,
  icon,
  containerClass = '',
  buttonClass = '',
  optionClass = '',
  selectedOption,
  setSelectedOption,
  defaultOption = 'Select',
}) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const selectHandler = option => {
    setSelectedOption(option);
    setIsOptionOpen(false);
  };

  const optionsHandler = () => setIsOptionOpen(!isOptionOpen);

  return (
    <div className={`relative z-50 ${containerClass}`}>
      <div
        className={`flex cursor-pointer items-center justify-between gap-2 rounded-[4px] p-2 text-sm text-nowrap transition-all duration-200 ${buttonClass}`}
        onClick={optionsHandler}
      >
        <div className="h-4 w-4 flex-shrink-0">{icon}</div>
        <span className="truncate">{selectedOption || defaultOption}</span>
        <div className={`transition-all duration-300 ${isOptionOpen ? 'rotate-180' : 'rotate-0'}`}>
          <IoIosArrowDown fontSize={18} />
        </div>
      </div>
      {isOptionOpen && (
        <ul
          className={`absolute top-[40px] left-0 flex w-full flex-col rounded-lg bg-white shadow-md ${optionClass}`}
        >
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

export default IconDropdown;
