import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBriefcase, FaInfoCircle, FaSignInAlt, FaBars } from 'react-icons/fa';

function NavbarComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-600 cursor-pointer">
          P A W S
        </h1>

        <div className="hidden lg:flex space-x-8">
          <Link to="/" className="flex items-center text-gray-700 hover:text-green-500">
            <FaHome className="text-2xl mr-2" />
            <span>Home</span>
          </Link>
          <Link to="/services" className="flex items-center text-gray-700 hover:text-green-500">
            <FaBriefcase className="text-2xl mr-2" />
            <span>Services</span>
          </Link>
          <Link to="/about" className="flex items-center text-gray-700 hover:text-green-500">
            <FaInfoCircle className="text-2xl mr-2" />
            <span>About</span>
          </Link>
          <Link to="/admin" className="flex items-center text-gray-700 hover:text-green-500">
            <FaSignInAlt className="text-2xl mr-2" />
            <span>Sign In</span>
          </Link>
        </div>

        <button
          className="lg:hidden text-gray-700"
          onClick={toggleMobileMenu}
        >
          <FaBars className="text-2xl" />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <div className="flex flex-col space-y-4 p-4">
            <Link to="/" className="text-gray-700 hover:text-green-500" onClick={toggleMobileMenu}>
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-green-500" onClick={toggleMobileMenu}>
              Services
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-green-500" onClick={toggleMobileMenu}>
              About
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-green-500" onClick={toggleMobileMenu}>
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavbarComponent;
