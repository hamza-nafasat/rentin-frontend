'use client';
import React, { useState, useMemo, useCallback } from 'react';
import { agentTransactionTableStyles, transactionHistoryData, transactionTableStyles } from '@/data/data';
import AgentTransactionSlip from '@/components/owner/agentProfile/AgentTransactionSlip';
// import Modal from '@/components/shared/common/Modal';
import dynamic from 'next/dynamic';
import Modal from '@/components/shared/small/Modal';
import CustomLoading from '@/components/shared/small/CustomLoading';

// Dynamic import for better performance
const DataTable = dynamic(() => import('react-data-table-component'), {
  ssr: false,
  loading: () => <CustomLoading />,
});

// Status styling utility function
const getStatusStyle = status => {
  const statusMap = {
    pending: '!bg-[#FCD34D1A] !text-[#F59E0B]',
    rejected: '!bg-[#FF3B301A] !text-[#FF3B30]',
    paid: '!bg-[#34C7591A] !text-[#34C759]',
  };
  return statusMap[status.toLowerCase()] || '';
};

function PropertyOwnerTransactionHistory() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const openModal = useCallback(row => {
    setSelectedRow(row);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedRow(null);
  }, []);

  const handleViewClick = useCallback(
    row => {
      try {
        openModal(row);
      } catch (err) {
        setError('Failed to open transaction details');
        console.error('Error opening modal:', err);
      }
    },
    [openModal]
  );

  const columns = useMemo(
    () => [
      {
        name: 'Invoice Id',
        selector: row => row.invoiceID,
        sortable: true,
        width: '20%',
      },
      {
        name: 'Date',
        selector: row => row.date,
        sortable: true,
        width: '20%',
      },
      {
        name: 'Amount',
        selector: row => row.amount,
        sortable: true,
        width: '20%',
      },
      {
        name: 'Payment Status',
        cell: row => {
          const status = row.paymentStatus.toLowerCase();
          return (
            <span
              className={`w-[80px] rounded px-2 py-1 text-center text-white ${getStatusStyle(status)}`}
              role="status"
              aria-label={`Payment status: ${row.paymentStatus}`}
            >
              {row.paymentStatus}
            </span>
          );
        },
        width: '20%',
      },
      {
        name: 'Slip',
        cell: row => (
          <button
            onClick={() => handleViewClick(row)}
            className="text-primary hover:text-primary-dark cursor-pointer text-[13px] font-medium underline transition-colors"
            aria-label={`View transaction slip for invoice ${row.invoiceID}`}
          >
            View
          </button>
        ),
        width: '20%',
      },
    ],
    [handleViewClick]
  );

  if (error) {
    return (
      <div className="px-5 py-4">
        <div className="mb-4 text-red-500">{error}</div>
        <button
          onClick={() => setError(null)}
          className="bg-primary hover:bg-primary-dark rounded px-4 py-2 text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 py-4">
      <h1 className="mb-2 text-sm font-semibold">Transaction History</h1>
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
        <Modal onClose={closeModal} aria-labelledby="transaction-modal-title">
          <AgentTransactionSlip selectedRow={selectedRow} />
        </Modal>
      )}
    </div>
  );
}

export default React.memo(PropertyOwnerTransactionHistory);
