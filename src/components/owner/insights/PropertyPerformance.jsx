'use client';
import {
  bookingSummaryData,
  PropertyPerformanceData,
  PropertyPerformanceTableStyles,
  tableStyles,
} from '@/data/data';
import Link from 'next/link';
import React from 'react';
import DataTable from 'react-data-table-component';

function PropertyPerformance() {
  return (
    <section className="bg-white">
      <div className="text-sm font-semibold">Property Performance</div>
      <div className="h-[280px] overflow-auto">
        <DataTable
          data={PropertyPerformanceData.slice(0, 5)}
          columns={columns}
          selectableRowsHighlight
          customStyles={PropertyPerformanceTableStyles}
          fixedHeader
          fixedHeaderScrollHeight="70vh"
        />
      </div>
    </section>
  );
}

export default PropertyPerformance;

const columns = [
  {
    name: 'Property Name',
    selector: row => row.propertyName,
  },
  {
    name: 'View',
    selector: row => row.view,
  },
  {
    name: 'Inquiries',
    selector: row => row.inquiries,
  },
  {
    name: 'Status',
    selector: row => row.status,
  },
  {
    name: 'Revenue',
    selector: row => row.revenue,
  },
];
