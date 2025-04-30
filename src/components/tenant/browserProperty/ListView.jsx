// import { houses } from '@/data/data'
import React from 'react';
import BrowsePropertyCard from './BrowsePropertyCard';
import PropertyDetailsSlider from './PropertyDetailsSlider';

function ListView({ handleCloseSlider, handleCardClick, selectedProperty, houses }) {
  return (
    <div className="grid max-h-[800px] grid-cols-1 gap-6 overflow-y-scroll pt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
      {houses?.map(property => (
        <div key={property.id} onClick={() => handleCardClick(property)}>
          <BrowsePropertyCard data={property} />
        </div>
      ))}
      <div
        className={`fixed top-24 right-0 h-full w-full bg-white shadow-lg transition-transform duration-300 lg:w-1/3 xl:w-1/4 ${
          selectedProperty ? 'translate-x-0' : 'translate-x-full'
        } z-50`}
      >
        {selectedProperty && (
          <PropertyDetailsSlider data={selectedProperty} onClose={handleCloseSlider} />
        )}
      </div>
    </div>
  );
}

export default ListView;
