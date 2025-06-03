import Button from '@/components/shared/small/Button';
import Image from 'next/image';
import React from 'react';

function BuildingItem() {
  const data = [
    {
      src: '/images/default/build1.png',
      title: 'Charming Homes in Thailand',
      status: 'Rent',
      address: '123 Sunset Road, Phuket, Thailand',
      price: '$243',
    },
    {
      src: '/images/default/build2.png',
      title: 'Charming Homes in Thailand',
      status: 'Rent',
      address: '123 Sunset Road, Phuket, Thailand',
      price: '$243',
    },
    {
      src: '/images/default/build3.png',
      title: 'Charming Homes in Thailand',
      status: 'Rent',
      address: '123 Sunset Road, Phuket, Thailand',
      price: '$243',
    },
    {
      src: '/images/default/build4.png',
      title: 'Charming Homes in Thailand',
      status: 'Rent',
      address: '123 Sunset Road, Phuket, Thailand',
      price: '$243',
    },
  ];
  return (
    <div className="mb-4 flex w-[100%] flex-col items-center justify-between gap-3.5 px-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex w-[100%] flex-col items-center justify-between gap-5 border-b-2 pb-4 sm:flex-row md:border-b-0 md:pb-0"
        >
          <Image src={item.src} width={182} height={100} alt="icon" />
          <div className="basis-[75%]">
            <div className="flex justify-between gap-2">
              <p className="mb-1.5 text-[16px] font-semibold tracking-[1px] text-[#32343C]">{item.title}</p>
              <span>
                {item.status == 'Rent' ? (
                  <Button
                    text={'Rent'}
                    cn={'!w-fit !h-fit !rounded-[2px] !text-[#0245A5] !py-1 !px-2 !text-[12px] !bg-[#1D7FFF1A]'}
                  />
                ) : (
                  <Button
                    text={'Free'}
                    cn={'!w-fit !h-fit !rounded-[2px] !text-[#E35454] !py-1 !px-2 !text-[12px] !bg-[#E3545433]'}
                  />
                )}
              </span>
            </div>
            <p className="text-textSecondary mb-1.5 text-[12px] tracking-[1px]">{item.address}</p>
            <div className="flex justify-between">
              <p>
                <span className="text-[16px] font-semibold tracking-[1px] text-[#32343C]">{item.price}</span>
                <span className="text-textSecondary text-[8px]">Per month</span>
              </p>
              <Button
                text={'Details'}
                cn={'!w-fit !h-fit !rounded-[2px] !text-[#39DA4C] !underline !py-1 !px-2 !text-[12px] !bg-[#EEFFF2]'}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BuildingItem;
