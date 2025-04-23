import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./Components/Signup";
import LoginPage from "./Components/Login";
import HomePage from "./Components/Homepage";
import Dashboard from "./Components/Dashboard";
import LearnMorePage from "./Components/LearnMore";
import FAQPage from "./Components/FAQ";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learn-more" element={<LearnMorePage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 