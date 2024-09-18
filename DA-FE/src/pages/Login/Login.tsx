import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthServices from "../../services/auth/authServices";
import withReactContent from "sweetalert2-react-content";
import LoginForm from "../../components/LoginForm/LoginForm";
import Swal from "sweetalert2";

const Login: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);
  const handleLogin = async (email: string, password: string) => {
    try {
      await AuthServices.login(email, password);
      showSwal("User logged in successfully", "success");
    } catch (err: any) {
      showSwal(err.message, "error");
    }
  };

  const showSwal = (message: string, icon: "success" | "error") => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      toast: true,
      text: message,
      icon: icon,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  return (
    <div className="login-wrapper">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
