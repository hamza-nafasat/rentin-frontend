import TopCards from '@/components/admin/properties/TopCards';
import InquiryRate from '@/components/owner/insights/InquiryRate';
import InsightEarning from '@/components/owner/insights/InsightEarning';
import PropertyPerformance from '@/components/owner/insights/PropertyPerformance';
import TenantDisputes from '@/components/owner/insights/TenantDisputes';
import TenantIntent from '@/components/owner/insights/TenantIntent';
import TotalRevenue from '@/components/owner/insights/TotalRevenue';
import PaymentTransactionHistory from '@/components/owner/payments/PaymentTransactionHistory';
import { earningsData, insightCardsData, tenantIncomeLegendLabels, tenantIntent } from '@/data/data';
import React from 'react';

function AdminInsights() {
  return (
    <div className="flex h-full flex-col gap-4">
      <h3 className="text-textColor text-lg font-semibold md:text-[22px]">Insight Details</h3>
      <TopCards data={insightCardsData} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="flex h-[247px] grid-cols-12 rounded-md bg-white shadow-md lg:col-span-4">
          <TenantIntent title="Tenant Intent" data={tenantIntent} legend={tenantIncomeLegendLabels} />
        </div>
        <div className="flex h-[247px] grid-cols-12 rounded-md bg-white shadow-md lg:col-span-4">
          <TotalRevenue />
        </div>
        <div className="flex h-[247px] grid-cols-12 rounded-md bg-white shadow-md lg:col-span-4">
          <InquiryRate />
        </div>
      </div>
      <div className="grid w-full grid-cols-1">
        <div className="rounded-md bg-white">
          <PaymentTransactionHistory />
        </div>
      </div>
      <div className="grid h-[370px] grid-cols-1 rounded-md bg-white p-5 shadow-md">
        <InsightEarning data={earningsData} />
      </div>
    </div>
  );
}

export default AdminInsights;
