import React from 'react';
import Input from './small/Input';
import Button from './small/Button';

function ChangePassword() {
  return (
    <div>
      <h1 className="text-[19px] font-semibold">ChangePassword</h1>
      <div className="mt-3 grid grid-cols-1 gap-3">
        <Input shadow type={'text'} label={'Old Password'} placeholder="Old Password" />
        <Input shadow type={'text'} label={'New Password'} placeholder="New Password" />
        <Input shadow type={'text'} label={'Confirm Password'} placeholder="Confirm Password" />
        <Button cn={'!w-fit !text-[16px] !h-fit !py-1.5 !px-4 !rounded-[4px]'} text={'Update'} />
      </div>
    </div>
  );
}

export default ChangePassword;
