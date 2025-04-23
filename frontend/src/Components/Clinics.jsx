import React, { useState, useEffect } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Loader } from 'lucide-react';

const render = (status) => {
  if (status === Status.LOADING) return <div className="flex items-center justify-center h-64"><Loader className="animate-spin" /></div>;
  if (status === Status.FAILURE) return <div>Error loading maps</div>;
  return null;
};

const MapComponent = ({ center, clinics, onSelectClinic }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const ref = React.useRef(null);

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom: 13,
      });
      setMap(newMap);
    }
  }, [ref, map]);

  useEffect(() => {
    if (map && clinics.length > 0) {
      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));
      
      // Add new markers
      const newMarkers = clinics.map(clinic => {
        const marker = new window.google.maps.Marker({
          position: { lat: clinic.geometry.location.lat, lng: clinic.geometry.location.lng },
          map,
          title: clinic.name,
        });
        
        marker.addListener('click', () => {
          onSelectClinic(clinic);
        });
        
        return marker;
      });
      
      setMarkers(newMarkers);
    }
  }, [map, clinics]);

  return <div ref={ref} className="w-full h-96 rounded-xl" />;
};

const ClinicCard = ({ clinic }) => {
  const openInMaps = () => {
    if (clinic.geometry?.location) {
      const { lat, lng } = clinic.geometry.location;
      window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${clinic.place_id}`, '_blank');
    }
  };

  return (
    <div 
      className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
      onClick={openInMaps}
    >
      <h3 className="text-xl font-semibold text-white">{clinic.name}</h3>
      <p className="text-white/80 mt-2">{clinic.vicinity}</p>
      {clinic.rating && (
        <div className="flex items-center mt-2">
          <span className="text-yellow-400">{'★'.repeat(Math.round(clinic.rating))}</span>
          <span className="text-white/60 ml-2">({clinic.user_ratings_total || 0} reviews)</span>
        </div>
      )}
      {clinic.opening_hours && (
        <p className="text-white/80 mt-2">
          {clinic.opening_hours.open_now ? 'Open now' : 'Closed'}
        </p>
      )}
      <p className="text-teal-300 mt-2 text-sm">Click to open in Google Maps</p>
    </div>
  );
};

const Clinics = () => {
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  const findClinics = async (lat, lng) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/clinics?lat=${lat}&lng=${lng}`);
      const data = await response.json();
      if (response.ok) {
        setClinics(data.results);
      } else {
        throw new Error(data.error || 'Failed to fetch clinics');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          findClinics(latitude, longitude);
        },
        (err) => {
          setError('Please enable location access to find nearby clinics');
          // Default to a central location if geolocation fails
          setLocation({ lat: 28.6139, lng: 77.2090 }); // Default to Delhi coordinates
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-300 via-teal-400 to-teal-500 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Nearby Skin Clinics</h1>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
              <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render}>
                {location && (
                  <MapComponent 
                    center={location} 
                    clinics={clinics}
                    onSelectClinic={setSelectedClinic}
                  />
                )}
              </Wrapper>
            </div>

            <button 
              onClick={getLocation}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-700 rounded-xl font-semibold text-white shadow-lg hover:from-teal-600 hover:to-teal-800 transition-colors"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Refresh Clinics'}
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Clinics Nearby</h2>
            
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader className="animate-spin" />
              </div>
            ) : clinics.length > 0 ? (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {clinics.map((clinic) => (
                  <div 
                    key={clinic.place_id}
                    onClick={() => setSelectedClinic(clinic)}
                    className={`cursor-pointer transition-all ${selectedClinic?.place_id === clinic.place_id ? 'ring-2 ring-teal-400' : ''}`}
                  >
                    <ClinicCard clinic={clinic} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/80">No clinics found in your area</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clinics;
