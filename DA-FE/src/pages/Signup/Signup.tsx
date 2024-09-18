import React from "react";
import SignupForm from "../../components/SignupForm/SignupForm";
import AuthServices from "../../services/auth/authServices";

const Signup: React.FC = () => {
  const handleSignup = async (
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      await AuthServices.register(
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPassword
      );
    } catch (err) {
      console.error(err);
    }
  };

  return <SignupForm onSubmit={handleSignup} />;
};

export default Signup;
