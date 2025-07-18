// 'use client';
// import { proposalSummaryData, tableStyles } from '@/data/data';
// import { useState, useMemo, useCallback } from 'react';
// import DataTable from 'react-data-table-component';
// import ProposalModal from './ProposalModal';
// import { GoArrowUpRight } from 'react-icons/go';
// import Modal from '@/components/shared/small/Modal';
// import Content6 from '@/components/tenant/popups/Content6';
// import Content7 from '@/components/tenant/popups/Content7';

// const ProposalSummary = () => {
//   const [modal, setModal] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

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
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalOpen1, setIsModalOpen1] = useState(false);
//   const openRequestModal = () => {
//     setIsModalOpen(true);
//   };
//   const openRequestModal1 = () => {
//     setIsModalOpen1(true);
//   };
//   const closeRequestModal = () => {
//     setIsModalOpen(false);
//     openRequestModal1();
//   };
//   const closeRequestModal1 = () => {
//     setIsModalOpen1(false);
//   };
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
//           <div className="flex gap-2">
//             <button
//               className="bg-primary cursor-pointer rounded-[4px] px-4 py-[2px] text-xs font-medium text-white"
//               onClick={() => modalOpenHandler(row)}
//             >
//               View
//             </button>
//             <button
//               className="bg-primary cursor-pointer rounded-[4px] px-4 py-[2px] text-xs font-medium text-white"
//               onClick={openRequestModal}
//             >
//               Action
//             </button>
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
//   const acceptHandle = () => {
//     console.log('accept');
//   };
//   const cancelHandle = () => {
//     console.log('accept');
//   };

//   return (
//     <section className="shadow-card rounded-lg border bg-white p-4 lg:p-5">
//       <div>
//         {isModalOpen && (
//           <Modal width={500} onClose={closeRequestModal} title="Visit Request">
//             <Content6 cancelHandle={cancelHandle} acceptHandle={acceptHandle} />
//           </Modal>
//         )}
//         {isModalOpen1 && (
//           <Modal width={500} onClose={closeRequestModal1} title="Visit Request">
//             <Content7 cancelHandle={cancelHandle} acceptHandle={acceptHandle} />
//           </Modal>
//         )}
//       </div>
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
//         <button className="bg-primary flex cursor-pointer place-items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-[#01367f]">
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
//     </section>
//   );
// };

// export default ProposalSummary;

// 'use client';
// import { tableStyles } from '@/data/data';
// import { useState, useMemo, useCallback, useEffect } from 'react';
// import DataTable from 'react-data-table-component';
// import ProposalModal from './ProposalModal';
// import { GoArrowUpRight } from 'react-icons/go';
// import Modal from '@/components/shared/small/Modal';
// import Content6 from '@/components/tenant/popups/Content6';
// import Content7 from '@/components/tenant/popups/Content7';
// import {
//   useGetAllVisitRequestsQuery,
//   useGetVisitRequestByIdQuery,
//   useRejectVisitRequestMutation,
//   useAcceptVisitRequestMutation,
// } from '@/features/visitRequest/visitRequestApi';
// import { useRouter } from 'next/navigation';
// import { useDispatch, useSelector } from 'react-redux';
// import { setBuildingId } from '@/features/selectedId/selecetdId';
// import Content12 from '@/components/tenant/popups/Content12';

// const ProposalSummary = () => {
//   const router = useRouter();
//   const [modal, setModal] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
//   const [isModalOpen1, setIsModalOpen1] = useState(false);
//   const [selectedVisitRequestId, setSelectedVisitRequestId] = useState(null);
//   const [selectedShowOption, setSelectedShowOption] = useState('');

//   // API hooks
//   const { data: visitRequestsData, isLoading, error } = useGetAllVisitRequestsQuery();
//   const { data: visitRequestDetails } = useGetVisitRequestByIdQuery(selectedVisitRequestId, {
//     skip: !selectedVisitRequestId,
//   });
//   const [rejectVisitRequest] = useRejectVisitRequestMutation();
//   const [acceptVisitRequest] = useAcceptVisitRequestMutation();

//   const dispatch = useDispatch();

//   console.log(visitRequestsData);

//   const modalOpenHandler = useCallback(row => {
//     setSelectedRow(row);
//     setModal(true);
//   }, []);

//   const modalCloseHandler = useCallback(() => {
//     setSelectedRow(null);
//     setModal(false);
//   }, []);

//   const openRequestModal = (visitRequestId, row) => {
//     setSelectedVisitRequestId(visitRequestId);
//     setSelectedRow(row);
//     setIsModalOpen(true);
//   };

//   const openBookingModal = (visitRequestId, row) => {
//     setSelectedVisitRequestId(visitRequestId);
//     setSelectedRow(row);
//     setIsBookingModalOpen(true);
//   };

//   const openRequestModal1 = () => {
//     setIsModalOpen1(true);
//   };

//   const closeRequestModal = () => {
//     setIsModalOpen(false);
//   };

//   const closeBookingModal = () => {
//     setIsBookingModalOpen(false);
//   };

//   const closeRequestModal1 = () => {
//     setIsModalOpen1(false);
//     setSelectedShowOption('');
//     setSelectedVisitRequestId(null);
//   };

//   const handleReject = async () => {
//     try {
//       await rejectVisitRequest({ visitRequestId: selectedVisitRequestId }).unwrap();
//       closeRequestModal();
//       // Show success message if needed
//     } catch (error) {
//       console.error('Error rejecting visit request:', error);
//       // Show error message if needed
//     }
//   };

//   const handleAccept = () => {
//     closeRequestModal();
//     openRequestModal1();
//   };

//   const handleConfirmSelection = async () => {
//     if (!selectedShowOption) {
//       alert('Please select an option');
//       return;
//     }

//     try {
//       if (selectedShowOption === 'myself') {
//         //const ownerIdToUse = visitRequestDetails?.data?.owner;
//         const ownerIdToUse = selectedRow?.ownerId;
//         console.log('owner id', ownerIdToUse);

//         // Call accept API with owner ID
//         await acceptVisitRequest({
//           visitRequestId: selectedVisitRequestId,
//           whoCanShowYou: ownerIdToUse, // or pass actual owner ID
//         }).unwrap();
//         closeRequestModal1();
//       } else if (selectedShowOption === 'existing') {
//         // Navigate to existing agents page with visit request ID
//         router.push(`/owner/agent?visitRequestId=${selectedVisitRequestId}`);
//       } else if (selectedShowOption === 'new') {
//         // Navigate to new agents page with visit request ID
//         router.push(`/owner/agent/hiring-new-agent?visitRequestId=${selectedVisitRequestId}`);
//       }
//     } catch (error) {
//       console.error('Error accepting visit request:', error);
//     }
//   };

//   const handleBack = () => {
//     // closeRequestModal1();
//     // setSelectedVisitRequestId(selectedVisitRequestId);
//     // setIsModalOpen(true);
//     setIsModalOpen1(false);
//     setSelectedShowOption('');
//     setIsModalOpen(true);
//   };

//   // Transform visit requests data for the table
//   const transformedData = useMemo(() => {
//     if (!visitRequestsData?.data) return [];

//     return visitRequestsData.data.map((request, index) => ({
//       proposalId: request._id,
//       projectName: `Property ${index + 1}`, // You might want to populate this from the property data
//       proposalType: 'Property Visit',
//       sentTo: 'Owner', // This might need to be adjusted based on your data structure
//       dateSent: request.date,
//       status: request.status,
//       visitRequestId: request._id,
//       ownerId: request.owner,
//     }));
//   }, [visitRequestsData]);

//   const columns = useMemo(
//     () => [
//       {
//         name: 'Proposal ID',
//         selector: row => row.proposalId.slice(-8), // Show last 8 characters for brevity
//       },
//       {
//         name: 'Property',
//         selector: row => row.projectName,
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
//           <div className="flex gap-2">
//             <button
//               className="bg-primary cursor-pointer rounded-[4px] px-4 py-[2px] text-xs font-medium text-white"
//               onClick={() => modalOpenHandler(row)}
//             >
//               View
//             </button>
//             {row.status === 'pending' && (
//               <button
//                 className="bg-primary cursor-pointer rounded-[4px] px-4 py-[2px] text-xs font-medium text-white"
//                 onClick={() =>
//                   row.proposalType === 'Property Visit'
//                     ? openRequestModal(row.visitRequestId, row)
//                     : openBookingModal(row.visitRequestId, row)
//                 } // Pass the row as well
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
//         <div className="text-textPrimary text-sm font-semibold">Visit Requests</div>
//         <div className="flex h-64 items-center justify-center">
//           <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="shadow-card rounded-lg border bg-white p-4 lg:p-5">
//         <div className="text-textPrimary text-sm font-semibold">Visit Requests</div>
//         <div className="flex h-64 items-center justify-center">
//           <div className="text-red-500">Error loading visit requests</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section className="shadow-card rounded-lg border bg-white p-4 lg:p-5">
//       <div>
//         {isBookingModalOpen && visitRequestDetails && (
//           <Modal title={'Booking Request'} onClose={closeBookingModal}>
//             <Content12 />
//           </Modal>
//         )}
//         {isModalOpen && visitRequestDetails && (
//           <Modal width={500} onClose={closeRequestModal} title="Visit Request">
//             <Content6
//               cancelHandle={handleReject}
//               acceptHandle={handleAccept}
//               visitRequestData={visitRequestDetails.data}
//             />
//           </Modal>
//         )}
//         {isModalOpen1 && (
//           <Modal width={500} onClose={closeRequestModal1} title="Visit Request">
//             <Content7
//               selectedOption={selectedShowOption}
//               onOptionChange={setSelectedShowOption}
//               onConfirm={handleConfirmSelection}
//               onBack={handleBack}
//               visitRequestData={visitRequestDetails?.data}
//             />
//           </Modal>
//         )}
//       </div>
//       <div className="text-textPrimary text-sm font-semibold">Visit Requests</div>
//       <DataTable
//         data={transformedData}
//         columns={columns}
//         selectableRowsHighlight
//         customStyles={tableStyles}
//         fixedHeader
//         fixedHeaderScrollHeight="70vh"
//         noDataComponent={<div className="py-8 text-center">No visit requests found</div>}
//       />
//       <div className="mt-4 flex justify-center">
//         <button className="bg-primary flex cursor-pointer place-items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-[#01367f]">
//           View more
//           <GoArrowUpRight className="text-base text-white" />
//         </button>
//       </div>
//       {modal && selectedRow && (
//         <ProposalModal onClose={modalCloseHandler} title="Visit Request Overview" width="w-[300px] md:w-[500px]">
//           <div>
//             <p className="text-textPrimary text-center text-base md:text-2xl">
//               <strong className="text-2xl font-semibold">Visit Request Overview</strong>
//             </p>
//             <p className="text-textPrimary text-center text-base md:text-2xl">
//               Request ID: {selectedRow.proposalId.slice(-8)}
//             </p>
//             <p className="text-textPrimary text-center text-sm md:text-base">{selectedRow.dateSent}</p>
//             <hr className="border-textColor my-2 border-dashed" />
//             <div className="space-y-2">
//               <div className="border-b border-[#0245a5] px-8 py-6">
//                 <p className="flex justify-between">
//                   <strong>Visit Date:</strong>
//                   <p>{selectedRow.dateSent}</p>
//                 </p>
//               </div>
//               <div className="border-b border-[#0245a5] px-8 py-6">
//                 <p className="flex justify-between">
//                   <strong>Purpose:</strong>
//                   <p>{selectedRow.proposalType}</p>
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
//     </section>
//   );
// };

// export default ProposalSummary;

'use client';
import { tableStyles } from '@/data/data';
import { useState, useMemo, useCallback, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import ProposalModal from './ProposalModal';
import { GoArrowUpRight } from 'react-icons/go';
import Modal from '@/components/shared/small/Modal';
import Content6 from '@/components/tenant/popups/Content6';
import Content7 from '@/components/tenant/popups/Content7';
import {
  useGetVisitRequestByIdQuery,
  useRejectVisitRequestMutation,
  useAcceptVisitRequestMutation,
} from '@/features/visitRequest/visitRequestApi';
import { useGetAllProposalsQuery } from '@/features/Proposal/proposalApi';
import {
  useGetSingleBookingRequestQuery,
  useAcceptBookingRequestMutation,
  useRejectBookingRequestMutation,
} from '@/features/booking/bookingRequestApi';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setBuildingId } from '@/features/selectedId/selecetdId';
import Content12 from '@/components/tenant/popups/Content12';
import { toast } from 'react-hot-toast';

const ProposalSummary = () => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [selectedShowOption, setSelectedShowOption] = useState('');
  const [currentRequestType, setCurrentRequestType] = useState(''); // 'visit' or 'booking'

  // API hooks
  const { data: proposalsData, isLoading, error, refetch } = useGetAllProposalsQuery();

  // Visit request hooks
  const { data: visitRequestDetails } = useGetVisitRequestByIdQuery(selectedRequestId, {
    skip: !selectedRequestId || currentRequestType !== 'visit',
  });

  const [rejectVisitRequest] = useRejectVisitRequestMutation();
  const [acceptVisitRequest] = useAcceptVisitRequestMutation();

  // Booking request hooks
  const { data: bookingRequestDetails } = useGetSingleBookingRequestQuery(selectedRequestId, {
    skip: !selectedRequestId || currentRequestType !== 'booking',
  });
  const [acceptBookingRequest] = useAcceptBookingRequestMutation();
  const [rejectBookingRequest] = useRejectBookingRequestMutation();

  const dispatch = useDispatch();

  console.log(proposalsData);

  const modalOpenHandler = useCallback(row => {
    setSelectedRow(row);
    setModal(true);
  }, []);

  const modalCloseHandler = useCallback(() => {
    setSelectedRow(null);
    setModal(false);
  }, []);

  const openRequestModal = (requestId, row) => {
    setSelectedRequestId(requestId);
    setSelectedRow(row);
    setCurrentRequestType('visit');
    setIsModalOpen(true);
  };

  const openBookingModal = (requestId, row) => {
    setSelectedRequestId(requestId);
    setSelectedRow(row);
    setCurrentRequestType('booking');
    setIsBookingModalOpen(true);
  };

  const openRequestModal1 = () => {
    setIsModalOpen1(true);
  };

  const closeRequestModal = () => {
    setIsModalOpen(false);
    //setSelectedRequestId(null);
    //setCurrentRequestType('');
  };
  const handleCompleteClose = () => {
    setSelectedRequestId(null);
    setCurrentRequestType('');
    setSelectedRow(null);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedRequestId(null);
    setCurrentRequestType('');
  };

  const closeRequestModal1 = () => {
    setIsModalOpen1(false);
    setSelectedShowOption('');
    if (!isModalOpen) {
      handleCompleteClose();
    }
  };

  // Visit request handlers
  const handleRejectVisit = async () => {
    try {
      await rejectVisitRequest({ visitRequestId: selectedRequestId }).unwrap();
      toast.success('Visit Request rejected successfully!');
      refetch();
      closeRequestModal();
    } catch (error) {
      console.error('Error rejecting visit request:', error);
    }
  };

  const handleAcceptVisit = () => {
    //closeRequestModal();
    setIsModalOpen(false);
    openRequestModal1();
  };

  // Booking request handlers
  const handleRejectBooking = async () => {
    try {
      await rejectBookingRequest({ bookingRequestId: selectedRequestId }).unwrap();
      toast.success('Booking request rejected!');
      refetch();
      closeBookingModal();
    } catch (error) {
      console.error('Error rejecting booking request:', error);
    }
  };

  const handleAcceptBooking = async () => {
    try {
      await acceptBookingRequest({ bookingRequestId: selectedRequestId }).unwrap();
      toast.success('Booking request accepted successfully!');
      refetch();
      closeBookingModal();
    } catch (error) {
      console.error('Error accepting booking request:', error);
    }
  };
  const handleCancelBooking = () => {
    closeBookingModal();
  };

  const handleConfirmSelection = async () => {
    if (!selectedShowOption) {
      alert('Please select an option');
      return;
    }

    try {
      if (selectedShowOption === 'myself') {
        const ownerIdToUse = visitRequestDetails?.data?.owner || selectedRow?.ownerId;

        await acceptVisitRequest({
          visitRequestId: selectedRequestId,
          whoCanShowYou: ownerIdToUse,
        }).unwrap();
        toast.success('Visit Request Accepted Successfully!');
        refetch();
        closeRequestModal1();
      } else if (selectedShowOption === 'existing') {
        router.push(`/owner/agent?visitRequestId=${selectedRequestId}`);
        handleCompleteClose(); // Reset state when navigating
      } else if (selectedShowOption === 'new') {
        router.push(`/owner/agent/hiring-new-agent?visitRequestId=${selectedRequestId}`);
        handleCompleteClose(); // Reset state when navigating
      }
    } catch (error) {
      console.error('Error accepting visit request:', error);
    }
  };

  const handleBack = () => {
    setIsModalOpen1(false);
    setSelectedShowOption('');
    setIsModalOpen(true);
  };

  // Transform proposals data for the table
  const transformedData = useMemo(() => {
    if (!proposalsData?.data) return [];

    return proposalsData.data.map((request, index) => ({
      proposalId: request._id,
      projectName: request.property?.title || `Property ${index + 1}`,
      proposalType: request.type === 'Visit' ? 'Property Visit' : 'Property Booking',
      sentTo: 'Owner',
      dateSent: request.date,
      status: request.status,
      requestId: request._id,
      requestType: request.type.toLowerCase(), // 'visit' or 'booking'
      ownerId: request.owner || request.property?.owner, // Add fallback for owner ID
    }));
  }, [proposalsData]);

  const columns = useMemo(
    () => [
      {
        name: 'Proposal ID',
        selector: row => row.proposalId.slice(-8),
      },
      {
        name: 'Property',
        selector: row => row.projectName,
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
            {row.status === 'pending' && (
              <button
                className="bg-primary cursor-pointer rounded-[4px] px-4 py-[2px] text-xs font-medium text-white"
                onClick={() =>
                  row.requestType === 'visit'
                    ? openRequestModal(row.requestId, row)
                    : openBookingModal(row.requestId, row)
                }
              >
                Action
              </button>
            )}
          </div>
        ),
      },
    ],
    [modalOpenHandler]
  );

  if (isLoading) {
    return (
      <div className="shadow-card rounded-lg border bg-white p-4 lg:p-5">
        <div className="text-textPrimary text-sm font-semibold">Proposals</div>
        <div className="flex h-64 items-center justify-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shadow-card rounded-lg border bg-white p-4 lg:p-5">
        <div className="text-textPrimary text-sm font-semibold">Proposals</div>
        <div className="flex h-64 items-center justify-center">
          <div className="text-red-500">Error loading proposals</div>
        </div>
      </div>
    );
  }

  return (
    <section className="shadow-card rounded-lg border bg-white p-4 lg:p-5">
      <div>
        {/* Booking Modal */}
        {isBookingModalOpen && bookingRequestDetails && (
          <Modal title={'Booking Request'} onClose={closeBookingModal}>
            <Content12
              bookingRequestData={bookingRequestDetails.data}
              onAccept={handleAcceptBooking}
              onReject={handleRejectBooking}
              onCancel={handleCancelBooking}
            />
          </Modal>
        )}

        {/* Visit Request Modal */}
        {isModalOpen && visitRequestDetails && (
          <Modal width={500} onClose={closeRequestModal} title="Visit Request">
            <Content6
              cancelHandle={handleRejectVisit}
              acceptHandle={handleAcceptVisit}
              visitRequestData={visitRequestDetails.data}
            />
          </Modal>
        )}

        {/* Visit Request Selection Modal */}
        {isModalOpen1 && (
          <Modal width={500} onClose={closeRequestModal1} title="Visit Request">
            <Content7
              selectedOption={selectedShowOption}
              onOptionChange={setSelectedShowOption}
              onConfirm={handleConfirmSelection}
              onBack={handleBack}
              visitRequestData={visitRequestDetails?.data}
              selectedRow={selectedRow}
            />
          </Modal>
        )}
      </div>

      <div className="text-textPrimary text-sm font-semibold">Proposals</div>
      <DataTable
        data={transformedData}
        columns={columns}
        selectableRowsHighlight
        customStyles={tableStyles}
        fixedHeader
        fixedHeaderScrollHeight="70vh"
        noDataComponent={<div className="py-8 text-center">No proposals found</div>}
      />
      <div className="mt-4 flex justify-center">
        <button className="bg-primary flex cursor-pointer place-items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-[#01367f]">
          View more
          <GoArrowUpRight className="text-base text-white" />
        </button>
      </div>

      {/* View Modal */}
      {modal && selectedRow && (
        <ProposalModal onClose={modalCloseHandler} title="Proposal Overview" width="w-[300px] md:w-[500px]">
          <div>
            <p className="text-textPrimary text-center text-base md:text-2xl">
              <strong className="text-2xl font-semibold">
                {selectedRow.requestType === 'visit' ? 'Visit Request' : 'Booking Request'} Overview
              </strong>
            </p>
            <p className="text-textPrimary text-center text-base md:text-2xl">
              Request ID: {selectedRow.proposalId.slice(-8)}
            </p>
            <p className="text-textPrimary text-center text-sm md:text-base">{selectedRow.dateSent}</p>
            <hr className="border-textColor my-2 border-dashed" />
            <div className="space-y-2">
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>{selectedRow.requestType === 'visit' ? 'Visit Date:' : 'Booking Date:'}</strong>
                  <p>{selectedRow.dateSent}</p>
                </p>
              </div>
              <div className="border-b border-[#0245a5] px-8 py-6">
                <p className="flex justify-between">
                  <strong>Purpose:</strong>
                  <p>{selectedRow.proposalType}</p>
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
