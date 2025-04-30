'use client';
import React, { useState, useMemo } from 'react';
import {
  agentTransactionTableStyles,
  transactionHistoryData,
  transactionTableStyles,
} from '@/data/data';
import AgentTransactionSlip from '@/components/owner/agentProfile/AgentTransactionSlip';
import dynamic from 'next/dynamic';
import Modal from '@/components/shared/small/Modal';
import CustomLoading from '@/components/shared/small/CustomLoading';

const DataTable = dynamic(() => import('react-data-table-component'), {
  ssr: false,
  loading: () => <CustomLoading />,
});

// Status styling utility function
const getStatusStyle = status => {
  const statusMap = {
    pending: 'bg-yellow-500',
    rejected: 'bg-red-500',
    paid: 'bg-green-500',
  };
  return statusMap[status.toLowerCase()] || '';
};

function PropertyOwnerPaymentDetails() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        name: 'Invoice Id',
        selector: row => row.invoiceID,
      },
      {
        name: 'Date',
        selector: row => row.date,
      },
      {
        name: 'Amount',
        selector: row => row.amount,
      },
      {
        name: 'Payment Status',
        cell: row => {
          const status = row.paymentStatus.toLowerCase();
          const bgClass =
            status === 'pending'
              ? 'bg-yellow-500'
              : status === 'rejected'
                ? 'bg-red-500'
                : status === 'paid'
                  ? 'bg-green-500'
                  : '';
          return (
            <span className={`w-[80px] rounded px-2 py-1 text-center text-white ${bgClass}`}>
              {row.paymentStatus}
            </span>
          );
        },
      },
      {
        name: 'Slip',
        cell: row => (
          <span
            onClick={() => openModal(row)}
            className="text-primary cursor-pointer text-[13px] font-medium underline"
          >
            View
          </span>
        ),
      },
    ],
    []
  );

  return (
    <div className="px-5 py-4">
      <h1 className="mb-2 text-sm font-semibold">Payment History</h1>
      {isLoading ? (
        <CustomLoading />
      ) : transactionHistoryData.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">No transaction history available</p>
        </div>
      ) : (
        <DataTable
          data={transactionHistoryData.slice(0, 5)}
          columns={columns}
          selectableRowsHighlight
          customStyles={agentTransactionTableStyles}
          fixedHeader
          fixedHeaderScrollHeight="70vh"
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15]}
          progressPending={isLoading}
          noDataComponent={
            <div className="py-8 text-center">
              <p className="text-gray-500">No transaction history available</p>
            </div>
          }
        />
      )}
      {modalOpen && selectedRow && (
        <Modal onClose={closeModal}>
          <AgentTransactionSlip selectedRow={selectedRow} />
        </Modal>
      )}
    </div>
  );
}

export default PropertyOwnerPaymentDetails;
