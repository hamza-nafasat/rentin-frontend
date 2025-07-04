import Button from '@/components/shared/small/Button';
import React from 'react';

export default function Buttons({ text1, text2, cn, cn2, cancelHandle, acceptHandle }) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        cn={`bg-primary cursor-pointer place-items-center rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-[#01367f] ${cn}`}
        text={text1}
        onClick={cancelHandle}
      />
      <Button
        cn={`bg-primary cursor-pointer place-items-center rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-[#01367f] ${cn2}`}
        text={text2}
        onClick={acceptHandle}
      />
    </div>
  );
}
