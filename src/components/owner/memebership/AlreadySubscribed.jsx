'use client';
import { alreadySubscribedData, tableStyles } from '@/data/data';
import DataTable from 'react-data-table-component';

const AlreadySubscribed = () => {
  return (
    <section className="rounded-lg border bg-white p-4 shadow-sm lg:p-5">
      <div className="text-textColor text-sm font-semibold">Proposal Summary</div>
      <DataTable
        data={alreadySubscribedData}
        columns={columns}
        selectableRowsHighlight
        customStyles={tableStyles}
        fixedHeader
        fixedHeaderScrollHeight="70vh"
      />
    </section>
  );
};

export default AlreadySubscribed;

const columns = [
  {
    name: 'Plan Name',
    selector: row => row.planName,
  },
  {
    name: 'Start Date',
    selector: row => row.startDate,
  },
  {
    name: 'End Date',
    selector: row => row.endDate,
  },
  {
    name: 'Status',
    selector: row => (
      <span
        className={`rounded-sm px-[10px] py-[3px] text-sm font-semibold capitalize ${
          row.status === 'Active'
            ? 'bg-[#34C7591A] text-[#34C759]'
            : 'bg-[#FF3B301A] text-[#FF3B30]'
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    name: 'Actions',
    selector: row => (
      <button className="bg-primary cursor-pointer rounded-[4px] px-4 py-[2px] text-xs font-medium text-white">
        View
      </button>
    ),
  },
];
