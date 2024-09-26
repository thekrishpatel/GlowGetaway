import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./frontend/NavBar";
import Footer from "./frontend/footer";
import HomePage from "./frontend/HomePage";
import LoginPage from "./frontend/Login";
import SignupPage from "./frontend/Signup"; // Import the SignupPage component
import Hotel from "./frontend/Hotel";
import HotelInfo from "./frontend/HotelInfo";
import ItineraryPage from "./frontend/ItineraryPage";
import AboutUs from "./frontend/AboutUs";
import Profile from './frontend/Profile'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Fixed Navbar */}
        <div className="content" style={{ marginTop: "80px", marginBottom: "80px" }}>
          {/* Routed Pages will appear here */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} /> {/* Route for SignupPage */}
            <Route path="/destinations" element={<ItineraryPage />} /> {/* Route for Destination */}
            <Route path="/hotels" element={<Hotel />} /> {/* Route for Destination */}
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/hotels/:id" element={<HotelInfo />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer /> {/* Fixed Footer */}
      </div>
    </Router>
  );
}

export default App;
