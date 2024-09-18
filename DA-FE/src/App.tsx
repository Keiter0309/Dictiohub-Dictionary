import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import React from "react";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};
export default App;
