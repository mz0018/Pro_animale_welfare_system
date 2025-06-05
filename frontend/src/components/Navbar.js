import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBriefcase, FaInfoCircle, FaSignInAlt, FaBars } from 'react-icons/fa';

function NavbarComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-[#FAF9F6] p-4 sticky z-50 top-0 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-9xl font-bold text-green-600 cursor-pointer">
          P <span>Λ</span>W S
        </h1>

        <div className="hidden lg:flex justify-center items-center space-x-8">
          <a
            href="#home"
            className="flex text-xs p-5 rounded-md items-center font-bold text-green-600 hover:bg-gray-100 bg-opacity-30"
          >
            <FaHome className="text-3xl mr-2 font-bold" />
            <span>HOME</span>
          </a>
          <a
            href="#services"
            className="flex text-xs p-5 rounded-md items-center font-bold text-green-600 hover:bg-gray-100 bg-opacity-30"
          >
            <FaBriefcase className="text-3xl mr-2 font-bold" />
            <span>SERVICES</span>
          </a>
          <a
            href="#about"
            className="flex text-xs p-5 rounded-md items-center font-bold text-green-600 hover:bg-gray-100 bg-opacity-30"
          >
            <FaInfoCircle className="text-3xl mr-2 font-bold" />
            <span>ABOUT</span>
          </a>
          <a
            href="#admin"
            className="flex text-xs p-5 rounded-md items-center font-bold text-green-600 hover:bg-gray-100 bg-opacity-30"
          >
            <FaSignInAlt className="text-3xl mr-2 font-bold" />
            <span>SIGN IN</span>
          </a>
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
            <a
              href="#home"
              className="font-bold text-green-600 hover:text-green-500"
              onClick={toggleMobileMenu}
            >
              Home
            </a>
            <a
              href="#services"
              className="font-bold text-green-600 hover:text-green-500"
              onClick={toggleMobileMenu}
            >
              Services
            </a>
            <a
              href="#about"
              className="font-bold text-green-600 hover:text-green-500"
              onClick={toggleMobileMenu}
            >
              About
            </a>
            <a
              href="#admin"
              className="font-bold text-green-600 hover:text-green-500"
              onClick={toggleMobileMenu}
            >
              Sign In
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavbarComponent;
