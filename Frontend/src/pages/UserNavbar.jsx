import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaBars, FaUserCircle, FaBell, FaSearch } from "react-icons/fa";
import { logOut } from "../redux/userRedux";

const UserNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user?.currentUser);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const navLinkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? "bg-yellow-300 text-gray-900" : "text-gray-800 hover:bg-yellow-300 hover:text-gray-900"
    }`;

  return (
    <nav className="bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-semibold text-gray-900">CourierX</Link>
            <div className="hidden md:block ml-10 space-x-4">
              <NavLink to="/" className={navLinkClasses}>Home</NavLink>
              <NavLink to="/parcels" className={navLinkClasses}>Parcels</NavLink>
              <NavLink to="/users" className={navLinkClasses}>Users</NavLink>
              <NavLink to="/reports" className={navLinkClasses}>Reports</NavLink>
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-2.5 text-gray-600" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-3 py-2 rounded-md bg-yellow-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>

            {/* Notification */}
            <Link to="/notification">
              <button className="p-1 rounded-full text-gray-700 hover:text-gray-900 hover:bg-yellow-300 transition">
                <FaBell className="h-5 w-5" />
              </button>
            </Link>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center focus:outline-none"
              >
                <FaUserCircle className="h-8 w-8 text-gray-700" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1">
                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setIsProfileMenuOpen(false)}>Your Profile</Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setIsProfileMenuOpen(false)}>Settings</Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-yellow-300 transition"
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-yellow-400 transition-all">
          <NavLink to="/" className={navLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/parcels" className={navLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Parcels</NavLink>
          <NavLink to="/users" className={navLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Users</NavLink>
          <NavLink to="/reports" className={navLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Reports</NavLink>

          <div className="border-t border-yellow-300 pt-3">
            <div className="px-5">
              <div className="text-base font-medium">{user?.username || "User"}</div>
              <div className="text-sm text-gray-700">{user?.email || "user@example.com"}</div>
            </div>
            <div className="mt-3 space-y-1">
              <Link to="/profile" className={navLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Your Profile</Link>
              <Link to="/settings" className={navLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Settings</Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-medium text-gray-800 hover:bg-yellow-300 hover:text-gray-900 flex items-center"
              >
                <FaSignOutAlt className="mr-2" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
