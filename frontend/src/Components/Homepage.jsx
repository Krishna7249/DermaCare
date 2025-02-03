import React from "react";
import { Camera, Brain, FileText, Search, BookOpen, Zap } from "lucide-react";

const FloatingBall = ({ size = "lg", left, top, delay = "0" }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div 
      className={`absolute ${sizes[size]} rounded-full bg-white/20 backdrop-blur-sm
        animate-[float_6s_ease-in-out_infinite] shadow-lg`}
      style={{
        left,
        top,
        animation: `float 6s ease-in-out infinite`,
        animationDelay: delay,
      }}
    />
  );
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 overflow-hidden">
      {/* Animated Background Elements */}
      <FloatingBall size="lg" left="5%" top="20%" delay="0s" />
      <FloatingBall size="md" left="15%" top="60%" delay="1s" />
      <FloatingBall size="sm" left="80%" top="15%" delay="2s" />
      <FloatingBall size="lg" left="85%" top="50%" delay="3s" />
      <FloatingBall size="md" left="45%" top="80%" delay="1.5s" />
      
      {/* Hero Section */}
      <header className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl transform hover:scale-105 transition-all duration-500">
            <h1 className="text-6xl font-bold text-white mb-6 animate-fadeIn">
              Skin Disease Detection System
            </h1>
            <p className="text-2xl text-white/90 mb-12">
              Using AI to help you understand skin health. This tool is for educational purposes only.
            </p>
            <button className="animate-bounce px-8 py-4 bg-white rounded-xl font-semibold text-lg text-teal-600 hover:bg-teal-50 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Detection
            </button>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Camera className="w-8 h-8" />,
                title: "Smart Capture",
                description: "Take or upload photos with our intelligent image processing system"
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: "AI Analysis",
                description: "Advanced neural networks analyze your skin condition in real-time"
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: "Detailed Report",
                description: "Receive comprehensive insights and personalized recommendations"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-white mb-6 transform hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Advanced Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="w-8 h-8" />,
                title: "Precise Detection",
                description: "State-of-the-art computer vision for accurate analysis"
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Smart Learning",
                description: "AI system that continuously improves with each analysis"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Instant Results",
                description: "Get detailed insights within seconds"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-white mb-6 transform hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm p-12 rounded-xl border border-white/20 transform hover:scale-105 transition-all duration-500">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Start?</h2>
              <p className="text-xl text-white/80 mb-8">
                Begin your journey to better skin health with our AI-powered analysis
              </p>
              <button className="animate-bounce px-8 py-4 bg-white text-teal-600 rounded-xl font-semibold text-lg hover:bg-teal-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/60">
            © 2025 SkinCare AI. For educational purposes only.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;