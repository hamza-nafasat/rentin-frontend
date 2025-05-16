import React from 'react';
import Input from '@/components/shared/small/Input';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function AgentEditProfile() {
  return (
    <div>
      <form action="">
        <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-2">
          <Input type={'text'} label={'First Name'} placeholder={'Your First Name'} />
          <Input type={'text'} label={'Last Name'} placeholder={'Your Last Name'} />
          <Input type={'email'} label={'Email'} placeholder={'Your Email'} />
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#666666] lg:text-base" htmlFor="">
              Number
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
          <Input type={'text'} label={'ID Number'} placeholder={'Your ID Number'} />
          <Input type={'text'} label={'Experience'} placeholder={'3 Years'} />
          <Input type={'text'} label={'Agent Type'} placeholder={'Both'} />
          <Input type={'text'} label={'Area'} placeholder={'West Thailand'} />
        </div>
        <div className="mt-3 grid grid-cols-1">
          <div>
            <h1 className="mb-2 text-[16px] font-semibold">License/Certification</h1>
            <div className="flex flex-col items-center justify-evenly border border-dashed py-[20px]">
              <Image src="/images/default/upload.png" width={46} height={30} alt="cnic" />
              <p className="mb-3 text-[12px] text-[#1A1A1A]">Upload License/Certification</p>
              <div className="mb-2 flex items-center gap-2">
                <input type="checkbox" name="license" id="license" />
                <label htmlFor="license">I don't have a license yet</label>
              </div>
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

export default AgentEditProfile;
