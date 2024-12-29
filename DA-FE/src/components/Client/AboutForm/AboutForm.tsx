import React from 'react';
import { Card, Button, Typography, Row, Col, Layout, Space } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import NavbarForm from '../NavbarForm/NavbarForm';
import { Link } from 'react-router-dom';
import { features } from '../../../mock/Clients/About/about.mock';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactElement;
  title: string;
  description: string;
}) => (
  <Card
    style={{ height: '100%' }}
    bodyStyle={{ height: '100%', display: 'flex', flexDirection: 'column' }}
  >
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Space align="center" style={{ color: '#1890ff' }}>
        {React.cloneElement(icon, { style: { fontSize: '24px' } })}
        <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
          {title}
        </Title>
      </Space>
      <Paragraph style={{ color: '#595959', flex: 1 }}>{description}</Paragraph>
    </Space>
  </Card>
);

const AboutForm: React.FC = () => {
  return (
    <div>
      <div className="z-10">
        <NavbarForm />
      </div>

      <Content style={{ backgroundColor: '#f0f2f5', paddingBottom: 24 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
          {/* Welcome Section */}
          <Card style={{ marginBottom: 24 }}>
            <Title level={2} style={{ color: '#1890ff', marginBottom: 24 }}>
              Welcome to Dictiohub
            </Title>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Paragraph style={{ fontSize: 16, color: '#595959' }}>
                Dictiohub is your premier online dictionary, designed to be the
                central hub for all your word-related needs. Our comprehensive
                platform offers definitions, pronunciations, and usage examples
                to support language learners, professionals, and word
                enthusiasts alike.
              </Paragraph>
              <Paragraph style={{ fontSize: 16, color: '#595959' }}>
                Founded with the vision of making language accessible to
                everyone, Dictiohub has been committed to providing accurate,
                up-to-date, and easy-to-understand definitions for millions of
                words across multiple languages.
              </Paragraph>
            </Space>
          </Card>

          {/* Features Section */}
          <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
            {features.map((feature, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <FeatureCard {...feature} />
              </Col>
            ))}
          </Row>

          {/* Mission Section */}
          <Card>
            <Title level={2} style={{ color: '#1890ff', marginBottom: 24 }}>
              Dictiohub's Mission
            </Title>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Paragraph style={{ fontSize: 16, color: '#595959' }}>
                At Dictiohub, our mission is to empower individuals through
                language. We believe that understanding words is the foundation
                of effective communication, and we're dedicated to providing a
                user-friendly platform that helps people expand their
                vocabulary, improve their language skills, and connect with the
                world around them.
              </Paragraph>
              <Paragraph style={{ fontSize: 16, color: '#595959' }}>
                Whether you're a student tackling complex texts, a professional
                crafting the perfect email, or simply a curious mind exploring
                the richness of language, Dictiohub is here to support your
                journey.
              </Paragraph>
              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <Button
                  type="primary"
                  icon={<BookOutlined />}
                  size="large"
                  style={{
                    height: '44px',
                    padding: '0 32px',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    margin: '0 auto',
                  }}
                >
                  <Link to={'/'}>Explore Dictiohub</Link>
                </Button>
              </div>
            </Space>
          </Card>
        </div>
      </Content>

      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 DictioHub Dictionary. All rights reserved.
            </p>
            <nav className="flex space-x-4 mt-4 sm:mt-0">
              <Link
                to="/terms"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutForm;
