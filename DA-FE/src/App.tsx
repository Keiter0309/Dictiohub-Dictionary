import "./index.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Clients/Signup/Signup";
import Login from "./pages/Clients/Login/Login";
import Dashboard from "./pages/Clients/Dashboard/Dashboard";
import AdminDashboard from "./pages/Admin/Dashboard/Dashboard";
import React from "react";
import AdminLogin from "./pages/Admin/LoginForm/LoginForm";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  );
};
export default App;
