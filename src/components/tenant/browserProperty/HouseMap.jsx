'use client';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from 'react-leaflet';
import MapHover from './MapHover';

// Create a custom icon using an icon from react-icons.
const iconMarkup = renderToStaticMarkup(<FaMapMarkerAlt style={{ color: 'red', fontSize: '2rem' }} />);
const customDivIcon = L.divIcon({
  html: iconMarkup,
  className: '',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// Optional: A helper component to recenter the map automatically.
const RecenterAutomatically = ({ latlng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(latlng);
  }, [latlng, map]);
  return null;
};

const getCoordinates = async locationName => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}&limit=1`;
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

const HouseMap = ({ location, image, name, status, latitude, longitude, rent }) => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState('');
  const defaultCenter = [51.505, -0.09];
  useEffect(() => {
    // First try to use provided lat/lng coordinates
    if (latitude && longitude) {
      const coords = [parseFloat(latitude), parseFloat(longitude)];
      setPosition(coords);
      setError('');
      return;
    }
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
  }, [location, latitude, longitude]);

  // Prevent rendering on server-side if window is not defined.
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div className="h-[300px] w-full md:h-[400px]">
      <MapContainer
        center={position || defaultCenter}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a> contributors'
        />
        {position && <RecenterAutomatically latlng={position} />}
        {position && (
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
              <MapHover image={image} name={name} status={status} location={location} rent={rent} />
            </Tooltip>
          </Marker>
        )}
      </MapContainer>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default HouseMap;
