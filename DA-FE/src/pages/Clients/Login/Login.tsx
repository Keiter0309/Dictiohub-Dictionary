import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../../components/Client/LoginForm/LoginForm';
import { message } from 'antd';
import useAuthStore from '../../../stores/authStore';
import { LoginFormProps } from '../../../types/Users/Auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {login} = useAuthStore()

  const handleLogin = async (formData: LoginFormProps) => {
    try {
      login(formData)
      navigate('/');
    } catch (err: any) {
      message.error('Invalid email or password');
    }
  };

  return (
    <div className="login-wrapper">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
