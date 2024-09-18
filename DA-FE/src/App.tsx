import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import React from "react";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
export default App;
