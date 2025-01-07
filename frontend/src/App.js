import React, { useState, useEffect, useContext } from "react";
import NavbarComponent from "./components/Navbar";
import AdminDashboard from "./pages/Dashboard";
import HomePage from "./pages/Home_page";
import Services_page from "./pages/Services_page";
import About_page from "./pages/About_page";
import AdminPage from "./pages/Admin_page";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, AuthContext } from "./context/AuthContext";
import ConnectionContext from "./context/ConnectionContext";
import $Auth from "./pages/$auth";
import $Db from "./pages/$db";
import Footer from "./sections/Footer";

function App() {
  const isOnline = useContext(ConnectionContext);

  return (
    <AuthProvider>
      {!isOnline && <p className="bg-red-500 text-white p-2">No internet connection</p>}
      <Router>
        <AuthContext.Consumer>
          {({ user, admin }) => (
            <>
              {!user && <NavbarComponent />}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<Services_page />} />
                <Route path="/about" element={<About_page />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/$/auth" element={<$Auth />} />
                <Route path="/$/auth/db" element={<$Db />} />
              </Routes>
            </>
          )}
        </AuthContext.Consumer>
      </Router>
      <Footer />
    </AuthProvider>
  );
}

export default App;
