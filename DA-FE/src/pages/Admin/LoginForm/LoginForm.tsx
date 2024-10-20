import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLoginForm from "../../../components/Admin/LoginForm/LoginForm";
import { AdminServices } from "../../../services/admin/adminServices"; // Adjusted import
import { message } from "antd";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      sessionStorage.removeItem("token");
      message.warning("Session expired. Please login again.");
      navigate("/admin/login");
    }, 900000); // 15 minutes

    return () => clearTimeout(timeout);
  }, [navigate]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const accessToken = await AdminServices.loginAdmin(email, password);
      if (accessToken) {
        sessionStorage.setItem("token", accessToken);
        navigate("/admin/dashboard");
      } else {
        message.error("Invalid email or password");
      }
    } catch (err: any) {
      message.error("Invalid email or password");
      console.error(err.message);
    }
  };

  return (
    <div>
      <AdminLoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default AdminLogin;