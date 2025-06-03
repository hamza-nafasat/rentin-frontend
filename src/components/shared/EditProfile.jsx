'use client';
import React from 'react';
import Input from './small/Input';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Button from './small/Button';

function EditProfile() {
  return (
    <div>
      <form action="">
        <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-2">
          <Input shadow type={'text'} label={'Legal Name'} placeholder={'Your First Name'} />
          <Input shadow type={'text'} label={'User Name'} placeholder={'Your Last Name'} />
          <Input shadow type={'email'} label={'Email'} placeholder={'Your Email'} />
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#666666] lg:text-base" htmlFor="">
              Phone
            </label>
            <PhoneInput
              country={'us'}
              containerClass="phone-input-container"
              inputClass="phone-input-field"
              buttonClass="phone-input-button"
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: false,
                autoComplete: 'on',
              }}
            />
          </div>
          {/* <Input shadow type={'text'} label={'ID Number'} placeholder={'Your ID Number'} /> */}
          <Input shadow type={'text'} label={'Address'} placeholder={'Your Address'} />
        </div>
        <div className="mt-4 flex w-full items-center justify-end gap-4">
          <Button cn={' !bg-buttonSecondary hover:!bg-gary-500'} text={'Edit'} />
          <Button text={'Save'} />
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
