'use client';
import { PropertyInspection, ShowAgent } from '@/assets/icon';
import { useRouter } from 'next/navigation';

const OnDemandService = () => {
  const router = useRouter();

  const navigateToInspection = () => {
    router.push(`/owner/inspection`);
  };
  const navigateToAgent = () => {
    router.push(`/owner/agent/hiring-new-agent`);
  };

  return (
    <div>
      <h3 className="text-textColor text-lg font-semibold md:text-[22px]">Choose Assistance</h3>
      <div className="mt-4 grid grid-cols-1 gap-6 px-14 lg:grid-cols-2">
        <div
          onClick={navigateToInspection}
          className="shadow-ld flex h-[290px] w-full cursor-pointer flex-col items-center justify-center rounded-md bg-white hover:bg-blue-200"
        >
          <div>
            <PropertyInspection />
          </div>
          <div className="mt-3.5">
            <p className="text-2xl font-semibold">Property Inspection</p>
          </div>
          <div className="w-[300px] text-center lg:w-[445px]">
            <p className="text-base font-normal text-[#32343C]">
              Ensure your property is verified and inspected before listing. Get a professional
              inspection report.
            </p>
          </div>
        </div>
        <div
          onClick={navigateToAgent}
          className="shadow-ld flex h-[290px] w-full cursor-pointer flex-col items-center justify-center rounded-md bg-white hover:bg-blue-200"
        >
          <div>
            <ShowAgent />
          </div>
          <div className="mt-3.5">
            <p className="text-2xl font-semibold">Showing Agent</p>
          </div>
          <div className="w-[300px] text-center lg:w-[445px]">
            <p className="text-base font-normal text-[#32343C]">
              A professional agent will manage all property showings, coordinate with tenants, and
              provide guided tours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnDemandService;
