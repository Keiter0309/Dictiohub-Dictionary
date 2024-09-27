import React from "react";
import "./SidebarForm-module.css";
import {
  BookOpen,
  Heart,
  Layout,
  Settings,
  Users,
  Menu,
  X,
  Archive,
  Circle,
} from "lucide-react";
import { Link } from "react-router-dom";

const SidebarForm: React.FC = () => {
  const [active, setActive] = React.useState("Dashboard");
  const [open, setOpen] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const sidebarItems = [
    { name: "Dashboard", icon: <Layout /> },
    { name: "Users", icon: <Users /> },
    { name: "Settings", icon: <Settings /> },
    { name: "Words", icon: <BookOpen /> },
    { name: "Categories", icon: <Archive /> },
    { name: "Favorites", icon: <Heart /> },
  ];

  const handleClickSidebar = () => {
    setOpen(!open);
  };

  const handleMobileClick = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div
      id="container"
      className="flex h-screen bg-gray-100 transition-transform transform"
    >
      {/* Sidebar */}
      <aside
        id="container_sidebar"
        className={`bg-white shadow-md transition-all duration-300 ease-in-out group ${
          open ? "w-64 open" : "w-20 hover:w-64 group-hover:w-64"
        } fixed md:relative inset-0 z-50 md:z-auto ${
          mobileOpen ? "translate-x-0" : "md:translate-x-0 -translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="text-2xl font-bold text-gray-800">
            <div className="flex justify-between items-center">
              {open && <span className="mr-5">DictioHub Admin</span>}
              <Circle
                className="hidden md:flex h-4 w-4 text-blue-600 hover:text-blue-800 hover:cursor-pointer duration-200"
                onClick={handleClickSidebar}
              />
              <X
                className="h-6 w-6 text-blue-600 hover:text-blue-800 hover:cursor-pointer duration-200 md:hidden"
                onClick={handleMobileClick}
              />
            </div>
          </div>

          <nav className="mt-6">
            {sidebarItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to="#"
                  className={`flex items-center justify-between py-2 px-[0.75rem] rounded-lg ${
                    active === item.name
                      ? "bg-blue-500 text-white duration-200 ease-in-out"
                      : "text-gray-700 hover:bg-slate-100 duration-200"
                  }`}
                  onClick={() => {
                    setActive(item.name);
                    setMobileOpen(false);
                  }}
                >
                  <span className="flex items-center">
                    {item.icon}
                    {open ? (
                      <span className="ml-2 text-sm font-semibold">
                        {item.name}
                      </span>
                    ) : (
                      <span className="ml-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.name}
                      </span>
                    )}
                  </span>
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`flex-1 overflow-y-auto py-5 px-8 transition-all duration-300 transform ${
          !open ? "ml-20" : "ml-0"
        }`}
      >
        <div className="transition-all duration-200 bg-white py-5 rounded-md mb-8 shadow-lg">
          <div className="flex justify-between align-top items-center">
            <div>
              <Menu
                className="h-8 w-8 ms-3 text-gray-800 duration-200 hover:cursor-pointer md:hidden"
                onClick={handleMobileClick}
              />
            </div>

            <div></div>

            <div className="mr-5">
              <img
                src="https://avatar.iran.liara.run/public"
                alt="Avatar"
                className="h-10 w-10 rounded-full hover:cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        {active === "Dashboard" && (
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900">Dashboard</h3>
            <p className="text-gray-600 mt-2">Welcome to the admin dashboard</p>
          </div>
        )}
      </main>

      {/* Overlay for mobile sidebar */}
      <div
        className={`fixed inset-0 bg-black transition-opacity ${
          mobileOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      ></div>
    </div>
  );
};

export default SidebarForm;
