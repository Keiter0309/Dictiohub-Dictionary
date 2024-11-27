import React, { useState } from 'react';
import { Form, Input, Button, Alert, Typography, message as msg } from 'antd';
import { CheckCircle, AlertCircle } from 'lucide-react';
import authServices from '../../../services/auth/authServices';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const ResetForm: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      setIsSubmitting(false);
      return;
    }

    try {
      await authServices.resetPassword(password, confirmPassword, Number(otp));
      setIsSubmitting(false);
      msg.success('Password reset successful');
      setPassword('');
      setConfirmPassword('');
      navigate('/login');
    } catch (err: any) {
      setIsSubmitting(false);
      msg.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <Title level={2} className="text-center" style={{ color: '#1d4ed8' }}>
          Reset Password
        </Title>
        <Form onFinish={handleSubmit} layout="vertical" className="space-y-4">
          <Form.Item
            label="OTP"
            name="otp"
            rules={[
              { required: true, message: 'Please input your OneTime Password' },
            ]}
          >
            <Input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border-blue-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your new password!' },
            ]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
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

export default ResetForm;
