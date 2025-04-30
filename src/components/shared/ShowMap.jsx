'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const buildingIcon = L.icon({
  iconUrl: '/images/dashboard/rental.png',
  iconSize: [56, 56],
  iconAnchor: [28, 56],
});

const centerMarkerPosition = [13.7563, 100.5018];

const buildings = [
  { position: [13.757, 100.5025] },
  { position: [13.7555, 100.5] },
  { position: [13.758, 100.503] },
  { position: [13.756, 100.5005] },
];

const ShowMap = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '489px',
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    >
      <MapContainer
        center={centerMarkerPosition}
        zoom={13}
        scrollWheelZoom={false}
        attributionControl={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a> contributors'
        />
        <Circle
          center={centerMarkerPosition}
          radius={2000}
          pathOptions={{
            color: '#1a73e8',
            weight: 2,
            dashArray: '4',
            fillColor: '#c2e5ff',
            fillOpacity: 0.2,
          }}
        />
        {buildings.map((b, i) => (
          <Marker key={i} position={b.position} icon={buildingIcon}>
            <Popup>
              <div style={{ width: '200px' }}>
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Property"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    marginBottom: '8px',
                  }}
                />
                <h3
                  style={{
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#333',
                  }}
                >
                  Dream House
                </h3>
                <p style={{ margin: '4px 0', fontSize: '14px', color: '#666' }}>
                  8 Properties in Surin, Thailand
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '4px',
                  }}
                >
                  <span style={{ fontWeight: '600', color: '#333' }}>$388.00/month</span>
                  <span
                    style={{
                      background: '#ffe066',
                      color: '#333',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '12px',
                    }}
                  >
                    Free
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '4px' }}>4.5</span>
                  <img
                    src="/images/dashboard/star.png"
                    alt="star"
                    style={{ width: '16px', height: '16px' }}
                  />
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ShowMap;
