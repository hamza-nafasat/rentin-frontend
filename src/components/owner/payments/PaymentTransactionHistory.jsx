'use client';
import React, { useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { paymentTransactionData, transactionTableStyles } from '@/data/data';
import PaymentTransactionSlip from './PaymentTransactionSlip';
import { CiFilter } from 'react-icons/ci';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';

function PaymentTransactionHistory() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filterOption, setFilterOption] = useState('weekly');

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
        name: 'Invoice History',
        selector: row => row.invoiceHistory,
        width: '50%',
      },
      {
        name: 'Account Details',
        selector: row => row.accountDetails,
      },
      {
        name: 'Amount',
        selector: row => row.amount,
      },
      {
        name: 'Date',
        selector: row => row.date,
      },
      {
        name: 'Status',
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
            <div className="flex items-center gap-2">
              <div className={`${bgClass} h-2.5 w-2.5 rounded-full`}></div>
              <span>{row.paymentStatus}</span>
            </div>
          );
        },
      },
      {
        name: 'Action',
        cell: row => (
          <span
            onClick={() => openModal(row)}
            className="bg-primary flex h-[23px] w-[60px] cursor-pointer items-center justify-center text-[13px] font-medium text-white"
          >
            Slip
          </span>
        ),
      },
    ],
    []
  );

  return (
    <div className="rounded-lg px-5 py-4 shadow-lg">
      <div className="mb-4 flex flex-col items-center justify-between md:flex-row">
        <h1 className="text-lg font-semibold">Transaction History</h1>
        <div className="flex gap-4">
          <button className="bg-primary flex items-center gap-1 rounded-md p-2 text-white">
            <CiFilter />
            <span>Filter</span>
          </button>
          <div className="flex items-center rounded-md bg-gray-500 p-2 text-white">
            <HiOutlineAdjustmentsHorizontal />
            <select
              className="flex items-center text-white"
              value={filterOption}
              onChange={e => setFilterOption(e.target.value)}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
      </div>
      <DataTable
        data={filteredData}
        columns={columns}
        selectableRowsHighlight
        customStyles={transactionTableStyles}
        fixedHeader
        fixedHeaderScrollHeight="70vh"
      />
      {modalOpen && selectedRow && (
        <Modal onClose={closeModal}>
          <PaymentTransactionSlip selectedRow={selectedRow} />
        </Modal>
      )}
    </div>
  );
}

export default PaymentTransactionHistory;

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
