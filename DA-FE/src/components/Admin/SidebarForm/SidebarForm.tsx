import React from "react";
import "./SidebarForm-module.css";
import {
  BookOpen,
  Heart,
  Layout,
  Settings,
  Users,
  Archive,
  Circle,
} from "lucide-react";
import { Link } from "react-router-dom";

const SidebarForm: React.FC = () => {
  const [active, setActive] = React.useState("Dashboard");
  const [open, setOpen] = React.useState(true);
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

  return (
    <div
    id="container"
      className="flex h-screen bg-gray-100 transition-transform transform"
    >
      {/* Sidebar */}
      <aside
        id="container_sidebar"
        className={`bg-white shadow-md transition-all duration-300 ease-in-out group ${
          open ? "w-64" : "w-20 hover:w-64 group-hover:w-64"
        }`}
      >
        <div className="p-4">
          <div className="text-2xl font-bold text-gray-800">
            <div className="flex justify-between items-center">
              {open && <span className="mr-5">DictioHub Admin</span>}
              <Circle
                className="h-4 w-4 text-blue-600 hover:text-blue-800 hover:cursor-pointer duration-200"
                onClick={handleClickSidebar}
              />
            </div>
          </div>

          <nav className="mt-6">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                to="#"
                className={`relative flex items-center justify-between py-2 px-[0.75rem] rounded-lg ${
                  active === item.name
                    ? "bg-blue-500 text-white duration-200 ease-in-out"
                    : "text-gray-700 hover:bg-slate-100 duration-200"
                }`}
                onClick={() => setActive(item.name)}
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
                {!open && (
                  <span className="absolute left-20 bg-white text-gray-700 shadow-lg rounded-lg px-2 py-1 text-sm font-semibold opacity-0  transition-opacity duration-300">
                    {item.name}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {(active ?? "").charAt(0).toUpperCase() + (active ?? "").slice(1)}
          </h2>
        </div>

        {/* Dashboard content */}
        {active === "Dashboard" && (
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900">Dashboard</h3>
            <p className="text-gray-600 mt-2">Welcome to the admin dashboard</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SidebarForm;
