'use client';
import React from 'react';
import Tab1 from '@/components/tenant/popups/Tab1';
import Tab2 from '@/components/tenant/popups/Tab2';
import Tab3 from '@/components/tenant/popups/Tab3';
import Tab4 from '@/components/tenant/popups/Tab4';
import Tab5 from '@/components/tenant/popups/Tab5';
import Tab6 from '@/components/tenant/popups/Tab6';
import Tab7 from '@/components/tenant/popups/Tab7';
import Tab8 from '@/components/tenant/popups/Tab8';
import Tab9 from '@/components/tenant/popups/Tab9';
import Tab10 from '@/components/tenant/popups/Tab10';
import QrcodeBtn from '@/components/tenant/popups/QrcodeBtn';
import Tab11 from '@/components/tenant/popups/Tab11';
import Tab12 from '@/components/tenant/popups/Tab12';
import Tab14 from '@/components/tenant/popups/Tab14';
import Tab13 from '@/components/tenant/popups/Tab13';
import Tab15 from '@/components/tenant/popups/Tab15';
import Tab16 from '@/components/tenant/popups/Tab16';
import Tab17 from '@/components/tenant/popups/Tab17';
import AgentProfile from '@/components/tenant/popups/AgentProfile';
import LinkedProperties from '@/components/tenant/popups/LinkedProperties';

function AllModals() {
  return (
    <div>
      <div className="flex flex-col flex-wrap gap-1">
        <h1 className="text-center text-[24px] font-bold">Property Viewing Request</h1>
        <div>
          <h1 className="mb-2 text-[24px] font-bold">User Sending request</h1>
          <div className="flex flex-wrap gap-2">
            <Tab1 />
            <Tab2 />
            <Tab3 />
            <Tab4 />
            <Tab5 />
          </div>
        </div>
        <div>
          <h1 className="my-2 text-[24px] font-bold">Owner Received Request</h1>
          <div className="flex flex-wrap gap-2">
            <Tab6 />
            <Tab7 />
            <Tab8 />
          </div>
        </div>
        <div>
          <h1 className="my-2 text-[24px] font-bold">Agent Property viewing received request </h1>
          <div className="flex flex-wrap gap-2">
            <Tab9 />
            <Tab10 />
          </div>
        </div>
      </div>
      <div className="w-27">
        <h1 className="my-3 text-[24px] font-bold">QR Code</h1>
        <QrcodeBtn />
      </div>
      <h1 className="text-center text-[24px] font-bold">Property Booking</h1>
      <div>
        <h1 className="text-[24px] font-bold">User Send Booking request</h1>
        <div className="flex">
          <Tab11 />
        </div>
        <h1 className="text-[24px] font-bold">Owner received request & send parposal</h1>
        <div className="flex">
          <Tab12 />
        </div>
        <h1 className="text-[24px] font-bold">
          Tenant received owner approval and received owner proposal tenet acknowledge proposal and payment
        </h1>
        <div className="flex gap-2">
          <Tab13 />
          <Tab14 />
        </div>
      </div>
      <h1 className="text-center text-[24px] font-bold">On demand inspection services</h1>
      <div>
        <h1 className="text-[24px] font-bold">Owner send Inspection proposal </h1>
        <div className="flex gap-2">
          <Tab15 />
          <Tab16 />
        </div>
        <div>
          <h1 className="text-[24px] font-bold">
            Agent received inspection proposal in chat and check details and also send inspection report
          </h1>
          <div className="flex">
            <Tab17 />
          </div>
        </div>
        <h1 className="text-center text-[24px] font-bold">Agent Profile</h1>
        <AgentProfile />
      </div>
      <div className="mt-5">
        <LinkedProperties />
      </div>
    </div>
  );
}

export default AllModals;
