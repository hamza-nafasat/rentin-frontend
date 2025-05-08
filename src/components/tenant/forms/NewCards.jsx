'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export default function NewCards() {
  const [isactiveindex, setisactiveindex] = useState('');
  const data = [
    { title: 'master card', src: '/images/default/mastercard.png' },
    { title: 'discover card', src: '/images/default/discover.png' },
    { title: 'visa card', src: '/images/default/visa.png' },
    { title: 'visa card', src: '/images/default/visa.png' },
    { title: 'master card', src: '/images/default/mastercard.png' },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {data.map((item, index) => (
        <div key={index}>
          <div
            className={`${isactiveindex === index ? 'border-primary bg-blue-300' : 'border-gray-300'} flex h-[40px] cursor-pointer items-center justify-center gap-2 rounded-[7px] border p-2`}
            htmlFor={index}
            onClick={() => {
              setisactiveindex(index);
              console.log(item.title);
            }}
          >
            <Image src={item.src} width={42} height={15} alt="icon" />
          </div>
        </div>
      ))}
    </div>
  );
}
