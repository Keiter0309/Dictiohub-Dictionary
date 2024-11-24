import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Alert, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { message as antdMessage } from 'antd';

const { Title, Text } = Typography;

const ForgotForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setMessage('');

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setMessage('If an account exists for this email, a password reset link has been sent.');
    setEmail('');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
      antdMessage.info('You are already logged in');
    } else {
      navigate('/forgot-password');
    }
  }, [navigate])

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <Title level={2} className="text-center" style={{ color: '#1d4ed8' }}>Forgot Password</Title>
        <Text className="text-center" style={{ display: 'block', marginBottom: '24px', color: '#6b7280' }}>
          Enter your email address and we'll send you a link to reset your password.
        </Text>
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              block
            >
              {isSubmitting ? 'Sending...' : 'Reset Password'}
            </Button>
          </Form.Item>
        </Form>
        {message && (
          <Alert
            message={message}
            type="info"
            showIcon
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

export default ForgotForm;