import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Menu, X, ArrowLeft } from "lucide-react";
import { Cookies } from "react-cookie";

const NavbarForm: React.FC = () => {
  const cookies = new Cookies();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isLogged = cookies.get("token");

  let navItems = [
    { to: "/", label: "Home" },
    { to: "/thesaurus", label: "Thesaurus" },
    { to: "/about", label: "About" },
  ];

  let avatarItems = [
    { to: "/profile", label: "Profile" },
    { to: "/favorites", label: "Favorites" },
    { to: "/logout", label: "Logout" },
  ];

  const handleLogoutClick = () => {
    cookies.remove("token");
    localStorage.removeItem("favorites");
    window.location.href = "/";
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              DictioHub
            </span>
          </Link>
          <nav className="hidden md:flex flex-1 justify-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-gray-500 hover:text-gray-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {/* Dropdown Profile */}
          {isLogged ? (
            <div className="items-center ml-4 hidden md:flex">
              <div className="relative">
                <button
                  className="flex items-center"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <img
                    src="https://avatar.iran.liara.run/public"
                    alt="Avatar"
                    className="h-10 w-10 rounded-full hover:cursor-pointer"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    {avatarItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => {
                          if (item.to === "/logout") {
                            handleLogoutClick();
                          }
                          setIsDropdownOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Login
            </Link>
          )}
          <button
            className="md:hidden flex items-center ml-auto"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>
      <div
        className={`fixed inset-0 flex justify-end z-50 transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-white w-64 h-full shadow-lg transition-transform transform flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <span className="text-xl font-bold text-gray-900">DictioHub</span>
            <button onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <div className="flex flex-col justify-between flex-grow">
            <div className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block text-gray-500 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="p-4 mt-auto border-t">
              {isLogged ? (
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md duration-300"
                  onClick={() => {
                    handleLogoutClick();
                    setIsOpen(false);
                  }}
                >
                  <div className="flex">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="ml-2">Logout</span>
                  </div>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-black transition-opacity ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
    </header>
  );
};

export default NavbarForm;
