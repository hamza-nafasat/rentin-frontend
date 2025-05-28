'use client';
import { useState } from 'react';
import ChangePassword from './ChangePassword';
import EditProfile from './EditProfile';
import Image from 'next/image';

function Settings() {
  const [tab, setTab] = useState('Profile');
  return (
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
              <button
                className={`cursor-pointer rounded-md px-4 py-2 text-[16px] text-white ${
                  tab === item ? 'bg-primary font-medium' : 'bg-[#A7A7A7] font-medium text-white'
                }`}
                onClick={() => setTab(item)}
              >
                {item}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5">
        {tab === 'Change Password' && <ChangePassword />}
        {tab === 'Profile' && <EditProfile />}
      </div>
    </div>
  );
}

export default Settings;
