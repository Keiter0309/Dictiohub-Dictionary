import React, { useState } from 'react';
import { Form, Input, Button, Alert, Typography, message as msg } from 'antd';
import { CheckCircle, AlertCircle } from 'lucide-react';
import authServices from '../../../services/auth/authServices';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const ChangeForm: React.FC = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      setIsSubmitting(false);
      return;
    }

    try {
      await authServices.changePassword(
        oldPassword,
        newPassword,
        confirmPassword,
      );
      setIsSubmitting(false);
      // setMessage({
      //   type: 'success',
      //   text: 'Your password has been successfully reset.',
      // });
      msg.success('Your password has been successfully reset.');
      localStorage.removeItem('token');
      navigate('/login');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setIsSubmitting(false);
      setMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <Title level={2} className="text-center" style={{ color: '#1d4ed8' }}>
          Change Password
        </Title>
        <Form onFinish={handleSubmit} layout="vertical" className="space-y-4">
          <Form.Item
            label="Old Password"
            name="old password"
            rules={[
              { required: true, message: 'Please input your old password!' },
            ]}
          >
            <Input.Password
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border-blue-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="new password"
            rules={[
              { required: true, message: 'Please input your new password!' },
            ]}
          >
            <Input.Password
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border-blue-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            rules={[
              { required: true, message: 'Please confirm your new password!' },
            ]}
          >
            <Input.Password
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border-blue-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              block
            >
              {isSubmitting ? 'Changing...' : 'Change Password'}
            </Button>
          </Form.Item>
        </Form>
        {message && (
          <Alert
            message={message.text}
            type={message.type}
            showIcon
            icon={
              message.type === 'success' ? <CheckCircle /> : <AlertCircle />
            }
            style={{ marginTop: '24px' }}
          />
        )}
        <div className="mt-6 text-center">
          <a href="/login" className="text-blue-600 hover:text-blue-800">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChangeForm;
