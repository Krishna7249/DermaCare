import React, { useState, useEffect } from "react";
import { ArrowRight, Check, Shield, User, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Function to handle input changes
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

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email address is invalid";
      }

      if (!formData.name) {
        newErrors.name = "Name is required";
      }
    } else if (step === 2) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setStep(2);
    }
  };

  // Handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password,
          name: formData.name
        }),
      });
  
      let data;
      try {
        data = await response.json();
      } catch (err) {
        setMessage("Invalid response from the server.");
        setIsLoading(false);
        return;
      }
  
      if (response.ok) {
        setMessage(data.message || "Account created successfully!");
        localStorage.setItem('userName', formData.name);
        // Redirect to login after successful signup
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(data.error || "Sign-up failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server Error: Unable to connect. Please try again later.");
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

      {/* Sign-up card */}
      <div className="w-full max-w-md relative">
        {/* Progress indicator */}
        <div className="mb-6 flex justify-between items-center relative max-w-xs mx-auto">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10"></div>
          <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              <User className="w-4 h-4" />
            </div>
            <span className="text-xs mt-1">Account</span>
          </div>
          <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              <Shield className="w-4 h-4" />
            </div>
            <span className="text-xs mt-1">Security</span>
          </div>
          <div className={`flex flex-col items-center ${message && message.includes("success") ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message && message.includes("success") ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              <Check className="w-4 h-4" />
            </div>
            <span className="text-xs mt-1">Complete</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500">
          <div className="px-8 py-6 bg-blue-600 text-white">
            <h2 className="text-xl font-semibold">
              {step === 1 ? 'Create Your Account' : 'Secure Your Account'}
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              {step === 1 
                ? 'Join thousands of users monitoring their skin health' 
                : 'Choose a strong password to protect your data'}
            </p>
          </div>

          <form className="p-8" onSubmit={step === 1 ? handleNextStep : handleSignUp}>
            {step === 1 ? (
              // Step 1: Account Information
              <>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`pl-10 w-full py-3 px-4 bg-gray-50 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
                
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

                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </>
            ) : (
              // Step 2: Password Creation
              <>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
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
                  
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          formData.password.length === 0 ? 'w-0 bg-gray-200' :
                          formData.password.length < 8 ? 'w-1/4 bg-red-400' :
                          formData.password.length < 10 ? 'w-2/4 bg-yellow-400' : 
                          'w-full bg-green-500'
                        }`}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Password should be at least 8 characters</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`pl-10 w-full py-3 px-4 bg-gray-50 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>

                <div className="flex items-start mb-6">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                      required
                    />
                  </div>
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                  </label>
                </div>

                <div className="flex items-center gap-4">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}

            {message && (
              <div className={`mt-4 p-3 rounded-lg ${message.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {message}
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex items-center justify-center gap-6 text-gray-500 text-sm">
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-1 text-blue-500" />
            <span>Secure encryption</span>
          </div>
          <div className="flex items-center">
            <Check className="w-4 h-4 mr-1 text-blue-500" />
            <span>HIPAA Compliant</span>
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

export default SignUpPage;