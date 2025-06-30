// import React from 'react';
// import AgentProperties from './AgentProperties';
// import Image from 'next/image';

// function LinkBuildings() {
//   return (
//     <div className="w-full rounded-lg bg-white p-3.5">
//       {
//         <div className="flex items-center gap-4">
//           <Image src="/images/dashboard/rental.png" width={32} height={32} alt="icon" />
//           <span className="text-sm font-semibold">Linked Properties</span>
//         </div>
//       }
//       <div className="mt-4 w-[400px] md:w-full">
//         <AgentProperties />
//       </div>
//     </div>
//   );
// }

// export default LinkBuildings;

'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import AgentProperties from './AgentProperties';
import Image from 'next/image';
import { useGetAgentPropertiesQuery } from '@/features/agent/agentApi'; // Adjust path as needed

function LinkBuildings() {
  const params = useParams();
  const agentId = params?.agentid;

  // Fetch agent properties using RTK Query
  const {
    data: agentPropertiesResponse,
    isLoading,
    isError,
    error,
  } = useGetAgentPropertiesQuery(agentId, {
    skip: !agentId, // Skip the query if agentId is not available
  });

  // Extract the properties data from the response
  const properties = agentPropertiesResponse?.data || [];

  return (
    <div className="w-full rounded-lg bg-white p-3.5">
      <div className="flex items-center gap-4">
        <Image src="/images/dashboard/rental.png" width={32} height={32} alt="icon" />
        <span className="text-sm font-semibold">Linked Properties</span>
      </div>

      <div className="mt-4 w-[400px] md:w-full">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-gray-500">Loading properties...</div>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-red-500">
              Error loading properties: {error?.data?.message || 'Something went wrong'}
            </div>
          </div>
        ) : properties.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-gray-500">No properties found for this agent</div>
          </div>
        ) : (
          <AgentProperties properties={properties} />
        )}
      </div>
    </div>
  );
}

export default LinkBuildings;
