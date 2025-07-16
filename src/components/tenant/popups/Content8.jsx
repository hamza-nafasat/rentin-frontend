// 'use client';
// import React from 'react';
// import { useState } from 'react';
// import PropertyImage from './PropertyImage';
// import Image from 'next/image';
// import InputText from '../forms/InputText';
// import InputTime from '../forms/InputTime';
// import InputDate from '../forms/InputDate';
// import Modal from '@/components/shared/small/Modal';
// import Buttons from './Buttons';
// import ViewBuilding from './ViewBuildingContent';
// import Input from '@/components/shared/small/Input';
// import Button from '@/components/shared/small/Button';
// function Content8({ cancelHandle, sendRequest, data, selectedProperty, selectedTenant, agentId }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div className="flex flex-col">
//       <PropertyImage propertyData={data || selectedProperty}>
//         <Button text={'View Building'} onClick={() => setIsModalOpen(true)} />
//       </PropertyImage>
//       <div>
//         <form action="">
//           <div className="mt-3 flex flex-wrap justify-between">
//             <div className="basis-[100%] sm:basis-[49%]">
//               <Input
//                 shadow
//                 type={'text'}
//                 label={'Full name'}
//                 placeholder={'Jamie Fox'}
//                 value={selectedTenant?.name || ''}
//                 readOnly
//               />
//             </div>
//             <div className="basis-[100%] sm:basis-[49%]">
//               <Input
//                 shadow
//                 type={'text'}
//                 label={'Price'}
//                 placeholder={'12$'}
//                 value={data?.contractRate?.rate ? `$${data.contractRate.rate}` : ''}
//                 readOnly
//               />
//             </div>
//           </div>
//           <div className="mt-3 flex flex-wrap justify-between">
//             <div className="basis-[100%] sm:basis-[49%]">
//               <Input shadow type={'date'} value={'2025-05-05'} label={'Date'} />
//             </div>
//             <div className="basis-[100%] sm:basis-[49%]">
//               <Input shadow type={'time'} value="14:30" label={'Appointment'} />
//             </div>
//           </div>
//         </form>
//       </div>
//       <div className="mt-3 flex justify-end gap-2">
//         <Buttons
//           cancelHandle={cancelHandle}
//           acceptHandle={sendRequest}
//           text1={'Back'}
//           cn={'!bg-[#5390E0] hover:!bg-blue-400'}
//           text2={'Send Contract'}
//         />
//       </div>
//       <div>
//         {isModalOpen && (
//           <Modal width={500} onClose={() => setIsModalOpen(false)}>
//             <ViewBuilding />
//           </Modal>
//         )}
//       </div>
//     </div>
//   );
// }
// export default Content8;

// 'use client';
// import React from 'react';
// import { useState } from 'react';
// import PropertyImage from './PropertyImage';
// import Image from 'next/image';
// import InputText from '../forms/InputText';
// import InputTime from '../forms/InputTime';
// import InputDate from '../forms/InputDate';
// import Modal from '@/components/shared/small/Modal';
// import Buttons from './Buttons';
// import ViewBuilding from './ViewBuildingContent';
// import Input from '@/components/shared/small/Input';
// import Button from '@/components/shared/small/Button';

// function Content8({ cancelHandle, sendRequest, data, selectedProperty, selectedTenant, agentId, tenants }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRequestIndex, setSelectedRequestIndex] = useState(0);

//   // Function to get all requests for the selected tenant
//   const getSelectedTenantRequests = () => {
//     if (!selectedTenant?._id || !tenants) return [];

//     return tenants.filter(tenant => tenant._id === selectedTenant._id);
//   };

//   // Function to get the currently selected request data
//   const getSelectedTenantData = () => {
//     const requests = getSelectedTenantRequests();
//     return requests[selectedRequestIndex] || null;
//   };

//   // Function to format date for input field (YYYY-MM-DD format)
//   const formatDateForInput = dateString => {
//     if (!dateString) return '';

//     // Handle different date formats
//     if (dateString.includes('-')) {
//       // Check if it's DD-MM-YYYY format
//       const parts = dateString.split('-');
//       if (parts.length === 3) {
//         // If year is at the end (DD-MM-YYYY), convert to YYYY-MM-DD
//         if (parts[2].length === 4) {
//           return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
//         }
//         // If year is at the beginning (YYYY-MM-DD), return as is
//         else if (parts[0].length === 4) {
//           return dateString;
//         }
//       }
//     }

//     return dateString;
//   };

//   // Function to format time for input field (HH:MM format)
//   const formatTimeForInput = timeString => {
//     if (!timeString) return '';

//     // Convert 12-hour format to 24-hour format
//     const time = timeString.toLowerCase();

//     if (time.includes('pm') || time.includes('am')) {
//       const [timePart, period] = time.split(' ');
//       const [hours, minutes] = timePart.split(':');
//       let hour24 = parseInt(hours);

//       if (period.includes('pm') && hour24 !== 12) {
//         hour24 += 12;
//       } else if (period.includes('am') && hour24 === 12) {
//         hour24 = 0;
//       }

//       return `${hour24.toString().padStart(2, '0')}:${minutes || '00'}`;
//     }

//     return timeString;
//   };

//   const selectedTenantData = getSelectedTenantData();
//   const tenantRequests = getSelectedTenantRequests();

//   return (
//     <div className="flex flex-col">
//       <PropertyImage propertyData={data || selectedProperty}>
//         <Button text={'View Building'} onClick={() => setIsModalOpen(true)} />
//       </PropertyImage>
//       <div>
//         <form action="">
//           <div className="mt-3 flex flex-wrap justify-between">
//             <div className="basis-[100%] sm:basis-[49%]">
//               <Input
//                 shadow
//                 type={'text'}
//                 label={'Tenant name'}
//                 placeholder={'Jamie Fox'}
//                 value={selectedTenant?.name || ''}
//                 readOnly
//               />
//             </div>
//             <div className="basis-[100%] sm:basis-[49%]">
//               <Input
//                 shadow
//                 type={'text'}
//                 label={'Price'}
//                 placeholder={'12$'}
//                 value={data?.contractRate?.rate ? `$${data.contractRate.rate}` : ''}
//               />
//             </div>
//           </div>
//           <div className="mt-3 flex flex-wrap justify-between">
//             <div className="basis-[100%] sm:basis-[49%]">
//               <Input shadow type={'date'} value={formatDateForInput(selectedTenantData?.date) || ''} label={'Date'} />
//             </div>
//             <div className="basis-[1008] sm:basis-[49%]">
//               <Input shadow type={'time'} value={formatTimeForInput(selectedTenantData?.time) || ''} label={'Time'} />
//             </div>
//           </div>
//         </form>
//       </div>
//       <div className="mt-3 flex justify-end gap-2">
//         <Buttons
//           cancelHandle={cancelHandle}
//           acceptHandle={sendRequest}
//           text1={'Back'}
//           cn={'!bg-[5390E0] hover:!bg-blue-400'}
//           text2={'Send Contract'}
//         />
//       </div>
//       <div>
//         {isModalOpen && (
//           <Modal width={'w-full sm:!w-[750px]'} onClose={() => setIsModalOpen(false)}>
//             <ViewBuilding data={data} />
//           </Modal>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Content8;

'use client';
import React from 'react';
import { useState } from 'react';
import PropertyImage from './PropertyImage';
import Image from 'next/image';
import InputText from '../forms/InputText';
import InputTime from '../forms/InputTime';
import InputDate from '../forms/InputDate';
import Modal from '@/components/shared/small/Modal';
import Buttons from './Buttons';
import ViewBuilding from './ViewBuildingContent';
import Input from '@/components/shared/small/Input';
import Button from '@/components/shared/small/Button';
import toast from 'react-hot-toast';
import { useAssignTaskMutation } from '@/features/agent/agentApi';

function Content8({ cancelHandle, sendRequest, data, selectedProperty, selectedTenant, agentId, tenants }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestIndex, setSelectedRequestIndex] = useState(0);
  const [assignTask, { isLoading }] = useAssignTaskMutation();

  // Add form state
  const [formData, setFormData] = useState({
    price: '',
    date: '',
    time: '',
  });

  // Function to get all requests for the selected tenant
  const getSelectedTenantRequests = () => {
    if (!selectedTenant?._id || !tenants) return [];
    return tenants.filter(tenant => tenant._id === selectedTenant._id);
  };

  // Function to get the currently selected request data
  const getSelectedTenantData = () => {
    const requests = getSelectedTenantRequests();
    return requests[selectedRequestIndex] || null;
  };

  // Function to format date for input field (YYYY-MM-DD format)
  const formatDateForInput = dateString => {
    if (!dateString) return '';

    if (dateString.includes('-')) {
      const parts = dateString.split('-');
      if (parts.length === 3) {
        if (parts[2].length === 4) {
          return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
        } else if (parts[0].length === 4) {
          return dateString;
        }
      }
    }
    return dateString;
  };

  // Function to format time for input field (HH:MM format)
  const formatTimeForInput = timeString => {
    if (!timeString) return '';

    const time = timeString.toLowerCase();

    if (time.includes('pm') || time.includes('am')) {
      const [timePart, period] = time.split(' ');
      const [hours, minutes] = timePart.split(':');
      let hour24 = parseInt(hours);

      if (period.includes('pm') && hour24 !== 12) {
        hour24 += 12;
      } else if (period.includes('am') && hour24 === 12) {
        hour24 = 0;
      }

      return `${hour24.toString().padStart(2, '0')}:${minutes || '00'}`;
    }

    return timeString;
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle price input change (remove $ for storage, add for display)
  const handlePriceChange = e => {
    const value = e.target.value.replace('$', '');
    handleInputChange('price', value);
  };

  // Handle form submission
  // Handle form submission
  const handleSendContract = async () => {
    // Validation
    if (!formData.price.trim()) {
      toast.error('Price is required to book an agent');
      return;
    }

    const selectedTenantData = getSelectedTenantData();

    const date = formData.date || selectedTenantData?.date;
    const time = formData.time || selectedTenantData?.time;

    if (!date || !time) {
      toast.error('Date and time are required');
      return;
    }

    if (!agentId || !selectedProperty?._id || !selectedTenantData?.visitRequestId) {
      toast.error('Missing required information');
      return;
    }

    try {
      // Format date to YYYY-MM-DD format
      let formattedDate = date;
      if (date.includes('-')) {
        const parts = date.split('-');
        if (parts.length === 3) {
          // Check if it's DD-MM-YYYY format and convert to YYYY-MM-DD
          if (parts[2].length === 4) {
            formattedDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
          }
        }
      }

      // Format time to HH:MM format (24-hour)
      let formattedTime = time;
      if (time.includes('am') || time.includes('pm')) {
        const timeLower = time.toLowerCase();
        const [timePart, period] = timeLower.split(' ');
        const [hours, minutes] = timePart.split(':');
        let hour24 = parseInt(hours);

        if (period.includes('pm') && hour24 !== 12) {
          hour24 += 12;
        } else if (period.includes('am') && hour24 === 12) {
          hour24 = 0;
        }

        formattedTime = `${hour24.toString().padStart(2, '0')}:${minutes || '00'}`;
      }

      const contractData = {
        agentId: agentId,
        propertyId: selectedProperty._id,
        visitRequestId: selectedTenantData.visitRequestId,
        price: parseFloat(formData.price),
        date: date, // Expecting YYYY-MM-DD from native input
        time: time, // HH:MM format
      };

      console.log('Sending contract request...', contractData);

      const response = await assignTask(contractData).unwrap();

      toast.success('Contract sent successfully!');

      // Call the original sendRequest if needed for additional logic
      if (sendRequest) {
        sendRequest(contractData);
      }

      // Close modal or perform other actions
      cancelHandle();
    } catch (error) {
      console.error('Error sending contract:', error);
      toast.error(error?.data?.message || 'Failed to send contract');
    }
  };

  const selectedTenantData = getSelectedTenantData();
  const tenantRequests = getSelectedTenantRequests();

  return (
    <div className="flex flex-col">
      <PropertyImage propertyData={data || selectedProperty}>
        <Button text={'View Building'} onClick={() => setIsModalOpen(true)} />
      </PropertyImage>
      <div>
        <form action="">
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input
                shadow
                type={'text'}
                label={'Tenant name'}
                placeholder={'Jamie Fox'}
                value={selectedTenant?.name || ''}
                readOnly
              />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              <Input
                shadow
                type={'text'}
                label={'Price'}
                placeholder={'$12'}
                value={formData.price ? `$${formData.price}` : ''}
                onChange={handlePriceChange}
                required
              />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between">
            <div className="basis-[100%] sm:basis-[49%]">
              <Input
                shadow
                type={'date'}
                value={formData.date || selectedTenantData?.date || ''}
                label={'Date'}
                onChange={e => handleInputChange('date', e.target.value)}
              />
            </div>
            <div className="basis-[100%] sm:basis-[49%]">
              {' '}
              <Input shadow type={'time'} value={formatTimeForInput(selectedTenantData?.time) || ''} label={'Time'} />
            </div>
          </div>
        </form>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <Buttons
          cancelHandle={cancelHandle}
          acceptHandle={handleSendContract}
          text1={'Back'}
          cn={'!bg-[5390E0] hover:!bg-blue-400'}
          text2={isLoading ? 'Sending...' : 'Send Contract'}
          disabled={isLoading}
        />
      </div>
      <div>
        {isModalOpen && (
          <Modal width={'w-full sm:!w-[750px]'} onClose={() => setIsModalOpen(false)}>
            <ViewBuilding data={data} />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Content8;
