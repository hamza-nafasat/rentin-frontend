import React from 'react';

const AvailableContracts = ({ contracts }) => {
  if (!contracts || contracts.length === 0) {
    return null;
  }

  const formatDuration = (duration, unit) => {
    if (duration === 1) {
      return `${duration} ${unit?.slice(0, -1) || 'Month'}`;
    }
    if (duration === 12 && unit?.toLowerCase() === 'months') {
      return `1 Year`;
    }
    if (duration === 24 && unit?.toLowerCase() === 'months') {
      return `2 Years`;
    }
    return `${duration} ${unit || 'Months'}`;
  };

  const formatBenefits = benefits => {
    if (typeof benefits === 'string') {
      return benefits;
    }
    if (typeof benefits === 'number') {
      return `${benefits}% Benefits`;
    }
    return '0% Benefits';
  };

  return (
    <div className="mb-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">Available Contracts</h2>
      <div className="overflow-hidden rounded-lg bg-gray-50">
        <div className="grid grid-cols-5 gap-4 bg-gray-100 p-4 text-sm font-medium text-gray-700">
          <div>Contract</div>
          <div>Price</div>
          <div>Duration</div>
          <div>Security Deposit</div>
        </div>
        {contracts.map((contract, index) => (
          <div
            key={contract.id}
            className={`grid grid-cols-5 gap-4 border-b border-gray-200 p-4 transition-colors hover:bg-gray-50 ${
              contract.isRecommended ? 'border-blue-200 bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center">
              <span className="font-medium text-blue-600">{contract.name}</span>
              {contract.isRecommended && (
                <span className="ml-2 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">Recommended</span>
              )}
            </div>
            <div className="text-lg font-semibold text-blue-600">${contract.rent.toLocaleString()}</div>
            <div className="text-gray-600">{formatDuration(contract.duration, contract.durationUnit)}</div>
            {/* //<div className="text-gray-600">{formatBenefits(contract.benefits)}</div> */}
            <div className="text-gray-600">${contract.securityDeposit}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableContracts;
