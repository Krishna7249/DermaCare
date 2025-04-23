import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Search, 
  ChevronDown, 
  ChevronUp,
  ChevronRight,
  MessageCircle,
  Mail,
  Edit3,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Flag
} from "lucide-react";

// FAQ Categories for filtering
const categories = [
  { id: "general", label: "General" },
  { id: "usage", label: "Using the App" },
  { id: "technical", label: "Technical" },
  { id: "privacy", label: "Privacy & Security" },
  { id: "medical", label: "Medical Information" }
];

// FAQ Item Component
const FAQItem = ({ question, answer, category, isOpen, toggleOpen, helpful }) => {
  const [feedbackGiven, setFeedbackGiven] = useState(null);
  
  return (
    <div className="border-b border-gray-200 py-6">
      <button
        className="flex w-full justify-between items-center text-left"
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-medium text-gray-800">{question}</h3>
        <div className="flex items-center">
          <span className="mr-3 text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">{category}</span>
          {isOpen ? 
            <ChevronUp className="h-5 w-5 text-blue-600" /> : 
            <ChevronDown className="h-5 w-5 text-blue-600" />
          }
        </div>
      </button>
      
      {isOpen && (
        <div className="mt-4 animate-fadeIn">
          <div className="prose prose-blue max-w-none text-gray-600">
            {answer}
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                className={`flex items-center text-sm ${feedbackGiven === 'helpful' ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setFeedbackGiven('helpful')}
                disabled={feedbackGiven !== null}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>Helpful {helpful && !feedbackGiven ? `(${helpful})` : ''}</span>
              </button>
              
              <button 
                className={`flex items-center text-sm ${feedbackGiven === 'not-helpful' ? 'text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setFeedbackGiven('not-helpful')}
                disabled={feedbackGiven !== null}
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
                <span>Not helpful</span>
              </button>
            </div>
          </div>
          
          {feedbackGiven && (
            <div className="mt-3 text-sm text-gray-600">
              Thank you for your feedback!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// FAQ Data
const faqData = [
  {
    id: 1,
    question: "What is DermaCare AI?",
    answer: (
      <>
        <p>DermaCare AI is an educational tool designed to help users understand potential skin conditions through AI-powered image analysis. Our platform uses advanced machine learning algorithms to analyze images of skin concerns and provide information about possible matching conditions.</p>
        <p>Key features include:</p>
        <ul>
          <li>AI-powered skin condition analysis</li>
          <li>Educational information about various dermatological conditions</li>
          <li>Ability to track changes in skin concerns over time</li>
          <li>Resources to help you discuss findings with healthcare professionals</li>
        </ul>
        <p><strong>Important:</strong> DermaCare AI is not a diagnostic tool and should not replace professional medical advice, diagnosis, or treatment.</p>
      </>
    ),
    category: "General",
    helpful: 124
  },
  {
    id: 2,
    question: "How accurate is DermaCare AI?",
    answer: (
      <>
        <p>DermaCare AI's accuracy varies depending on several factors including image quality, lighting conditions, and the specific condition being analyzed. In controlled testing environments, our system achieves high accuracy rates for common conditions, but real-world performance may vary.</p>
        <p>Factors that influence accuracy include:</p>
        <ul>
          <li>Image quality and resolution</li>
          <li>Proper lighting and angle</li>
          <li>Clarity of the skin concern in the image</li>
          <li>Whether the condition is represented in our reference database</li>
        </ul>
        <p>Remember that DermaCare AI is designed as an educational tool rather than a diagnostic device. Always consult with a qualified healthcare professional for proper diagnosis and treatment.</p>
      </>
    ),
    category: "Technical",
    helpful: 98
  },
  {
    id: 3,
    question: "Is my data secure and private?",
    answer: (
      <>
        <p>We take data security and privacy very seriously. All images and personal information submitted to DermaCare AI are protected with industry-standard security measures:</p>
        <ul>
          <li>End-to-end encryption for all data in transit</li>
          <li>Secure, encrypted storage for all data at rest</li>
          <li>Option to delete your images immediately after analysis</li>
          <li>Strict access controls limiting who can view your data</li>
        </ul>
        <p>We never sell or share your personal data with third parties without your explicit consent. You retain full control over your information and can request deletion of your data at any time through your account settings.</p>
        <p>For complete details about our data handling practices, please review our <a href="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>.</p>
      </>
    ),
    category: "Privacy & Security",
    helpful: 115
  },
//   {
//     id: 4,
//     question: "How much does DermaCare AI cost?",
//     answer: (
//       <>
//         <p>DermaCare AI offers several pricing tiers to accommodate different needs:</p>
        
//         <h4 className="font-medium mt-3 mb-2">Free Tier:</h4>
//         <ul>
//           <li>Basic skin analysis (up to 3 analyses per month)</li>
//           <li>General educational information</li>
//           <li>Limited history tracking</li>
//         </ul>
        
//         <h4 className="font-medium mt-3 mb-2">Standard Plan: $9.99/month</h4>
//         <ul>
//           <li>Unlimited skin analyses</li>
//           <li>Detailed educational content</li>
//           <li>Full history tracking and comparison</li>
//           <li>Basic reporting features</li>
//         </ul>
        
//         <h4 className="font-medium mt-3 mb-2">Premium Plan: $19.99/month</h4>
//         <ul>
//           <li>All Standard Plan features</li>
//           <li>Priority processing</li>
//           <li>Enhanced analysis with detailed reports</li>
//           <li>Export and sharing capabilities</li>
//           <li>Priority customer support</li>
//         </ul>
        
//         <p className="mt-3">We also offer discounted annual billing options and special rates for healthcare providers and educational institutions. Visit our <a href="/pricing" className="text-blue-600 hover:text-blue-800">pricing page</a> for more details.</p>
//       </>
//     ),
//     category: "Account & Billing",
//     helpful: 89
//   },
  {
    id: 5,
    question: "How do I take good photos for analysis?",
    answer: (
      <>
        <p>Getting clear, usable photos is essential for accurate analysis. Follow these guidelines:</p>
        
        <h4 className="font-medium mt-3 mb-2">Lighting:</h4>
        <ul>
          <li>Use natural, diffused daylight when possible</li>
          <li>Avoid harsh direct sunlight or flash</li>
          <li>Ensure the area is well-lit without shadows</li>
        </ul>
        
        <h4 className="font-medium mt-3 mb-2">Focus and Distance:</h4>
        <ul>
          <li>Keep the camera 6-12 inches (15-30cm) from the skin concern</li>
          <li>Ensure the image is in sharp focus</li>
          <li>Include some surrounding healthy skin for context</li>
        </ul>
        
        <h4 className="font-medium mt-3 mb-2">Multiple Angles:</h4>
        <ul>
          <li>Take photos from at least 2-3 different angles</li>
          <li>Include close-up and slightly zoomed-out views</li>
        </ul>
        
        <h4 className="font-medium mt-3 mb-2">Clean Lens:</h4>
        <ul>
          <li>Make sure your camera lens is clean and free of smudges</li>
        </ul>
        
        <p className="mt-3">The app provides a guided photo-taking interface with real-time feedback to help you capture optimal images for analysis.</p>
      </>
    ),
    category: "Using the App",
    helpful: 156
  },
  {
    id: 6,
    question: "Can DermaCare AI diagnose skin cancer?",
    answer: (
      <>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Important health information:</strong> DermaCare AI is not designed or approved to diagnose skin cancer or any other medical condition.
              </p>
            </div>
          </div>
        </div>
        
        <p>While DermaCare AI can help identify visual patterns that may be associated with various skin conditions, including some that resemble skin cancers, it <strong>cannot diagnose skin cancer</strong> or any other medical condition.</p>
        
        <p>If you have concerns about a mole or skin lesion, particularly if it shows any of these warning signs, please consult a healthcare professional immediately:</p>
        
        <ul>
          <li>Asymmetry (one half looks different from the other)</li>
          <li>Border irregularity</li>
          <li>Color variations or changes</li>
          <li>Diameter larger than 6mm (about the size of a pencil eraser)</li>
          <li>Evolution or changes in size, shape, color, or symptoms</li>
        </ul>
        
        <p>Early detection of skin cancer is crucial for successful treatment. Never rely on any app or AI tool, including DermaCare AI, to rule out serious conditions.</p>
      </>
    ),
    category: "Medical Information",
    helpful: 203
  },
//   {
//     id: 7,
//     question: "How do I cancel my subscription?",
//     answer: (
//       <>
//         <p>You can cancel your DermaCare AI subscription at any time through your account settings:</p>
        
//         <ol>
//           <li>Log in to your DermaCare AI account</li>
//           <li>Go to "Account Settings" (found in the top-right menu)</li>
//           <li>Select "Subscription Management"</li>
//           <li>Click on "Cancel Subscription"</li>
//           <li>Follow the prompts to confirm cancellation</li>
//         </ol>
        
//         <p>Important notes about cancellation:</p>
//         <ul>
//           <li>You will continue to have access to your subscription benefits until the end of your current billing period</li>
//           <li>No refunds are provided for partial billing periods</li>
//           <li>You can continue using the free tier features after cancellation</li>
//           <li>Your account history and data will be preserved unless you specifically request data deletion</li>
//         </ul>
        
//         <p>If you encounter any issues with cancellation, please contact our support team at support@dermacareai.com or through the in-app support chat.</p>
//       </>
//     ),
//     category: "Account & Billing",
//     helpful: 67
//   },
  {
    id: 8,
    question: "Can I use DermaCare AI for my children?",
    answer: (
      <>
        <p>DermaCare AI can be used to analyze skin concerns for children, but there are important considerations:</p>
        
        <h4 className="font-medium mt-3 mb-2">Usage Guidelines:</h4>
        <ul>
          <li>Users must be 18+ to create an account</li>
          <li>Parents/guardians may use their account to analyze their children's skin conditions</li>
          <li>Children's privacy is protected under the same strict security protocols</li>
        </ul>
        
        <h4 className="font-medium mt-3 mb-2">Important Notes:</h4>
        <ul>
          <li>Children's skin may present conditions differently than adults</li>
          <li>Our database includes pediatric conditions, but may have less comprehensive coverage than adult conditions</li>
          <li>Always consult with a pediatrician or pediatric dermatologist for proper evaluation and treatment</li>
        </ul>
        
        <p className="mt-3">Children's skin is often more sensitive and may react differently to environmental factors and treatments. Professional medical advice is particularly important when dealing with skin concerns in children.</p>
      </>
    ),
    category: "Using the App",
    helpful: 82
  },
  {
    id: 9,
    question: "What devices is DermaCare AI compatible with?",
    answer: (
      <>
        <p>DermaCare AI is designed to work across multiple platforms and devices:</p>
        
        <h4 className="font-medium mt-3 mb-2">Mobile Apps:</h4>
        <ul>
          <li>iOS devices running iOS 13 or later</li>
          <li>Android devices running Android 8.0 (Oreo) or later</li>
          <li>Optimized for smartphone cameras, but works with tablet cameras as well</li>
        </ul>
        
        <h4 className="font-medium mt-3 mb-2">Web Platform:</h4>
        <ul>
          <li>Modern web browsers including Chrome, Safari, Firefox, and Edge</li>
          <li>Ability to upload images taken with any camera</li>
          <li>Responsive design that works on desktop, laptop, and tablet screens</li>
        </ul>
        
        <h4 className="font-medium mt-3 mb-2">Camera Requirements:</h4>
        <ul>
          <li>Minimum 5MP camera resolution recommended</li>
          <li>Autofocus capability preferred</li>
          <li>Flash not required but can be helpful in low-light conditions</li>
        </ul>
        
        <p className="mt-3">For the best experience, we recommend using a device with a high-quality camera and good processing power. The app size is approximately 85MB for iOS and 60MB for Android.</p>
      </>
    ),
    category: "Technical",
    helpful: 73
  },
  {
    id: 10,
    question: "Does DermaCare AI work for all skin tones?",
    answer: (
      <>
        <p>DermaCare AI is designed and trained to work with all skin tones, though there are some important considerations:</p>
        
        <h4 className="font-medium mt-3 mb-2">Our Approach to Inclusivity:</h4>
        <ul>
          <li>Training data includes diverse skin tones across the Fitzpatrick scale (Types I-VI)</li>
          <li>Specialized image processing algorithms that adjust for different skin pigmentations</li>
          <li>Ongoing efforts to expand our database with more diverse skin representations</li>
        </ul>
        
        <h4 className="font-medium mt-3 mb-2">Current Limitations:</h4>
        <ul>
          <li>Some conditions may present differently across skin tones and may be more challenging to analyze</li>
          <li>Historical bias in medical imaging and dermatology research means some conditions have been more extensively documented in lighter skin tones</li>
          <li>Image quality and lighting becomes even more important for very dark or very light skin</li>
        </ul>
        
        <p className="mt-3">We are committed to continuously improving our technology to ensure equitable performance across all skin tones. Our development team includes dermatologists specializing in diverse skin types, and we regularly test and refine our algorithms to address any performance gaps.</p>
      </>
    ),
    category: "Technical",
    helpful: 112
  },
  {
    id: 11,
    question: "Will DermaCare AI suggest treatments?",
    answer: (
      <>
        <p>DermaCare AI provides general educational information about skin conditions, but has important limitations regarding treatment recommendations:</p>
        
        <h4 className="font-medium mt-3 mb-2">What DermaCare AI Does:</h4>
        <ul>
          <li>Provides general information about common management approaches for identified conditions</li>
          <li>Offers educational content about different treatment categories that may be relevant</li>
          <li>Explains general skincare principles that might be beneficial</li>
        </ul>
        
        <h4 className="font-medium mt-3 mb-2">What DermaCare AI Does Not Do:</h4>
        <ul>
          <li>Prescribe or recommend specific medications</li>
          <li>Provide personalized treatment plans</li>
          <li>Suggest specific products or brands</li>
          <li>Offer medical advice about your specific situation</li>
        </ul>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
          <p className="text-blue-700">
            Treatment decisions should always be made in consultation with qualified healthcare professionals who can consider your complete medical history, perform proper examinations, and provide personalized care.
          </p>
        </div>
      </>
    ),
    category: "Medical Information",
    helpful: 91
  },
  {
    id: 12,
    question: "How do I reset my password?",
    answer: (
      <>
        <p>If you've forgotten your password or need to reset it for security reasons, follow these steps:</p>
        
        <h4 className="font-medium mt-3 mb-2">From the Login Screen:</h4>
        <ol>
          <li>On the login screen, click "Forgot Password?" below the login button</li>
          <li>Enter the email address associated with your account</li>
          <li>Click "Send Reset Link"</li>
          <li>Check your email (including spam/junk folders) for a message from DermaCare AI</li>
          <li>Click the password reset link in the email</li>
          <li>Create and confirm your new password</li>
          <li>Log in with your new password</li>
        </ol>
        
        <h4 className="font-medium mt-3 mb-2">If Already Logged In:</h4>
        <ol>
          <li>Go to "Account Settings" from the user menu</li>
          <li>Select "Security" or "Password"</li>
          <li>Enter your current password</li>
          <li>Create and confirm your new password</li>
          <li>Click "Save Changes"</li>
        </ol>
        
        <p className="mt-3">Password requirements: Minimum 8 characters with at least one uppercase letter, one lowercase letter, one number, and one special character.</p>
        
        <p className="mt-3">If you do not receive the password reset email within a few minutes, please check your spam folder or contact support for assistance.</p>
      </>
    ),
    category: "Privacy & Security",
    helpful: 54
  }
];

const FAQPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItemId, setOpenItemId] = useState(null);
  const [filteredFAQs, setFilteredFAQs] = useState(faqData);
  
  useEffect(() => {
    filterFAQs();
  }, [searchQuery, selectedCategory]);
  
  const filterFAQs = () => {
    let filtered = faqData;
    
    // Filter by search term
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(query) || 
        faq.category.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(faq => 
        faq.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    setFilteredFAQs(filtered);
  };
  
  const toggleItem = (id) => {
    setOpenItemId(openItemId === id ? null : id);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-blue-600 text-white py-2 px-4 text-center text-sm">
        DermaCare AI is for educational purposes only and should not replace professional medical advice
      </div>
      
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl text-blue-600">DermaCare AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate("/")}
                className="inline-flex items-center px-3 py-2 border border-blue-500 rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </button>
              <button 
                onClick={() => navigate("/learn-more")}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
          <p className="mt-2 text-gray-600">Find answers to common questions about DermaCare AI</p>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search Box */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  className="w-full rounded-md border border-gray-300 py-3 pl-4 pr-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* Category Filters */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">Categories</h3>
              </div>
              <div className="p-2">
                <button
                  className={`w-full text-left px-4 py-2 rounded-md text-sm ${
                    selectedCategory === "all" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50 text-gray-700"
                  }`}
                  onClick={() => setSelectedCategory("all")}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`w-full text-left px-4 py-2 rounded-md text-sm ${
                      selectedCategory === category.id ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50 text-gray-700"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Contact Support Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-medium text-gray-800 mb-3">Can't find your answer?</h3>
              <p className="text-sm text-gray-600 mb-4">Get in touch with our support team for personalized assistance.</p>
              
              <a href="/contact" className="flex items-center text-blue-600 hover:text-blue-800 mb-3 text-sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                <span>Live Chat Support</span>
              </a>
              
              <a href="mailto:support@dermacareai.com" className="flex items-center text-blue-600 hover:text-blue-800 mb-3 text-sm">
                <Mail className="h-4 w-4 mr-2" />
                <span>Email Support</span>
              </a>
              
              <a href="/submit-question" className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
                <Edit3 className="h-4 w-4 mr-2" />
                <span>Submit a Question</span>
              </a>
            </div>
          </div>
          
          {/* FAQ List */}
          <div className="mt-8 lg:mt-0 lg:col-span-2">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              {/* Results Stats */}
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">
                    {filteredFAQs.length} {filteredFAQs.length === 1 ? "Result" : "Results"}
                  </h2>
                  
                  {selectedCategory !== "all" && (
                    <button 
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      onClick={() => setSelectedCategory("all")}
                    >
                      Clear filter
                    </button>
                  )}
                </div>
              </div>
              
              {/* FAQ Items */}
              <div className="px-6">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map((faq) => (
                    <FAQItem
                      key={faq.id}
                      question={faq.question}
                      answer={faq.answer}
                      category={faq.category}
                      isOpen={openItemId === faq.id}
                      toggleOpen={() => toggleItem(faq.id)}
                      helpful={faq.helpful}
                    />
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
                      <AlertCircle className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No results found</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <button
                      className="mt-4 inline-flex items-center px-4 py-2 border border-blue-500 rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                      }}
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
              
              {/* Popular Articles */}
              {filteredFAQs.length > 0 && (
                <div className="px-6 py-6 bg-gray-50 border-t border-gray-200 mt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Popular Articles</h3>
                  <div className="space-y-3">
                    <a href="/articles/getting-started" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      <span>Getting Started with DermaCare AI</span>
                    </a>
                    <a href="/articles/image-tips" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      <span>Tips for Taking High-Quality Skin Images</span>
                    </a>
                    <a href="/articles/understanding-results" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      <span>Understanding Your Analysis Results</span>
                    </a>
                    <a href="/articles/privacy-explained" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      <span>Your Privacy and Data Security Explained</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            {/* Additional Resources */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="/user-guide" className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-gray-800 mb-2">Complete User Guide</h4>
                  <p className="text-sm text-gray-600">Comprehensive guide to all features and functions of DermaCare AI.</p>
                </a>
                
                <a href="/tutorials" className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-gray-800 mb-2">Video Tutorials</h4>
                  <p className="text-sm text-gray-600">Step-by-step visual guides to using the platform effectively.</p>
                </a>
                
                <a href="/blog" className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-gray-800 mb-2">Skin Health Blog</h4>
                  <p className="text-sm text-gray-600">Educational articles on skin conditions, treatment approaches, and skincare.</p>
                </a>
                
                <a href="/glossary" className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-gray-800 mb-2">Dermatology Glossary</h4>
                  <p className="text-sm text-gray-600">Definitions and explanations of common dermatological terms.</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-12 px-4 mt-12">
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
              <li><a href="https://www.aad.org/public/everyday-care/skin-care-basics/care" className="hover:text-white transition-colors">Skin Care Guides</a></li>
              <li><a href="/support" className="hover:text-white transition-colors">Support</a></li>
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

export default FAQPage;