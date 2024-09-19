import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Menu, X } from "lucide-react";

const NavbarForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  let navItems = [
    { to: "/", label: "Home" },
    { to: "/thesaurus", label: "Thesaurus " },
    { to: "/about", label: "About" },
    { to: "/login", label: "Login" },
  ];

  if (sessionStorage.getItem("token")) {
    navItems = navItems.filter((item) => item.to !== "/login");

    navItems.push({ to: "/logout", label: "Logout" });
  }

  const handleLogoutClick = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  }

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
          <nav className="hidden md:flex space-x-4 ml-auto">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={item.to === "/logout" ? handleLogoutClick : undefined}
                className="text-gray-500 hover:text-gray-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
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
        <div className="bg-white w-64 h-full shadow-lg transition-transform transform">
          <div className="flex justify-between items-center p-4 border-b">
            <span className="text-xl font-bold text-gray-900">DictioHub</span>
            <button onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
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
