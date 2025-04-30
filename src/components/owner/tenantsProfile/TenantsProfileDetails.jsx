import React from 'react';
import RentalAgreement from './RentalAgreement';
import RentChart from './RentChart';
import PieChartComponent from './PieChartComponent';
import TransactionHistory from './TransactionHistory';

function TenantsProfileDetails() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-9">
        <RentalAgreement />
      </div>
      <div className="col-span-12 space-y-4 lg:col-span-3">
        <RentChart />
        <RentChart />
        <PieChartComponent />
      </div>
      <div className="col-span-12 space-y-4">
        <TransactionHistory />
      </div>
    </div>
  );
}

export default TenantsProfileDetails;
