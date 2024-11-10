import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthServices from "../../../services/auth/authServices";
import LoginForm from "../../../components/Client/LoginForm/LoginForm";
import { message } from "antd";

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogin = async (email: string, password: string) => {
    try {
      await AuthServices.login(email, password);
      message.success("User logged in successfully");
      navigate("/");
    } catch (err: any) {
      message.error("Invalid email or password");
    }
  };

  return (
    <div className="login-wrapper">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
