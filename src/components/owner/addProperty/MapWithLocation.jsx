import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { FaMapMarkerAlt } from 'react-icons/fa';

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

const RecenterAutomatically = ({ latlng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(latlng);
  }, [latlng, map]);

  return null;
};

const getCoordinates = async locationName => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    locationName
  )}&limit=1`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.length > 0) {
    const { lat, lon } = data[0];
    return [parseFloat(lat), parseFloat(lon)];
  }
  return null;
};

const MapWithLocation = ({ location }) => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState('');
  const defaultCenter = [51.505, -0.09];

  useEffect(() => {
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
  }, [location]);

  // If window is not defined (SSR), do not render the map
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
          <Marker position={position} icon={customDivIcon}>
            <Popup>Location: {location}</Popup>
          </Marker>
        )}
      </MapContainer>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default MapWithLocation;
