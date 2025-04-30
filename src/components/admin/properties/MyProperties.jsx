'use client';
import { useState } from 'react';
// import MyPropertiesHeader from './MyPropertiesHeader';
// import PropertyCard from './PropertyCard';
import dynamic from 'next/dynamic';
import { myPropertiesData } from '@/data/data';
import MyPropertiesHeader from '@/components/owner/properties/MyPropertiesHeader';
import PropertyCard from './PropertyCard';
// import PropertyCard from '@/components/owner/properties/PropertyCard';
const ShowMap = dynamic(() => import('@/components/shared/ShowMap'), {
  ssr: false,
});

const MyProperties = () => {
  const [tabView, setTabView] = useState('Grid View');
  return (
    <section
      className="mt-4 rounded-lg bg-white p-4"
      style={{ boxShadow: '0px 2px 12px 0px #3582E71A' }}
    >
      <MyPropertiesHeader tabView={tabView} setTabView={setTabView} />
      <div className="mt-5">
        {tabView === 'Grid View' ? (
          <div className="scroll-0 grid max-h-[800px] grid-cols-1 gap-6 overflow-y-scroll md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
            {myPropertiesData.map((card, i) => (
              <PropertyCard data={card} key={i} />
            ))}
          </div>
        ) : (
          <ShowMap />
        )}
      </div>
    </section>
  );
};

export default MyProperties;
