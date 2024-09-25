import React, { useEffect } from "react";
import SignupForm from "../../../components/Client/SignupForm/SignupForm";
import AuthServices from "../../../services/auth/authServices";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Spin } from "antd";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const formRef = React.useRef<any>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSignup = async (
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    confirmPassword: string
  ) => {
    setLoading(true);
    try {
      await AuthServices.register(
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPassword
      );

      showSwal("User registered successfully", "success");
      navigate("/login");

      // Clear form fields
      if (formRef.current) {
        formRef.current.resetFields();
      }
    } catch (err: any) {
      showSwal(err.message, "error");
    } finally {
      setLoading(false);
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
    <div className="signup-wrapper">
      <SignupForm onSubmit={handleSignup} />
      {loading && (
        <div className="spin-container">
          <Spin size="large" className="custom-spin" />
        </div>
      )}
    </div>
  );
};

export default Signup;