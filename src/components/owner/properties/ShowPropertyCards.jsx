// 'use client';
// import Button from '@/components/shared/small/Button';
// import Dropdown from '@/components/shared/small/Dropdown';
// import Modal from '@/components/shared/small/Modal';
// import Image from 'next/image';
// import React, { useState } from 'react';

// function ShowPropertyCards({ properties = [], onPropertySelect, setIsModalOpen1, isLoading, error }) {
//   const [selectBuilding, setSelectBuilding] = useState();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const userOptions = [
//     { option: 'Aamar', value: 'aamar' },
//     { option: 'Bilal', value: 'bilal' },
//     { option: 'Nisar', value: 'nisar' },
//     { option: 'zain', value: 'zain' },
//   ];

//   const selectHandle = (propertyId, property) => {
//     console.log('Selected property ID:', propertyId);
//     setSelectBuilding(propertyId);
//     if (onPropertySelect) {
//       onPropertySelect(property);
//     }
//   };

//   const handleNext = () => {
//     if (selectBuilding) {
//       const selectedProperty = properties.find(p => p._id === selectBuilding);
//       if (selectedProperty && onPropertySelect) {
//         onPropertySelect(selectedProperty);
//       }
//       if (setIsModalOpen1) {
//         setIsModalOpen1(true);
//       }
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex h-[460px] items-center justify-center">
//         <div className="text-gray-500">Loading properties...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex h-[460px] items-center justify-center">
//         <div className="text-red-500">Error loading properties</div>
//       </div>
//     );
//   }

//   if (!properties || properties.length === 0) {
//     return (
//       <div className="flex h-[460px] items-center justify-center">
//         <div className="text-gray-500">No properties found</div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-[800px] overflow-x-auto lg:w-full">
//       {/* Header Section */}

//       {/* Properties List */}
//       <div className="flex h-[460px] flex-col gap-2 overflow-auto">
//         {properties.map(property => (
//           <div>
//             <div
//               key={property._id}
//               onClick={() => {
//                 setIsModalOpen(true);
//               }}
//               className={`flex cursor-pointer flex-col gap-2.5 rounded border p-2 ${
//                 selectBuilding === property._id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
//               }`}
//             >
//               {/* Left Section: Image and Details */}
//               <div className="col-span-6">
//                 <div className="flex gap-3.5">
//                   <div>
//                     <Image
//                       src={property?.images?.[0]?.url || '/images/placeholder-property.jpg'}
//                       width={182}
//                       height={100}
//                       alt="property image"
//                       className="rounded object-cover"
//                     />
//                   </div>
//                   <div className="flex flex-col justify-between p-1">
//                     <div>
//                       <h1 className="text-base font-semibold text-[#0245a5]">
//                         {property?.propertyTitle || property?.projectName || 'Untitled Property'}
//                       </h1>
//                     </div>
//                     <div>
//                       <h6 className="text-textSecondary text-xs font-normal">
//                         {property?.address || 'Address not available'}
//                       </h6>
//                     </div>
//                     <div>
//                       <span className="text-base font-semibold">
//                         ${property?.contractRate?.rate || 'N/A'}
//                         <span className="text-textSecondary text-[8px] font-semibold">{property.period}</span>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <section className="border-t"></section>
//             </div>
//             <div>
//               {isModalOpen && (
//                 <Modal
//                   width={'w-[300px] h-auto md:w-[400px] lg:w-[700px] xl:w-[500px]'}
//                   onClose={() => setIsModalOpen(false)}
//                   title="Select User"
//                 >
//                   <div className="flex flex-col justify-center">
//                     <div className="h-[300px]">
//                       <Dropdown options={userOptions} label="User Options" />
//                     </div>
//                     <div className="flex justify-center">
//                       <Button onClick={() => selectHandle(property._id, property)} text={'Next'} />
//                     </div>
//                   </div>
//                 </Modal>
//               )}
//             </div>
//           </div>
//         ))}
//         {/* {isModalOpen && (
//           <Modal
//             width={'w-[300px] h-auto md:w-[400px] lg:w-[700px] xl:w-[500px]'}
//             onClose={() => setIsModalOpen(false)}
//             title="Select User"
//           >
//             <div className="flex flex-col justify-center">
//               <div className="h-[300px]">
//                 <Dropdown options={userOptions} label="User Options" />
//               </div>
//               <div className="flex justify-center">
//                 <Button
//                   // onClick={() => selectHandle(property._id, property)}
//                   text={'Next'}
//                 />
//               </div>
//             </div>
//           </Modal>
//         )} */}
//       </div>
//       <div className="mt-4 flex justify-center">
//         <Button text={'Next'} onClick={handleNext} disabled={!selectBuilding} />
//       </div>
//     </div>
//   );
// }

// export default ShowPropertyCards;

'use client';
import Button from '@/components/shared/small/Button';
import Dropdown from '@/components/shared/small/Dropdown';
import Modal from '@/components/shared/small/Modal';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

function ShowPropertyCards({
  properties = [],
  onPropertySelect,
  tenants = [],
  onTenantSelect,
  isLoading,
  error,
  isLoadingTenants,
  errorTenants,
  agentId,
}) {
  const [selectBuilding, setSelectBuilding] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState('');

  // Debug: Log the tenants data
  useEffect(() => {
    console.log('Tenants data in ShowPropertyCards:', tenants);
    console.log('Is loading tenants:', isLoadingTenants);
    console.log('Tenants error:', errorTenants);
  }, [tenants, isLoadingTenants, errorTenants]);

  // Transform tenants data for dropdown
  const tenantOptions = tenants.map(tenant => ({
    option: tenant.name,
    value: tenant._id,
  }));

  // Debug: Log the transformed options
  useEffect(() => {
    console.log('Tenant options:', tenantOptions);
  }, [tenantOptions]);

  const selectHandle = (propertyId, property) => {
    console.log('Selected property ID:', propertyId);
    setSelectBuilding(propertyId);
    if (onPropertySelect) {
      onPropertySelect(property);
    }
  };

  const handleTenantSelect = () => {
    if (selectedTenant) {
      const tenant = tenants.find(t => t._id === selectedTenant);
      console.log('Selected tenant:', tenant);
      if (tenant && onTenantSelect) {
        onTenantSelect(tenant);
      }
      setIsModalOpen(false);
    }
  };

  const handleNext = () => {
    if (selectBuilding) {
      const selectedProperty = properties.find(p => p._id === selectBuilding);
      if (selectedProperty && onPropertySelect) {
        onPropertySelect(selectedProperty);
      }
    }
  };

  const handlePropertyClick = property => {
    console.log('Property clicked:', property);
    setSelectBuilding(property._id);
    if (onPropertySelect) {
      onPropertySelect(property);
    }
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex h-[460px] items-center justify-center">
        <div className="text-gray-500">Loading properties...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[460px] items-center justify-center">
        <div className="text-red-500">Error loading properties</div>
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="flex h-[460px] items-center justify-center">
        <div className="text-gray-500">No properties found</div>
      </div>
    );
  }

  return (
    <div className="w-[800px] overflow-x-auto lg:w-full">
      {/* Properties List */}
      <div className="flex h-[460px] flex-col gap-2 overflow-auto">
        {properties.map(property => (
          <div key={property._id}>
            <div
              onClick={() => handlePropertyClick(property)}
              className={`flex cursor-pointer flex-col gap-2.5 rounded border p-2 ${
                selectBuilding === property._id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              {/* Left Section: Image and Details */}
              <div className="col-span-6">
                <div className="flex gap-3.5">
                  <div>
                    <Image
                      src={property?.images?.[0]?.url || '/images/placeholder-property.jpg'}
                      width={182}
                      height={100}
                      alt="property image"
                      className="rounded object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-1">
                    <div>
                      <h1 className="text-base font-semibold text-[#0245a5]">
                        {property?.propertyTitle || property?.projectName || 'Untitled Property'}
                      </h1>
                    </div>
                    <div>
                      <h6 className="text-textSecondary text-xs font-normal">
                        {property?.address || 'Address not available'}
                      </h6>
                    </div>
                    <div>
                      <span className="text-base font-semibold">
                        ${property?.contractRate?.rate || 'N/A'}
                        <span className="text-textSecondary text-[8px] font-semibold">{property.period}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <section className="border-t"></section>
            </div>
          </div>
        ))}
      </div>

      {/* Tenant Selection Modal */}
      {isModalOpen && (
        <Modal
          width={'w-[300px] h-auto md:w-[400px] lg:w-[700px] xl:w-[500px]'}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTenant(''); // Reset selected tenant when closing
          }}
          title="Select Tenant"
        >
          <div className="flex flex-col justify-center">
            <div className="h-[300px] p-4">
              {isLoadingTenants ? (
                <div className="flex h-full items-center justify-center">
                  <div className="text-gray-500">Loading tenants...</div>
                </div>
              ) : errorTenants ? (
                <div className="flex h-full items-center justify-center">
                  <div className="text-red-500">Error loading tenants: {errorTenants.message || 'Unknown error'}</div>
                </div>
              ) : tenantOptions.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <div className="text-gray-500">No tenants found for this property</div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">Select a tenant for this property:</p>
                  <Dropdown
                    options={tenantOptions}
                    label="Select Tenant"
                    value={selectedTenant}
                    onChange={setSelectedTenant}
                    placeholder="Choose a tenant..."
                  />
                  {selectedTenant && (
                    <div className="mt-2 text-sm text-green-600">
                      Selected: {tenantOptions.find(t => t.value === selectedTenant)?.option}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex justify-center pb-4">
              <Button onClick={handleTenantSelect} text={'Next'} disabled={!selectedTenant || isLoadingTenants} />
            </div>
          </div>
        </Modal>
      )}

      <div className="mt-4 flex justify-center">
        <Button text={'Next'} onClick={handleNext} disabled={!selectBuilding} />
      </div>
    </div>
  );
}

export default ShowPropertyCards;
