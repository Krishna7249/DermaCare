import React, { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Star,
  Search,
  Loader,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const NearbyClinics = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedClinic, setExpandedClinic] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    openNow: false,
    minRating: 0,
  });

  useEffect(() => {
    // Apply sorting whenever clinics or sortBy changes
    if (clinics.length > 0) {
      sortClinics();
    }
  }, [sortBy]);

  const sortClinics = () => {
    const sortedClinics = [...clinics];

    switch (sortBy) {
      case "rating":
        sortedClinics.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "name":
        sortedClinics.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setClinics(sortedClinics);
  };

  const fetchClinics = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError("");
    setClinics([]);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `http://localhost:5000/api/clinics?lat=${latitude}&lng=${longitude}&radius=10000`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch clinics.");
          }

          const data = await response.json();
          setClinics(data.results || []);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(
          "Failed to get your location. Please enable location services."
        );
        setLoading(false);
      }
    );
  };

  const filteredClinics = clinics.filter((clinic) => {
    // Filter by search term
    const matchesSearch =
      clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (clinic.vicinity &&
        clinic.vicinity.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filter by open now if selected
    const matchesOpenNow = filterOptions.openNow
      ? clinic.opening_hours?.open_now === true
      : true;

    // Filter by minimum rating
    const matchesRating = (clinic.rating || 0) >= filterOptions.minRating;

    return matchesSearch && matchesOpenNow && matchesRating;
  });

  const toggleExpandClinic = (index) => {
    setExpandedClinic(expandedClinic === index ? null : index);
  };

  const renderRatingStars = (rating) => {
    if (!rating) return null;

    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        // This is simplified - in a real component you'd want a proper half-star
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }

    return (
      <div className="flex items-center">
        <span className="mr-1">{rating}</span>
        <div className="flex">{stars}</div>
      </div>
    );
  };

  const addMockDataToClinic = (clinic) => {
    return {
      ...clinic,
      opening_hours: clinic.opening_hours || {
        open_now: true,
        weekday_text: [
          "Monday: 9:00 AM – 6:00 PM",
          "Tuesday: 9:00 AM – 6:00 PM",
          "Wednesday: 9:00 AM – 6:00 PM",
          "Thursday: 9:00 AM – 6:00 PM",
          "Friday: 9:00 AM – 6:00 PM",
          "Saturday: 10:00 AM – 4:00 PM",
          "Sunday: Closed"
        ]
      }
    };
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">
          Find Nearby Clinics
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left sidebar for filters on larger screens */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">
                Filters
              </h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="openNow"
                    checked={filterOptions.openNow}
                    onChange={() =>
                      setFilterOptions({
                        ...filterOptions,
                        openNow: !filterOptions.openNow,
                      })
                    }
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="openNow" className="ml-2 text-gray-700">
                    Open now
                  </label>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Minimum rating
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={filterOptions.minRating}
                    onChange={(e) =>
                      setFilterOptions({
                        ...filterOptions,
                        minRating: parseFloat(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Sort by</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="rating">Rating</option>
                    <option value="name">Name</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={fetchClinics}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-md flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <Loader className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <MapPin className="w-5 h-5 mr-2" />
              )}
              {loading ? "Searching..." : "Find Nearby Clinics"}
            </button>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-9">
            {/* Search bar */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search clinics by name or address..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start">
                <X className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Mobile filters (visible on small screens) */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center text-indigo-600 font-medium py-2 px-4 bg-white rounded-lg shadow-sm border border-gray-200 w-full"
              >
                {filterOpen ? (
                  <ChevronUp className="w-4 h-4 mr-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 mr-1" />
                )}
                Show Filters and Sorting
              </button>

              {filterOpen && (
                <div className="bg-white p-4 rounded-lg border border-gray-200 mt-2 shadow-sm space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="mobileOpenNow"
                      checked={filterOptions.openNow}
                      onChange={() =>
                        setFilterOptions({
                          ...filterOptions,
                          openNow: !filterOptions.openNow,
                        })
                      }
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="mobileOpenNow"
                      className="ml-2 text-gray-700"
                    >
                      Open now
                    </label>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">
                      Minimum rating
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.5"
                      value={filterOptions.minRating}
                      onChange={(e) =>
                        setFilterOptions({
                          ...filterOptions,
                          minRating: parseFloat(e.target.value),
                        })
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0</span>
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                      <span>4</span>
                      <span>5</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Sort by</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full border border-gray-300 rounded-md py-1 px-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="rating">Rating</option>
                      <option value="name">Name</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Results count */}
            {clinics.length > 0 && (
              <div className="text-sm text-gray-500 mb-4 flex justify-between items-center">
                <p>
                  Found {filteredClinics.length} clinics{" "}
                  {clinics.length !== filteredClinics.length &&
                    `(filtered from ${clinics.length})`}
                </p>

                {/* Sort dropdown for larger screens */}
                <div className="hidden lg:flex items-center">
                  <label className="text-sm text-gray-700 mr-2">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-md text-sm py-1 px-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="rating">Rating</option>
                    <option value="name">Name</option>
                  </select>
                </div>
              </div>
            )}

            {/* Results */}
            {filteredClinics.length > 0 ? (
              <div className="space-y-6">
                {filteredClinics.map((clinic, index) => {
                  const clinicWithData = addMockDataToClinic(clinic);
                  
                  return (
                    <div
                      key={index}
                      className={`bg-white border border-gray-200 rounded-xl shadow-sm transition-all duration-300
                                ${
                                  expandedClinic === index
                                    ? "ring-2 ring-indigo-500"
                                    : "hover:shadow-md"
                                }`}
                    >
                      <div
                        className="p-4 cursor-pointer flex justify-between items-start"
                        onClick={() => toggleExpandClinic(index)}
                      >
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {clinicWithData.name}
                          </h3>
                          <p className="text-gray-600 text-sm flex items-center mt-1">
                            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                            {clinicWithData.vicinity}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-2">
                            {clinicWithData.rating && (
                              <div className="flex items-center text-sm">
                                {renderRatingStars(clinicWithData.rating)}
                              </div>
                            )}

                            {clinicWithData.opening_hours?.open_now !== undefined && (
                              <span
                                className={`inline-flex items-center text-sm font-medium px-2 py-0.5 rounded-full
                                            ${
                                              clinicWithData.opening_hours.open_now
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                            }`}
                              >
                                <Clock className="w-3 h-3 mr-1" />
                                {clinicWithData.opening_hours.open_now
                                  ? "Open Now"
                                  : "Closed"}
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            expandedClinic === index ? "rotate-180" : ""
                          }`}
                        />
                      </div>

                      {/* Expanded content - fully visible with z-index */}
                      {expandedClinic === index && (
                        <div className="px-4 pb-4 border-t border-gray-100 pt-3 bg-gray-50 relative z-10">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="flex flex-col gap-3">
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinicWithData.name + " " + (clinicWithData.vicinity || ""))}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium py-2 px-4 rounded-lg transition-colors border border-indigo-200 flex items-center justify-center"
                              >
                                <MapPin className="w-4 h-4 mr-2" />
                                Get Directions
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : clinics.length === 0 && !loading && !error ? (
              <div className="text-center bg-white rounded-lg shadow-md p-10">
                <MapPin className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-xl font-medium text-gray-700">
                  No clinics found nearby
                </p>
                <p className="text-gray-500 mt-2">
                  Click the "Find Nearby Clinics" button to search for clinics
                  in your area.
                </p>
              </div>
            ) : !loading && !error ? (
              <div className="text-center bg-white rounded-lg shadow-md p-10">
                <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-xl font-medium text-gray-700">
                  No results match your filters
                </p>
                <p className="text-gray-500 mt-2">
                  Try adjusting your search criteria or filters.
                </p>
              </div>
            ) : null}

            {/* Loading state */}
            {loading && (
              <div className="text-center bg-white rounded-lg shadow-md p-10">
                <Loader className="w-16 h-16 mx-auto text-indigo-500 mb-4 animate-spin" />
                <p className="text-xl font-medium text-gray-700">
                  Searching for clinics...
                </p>
                <p className="text-gray-500 mt-2">
                  Please wait while we find clinics near your location.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearbyClinics;