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

import AvailableContracts from './AvailableContracts';

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

// Renders a single label with divider
const LabelItem = ({ label }) => (
  <div className="flex flex-col gap-2.5">
    <div className="flex gap-2">
      <p className="text-xs text-[#5F5F5F]">{label}</p>
    </div>
    <div className="border-t-1 border-[#5F5F5F]" />
  </div>
);

// Renders a grid of LabelItems in 4 columns per row
const FeatureSection = ({ title, data }) => (
  <section>
    <h2 className="text-sm font-semibold">{title}</h2>
    <div className="mt-[17.5px] grid grid-cols-1 gap-5 lg:grid-cols-4">
      {data.map((item, idx) => (
        <LabelItem
          key={idx}
          label={typeof item === 'string' ? item : item.label}
          value={typeof item === 'object' ? item.value : undefined}
        />
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
  availableContracts,
  data,
}) {
  // Extract the description from the data
  const propertyDescription = data?.description || '';
  const propertyTitle = data?.propertyTitle || '';
  const projectName = data?.projectName || '';

  // Default fallback description if none provided
  const defaultDescription = `Experience unparalleled luxury and sophistication at ${projectName || 'this exceptional property'}, located in one of the most sought-after neighborhoods. This exceptional residence effortlessly blends contemporary design with timeless elegance, offering a lifestyle of comfort and refinement.`;

  return (
    <div>
      {availableContracts && availableContracts.length > 0 && <AvailableContracts contracts={availableContracts} />}

      <h1 className="mb-3.5 text-[18px] font-semibold">Description</h1>

      {/* Dynamic description */}
      <p className="text-sm text-[#5F5F5FCC]">{propertyDescription || defaultDescription}</p>

      <section className="mt-5">
        🏡 <span className="ml-1.5 text-base font-semibold">Key Features:</span>
        <div className="mt-3.5 flex flex-col gap-2 px-5">
          {rentalAgreementDetails && rentalAgreementDetails.length > 0 && (
            <InfoSection title="Rental Agreement Details" columns={2} data={rentalAgreementDetails} />
          )}
          {paymentHistory && paymentHistory.length > 0 && (
            <InfoSection title="Payment History & Dues" columns={2} data={paymentHistory} />
          )}
          {amenities && amenities.length > 0 && <FeatureSection title="Amenities" data={amenities} />}
          {furnishing && furnishing.length > 0 && <FeatureSection title="Furnishing" data={furnishing} />}
          {security && security.length > 0 && <FeatureSection title="Security and Safety" data={security} />}
          {views && views.length > 0 && <FeatureSection title="Views and Direction" data={views} />}
        </div>
      </section>
    </div>
  );
}
