import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./Components/Signup";
import LoginPage from "./Components/Login";
import HomePage from "./Components/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 