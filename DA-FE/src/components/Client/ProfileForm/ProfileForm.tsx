import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Input,
  Tabs,
  Dropdown,
  Menu,
  Space,
  Typography,
} from 'antd';
import {
  SettingOutlined,
  ClockCircleOutlined,
  StarOutlined,
  UserOutlined,
  MailOutlined,
  CalendarOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import { BookOpen } from 'lucide-react';
import { menuItems } from '../../../mock/Clients/Profile/menu.mock';
import { Link } from 'react-router-dom';
import authServices from '../../../services/auth/authServices';
import wordServices from '../../../services/word/wordServices';
import formatDateTime from '../../../utils/Format/FormatDateTime';

const { TabPane } = Tabs;
const { Title, Text } = Typography;

interface PersonalData {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface SearchHistory {
  word: string;
  searchTime: string;
}

const PersonalInfo: React.FC<{ personalData: PersonalData[] }> = ({
  personalData,
}) => (
  <Card
    className="mb-8"
    title={
      <Title level={4} style={{ color: '#1890ff', margin: 0 }}>
        Personal Information
      </Title>
    }
  >
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
      }}
    >
      {personalData.map(({ id, label, value, icon }) => (
        <div
          key={id}
          style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          <Text strong>{label}</Text>
          <Input
            id={id}
            prefix={icon}
            value={value}
            readOnly
            style={{ backgroundColor: '#f5f5f5' }}
          />
        </div>
      ))}
    </div>
  </Card>
);

// Word List Component
const WordList: React.FC<{ searchHistories: SearchHistory[] }> = ({
  searchHistories,
}) => (
  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
    {searchHistories.map(({ word, searchTime }, index) => (
      <li
        key={index}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 0',
          borderBottom:
            index === searchHistories.length - 1 ? 'none' : '1px solid #f0f0f0',
        }}
      >
        <Text strong>{word}</Text>
        <Text type="secondary">{searchTime}</Text>
      </li>
    ))}
  </ul>
);

const ProfileForm = () => {
  const [personalData, setPersonalData] = useState<PersonalData[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchHistories, setSearchHistories] = useState<SearchHistory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authServices.getMe();
        if (response) {
          const data = response.data;
          const formattedData: PersonalData[] = [
            {
              id: 'username',
              label: 'Username',
              value: data.username,
              icon: <UserOutlined />,
            },
            {
              id: 'email',
              label: 'Email',
              value: data.email,
              icon: <MailOutlined />,
            },
            {
              id: 'role',
              label: 'Role',
              value: data.role,
              icon: <IdcardOutlined />,
            },
            {
              id: 'joined',
              label: 'Joined',
              value: new Date(data.joined).toLocaleDateString(),
              icon: <CalendarOutlined />,
            },
          ];
          setPersonalData(formattedData);
        }
      } catch (error: any) {
        console.error('Error fetching personal data:', error);
      }
    };

    const fetchFavoriteWords = async () => {
      try {
        const response = await wordServices.getFavoriteWords();
        if (response) {
          const words = response.words;
          setFavorites(words.map((word: any) => word.word));
        }
      } catch (error: any) {
        console.error('Error fetching favorite words:', error);
      }
    };

    const fetchSearchLogs = async () => {
      try {
        const response = await wordServices.getSearchLogs();
        if (response) {
          const searchLogs = response.searchLogs;
          const formattedSearchHistories = searchLogs.map((searchLog: any) => ({
            word: searchLog.word.word,
            searchTime: formatDateTime(searchLog.searchTime),
          }));
          setSearchHistories(formattedSearchHistories);
        }
      } catch (error: any) {
        console.error('Error fetching search logs: ', error);
      }
    };

    fetchData();
    fetchFavoriteWords();
    fetchSearchLogs();
  }, []);

  const menu = (
    <Menu>
      {menuItems.map((item) => (
        <Menu.Item key={item.key}>
          <Link to={item.link || '#'}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: '#3b82f6',
          padding: '16px 0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Title level={3} style={{ color: 'white', margin: 0 }}>
            <Link
              to="/"
              style={{ color: 'inherit', textDecoration: 'none' }}
              className="flex"
            >
              <BookOpen size={32} className="h-8 w-8 mr-2" />
              Dictiohub
            </Link>
          </Title>
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
            <Button
              type="text"
              icon={<SettingOutlined />}
              style={{ color: 'white' }}
            />
          </Dropdown>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '32px 16px',
        }}
      >
        <PersonalInfo personalData={personalData} />

        <Tabs defaultActiveKey="history">
          <TabPane
            tab={
              <Space>
                <ClockCircleOutlined />
                Search History
              </Space>
            }
            key="history"
          >
            <Card
              title={
                <Space>
                  <ClockCircleOutlined style={{ color: '#1890ff' }} />
                  <span>Recent Search History</span>
                </Space>
              }
            >
              <WordList searchHistories={searchHistories} />
            </Card>
          </TabPane>
          <TabPane
            tab={
              <Space>
                <StarOutlined />
                Favorite Words
              </Space>
            }
            key="favorites"
          >
            <Card
              title={
                <Space>
                  <StarOutlined style={{ color: '#1890ff' }} />
                  <span>Favorite Words</span>
                </Space>
              }
            >
              <WordList
                searchHistories={favorites.map((word) => ({
                  word,
                  searchTime: '',
                }))}
              />
            </Card>
          </TabPane>
        </Tabs>
      </main>
    </div>
  );
};

export default ProfileForm;
