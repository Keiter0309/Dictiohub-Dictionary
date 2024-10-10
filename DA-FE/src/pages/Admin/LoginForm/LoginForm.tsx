import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLoginForm from "../../../components/Admin/LoginForm/LoginForm";
import { AdminServices } from "../../../services/admin/adminServices";
import { Toast } from "../../../utils/ToastData/Toast";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("tokena");
    if (token) {
      navigate("/admin/dashboard");
      // if token expires, the user will be logged out
      setTimeout(() => {
        sessionStorage.removeItem("tokena");
        showSwal("Session expired, please login again", "error");
        navigate("/admin/login");
      }, 900000);
    }
  }, [navigate]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const accessToken = await AdminServices.loginAdmin(email, password);
      sessionStorage.setItem("tokena", accessToken);
      showSwal("Admin logged in successfully", "success");
      navigate("/admin/dashboard");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const showSwal = Toast;

  return (
    <>
      <div className="">
        <AdminLoginForm onSubmit={handleLogin} />
      </div>
    </>
  );
};

export default AdminLogin;
