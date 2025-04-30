'use client';

import { SelectorDownIcon } from '@/assets/icon';
import { useEffect, useRef, useState } from 'react';

const Selector = ({ lists, selectedOption, setSelectedOption, cn }) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const selectorRef = useRef(null);
  const selectHandler = option => {
    setSelectedOption(option);
    setIsOptionOpen(false);
  };
  const optionsHandler = () => setIsOptionOpen(!isOptionOpen);

  useEffect(() => {
    const handleClickOutside = e => {
      if (selectorRef.current && !selectorRef.current.contains(e.target)) {
        setIsOptionOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <div className={`${cn} relative z-10 w-[110px]`} ref={selectorRef}>
      <div
        className="flex h-[40px] cursor-pointer items-center justify-between gap-2 rounded-sm border border-[#DCDCDC4D] bg-white p-2 text-sm text-nowrap text-[#969696]"
        style={{ boxShadow: '0px 2px 12px 0px #3582E70F' }}
        onClick={() => optionsHandler()}
      >
        <div>{selectedOption}</div>
        <div className={`transition-all duration-300 ${isOptionOpen ? 'rotate-180' : 'rotate-0'}`}>
          <SelectorDownIcon />
        </div>
      </div>
      {isOptionOpen && (
        <ul className="absolute top-[40px] left-0 flex w-full flex-col rounded-lg bg-white shadow-md">
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

export default Selector;
