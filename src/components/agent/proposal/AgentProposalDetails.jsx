'use client';
import ProposalModal from '@/components/owner/proposals/ProposalModal';
import { proposalSummaryData, tableStyles } from '@/data/data';
import { useState, useMemo, useCallback } from 'react';
import DataTable from 'react-data-table-component';
// import ProposalModal from './ProposalModal';
import { GoArrowUpRight } from 'react-icons/go';

const AgentProposalDetails = () => {
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
        // selector: row => (
        //   <span className="flex items-center gap-1 capitalize">
        //     {row.status === 'accepted' ? '✅' : row.status === 'pending' ? '⌛' : '❌'} {row.status}
        //   </span>
        // ),
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
          <button
            className="bg-primary cursor-pointer rounded-[4px] px-4 py-[2px] text-xs font-medium text-white"
            onClick={() => modalOpenHandler(row)}
          >
            View
          </button>
        ),
      },
    ],
    [modalOpenHandler]
  );

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-white p-4 shadow-sm lg:p-5">
        <div className="text-textColor text-sm font-semibold">Proposal Summary</div>
        <div className="flex h-64 items-center justify-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="rounded-lg border bg-white p-4 shadow-sm lg:p-5">
      <div className="text-textColor text-sm font-semibold">Proposal Summary</div>
      <DataTable
        data={proposalSummaryData}
        columns={columns}
        selectableRowsHighlight
        customStyles={tableStyles}
        fixedHeader
        fixedHeaderScrollHeight="70vh"
      />
      <div className="mt-4 flex justify-center">
        <button className="bg-primary found-medium flex cursor-pointer items-center gap-1 rounded-sm px-2 py-[6px] text-sm text-white">
          View more
          <GoArrowUpRight className="text-base text-white" />
        </button>
      </div>
      {modal && selectedRow && (
        <ProposalModal onClose={modalCloseHandler} title="Proposal Overview" width="w-[300px] md:w-[500px]">
          <div>
            <p className="text-textColor text-center text-base md:text-2xl">
              <strong className="text-2xl font-semibold">Proposal Overview</strong>
            </p>
            <p className="text-textColor text-center text-base md:text-2xl">Proposal ID: {selectedRow.proposalId}</p>
            <p className="text-textColor text-center text-sm md:text-base">{selectedRow.dateSent} 10:54 PM</p>
            <hr className="border-textColor my-2 border-dashed" />
            <div className="space-y-2">
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>Sent To:</strong>
                  <span>{selectedRow.sentTo}</span>
                </p>
              </div>
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>Property Name:</strong>
                  <span>{selectedRow.propertyName}</span>
                </p>
              </div>
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>Property Address:</strong>
                  <span>{selectedRow.proposalType}</span>
                </p>
              </div>
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>Rent Amount:</strong>
                  <span>{selectedRow.dateSent}</span>
                </p>
              </div>
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>Contact Duration:</strong>
                  <span>{selectedRow.dateSent}</span>
                </p>
              </div>
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>Proposed Move-in Date:</strong>
                  <span>{selectedRow.dateSent}</span>
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

export default AgentProposalDetails;
