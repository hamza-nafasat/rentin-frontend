'use client';
import { proposalSummaryData, tableStyles } from '@/data/data';
import { useState, useMemo, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import ProposalModal from './ProposalModal';
import { GoArrowUpRight } from 'react-icons/go';
import Modal from '@/components/shared/small/Modal';
import Content6 from '@/components/tenant/popups/Content6';

const ProposalSummary = () => {
  const [modal, setModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useMemo(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const modalOpenHandler = useCallback(row => {
    setSelectedRow(row);
    setModal(true);
  }, []);

  const modalCloseHandler = useCallback(() => {
    setSelectedRow(null);
    setModal(false);
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const requestModal = () => {
    setIsModalOpen(true);
  };
  const columns = useMemo(
    () => [
      {
        name: 'Proposal ID',
        selector: row => row.proposalId,
      },
      {
        name: 'Property',
        selector: row => row.propertyName,
      },
      {
        name: 'Proposal Type',
        selector: row => row.proposalType,
      },
      {
        name: 'Sent To',
        selector: row => row.sentTo,
      },
      {
        name: 'Date Sent',
        selector: row => row.dateSent,
      },
      {
        name: 'Status',
        cell: row => {
          const status = row.status.toLowerCase();
          const bgClass =
            status === 'pending'
              ? 'bg-[#FCD34D1A] text-[#F59E0B]'
              : status === 'rejected'
                ? 'bg-[#FF3B301A] text-[#FF3B30]'
                : status === 'accepted'
                  ? 'bg-[#34C7591A] text-[#34C759]'
                  : '';
          return (
            <div className="flex items-center gap-2">
              <span className={`${bgClass} w-[85px] rounded-sm px-[10px] py-[3px] text-center font-bold capitalize`}>
                {row.status}
              </span>
            </div>
          );
        },
      },
      {
        name: 'Actions',
        selector: row => (
          <div className="flex gap-2">
            <button
              className="bg-primary cursor-pointer rounded-[4px] px-4 py-[2px] text-xs font-medium text-white"
              onClick={() => modalOpenHandler(row)}
            >
              View
            </button>
            <button
              className="bg-primary cursor-pointer rounded-[4px] px-4 py-[2px] text-xs font-medium text-white"
              onClick={requestModal}
            >
              Action
            </button>
          </div>
        ),
      },
    ],
    [modalOpenHandler]
  );

  if (isLoading) {
    return (
      <div className="shadow-card rounded-lg border bg-white p-4 lg:p-5">
        <div className="text-textPrimary text-sm font-semibold">Proposal Summary</div>
        <div className="flex h-64 items-center justify-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="shadow-card rounded-lg border bg-white p-4 lg:p-5">
      <div>
        {isModalOpen && (
          <Modal width={500} onClose={() => setIsModalOpen(false)} title="Visit Request">
            <Content6 />
          </Modal>
        )}
      </div>
      <div className="text-textPrimary text-sm font-semibold">Proposal Summary</div>
      <DataTable
        data={proposalSummaryData}
        columns={columns}
        selectableRowsHighlight
        customStyles={tableStyles}
        fixedHeader
        fixedHeaderScrollHeight="70vh"
      />
      <div className="mt-4 flex justify-center">
        <button className="bg-primary flex cursor-pointer place-items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-[#01367f]">
          View more
          <GoArrowUpRight className="text-base text-white" />
        </button>
      </div>
      {modal && selectedRow && (
        <ProposalModal onClose={modalCloseHandler} title="Proposal Overview" width="w-[300px] md:w-[500px]">
          <div>
            <p className="text-textPrimary text-center text-base md:text-2xl">
              <strong className="text-2xl font-semibold">Proposal Overview</strong>
            </p>
            <p className="text-textPrimary text-center text-base md:text-2xl">Proposal ID: {selectedRow.proposalId}</p>
            <p className="text-textPrimary text-center text-sm md:text-base">{selectedRow.dateSent} 10:54 PM</p>
            <hr className="border-textColor my-2 border-dashed" />
            <div className="space-y-2">
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>Sent To:</strong>
                  <p>{selectedRow.sentTo}</p>
                </p>
              </div>
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>Property Name:</strong>
                  <p>{selectedRow.propertyName}</p>
                </p>
              </div>
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>Property Address:</strong>
                  <p>{selectedRow.proposalType}</p>
                </p>
              </div>
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>Rent Amount:</strong>
                  <p>{selectedRow.dateSent}</p>
                </p>
              </div>
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>Contact Duration:</strong>
                  <p>{selectedRow.dateSent}</p>
                </p>
              </div>
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>Proposed Move-in Date:</strong>
                  <p>{selectedRow.dateSent}</p>
                </p>
              </div>
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>Status:</strong>{' '}
                  <span
                    className={`capitalize ${
                      selectedRow.status === 'accepted'
                        ? 'text-green-500'
                        : selectedRow.status === 'pending'
                          ? 'text-yellow-500'
                          : 'text-red-500'
                    }`}
                  >
                    {selectedRow.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </ProposalModal>
      )}
    </section>
  );
};

export default ProposalSummary;
