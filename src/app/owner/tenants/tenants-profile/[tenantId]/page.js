import { IoHomeOutline } from 'react-icons/io5';
import { BiPhoneCall } from 'react-icons/bi';
import Agents from '@/assets/Tenants/Agents';
import Image from 'next/image';
import { BsChatSquareDotsFill } from 'react-icons/bs';
import { FaBookmark } from 'react-icons/fa';
import TenantsProfileDetails from '@/components/owner/tenantsProfile/TenantsProfileDetails';

const TenantsProfile = () => {
  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-textColor mb-[18px] text-lg font-semibold md:text-[22px]">
        Tenant Profile
      </h6>
      <div className="rounded-lg bg-white px-5 shadow-lg">
        <div className="h-full w-full rounded-lg px-2 py-8">
          <TenantsProfileHeader />
        </div>
        <div>
          <TenantsProfileDetails />
        </div>
      </div>
    </div>
  );
};

export default TenantsProfile;

const TenantsProfileHeader = () => {
  return (
    <section className="grid-coles-1 grid lg:grid-cols-2">
      <div className="flex items-center gap-6">
        <div className="size-40">
          <Image
            // src={tenant.bgImage}
            src="/images/properties/User.png"
            width={171}
            height={171}
            alt="Property Background"
            className="mx-auto h-auto w-full rounded-t-lg"
          />
        </div>
        <div>
          <h1 className="text-base font-semibold">Name</h1>
          <div className="flex items-center gap-1 text-[#0245A5]">
            <IoHomeOutline />
            <span className="text-xl font-medium">address</span>
          </div>
          <div className="flex items-center gap-1">
            <BiPhoneCall />
            <span className="text-xl font-medium">03333333</span>
          </div>
          <div className="flex items-center gap-1 text-[#0245A5]">
            <Agents />
            <span className="text-xl font-medium">agent name</span>
          </div>
        </div>
      </div>
      <div className="flex h-full items-end justify-end">
        <div className="flex items-center justify-center gap-4">
          <div className="scale-on-hover flex size-9 items-center justify-center bg-[#E9F2FF]">
            {' '}
            <BsChatSquareDotsFill className="text-[#0245A5]" />
          </div>
          <div className="scale-on-hover flex size-9 items-center justify-center bg-[#E9F2FF]">
            <FaBookmark className="text-[#0245A5]" />{' '}
          </div>
        </div>
      </div>
    </section>
  );
};
