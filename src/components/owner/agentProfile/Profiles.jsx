'use client';
import { useState } from 'react';
import BasicDetails from './BasicDetails';
import LinkBuildings from './LinkBuildings';
import Transaction from './Transaction';
const Profile = () => {
  const [activeTab, setActiveTab] = useState('Basic Details');

  const renderComponent = () => {
    switch (activeTab) {
      case 'Basic Details':
        return <BasicDetails />;
      case 'Linked Buildings':
        return <LinkBuildings />;
      case 'Transaction':
        return <Transaction />;
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
      <div className="item-center flex w-[140px] flex-col justify-center space-x-2 rounded-md bg-white p-1 lg:h-10 lg:w-[417px] lg:flex-row">
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
            Linked Buildings
          </button>
          <button
            className={buttonStyle('Transaction')}
            onClick={() => setActiveTab('Transaction')}
          >
            Transaction
          </button>
        </section>
      </div>

      <div className="mt-10 flex">{renderComponent()}</div>
    </div>
  );
};

export default Profile;
