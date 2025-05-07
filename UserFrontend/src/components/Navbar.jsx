import { Link } from "react-router-dom";
import {
  FaSignOutAlt,
  FaBars,
  FaUserCircle,
  FaBell,
  FaSearch,
} from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and main menu */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <h3 className="text-2xl font-bold text-gray-900">CourierX</h3>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link
                  to="/app/home"
                  className="text-gray-800 hover:bg-yellow-300 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/app/contacts"
                  className="text-gray-800 hover:bg-yellow-300 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Contact
                </Link>
                <Link
                  to="/app/reports"
                  className="text-gray-800 hover:bg-yellow-300 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Reports
                </Link>
                <Link
                  to="/app/parcels"
                  className="text-gray-800 hover:bg-yellow-300 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Orders
                </Link>
                <Link
                  to="/app/dashboard"
                  className="text-gray-800 hover:bg-yellow-300 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Create Parcel Button - More prominent */}
            <Link
              to="/app/newparcel"
              className="px-4 py-2 rounded-lg font-medium bg-white text-gray-900 hover:bg-gray-50 shadow-sm hover:shadow-md transition-all border border-yellow-600 flex items-center justify-center"
            >
              <span className="whitespace-nowrap">Create Parcel</span>
            </Link>

            {/* Search bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-600" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-yellow-300 bg-opacity-50 text-gray-800 placeholder-gray-600 focus:outline-none focus:bg-white focus:ring-2 focus:ring-yellow-600 focus:border-transparent sm:text-sm transition-all"
              />
            </div>

            {/* Notification bell */}
            <Link to="/app/notification">
              <button className="p-2 rounded-full text-gray-700 hover:text-gray-900 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors relative">
                <span className="sr-only">View notifications</span>
                <FaBell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            </Link>

            {/* Profile dropdown */}
            <div className="relative ml-2">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                <span className="sr-only">Open user menu</span>
                <FaUserCircle className="h-8 w-8 text-gray-700 hover:text-gray-900 transition-colors" />
              </button>

              {isProfileMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <Link
                    to="/app/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/app/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <FaSignOutAlt className="mr-2" />
                    Sign out
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link
              to="/app/newparcel"
              className="mr-2 px-3 py-1.5 rounded-lg font-medium bg-white text-gray-900 hover:bg-gray-50 shadow-sm text-sm"
            >
              Create
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              <FaBars className="block h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-yellow-400">
            <Link
              to="/app/home"
              className="text-gray-800 hover:bg-yellow-300 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/app/dashboard"
              className="text-gray-800 hover:bg-yellow-300 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/app/parcels"
              className="text-gray-800 hover:bg-yellow-300 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Parcels
            </Link>
            <Link
              to="/app/users"
              className="text-gray-800 hover:bg-yellow-300 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Users
            </Link>
            <Link
              to="/app/reports"
              className="text-gray-800 hover:bg-yellow-300 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Reports
            </Link>
            <Link
  to="/app/newparcel"
  className="block px-6 py-3 rounded-lg font-medium text-white transition-colors bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
  onClick={() => setIsMobileMenuOpen(false)}
>
  Create Parcel
</Link>

            <div className="pt-4 pb-3 border-t border-yellow-500">
              <div className="flex items-center px-5">
                <FaUserCircle className="h-10 w-10 text-gray-700" />
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    User Name
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    user@example.com
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link
                  to="/app/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-yellow-300 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  to="/app/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-yellow-300 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-yellow-300 hover:text-gray-900 flex items-center transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaSignOutAlt className="mr-2" />
                  Sign out
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;