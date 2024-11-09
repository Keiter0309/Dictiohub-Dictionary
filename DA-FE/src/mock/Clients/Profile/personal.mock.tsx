import {
  UserOutlined,
  MailOutlined,
  CalendarOutlined,
  SearchOutlined,
} from '@ant-design/icons';
export const personalInfoFields = [
  {
    id: 'username',
    label: 'Username',
    value: 'johndoe',
    icon: <UserOutlined />,
  },
  {
    id: 'email',
    label: 'Email',
    value: 'johndoe@example.com',
    icon: <MailOutlined />,
  },
  {
    id: 'joined',
    label: 'Join Date',
    value: '01/01/2023',
    icon: <CalendarOutlined />,
  },
  {
    id: 'searches',
    label: 'Number of Searches',
    value: '1,234',
    icon: <SearchOutlined />,
  },
];
