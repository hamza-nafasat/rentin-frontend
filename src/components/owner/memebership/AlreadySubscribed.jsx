'use client';
import { alreadySubscribedData, tableStyles } from '@/data/data';
import DataTable from 'react-data-table-component';

const AlreadySubscribed = () => {
  return (
    <section className="shadow-card rounded-lg border bg-white p-4 lg:p-5">
      <div className="text-textPrimary text-sm font-semibold">Proposal Summary</div>
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
    cell: row => {
      const status = row.status.toLowerCase();
      return (
        <div className="flex items-center gap-2">
          <span
            className={`${
              status === 'active'
                ? 'bg-[#34C7591A] text-[#34C759]'
                : status === 'pending'
                  ? 'bg-[#FCD34D1A] text-[#F59E0B]'
                  : status === 'expired'
                    ? 'bg-[#FF3B301A] text-[#FF3B30]'
                    : status === 'rejected'
                      ? 'bg-[#FF3B301A] text-[#FF3B30]'
                      : ''
            } w-[85px] rounded-sm px-[10px] py-[3px] text-center font-bold capitalize`}
          >
            {row.status}
          </span>
        </div>
      );
    },
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
