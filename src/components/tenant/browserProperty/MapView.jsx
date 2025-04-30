import React from 'react';
import BrowsePropertyCard from './BrowsePropertyCard';
import dynamic from 'next/dynamic';
import PropertyDetailsSlider from './PropertyDetailsSlider';
// import AreaMapLocation from './AreaMapLocation'
const AreaMapLocation = dynamic(() => import('./AreaMapLocation'), {
  ssr: false,
});
function MapView({ handleCloseSlider, handleCardClick, selectedProperty, houses }) {
  return (
    <div className="pt-5">
      <div className="grid grid-cols-12 gap-4">
        <div className="custom-scroll col-span-12 h-[calc(100vh-400px)] space-y-3 overflow-auto rounded-md md:col-span-4 xl:h-[calc(100vh-355px)]">
          {houses?.map(property => (
            <div key={property.id} onClick={() => handleCardClick(property)}>
              <BrowsePropertyCard data={property} />
            </div>
          ))}
          <div
            className={`fixed top-24 right-0 h-full w-full bg-white shadow-lg transition-transform duration-300 lg:w-1/3 xl:w-1/4 ${
              selectedProperty ? 'translate-x-0' : 'translate-x-full'
            } z-[401]`}
          >
            {selectedProperty && (
              <PropertyDetailsSlider data={selectedProperty} onClose={handleCloseSlider} />
            )}
          </div>
        </div>
        <div className="col-span-12 h-[calc(100vh-400px)] rounded-md md:col-span-8 xl:h-[calc(100vh-355px)]">
          <AreaMapLocation
            houses={houses}
            areaName="Bangkok',
"
          />
        </div>
      </div>
    </div>
  );
}

export default MapView;
