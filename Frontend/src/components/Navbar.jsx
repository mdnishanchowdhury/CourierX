import { Link, useLocation } from "react-router-dom";
import { FaSignOutAlt, FaBars, FaUserCircle, FaBell, FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to false, set to true after login

  useEffect(() => {
    const handleClickOutside = () => {
      if (isProfileMenuOpen) setIsProfileMenuOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isProfileMenuOpen]);

  const getActiveLink = (path) => {
    return location.pathname === path ? "bg-yellow-300 text-gray-900" : "text-gray-800 hover:bg-yellow-300 hover:text-gray-900";
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and main menu */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  src="/logo.png"
                  alt="Company Logo"
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${getActiveLink("/")}`}
                >
                  Home
                </Link>
                <Link
                  to="/parcels"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${getActiveLink("/parcels")}`}
                >
                  Parcels
                </Link>
                <Link
                  to="/users"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${getActiveLink("/users")}`}
                >
                  Users
                </Link>
                <Link
                  to="/reports"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${getActiveLink("/reports")}`}
                >
                  Reports
                </Link>
              </div>
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {/* Search bar */}
              <div className="relative mx-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-600" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-yellow-300 bg-opacity-50 text-gray-800 placeholder-gray-600 focus:outline-none focus:bg-white focus:ring-2 focus:ring-yellow-600 focus:border-transparent sm:text-sm transition-all"
                />
              </div>

              {/* Notification bell */}
              {isLoggedIn && (
                <Link to="/notifications" className="relative p-1 rounded-full text-gray-700 hover:text-gray-900 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors">
                  <span className="sr-only">View notifications</span>
                  <FaBell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full border border-yellow-400"></span>
                  )}
                </Link>
              )}

              {/* Auth conditional rendering */}
              {!isLoggedIn ? (
                <div className="ml-3 flex space-x-2">
                  <Link
                    to="/login"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-yellow-300 hover:text-gray-900 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-yellow-300 hover:text-gray-900 transition-colors"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="ml-3 relative">
                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsProfileMenuOpen(!isProfileMenuOpen);
                      }}
                      className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      <span className="sr-only">Open user menu</span>
                      <FaUserCircle className="h-8 w-8 text-gray-700 hover:text-gray-900 transition-colors" />
                    </button>
                  </div>

                  <div
                    className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transition-all duration-150 ${isProfileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
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
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-yellow-400">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${getActiveLink("/")}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/parcels"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${getActiveLink("/parcels")}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Parcels
          </Link>
          <Link
            to="/users"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${getActiveLink("/users")}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Users
          </Link>
          <Link
            to="/reports"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${getActiveLink("/reports")}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Reports
          </Link>

          {/* Mobile search */}
          <div className="relative px-3 py-2">
            <div className="absolute inset-y-0 left-6 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-600" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="block w-full pl-12 pr-3 py-2 border border-transparent rounded-md leading-5 bg-yellow-300 bg-opacity-50 text-gray-800 placeholder-gray-600 focus:outline-none focus:bg-white focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-base transition-all"
            />
          </div>

          {isLoggedIn ? (
            <div className="pt-4 pb-3 border-t border-yellow-500">
              <div className="flex items-center px-5">
                <FaUserCircle className="h-10 w-10 text-gray-700" />
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">User Name</div>
                  <div className="text-sm font-medium text-gray-700">user@example.com</div>
                </div>
                <Link 
                  to="/notifications" 
                  className="ml-auto relative p-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaBell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-0 right-0 inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full"></span>
                  )}
                </Link>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-yellow-300 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-yellow-300 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-yellow-300 hover:text-gray-900 transition-colors flex items-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-yellow-500 space-y-2">
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-yellow-300 hover:text-gray-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-yellow-300 hover:text-gray-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;