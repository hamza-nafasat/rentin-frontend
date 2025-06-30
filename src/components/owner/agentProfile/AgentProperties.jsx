// 'use client';
// import Image from 'next/image';
// import React, { useState, useMemo } from 'react';
// import DataTable from 'react-data-table-component';
// import { transactionHistoryData, transactionTableStyles } from '@/data/data';
// import AgentTransactionSlip from './AgentTransactionSlip';

// const properties = [
//   {
//     id: 1,
//     image: '/images/properties/PropertyView.png',
//     title: 'Charming Homes in Thailand',
//     address: '123 Sunset Road, Phuket, Thailand',
//     price: '$243',
//     period: 'per month',
//     monthlyRent: '$45,000',
//     startDate: 'Apr 29, 2024',
//     endDate: 'Apr 29, 2024',
//     Role: 'Inspection',
//     commission: '$250',
//     paymentStatus: 'pending', // Change this to "paid" or "rejected" to test different colors
//   },
//   {
//     id: 2,
//     image: '/images/properties/PropertyView.png',
//     title: 'Charming Homes in Thailand',
//     address: '123 Sunset Road, Phuket, Thailand',
//     price: '$243',
//     period: 'per month',
//     monthlyRent: '$45,000',
//     startDate: 'Apr 29, 2024',
//     endDate: 'Apr 29, 2024',
//     Role: 'Inspection',
//     commission: '$250',
//     paymentStatus: 'paid',
//   },
//   {
//     id: 3,
//     image: '/images/properties/PropertyView.png',
//     title: 'Charming Homes in Thailand',
//     address: '123 Sunset Road, Phuket, Thailand',
//     price: '$243',
//     period: 'per month',
//     monthlyRent: '$45,000',
//     startDate: 'Apr 29, 2024',
//     endDate: 'Apr 29, 2024',
//     Role: 'Inspection',
//     commission: '$250',
//     paymentStatus: 'rejected',
//   },
// ];

// function AgentTransactionHistory() {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);

//   const openModal = row => {
//     setSelectedRow(row);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   const columns = useMemo(
//     () => [
//       {
//         name: 'Property',
//         cell: row => {
//           return (
//             <div className="flex gap-3.5">
//               <div>
//                 <Image src={row.image} width={182} height={100} alt="Property View" />
//               </div>
//               <div className="flex flex-col justify-between p-1">
//                 <h1 className="text-base font-semibold text-[#0245a5]">{row.title}</h1>
//                 <h6 className="text-textSecondary text-xs font-normal">{row.address}</h6>
//                 <div>
//                   <span className="text-base font-semibold">
//                     {row.price}
//                     <span className="text-textSecondary text-[8px] font-semibold">{row.period}</span>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           );
//         },
//         width: '50%',
//       },
//       {
//         name: 'Monthly Rent',
//         selector: row => row.monthlyRent,
//       },
//       {
//         name: 'Start - End',
//         cell: row => (
//           <div className="flex flex-col">
//             <div>{row.startDate}</div>
//             <div>{row.endDate}</div>
//           </div>
//         ),
//       },
//       {
//         name: 'Role',
//         selector: row => row.Role,
//       },
//       {
//         name: 'Commission',
//         selector: row => row.commission,
//       },
//       {
//         name: 'Payment Status',
//         cell: row => {
//           const status = row.paymentStatus.toLowerCase();
//           const bgClass =
//             status === 'pending'
//               ? 'bg-[#FCD34D1A] text-[#F59E0B]'
//               : status === 'rejected'
//                 ? 'bg-[#FF3B301A] text-[#FF3B30]'
//                 : status === 'paid'
//                   ? 'bg-[#34C7591A] text-[#34C759]'
//                   : '';
//           return (
//             <div className="flex items-center gap-2">
//               <span
//                 className={`${bgClass} w-[80px] rounded-sm px-[10px] py-[3px] text-center text-sm font-semibold capitalize`}
//               >
//                 {row.paymentStatus}
//               </span>
//             </div>
//           );
//         },
//       },
//     ],
//     []
//   );

//   return (
//     <div className="shadow-card rounded-lg bg-white px-5 py-4">
//       <h1 className="mb-2 text-sm font-semibold">Transaction History</h1>
//       <DataTable
//         data={properties}
//         columns={columns}
//         selectableRowsHighlight
//         customStyles={transactionTableStyles}
//         fixedHeader
//         fixedHeaderScrollHeight="70vh"
//       />
//       {modalOpen && selectedRow && (
//         <Modal onClose={closeModal}>
//           <AgentTransactionSlip selectedRow={selectedRow} />
//         </Modal>
//       )}
//     </div>
//   );
// }

// export default AgentTransactionHistory;

// const Modal = ({ onClose, children, width }) => {
//   return (
//     <div
//       className="modal fixed inset-0 top-0 left-0 z-[99] flex items-center justify-center bg-[#000000c5] p-6"
//       onClick={onClose}
//     >
//       <div
//         className={`shadow-card overflow-hidden rounded-[12px] bg-white ${width ? width : 'w-[500px]'} h-[488px]`}
//         onClick={e => e.stopPropagation()}
//       >
//         {children}
//       </div>
//     </div>
//   );
// };

'use client';
import Image from 'next/image';
import React, { useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { transactionHistoryData, transactionTableStyles } from '@/data/data';
import AgentTransactionSlip from './AgentTransactionSlip';

function AgentProperties({ properties = [] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const openModal = row => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // const transformedProperties = useMemo(() => {
  //   return properties.map((property, index) => ({
  //     id: property.propertyId || index,
  //     image: property.propertyImage || '/images/properties/PropertyView.png',
  //     title: property.projectName,
  //     address: property.address,
  //     price: property.price ? `$${property.price}` : 'N/A',
  //     period: 'per service',
  //     monthlyRent: property.monthlyRent ? `$${property.monthlyRent}` : 'N/A',
  //     startDate: property.startDate ? new Date(property.startDate).toLocaleDateString() : 'N/A',
  //     endDate: property.endDate ? new Date(property.endDate).toLocaleDateString() : 'N/A',
  //     Role: property.serviceType,
  //     commission: property.price ? `$${property.price}` : 'N/A',
  //     paymentStatus: property.status || 'pending',
  //   }));
  // }, [properties]);
  const transformedProperties = useMemo(() => {
    return properties.map((property, index) => {
      let imageUrl = property.propertyImage || '/images/properties/PropertyView.png';
      if (imageUrl && imageUrl.startsWith('http://res.cloudinary.com')) {
        imageUrl = imageUrl.replace('http://', 'https://');
      }

      return {
        id: property.propertyId || index,
        image: imageUrl,
        title: property.projectName,
        address: property.address,
        price: property.price ? `${property.price}` : 'N/A',
        period: 'per service',
        monthlyRent: property.monthlyRent ? `${property.monthlyRent}` : 'N/A',
        startDate: property.startDate ? new Date(property.startDate).toLocaleDateString() : 'N/A',
        endDate: property.endDate ? new Date(property.endDate).toLocaleDateString() : 'N/A',
        Role: property.serviceType,
        commission: property.price ? `${property.price}` : 'N/A',
        paymentStatus: property.status || 'pending',
      };
    });
  }, [properties]);

  const columns = useMemo(
    () => [
      {
        name: 'Property',
        cell: row => {
          return (
            <div className="flex gap-3.5">
              <div>
                <Image
                  src={row.image}
                  width={182}
                  height={100}
                  alt="Property View"
                  className="rounded-md object-cover"
                  onError={e => {
                    e.target.src = '/images/properties/PropertyView.png';
                  }}
                />
              </div>
              <div className="flex flex-col justify-between p-1">
                <h1 className="text-base font-semibold text-[#0245a5]">{row.title}</h1>
                <h6 className="text-textSecondary text-xs font-normal">{row.address}</h6>
                <div>
                  <span className="text-base font-semibold">
                    {row.price}
                    <span className="text-textSecondary text-[8px] font-semibold">{row.period}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        },
        width: '50%',
      },
      {
        name: 'Monthly Rent',
        selector: row => `$${row.monthlyRent}`,
      },
      {
        name: 'Start - End',
        cell: row => (
          <div className="flex flex-col">
            <div className="text-sm">{row.startDate}</div>
            <div className="text-sm">{row.endDate}</div>
          </div>
        ),
      },
      {
        name: 'Role',
        selector: row => row.Role,
      },
      {
        name: 'Commission',
        selector: row => `$${row.commission}`,
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
                : status === 'paid' || status === 'completed'
                  ? 'bg-[#34C7591A] text-[#34C759]'
                  : 'bg-gray-100 text-gray-600';
          return (
            <div className="flex items-center gap-2">
              <span
                className={`${bgClass} w-[80px] rounded-sm px-[10px] py-[3px] text-center text-sm font-semibold capitalize`}
              >
                {row.paymentStatus}
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  if (transformedProperties.length === 0) {
    return (
      <div className="shadow-card rounded-lg bg-white px-5 py-4">
        <h1 className="mb-2 text-sm font-semibold">Transaction History</h1>
        <div className="flex items-center justify-center py-8">
          <div className="text-sm text-gray-500">No properties data available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="shadow-card rounded-lg bg-white px-5 py-4">
      <h1 className="mb-2 text-sm font-semibold">Transaction History</h1>
      <DataTable
        data={transformedProperties}
        columns={columns}
        selectableRowsHighlight
        customStyles={transactionTableStyles}
        fixedHeader
        fixedHeaderScrollHeight="70vh"
        onRowClicked={openModal}
        pointerOnHover
      />
      {modalOpen && selectedRow && (
        <Modal onClose={closeModal}>
          <AgentTransactionSlip selectedRow={selectedRow} />
        </Modal>
      )}
    </div>
  );
}

export default AgentProperties;

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
