'use client';
import React from 'react';
import Input from './small/Input';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function EditProfile() {
  return (
    <div>
      <form action="">
        <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-2">
          <Input shadow type={'text'} label={'First Name'} placeholder={'Your First Name'} />
          <Input shadow type={'text'} label={'Last Name'} placeholder={'Your Last Name'} />
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
          <Input shadow type={'text'} label={'ID Number'} placeholder={'Your ID Number'} />
          <Input shadow type={'text'} label={'Address'} placeholder={'Your Address'} />
        </div>
        <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <h1 className="mb-2 text-[16px] font-semibold">Front CNIC</h1>
            <div className="flex flex-col items-center justify-evenly border border-dashed py-[20px]">
              <Image className="mb-3" src="/images/default/cnic.svg" width={46} height={30} alt="cnic" />
              <p className="mb-3 text-[12px] text-[#1A1A1A]">CNIC</p>
              <label
                className="bg-primary rounded-[6px] border px-4 py-1.5 text-[12px] text-white"
                htmlFor="fileUpload"
              >
                Browse
              </label>
              <input className="hidden" type="file" id="fileUpload" accept=".jpg,.jpeg,.png" />
            </div>
          </div>
          <div>
            <h1 className="mb-2 text-[16px] font-semibold">Back CNIC</h1>
            <div className="flex flex-col items-center justify-evenly border border-dashed py-[20px]">
              <Image className="mb-3" src="/images/default/cnic.svg" width={46} height={30} alt="cnic" />
              <p className="mb-3 text-[12px] text-[#1A1A1A]">CNIC</p>
              <label
                className="bg-primary rounded-[6px] border px-4 py-1.5 text-[12px] text-white"
                htmlFor="fileUpload"
              >
                Browse
              </label>
              <input className="hidden" type="file" id="fileUpload" accept=".jpg,.jpeg,.png" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
