import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, Eye, EyeOff, Shield, ArrowRight } from "lucide-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", { 
        email: formData.email, 
        password: formData.password 
      });
      
      setMessage(response.data.message || "Login successful!");
      
      // Redirect after successful login
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
      
    } catch (error) {
      console.error("Login error:", error);
      
      let errorMessage = "Login failed. Please check your credentials.";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
      
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate random positions for particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 6) + 2,
    opacity: Math.random() * 0.3 + 0.1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    animationDuration: Math.floor(Math.random() * 20) + 10,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Subtle animated background particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-blue-400"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            animation: `pulse ${particle.animationDuration}s infinite ease-in-out`,
          }}
        />
      ))}

      {/* Back to home link */}
      <div className="absolute top-8 left-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </button>
      </div>

      {/* Logo and branding */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-600">DermaScan AI</h1>
        <p className="text-gray-600">Advanced skin health monitoring</p>
      </div>

      {/* Login card */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 bg-blue-600 text-white">
            <h2 className="text-xl font-semibold">Welcome Back</h2>
            <p className="text-blue-100 text-sm mt-1">
              Sign in to continue your skin health journey
            </p>
          </div>

          <form className="p-8" onSubmit={handleLogin}>
            {/* Email field */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-10 w-full py-3 px-4 bg-gray-50 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            
            {/* Password field */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`pl-10 w-full py-3 px-4 bg-gray-50 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-center mb-6">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            {/* Login button */}
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>

            {/* Error/success message */}
            {message && (
              <div className={`mt-4 p-3 rounded-lg ${message.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {message}
              </div>
            )}

            {/* Sign up link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                  Create account
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex items-center justify-center gap-6 text-gray-500 text-sm">
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-1 text-blue-500" />
            <span>Secure login</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Privacy protected</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.1;
          }
          50% { 
            transform: scale(2);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;