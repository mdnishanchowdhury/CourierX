import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/service" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
  { name: "About", path: "/aboutUp" },
];

const HomeNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const getTextColor = scrolled ? "text-gray-800" : "text-black";
  const getHoverTextColor = scrolled ? "hover:text-yellow-600" : "hover:text-gray-100";
  const navBg = scrolled
    ? "bg-white/90 shadow-md backdrop-blur-lg"
    : "bg-gradient-to-r from-yellow-400 to-yellow-500";

  const loginBtnClass = `ml-4 px-5 py-2 rounded-md font-medium transition-all duration-300 ${
    scrolled
      ? "bg-yellow-600 text-black hover:bg-yellow-700 shadow"
      : "bg-white text-black hover:bg-red-500 shadow"
  }`;

  const renderNavLink = (item) => (
    <div key={item.name} className="relative group">
      <Link
        to={item.path}
        className={`px-4 py-2 rounded-md flex items-center font-medium transition-colors ${getTextColor} ${getHoverTextColor}`}
      >
        {item.name}
        {item.submenu && <FiChevronDown className="ml-1" />}
      </Link>
      {item.submenu && (
        <div className="absolute left-0 mt-2 w-48 origin-top-right scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 z-40">
          <div className="bg-white rounded-md shadow-lg py-1">
            {item.submenu.map((subItem) => (
              <Link
                key={subItem}
                to={`/${subItem.toLowerCase()}`}
                className="block px-4 py-2 text-gray-800 hover:bg-yellow-300 hover:text-gray-900 transition-colors"
              >
                {subItem}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className={`text-2xl font-bold transition-transform duration-300 hover:scale-105 ${
              scrolled
                ? "bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-yellow-800"
                : "text-black"
            }`}
          >
            CourierX
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(renderNavLink)}
            <Link to="/login" className={loginBtnClass}>
              Login
            </Link>
            <Link to="/register" className={loginBtnClass}>
            Sign up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden p-2 rounded-md focus:outline-none transition-colors ${getTextColor}`}
            aria-label="Menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`px-4 pb-4 ${
            scrolled
              ? "bg-white"
              : "bg-gradient-to-r from-yellow-400 to-yellow-500"
          }`}
        >
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={closeMenu}
              className={`block px-4 py-3 rounded-md font-medium transition-colors ${
                scrolled
                  ? "text-gray-800 hover:bg-yellow-100"
                  : "text-black hover:bg-yellow-300"
              }`}
            >
              {item.name}
            </Link>
          ))}
          {["login", "register"].map((type) => (
            <Link
              key={type}
              to={`/${type}`}
              onClick={closeMenu}
              className={`block mt-2 px-4 py-3 rounded-md font-medium text-center transition-colors ${
                scrolled
                  ? "bg-white text-black hover:bg-yellow-700"
                  : "bg-white text-black hover:bg-red-500"
              }`}
            >
              {type === "login" ? "Login" : "Sign up"}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default HomeNav;
