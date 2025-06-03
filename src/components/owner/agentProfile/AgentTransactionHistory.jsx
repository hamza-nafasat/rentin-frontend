'use client';
import React, { useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { transactionHistoryData, transactionTableStyles } from '@/data/data';
import AgentTransactionSlip from './AgentTransactionSlip';

function AgentTransactionHistory() {
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
    <div className="shadow-card rounded-lg bg-white px-5 py-4">
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
          <AgentTransactionSlip selectedRow={selectedRow} />
        </Modal>
      )}
    </div>
  );
}

export default AgentTransactionHistory;

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
