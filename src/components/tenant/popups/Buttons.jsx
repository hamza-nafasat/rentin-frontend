import Button from '@/components/shared/small/Button';
import React from 'react';

export default function Buttons({ text1, text2, cn, cn2, cancelHandle, acceptHandle }) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        cn={`!h-fit !w-fit !cursor-pointer !rounded-[2px] !px-5 !py-1.5 !text-[14px] !text-white ${cn}`}
        text={text1}
        onClick={cancelHandle}
      />
      <Button
        cn={`!h-fit !w-fit !cursor-pointer !rounded-[2px] !px-5 !py-1.5 !text-[14px] !text-white ${cn2}`}
        text={text2}
        onClick={acceptHandle}
      />
    </div>
  );
}
