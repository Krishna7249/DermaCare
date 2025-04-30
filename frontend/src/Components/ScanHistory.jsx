import React, { useState, useEffect } from 'react';
import { FileText, Calendar, ArrowLeft, Trash2, RefreshCw } from 'lucide-react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config'; 

const ScanHistory = () => {
  const [scanHistory, setScanHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScan, setSelectedScan] = useState(null);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserIdAndLoadHistory();
  }, []);

  const getUserIdAndLoadHistory = () => {
    setError(null); // Reset any previous errors
    
    try {
      // First try to get from user object in localStorage
      const userString = localStorage.getItem('user');
      console.log("User string from localStorage:", userString);
      
      let uid = null;
      
      // Try to parse user object if it exists
      if (userString && userString !== "undefined" && userString !== "null") {
        try {
          const currentUser = JSON.parse(userString);
          if (currentUser && currentUser.uid) {
            uid = currentUser.uid;
            console.log("Using user ID from user object:", uid);
          }
        } catch (parseError) {
          console.error("Error parsing user JSON:", parseError);
        }
      }
      
      // If no user object or parsing failed, try the authToken
      if (!uid) {
        const authToken = localStorage.getItem('authToken');
        if (authToken && authToken !== "undefined" && authToken !== "null") {
          uid = authToken;
          console.log("Using auth token as user ID:", uid);
        }
      }
      
      // As a last resort, check if we have an email we can use as ID
      if (!uid) {
        const email = localStorage.getItem('userEmail');
        if (email && email !== "undefined" && email !== "null") {
          uid = email;
          console.log("Using email as user ID:", uid);
        }
      }
      
      if (uid) {
        setUserId(uid);
        fetchScanHistory(uid);
      } else {
        console.error("No user ID found in localStorage");
        // Print all localStorage keys to debug
        console.log("LocalStorage contents:", Object.fromEntries(
          Object.keys(localStorage).map(key => [key, localStorage.getItem(key)])
        ));
        
        setError("Unable to find user information. Please log in again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error getting user ID:", error);
      setError("Error retrieving user information. Please try refreshing the page.");
      setLoading(false);
    }
  };

  const fetchScanHistory = async (uid) => {
    try {
      setLoading(true);
      console.log("Fetching scan history for user ID:", uid);
      
      const q = query(collection(db, "scanHistory"), where("userId", "==", uid));
      console.log("Query created, fetching documents...");
      
      const querySnapshot = await getDocs(q);
      console.log(`Query complete, found ${querySnapshot.size} documents`);
      
      const history = [];
      querySnapshot.forEach((doc) => {
        console.log("Document data:", doc.id, doc.data());
        
        // Handle both server timestamp and client timestamp
        let timestamp;
        if (doc.data().timestamp?.toDate) {
          timestamp = doc.data().timestamp.toDate();
        } else if (doc.data().timestamp instanceof Date) {
          timestamp = doc.data().timestamp;
        } else if (doc.data().timestamp) {
          // If it's a number or string timestamp
          timestamp = new Date(doc.data().timestamp);
        } else {
          timestamp = new Date();
        }
                         
        history.push({
          id: doc.id,
          ...doc.data(),
          timestamp: timestamp
        });
      });
      
      console.log(`Processed ${history.length} scan history items`);
      
      // Sort by timestamp (newest first)
      history.sort((a, b) => b.timestamp - a.timestamp);
      setScanHistory(history);
    } catch (error) {
      console.error("Error fetching scan history:", error);
      setError("Failed to load scan history. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteScan = async (scanId) => {
    try {
      if (window.confirm("Are you sure you want to delete this scan?")) {
        console.log("Deleting scan with ID:", scanId);
        await deleteDoc(doc(db, "scanHistory", scanId));
        console.log("Scan deleted successfully");
        setScanHistory(scanHistory.filter(scan => scan.id !== scanId));
        if (selectedScan && selectedScan.id === scanId) {
          setSelectedScan(null);
        }
      }
    } catch (error) {
      console.error("Error deleting scan:", error);
      setError("Failed to delete scan. Please try again.");
    }
  };

  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error("Error formatting date:", error, date);
      return "Invalid date";
    }
  };

  const handleRefresh = () => {
    console.log("Refreshing scan history");
    if (userId) {
      fetchScanHistory(userId);
    } else {
      getUserIdAndLoadHistory();
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-blue-200 mb-3"></div>
          <div className="h-4 w-24 bg-blue-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (selectedScan) {
    return (
      <div className="p-6 h-full overflow-y-auto">
        <button 
          onClick={() => setSelectedScan(null)}
          className="flex items-center text-blue-600 mb-6 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to history
        </button>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Scan Details
            </h2>
            <span className="text-sm text-gray-500">
              {formatDate(selectedScan.timestamp)}
            </span>
          </div>
          
          <div className="mb-6">
            <img 
              src={selectedScan.imageUrl} 
              alt="Scan" 
              className="w-full h-64 object-cover rounded-lg"
              onError={(e) => {
                console.error("Image failed to load");
                e.target.src = "/placeholder-image.jpg"; // Fallback image
                e.target.alt = "Image not available";
              }}
            />
          </div>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800">Detected Condition:</h3>
              <p className="text-lg text-blue-700 font-medium mt-1">
                {(selectedScan.detectedDisease || "Unknown")
                  .replace(/_/g, " ")
                  .split(" ")
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </p>
            </div>
            
            {selectedScan.recommendation && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800">Recommendation:</h3>
                <p className="text-gray-700 mt-1">{selectedScan.recommendation}</p>
              </div>
            )}
            
            <button
              onClick={() => handleDeleteScan(selectedScan.id)}
              className="flex items-center justify-center w-full py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete this scan
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Scan History</h1>
        <button 
          onClick={handleRefresh} 
          className="flex items-center text-blue-600 hover:underline"
          title="Refresh scan history"
        >
          <RefreshCw className="w-4 h-4 mr-1" />
          Refresh
        </button>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          <p>{error}</p>
          <button 
            onClick={handleRefresh}
            className="text-red-700 underline mt-2 text-sm"
          >
            Try again
          </button>
        </div>
      )}
      
      {scanHistory.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No scan history yet</h2>
          <p className="text-gray-600">
            Your previous skin scans will appear here after you analyze your first image.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scanHistory.map((scan) => (
            <div 
              key={scan.id} 
              className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedScan(scan)}
            >
              <div className="relative h-40">
                <img 
                  src={scan.imageUrl} 
                  alt={scan.detectedDisease || "Skin scan"} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg"; // Fallback image
                    e.target.alt = "Image not available";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                  <div className="text-white font-medium">
                    {(scan.detectedDisease || "Unknown condition")
                      .replace(/_/g, " ")
                      .split(" ")
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </div>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between text-gray-500 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(scan.timestamp)}
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteScan(scan.id);
                  }}
                  className="p-1 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScanHistory;