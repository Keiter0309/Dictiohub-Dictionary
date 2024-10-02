import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthServices from "../../../services/auth/authServices";
import LoginForm from "../../../components/Client/LoginForm/LoginForm";
import Toast from "../../../utils/ToastData/Toast";

const Login: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);
  const handleLogin = async (email: string, password: string) => {
    try {
      await AuthServices.login(email, password);
      sessionStorage.setItem("token", "true");
      showSwal("User logged in successfully", "success");
      navigate("/");
    } catch (err: any) {
      showSwal(err.message, "error");
    }
  };

  const showSwal = Toast;

  return (
    <div className="login-wrapper">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
