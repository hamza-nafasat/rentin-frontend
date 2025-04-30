'use client';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';
// import { houses } from '@/data/data';

// Import your houses data
// import { houses } from '@/data/houses'; // adjust the path as needed

// Create a custom icon using react-icons.
const iconMarkup = renderToStaticMarkup(
  <FaMapMarkerAlt style={{ color: 'red', fontSize: '2rem' }} />
);
const customDivIcon = L.divIcon({
  html: iconMarkup,
  className: '',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// A helper component to recenter the map when the center changes.
const RecenterAutomatically = ({ latlng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(latlng);
  }, [latlng, map]);
  return null;
};

// A helper function that uses OpenStreetMap Nominatim to fetch coordinates.
const getCoordinates = async locationName => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    locationName
  )}&limit=1`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.length > 0) {
      const { lat, lon } = data[0];
      return [parseFloat(lat), parseFloat(lon)];
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
  }
  return null;
};

/**
 * AreaMapLocation Component
 *
 * Props:
 * - location: (string) Used in single house mode to specify the property location
 * - image: (string) Image of the property (for single house mode)
 * - name: (string) Name of the property (for single house mode)
 * - areaName: (string) Optional. If provided (e.g. "Thailand City") the map will:
 *      - Center on the area,
 *      - Highlight the area with a circle,
 *      - Display markers for all houses (from the houses array) in that area.
 */
const AreaMapLocation = ({ location, image, name, areaName, houses }) => {
  // For single property mode.
  const [position, setPosition] = useState(null);
  // For area mode.
  const [areaPosition, setAreaPosition] = useState(null);
  const [error, setError] = useState('');
  // A fallback map center.
  const defaultCenter = [51.505, -0.09];

  useEffect(() => {
    // If an areaName is provided, use it to fetch area coordinates.
    if (areaName) {
      getCoordinates(areaName).then(coords => {
        if (coords) {
          setAreaPosition(coords);
          setError('');
        } else {
          setError('Area not found');
          setAreaPosition(null);
        }
      });
    }
    // In addition, if a single location is provided, fetch its coordinates.
    if (location) {
      getCoordinates(location).then(coords => {
        if (coords) {
          setPosition(coords);
          setError('');
        } else {
          setError('Location not found');
          setPosition(null);
        }
      });
    }
  }, [location, areaName]);

  // Do not render on the server-side.
  if (typeof window === 'undefined') {
    return null;
  }

  // Determine map center:
  // In area mode, use areaPosition (if available) with a lower zoom level.
  // Otherwise, use the single house position (or fallback to defaultCenter).
  const mapCenter = areaName && areaPosition ? areaPosition : position || defaultCenter;
  const zoomLevel = areaName ? 11 : 13;

  return (
    <div className="h-full w-full">
      <MapContainer
        center={mapCenter}
        zoom={zoomLevel}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a> contributors'
        />
        <RecenterAutomatically latlng={mapCenter} />

        {/* In area mode, draw a circle highlighting the area */}
        {areaName && areaPosition && (
          <Circle
            center={areaPosition}
            radius={8000} // adjust radius as needed
            pathOptions={{
              color: '#5E81F4', // Light blue border
              fillColor: 'rgba(94, 129, 244, 0.1)', // Light blue fill
              fillOpacity: 0.2, // Light fill opacity
              dashArray: '10, 10', // Dashed border
            }}
          />
        )}

        {areaName
          ? // In area mode, display markers for all houses.
            houses.map(house => (
              <Marker
                key={house.id}
                position={[house.latitude, house.longitude]}
                icon={customDivIcon}
                eventHandlers={{
                  mouseover: e => {
                    e.target.openTooltip();
                  },
                  mouseout: e => {
                    e.target.closeTooltip();
                  },
                }}
              >
                <Tooltip direction="top" offset={[0, -30]} opacity={1} className="custom-tooltip">
                  <div
                    className="flex items-center justify-between gap-1 p-2.5"
                    style={{ width: '240px' }}
                  >
                    <div className="relative h-[50px] w-[50px] overflow-hidden rounded-md bg-gray-200">
                      <Image
                        src={house.images[0]}
                        alt={house.address}
                        layout="fill"
                        objectFit="cover"
                        unoptimized={true}
                        className="rounded-md"
                      />
                    </div>
                    <div className="w-[160px]">
                      <h4 className="truncate" style={{ margin: '5px 0', fontSize: '1rem' }}>
                        {house.address}
                      </h4>
                      <p className="truncate" style={{ margin: 0, fontSize: '0.9rem' }}>
                        {house.price}
                      </p>
                    </div>
                  </div>
                </Tooltip>
              </Marker>
            ))
          : // Single house mode marker.
            position && (
              <Marker
                position={position}
                icon={customDivIcon}
                eventHandlers={{
                  mouseover: e => {
                    e.target.openTooltip();
                  },
                  mouseout: e => {
                    e.target.closeTooltip();
                  },
                }}
              >
                <Tooltip direction="top" offset={[0, -30]} opacity={1} className="custom-tooltip">
                  <div
                    className="flex items-center justify-between gap-1 p-2.5"
                    style={{ width: '240px' }}
                  >
                    <div className="relative h-[50px] w-[50px] overflow-hidden rounded-md bg-blue-200">
                      <Image
                        src={image}
                        alt={name}
                        layout="fill"
                        objectFit="cover"
                        unoptimized={true}
                        className="rounded-md"
                      />
                    </div>
                    <div className="w-[100px] bg-red-600">
                      {' '}
                      {/* Fixed width for text container */}
                      <h4 className="m-0 truncate text-[1rem]">{name}</h4>
                      <p className="m-0 truncate text-[0.9rem]">{location}</p>
                    </div>
                  </div>
                </Tooltip>
              </Marker>
            )}
      </MapContainer>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default AreaMapLocation;
