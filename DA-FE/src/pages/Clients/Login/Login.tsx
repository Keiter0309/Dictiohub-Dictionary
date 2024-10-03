import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthServices from "../../../services/auth/authServices";
import LoginForm from "../../../components/Client/LoginForm/LoginForm";
import { Toast } from "../../../utils/ToastData/Toast";
import { Cookies } from "react-cookie";

const Login: React.FC = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies.get("token");
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogin = async (email: string, password: string) => {
    try {
      await AuthServices.login(email, password);
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
