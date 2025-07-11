'use client';
import AgentTransactionSlip from '@/components/owner/agentProfile/AgentTransactionSlip';
import { transactionTableStyles } from '@/data/data';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';

// Updated properties example: adjust the paymentStatus values to either 'active' or 'expire' for testing.
const properties = [
  {
    id: 1,
    image: '/images/properties/PropertyView.png',
    title: 'Charming Homes in Thailand',
    address: '123 Sunset Road, Phuket, Thailand',
    price: '$243',
    period: 'per month',
    monthlyRent: '$45,000',
    startDate: 'Apr 29, 2024',
    endDate: 'Apr 29, 2024',
    // These fields have been repurposed for demonstration:
    // 'Status' for Security Deposit information, and 'paymentStatus' for the active/expire status.
    Status: 'Inspection',
    security: '$250',
    paymentStatus: 'expire', // Try changing this to 'active' to see the difference.
  },
  {
    id: 2,
    image: '/images/properties/PropertyView.png',
    title: 'Charming Homes in Thailand',
    address: '123 Sunset Road, Phuket, Thailand',
    price: '$243',
    period: 'per month',
    monthlyRent: '$45,000',
    startDate: 'Apr 29, 2024',
    endDate: 'Apr 29, 2024',
    Status: 'Inspection',
    security: '$250',
    paymentStatus: 'active',
  },
  {
    id: 3,
    image: '/images/properties/PropertyView.png',
    title: 'Charming Homes in Thailand',
    address: '123 Sunset Road, Phuket, Thailand',
    price: '$243',
    period: 'per month',
    monthlyRent: '$45,000',
    startDate: 'Apr 29, 2024',
    endDate: 'Apr 29, 2024',
    Status: 'Inspection',
    security: '$250',
    paymentStatus: 'active',
  },
];

function TenantBookingSummary() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const openModal = row => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        name: 'Property',
        cell: row => {
          return (
            <div className="flex gap-3.5">
              <div>
                <Image src={row.image} width={182} height={100} alt="Property View" />
              </div>
              <div className="flex flex-col justify-between p-1">
                <h1 className="text-base font-semibold text-[#0245a5]">{row.title}</h1>
                <h6 className="text-textSecondary text-xs font-normal">{row.address}</h6>
                <div>
                  <span className="text-base font-semibold">
                    {row.price}
                    <span className="text-textSecondary text-[8px] font-semibold">{row.period}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        },
        width: '50%',
      },
      {
        name: 'Monthly Rent',
        selector: row => row.monthlyRent,
      },
      {
        name: 'Start - End',
        cell: row => (
          <div className="flex flex-col">
            <div>{row.startDate}</div>
            <div>{row.endDate}</div>
          </div>
        ),
      },
      {
        name: 'Security Deposit',
        selector: row => row.security,
      },
      {
        name: 'Status',
        cell: row => {
          // Determine color based on paymentStatus value
          const status = row.paymentStatus ? row.paymentStatus.toLowerCase() : '';
          const statusClass =
            status === 'active'
              ? 'bg-[#FCD34D1A] text-[#F59E0B]'
              : status === 'expire'
                ? 'bg-[#FF3B301A] text-[#FF3B30]'
                : 'text-gray-500';
          return (
            <span className={`w-[65px] rounded px-2 py-1 text-center font-bold capitalize ${statusClass}`}>
              {row.paymentStatus}
            </span>
          );
        },
      },
      {
        name: 'Contract Slip',
        cell: row => {
          return (
            <button
              onClick={() => openModal(row)}
              className="bg-primary cursor-pointer rounded-[4px] px-4 py-[2px] text-xs font-medium text-white"
            >
              View
            </button>
          );
        },
      },
    ],
    [openModal] // include openModal as dependency so that the memoized columns always have the proper reference.
  );

  return (
    <div className="shadow-card rounded-lg bg-white px-5 py-4">
      <h1 className="mb-2 text-sm font-semibold">Transaction History</h1>
      <DataTable
        data={properties}
        columns={columns}
        selectableRowsHighlight
        customStyles={transactionTableStyles}
        fixedHeader
        fixedHeaderScrollHeight="70vh"
      />
      {modalOpen && selectedRow && (
        <Modal onClose={closeModal}>
          <AgentTransactionSlip selectedRow={selectedRow} />
        </Modal>
      )}
    </div>
  );
}

export default TenantBookingSummary;

const Modal = ({ onClose, children, width }) => {
  return (
    <div
      className="modal fixed inset-0 top-0 left-0 z-[99] flex items-center justify-center bg-[#000000c5] p-6"
      onClick={onClose}
    >
      <div
        className={`shadow-card overflow-hidden rounded-[12px] bg-white ${width ? width : 'w-[500px]'} h-[488px]`}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
