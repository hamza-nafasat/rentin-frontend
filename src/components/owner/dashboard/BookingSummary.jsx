'use client';
import CustomLoading from '@/components/shared/small/CustomLoading';
import { bookingSummaryData, tableStyles } from '@/data/data';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useState } from 'react';
// import DataTable from 'react-data-table-component';
const DataTable = dynamic(() => import('react-data-table-component'), {
  ssr: false,
  loading: () => <CustomLoading />,
});
const BookingSummary = ({ title }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="rounded-lg border bg-white p-4 shadow-sm lg:p-5">
      <div className="text-textColor text-sm font-semibold">{title}</div>
      {isLoading ? (
        <CustomLoading />
      ) : bookingSummaryData.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">No transaction history available</p>
        </div>
      ) : (
        <DataTable
          data={bookingSummaryData.slice(0, 5)}
          columns={columns}
          selectableRowsHighlight
          customStyles={tableStyles}
          fixedHeader
          fixedHeaderScrollHeight="70vh"
          progressPending={isLoading}
        />
      )}
    </section>
  );
};

export default React.memo(BookingSummary);

const columns = [
  {
    name: 'Tenant Name',
    selector: row => row.tenantName,
  },
  {
    name: 'Property Name',
    selector: row => row.propertyName,
  },
  {
    name: 'Agent Involved',
    selector: row => row.agentInvolved,
  },
  {
    name: 'Lease Period ',
    selector: row => row.leasePeriod,
  },
  {
    name: 'Monthly Rent',
    selector: row => row.monthlyRent,
  },
  {
    name: 'Total Charges',
    selector: row => row.totalCharges,
  },
  {
    name: 'Actions',
    selector: () => (
      <Link href="" className="text-primary text-[13px] font-medium underline">
        View contract
      </Link>
    ),
  },
];
