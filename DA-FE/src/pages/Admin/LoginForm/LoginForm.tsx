import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLoginForm from '../../../components/Admin/LoginForm/LoginForm';
import { AdminServices } from '../../../services/admin/adminServices';
import { message } from 'antd';
import authServices from '../../../services/auth/authServices';
import useAuthStore from '../../../stores/authStore';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setAuthenticated } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authServices.checkAuth();
        if (response === null) {
          // Token expired, navigate to login
          navigate('/admin/login');
        } else if (isAuthenticated) {
          navigate('/admin/dashboard');
        }
      } catch (error) {
        console.error('User is not authenticated', error);
      }
    };
    checkAuth();
  }, [navigate, setAuthenticated, isAuthenticated]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      message.warning('Session expired. Please login again.');
      navigate('/admin/login');
    }, 900000); // 15 minutes

    return () => clearTimeout(timeout);
  }, [navigate]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await AdminServices.loginAdmin(email, password);
      if (response) {
        setAuthenticated(true);
        navigate('/admin/dashboard');
      } else {
        message.error('Invalid email or password');
      }
    } catch (err: any) {
      message.error('Invalid email or password');
      message.error(err.response.data.message);
      console.error(err.message);
    }
  };

  return (
    <div>
      <AdminLoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default AdminLogin;
