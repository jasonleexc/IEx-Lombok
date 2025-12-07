import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using react-router-dom

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        
        {/* Left Section: Logo/Home Link */}
        <Link to="/" className="text-2xl font-serif tracking-tight text-gray-900 font-bold">
          Shell-utions
        </Link>

        {/* Center Section: Main Navigation Links (Your Content) */}
        <nav className="hidden lg:flex space-x-8 text-sm font-semibold text-gray-700">
          <Link to="/" className="hover:text-gray-900 transition duration-150">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-900 transition duration-150">
            About
          </Link>
          <a href="#" className="hover:text-gray-900 transition duration-150">
            More 1
          </a>
          <a href="#" className="hover:text-gray-900 transition duration-150">
            More 2
          </a>
        </nav>

        {/* Right Section: Auth/Account Links */}
        <div className="flex items-center space-x-6">
          {/* Example of Find Product/Quick Search (optional) */}
          <span className="text-sm text-gray-500 hidden sm:block cursor-pointer hover:text-gray-900 transition duration-150">
             Search
          </span>

          <div className="flex items-center space-x-4">
            
            {/* Cart/Account Icon */}
            <span className="text-xl text-gray-700 hover:text-gray-900 cursor-pointer">
              🛒 (0)
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;