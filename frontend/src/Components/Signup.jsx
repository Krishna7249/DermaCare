import React, { useState, useEffect } from "react";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || "Sign-up failed.");
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage("Server Error: Unable to connect.");
    }
  };  

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-teal-400 to-teal-600 overflow-hidden flex items-center justify-center">
      {/* Floating Animated Circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200 rounded-full opacity-30 animate-bounce z-10"></div>
      <div className="absolute bottom-40 right-10 w-48 h-48 bg-teal-300 rounded-full opacity-20 animate-pulse z-10"></div>
      <div className="absolute top-60 left-60 w-24 h-24 bg-teal-100 rounded-full opacity-40 animate-pulse z-10"></div>

      {/* Wavy Background */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-r from-teal-400 to-teal-600 rounded-b-[100%] z-0"></div>

      {/* Sign-Up Form Section */}
      <form
        className={`relative w-full max-w-sm p-6 bg-white rounded-3xl shadow-2xl border border-gray-200 z-10 transform transition-all ${
          isScrolled ? "translate-y-8 opacity-100" : "opacity-100"
        } flex flex-col justify-between`}
        style={{ height: '70vh' }}
        onSubmit={handleSignUp}
      >
        <h2 className="text-3xl font-extrabold text-center text-teal-600 mb-6 animate__animated animate__fadeIn">
          Create Your Account
        </h2>
        <p className="text-lg text-center text-gray-600 mb-8 animate__animated animate__fadeIn animate__delay-1s">
          Join us to start your healthy journey
        </p>

        {/* Form Fields */}
        <div className="space-y-6 mb-8">
          {/* Email Address */}
          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <label
                className="block text-gray-700 font-medium md:text-right mb-1 md:mb-0 pr-4 animate__animated animate__fadeIn"
                htmlFor="inline-email"
              >
                Email Address
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-100 appearance-none border-2 border-gray-300 rounded-2xl w-full py-4 px-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                id="inline-email"
                type="email"
                placeholder="youremail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <label
                className="block text-gray-700 font-medium md:text-right mb-1 md:mb-0 pr-4 animate__animated animate__fadeIn"
                htmlFor="inline-password"
              >
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-100 appearance-none border-2 border-gray-300 rounded-2xl w-full py-4 px-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                id="inline-password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Button Section */}
        <div className="flex flex-col items-center gap-4">
          <button className="shadow-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 focus:outline-none text-white font-bold py-3 px-6 rounded-full w-2/3 transition-transform transform hover:scale-110">
            Sign Up
          </button>
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-teal-600 hover:text-teal-500 font-medium">
              Login
            </a>
          </p>
        </div>
        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </form>

      {/* Wavy Bottom Shape */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-r from-teal-400 to-teal-600 rounded-t-[100%] z-0"></div>

      {/* Animated Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-teal-400 to-teal-500 animate-gradient-x z-0"></div>
    </div>
  );
};

export default SignUpPage;