import React, { useEffect } from "react";
import SignupForm from "../../../components/Client/SignupForm/SignupForm";
import AuthServices from "../../../services/auth/authServices";
import { message, Spin } from "antd";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const formRef = React.useRef<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
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

      message.success("Account created successfully. Please login.");
      navigate("/login");

      // Clear form fields
      if (formRef.current) {
        formRef.current.resetFields();
      }
    } catch (err: any) {
      message.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
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
