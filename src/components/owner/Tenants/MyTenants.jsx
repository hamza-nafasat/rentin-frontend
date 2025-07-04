'use client';
import React from 'react';
import MyTenantsHeader from './MyTenantsHeader';
import Image from 'next/image';
import { IoHomeOutline } from 'react-icons/io5';
import { BiPhoneCall } from 'react-icons/bi';
import Agents from '@/assets/Tenants/Agents';
import LeaseList from './LeaseList';
import { GoArrowUpRight } from 'react-icons/go';
import { tenants } from '@/data/data';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';

function MyTenants() {
  const router = useRouter();

  return (
    <section className="shadow-card mt-4 rounded-lg bg-white p-4">
      <MyTenantsHeader />
      <div className="scroll-0 mt-3 grid max-h-[800px] grid-cols-1 gap-6 overflow-y-scroll md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
        {tenants.map((tenant, index) => (
          <div
            key={`${tenant.id}-${index}`}
            className="shadow-card h-full min-h-[330px] w-full min-w-[360px] rounded-lg border border-[#D5E0F6] bg-white px-[9px] py-[5px] lg:min-w-[320px]"
          >
            <div className="relative overflow-visible">
              <Image
                src={tenant.bgImage}
                width={340}
                height={110}
                alt="Property Background"
                className="mx-auto h-auto w-full rounded-t-lg"
              />
              <div className="3 absolute top-3.5 -bottom-10 left-6 z-10 size-[103px]">
                <Image
                  src={tenant.profileImage}
                  width={103}
                  height={103}
                  alt="Profile Image"
                  className="shadow-card h-full w-full rounded-full border-4 border-white"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col px-3.5 md:mt-9 lg:mt-12">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-base font-semibold">{tenant.name}</h1>
                  <div className="flex items-center gap-1 text-[#0245A5]">
                    <IoHomeOutline />
                    <span className="text-xs">{tenant.address}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BiPhoneCall />
                    <span className="text-xs">{tenant.phone}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#0245A5]">
                    <Agents />
                    <span className="text-xs">{tenant.agentName}</span>
                  </div>
                </div>
                <div className="flex h-6 justify-end rounded-[2px]">
                  <Button
                    onClick={() => router.push(`/owner/tenants/tenants-profile/${tenant?.id}`)}
                    text={'View Profile'}
                    icon={<GoArrowUpRight />}
                  />
                </div>
              </div>

              <LeaseList />
              <div className="flex items-center justify-center gap-8">
                <span className="text-base font-semibold">RENT</span>
                <span className="text-lg font-semibold">
                  {' '}
                  {tenant.rent}
                  <span className="text-xs font-semibold text-[#1F242F]">per month</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MyTenants;

const Button = ({ className, text, icon, ...rest }) => {
  return (
    <button
      {...rest}
      className={`${className} bg-primary flex cursor-pointer items-center gap-2 rounded-lg p-2 text-sm font-medium text-white hover:bg-[#01367f]`}
    >
      {text}
      {icon}
    </button>
  );
};
