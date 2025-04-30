import React from 'react';
import {
  Balcony,
  Barbeque,
  Bath,
  Canal,
  Cctv,
  City,
  Furnished,
  Garden,
  GreenView,
  Guard,
  Gym,
  Internet,
  Maids,
  Parking,
  Pool,
  Private,
  Renovated,
  Security,
  Study,
  Theatre,
  Wardrobe,
} from '@/assets/icon';

// Renders a label/value pair with a divider
const InfoItem = ({ label, value }) => (
  <div className="flex flex-col gap-2.5">
    <div className="flex justify-between">
      <p className="text-xs text-[#5F5F5F]">{label}</p>
      <p className="text-xs font-medium text-[#5F5F5F]">{value}</p>
    </div>
    <div className="border-t-1 border-[#5F5F5F]" />
  </div>
);

// Renders a section of InfoItems in columns
const InfoSection = ({ title, columns, data }) => (
  <section>
    <h2 className="text-sm font-semibold">{title}</h2>
    <div className={`grid grid-cols-1 gap-5 lg:grid-cols-${columns} mt-[17.5px]`}>
      {data.map((colItems, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-2.5">
          {colItems.map((item, idx) => (
            <InfoItem key={idx} label={item.label} value={item.value} />
          ))}
        </div>
      ))}
    </div>
  </section>
);

// Renders a single icon + label with divider
const IconItem = ({ Icon, label }) => (
  <div className="flex flex-col gap-2.5">
    <div className="flex gap-2">
      <Icon />
      <p className="text-xs text-[#5F5F5F]">{label}</p>
    </div>
    <div className="border-t-1 border-[#5F5F5F]" />
  </div>
);

// Renders a grid of IconItems in columns
const IconSection = ({ title, columns, data }) => (
  <section>
    <h2 className="text-sm font-semibold">{title}</h2>
    <div className={`grid grid-cols-1 gap-5 lg:grid-cols-${columns} mt-[17.5px]`}>
      {data.map((colItems, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-2.5">
          {colItems.map((item, idx) => {
            const IconComponent = {
              Balcony,
              Barbeque,
              Bath,
              Canal,
              Cctv,
              City,
              Furnished,
              Garden,
              GreenView,
              Guard,
              Gym,
              Internet,
              Maids,
              Parking,
              Pool,
              Private,
              Renovated,
              Security,
              Study,
              Theatre,
              Wardrobe,
            }[item.icon];
            return <IconItem key={idx} Icon={IconComponent} label={item.label} />;
          })}
        </div>
      ))}
    </div>
  </section>
);

export default function Description({
  rentalAgreementDetails,
  paymentHistory,
  amenities,
  furnishing,
  security,
  views,
}) {
  return (
    <div>
      <h1 className="mb-3.5 text-[18px] font-semibold">Description</h1>
      <p className="text-sm text-[#5F5F5FCC]">
        Experience unparalleled luxury and sophistication at The Crest Sukhumvit 34, located in one
        of Bangkok's most sought-after neighborhoods. This exceptional residence effortlessly blends
        contemporary design with timeless elegance, offering a lifestyle of comfort and refinement
        in the heart of the city.
      </p>

      <section className="mt-5">
        🏡 <span className="ml-1.5 text-base font-semibold">Key Features:</span>
        <div className="mt-3.5 flex flex-col gap-2 px-5">
          <InfoSection title="Rental Agreement Details" columns={2} data={rentalAgreementDetails} />
          <InfoSection title="Payment History & Dues" columns={2} data={paymentHistory} />
          <IconSection title="Amenities" columns={4} data={amenities} />
          <IconSection title="Furnishing" columns={4} data={furnishing} />
          <IconSection title="Security and Safety" columns={3} data={security} />
          <IconSection title="Views and Direction" columns={4} data={views} />
        </div>
      </section>
    </div>
  );
}
