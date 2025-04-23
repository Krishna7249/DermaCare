import React, { useState, useEffect } from "react";
import {
  Upload,
  Mic,
  Send,
  StopCircle,
  X,
  Maximize2,
  Loader,
  Settings,
  FileText,
  LogOut,
  MapPin,
  User,
  HelpCircle,
  Camera,
  Brain,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import NearbyClinics from "./Nearbyclinics";

// Animated particle component from HomePage
const Particle = ({ size, delay, duration, x, y }) => {
  const sizes = {
    sm: "w-2 h-2",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  };

  return (
    <div
      className="absolute rounded-full bg-blue-400/30 backdrop-blur-sm"
      style={{
        width: sizes[size].split("-")[1],
        height: sizes[size].split("-")[1],
        left: `${x}%`,
        top: `${y}%`,
        animation: `pulse ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );
};

const CircularProgress = ({ percentage, size = 120 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setProgress(percentage), 100);
  }, [percentage]);

  const radius = size / 2 - 10;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-blue-200"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-blue-600 transition-all duration-1000 ease-out"
          strokeWidth="8"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-blue-800 text-2xl font-bold">
        {progress}%
      </div>
    </div>
  );
};

const HelpSupport = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("faq");

  const faqs = [
    {
      question: "How do I upload an image?",
      answer:
        "Click on the 'Drop your image here' box or click 'browse' to select an image from your device.",
    },
    {
      question: "Is my data shared with third parties?",
      answer:
        "No, your data is never shared with third parties without your explicit consent.",
    },
    {
      question: "Can I save my analysis results?",
      answer:
        "Yes, your analysis results are automatically saved to your account history.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gray-800/70 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Help & Support
        </h2>

        <div className="flex mb-6 space-x-2">
          <button
            onClick={() => setActiveTab("faq")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "faq"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            FAQs
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "contact"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Contact Us
          </button>
          <button
            onClick={() => setActiveTab("tutorial")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "tutorial"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Tutorial
          </button>
        </div>

        {activeTab === "faq" && (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "contact" && (
          <div className="space-y-6">
            <p className="text-gray-600">
              Need additional help? Contact our support team.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  placeholder="Describe your issue or question"
                ></textarea>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
                Submit Request
              </button>
            </div>
          </div>
        )}

        {activeTab === "tutorial" && (
          <div className="space-y-6">
            <p className="text-gray-600">
              Learn how to use the DermaCare AI app with our quick tutorial.
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg flex items-start border border-gray-100">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Upload Your Image
                  </h3>
                  <p className="text-gray-600">
                    Upload a photo of the affected skin area from your device.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg flex items-start border border-gray-100">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Analyze Your Image
                  </h3>
                  <p className="text-gray-600">
                    Click the 'Analyze Image' button and wait for our AI to
                    process your image.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg flex items-start border border-gray-100">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Review Results
                  </h3>
                  <p className="text-gray-600">
                    Check the analysis results and recommendations provided by
                    our AI.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg flex items-start border border-gray-100">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Ask Questions
                  </h3>
                  <p className="text-gray-600">
                    Use the AI Assistant chat to ask questions about your skin
                    concerns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How can I help you?" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [showHelpSupport, setShowHelpSupport] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeComponent, setActiveComponent] = useState("default");

  const navigate = useNavigate();

  // Generate random positions for particles to match landing page
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: ["sm", "md", "lg"][Math.floor(Math.random() * 3)],
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 7,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  const [userName, setUserName] = useState("");
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.lang = "en-US";
      recognitionInstance.interimResults = true;
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript;
        setInputMessage(transcript);
      };
      setRecognition(recognitionInstance);
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setShowResults(false);
    }
  };

  const handleAnalyze = () => {
    if (selectedImage) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowResults(true);
      }, 2000); // Simulate processing delay
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsRecording(!isRecording);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const userMessage = inputMessage.trim();
      setMessages([...messages, { sender: "user", text: userMessage }]);
      setInputMessage("");

      // Add a placeholder for the streaming message
      setMessages((prev) => [...prev, { sender: "ai", text: "" }]);

      try {
        const response = await fetch("http://localhost:5000/ai-response", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input: userMessage }),
        });

        if (!response.ok) {
          throw new Error("Failed to get AI response");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let aiResponse = "";

        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          aiResponse += decoder.decode(value, { stream: true });

          // Update the last AI message with the streamed text
          // eslint-disable-next-line no-loop-func
          setMessages((prev) => {
            const updatedMessages = [...prev];
            updatedMessages[updatedMessages.length - 1] = {
              ...updatedMessages[updatedMessages.length - 1],
              text: aiResponse, // Append the streamed text
            };
            return updatedMessages;
          });
        }
      } catch (error) {
        console.error("Error getting AI response:", error);
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "I apologize, but I'm having trouble connecting to the server right now. Please try again later.",
          },
        ]);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  console.log(messages, "messages");
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      {/* Particles matching landing page style */}
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          size={particle.size}
          delay={particle.delay}
          duration={particle.duration}
          x={particle.x}
          y={particle.y}
        />
      ))}

      <div className="flex h-screen">
        {/* Sidebar */}
        <div
          className={`${
            sidebarCollapsed ? "w-16" : "w-64"
          } h-full bg-white shadow-lg transition-all duration-300 flex flex-col z-10`}
        >
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            {!sidebarCollapsed && (
              <span className="font-bold text-xl text-blue-600">
                DermaCare AI
              </span>
            )}
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-full hover:bg-gray-100 ${
                sidebarCollapsed ? "mx-auto" : ""
              }`}
            >
              {sidebarCollapsed ? (
                <LogOut className="w-5 h-5" />
              ) : (
                <LogOut className="w-5 h-5 rotate-180" />
              )}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <nav className="space-y-2">
                <button className="flex items-center space-x-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 p-3 rounded-lg w-full transition-colors">
                  <User className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span>Profile</span>}
                </button>
                <button className="flex items-center space-x-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 p-3 rounded-lg w-full transition-colors">
                  <Camera className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span>Scan History</span>}
                </button>
                <button
                  className="flex items-center space-x-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 p-3 rounded-lg w-full transition-colors"
                  onClick={() => {
                    setActiveComponent("nearbyClinics");
                  }}
                >
                  <MapPin className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span>Nearby Clinics</span>}
                </button>
                <button
                  className="flex items-center space-x-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 p-3 rounded-lg w-full transition-colors"
                  onClick={() => setShowHelpSupport(true)}
                >
                  <HelpCircle className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span>Help & Support</span>}
                </button>
                <button className="flex items-center space-x-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 p-3 rounded-lg w-full transition-colors">
                  <Settings className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span>Settings</span>}
                </button>
              </nav>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 text-red-600 hover:bg-red-50 p-3 rounded-lg w-full transition-colors"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {userName ? userName.charAt(0).toUpperCase() : "U"}
              </div>
            </div>
          </header>
          <div className="p-6 overflow-y-auto h-[calc(100vh-70px)]">
            {activeComponent === "nearbyClinics" ? (
              <NearbyClinics />
            ) : (
              <div>
                <div className="p-6 overflow-y-auto h-[calc(100vh-70px)]">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Upload & Analysis Section */}
                    <div className="space-y-6">
                      <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                          <Camera className="mr-2 text-blue-600" />
                          Skin Analysis
                        </h2>

                        {!previewUrl ? (
                          <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                              id="imageUpload"
                            />
                            <label
                              htmlFor="imageUpload"
                              className="cursor-pointer inline-block"
                            >
                              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-blue-200 transition-colors">
                                <Upload className="w-12 h-12 text-blue-600" />
                              </div>
                              <p className="text-gray-600 text-lg">
                                Drop your image here or click to browse
                              </p>
                              <p className="text-gray-400 text-sm mt-2">
                                Supported formats: JPG, PNG, HEIC
                              </p>
                            </label>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="relative group rounded-xl overflow-hidden">
                              <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full rounded-xl shadow-md object-cover h-64"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                                <button
                                  onClick={() => setPreviewUrl(null)}
                                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                                >
                                  <X className="w-5 h-5 text-white" />
                                </button>
                              </div>
                            </div>

                            {!showResults && (
                              <button
                                onClick={handleAnalyze}
                                disabled={isAnalyzing}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                              >
                                {isAnalyzing ? (
                                  <div className="flex items-center">
                                    <Loader className="w-5 h-5 animate-spin mr-2" />
                                    Analyzing Image...
                                  </div>
                                ) : (
                                  <>
                                    <Brain className="w-5 h-5 mr-2" />
                                    Analyze Image
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      {showResults && (
                        <div className="bg-white rounded-xl shadow-lg p-6">
                          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                            <FileText className="mr-2 text-blue-600" />
                            Analysis Results
                          </h2>

                          <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="flex flex-col items-center">
                              <CircularProgress percentage={92} />
                              <p className="text-gray-700 mt-4 font-medium">
                                Confidence
                              </p>
                            </div>
                            <div className="flex flex-col items-center">
                              <CircularProgress percentage={75} />
                              <p className="text-gray-700 mt-4 font-medium">
                                Severity
                              </p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="bg-blue-50 p-6 rounded-xl">
                              <h3 className="text-lg font-medium text-gray-800 mb-3">
                                Detected Condition
                              </h3>
                              <div className="flex justify-between mb-2">
                                <span className="text-gray-600">
                                  Seborrheic Dermatitis
                                </span>
                                <span className="text-blue-700 font-semibold">
                                  92%
                                </span>
                              </div>
                              <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-600 transition-all duration-1000"
                                  style={{ width: "92%" }}
                                />
                              </div>

                              <div className="flex justify-between mt-4 mb-2">
                                <span className="text-gray-600">Psoriasis</span>
                                <span className="text-blue-700 font-semibold">
                                  38%
                                </span>
                              </div>
                              <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-600 transition-all duration-1000"
                                  style={{ width: "38%" }}
                                />
                              </div>

                              <div className="mt-6 p-4 bg-blue-100 rounded-lg text-blue-800 text-sm">
                                <p className="font-medium">
                                  Recommended Action:
                                </p>
                                <p className="mt-1">
                                  Consider consulting with a dermatologist for a
                                  professional diagnosis and treatment plan.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Additional Resources */}
                      <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                          Educational Resources
                        </h2>
                        <div className="space-y-3">
                          <a
                            href="https://www.healthline.com/health/skin-disorders"
                            className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            <h3 className="font-medium text-blue-700">
                              Understanding Skin Conditions
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              Learn about common skin disorders and their
                              symptoms
                            </p>
                          </a>
                          <a
                            href="https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/skin-care/art-20048237"
                            className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            <h3 className="font-medium text-blue-700">
                              Preventive Skin Care
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              Daily habits to maintain healthy skin
                            </p>
                          </a>
                          <a
                            href="https://simcoderm.com/2025/01/10-signs-you-need-to-see-a-dermatologist/"
                            className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            <h3 className="font-medium text-blue-700">
                              When to See a Dermatologist
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              Warning signs that require professional attention
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Chat Section */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[calc(100vh-180px)] flex flex-col">
                      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <Brain className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">
                              AI Assistant
                            </h3>
                            <p className="text-xs text-gray-500">
                              Online • Ask me anything about skin health
                            </p>
                          </div>
                        </div>
                        {/* <button 
                    onClick={() => setIsChatExpanded(!isChatExpanded)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Maximize2 className="w-5 h-5 text-gray-500" />
                  </button> */}
                      </div>

                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, idx) => (
                          <div
                            key={idx}
                            className={`flex ${
                              msg.sender === "user"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`p-3 rounded-2xl max-w-xs lg:max-w-md ${
                                msg.sender === "user"
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {msg.sender === "ai" ? (
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {msg.text}
                                </ReactMarkdown>
                              ) : (
                                <p>{msg.text}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 border-t border-gray-100">
                        <div className="flex items-center bg-gray-50 rounded-xl p-2">
                          <textarea
                            rows="1"
                            className="w-full bg-transparent text-gray-800 placeholder-gray-500 border-none outline-none resize-none px-2"
                            placeholder="Ask about your condition..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                          />
                          <button
                            onClick={handleMicClick}
                            className="p-2 text-gray-500 hover:text-blue-600"
                          >
                            {isRecording ? (
                              <StopCircle className="w-5 h-5" />
                            ) : (
                              <Mic className="w-5 h-5" />
                            )}
                          </button>
                          <button
                            onClick={handleSendMessage}
                            className={`p-2 rounded-lg ${
                              inputMessage.trim()
                                ? "text-blue-600 hover:bg-blue-50"
                                : "text-gray-400"
                            }`}
                          >
                            <Send className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                          For medical emergencies, please contact your
                          healthcare provider
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showHelpSupport && (
        <HelpSupport onClose={() => setShowHelpSupport(false)} />
      )}

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
