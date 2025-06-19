// 'use client';
// import { useState } from 'react';
// import MyPropertiesHeader from './MyPropertiesHeader';
// import PropertyCard from './PropertyCard';
// import dynamic from 'next/dynamic';
// import { myPropertiesData } from '@/data/data';
// const ShowMap = dynamic(() => import('@/components/shared/ShowMap'), {
//   ssr: false,
// });

// const MyProperties = () => {
//   const [tabView, setTabView] = useState('Grid View');
//   return (
//     <section className="mt-4 rounded-lg bg-white p-4" style={{ boxShadow: '0px 2px 12px 0px #3582E71A' }}>
//       <MyPropertiesHeader tabView={tabView} setTabView={setTabView} />
//       <div className="mt-5">
//         {tabView === 'Grid View' ? (
//           <div className="scroll-0 grid max-h-[800px] grid-cols-1 gap-6 overflow-y-scroll md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
//             {myPropertiesData.map((card, i) => (
//               <PropertyCard data={card} key={i} />
//             ))}
//           </div>
//         ) : (
//           <ShowMap />
//         )}
//       </div>
//     </section>
//   );
// };

// export default MyProperties;

'use client';
import { useState } from 'react';
import MyPropertiesHeader from './MyPropertiesHeader';
import PropertyCard from './PropertyCard';
import dynamic from 'next/dynamic';
import { useGetMyAllPropertiesQuery } from '@/features/property/propertyApi';

const ShowMap = dynamic(() => import('@/components/shared/ShowMap'), {
  ssr: false,
});

const MyProperties = () => {
  const [tabView, setTabView] = useState('Grid View');

  // Fetch properties using RTK Query
  const { data: propertiesResponse, isLoading, isError, error } = useGetMyAllPropertiesQuery();

  // Extract properties from response
  const properties = propertiesResponse?.data || [];

  return (
    <section className="mt-4 rounded-lg bg-white p-4" style={{ boxShadow: '0px 2px 12px 0px #3582E71A' }}>
      <MyPropertiesHeader tabView={tabView} setTabView={setTabView} />
      <div className="mt-5">
        {tabView === 'Grid View' ? (
          <div className="scroll-0 grid max-h-[800px] grid-cols-1 gap-6 overflow-y-scroll md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[255px] w-full animate-pulse rounded-lg bg-gray-200"></div>
              ))
            ) : isError ? (
              // Error state
              <div className="col-span-full flex h-64 items-center justify-center rounded-lg bg-red-50">
                <div className="text-center">
                  <p className="text-red-600">Failed to load properties</p>
                  <p className="text-sm text-red-500">{error?.data?.message || 'Something went wrong'}</p>
                </div>
              </div>
            ) : properties.length === 0 ? (
              // Empty state
              <div className="col-span-full flex h-64 items-center justify-center rounded-lg bg-gray-50">
                <div className="text-center">
                  <p className="text-gray-600">No properties found</p>
                  <p className="text-sm text-gray-500">You haven't added any properties yet</p>
                </div>
              </div>
            ) : (
              // Render properties
              properties.map(property => <PropertyCard data={property} key={property._id} />)
            )}
          </div>
        ) : (
          <ShowMap properties={properties} />
        )}
      </div>
    </section>
  );
};

export default MyProperties;
