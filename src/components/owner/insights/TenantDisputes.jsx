'use client';
import React from 'react';
import DataTable from 'react-data-table-component';
import {
  bookingSummaryData,
  PropertyPerformanceData,
  PropertyPerformanceTableStyles,
  tableStyles,
} from '@/data/data';

function TenantDisputes() {
  return (
    <section className="bg-white">
      <div className="text-sm font-semibold">Tenant Disputes</div>
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

export default TenantDisputes;

const columns = [
  {
    name: 'Tenant Name',
    selector: row => row.propertyName,
  },
  {
    name: 'View',
    selector: row => row.view,
  },
  {
    name: 'Inquiry Type',
    selector: row => row.inquiries,
  },
  {
    name: 'date',
    selector: row => row.status,
  },
  {
    name: 'status',
    selector: row => row.status,
  },
];
