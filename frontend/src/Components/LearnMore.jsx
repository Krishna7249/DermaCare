import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp,
  ExternalLink,
  CheckCircle,
  BookOpen,
  HelpCircle,
  AlertCircle,
  Zap
} from "lucide-react";

// FAQ Accordion Component
const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex w-full justify-between py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-800">{title}</span>
        {isOpen ? 
          <ChevronUp className="h-5 w-5 text-blue-600" /> : 
          <ChevronDown className="h-5 w-5 text-blue-600" />
        }
      </button>
      {isOpen && (
        <div className="pb-4">
          <p className="text-gray-600">{content}</p>
        </div>
      )}
    </div>
  );
};

// Info Card Component
const InfoCard = ({ icon, title, content }) => (
  <div className="flex bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
    <div className="shrink-0 mr-4">
      <div className="bg-blue-100 p-3 rounded-full text-blue-600">
        {icon}
      </div>
    </div>
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  </div>
);

const LearnMorePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-blue-600 text-white py-2 px-4 text-center text-sm">
        DermaCare AI is for educational purposes only and should not replace professional medical advice
      </div>
      
      {/* Simplified Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-30 p-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-auto">
            <div className="flex items-center">
              <span className="font-bold text-xl text-blue-600">DermaCare AI</span>
            </div>
            <button 
              onClick={() => navigate("/")}
              className="inline-flex items-center h-auto px-3 py-2 border border-blue-500 rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <nav className="sticky top-24">
              <div className="px-3 py-2 rounded-md bg-blue-50 mb-6">
                <h4 className="font-medium text-blue-800 mb-2">On this page</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#overview" className="text-blue-600 hover:text-blue-800">Overview</a></li>
                  <li><a href="#technology" className="text-blue-600 hover:text-blue-800">Our Technology</a></li>
                  <li><a href="#capabilities" className="text-blue-600 hover:text-blue-800">Capabilities</a></li>
                  <li><a href="#research" className="text-blue-600 hover:text-blue-800">Research Background</a></li>
                  <li><a href="#limitations" className="text-blue-600 hover:text-blue-800">Limitations</a></li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium text-gray-800 mb-3">Get Started</h4>
                <button 
                  onClick={() => navigate("/signup")}
                  className="w-full mb-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Create Account
                </button>
                <button 
                  onClick={() => navigate("/demo")}
                  className="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Try Demo
                </button>
              </div>
            </nav>
          </div>
          
          {/* Main Content */}
          <main className="lg:col-span-9">
            {/* Hero Section */}
            <div id="overview" className="prose prose-blue max-w-none mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Understanding DermaCare AI</h1>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <p className="text-blue-700 font-medium">
                  DermaCare AI is an educational tool designed to help users understand potential skin conditions through AI-powered image analysis. It is not a substitute for professional medical advice, diagnosis, or treatment.
                </p>
              </div>
              
              <p className="text-lg text-gray-600">
                DermaCare AI combines advanced image recognition technology with a comprehensive database of skin conditions to provide users with educational insights about their skin concerns. Our mission is to increase accessibility to dermatological information and empower individuals in their skin health journey.
              </p>
            </div>
            
            {/* Technology Section */}
            <div id="technology" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Our Technology</h2>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Computer Vision & Machine Learning</h3>
                  <p className="text-gray-600 mb-4">
                    DermaCare AI utilizes deep learning neural networks trained on diverse datasets of dermatological images. Our system analyzes visual patterns, textures, colors, and shapes to identify potential matches with known skin conditions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Neural Networks", "CNN", "Image Segmentation", "Pattern Recognition"].map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Clinical Database</h3>
                  <p className="text-gray-600 mb-4">
                    Our reference database contains information about hundreds of skin conditions, including common dermatological issues, rare disorders, and various presentations across different skin types and tones.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="text-2xl font-bold text-blue-600">200+</div>
                      <div className="text-sm text-gray-500">Skin conditions</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="text-2xl font-bold text-blue-600">50k+</div>
                      <div className="text-sm text-gray-500">Reference images</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Capabilities Section */}
            <div id="capabilities" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Capabilities</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <InfoCard 
                  icon={<Zap className="h-6 w-6" />}
                  title="Condition Identification"
                  content="Analyze uploaded images to identify potential matches with known skin conditions based on visual characteristics."
                />
                
                <InfoCard 
                  icon={<BookOpen className="h-6 w-6" />}
                  title="Educational Information"
                  content="Access comprehensive information about various skin conditions, including symptoms, common causes, and general management approaches."
                />
                
                <InfoCard 
                  icon={<CheckCircle className="h-6 w-6" />}
                  title="Progress Tracking"
                  content="Document changes in skin conditions over time to share with healthcare providers or monitor self-care effectiveness."
                />
                
                <InfoCard 
                  icon={<HelpCircle className="h-6 w-6" />}
                  title="Guided Analysis"
                  content="Receive step-by-step guidance for capturing optimal images and providing relevant context for more accurate analysis."
                />
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
                <div className="flex">
                  <div className="shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        DermaCare AI cannot diagnose medical conditions or replace professional medical care. Always consult with a qualified healthcare provider for proper diagnosis and treatment of skin conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Research Section */}
            <div id="research" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Research Background</h2>
              
              <p className="text-gray-600 mb-6">
                DermaCare AI is built upon recent advances in computer vision and machine learning applications in dermatology. Our approach is informed by peer-reviewed research in AI-assisted dermatological assessment.
              </p>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-medium text-gray-800 mb-4">Key Research Areas</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-700 rounded-full p-1 mr-3 mt-1">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Machine Learning in Dermatology</h4>
                      <p className="text-sm text-gray-600">Applications of convolutional neural networks for skin condition classification and segmentation</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-700 rounded-full p-1 mr-3 mt-1">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Computer Vision Techniques</h4>
                      <p className="text-sm text-gray-600">Feature extraction methodologies for dermatological images with varying lighting conditions and skin tones</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-700 rounded-full p-1 mr-3 mt-1">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Healthcare AI Ethics</h4>
                      <p className="text-sm text-gray-600">Balancing technological capabilities with appropriate safeguards and limitations in healthcare applications</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-end">
                  <ExternalLink className="h-4 w-4 text-blue-600 mr-1" />
                  <a href="/research" className="text-sm text-blue-600 hover:text-blue-800">Explore our research page</a>
                </div>
              </div>
            </div>
            
            {/* Limitations Section */}
            <div id="limitations" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Limitations</h2>
              
              <p className="text-gray-600 mb-6">
                While DermaCare AI utilizes advanced technology, it's important to understand its limitations:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-2">Not a Diagnostic Tool</h4>
                  <p className="text-sm text-gray-600">
                    Cannot provide medical diagnoses or replace professional healthcare evaluation
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-2">Image Quality Dependent</h4>
                  <p className="text-sm text-gray-600">
                    Analysis accuracy is affected by lighting, focus, and image resolution
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-2">Limited to Visual Assessment</h4>
                  <p className="text-sm text-gray-600">
                    Cannot consider non-visual symptoms, medical history, or physical examinations
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-2">Evolving Technology</h4>
                  <p className="text-sm text-gray-600">
                    While continuously improving, may not identify all conditions with equal accuracy
                  </p>
                </div>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Ready to explore DermaCare AI?</h2>
              <p className="mb-6">
                Create an account to start using our skin analysis tools or try the demo to see how it works.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => navigate("/signup")}
                  className="px-6 py-3 bg-white text-blue-700 rounded-md font-medium hover:bg-blue-50 transition-colors shadow-md"
                >
                  Create Account
                </button>
                <button 
                  onClick={() => navigate("/demo")}
                  className="px-6 py-3 bg-blue-700 text-white border border-blue-400 rounded-md font-medium hover:bg-blue-600 transition-colors shadow-md"
                >
                  Try Demo
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">DermaCare AI</h3>
            <p className="mb-4 text-sm">Advanced skin analysis powered by artificial intelligence.</p>
            <p className="text-xs">© 2025 DermaCare AI. All rights reserved.</p>
            <p className="text-xs">For educational purposes only.</p>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/guides" className="hover:text-white transition-colors">Skin Care Guides</a></li>
              <li><a href="/research" className="hover:text-white transition-colors">Research</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="/feedback" className="hover:text-white transition-colors">Provide Feedback</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/disclaimer" className="hover:text-white transition-colors">Medical Disclaimer</a></li>
              <li><a href="/accessibility" className="hover:text-white transition-colors">Accessibility</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LearnMorePage;