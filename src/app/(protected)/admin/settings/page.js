'use client';
import { useState } from 'react';
import ChangePassword from '@/components/shared/ChangePassword';
import Input from '@/components/shared/small/Input';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Button from '@/components/shared/small/Button';

function Setting() {
  const [tab, setTab] = useState('Profile');
  return (
    <div>
      <div className="rounded-lg bg-white p-4">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-0">
          <div className="flex items-center gap-4">
            <div>
              <Image src="/images/default/settingProfilePic.png" width={94} height={94} alt="Profile Pic" />
            </div>
            <div>
              <h1 className="text-[19px] font-medium">Alexander</h1>
              <p className="text-[15px] text-[#A3B2C6]">alex@zemlya.com</p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-4">
            {['Change Password', 'Profile'].map((item, i) => (
              <div key={i}>
                <Button
                  text={item}
                  cn={`px-4 py-2 text-[16px] text-white ${
                    tab === item ? 'bg-primary' : '!bg-buttonSecondary hover:!bg-gray-500'
                  }`}
                  onClick={() => setTab(item)}
                >
                  {item}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5">
          {tab === 'Change Password' && <ChangePassword />}
          {tab === 'Profile' && (
            <>
              <div>
                <form action="">
                  <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-2">
                    <Input shadow type={'text'} label={'First Name'} placeholder={'Your First Name'} />
                    <Input shadow type={'text'} label={'Last Name'} placeholder={'Your Last Name'} />
                    <Input shadow type={'email'} label={'Email'} placeholder={'Your Email'} />
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
                    <Input shadow type={'text'} label={'ID Number'} placeholder={'Your ID Number'} />
                    <Input shadow type={'text'} label={'Address'} placeholder={'Your Address'} />
                  </div>
                </form>
              </div>
              <div className="mt-4 flex w-full items-center justify-end gap-4">
                <Button cn={'!bg-buttonSecondary hover:!bg-gray-500'} text={'Edit'} />
                <Button text={'Save'} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Setting;
