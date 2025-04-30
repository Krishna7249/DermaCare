import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Key, 
  Bell, 
  Eye, 
  EyeOff, 
  Trash2, 
  Save, 
  Sun, 
  Moon, 
  Monitor, 
  Shield, 
  ChevronRight, 
  AlertTriangle,
  CheckCircle,
  X
} from "lucide-react";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);
  const [theme, setTheme] = useState("system");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeSection, setActiveSection] = useState("account");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch user data
  useEffect(() => {
    // Simulate fetching user data
    const storedName = localStorage.getItem("userName") || "User";
    const storedEmail = localStorage.getItem("userEmail") || "user@example.com";
    
    setUserName(storedName);
    setEmail(storedEmail);
  }, []);

  const handleUpdateProfile = () => {
    // Simulate API call to update user profile
    localStorage.setItem("userName", userName);
    if (email) localStorage.setItem("userEmail", email);
    
    showSuccess("Profile updated successfully");
  };

  const handleChangePassword = () => {
    // Validate passwords
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    
    if (!currentPassword || !newPassword) {
      alert("Please fill all password fields");
      return;
    }
    
    // Simulate API call to change password
    localStorage.setItem("passwordChanged", "true");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    
    showSuccess("Password changed successfully");
  };

  const handleDeleteAccount = () => {
    // Simulate account deletion
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    
    // Redirect to login
    navigate("/login");
  };

//   const handleSaveNotifications = () => {
//     // Simulate saving notification preferences
//     localStorage.setItem("notificationsEnabled", notificationsEnabled.toString());
//     localStorage.setItem("emailNotifications", emailNotifications.toString());
//     localStorage.setItem("appNotifications", appNotifications.toString());
    
//     showSuccess("Notification preferences saved");
//   };

  const handleSaveAppearance = () => {
    // Simulate saving appearance preferences
    localStorage.setItem("theme", theme);
    
    showSuccess("Appearance settings saved");
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessAlert(true);
    
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-6 right-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center z-50">
          <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
          <span>{successMessage}</span>
          <button 
            onClick={() => setShowSuccessAlert(false)}
            className="ml-4 text-green-500 hover:text-green-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Settings Navigation */}
          <div className="md:w-64 bg-gray-50 p-4">
            <nav className="space-y-1">
              <button 
                onClick={() => setActiveSection("account")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${activeSection === "account" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-3" />
                  <span>Account</span>
                </div>
                <ChevronRight className={`w-4 h-4 ${activeSection === "account" ? "text-blue-500" : "text-gray-400"}`} />
              </button>
              
              <button 
                onClick={() => setActiveSection("security")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${activeSection === "security" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-3" />
                  <span>Security</span>
                </div>
                <ChevronRight className={`w-4 h-4 ${activeSection === "security" ? "text-blue-500" : "text-gray-400"}`} />
              </button>
              
              {/* <button 
                onClick={() => setActiveSection("notifications")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${activeSection === "notifications" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <div className="flex items-center">
                  <Bell className="w-5 h-5 mr-3" />
                  <span>Notifications</span>
                </div>
                <ChevronRight className={`w-4 h-4 ${activeSection === "notifications" ? "text-blue-500" : "text-gray-400"}`} />
              </button> */}
              
              <button 
                onClick={() => setActiveSection("appearance")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${activeSection === "appearance" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <div className="flex items-center">
                  <Sun className="w-5 h-5 mr-3" />
                  <span>Appearance</span>
                </div>
                <ChevronRight className={`w-4 h-4 ${activeSection === "appearance" ? "text-blue-500" : "text-gray-400"}`} />
              </button>
              
              <button 
                onClick={() => setActiveSection("privacy")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${activeSection === "privacy" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <div className="flex items-center">
                  <Key className="w-5 h-5 mr-3" />
                  <span>Privacy</span>
                </div>
                <ChevronRight className={`w-4 h-4 ${activeSection === "privacy" ? "text-blue-500" : "text-gray-400"}`} />
              </button>
            </nav>
          </div>
          
          {/* Settings Content */}
          <div className="flex-1 p-6">
            {/* Account Settings */}
            {activeSection === "account" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input 
                      type="text" 
                      value={userName} 
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      onClick={handleUpdateProfile}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Security Settings */}
            {activeSection === "security" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Change Password</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <div className="relative">
                          <input 
                            type={showPassword ? "text" : "password"} 
                            value={currentPassword} 
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <div className="relative">
                          <input 
                            type={showNewPassword ? "text" : "password"} 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button 
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >
                            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <div className="relative">
                          <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button 
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <button 
                        onClick={handleChangePassword}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <Key className="w-4 h-4 mr-2" />
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Notifications Settings */}
            {/* {activeSection === "notifications" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Notification Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium text-gray-800">Notifications</h3>
                      <p className="text-gray-500 text-sm">Enable or disable all notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notificationsEnabled} 
                        onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className={`space-y-4 ${notificationsEnabled ? "" : "opacity-50 pointer-events-none"}`}>
                    <div className="flex items-center justify-between py-2 border-t border-gray-100">
                      <div>
                        <h3 className="font-medium text-gray-800">Email Notifications</h3>
                        <p className="text-gray-500 text-sm">Receive notifications via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={emailNotifications} 
                          onChange={() => setEmailNotifications(!emailNotifications)}
                          className="sr-only peer" 
                          disabled={!notificationsEnabled}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-t border-gray-100">
                      <div>
                        <h3 className="font-medium text-gray-800">App Notifications</h3>
                        <p className="text-gray-500 text-sm">Receive in-app notifications</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={appNotifications} 
                          onChange={() => setAppNotifications(!appNotifications)}
                          className="sr-only peer" 
                          disabled={!notificationsEnabled}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      onClick={handleSaveNotifications}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )} */}
            
            {/* Appearance Settings */}
            {activeSection === "appearance" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Appearance Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-4">Theme</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div 
                        className={`cursor-pointer border rounded-lg p-4 ${theme === "light" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                        onClick={() => setTheme("light")}
                      >
                        <div className="w-full h-24 bg-white border border-gray-200 rounded-lg mb-3 relative">
                          <div className="absolute inset-x-0 top-0 h-4 bg-gray-100"></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-700">Light</span>
                          {theme === "light" && <CheckCircle className="w-5 h-5 text-blue-500" />}
                        </div>
                      </div>
                      
                      <div 
                        className={`cursor-pointer border rounded-lg p-4 ${theme === "dark" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                        onClick={() => setTheme("dark")}
                      >
                        <div className="w-full h-24 bg-gray-800 border border-gray-700 rounded-lg mb-3 relative">
                          <div className="absolute inset-x-0 top-0 h-4 bg-gray-900"></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-700">Dark</span>
                          {theme === "dark" && <CheckCircle className="w-5 h-5 text-blue-500" />}
                        </div>
                      </div>
                      
                      {/* <div 
                        className={`cursor-pointer border rounded-lg p-4 ${theme === "system" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                        onClick={() => setTheme("system")}
                      >
                        <div className="w-full h-24 bg-gradient-to-r from-white to-gray-800 border border-gray-200 rounded-lg mb-3 relative">
                          <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-r from-gray-100 to-gray-800"></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-700">System</span>
                          {theme === "system" && <CheckCircle className="w-5 h-5 text-blue-500" />}
                        </div>
                      </div> */}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      onClick={handleSaveAppearance}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Privacy Settings */}
            {activeSection === "privacy" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Privacy Settings</h2>
                
                <div className="space-y-8">
                  <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                    <h3 className="text-lg font-medium text-red-800 mb-2">Delete Account</h3>
                    <p className="text-red-600 mb-4">
                      This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                    </p>
                    
                    {!showDeleteConfirm ? (
                      <button 
                        onClick={() => setShowDeleteConfirm(true)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </button>
                    ) : (
                      <div className="border border-red-200 rounded-lg p-4 bg-white">
                        <div className="flex items-center mb-4 text-red-800">
                          <AlertTriangle className="w-5 h-5 mr-2" />
                          <span className="font-medium">Are you absolutely sure?</span>
                        </div>
                        
                        <p className="text-gray-600 mb-4">
                          Please type <strong>DELETE</strong> to confirm.
                        </p>
                        
                        <input 
                          type="text" 
                          placeholder="Type DELETE to confirm"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 mb-4"
                        />
                        
                        <div className="flex space-x-3">
                          <button 
                            onClick={handleDeleteAccount}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Yes, Delete My Account
                          </button>
                          
                          <button 
                            onClick={() => setShowDeleteConfirm(false)}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Download Your Data</h3>
                    <p className="text-gray-600 mb-4">
                      Download a copy of all your data that we have stored. This includes your profile information, analysis history, and chat logs.
                    </p>
                    
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                      Request Data Download
                    </button>
                  </div> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;