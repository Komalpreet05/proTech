import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import VisitorLayout from "./VisitorLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import StudentProfile from "./pages/StudentProfile";
import Landing from "./pages/LandingPage/LandingPage";
import TeachingSetup from "./pages/TeachingSetup";
import AboutUs from "./pages/About";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes for visitors (No Navbar, No Footer) */}
        <Route element={<VisitorLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} /> {/* Merged AboutUs */}
        </Route>

        {/* Routes for authenticated users (With Navbar & Footer) */}
        <Route element={<Layout />}>
          <Route path="/dashboard/:teacherName" element={<Dashboard />} />
          <Route path="/studentprofile/:studentName" element={<StudentProfile />} /> {/* Used /student/:id */}
          <Route path="/getstarted" element={<TeachingSetup />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;