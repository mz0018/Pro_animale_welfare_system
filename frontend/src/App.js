import React, { useContext } from "react";
import NavbarComponent from "./components/Navbar";
import AdminDashboard from "./pages/Dashboard";
import HomePage from "./pages/Home_page";
import About_page from "./pages/About_page";
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
      {!isOnline && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-40 backdrop-blur-md text-white flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white border-opacity-70"></div>
          <p className="text-2xl font-bold">No internet connection</p>
        </div>
      )}
      <Router>
        <AuthContext.Consumer>
          {({ user }) => (
            <>
              {!user && <NavbarComponent />}
              <Routes>
                <Route path="/" element={
                  <>
                    <HomePage />
                  </>
                } />
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<About_page />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/$/auth" element={<$Auth />} />
                <Route path="/$/auth/db" element={<$Db />} />
              </Routes>
              <Footer />
            </>
          )}
        </AuthContext.Consumer>
      </Router>
    </AuthProvider>
  );
}


export default App;
