import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { FaMapMarkerAlt } from 'react-icons/fa';

const iconMarkup = renderToStaticMarkup(<FaMapMarkerAlt style={{ color: 'red', fontSize: '2rem' }} />);
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

const cleanAddress = address => {
  // Remove extra spaces and normalize
  let cleaned = address.trim().replace(/\s+/g, ' ');

  // Remove common punctuation that might interfere
  cleaned = cleaned.replace(/[^\w\s,.-]/g, ' ');

  // Normalize commas and spaces
  cleaned = cleaned.replace(/\s*,\s*/g, ', ');

  return cleaned;
};

// Debug function for Thai addresses
const debugThaiAddress = address => {
  console.log('=== THAI ADDRESS DEBUG ===');
  console.log('Original:', address);

  // Remove floor and room
  let cleaned = address
    .replace(/\d+\s*Floor/gi, '')
    .replace(/Room\s*\d+/gi, '')
    .replace(/,\s*,/g, ',')
    .replace(/^\s*,\s*/, '')
    .replace(/,\s*$/, '')
    .trim();

  console.log('After removing floor/room:', cleaned);

  // Split by commas
  const parts = cleaned.split(',').map(p => p.trim());
  console.log('Parts:', parts);

  // Look for building number pattern
  const buildingMatch = cleaned.match(/(\d+\/\d+)/);
  console.log('Building number match:', buildingMatch);

  return cleaned;
};

const getCoordinates = async locationName => {
  try {
    console.log('Searching for location:', locationName);

    // Debug Thai address format
    if (locationName.includes('Thailand') || locationName.includes('Bangkok')) {
      debugThaiAddress(locationName);
    }

    // Clean and prepare the address
    const cleanedLocation = locationName.trim().replace(/\s+/g, ' ');

    // Strategy 1: Try with Nominatim with simplified parameters
    try {
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanedLocation)}&limit=5&addressdetails=1`;
      console.log('Trying Nominatim:', nominatimUrl);

      const response = await fetch(nominatimUrl, {
        headers: {
          'User-Agent': 'RentInFrontend/1.0',
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Nominatim response:', data);

        if (data.length > 0) {
          const result = data[0];
          const { lat, lon, display_name, address } = result;

          console.log('Found location via Nominatim:', {
            display_name,
            address: address || 'No detailed address',
            coordinates: [parseFloat(lat), parseFloat(lon)],
          });

          return {
            coordinates: [parseFloat(lat), parseFloat(lon)],
            addressDetails: address,
            displayName: display_name,
          };
        }
      }
    } catch (nominatimError) {
      console.log('Nominatim failed:', nominatimError);
    }

    // Strategy 2: Extract building address without floor/room details
    try {
      console.log('Trying to extract building address without floor/room details');

      // Remove floor and room information, keep building address
      let buildingAddress = cleanedLocation
        .replace(/\d+\s*Floor/gi, '') // Remove "3 Floor"
        .replace(/Room\s*\d+/gi, '') // Remove "Room 302"
        .replace(/,\s*,/g, ',') // Clean up double commas
        .replace(/^\s*,\s*/, '') // Remove leading comma
        .replace(/,\s*$/, '') // Remove trailing comma
        .trim();

      console.log('Extracted building address:', buildingAddress);

      if (buildingAddress && buildingAddress !== cleanedLocation) {
        const buildingUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(buildingAddress)}&limit=3&addressdetails=1`;

        const response = await fetch(buildingUrl, {
          headers: {
            'User-Agent': 'RentInFrontend/1.0',
            Accept: 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Building address search response:', data);

          if (data.length > 0) {
            const result = data[0];
            const { lat, lon, display_name, address } = result;

            console.log('Found location via building address:', {
              display_name,
              address: address || 'No detailed address',
              coordinates: [parseFloat(lat), parseFloat(lon)],
            });

            return {
              coordinates: [parseFloat(lat), parseFloat(lon)],
              addressDetails: address,
              displayName: display_name,
            };
          }
        }
      }
    } catch (buildingError) {
      console.log('Building address search failed:', buildingError);
    }

    // Strategy 3: Try with Thai address format (building number + street + district)
    try {
      console.log('Trying Thai address format');

      // For Thai addresses like "421/4 Yaowarat Rd, Samphanthawong, Bangkok"
      // Also handle "3 Floor, Room 302, 421/4 Yaowarat Rd, Samphanthawong, Bangkok"
      let thaiAddress = cleanedLocation;

      // Remove floor and room information first
      thaiAddress = thaiAddress
        .replace(/\d+\s*Floor/gi, '')
        .replace(/Room\s*\d+/gi, '')
        .replace(/,\s*,/g, ',')
        .replace(/^\s*,\s*/, '')
        .replace(/,\s*$/, '')
        .trim();

      console.log('Cleaned Thai address:', thaiAddress);

      // Try multiple patterns for Thai addresses
      const patterns = [
        /(\d+\/\d+)\s+([^,]+),\s*([^,]+),\s*([^,]+)/, // 421/4 Yaowarat Rd, Samphanthawong, Bangkok
        /(\d+\/\d+)\s+([^,]+),\s*([^,]+)/, // 421/4 Yaowarat Rd, Samphanthawong
        /([^,]+),\s*([^,]+),\s*([^,]+)/, // Any 3-part address
      ];

      for (const pattern of patterns) {
        const match = thaiAddress.match(pattern);
        if (match) {
          console.log('Pattern matched:', pattern.source);

          let searchAddress;
          if (match.length === 5) {
            // Full match: building number, street, district, city
            const [, buildingNumber, street, district, city] = match;
            searchAddress = `${buildingNumber} ${street}, ${district}, ${city}`;
          } else if (match.length === 4) {
            // Partial match: building number, street, district
            const [, buildingNumber, street, district] = match;
            searchAddress = `${buildingNumber} ${street}, ${district}`;
          } else if (match.length === 4) {
            // Generic 3-part match
            const [, part1, part2, part3] = match;
            searchAddress = `${part1}, ${part2}, ${part3}`;
          }

          if (searchAddress) {
            console.log('Searching with Thai address:', searchAddress);

            const thaiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}&limit=3&addressdetails=1`;

            const response = await fetch(thaiUrl, {
              headers: {
                'User-Agent': 'RentInFrontend/1.0',
                Accept: 'application/json',
              },
            });

            if (response.ok) {
              const data = await response.json();
              console.log('Thai address search response:', data);

              if (data.length > 0) {
                const result = data[0];
                const { lat, lon, display_name, address } = result;

                console.log('Found location via Thai address:', {
                  display_name,
                  address: address || 'No detailed address',
                  coordinates: [parseFloat(lat), parseFloat(lon)],
                });

                return {
                  coordinates: [parseFloat(lat), parseFloat(lon)],
                  addressDetails: address,
                  displayName: display_name,
                };
              }
            }
          }
        }
      }

      // If no pattern matched, try with the cleaned address directly
      console.log('No pattern matched, trying cleaned address directly:', thaiAddress);
      const directUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(thaiAddress)}&limit=3&addressdetails=1`;

      const directResponse = await fetch(directUrl, {
        headers: {
          'User-Agent': 'RentInFrontend/1.0',
          Accept: 'application/json',
        },
      });

      if (directResponse.ok) {
        const data = await directResponse.json();
        console.log('Direct Thai address search response:', data);

        if (data.length > 0) {
          const result = data[0];
          const { lat, lon, display_name, address } = result;

          console.log('Found location via direct Thai address:', {
            display_name,
            address: address || 'No detailed address',
            coordinates: [parseFloat(lat), parseFloat(lon)],
          });

          return {
            coordinates: [parseFloat(lat), parseFloat(lon)],
            addressDetails: address,
            displayName: display_name,
          };
        }
      }
    } catch (thaiError) {
      console.log('Thai address search failed:', thaiError);
    }

    // Strategy 3.5: Simple Thai address fallback
    try {
      console.log('Trying simple Thai address fallback');

      // For "421/4 Yaowarat Rd, Samphanthawong, Bangkok" - try "Yaowarat Rd, Samphanthawong, Bangkok"
      const thaiFallback = cleanedLocation
        .replace(/\d+\/\d+\s+/, '') // Remove building number like "421/4 "
        .replace(/\d+\s*Floor/gi, '')
        .replace(/Room\s*\d+/gi, '')
        .replace(/,\s*,/g, ',')
        .replace(/^\s*,\s*/, '')
        .replace(/,\s*$/, '')
        .trim();

      console.log('Thai fallback address:', thaiFallback);

      const fallbackUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(thaiFallback)}&limit=3&addressdetails=1`;

      const response = await fetch(fallbackUrl, {
        headers: {
          'User-Agent': 'RentInFrontend/1.0',
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Thai fallback search response:', data);

        if (data.length > 0) {
          const result = data[0];
          const { lat, lon, display_name, address } = result;

          console.log('Found location via Thai fallback:', {
            display_name,
            address: address || 'No detailed address',
            coordinates: [parseFloat(lat), parseFloat(lon)],
          });

          return {
            coordinates: [parseFloat(lat), parseFloat(lon)],
            addressDetails: address,
            displayName: display_name,
          };
        }
      }
    } catch (thaiFallbackError) {
      console.log('Thai fallback search failed:', thaiFallbackError);
    }

    // Strategy 4: Try with a more flexible search (remove some parts of the address)
    try {
      // Split address and try with fewer components
      const addressParts = cleanedLocation.split(',').map(part => part.trim());

      // Try with just the first 3 parts (usually street, city, country)
      if (addressParts.length > 3) {
        const simplifiedAddress = addressParts.slice(0, 3).join(', ');
        console.log('Trying simplified address:', simplifiedAddress);

        const simplifiedUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(simplifiedAddress)}&limit=3&addressdetails=1`;

        const response = await fetch(simplifiedUrl, {
          headers: {
            'User-Agent': 'RentInFrontend/1.0',
            Accept: 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Simplified search response:', data);

          if (data.length > 0) {
            const result = data[0];
            const { lat, lon, display_name, address } = result;

            console.log('Found location via simplified search:', {
              display_name,
              address: address || 'No detailed address',
              coordinates: [parseFloat(lat), parseFloat(lon)],
            });

            return {
              coordinates: [parseFloat(lat), parseFloat(lon)],
              addressDetails: address,
              displayName: display_name,
            };
          }
        }
      }
    } catch (simplifiedError) {
      console.log('Simplified search failed:', simplifiedError);
    }

    // Strategy 5: Try with just the street and district
    try {
      const addressParts = cleanedLocation.split(',').map(part => part.trim());

      // Look for street address and district
      let streetPart = '';
      let districtPart = '';

      for (const part of addressParts) {
        if (part.includes('Rd') || part.includes('Street') || part.includes('Avenue') || part.includes('Road')) {
          streetPart = part;
        }
        if (part.includes('District') || part.includes('Subdistrict') || part.includes('Area')) {
          districtPart = part;
        }
      }

      if (streetPart && districtPart) {
        const streetDistrictAddress = `${streetPart}, ${districtPart}`;
        console.log('Trying street and district:', streetDistrictAddress);

        const streetDistrictUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(streetDistrictAddress)}&limit=3&addressdetails=1`;

        const response = await fetch(streetDistrictUrl, {
          headers: {
            'User-Agent': 'RentInFrontend/1.0',
            Accept: 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Street and district search response:', data);

          if (data.length > 0) {
            const result = data[0];
            const { lat, lon, display_name, address } = result;

            console.log('Found location via street and district:', {
              display_name,
              address: address || 'No detailed address',
              coordinates: [parseFloat(lat), parseFloat(lon)],
            });

            return {
              coordinates: [parseFloat(lat), parseFloat(lon)],
              addressDetails: address,
              displayName: display_name,
            };
          }
        }
      }
    } catch (streetDistrictError) {
      console.log('Street and district search failed:', streetDistrictError);
    }

    // Strategy 6: Try with just the city/area part
    try {
      const addressParts = cleanedLocation.split(',').map(part => part.trim());

      // Find the city/area part (usually the second or third part)
      let cityPart = '';
      if (addressParts.length >= 2) {
        // Try to find a part that looks like a city (not a number, not too short)
        for (let i = 1; i < Math.min(4, addressParts.length); i++) {
          const part = addressParts[i];
          if (part.length > 2 && !/^\d+$/.test(part) && !part.includes('Street') && !part.includes('Road')) {
            cityPart = part;
            break;
          }
        }
      }

      if (cityPart) {
        console.log('Trying city search:', cityPart);

        const cityUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityPart)}&limit=3&addressdetails=1`;

        const response = await fetch(cityUrl, {
          headers: {
            'User-Agent': 'RentInFrontend/1.0',
            Accept: 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('City search response:', data);

          if (data.length > 0) {
            const result = data[0];
            const { lat, lon, display_name, address } = result;

            console.log('Found location via city search:', {
              display_name,
              address: address || 'No detailed address',
              coordinates: [parseFloat(lat), parseFloat(lon)],
            });

            return {
              coordinates: [parseFloat(lat), parseFloat(lon)],
              addressDetails: address,
              displayName: display_name,
            };
          }
        }
      }
    } catch (cityError) {
      console.log('City search failed:', cityError);
    }

    // Strategy 7: Try with a different geocoding service (Photon API - based on OpenStreetMap)
    try {
      console.log('Trying Photon API as fallback');

      const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(cleanedLocation)}&limit=3`;

      const response = await fetch(photonUrl);

      if (response.ok) {
        const data = await response.json();
        console.log('Photon API response:', data);

        if (data.features && data.features.length > 0) {
          const feature = data.features[0];
          const [lon, lat] = feature.geometry.coordinates;
          const properties = feature.properties;

          console.log('Found location via Photon API:', {
            display_name: properties.name || properties.street || properties.city,
            coordinates: [lat, lon],
          });

          return {
            coordinates: [lat, lon],
            addressDetails: {
              house_number: properties.housenumber,
              road: properties.street,
              city: properties.city,
              postcode: properties.postcode,
              country: properties.country,
            },
            displayName: properties.name || properties.street || properties.city,
          };
        }
      }
    } catch (photonError) {
      console.log('Photon API failed:', photonError);
    }

    console.log('All geocoding strategies failed for:', locationName);
    return null;
  } catch (error) {
    console.error('Error in geocoding:', error);
    return null;
  }
};

const MapWithLocation = ({ location }) => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState('');
  const [addressDetails, setAddressDetails] = useState(null);
  const defaultCenter = [51.505, -0.09];
  console.log('position', position);

  useEffect(() => {
    if (location) {
      getCoordinates(location).then(result => {
        if (result && result.coordinates) {
          setPosition(result.coordinates);
          setError('');
          // Store address details for display
          setAddressDetails(result.addressDetails);
        } else {
          setError('Location not found. Please try a more specific address.');
          setPosition(null);
          setAddressDetails(null);
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
        zoom={position ? 16 : 13} // Zoom in more for specific addresses
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', zIndex: 1 }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a> contributors'
        />
        {position && <RecenterAutomatically latlng={position} />}
        {position && (
          <Marker position={position} icon={customDivIcon}>
            <Popup>
              <div className="text-sm">
                <strong>Location:</strong> {location}
                {addressDetails && (
                  <div className="mt-2 text-xs text-gray-600">
                    <div>House: {addressDetails.house_number || 'N/A'}</div>
                    <div>Street: {addressDetails.road || 'N/A'}</div>
                    <div>District: {addressDetails.suburb || addressDetails.district || 'N/A'}</div>
                    <div>City: {addressDetails.city || addressDetails.town || 'N/A'}</div>
                    <div>Postal Code: {addressDetails.postcode || 'N/A'}</div>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default MapWithLocation;
