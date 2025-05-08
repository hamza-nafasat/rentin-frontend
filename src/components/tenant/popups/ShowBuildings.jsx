import React from 'react';
import BuildingItem from './BuildingItem';

function ShowBuildings() {
  return (
    <div className="flex flex-col gap-3 overflow-auto">
      <BuildingItem />
    </div>
  );
}

export default ShowBuildings;
