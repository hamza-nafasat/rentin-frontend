import {
  Balcony,
  Barbeque,
  Bath,
  BathIcon,
  BedIcon,
  Canal,
  Cctv,
  City,
  FloorsIcon,
  Furnished,
  Garden,
  GreenView,
  Guard,
  Gym,
  Internet,
  Maids,
  Parking,
  Pool,
  Private,
  Renovated,
  Security,
  SqmIcon,
  Study,
  Theatre,
  Wardrobe,
} from '@/assets/icon';
import Image from 'next/image';
import React from 'react';
import ViewBuildingImages from './ViewBuildingImages';
import ViewBuildingDetails from './ViewBuildingDetails';

export default function ViewBuilding() {
  return (
    <div className="gap-5 bg-white">
      <div>
        <ViewBuildingImages />
      </div>
      <div className="mt-7">
        <ViewBuildingDetails />
      </div>
    </div>
  );
}
