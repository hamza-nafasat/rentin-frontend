'use client';
import Image from 'next/image';
import React, { useState } from 'react';

export default function Checkbox() {
  const [isactiveindex, setisactiveindex] = useState('');
  const data = [
    { title: 'credit card', src: '/images/default/other.png' },
    { title: 'Google pay', src: '/images/default/pay.png' },
    { title: 'Paypal', src: '/images/default/paypal.png' },
  ];
  return (
    <div>
      <div className="flex gap-6" id="box1">
        {data.map((item, index) => (
          <div key={index}>
            <div
              onClick={() => {
                setisactiveindex(index);
                console.log(item.title);
              }}
              className={`${isactiveindex === index ? 'border-primary border bg-blue-300 p-2' : ''} items-center-safe flex h-[55px] cursor-pointer justify-items-center gap-2 rounded-[7px] border p-2`}
            >
              <label htmlFor={index} onClick={() => console.log(item.title)}>
                <Image src={item.src} width={60} height={100} alt="icon" />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
