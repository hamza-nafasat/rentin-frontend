// 'use client';
// import ProposalModal from '@/components/owner/proposals/ProposalModal';
// import Modal from '@/components/shared/small/Modal';
// import { proposalSummaryData, tableStyles } from '@/data/data';
// import { useState, useMemo, useCallback } from 'react';
// import DataTable from 'react-data-table-component';
// // import ProposalModal from './ProposalModal';
// import { GoArrowUpRight } from 'react-icons/go';
// import Content13 from '../popups/Content13';
// import Content14 from '../popups/Content14';
// import { useGetTenantProposalsQuery } from '@/features/Proposal/proposalApi';

// const TenantProposal = () => {
//   const [modal, setModal] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalOpen1, setIsModalOpen1] = useState(false);
//   const { data: proposalsData, error, refetch } = useGetTenantProposalsQuery();
//   console.log('proposal data for tenant', proposalsData);

//   // Simulate data loading
//   useMemo(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const modalOpenHandler = useCallback(row => {
//     setSelectedRow(row);
//     setModal(true);
//   }, []);

//   const modalCloseHandler = useCallback(() => {
//     setSelectedRow(null);
//     setModal(false);
//   }, []);

//   const columns = useMemo(
//     () => [
//       {
//         name: 'Proposal ID',
//         selector: row => row.proposalId,
//       },
//       {
//         name: 'Property',
//         selector: row => row.propertyName,
//       },
//       {
//         name: 'Proposal Type',
//         selector: row => row.proposalType,
//       },
//       {
//         name: 'Sent To',
//         selector: row => row.sentTo,
//       },
//       {
//         name: 'Date Sent',
//         selector: row => row.dateSent,
//       },
//       {
//         name: 'Status',
//         // selector: row => (
//         //   <span className="flex items-center gap-1 capitalize">
//         //     {row.status === 'accepted' ? '✅' : row.status === 'pending' ? '⌛' : '❌'} {row.status}
//         //   </span>
//         // ),
//         cell: row => {
//           const status = row.status.toLowerCase();
//           const bgClass =
//             status === 'pending'
//               ? 'bg-[#FCD34D1A] text-[#F59E0B]'
//               : status === 'rejected'
//                 ? 'bg-[#FF3B301A] text-[#FF3B30]'
//                 : status === 'accepted'
//                   ? 'bg-[#34C7591A] text-[#34C759]'
//                   : '';
//           return (
//             <div className="flex items-center gap-2">
//               <span className={`${bgClass} w-[85px] rounded-sm px-[10px] py-[3px] text-center font-bold capitalize`}>
//                 {row.status}
//               </span>
//             </div>
//           );
//         },
//       },
//       {
//         name: 'Actions',
//         selector: row => (
//           <div className="flex items-center gap-3">
//             <button
//               className="bg-primary cursor-pointer rounded-[4px] px-4 py-[2px] text-xs font-medium text-white"
//               onClick={() => modalOpenHandler(row)}
//             >
//               View
//             </button>
//             {row.status === 'pending' && (
//               <button
//                 className="bg-primary cursor-pointer rounded-[4px] px-4 py-[2px] text-xs font-medium text-white"
//                 onClick={() => setIsModalOpen(true)}
//               >
//                 Action
//               </button>
//             )}
//           </div>
//         ),
//       },
//     ],
//     [modalOpenHandler]
//   );

//   if (isLoading) {
//     return (
//       <div className="shadow-card rounded-lg border bg-white p-4 lg:p-5">
//         <div className="text-textPrimary text-sm font-semibold">Proposal Summary</div>
//         <div className="flex h-64 items-center justify-center">
//           <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section className="shadow-card rounded-lg border bg-white p-4 lg:p-5">
//       <div className="text-textPrimary text-sm font-semibold">Proposal Summary</div>
//       <DataTable
//         data={proposalSummaryData}
//         columns={columns}
//         selectableRowsHighlight
//         customStyles={tableStyles}
//         fixedHeader
//         fixedHeaderScrollHeight="70vh"
//       />
//       <div className="mt-4 flex justify-center">
//         <button className="bg-primary found-medium flex cursor-pointer items-center gap-1 rounded-lg px-4 py-2 text-sm text-white">
//           View more
//           <GoArrowUpRight className="text-base text-white" />
//         </button>
//       </div>
//       {modal && selectedRow && (
//         <ProposalModal onClose={modalCloseHandler} title="Proposal Overview" width="w-[300px] md:w-[500px]">
//           <div>
//             <p className="text-textPrimary text-center text-base md:text-2xl">
//               <strong className="text-2xl font-semibold">Proposal Overview</strong>
//             </p>
//             <p className="text-textPrimary text-center text-base md:text-2xl">Proposal ID: {selectedRow.proposalId}</p>
//             <p className="text-textPrimary text-center text-sm md:text-base">{selectedRow.dateSent} 10:54 PM</p>
//             <hr className="border-textColor my-2 border-dashed" />
//             <div className="space-y-2">
//               <div className="border-b border-[#0245a5] px-8 py-6">
//                 <p className="flex justify-between">
//                   <strong>Sent To:</strong>
//                   <p>{selectedRow.sentTo}</p>
//                 </p>
//               </div>
//               <div className="border-b border-[#0245a5] px-8 py-6">
//                 <p className="flex justify-between">
//                   <strong>Property Name:</strong>
//                   <p>{selectedRow.propertyName}</p>
//                 </p>
//               </div>
//               <div className="border-b border-[#0245a5] px-8 py-6">
//                 <p className="flex justify-between">
//                   <strong>Property Address:</strong>
//                   <p>{selectedRow.proposalType}</p>
//                 </p>
//               </div>
//               <div className="border-b border-[#0245a5] px-8 py-6">
//                 <p className="flex justify-between">
//                   <strong>Rent Amount:</strong>
//                   <p>{selectedRow.dateSent}</p>
//                 </p>
//               </div>
//               <div className="border-b border-[#0245a5] px-8 py-6">
//                 <p className="flex justify-between">
//                   <strong>Contact Duration:</strong>
//                   <p>{selectedRow.dateSent}</p>
//                 </p>
//               </div>
//               <div className="border-b border-[#0245a5] px-8 py-6">
//                 <p className="flex justify-between">
//                   <strong>Proposed Move-in Date:</strong>
//                   <p>{selectedRow.dateSent}</p>
//                 </p>
//               </div>
//               <div className="border-b border-[#0245a5] px-8 py-6">
//                 <p className="flex justify-between">
//                   <strong>Status:</strong>{' '}
//                   <span
//                     className={`capitalize ${
//                       selectedRow.status === 'accepted'
//                         ? 'text-green-500'
//                         : selectedRow.status === 'pending'
//                           ? 'text-yellow-500'
//                           : 'text-red-500'
//                     }`}
//                   >
//                     {selectedRow.status}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </ProposalModal>
//       )}
//       {isModalOpen && (
//         <Modal
//           width={''}
//           title="Contract Verification"
//           onClose={() => {
//             setIsModalOpen(false);
//           }}
//         >
//           <Content13 />
//         </Modal>
//       )}
//       {isModalOpen1 && (
//         <Modal
//           title="Booking Successful! 🎉"
//           onClose={() => {
//             setIsModalOpen1(false);
//           }}
//         >
//           <Content14 />
//         </Modal>
//       )}
//     </section>
//   );
// };

// export default TenantProposal;

// // export default TenantProposal

'use client';
import ProposalModal from '@/components/owner/proposals/ProposalModal';
import Modal from '@/components/shared/small/Modal';
import { tableStyles } from '@/data/data';
import { useState, useMemo, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import { GoArrowUpRight } from 'react-icons/go';
import Content13 from '../popups/Content13';
import Content14 from '../popups/Content14';
import { useGetTenantProposalsQuery } from '@/features/Proposal/proposalApi';
import { useGetTenantBookingRequestQuery } from '@/features/booking/bookingRequestApi';

const TenantProposal = () => {
  const [modal, setModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const { data: proposalsData, error, refetch } = useGetTenantProposalsQuery();

  const {
    data: bookingRequestData,
    error: bookingError,
    isLoading: bookingLoading,
    refetch: refetchBookingRequest,
  } = useGetTenantBookingRequestQuery(selectedBookingId, {
    skip: !selectedBookingId,
  });

  // Helper function to format proposal ID (show first 8 characters)
  const formatProposalId = id => {
    return id ? id.substring(0, 8) : '';
  };

  // Helper function to get proposal type display text
  const getProposalTypeText = type => {
    if (type === 'Visit') return 'Property Visit';
    if (type === 'Booking') return 'Lease Agreement';
    return type;
  };

  // Helper function to get "Sent To" display text
  const getSentToText = proposal => {
    if (proposal.type === 'Booking' && proposal.owner) {
      return `${proposal.owner.firstName} ${proposal.owner.lastName} (Landlord)`;
    }
    if (proposal.type === 'Visit' && proposal.whoCanShowYou) {
      return `${proposal.whoCanShowYou.firstName} ${proposal.whoCanShowYou.lastName} (${proposal.whoCanShowYou.role})`;
    }
    return 'N/A';
  };

  // Helper function to format date
  const formatDate = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

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
  const handleActionClick = useCallback(row => {
    setSelectedBookingId(row._id);
    setIsModalOpen(true);
  }, []);

  const handleContent13Close = useCallback(() => {
    setIsModalOpen(false);
    setSelectedBookingId(null);
  }, []);

  const handleContent14Close = useCallback(() => {
    setIsModalOpen1(false);
    setSelectedBookingId(null);
  }, []);

  const handleAcknowledgeSuccess = useCallback(() => {
    setIsModalOpen(false);
    setIsModalOpen1(true);
    refetch(); // Refresh the proposals list
  }, [refetch]);

  const columns = useMemo(
    () => [
      {
        name: 'Proposal ID',
        selector: row => formatProposalId(row._id),
      },
      {
        name: 'Property',
        selector: row => row.property?.projectName || 'N/A',
      },
      {
        name: 'Proposal Type',
        selector: row => getProposalTypeText(row.type),
      },
      {
        name: 'Sent To',
        selector: row => getSentToText(row),
      },
      {
        name: 'Date Sent',
        selector: row => formatDate(row.createdAt),
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
                  : status === 'completed'
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
          <div className="flex items-center gap-3">
            <button
              className="bg-primary cursor-pointer rounded-[4px] px-4 py-[2px] text-xs font-medium text-white"
              onClick={() => modalOpenHandler(row)}
            >
              View
            </button>
            {/* Show Action button only for Booking requests with accepted status, not for Visit requests or completed status */}
            {row.type === 'Booking' && row.status === 'accepted' && (
              <button
                className="bg-primary cursor-pointer rounded-[4px] px-4 py-[2px] text-xs font-medium text-white"
                onClick={() => handleActionClick(row)}
              >
                Action
              </button>
            )}
          </div>
        ),
      },
    ],
    [modalOpenHandler, handleActionClick]
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
      <div className="text-textPrimary text-sm font-semibold">Proposal Summary</div>
      <DataTable
        data={proposalsData?.data || []}
        columns={columns}
        selectableRowsHighlight
        customStyles={tableStyles}
        fixedHeader
        fixedHeaderScrollHeight="70vh"
      />
      <div className="mt-4 flex justify-center">
        <button className="bg-primary found-medium flex cursor-pointer items-center gap-1 rounded-lg px-4 py-2 text-sm text-white">
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
            <p className="text-textPrimary text-center text-base md:text-2xl">
              Proposal ID: {formatProposalId(selectedRow._id)}
            </p>
            <p className="text-textPrimary text-center text-sm md:text-base">
              {formatDate(selectedRow.createdAt)} {selectedRow.time}
            </p>
            <hr className="border-textColor my-2 border-dashed" />
            <div className="space-y-2">
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>Sent To:</strong>
                  <p>{getSentToText(selectedRow)}</p>
                </p>
              </div>
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>Property Name:</strong>
                  <p>{selectedRow.property?.projectName || 'N/A'}</p>
                </p>
              </div>
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>Property Address:</strong>
                  <p>{selectedRow.property?.address || 'N/A'}</p>
                </p>
              </div>
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>Rent Amount:</strong>
                  <p>${selectedRow.property?.contractRate?.rate || 0}</p>
                </p>
              </div>
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>Security Deposit:</strong>
                  <p>${selectedRow.property?.contractRate?.securityDeposit || 0}</p>
                </p>
              </div>
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>Proposed Date:</strong>
                  <p>{selectedRow.date}</p>
                </p>
              </div>
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>Time:</strong>
                  <p>{selectedRow.time}</p>
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
                          : selectedRow.status === 'completed'
                            ? 'text-green-500'
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
      {isModalOpen && (
        <Modal width={''} title="Contract Verification" onClose={handleContent13Close}>
          <Content13
            bookingRequestData={bookingRequestData?.data}
            isLoading={bookingLoading}
            error={bookingError}
            bookingRequestId={selectedBookingId}
            onAcknowledgeSuccess={handleAcknowledgeSuccess}
          />
        </Modal>
      )}
      {isModalOpen1 && (
        <Modal title="Booking Successful! 🎉" onClose={handleContent14Close}>
          <Content14 />
        </Modal>
      )}
    </section>
  );
};

export default TenantProposal;
