import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLoginForm from "../../../components/Admin/LoginForm/LoginForm";
import { AdminServices } from "../../../services/admin/adminServices"; // Adjusted import
import { Toast } from "../../../utils/ToastData/Toast";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();

  const showSwal = Toast;

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      sessionStorage.removeItem("token");
      showSwal("Session expired, please login again", "error");
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
        showSwal("Invalid login credentials", "error");
      }
    } catch (err: any) {
      showSwal("An error occurred during login", "error");
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