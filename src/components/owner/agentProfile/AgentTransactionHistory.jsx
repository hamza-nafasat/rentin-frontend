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
              ? 'bg-yellow-500'
              : status === 'rejected'
                ? 'bg-red-500'
                : status === 'paid'
                  ? 'bg-green-500'
                  : '';
          return (
            <span className={`w-[65px] rounded px-2 py-1 text-center text-white ${bgClass}`}>
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
    <div className="rounded-lg bg-white px-5 py-4 shadow-lg">
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
        className={`overflow-hidden rounded-[12px] bg-white shadow-lg ${
          width ? width : 'w-[500px]'
        } h-[488px]`}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
