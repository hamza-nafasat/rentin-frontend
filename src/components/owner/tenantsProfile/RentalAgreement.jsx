import React from 'react';

const DetailItem = ({ label, value, valueClass = 'font-medium' }) => (
  <>
    <div className="flex justify-between py-0.5">
      <p className="text-xs text-[#5F5F5F]">{label}</p>
      <p className={`text-xs text-[#5F5F5F] ${valueClass}`}>{value}</p>
    </div>
    <div className="border-t-1 border-[#5F5F5F]"></div>
  </>
);

const Section = ({ title, subTitle, extraHeader, children }) => (
  <section className="rounded-lg bg-white px-5 py-3.5 shadow-lg">
    {subTitle ? (
      <>
        <h1 className="text-lg font-semibold">{title}</h1>
        <h1 className="text-lg font-bold text-[#0245A5]">{subTitle}</h1>
      </>
    ) : (
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold">{title}</h1>
        {extraHeader && <h1 className="text-primary text-base font-semibold">{extraHeader}</h1>}
      </div>
    )}
    <div className="mt-[17.5px] grid grid-cols-1 gap-5 lg:grid-cols-2">{children}</div>
  </section>
);

const RentalAgreement = () => {
  return (
    <div className="space-y-4">
      {/* Rental Agreement Details */}
      <Section title="Rental Agreement Details" subTitle="Luxury Apartment - 5th Avenue, NY">
        <div className="flex flex-col gap-2.5">
          <DetailItem label="Monthly Rent" value="$1,500" />
          <DetailItem label="Security Deposit" value="$1,500" />
          <DetailItem label="Renewal Option" value="Yes" />
        </div>
        <div className="flex flex-col gap-2.5">
          <DetailItem label="Lease Duration" value="12 Months" />
          <DetailItem label="Contract Status" value="Signed" />
        </div>
      </Section>

      {/* Payment History & Dues */}
      <Section title="Payment History & Dues">
        <div className="flex flex-col gap-2.5">
          <DetailItem label="Last Payment Date" value="5th jan 2024" />
          <DetailItem label="Total Amount Paid" value="$1,500" />
        </div>
        <div className="flex flex-col gap-2.5">
          <DetailItem label="Next Due Date" value="5th Feb 2024" />
          <DetailItem label="Pending Amount" value="$1,500" />
        </div>
      </Section>

      {/* Lease & Contract Overview */}
      <Section title="Lease & Contract Overview">
        <div className="flex flex-col gap-2.5">
          <DetailItem label="Contract Start" value="01 Jan 2024" />
          <DetailItem label="Contract Status" value="Active" />
        </div>
        <div className="flex flex-col gap-2.5">
          <DetailItem label="Contract Expiry" value="5th Feb 2024" />
          <DetailItem label="Notice Period" value="30 Days" />
        </div>
      </Section>

      {/* Lease Actions & Control */}
      <Section title="Lease Actions & Control">
        <div className="flex flex-col gap-2.5">
          <DetailItem
            label="Contract Documents"
            value="View"
            valueClass="text-sm text-primary font-medium"
          />
          <DetailItem
            label="Notice to Vacate"
            value="Send Notice"
            valueClass="text-sm text-primary font-medium"
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <DetailItem
            label="New Contract"
            value="Add"
            valueClass="text-sm text-primary font-medium"
          />
          <DetailItem
            label="Agreement"
            value="View"
            valueClass="text-sm text-primary font-medium"
          />
        </div>
      </Section>

      {/* Agent Information */}
      <Section title="Agent Information" extraHeader="View Detail">
        <div className="flex flex-col gap-2.5">
          <DetailItem label="Agent Name" value="Name" />
          <DetailItem label="Content" value="000000000" />
        </div>
        <div className="flex flex-col gap-2.5">
          <DetailItem label="Agency" value="xyz" />
          <DetailItem label="Email" value="example@gmail.com" />
        </div>
      </Section>
    </div>
  );
};

export default RentalAgreement;
