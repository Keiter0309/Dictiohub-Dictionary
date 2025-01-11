import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthServices from '../../../services/auth/authServices';
import LoginForm from '../../../components/Client/LoginForm/LoginForm';
import { message } from 'antd';
import useAuthStore from '../../../stores/authStore';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setAuthenticated } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      await AuthServices.checkAuth();
      if (isAuthenticated) {
        navigate('/');
      }
    };
    checkAuth();
  }, [navigate, setAuthenticated]);

  const handleLogin = async (email: string, password: string) => {
    try {
      await AuthServices.login(email, password);
      message.success('Logged in successfully');
      setAuthenticated(true);
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
