'use client';
import React, { useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { transactionHistoryData, transactionTableStyles } from '@/data/data';
import TransactionSlip from './TransactionSlip';

function TransactionHistory() {
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
        name: 'Invoice Id',
        selector: row => row.invoiceID,
        width: '50%',
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
              ? 'bg-[#FCD34D1A] text-[#F59E0B]'
              : status === 'rejected'
                ? 'bg-[#FF3B301A] text-[#FF3B30]'
                : status === 'paid'
                  ? 'bg-[#34C7591A] text-[#34C759]'
                  : '';
          return (
            <div className="flex items-center gap-2">
              <span className={`${bgClass} w-[85px] rounded-sm px-[10px] py-[3px] text-center capitalize`}>
                {row.paymentStatus}
              </span>
            </div>
          );
        },
      },
      {
        name: 'Slip',
        cell: row => (
          <span
            onClick={() => openModal(row)}
            className="bg-primary cursor-pointer rounded-[4px] px-4 py-[2px] text-xs font-medium text-white"
          >
            View
          </span>
        ),
      },
    ],
    []
  );

  return (
    <div className="shadow-card rounded-lg px-5 py-4">
      <h1 className="mb-2 text-sm font-semibold">Transaction History</h1>
      <DataTable
        data={transactionHistoryData.slice(0, 5)}
        columns={columns}
        selectableRowsHighlight
        customStyles={transactionTableStyles}
        fixedHeader
        fixedHeaderScrollHeight="70vh"
      />
      {modalOpen && selectedRow && (
        <Modal onClose={closeModal}>
          <TransactionSlip selectedRow={selectedRow} />
        </Modal>
      )}
    </div>
  );
}

export default TransactionHistory;
