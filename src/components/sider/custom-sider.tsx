import React from 'react';
import { Layout, Menu } from 'antd';
import { 
  UserOutlined, 
  GlobalOutlined, 
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router';
import { RefineLayoutSiderProps } from '@refinedev/antd';
import { useSiderStyles } from './sider.styles';

const { Sider } = Layout;

interface CustomSiderProps extends RefineLayoutSiderProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

const MDALogo: React.FC<{ collapsed?: boolean }> = ({ collapsed }) => {
  if (collapsed) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#1890ff"/>
        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">M</text>
      </svg>
    );
  }
  
  return (
    <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="32" rx="6" fill="#1890ff"/>
      <text x="60" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">MDA Energy</text>
    </svg>
  );
};

export const CustomSider: React.FC<CustomSiderProps> = ({ collapsed = false, onCollapse }) => {
  const { styles } = useSiderStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: 'users',
      icon: <UserOutlined />,
      label: 'Users',
      onClick: () => navigate('/users'),
    },
    {
      key: 'customers',
      icon: <GlobalOutlined />,
      label: 'Customers',
      children: [
        {
          key: 'manage-customers',
          label: 'Manage Customers',
          onClick: () => navigate('/customers'),
        },
        {
          key: 'new-customer',
          label: 'New Customer',
          onClick: () => navigate('/new-customer'),
        },
      ],
    },
    {
      key: 'contracts',
      icon: <FileTextOutlined />,
      label: 'Contracts',
      onClick: () => navigate('/contracts'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      children: [
        {
          key: 'profile',
          label: 'Profile',
        },
        {
          key: 'preferences',
          label: 'Preferences',
        },
        {
          key: 'security',
          label: 'Security',
        },
      ],
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      style: { marginTop: 'auto' },
    },
  ];

  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/users') return 'users';
    if (path === '/manage-customers') return 'manage-customers';
    if (path === '/new-customer') return 'new-customer';
    if (path === '/contracts') return 'contracts';
    return 'manage-customers'; 
  };

  const getOpenKeys = () => {
    const path = location.pathname;
    if (path === '/manage-customers' || path === '/new-customer') return ['customers'];
    if (path.startsWith('/settings')) return ['settings'];
    return [];
  };

  return (
    <Sider 
      trigger={null} 
      collapsible 
      collapsed={collapsed}
      onCollapse={onCollapse}
      className={styles.sider}
    >
      <div style={{ 
        height: 32, 
        margin: 16, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <MDALogo collapsed={collapsed} />
      </div>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[getSelectedKey()]}
        defaultOpenKeys={getOpenKeys()}
        items={menuItems}
      />
    </Sider>
  );
};
