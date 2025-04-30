import React from 'react';

function Main({ tabView }) {
  return (
    <div>
      <div>
        <div className="mt-5">
          {tabView === 'List' ? (
            // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-h-[800px] overflow-y-scroll scroll-0">
            //     {myPropertiesData.map((card, i) => (
            //         <PropertyCard data={card} key={i} />
            //     ))}
            // </div>
            <div>grid</div>
          ) : (
            // <ShowMap /><
            <div>map</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
