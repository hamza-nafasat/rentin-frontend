'use client';
import AgentPropertyDetails from '@/components/agent/propertiies/AgentPropertyDetails';
import PropertyOwnerDetails from '@/components/agent/propertiies/PropertyOwnerDetails';
import { useState } from 'react';
const PropertyDetails = () => {
  const [activeTab, setActiveTab] = useState('Basic Details');

  const renderComponent = () => {
    switch (activeTab) {
      case 'Basic Details':
        return <AgentPropertyDetails />;
      case 'Linked Buildings':
        return <PropertyOwnerDetails />;
      default:
        return null;
    }
  };

  const buttonStyle = tab =>
    ` hover:bg-secondary cursor-pointer  rounded w-[131px] ${
      activeTab === tab ? 'bg-primary text-white' : 'bg-transparent text-gray-400'
    }`;

  return (
    <div className="py-4">
      <div className="item-center flex w-[140px] flex-col justify-center space-x-2 rounded-md bg-white p-1 lg:h-10 lg:w-[276px] lg:flex-row">
        <section className="flex flex-col md:gap-1 lg:flex-row">
          <button
            className={buttonStyle('Basic Details')}
            onClick={() => setActiveTab('Basic Details')}
          >
            Basic Details
          </button>
          <button
            className={buttonStyle('Linked Buildings')}
            onClick={() => setActiveTab('Linked Buildings')}
          >
            Owner Details
          </button>
        </section>
      </div>

      <div className="mt-5 flex">{renderComponent()}</div>
    </div>
  );
};

export default PropertyDetails;

// export default PropertyDetails;
