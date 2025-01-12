import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLoginForm from '../../../components/Admin/LoginForm/LoginForm';
import { AdminServices } from '../../../services/admin/adminServices';
import { message } from 'antd';
import { LoginFormProps } from '../../../types/Users/Auth';


const AdminLogin: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (formData: LoginFormProps) => {
    try {
      const response = await AdminServices.loginAdmin(formData.email, formData.password);
      if (response) {
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
