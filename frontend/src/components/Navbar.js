import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBriefcase, FaInfoCircle, FaSignInAlt, FaBars } from 'react-icons/fa';

function NavbarComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-600 cursor-pointer">
          <img
            src={`${process.env.PUBLIC_URL}/vendor/assets/img/logo.png`}
            alt="logo"
            className="w-24 h-24 rounded-full transition-all transform duration-500"
          />
        </h1>

        <div className="hidden lg:flex justify-center items-center space-x-8">
          <Link
            to="/"
            className="flex items-center font-bold text-green-600 hover:text-green-500"
          >
            <FaHome className="text-3xl mr-2 font-bold" />
            <span>Home</span>
          </Link>
          <Link
            to="/services"
            className="flex items-center font-bold text-green-600 hover:text-green-500"
          >
            <FaBriefcase className="text-3xl mr-2 font-bold" />
            <span>Services</span>
          </Link>
          <Link
            to="/about"
            className="flex items-center font-bold text-green-600 hover:text-green-500"
          >
            <FaInfoCircle className="text-3xl mr-2 font-bold" />
            <span>About</span>
          </Link>
          <Link
            to="/admin"
            className="flex items-center font-bold text-green-600 hover:text-green-500"
          >
            <FaSignInAlt className="text-3xl mr-2 font-bold" />
            <span>Sign In</span>
          </Link>
        </div>

        <button
          className="lg:hidden text-green-600"
          onClick={toggleMobileMenu}
        >
          <FaBars className="text-2xl" />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <div className="flex flex-col space-y-4 p-4">
            <Link
              to="/"
              className="font-bold text-green-600 hover:text-green-500"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/services"
              className="font-bold text-green-600 hover:text-green-500"
              onClick={toggleMobileMenu}
            >
              Services
            </Link>
            <Link
              to="/about"
              className="font-bold text-green-600 hover:text-green-500"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              to="/admin"
              className="font-bold text-green-600 hover:text-green-500"
              onClick={toggleMobileMenu}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavbarComponent;
