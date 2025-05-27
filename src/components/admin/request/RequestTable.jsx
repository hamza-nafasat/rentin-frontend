'use client';
import { agentRequestData, paymentTransactionData, requestTableStyles, transactionTableStyles } from '@/data/data';
import { useMemo, useState } from 'react';
// import DataTable from 'react-data-table-component';
// import PaymentTransactionSlip from './PaymentTransactionSlip';
import PaymentTransactionSlip from '@/components/owner/payments/PaymentTransactionSlip';
import ViewRequest from './ViewRequest';
import dynamic from 'next/dynamic';
import CustomLoading from '@/components/shared/small/CustomLoading';
const DataTable = dynamic(() => import('react-data-table-component'), {
  ssr: false,
  loading: () => <CustomLoading />,
});

function RequestTable({ title, data }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filterOption, setFilterOption] = useState('weekly');
  const [isLoading, setIsLoading] = useState(false);

  const openModal = row => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Simulated filtering logic: Adjust slices or filtering based on actual criteria.
  const filteredData = useMemo(() => {
    if (filterOption === 'weekly') {
      return paymentTransactionData.slice(0, 5);
    } else if (filterOption === 'monthly') {
      return paymentTransactionData.slice(0, 7);
    } else if (filterOption === 'yearly') {
      return paymentTransactionData;
    }
    return paymentTransactionData;
  }, [filterOption]);

  const columns = useMemo(
    () => [
      {
        name: 'Request ID',
        selector: row => row.invoiceId,
        // width: '50%',
      },
      {
        name: 'Property Name',
        selector: row => row.PropertyName,
      },
      {
        name: 'Date',
        selector: row => row.date,
      },
      {
        name: 'Request Type',
        selector: row => row.requestType,
      },
      {
        name: 'Status',
        cell: row => {
          const status = row.agentStatus.toLowerCase();
          const bgClass =
            status === 'pending'
              ? 'bg-[#FCD34D1A] text-[#F59E0B]'
              : status === 'rejected'
                ? 'bg-[#FF3B301A] text-[#FF3B30]'
                : status === 'paid'
                  ? 'bg-[#34C7591A] text-[#34C759]'
                  : '';
          return (
            <div className="flex items-center gap-2">
              <span className={`${bgClass} w-[85px] rounded-sm px-[10px] py-[3px] text-center capitalize`}>
                {row.agentStatus}
              </span>
            </div>
          );
        },
      },
      {
        name: 'Action',
        cell: row => (
          <span
            onClick={() => openModal(row)}
            className="bg-primary flex h-[23px] w-[60px] cursor-pointer items-center justify-center rounded-lg text-[13px] font-medium text-white"
          >
            View
          </span>
        ),
      },
    ],
    []
  );

  return (
    <div className="shadow-card w-full rounded-lg bg-white px-5 py-4">
      <div className="mb-4 flex flex-col items-center justify-between md:flex-row">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <DataTable
        data={data}
        columns={columns}
        selectableRowsHighlight
        customStyles={requestTableStyles}
        fixedHeader
        fixedHeaderScrollHeight="70vh"
        progressPending={isLoading}
      />
      {modalOpen && selectedRow && (
        <Modal onClose={closeModal}>
          <ViewRequest selectedRow={selectedRow} />
        </Modal>
      )}
    </div>
  );
}

export default RequestTable;

const Modal = ({ onClose, children, width }) => {
  return (
    <div
      className="modal fixed inset-0 top-0 left-0 z-[99] flex items-center justify-center bg-[#000000c5] p-6"
      onClick={onClose}
    >
      <div
        className={`shadow-card overflow-hidden rounded-[12px] bg-white p-6 ${width ? width : 'w-[700px]'} `}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
