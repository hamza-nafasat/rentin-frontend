'use client';
import Image from 'next/image';
import React, { useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';
// import { transactionTableStylesLinked } from '@/data/data';

const properties = [
  {
    id: 1,
    image: '/images/default/agentprofileproperty.png',
    title: 'Charming Homes in Thailand',
    address: '123 Sunset Road, Phuket, Thailand',
    price: '$243',
    period: 'per month',
    monthlyRent: '$45,000',
    startDate: '5-jan-24',
    endDate: '5-Feb-24',
    Role: 'Inspection',
    commission: '$250',
    paymentStatus: 'pending',
  },
  {
    id: 2,
    image: '/images/default/agentprofileproperty.png',
    title: 'Charming Homes in Thailand',
    address: '123 Sunset Road, Phuket, Thailand',
    price: '$243',
    period: 'per month',
    monthlyRent: '$45,000',
    startDate: '5-jan-24',
    endDate: '5-Feb-24',
    Role: 'Inspection',
    commission: '$250',
    paymentStatus: 'paid',
  },
  {
    id: 3,
    image: '/images/default/agentprofileproperty.png',
    title: 'Charming Homes in Thailand',
    address: '123 Sunset Road, Phuket, Thailand',
    price: '$243',
    period: 'per month',
    monthlyRent: '$45,000',
    startDate: '5-jan-24',
    endDate: '5-Feb-24',
    Role: 'Inspection',
    commission: '$250',
    paymentStatus: 'pending',
  },
  {
    id: 4,
    image: '/images/default/agentprofileproperty.png',
    title: 'Charming Homes in Thailand',
    address: '123 Sunset Road, Phuket, Thailand',
    price: '$243',
    period: 'per month',
    monthlyRent: '$45,000',
    startDate: '5-jan-24',
    endDate: '5-Feb-24',
    Role: 'Inspection',
    commission: '$250',
    paymentStatus: 'rejected',
  },
  {
    id: 5,
    image: '/images/default/agentprofileproperty.png',
    title: 'Charming Homes in Thailand',
    address: '123 Sunset Road, Phuket, Thailand',
    price: '$243',
    period: 'per month',
    monthlyRent: '$45,000',
    startDate: '5-jan-24',
    endDate: '5-Feb-24',
    Role: 'Inspection',
    commission: '$250',
    paymentStatus: 'pending',
  },
];

function AgentTransactionHistory() {
  const transactionTableStylesLinked = {
    headCells: {
      style: {
        fontSize: '14px',
        fontWeight: 600,
        color: '#32343C',
        borderBottom: '1px solid #395D8C66 !important',
        justifyContent: 'left', // center header content
        // textAlign: 'left',
      },
    },
    rows: {
      style: {
        background: 'transparent',
        padding: '10px 0',
        margin: '0',
        borderBottomStyle: 'dashed !important',
      },
    },
    cells: {
      style: {
        color: '#32343C',
        fontSize: '14px',
        fontWeight: 600,
        // justifyContent: 'center', // center cell content
        // textAlign: 'center',
      },
    },
  };
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
            <div className="flex gap-3">
              <div>
                <Image src={row.image} width={182} height={100} alt="Property View" />
              </div>
              <div className="flex flex-col justify-between p-0.5">
                <h1 className="text-base font-semibold text-[#32343C]">{row.title}</h1>
                <h6 className="text-xs font-normal text-[#969696]">{row.address}</h6>
                <div className="flex gap-1">
                  <span className="text-base font-semibold text-[#32343C]">
                    {row.price}
                    <span className="text-[8px] font-semibold text-[#969696]">{row.period}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        },
        width: '44%',
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
        name: 'Role',
        selector: row => row.Role,
      },
      {
        name: 'Commission',
        selector: row => row.commission,
      },
      {
        name: 'Payment Status',
        cell: row => {
          const status = row.paymentStatus.toLowerCase();
          const bgClass =
            status === 'pending'
              ? 'bg-[#E99E3426] text-[14px] w-fit !text-[#FF9500]'
              : status === 'rejected'
                ? 'bg-[#E3545421] text-[14px] w-fit !text-[#E35454]'
                : status === 'paid'
                  ? 'bg-[#34E94912] text-[14px] !text-[#39DA4C]'
                  : '';
          return (
            <span className={`w-[65px] rounded px-2 py-1 text-center text-white ${bgClass}`}>{row.paymentStatus}</span>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="rounded-lg bg-white px-5 py-4 shadow-lg">
      <h1 className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <Image src="/images/default/building.png" width={33} height={30} alt="icon" /> Linked Properties
      </h1>
      <DataTable
        data={properties}
        columns={columns}
        selectableRowsHighlight
        customStyles={transactionTableStylesLinked}
        fixedHeader
        fixedHeaderScrollHeight="70vh"
      />
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
        className={`overflow-hidden rounded-[12px] bg-white shadow-lg ${width ? width : 'w-[500px]'} h-[488px]`}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
