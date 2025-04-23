import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Camera, 
  Brain,
  MapPin, 
  FileText, 
  Search, 
  MessageSquare, 
  Mic, 
  Shield, 
  Database, 
  ArrowRight 
} from "lucide-react";

// Animated particle component
const Particle = ({ size, delay, duration, x, y }) => {
  const sizes = {
    sm: "w-2 h-2",
    md: "w-4 h-4",
    lg: "w-6 h-6"
  };

  return (
    <div 
      className={`absolute ${sizes[size]} rounded-full bg-blue-400/30 backdrop-blur-sm`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        animation: `pulse ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );
};

// Feature card component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-1 border border-gray-100">
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Testimonial component
const Testimonial = ({ quote, author, role }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
    <div className="text-blue-600 mb-4">
      <svg className="w-8 h-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
    </div>
    <p className="text-gray-700 mb-4 italic">{quote}</p>
    <div className="flex items-center">
      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
        {author.charAt(0)}
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{author}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();
  
  // Generate random positions for particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: ["sm", "md", "lg"][Math.floor(Math.random() * 3)],
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 7,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      {/* Particles */}
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

      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl text-blue-600">DermaCare AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="#features" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">How It Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Testimonials</a>
              <button 
                onClick={() => navigate("/login")}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </button>
              <button 
                onClick={() => navigate("/signup")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-16 sm:py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
                <span className="text-blue-600">AI-Powered</span> Skin Disease Detection
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Advanced technology for early detection and analysis of skin conditions. Get personalized insights and recommendations in seconds.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  className="px-8 py-4 bg-blue-600 rounded-lg font-semibold text-lg text-white hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center"
                  onClick={() => navigate("/signup")}
                >
                  Start Scan
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button 
                  className="px-8 py-4 bg-white border border-gray-300 rounded-lg font-semibold text-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-md hover:shadow-lg"
                  onClick={() => navigate("/learn-more")}
                >
                  Learn More
                </button>
              </div>
              <div className="mt-6 text-sm text-gray-500">
                *For educational purposes only. Not a replacement for professional medical advice.
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 bg-white p-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://baslangicnoktasi.org/wp-content/uploads/2021/05/Adsiz-Kopyasi-Kopyasi-10-1080x694.png" 
                  alt="Skin Analysis Interface" 
                  className="rounded-lg w-full"
                />
                <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white p-3 rounded-lg shadow-lg">
                  <Brain className="w-8 h-8" />
                </div>  
              </div>
              <div className="absolute top-8 -left-8 w-full h-full bg-blue-200 rounded-xl -z-10"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-12 bg-blue-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "98%", label: "Accuracy Rate" },
              { value: "3M+", label: "Skin Scans" },
              { value: "200+", label: "Detectable Conditions" },
              { value: "24/7", label: "AI Support" }
            ].map((stat, index) => (
              <div key={index} className="bg-blue-700/50 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Advanced Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI technology with medical expertise to provide accurate and reliable skin analysis.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <Camera className="w-8 h-8" />, 
                title: "Smart Capture", 
                description: "Advanced image processing optimizes photos for accurate analysis regardless of lighting conditions." 
              },
              { 
                icon: <Brain className="w-8 h-8" />, 
                title: "AI Analysis", 
                description: "Neural networks trained on thousands of clinical images identify patterns invisible to the human eye." 
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Get Nearby Clinics",
                description: "Find clinics near your location with detailed information, ratings, and directions.",
              },
              { 
                icon: <Shield className="w-8 h-8" />, 
                title: "Privacy Protected", 
                description: "Your data is encrypted and never shared. Images can be deleted upon request." 
              },
              { 
                icon: <MessageSquare className="w-8 h-8" />, 
                title: "AI Consultation", 
                description: "Chat with our AI assistant to understand your results and get personalized care recommendations." 
              },
              { 
                icon: <Database className="w-8 h-8" />, 
                title: "Condition Library", 
                description: "Access our extensive database of skin conditions with detailed information and care guides." 
              }
            ].map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get results in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                step: "01", 
                title: "Upload Image", 
                description: "Take a photo or upload an existing image of the skin condition using our secure platform" 
              },
              { 
                step: "02", 
                title: "AI Analysis", 
                description: "Our advanced algorithms analyze the image against a database of millions of clinical cases" 
              },
              { 
                step: "03", 
                title: "Get Results", 
                description: "Receive an instant assessment with potential conditions, confidence scores, and next steps" 
              },
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg relative overflow-hidden border border-gray-100">
                <div className="text-8xl font-bold text-blue-100 absolute -top-5 -right-2">{step.step}</div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">User Experiences</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our users want to say about DermaCare AI
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial 
              quote="DermaCare helped me identify a suspicious mole that turned out to be early-stage melanoma. The early detection made all the difference in my treatment."
              author="Sarah K."
              role="User since 2024"
            />
            <Testimonial 
              quote="As someone living in a rural area with limited access to dermatologists, this website has been invaluable for monitoring my psoriasis and adjusting my treatment plan."
              author="Michael T."
              role="Premium Member"
            />
            <Testimonial 
              quote="I use DermaCare in my practice as a preliminary screening tool. It's remarkably accurate and helps me prioritize which patients need immediate attention."
              author="Dr. James"
              role="Dermatologist"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-blue-600">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to experience the future of skin health?</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Join thousands of users who trust DermaCare AI for regular skin monitoring and early detection.
                </p>
              </div>
              <div className="lg:col-span-2">
                <button 
                  className="w-full py-4 bg-blue-600 rounded-lg font-semibold text-lg text-white hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center"
                  onClick={() => navigate("/signup")}
                >
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button 
                  className="w-full mt-4 py-4 bg-white border border-gray-300 rounded-lg font-semibold text-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-md hover:shadow-lg"
                  onClick={() => navigate("/demo")}
                >
                  Try Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">DermaCare AI</h3>
              <p className="mb-4">Advanced skin disease detection powered by artificial intelligence.</p>
              <p className="text-sm">© 2025 DermaCare AI. All rights reserved.</p>
              <p className="text-sm">For educational purposes only.</p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="https://www.aad.org/public/everyday-care/skin-care-basics/care" className="hover:text-white transition-colors">Skin Care Guides</a></li>
                <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="/support" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/disclaimer" className="hover:text-white transition-colors">Medical Disclaimer</a></li>
                <li><a href="/accessibility" className="hover:text-white transition-colors">Accessibility</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { 
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

export default HomePage;