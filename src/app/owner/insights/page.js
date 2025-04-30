import InquiryRate from '@/components/owner/insights/InquiryRate';
import InsightEarning from '@/components/owner/insights/InsightEarning';
import PropertyPerformance from '@/components/owner/insights/PropertyPerformance';
import TenantDisputes from '@/components/owner/insights/TenantDisputes';
import TenantIntent from '@/components/owner/insights/TenantIntent';
import TopCards from '@/components/owner/insights/TopCards';
import TotalRevenue from '@/components/owner/insights/TotalRevenue';
import {
  earningsData,
  insightCardsData,
  tenantIncomeLegendLabels,
  tenantIntent,
} from '@/data/data';

const Insights = () => {
  return (
    <div className="flex h-full flex-col gap-4">
      <h3 className="text-textColor text-lg font-semibold md:text-[22px]">Insight Details</h3>
      <TopCards data={insightCardsData} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="flex h-[247px] grid-cols-12 rounded-md bg-white shadow-md lg:col-span-4">
          <TenantIntent
            title="Tenant Intent"
            data={tenantIntent}
            legend={tenantIncomeLegendLabels}
          />
        </div>
        <div className="flex h-[247px] grid-cols-12 rounded-md bg-white shadow-md lg:col-span-4">
          <TotalRevenue />
        </div>
        <div className="flex h-[247px] grid-cols-12 rounded-md bg-white shadow-md lg:col-span-4">
          <InquiryRate />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="h-[336px] rounded-md bg-white p-5 shadow-md lg:col-span-6">
          <PropertyPerformance />
        </div>
        <div className="h-[336px] rounded-md bg-white p-5 shadow-md lg:col-span-6">
          <TenantDisputes />
        </div>
      </div>
      <div className="grid h-[370px] grid-cols-1 rounded-md bg-white p-5 shadow-md">
        <InsightEarning data={earningsData} />
      </div>
    </div>
  );
};

export default Insights;
